import * as React from 'react';
import { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import io from 'socket.io-client';



// const apiURL = 'https://6544a3ea5a0b4b04436ca3b6.mockapi.io/User/1'
// const apiURL2 = 'https://6544a3ea5a0b4b04436ca3b6.mockapi.io/User/1/Tweet'
 var user = { 
   // id: 'huongquadeo', fullName: 'Nguyễn Huỳnh Hương', email: 'huongquadeo@gmail.com', profile: 'https://res.cloudinary.com/djuwysj2y/image/upload/v1699265075/onoodmvs44ociyrnrzyq.jpg', 
}
var data = [{}]

const footer = () => {
    return (
        <View style={{ flex: 1, height: 500, backgroundColor: 'yellow' }}>
            <Text>Footer</Text>
        </View>
    )
}

function Feed({ navigation }: { navigation: any }) {
    const route = useRoute();
    var [u, setUser] = useState(Object);
    var [t, setTweet] = useState([]);
    var [like, setLike] = useState('hearto');
    
    useEffect(() => {
        axios.get('http://localhost:3001/data')
            .then(response => {
                const sort =response.data.sort((a:any,b:any)=>b.id-a.id)
                setTweet(sort)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [route.params?.data]);
    useEffect(() => {   
        axios.get('http://localhost:3001/user')
            .then(response => {
                
                setUser(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])
    function checkLike(item: any) {
        for (var i = 0; i < item.length; i++) {
            if (item[i].username == u.username) {
                setLike('heart')
                return 'heart'
            }
        }
        setLike('hearto')
        return 'hearto'
    }
    const navigateToProfile = () => {
        navigation.navigate('Profile');
    }
    const navigateToTweet = () => {
        navigation.navigate('Tweet', { user: u });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>


            <FlatList data={t}
                ListHeaderComponent={() => {
                    return (
                        <View
                            style={{
                                flex: 2,
                                flexDirection: 'row',
                                marginTop: 30,
                                marginBottom: 10,
                                gap: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%'
                            }}>

                            <TouchableOpacity
                                style={{
                                    width: '20%',
                                }}
                                onPress={navigateToProfile}>

                                <Image
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderWidth: 1,
                                        borderRadius: 50,
                                    }}
                                    source={{ uri: u.profile }}
                                />
                            </TouchableOpacity>

                            <View style={{
                                width: '50%',
                            }}>

                                <TouchableOpacity style={{
                                    height: 70,
                                    justifyContent: 'center',
                                }}
                                    onPress={navigateToTweet}
                                >
                                    <Text style={{
                                        color: 'grey',
                                        fontSize: 20,
                                    }}>
                                        Bạn đang nghĩ gì ?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '20%',

                            }}>
                                <TouchableOpacity
                                    style={{}}
                                    onPress={navigateToTweet}
                                >

                                    <Feather name="image" size={40} color="black" />
                                </TouchableOpacity>
                            </View>



                        </View>
                    )
                }}
                ListFooterComponent={footer}
                renderItem={({ item }) =>
                    <View style={{

                        flexDirection: 'row',
                        borderRadius: 30,
                        padding: 5,
                        margin: 5,
                        shadowColor: 'grey',
                        shadowOffset: {
                            width: 3,
                            height: 3
                        },
                        shadowRadius: 5,
                    }} >
                        <View>
                            <TouchableOpacity style={{
                                width: '20%',
                                paddingLeft: 30,
                                alignItems: 'center',


                            }}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderWidth: 0.5,
                                        borderRadius: 30,


                                    }}
                                    source={{ uri: item.profile }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            width: '80%',


                        }}>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontWeight: 'bold'
                                    }}>{item.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{
                                        color: '#B1B1B1'
                                    }}>@{item.username}</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{}}>
                                <Text>{item.description}</Text>
                                <TouchableOpacity style={{
                                    paddingTop: 10
                                }}>
                                    <Image
                                        style={{
                                            width: 280,
                                            height: 300,
                                            resizeMode: 'cover',
                                            //borderWidth: 0.5,
                                            borderRadius: 20,
                                            //borderColor:'white'
                                        }}
                                        source={{ uri: item.img }}
                                    />
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                alignItems: 'center',
                                padding: 10,
                                flexDirection: 'row',
                                gap: 20
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10
                                }}
                                    onPress={() => {
                                        if (like == 'heart') {

                                            setLike('hearto')
                                        }
                                        else {
                                            setLike('heart')
                                        }

                                    }}
                                >
                                    <AntDesign name={like} size={24} color="black" />
                                    <Text>{item && item.like ? item.like.length : 0}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10
                                }}
                                    onPress={() => {
                                        navigation.navigate('TweetDetail', { user: u, tweet: item, listLike: item.like, listCmt: item.cmt })
                                    }}
                                >
                                    <EvilIcons name="comment" size={30} color="black" />
                                    <Text>{item && item.cmt ? item.cmt.length : 0}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10
                                }}>
                                    <AntDesign name="staro" size={24} color="black" />
                                    <Text>{item && item.cmt ? item.cmt.length : 0}</Text>
                                </TouchableOpacity>

                            </View>
                            <View
                                style={{
                                    flex: 2,
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    marginBottom: 30,
                                    gap: 10,
                                    //                                justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <TouchableOpacity onPress={navigateToProfile}>
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderWidth: 1,
                                            borderRadius: 50
                                        }}
                                        source={{ uri: u.profile }}
                                    />
                                </TouchableOpacity>

                                <View style={{
                                }}>
                                    <TextInput style={{
                                        width: 180,
                                        height: 50,
                                        backgroundColor: 'white',
                                    }}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: "transparent" } }}
                                        placeholder="Thêm bình luận"
                                        placeholderTextColor='grey'
                                        multiline={true} />
                                </View>

                            </View>
                        </View>

                    </View>

                }

            />

        </View>
    );
}

export default Feed