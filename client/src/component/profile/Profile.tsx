import { Image, View, Text, Pressable,FlatList, ScrollView } from "react-native";
import { style } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { tweetAction } from "../../redux/actions/tweetAction";
import { customFetch } from "../../utilities/customFetch";
import { useEffect } from "react";
import { LayoutTweet } from "../tweet/LayoutTweet";
export const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const fullNameUser =
    user.data?.fullName === undefined ? "full name" : user.data?.fullName;
  const date =
    user.data?.dateJoined === undefined ? "date joined" : user.data.dateJoined;
  const followings =
    user.data && user.data.following ? user.data.following.length : 0;
  const followers =
    user.data && user.data.followers ? user.data.followers.length : 0;
  const coverimage =
    user.data && user.data?.imageCover ? user.data.imageCover : "";
  const avatarimage =
    user.data && user.data?.imageAvatar ? user.data.imageAvatar : "";
  const name =
    user.data?.userName === undefined ? "user name" : user.data?.userName;
  const distpach = useDispatch();
  const loadTweetUser = async () => {
    if (name === undefined) return;
    distpach(tweetAction.getTweet.pending());
    const response = await customFetch({}, `/profile/tweet/${name}`);
    if (response?.data){
      distpach(tweetAction.getTweet.fulfill(response.data));
      console.log("dataa twweet ", response?.data)
    }
    else distpach(tweetAction.getTweet.errors(response?.error));
  };
  useEffect(() => {
    loadTweetUser();
  },[name]);
  const {data: tweetList} = useSelector((state:any)=>state.tweet)
  console.log("data new ", tweetList);
  
  return (
    <ScrollView>
      <View style={{backgroundColor:'white'}}>
      <View style={style.container}>
        <View style={style.container1}>
          <Image
            style={style.imageCover}
            source={{ uri: coverimage }}
            resizeMode="contain"
          />
          <View style={style.container2}>
            <Image
              style={{ width: 90, height: 90, borderRadius: 50 }}
              source={{ uri: avatarimage }}
              resizeMode="contain"
            />
            <View style={style.container3}>
              <Text>{`${fullNameUser}`}</Text>
              <Text>{`${date}`}</Text>
              <View style={style.container4}>
                <Text
                  style={style.textFollowing}
                >{`${followings} following`}</Text>
                <Text>{`${followers} followers`}</Text>
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
      <View >
      <FlatList
        data={tweetList}
        renderItem={({ item }) => (
          <LayoutTweet
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
    </View>
    </ScrollView>
  );
};
