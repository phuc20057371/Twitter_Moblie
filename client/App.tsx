import { View } from "react-native";
import { LoginForm } from "./src/component/LoginForm";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={LoginForm} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }