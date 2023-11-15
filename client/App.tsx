import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SignupForm } from "./src/component/signup/SignupForm";
import { LoginForm } from "./src/component/login/LoginForm";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EditProfile } from "./src/component/edit/EditProfile";
import MyTabs from "./src/component/home/Home";
import AppHeader from "./src/component/home/AppHeader";
import TweetDetail from "./src/component/home/tab/tweet/TweetDetail";
import Tweet from "./src/component/home/tab/tweet/Tweet";
import { Profile } from "./src/component/profile/Profile";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="search">
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
                <Ionicons name="arrow-back-sharp" size={20} onPress={onPress} />
              ),
            }}
          />
          <Stack.Screen
            name="editprofile"
            component={EditProfile}
            options={{
              headerLeft: ({ onPress }) => (
                <Ionicons name="arrow-back-sharp" size={20} onPress={onPress} />
              ),
            }}
          />
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{ header: () => <AppHeader /> }}
          />
          <Stack.Screen name="Tweet" component={Tweet} />
          <Stack.Screen name="TweetDetail" component={TweetDetail} />
          <Stack.Screen name="profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
