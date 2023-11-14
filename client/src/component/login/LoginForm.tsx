import { Image, Text } from "react-native";
import { View } from "react-native";
import { style } from "./style";
import { TextInput } from "react-native-paper";
import { Pressable } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userActions";

export const LoginForm = ({ navigation }: { navigation: any }) => {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [listUser, setListUser] = useState([]);

  function handleUsernameChange(event: any) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event: any) {
    setPassword(event.target.value);
  }
  useEffect(() => {
    axios
      .get("http://localhost:3001/user")
      .then((response) => {
        setListUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSignupForm = () => {
    navigation.navigate("signup");
  };
  const distpach = useDispatch();
  const handleHome = () => {
    console.log(username, password, listUser);
    for (let i = 0; i < listUser.length; i++) {
      if (
        listUser[i].username === username &&
        listUser[i].password === password
      ) {
        navigation.navigate("Tabs", {
          screen: "Feed",
          params: { userid: listUser[i] },
        });
        distpach(userActions.getProfileUser.fulfill(listUser[i].id));
        console.log("asdasdsd ", username, password, listUser[i].id);
        break;
      }
    }
    //    navigation.navigate('Tabs')
  };
  return (
    <View style={style.container}>
      <View style={style.loginContainer}>
        <View style={{ alignSelf: "flex-start" }}>
          <Image
            source={require("../../../assets/twitter.png")}
            style={style.logoLogin}
          />
        </View>
        <View
          style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}
        >
          <h2 style={{ textTransform: "uppercase" }}>login</h2>
        </View>
        <View>
          <View style={style.conatinerInput}>
            <Text style={{ fontWeight: "700" }}>Username</Text>
            <TextInput
              style={style.textInput}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
              onChange={handleUsernameChange}
            />
          </View>
          <View style={style.conatinerInput}>
            <Text style={{ fontWeight: "700" }}>Password</Text>
            <TextInput
              style={style.textInput}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
              onChange={handlePasswordChange}
            />
          </View>
        </View>
        <View>
          <View style={style.conatinerInput}>
            <Pressable style={style.buttonLogin} onPress={handleHome}>
              <Text style={style.text}>login</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={style.buttonSignup} onPress={handleSignupForm}>
              <Text style={style.text}>signup</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
