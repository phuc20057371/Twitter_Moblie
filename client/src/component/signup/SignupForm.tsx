import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
import { style } from "./style";
import { TextInput } from "react-native-paper";

export const SignupForm = ({navigation}:{navigation:any}) => {
    const handleSignup = ()=>{
        navigation.navigate('login')
    }
  return (
    <View style={style.container}>
      <View style={style.loginContainer}>
        <View style={{ alignSelf: "flex-start" }}>
          <Image
            style={style.logoLogin}
            source={require("../../../assets/twitter.png")}
          />
        </View>
        <View
          style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}
        >
          <h2 style={{ textTransform: "uppercase" }}>signup</h2>
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
            <Text style={{ fontWeight: "700" }}>Fullname</Text>
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
          <View style={style.conatinerInput}>
            <Text style={{ fontWeight: "700" }}>Email</Text>
            <TextInput
              style={style.textInput}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
            />
          </View>
        </View>
        <View>
          <View style={style.conatinerInput}>
            <Pressable style={style.buttonLogin} onPress={handleSignup}>
              <Text style={style.text}>signup</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
