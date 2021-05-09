import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Svg, Path, Circle } from "react-native-svg";

export function CartIcon({ favorite, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="prefix__feather prefix__feather-shopping-cart"
      >
        <Circle cx={9} cy={21} r={1} />
        <Circle cx={20} cy={21} r={1} />
        <Path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    top: 260 - 64 / 2,
    height: 54,
    width: 54,
    borderRadius: 54 / 2,
    backgroundColor: "#ff333390" /* "orange"*/,
    alignItems: "center",
    justifyContent: "center",
  },
});
