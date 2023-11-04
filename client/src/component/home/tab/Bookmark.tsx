import * as React from 'react';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Text, View, Image, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

const user = { id: '@huongquadeo', fuleName: 'Nguyễn Huỳnh Hương', email: 'huongquadeo@gmail.com', profile: require('../../../../../client/assets/Huong.png'), }

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
  }


]

function Bookmark({ navigation }: { navigation: any }) {
  //    const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent:'center',
          alignItems:'center'
        }}


      ><Text style={{
        fontWeight:'bold',
        fontSize:15,
        color:'#3B82F6'
      }}>BOOKMARKS</Text>
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
                  source={item.profile}
                />
              </TouchableOpacity>
            </View>
            <View style={{
              width: '80%',


            }}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity>
                  <Text style={{
                    fontWeight: 'bold'
                  }}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{
                    color: '#B1B1B1'
                  }}>{item.id}</Text>
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

export default Bookmark