import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';

//const user = { id: '@huongquadeo', fuleName: 'Nguyễn Huỳnh Hương', email: 'huongquadeo@gmail.com', profile: require('../../../../../../client/assets/Huong.png'), }


function createNewTweet(o: any) {
    fetch('https://6544a3ea5a0b4b04436ca3b6.mockapi.io/User/1/Tweet', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // Send your data in the request body as JSON
        body: JSON.stringify(o)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(task => {
        // do something with the new task
    }).catch(error => {
        // handle error
    })
}

function Tweet({ navigation }: { navigation: any }) {
    const route = useRoute();
    var [image, setImage] = useState('')
    const [userRoute, setUserRoute] = useState(Object)
    const [content, setContent] = useState('')
    async function uploadImageToCloudinary(file: File) {
        const url = 'https://api.cloudinary.com/v1_1/djuwysj2y/upload';
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'twitter');
    
        const fetched = await fetch(url, {
            method: "post",
            body: data,
        });
        const parsed = await fetched.json()
        if (parsed.secure_url) {
            // Trả về đường dẫn (URL) của hình ảnh từ Cloudinary
            console.log("cloud", parsed.secure_url)
            setImage(parsed.secure_url)
            return parsed.secure_url;
        } else {
            // Xử lý lỗi nếu cần
            console.error('Failed to upload image to Cloudinary');
            return null;
        }
    }

    useEffect(() => {
        setUserRoute(route.params?.user)

    }, [route.params?.user])

    async function test() {
        const randomNumber = Math.floor(Math.random() * 10000000000) + 1;
        const randomString = randomNumber.toString();
        var dataa = {
            id:randomString,
            name: userRoute.fullName, username: userRoute.username, description: content,
            img: image, like: [],
            profile: userRoute.profile,
            cmt: []
        }
        axios.post("http://localhost:3001/data", dataa)
        .then(response => {
            console.log("Success:", response.data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
        console.log(dataa)
        navigation.navigate('Feed', { data: dataa })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {

            setImage(await uploadImageToCloudinary(new File([result.assets[0].uri], 'download.jpg')));
            console.log("ủi " + result.assets[0].uri)
  //          uploadImageToCloudinary(new File([result.assets[0].uri], 'download.jpg'));


        }
    };
    return (
        <View style={{ flex: 1, padding: 5, backgroundColor: 'white' }}>
            <View style={{
                flexDirection: 'row',
                gap: 10,
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <Image source={userRoute.profile} style={{ width: 50, height: 50, borderRadius: 50 }} />
                </View>
                <View >
                    <TextInput style={{
                        width: 300,
                        height: 70,
                        backgroundColor: 'white',
                    }}
                        onChangeText={setContent}
                        underlineColor="transparent"
                        theme={{ colors: { primary: "transparent" } }}
                        placeholder="Bạn đang nghĩ gì ?"
                        placeholderTextColor='grey'
                        multiline={true} />
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

                </ScrollView>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <TouchableOpacity
                            style={{}}
                            onPress={pickImage}
                        >

                            <Feather name="image" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => { }}
                        >
                            <MaterialCommunityIcons name="sticker-emoji" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                        onPress={test}
                    >
                        <Text style={{ color: '#3B82F6', fontSize: 18, fontWeight: 'bold' }}>Tweet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Tweet