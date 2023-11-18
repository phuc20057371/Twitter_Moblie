import * as React from "react";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { Text, View } from "react-native";
import SearchUpload from "../../search/searchUpload";
import { LayoutTweet } from "../../tweet/LayoutTweet";
import { useDispatch, useSelector } from "react-redux";
import { tweetAction } from "../../../redux/actions/tweetAction";
import { customFetch } from "../../../utilities/customFetch";
import { useFocusEffect } from '@react-navigation/native';
import { userActions } from "../../../redux/actions/userAction";
import { io } from "socket.io-client";
import { notificationsAction } from "../../../redux/actions/notificationsAction";
const footer = () => {
  return (
    <View style={{ flex: 1, height: 500, backgroundColor: "yellow" }}>
      <Text>Footer</Text>
    </View>
  );
};

function Feed({ navigation }: { navigation: any }) {
  const socket = io('http://localhost:8080', {
    autoConnect: false,
  });
  const token = localStorage.getItem('token');
  const distpach = useDispatch();
  const loadDataTweet = async () => {
    distpach(tweetAction.getTweet.pending());
    const response = await customFetch({}, "/tweet");
    if (response?.data) {
      distpach(tweetAction.getTweet.fulfill(response.data))
      console.log("data 1", response.data)
    }else {
      distpach(tweetAction.getTweet.errors(response?.error))
    }
  };
  const loadDataUser = async ()=>{
    distpach(userActions.getProfileUser.pending())
    const response = await customFetch({},'/profile')
    if(response?.data){
      distpach(userActions.getProfileUser.fulfill(response.data))
    }else{
      distpach(userActions.getProfileUser.error(response?.error))
    }
  }
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadDataTweet();
    });

    return unsubscribe;
  }, [navigation]);
  const loadNotifications = async () => {
    distpach(notificationsAction.getNotification.pending());
    const response = await customFetch({}, "/notification");
    if (response?.data) {
      console.log("notifi ", response.data.notifications);
      distpach(
        notificationsAction.getNotification.fulfill(response.data.notifications)
      );
    } else
    distpach(notificationsAction.getNotification.errors(response?.error));
  };
  useEffect(()=>{
    if(!token) return
    loadDataUser()
    loadNotifications()
  },[])
  const {data:user} = useSelector((state:any)=>state.user)
  const name = user && user?.userName
  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', { room: name });
    socket.on('follow', (data) => {
      distpach(notificationsAction.createNotification.fulfill(data.notification.notifications));
    });
    socket.on('like', (data) => {
      console.log("noti ", data.notification)
      distpach(notificationsAction.getNotification.fulfill(data.notification.notifications));
      distpach(tweetAction.updateTweet.fulfill(data.data))
      console.log("data data ",data.data)
    });
  
    return () => {
      socket.disconnect();
    };
  }, [socket, name]);
  
  const {data:tweetList} = useSelector((state:any)=>state.tweet)
  console.log("user naem authoe ", name)
  const { data: notifications } = useSelector((state: any) => state.notifications);
  const unreadNotifications = notifications&& notifications.filter((notification: any) => !notification.isRead);
  console.log("só noti chưa read ", unreadNotifications?.length)
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
