import { Image, Text, TouchableOpacity, View } from "react-native";
import IData from "../../interface/IData";
import IUser from "../../interface/IUser";
import { TextInput } from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { style } from "./style";
interface LayoutTweetProps {
  item: IData;
  navigation: any;
  user: IUser;
  onLikePress: () => void;
  like: string;
}

export const LayoutTweet: React.FC<LayoutTweetProps> = ({
  item,
  navigation,
  user,
  like,
  onLikePress,
}) => {
  const navigateToProfile = () => {
    navigation.navigate("profile");
  };
  return (
    <View style={style.container}>
      <View>
        <TouchableOpacity style={style.button1}>
          <Image style={style.imageAvatar} source={{ uri: item.profile }} />
        </TouchableOpacity>
      </View>
      <View style={style.container2}>
        <View style={style.container3}>
          <TouchableOpacity>
            <Text style={style.textName}>{`${item.name}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={style.textUsername}>{`@${item.username}`}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{`${item.description}`}</Text>
          <TouchableOpacity style={style.button2}>
            <Image style={style.imageTweet} source={{ uri: item.img }} />
          </TouchableOpacity>
        </View>
        <View style={style.container4}>
          <TouchableOpacity style={style.button3} onPress={onLikePress}>
            <AntDesign name={like} size={24} color="black" />
            <Text>{item && item.like ? item.like.length : 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button4}
            onPress={() => {
              navigation.navigate("TweetDetail", {
                user: user,
                tweet: item,
                listLike: item.like,
                listCmt: item.cmt,
              });
            }}
          >
            <EvilIcons name="comment" size={30} color="black" />
            <Text>{item && item.cmt ? item.cmt.length : 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button5}>
            <AntDesign name="staro" size={24} color="black" />
            <Text>{item && item.cmt ? item.cmt.length : 0}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.container5}>
          <TouchableOpacity onPress={navigateToProfile}>
            <Image
              style={style.imageAvatarComment}
              source={{ uri: user.profile }}
            />
          </TouchableOpacity>

          <View style={{}}>
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
