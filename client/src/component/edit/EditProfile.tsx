import { Image, Pressable, Text, View } from "react-native";
import { style } from "./style";
import { TextInput } from "react-native-paper";

export const EditProfile = () =>{
    return (
        <View style={style.container}>
      <View style={style.loginContainer}>
      <View>
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
            <Pressable style={style.buttonLogin} >
              <Text style={style.text}>save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
    )
}