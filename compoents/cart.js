import PropTypes from "prop-types";
import React from "react";
import { BASE_URL } from "./utils";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FROM_CART } from "../redux/action";

const screenWidth = Dimensions.get("window");
export default function Cart() {
  const shoppinCart = useSelector((state) => state);
  const dispatch = useDispatch();

  const removeItemFromCart = (shoppingCart, cid) =>
    axios(BASE_URL + "cart/remove/" + shoppingCart.id + "/" + cid)
      .then((res) => {
        dispatch({ type: REMOVE_FROM_CART, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  function Separator() {
    return <View style={{ borderBottomWidth: 1, borderBottomColor: "#fff" }} />;
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {shoppinCart.id !== 10000 ? (
        <FlatList
          data={shoppinCart.cartItems}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => Separator()}
          renderItem={({ item }) => (
            <View style={styles.bookItemContainer}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${item.product.image}`,
                }}
                style={{
                  height: 220,
                  width: screenWidth.width / 2 + 20,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16,
                }}
              />

              <View style={styles.productMetaContainer}>
                <Text style={styles.proTitle} numberOfLines={1}>
                  {item.product.libelle}
                </Text>
                <Text style={styles.price}>Quantite : {item.qty}</Text>

                <Text style={styles.price}>
                  Prix : {item.qty * item.product.price}
                </Text>
                <Text style={styles.description} numberOfLines={6}>
                  {item.product.description}
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => removeItemFromCart(shoppinCart, item.id)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Supprimer </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartMessage}>Panier Vide !</Text>
        </View>
      )}
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPrice}>Total : {shoppinCart.total} DHs</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bookItemContainer: {
    flexDirection: "row",
    padding: 10,
  },
  totalPriceContainer: {
    backgroundColor: "#e6f2ec",
    padding: 10,
  },
  productMetaContainer: {
    padding: 5,
    flex: 1,
    paddingLeft: 10,
  },
  proTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#009688",
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#009688",
  },
  price: {
    fontSize: 16,
    fontWeight: "200",
    color: "red",
  },
  description: {
    fontSize: 14,
    fontWeight: "200",
  },
  buttonContainer: {
    position: "absolute",
    top: 185,
    left: 10,
    width: 85,
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#ff333390",
    padding: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  emptyCartContainer: {
    marginTop: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartMessage: {
    fontSize: 22,
    color: "#009688",
  },
});
