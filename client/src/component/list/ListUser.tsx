import { View, Image,Text, Pressable } from "react-native";
interface ListUserProps {
    userName:string,
    fullName:string,
    imageUrl:string
}
export const ListUser:React.FC<ListUserProps> = ({userName, fullName, imageUrl}) =>{
    return(
        <View style={{ flex: 1, justifyContent:'space-between', width: 300, marginTop:10 }}>
        <View style={{ flexDirection: "row", alignItems:'center' }}>
          <Image
            style={{ height: 60, width: 60, borderRadius: 50 }}
            source={{uri: imageUrl}}
          />
          <View style={{flexDirection:'column', paddingLeft:10, paddingRight:10, width:170}}>
            <Text>{`${fullName}`}</Text>
            <Text>{`@${userName}`}</Text>
          </View>
          <Pressable style={{backgroundColor:'#3B82F6', width:50,height:30, justifyContent:'center', alignItems:'center',borderRadius: 12,}}>
            <Text style={{color:'white'}}>Follow</Text>
          </Pressable>
        </View>
      </View>
    )
}