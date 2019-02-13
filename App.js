import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

export default class App extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: { x: 200, y: 300 }
    }).start();
  }
  render() {  
  // Un seul render est appelé,
  // par contre "this.position" va changer de nombreuse fois et donc le style de Animated.View va être updaté.
  // Les animations n'utilise pas le système de rendering.
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.square} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: "red"
  }
});
