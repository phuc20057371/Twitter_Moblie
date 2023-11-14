import { Image, View, Text, Pressable } from "react-native";

export const Profile = () => {
  return (
    <View>
        <View style={{ flex: 1, width: 400, height: 267 }}>
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: 390, height: 206 }}
          source={require("../../../assets/data/data2.png")}
          resizeMode="contain"
        />
        <View
          style={{ flexDirection: "row", alignItems: "center"}}
        >
          <Image
            style={{ width: 90, height: 90, borderRadius: 50 }}
            source={require("../../../assets/data/data1.jpeg")}
            resizeMode="contain"
          />
          <View style={{marginLeft:5,marginRight:5}}>
            <Text>Nguyễn Huỳnh Hương</Text>
            <Text>{`Date Joined: 09/2023`}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ paddingRight: 10 }}>{`10 following`}</Text>
              <Text>{`09 followers`}</Text>
            </View>
          </View>
          <View style={{paddingBottom:15}}>
          <Pressable
            style={{
              width: 120,
              height: 27,
              backgroundColor: "#3B82F6",
              alignItems: "center",
              justifyContent: "center",
              borderRadius:12
            }}
          >
            <Text style={{ color: "white", textTransform: "uppercase" }}>
              Edit Profile
            </Text>
          </Pressable>
          </View>
        </View>
      </View>
    </View>
    </View>
  );
};
