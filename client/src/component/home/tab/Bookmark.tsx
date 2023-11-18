import * as React from "react";
import {  FlatList } from "react-native";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkAction } from "../../../redux/actions/bookmarkAction";
import { customFetch } from "../../../utilities/customFetch";
import {useEffect} from 'react'
import { LayoutTweet } from "../../tweet/LayoutTweet";

function Bookmark({ navigation }: { navigation: any }) {
  const distpach = useDispatch()
  const {data:bookmarks} = useSelector((state:any)=>state.bookmarks)
  const loadBookmark = async ()=>{
    distpach(bookmarkAction.getBookmarkByUserName.pending())
    const response = await customFetch({},`/bookmark`)
    if(response?.data) {
      console.log("object bookmarks ", response.data)
      distpach(bookmarkAction.getBookmarkByUserName.fulfill(response.data))
    }
    else distpach(bookmarkAction.getBookmarkByUserName.errors(response?.error))
  }

  useEffect(()=>{
    loadBookmark()
  },[])
  return (
    <View style={{ flex: 1, backgroundColor:'white' }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            color: "#3B82F6",
          }}
        >
          BOOKMARKS
        </Text>
      </View>

      <FlatList
        data={bookmarks}
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

export default Bookmark;
