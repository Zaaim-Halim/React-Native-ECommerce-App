import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import ProductList from "./compoents/ProductList";
import ProductDetails from "./compoents/ProductDetails";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Cart from "./compoents/cart";
import Search from "./compoents/Search";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackSearch = createStackNavigator();
const StackCart = createStackNavigator();
const CartStack = () => (
  <StackCart.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <StackCart.Screen
      name="Panier"
      options={{
        title: "Panier ",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#009688",
        headerTitleStyle: {},
      }}
      component={Cart}
    />
  </StackCart.Navigator>
);
const SearchStack = () => (
  <StackSearch.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <StackSearch.Screen
      name="Search"
      options={{
        title: "Chercher",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#009688",
        headerTitleStyle: {},
      }}
      component={Search}
    />
  </StackSearch.Navigator>
);
const ProductStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <Stack.Screen
      name="Acceuil"
      options={{
        title: "Acceuil",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#009688",
        headerTitleStyle: {},
      }}
      component={ProductList}
    />
    <Stack.Screen
      name="Details"
      options={{
        title: "Details",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#009688",
        headerTitleStyle: {},
      }}
      component={ProductDetails}
    />
  </Stack.Navigator>
);

function Application() {
  const cartItem = useSelector((state) => state);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Panier") {
              iconName = focused ? "cart" : "cart";
            } else if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else {
              iconName = focused
                ? "card-search-outline"
                : "card-search-outline";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "#009688",
          inactiveTintColor: "gray",
          style: { height: 50 },
          tabStyle: { paddingVertical: 2 },
          labelStyle: {
            fontSize: 0,
            margin: -1,
            padding: 0,
          },
        }}
      >
        <Tab.Screen name="Home" component={ProductStackScreen} />
        <Tab.Screen name="Chercher" component={SearchStack} />
        <Tab.Screen
          name="Panier"
          component={CartStack}
          options={{
            tabBarBadge: cartItem.itemsNumber,
            tabBarBadgeStyle: {
              backgroundColor: "red",
              marginLeft: 7,
              marginBottom: 10,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
