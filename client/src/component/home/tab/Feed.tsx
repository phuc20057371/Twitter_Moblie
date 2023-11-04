import * as React from 'react';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Text, View, Image, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

var data = [
    {
        name: 'Nguyễn Huỳnh Hương', id: '@huongquadeo', description: 'Chồng tôi đẹp trai quá',
        img: require('../../../../../client/assets/Doflamingo.jpg'), like: 999,
        profile: require('../../../../../client/assets/Huong.png'),
        cmt: [
            { id: '@phuc', name: 'Võ Hồng Phúc', Content: 'Thua mèo t nhé', at: '4:45PM' }
        ]
    },
    {
        name: 'Võ Hồng Phúc', id: '@phuc', description: 'Hello mọi người',
        img: require('../../../../../client/assets/meo.jpg'), like: 1000,
        profile: require('../../../../../client/assets/Phuc.png'),
        cmt: [
            { id: '@huongquadeo', name: 'Nguyễn Huỳnh Hương', Content: 'Trời đất ơi', at: '6:45PM' }
        ]
    },
    {
        name: 'Nguyễn Huỳnh Hương', id: '@huongquadeo', description: 'Chồng tôi đẹp trai quá',
        img: require('../../../../../client/assets/Doflamingo.jpg'), like: 999,
        profile: require('../../../../../client/assets/Huong.png'),
        cmt: [
            { id: '@phuc', name: 'Võ Hồng Phúc', Content: 'Thua mèo t nhé', at: '4:45PM' }
        ]
    },


]

function Feed() {
    return (
        <View style={{flex:1}}>
            <View
                style={{
                    flex: 2,
                    flexDirection: 'row',
                    marginTop: 30,
                    marginBottom: 30,
                    gap: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderRadius: 50
                    }}
                    source={data[0].profile}
                />
                <View style={{
                }}>
                    <TextInput style={{
                        width: 250,
                        height: 50,
                        borderWidth: 0.5,
                        borderRadius: 10,
                        borderColor: 'gray',
                        paddingLeft: 10

                    }}
                        placeholder='Bạn đang nghĩ gì ?'
                        placeholderTextColor='grey'
                    >

                    </TextInput>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <TouchableOpacity
                        style={{}}
                    >

                        <Feather name="image" size={40} color="black" />
                    </TouchableOpacity>
                </View>



            </View>

            <FlatList data={data}
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
                    }}>
                        <TouchableOpacity style={{
                            width: '20%',
                            paddingLeft: 15,
                            

                        }}>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderWidth: 0.5,
                                    borderRadius: 30,


                                }}
                                source={item.profile}
                            />
                        </TouchableOpacity>
                        <View style={{
                            width: '80%',


                        }}>
                            <View style={{ flexDirection: 'row' }}>

                                <Text>{item.name}</Text>
                                <Text>{item.id}</Text>
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
                                        source={item.img}
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
                                }}>
                                    <AntDesign name="hearto" size={24} color="black" />
                                    <Text>{item.like}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10
                                }}>
                                    <EvilIcons name="comment" size={30} color="black" />
                                    <Text>{item.cmt.length}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10
                                }}>
                                    <AntDesign name="staro" size={24} color="black" />
                                    <Text>{item.like}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                }

            />
        </View>
    );
}

export default Feed