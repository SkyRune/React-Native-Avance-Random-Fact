import React, { Component } from "react";
import { Card } from "react-native-elements";
import { Text, Button, Linking, ScrollView, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
const RANDOM_IMG_URL = "https://picsum.photos/150/200?image=";
class FactCard extends Component {
  render() {
    return (
      <View
        style={{
          elevation: 1,
          shadowColor: "black",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.7,
          width: wp("90%"),
          backgroundColor: "white"
        }}
      >
        <Image
          key={this.props.fact.text}
          source={{ uri: this.props.fact.image }}
          style={{ width: wp("90%"), height: hp("30%") }}
        />
        <ScrollView height={hp("10%")}>
          <Text
            multiline={true}
            style={{ padding: 10, marginBottom: hp("3%") }}
          >
            {this.props.fact.text}
          </Text>
        </ScrollView>
        <Button
          style={{ marginTop: hp("5%") }}
          disabled={this.props.disabled}
          title="See the source"
          onPress={() => Linking.openURL(this.props.fact.source_url)}
        />
      </View>
    );
  }
}

export default FactCard;
