import { Image, View, Text, Pressable } from "react-native";
import { style } from "./style";
import axios from "axios";
import { useState } from "react";

export const Profile = () => {
  const [user, setUser] = useState(Object);
  const loadDataUser = () => {
    axios
      .get("http://localhost:3001/user")
      .then((response) => {
        setUser(response.data);
        console.log("data user", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View>
      <View style={style.container}>
        <View style={style.container1}>
          <Image
            style={style.imageCover}
            source={require("../../../assets/data/data2.png")}
            resizeMode="contain"
          />
          <View style={style.container2}>
            <Image
              style={{ width: 90, height: 90, borderRadius: 50 }}
              source={require("../../../assets/data/data1.jpeg")}
              resizeMode="contain"
            />
            <View style={style.container3}>
              <Text>Nguyễn Huỳnh Hương</Text>
              <Text>{`Date Joined: 09/2023`}</Text>
              <View style={style.container4}>
                <Text style={style.textFollowing}>{`10 following`}</Text>
                <Text>{`09 followers`}</Text>
              </View>
            </View>
            <View style={style.container5}>
              <Pressable style={style.button}>
                <Text style={style.textButton}>Edit Profile</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
