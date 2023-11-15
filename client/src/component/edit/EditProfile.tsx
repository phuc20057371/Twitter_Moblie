import { Pressable, Text, View } from "react-native";
import { style } from "./style";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/userAction";
import { customFetch } from "../../utilities/customFetch";
import * as React from "react";
export const EditProfile = ({navigation}:{navigation:any}) => {
  const [formData, setFormData] = React.useState({  fullName: '',
  email: '',
  password: '',})
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const distpach = useDispatch();
  const handleSave = async () => {
    console.log("form data ", formData)
    distpach(userActions.updateUserProfile.pending())
    const response = await customFetch({method:'PATCH', data:formData}, '/profile')
    if(response?.data){
      console.log("update user", response.data)
      distpach(userActions.updateUserProfile.fulfill(response.data))
      navigation.navigate('profile')
    }
    else distpach(userActions.updateUserProfile.errors(response?.data))
  };
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
              onChangeText={(text) => handleInputChange("fullName", text)}
            />
          </View>
          <View style={style.conatinerInput}>
            <Text style={{ fontWeight: "700" }}>Password</Text>
            <TextInput
              style={style.textInput}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
              onChangeText={(text) => handleInputChange("password", text)}
            />
          </View>
          <View style={style.conatinerInput}>
            <Text style={{ fontWeight: "700" }}>Email</Text>
            <TextInput
              style={style.textInput}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
              onChangeText={(text) => handleInputChange("email", text)}
            />
          </View>
        </View>
        <View>
          <View style={style.conatinerInput}>
            <Pressable style={style.buttonLogin} onPress={handleSave}>
              <Text style={style.text}>save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
