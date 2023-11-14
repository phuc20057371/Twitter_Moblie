import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Text, View, Image } from "react-native";
import axios from "axios";
import SearchUpload from "../../search/searchUpload";
import { LayoutTweet } from "../../tweet/LayoutTweet";

const footer = () => {
  return (
    <View style={{ flex: 1, height: 500, backgroundColor: "yellow" }}>
      <Text>Footer</Text>
    </View>
  );
};

function Feed({ navigation }: { navigation: any }) {
  const route = useRoute();
  var [u, setUser] = useState(Object);
  var [t, setTweet] = useState([]);
  var [like, setLike] = useState("hearto");

  useEffect(() => {
    axios
      .get("http://localhost:3001/data")
      .then((response) => {
        const sort = response.data.sort((a: any, b: any) => b.id - a.id);
        setTweet(sort);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [route.params?.data]);
  useEffect(() => {
    if (route.params?.userid) {
      setUser(route.params?.userid);
    }
  }, [route.params?.userid]);
  function checkLike(item: any) {
    for (var i = 0; i < item.length; i++) {
      if (item[i].username == u.username) {
        setLike("heart");
        return "heart";
      }
    }
    setLike("hearto");
    return "hearto";
  }
  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };
  const navigateToTweet = () => {
    navigation.navigate("Tweet", { user: u });
  };
  const handleLikePress = () => {
    if (like === "heart") {
      setLike("hearto");
    } else {
      setLike("heart");
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
      <FlatList
        data={t}
        ListHeaderComponent={() => (
          <SearchUpload navigation={navigation} user={u} />
        )}
        ListFooterComponent={footer}
        renderItem={({ item }) => (
          <LayoutTweet
            item={item}
            navigation={navigation}
            user={u}
            like={like}
            onLikePress={handleLikePress}
          />
        )}
      />
    </View>
  );
}

export default Feed;
