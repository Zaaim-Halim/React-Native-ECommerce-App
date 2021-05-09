import React, { useState } from "react";
import { BASE_URL } from "./utils";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { CartIcon } from "./CartIcon";
import { ADD_TO_CART } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

const screenWidth = Dimensions.get("window");
function generateRandomString(length, randomString = "") {
  randomString += Math.random().toString(20).substr(2, length);
  if (randomString.length > length) return randomString.slice(0, length);
  return generateRandomString(length, randomString);
}

export default function ProductDetails({ route }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state);
  const { product } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");

  const arr = product.categories;
  function renderCategories() {
    return arr.map((obj) => {
      return <Text key={obj.id}>{obj.name} . </Text>;
    });
  }

  function addTocart() {
    setModalVisible(!modalVisible);
    var token = cartItem.sessionTokent;
    var id = cartItem.id;

    var pid = product.id;

    const url =
      BASE_URL +
      "cart/add/" +
      id +
      "/" +
      pid +
      "/" +
      parseInt(text) +
      "/" +
      token;
    console.log(url);
    axios(url)
      .then((res) => {
        dispatch({ type: ADD_TO_CART, payload: res.data });
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${product.image}`,
          }}
          style={{
            height: 260,
            width: screenWidth.width,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            marginTop: 10,
          }}
        />
        <CartIcon onPress={() => setModalVisible(true)} />
        <View style={styles.productInfoContainer}>
          <Text style={styles.name}>{product.libelle}</Text>
          <Text style={styles.price}>{product.price} DH</Text>
          <Text style={styles.categories}>{renderCategories()}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text></Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Quantite</Text>
              <TextInput
                style={{
                  height: 40,
                  width: 250,
                  borderBottomWidth: 2,
                  borderBottomColor: "#009688",
                }}
                keyboardType="numeric"
                placeholder="sisir qunatité"
                onChangeText={(text) => setText(text)}
                defaultValue={text}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={addTocart}
              >
                <Text style={styles.textStyle}>ajouter</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  productInfoContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  productInfo: {
    flexDirection: "column",
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: { fontSize: 14, fontWeight: "500", color: "red" },
  description: { fontSize: 14, fontWeight: "400", color: "#787878" },
  categories: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#009688",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // here in this view insert the FORM
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: 300,
    height: 190,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    width: 200,
    elevation: 2,
  },

  buttonClose: {
    marginTop: 10,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});
