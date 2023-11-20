import React from "react";
import { View,Image,Text } from "react-native";

interface IComment{
    imageUrl:string,
    userName:string, 
    content:string
}
export const ListComment:React.FC<IComment> =({imageUrl,userName, content})=>{
    return(
        <View>
        <View style={{ flex: 1, justifyContent: "space-between", marginTop: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: 40, width: 40, borderRadius: 50 }}
              source={{ uri: imageUrl }}
            />
            <View style={{ flexDirection: "column", paddingLeft: 10 }}>
              <Text style={{fontWeight:'600'}}>{`${userName}`}</Text>
              <Text>{`${content}`}</Text>
            </View>
          </View>
        </View>
      </View>
    )
}