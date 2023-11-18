import { Image, Text } from "react-native";
import { View } from "react-native";
import { style } from "./style";
import { TextInput } from "react-native-paper";
import { Pressable } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { customFetch } from "../../utilities/customFetch";
import { loginActions } from "../../redux/actions/loginAction";
import { userActions } from "../../redux/actions/userAction";
import { imageActions } from "../../redux/actions/imageAction";
export const LoginForm = ({ navigation }: { navigation: any }) => {
  // var [username, setUsername] = useState("");
  // var [password, setPassword] = useState("");
  // var [listUser, setListUser] = useState([]);

  // function handleUsernameChange(event: any) {
  //   setUsername(event.target.value);
  // }
  // function handlePasswordChange(event: any) {
  //   setPassword(event.target.value);
  // }
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/user")
  //     .then((response) => {
  //       setListUser(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });


  const handleSignupForm = () => {
    navigation.navigate("signup");

  };
  const distpach = useDispatch();
  // const handleHome = () => {
  //   console.log(username, password, listUser);
  //   for (let i = 0; i < listUser.length; i++) {
  //     if (
  //       listUser[i].username === username &&
  //       listUser[i].password === password
  //     ) {
  //       navigation.navigate("Tabs", {
  //         screen: "Feed",
  //         params: { userid: listUser[i] },
  //       });
  //       distpach(userActions.getProfileUser.fulfill(listUser[i].id));
  //       console.log("asdasdsd ", username, password, listUser[i].id);
  //       break;
  //     }
  //   }
  //   //    navigation.navigate('Tabs')
  // };
  const handleLogin = async()=>{
    distpach(loginActions.getLogin.pending())
    const response = await customFetch({method:'POST', data:formData},'/login')
    if(response?.data){
      const token = response.data.token
      localStorage.setItem('token', token)
      distpach(loginActions.getLogin.fulfill(response.data))
      console.log("modoo ", response.data)
      navigation.navigate('Tabs')
    }else {
      distpach(loginActions.getLogin.error(response?.error))
    }
  }
  
  const loadDataImage = async()=>{
    distpach(imageActions.getImage.pending())
    const response = await customFetch({}, '/profile/imageAvatar');
    if(response?.data) distpach(imageActions.getImage.fulfill(response.data))
    else distpach(imageActions.getImage.errors(response?.error))
  }
  useEffect(()=>{
    
    loadDataImage()
  },[])
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
              onChangeText={(text) => setFormData({ ...formData, userName: text })}
            />
          </View>
          <View style={style.conatinerInput}>
            <Text style={{ fontWeight: "700" }}>Password</Text>
            <TextInput
              style={style.textInput}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
          </View>
        </View>
        <View>
          <View style={style.conatinerInput}>
            <Pressable style={style.buttonLogin} onPress={handleLogin}>
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
