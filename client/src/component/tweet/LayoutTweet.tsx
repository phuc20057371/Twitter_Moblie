import { Image, Text, TouchableOpacity, View, Pressable } from "react-native";
import IData from "../../interface/IData";
import { TextInput } from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { style } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { tweetAction } from "../../redux/actions/tweetAction";
import { customFetch } from "../../utilities/customFetch";
import { bookmarkAction } from "../../redux/actions/bookmarkAction";
import { io } from "socket.io-client";
interface LayoutTweetProps {
  navigation?: any;
  tweetId: string;
  fullName: string;
  userName: string;
  timeAgo: string;
  content: string;
  imageUrl: string;
  likes: string[];
  selected: boolean;
  comments: string[];
}

export const LayoutTweet: React.FC<LayoutTweetProps> = ({
  navigation,
  tweetId,
  fullName,
  userName,
  timeAgo,
  content,
  imageUrl,
  likes,
  comments,
  selected,
}) => {
  const navigateToProfile = () => {
    navigation.navigate("profile");
  };
  const distpach = useDispatch();
  console.log("object", fullName);
  const { data: tweetList } = useSelector((state: any) => state.tweet);
  const imageAuthor = useSelector((state: any) => state.imageAuthor);
  const user = useSelector((state: any) => state.user);
  const room = userName;
  const name =
    user.data?.userName === undefined ? "user name" : user.data?.userName;
  const avatarimage =
    user.data && user.data?.imageAvatar ? user.data.imageAvatar : "";
    const socket = io('http://localhost:8080', {
    autoConnect: false,
  });
  const handleLike = async () => {
    distpach(tweetAction.updateTweet.pending());
    const response = await customFetch(
      { method: "PATCH" },
      `/tweet/like/${tweetId}`
    );
    const data = response?.data
    if (data){
      distpach(tweetAction.updateTweet.fulfill(data));
      if (
        userName === name ||
        tweetList
          .find((element: any) => element._id === tweetId)
          ?.likes?.some((element: any) => element.userName === name)
      ) {
        return;
      }

      if (socket && socket.connected) {
        console.log('emit like', room);
        socket.emit('like', { room, userName, name, tweetId, data });
      } else {
        console.log('socket is connected. Connecting....');
        socket.connect();
        socket.once('connect', () => {
          console.log('Socket connected. Emitting like event.');
          socket.emit('like', { room, userName, name, tweetId, data });
        })
      }
    }
    else distpach(tweetAction.updateTweet.errors(response?.error));
  };
  const { data: tweet } = useSelector((state: any) => state.tweet);
  const findTweet =
    tweet && tweet.find((element: IData) => element._id === tweetId);
  const countLike = findTweet && findTweet.likes ? findTweet.likes.length : 0;
  const countComment =
    findTweet && findTweet.comments ? findTweet.comments.length : 0;
  const countBookmarks =
    findTweet && findTweet.bookmarks ? findTweet.bookmarks.length : 0;
  const listLike = findTweet?.likes?.map((element) => element.userName) || [];
  const isLike = listLike.includes(name);
  const handleBookmark = async () => {
    distpach(tweetAction.updateTweet.pending());
    const response = await customFetch(
      { method: "PATCH" },
      `/tweet/bookmark/${tweetId}`
    );
    if (response?.data) {
      console.log("count bookmark ", response.data )
      distpach(bookmarkAction.updateCountBookmark.fulfill(response.data))
      distpach(tweetAction.updateTweet.fulfill(response.data));
    } else distpach(tweetAction.updateTweet.errors(response?.error));
  };
  const isBookmarked =
    findTweet && findTweet.bookmarks
      ? findTweet.bookmarks.includes(name)
      : false;
      
  return (
    <View style={style.container}>
      <View>
        <TouchableOpacity style={style.button1}>
          <Image
            style={style.imageAvatar}
            source={{
              uri: Array.isArray(imageAuthor?.data)
                ? imageAuthor.data.find(
                    (user: any) => user.userName === userName
                  )?.imageAvatar
                : null,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={style.container2}>
        <View style={style.container3}>
          <TouchableOpacity>
            <Text style={style.textName}>{`${fullName}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={style.textUsername}>{`@${userName}`}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={
              imageUrl ? style.contentWithoutImage : style.contentWithoutImage
            }
          >{`${content}`}</Text>
          {imageUrl && (
            <TouchableOpacity style={style.button2}>
              <Image style={style.imageTweet} source={{ uri: imageUrl }} />
            </TouchableOpacity>
          )}
        </View>
        <View style={style.container4}>
          <TouchableOpacity style={style.button3} onPress={handleLike}>
            {isLike ? (
              <AntDesign name="hearto" size={24} color="red" />
            ) : (
              <AntDesign name="hearto" size={24} />
            )}
            <Text>{`${countLike}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button4}>
            <EvilIcons name="comment" size={30} color="black" />
            <Text>{`${countComment}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button5}>
            {isBookmarked ? (
              <Pressable onPress={handleBookmark}>
                <AntDesign name="staro" size={24} color="red" />
              </Pressable>
            ) : (
              <Pressable onPress={handleBookmark}>
                <AntDesign name="staro" size={24} color="black" />
              </Pressable>
            )}
            <Text>{`${countBookmarks}`}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.container5}>
          <TouchableOpacity onPress={navigateToProfile}>
            <Image
              style={style.imageAvatarComment}
              source={{ uri: avatarimage }}
            />
          </TouchableOpacity>

          <View>
            <TextInput
              style={style.textInputComment}
              underlineColor="transparent"
              theme={{ colors: { primary: "transparent" } }}
              placeholder="Thêm bình luận"
              placeholderTextColor="grey"
              multiline={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
