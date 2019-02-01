import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, PanResponder } from "react-native";
import FactCard from "./components/fact-card";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

// a quoi ca doit ressembler ? https://giphy.com/gifs/animation-illustration-motion-26mkhMYkitO7DoJuU/fullscreen
const RANDOM_FACT_URL =
  "http://randomuselessfact.appspot.com/random.json?language=en";
const PICTURE_LIST_URL = "https://picsum.photos/150/200?image=";
const MAX_LEFT_ROTATION_DISTANCE = wp("-150%");
const MAX_RIGHT_ROTATION_DISTANCE = wp("150%");
const LEFT_TRESHOLD_BEFORE_SWIPE = wp("-50%");
const RIGHT_TRESHOLD_BEFORE_SWIPE = wp("50%");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { topFact: undefined, bottomFact: undefined };
  }
  componentDidMount() {
    this.position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      // appelé à chaque pression sur l'écran , si vrai on veut que
      // notre objet PanResponder soit en charge de récupérer ces events
      onMoveShouldSetPanResponder: (e, gesture) => {
        //Désactive le panResponder ( pour permettre que la scroll view réponde
        // si la distance du geste en x est au 3 X plus grand que la distance en y)
        return Math.abs(gesture.dx) > Math.abs(gesture.dy * 3);
      },
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({
          x: gesture.dx
        });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx < LEFT_TRESHOLD_BEFORE_SWIPE) {
          this.forceLeftExit();
        } else if (gesture.dx > RIGHT_TRESHOLD_BEFORE_SWIPE) {
          this.forceRightExit();
        } else {
          this.resetPositionSoft();
        }
      }
    });
    this.setState({
      panResponder
    });

    axios.get(RANDOM_FACT_URL).then(response => {
      this.setState(
        {
          topFact: {
            ...response.data,
            image: this.getRandomImageURL()
          }
        },
        () => {
          axios.get(RANDOM_FACT_URL).then(response2 => {
            this.setState({
              bottomFact: {
                ...response2.data,
                image: this.getRandomImageURL()
              }
            });
          });
        }
      );
    });
  }
  isScrolling() {}
  onCardExitDone = () => {
    this.loadBottomFact();
    this.setState({
      topFact: this.state.bottomFact
    });
    this.position.setValue({
      x: 0,
      y: 0
    });
  };
  forceLeftExit() {
    Animated.timing(this.position, {
      toValue: { x: wp("-100%"), y: 0 }
    }).start(this.onCardExitDone);
  }
  forceRightExit() {
    Animated.timing(this.position, {
      toValue: { x: wp("100%"), y: 0 }
    }).start(this.onCardExitDone);
  }
  loadBottomFact() {
    axios.get(RANDOM_FACT_URL).then(response => {
      this.setState({
        bottomFact: {
          ...response.data,
          image: this.getRandomImageURL()
        }
      });
    });
  }
  getRandomImageURL() {
    return `${PICTURE_LIST_URL}${Math.floor(Math.random() * 500 + 1)}`;
  }

  getCardStyle() {
    const rotation = this.position.x.interpolate({
      inputRange: [MAX_LEFT_ROTATION_DISTANCE, 0, MAX_RIGHT_ROTATION_DISTANCE],
      outputRange: ["-120deg", "0deg", "120deg"]
    });
    return {
      ...this.position.getLayout(),
      transform: [{ rotate: rotation }]
    };
  }

  resetPositionSoft() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }
  resetPositionHard() {
    this.position.setValue({
      x: 0
    });
  }

  renderTopFact() {
    return (
      <Animated.View
        style={this.getCardStyle()}
        {...this.state.panResponder.panHandlers}
      >
        <FactCard fact={this.state.topFact} />
      </Animated.View>
    );
  }
  renderBottomFact() {
    return (
      <View style={{ zIndex: -1, position: "absolute" }}>
        <FactCard disabled={true} fact={this.state.bottomFact} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginBottom: 50 }}>Fact Swipe</Text>
        <View>
          {this.state.topFact && this.renderTopFact()}
          {this.state.bottomFact && this.renderBottomFact()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 50
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red"
  }
});

/*
"_accountsForMovesUpTo": 9187361.969048,
"dx": 2.6666717529296875, // distance parcouru en un mouvement en x
"dy": -1,// distance parcouru en un mouvement en y
"moveX": 18.333328247070312, // position du doigt actuelle en x
"moveY": 268.6666564941406, // position du doigt actuelle en y
"numberActiveTouches": 1, // nombre de doigts qui touchent
"stateID": 0.8805023799412371, //identificant du geste
"vx": 0, // Rapidité du mouvement en x
"vy": -0.0014172563592235491,// Rapidité du mouvement en y
"x0": 15.666656494140625, // la coordonnée ou le mouvement a commencé en x
"y0": 269.6666564941406, // la coordonnée ou le mouvement a commencé en y

"Un mouvement" est tout ce qui se presse entre une pression et un relachement
*/
