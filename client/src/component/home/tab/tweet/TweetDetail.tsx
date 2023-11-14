import * as React from 'react';
import { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


function TweetDetail({ navigation }: { navigation: any }) {
    const route = useRoute();

    const [userRoute, setUserRoute] = useState(Object)
    const [tweetRoute, setTweetRoute] = useState([])
    const [like, setLike] = useState([])
    useEffect(() => {
        setLike(route.params?.listLike)
    }, [route.params?.listLike])
    useEffect(() => {
        setTweetRoute(route.params?.tweet)
    }, [route.params?.tweet])
    useEffect(() => {
        setUserRoute(route.params?.user)
    }, [route.params?.user])
    console.log(tweetRoute)
    return (
        <View
            style={{
                flex: 2,
                gap: 10,
                justifyContent: 'center',
                width: '100%'
            }}>
            <View style={{
                flexDirection: 'row',
                padding: 5,
                margin: 5,

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
                            source={{ uri: tweetRoute.profile }}
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
                            }}>{userRoute.fullName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                color: '#B1B1B1'
                            }}>@{userRoute.id}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{}}>
                        <Text>{tweetRoute.description}</Text>
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
                                source={{ uri: tweetRoute.img }}
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

                    }}
                >
                    <AntDesign name='hearto' size={24} color="black" />
                    <Text>{tweetRoute && tweetRoute.like ? tweetRoute.like.length : 0} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                }}
                    onPress={() => {
                        //     navigation.navigate('TweetDetail',{ user:u, tweet:item})
                    }}
                >
                    <EvilIcons name="comment" size={30} color="black" />
                    <Text>{tweetRoute && tweetRoute.cmt ? tweetRoute.cmt.length : 0}</Text>
                </TouchableOpacity>


            </View>
                </View>


            </View>
            
        </View>
    )
}

export default TweetDetail