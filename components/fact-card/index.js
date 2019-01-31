import React, { Component } from "react";
import { Card } from "react-native-elements";
import { Text, Button, Linking } from "react-native";
const RANDOM_IMG_URL = "https://picsum.photos/200/300/?random";
class FactCard extends Component {
  render() {
    return (
      <Card
        containerStyle={{ width: 350 }}
        key={this.props.fact.text}
        title={"Random fact"}
        image={{ uri: RANDOM_IMG_URL }}
      >
        <Text>
          {this.props.fact.text}
        </Text>
        <Button
          title="See the source"
          onPress={() => Linking.openURL(this.props.fact.source_url)}
        />
      </Card>
    );
  }
}

export default FactCard;
