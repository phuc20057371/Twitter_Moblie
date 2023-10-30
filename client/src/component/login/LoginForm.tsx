import { Image, Text } from "react-native";
import { View } from "react-native";
import { style } from "./style";
import { TextInput } from "react-native-paper";
import { Pressable } from "react-native";
import React from "react";
export const LoginForm = ({navigation}:{navigation:any}) => {
  const handleSignupForm = ()=>{
    navigation.navigate('signup')
  }
  return (
    <View style={style.container}>
      <View style={style.loginContainer}>
        <View style={{alignSelf:'flex-start'}}>
          <Image
            source={require("../../../assets/twitter.png")}
            style={style.logoLogin}
          />
        </View>
        <View style={{ flex:0.3,alignItems:'center', justifyContent:'center'}}>
          <h2 style={{ textTransform: "uppercase" }}>login</h2>
        </View>
        <View>
          <View style={style.conatinerInput}>
            <Text style={{ fontWeight: "700" }}>Username</Text>
            <TextInput
              style={style.textInput}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
            />
          </View>
          <View style={style.conatinerInput}>
            <Text style={{ fontWeight: "700" }}>Password</Text>
            <TextInput
              style={style.textInput}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
              
            />
          </View>
        </View>
        <View>
          <View style={style.conatinerInput}>
            <Pressable style={style.buttonLogin}>
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
