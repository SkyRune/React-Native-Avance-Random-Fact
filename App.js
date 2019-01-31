import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import FactCard from "./components/fact-card";
import axios from "axios";

const RANDOM_FACT_URL =
  "http://randomuselessfact.appspot.com/random.json?language=en";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fact: undefined };
    axios.get(RANDOM_FACT_URL).then(response => {
      this.setState({ fact: response.data });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginBottom: 50 }}>Fact generator</Text>
        {this.state.fact
          ? <FactCard fact={this.state.fact} />
          : <Text>Loading...</Text>}

      </View>
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
