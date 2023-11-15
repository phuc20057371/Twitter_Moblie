import * as React from "react";
import { View, FlatList } from "react-native";
import { TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { userSearchActions } from "../../../redux/actions/userSearchActions";
import { customFetch } from "../../../utilities/customFetch";
import { ListUser } from "../../list/ListUser";

function Search() {
  const [searchValue, setSearchValue] = React.useState("");
  const distpach = useDispatch();
  const users = useSelector((state:any)=>state.users)
  const handleInputChange = async (text: string) => {
    setSearchValue(text);
    if (searchValue) {
      handleSearch({ query: searchValue });
    } else {
      distpach(userSearchActions.userSearch.fulfill([]));
    }
  };
  const handleSearch = async (searchValue: { query: string }) => {
    distpach(userSearchActions.userSearch.pending());
    const response = await customFetch(
      { method: "POST", data: searchValue },
      "/search"
    );
    if (response?.data)
      distpach(userSearchActions.userSearch.fulfill(response.data));
    else distpach(userSearchActions.userSearch.errors(response?.error));
  };
  const imageAvatarAuthor = useSelector((state:any)=>state.imageAuthor)
  console.log("dataa usser search ", users.data)
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "#D9D9D9",
          borderRadius: 25,
          backgroundColor: "white",
          width: 345,
        }}
      >
        <AntDesign name="search1" size={20} style={{ marginLeft: 10 }} />
        <TextInput
          style={{
            backgroundColor: "white",
            flex: 1,
            height: 43,
            borderRadius: 25,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 25,
          }}
          underlineColor="transparent"
          placeholder="Search on Twitter"
          theme={{ colors: { primary: "transparent" } }}
          onChangeText={handleInputChange}
        />
      </View>
      <FlatList data={users.data}
      renderItem={({item})=>(
        <ListUser fullName={item.fullName} userName={item.userName} key={item.userName}
        imageUrl={ Array.isArray(imageAvatarAuthor?.data)
          ? imageAvatarAuthor.data.find((user: any) => user.userName === item.userName)?.imageAvatar
          : null}
        />
      )}/>
    </View>
  );
}

export default Search;
