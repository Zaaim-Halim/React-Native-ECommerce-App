import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "./utils";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Product } from "./Product";
import { Loading } from "./Loading";

//const BASE_URL = "http://10.189.79.214:8090/E-commerce/api/";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  useEffect(() => {
    setLoading(false);
    axios
      .get(BASE_URL + "products/all")
      .then((response) => {
        setProducts(response.data);
        setLoading(true);
      })
      .catch((error) => console.log("request failed " + error.message));
  }, []);

  function renderProducts({ item: product }) {
    return (
      <Product
        product={product}
        onPress={() => {
          navigation.navigate("Details", {
            product: product,
          });
        }}
      />
    );
  }
  if (!loading) {
    return <Loading />;
  }
  function Separator() {
    return <View style={{ borderBottomWidth: 1, borderBottomColor: "#fff" }} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style="{styles.container}">
        <FlatList
          contentContainerStyle={styles.productListContainer}
          data={products}
          ItemSeparatorComponent={() => Separator()}
          renderItem={renderProducts}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  productListContainer: {
    backgroundColor: "#f3f3f3",
  },
});
