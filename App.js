import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

const RANDOM_FACT_URL =
  "http://randomuselessfact.appspot.com/random.json?language=en";

export default class App extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: { x: 200, y: 300 }
    }).start();
  }
  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.square} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 100
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red"
  }
});
