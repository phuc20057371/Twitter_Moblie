import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SignupForm } from "./src/component/signup/SignupForm";
import { LoginForm } from "./src/component/login/LoginForm";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EditProfile } from "./src/component/edit/EditProfile";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={SignupForm}
          options={{
            headerLeft: ({ onPress }) => (
              <Ionicons
                name="arrow-back-sharp"
                size={20}
                onPress={onPress}
              />
            ),
          }}
        />
        <Stack.Screen name="editprofile" component={EditProfile}  options={{
            headerLeft: ({ onPress }) => (
              <Ionicons
                name="arrow-back-sharp"
                size={20}
                onPress={onPress}
              />
            ),
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
