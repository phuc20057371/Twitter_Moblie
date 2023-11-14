import * as React from "react";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { Text, View } from "react-native";
import SearchUpload from "../../search/searchUpload";
import { LayoutTweet } from "../../tweet/LayoutTweet";
import { useDispatch, useSelector } from "react-redux";
import { tweetAction } from "../../../redux/actions/tweetAction";
import { customFetch } from "../../../utilities/customFetch";

const footer = () => {
  return (
    <View style={{ flex: 1, height: 500, backgroundColor: "yellow" }}>
      <Text>Footer</Text>
    </View>
  );
};

function Feed({ navigation }: { navigation: any }) {
  const distpach = useDispatch();
  const loadDataTweet = async () => {
    distpach(tweetAction.getTweet.pending());
    const response = await customFetch({}, "/tweet");
    if (response?.data) {
      distpach(tweetAction.getTweet.fulfill(response.data))
    }else {
      distpach(tweetAction.getTweet.errors(response?.error))
    }
  };
  useEffect(()=>{
    loadDataTweet()
  },[])
  const {data:tweetList} = useSelector((state:any)=>state.tweet)
  const {data:user} = useSelector((state:any)=>state.user)
  console.log("tweetList ", tweetList)
  return (
    <View style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
      <FlatList
        data={tweetList}
        ListHeaderComponent={() => (
          <SearchUpload navigation={navigation} user={user} />
        )}
        ListFooterComponent={footer}
        renderItem={({ item }) => (
          <LayoutTweet
            navigation={navigation}
            tweetId={item._id}
            fullName={item.fullName}
            userName={item.userName}
            timeAgo={item.dateTweet}
            content={item.content}
            imageUrl={item.image}
            likes={item.likes}
            comments={item.comments}
            selected={false}
          />
        )}
      />
    </View>
  );
}

export default Feed;
