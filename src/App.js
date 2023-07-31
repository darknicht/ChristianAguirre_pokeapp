import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createStackNavigator();

// Stack Navigator para las pantallas de inicio y detalles
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Listado de Pokémon", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Detalles" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
