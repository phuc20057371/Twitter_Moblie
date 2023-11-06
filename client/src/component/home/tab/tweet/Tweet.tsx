import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const user = { id: '@huongquadeo', fuleName: 'Nguyễn Huỳnh Hương', email: 'huongquadeo@gmail.com', profile: require('../../../../../../client/assets/Huong.png'), }

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
    console.log({
        parsed // 200, success!
    });
}

function Tweet() {
    const [image, setImage] = React.useState('');
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImageToCloudinary(new File([result.assets[0].uri], 'download.jpg'));
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
                    <Image source={user.profile} style={{ width: 50, height: 50, borderRadius: 50 }} />
                </View>
                <View >
                    <TextInput style={{
                        width: 300,
                        height: 70,
                        backgroundColor: 'white',
                    }}
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
                            onPress={ pickImage}
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
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#3B82F6', fontSize: 18, fontWeight: 'bold' }}>Tweet</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Tweet