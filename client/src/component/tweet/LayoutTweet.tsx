import { Image, Text, TouchableOpacity, View } from "react-native";
import IData from "../../interface/IData";
import IUser from "../../interface/IUser";
import { TextInput } from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { style } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { tweetAction } from "../../redux/actions/tweetAction";
import { customFetch } from "../../utilities/customFetch";
interface LayoutTweetProps {
  navigation?: any;
  tweetId:string,
  fullName:string,
  userName:string,
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
  selected
}) => {
  const navigateToProfile = () => {
    navigation.navigate("profile");
  };
  const distpach = useDispatch()
  console.log("object", fullName)
  const imageAuthor = useSelector((state:any)=>state.imageAuthor)
  const user = useSelector((state:any)=>state.user)
  const name =
  user.data?.userName === undefined ? "user name" : user.data?.userName;
  const avatarimage =
  user.data && user.data?.imageAvatar ? user.data.imageAvatar : "";
  const handleLike = async ()=>{
    distpach(tweetAction.updateTweet.pending())
    const response = await customFetch({method:'PATCH'}, `/tweet/like/${tweetId}`)
    if(response?.data) distpach(tweetAction.updateTweet.fulfill(response.data))
    else distpach(tweetAction.updateTweet.errors(response?.error))
}
const {data:tweet} = useSelector((state:any)=>state.tweet)
  const findTweet = tweet && tweet.find((element:IData) => element._id === tweetId )
  const countLike = findTweet && findTweet.likes ? findTweet.likes.length :0
   const listLike = tweet?.likes?.map((element: any) => element.userName) || [];
   const isLike = listLike.includes(name);
  console.log("true", isLike)
  return (
    <View style={style.container}>
      <View>
        <TouchableOpacity style={style.button1}>
          <Image style={style.imageAvatar} source={{ uri:  Array.isArray(imageAuthor?.data)
              ? imageAuthor.data.find((user: any) => user.userName === userName)?.imageAvatar
              : null }} />
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
        <Text style={imageUrl ? style.contentWithoutImage : style.contentWithoutImage}>{`${content}`}</Text>
        {imageUrl && (
            <TouchableOpacity style={style.button2}>
              <Image style={style.imageTweet} source={{ uri: imageUrl }} />
            </TouchableOpacity>
          )}
        </View>
        <View style={style.container4}>
          <TouchableOpacity style={style.button3} onPress={handleLike}>
          {isLike ?(
            <AntDesign  name={'hearto'} size={24}  color={'red'}/>
            ):(
              <AntDesign  name={'hearto'} size={24} />
          )}
            <Text>{`${countLike}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button4}
           
          >
            <EvilIcons name="comment" size={30} color="black" />
            <Text>{10}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button5}>
            <AntDesign name="staro" size={24} color="black" />
            <Text>{10}</Text>
          </TouchableOpacity>
        </View>
        <View style={style.container5}>
          <TouchableOpacity onPress={navigateToProfile}>
            <Image
              style={style.imageAvatarComment}
              source={{ uri: avatarimage }}
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
