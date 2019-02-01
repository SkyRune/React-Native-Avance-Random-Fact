import React, { Component } from "react";
import { Text, Button, Linking, ScrollView, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class FactCard extends Component {
  goToTop = () => {
    this.scrollView.scrollTo({ x: 0, y: 0, animated: true });
  };
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
        <ScrollView
          ref={scrollViewReference => {
            this.scrollView = scrollViewReference;
          }}
          height={hp("10%")}
          onScrollEndDrag={this.goToTop}
        >
          <Text
            multiline={true}
            style={{ padding: 10, marginBottom: hp("3%") }}
          >
            {this.props.fact.text}
          </Text>
        </ScrollView>
        <Button
          disabled={this.props.disabled}
          title="See the source"
          onPress={() => Linking.openURL(this.props.fact.source_url)}
        />
      </View>
    );
  }
}

export default FactCard;
