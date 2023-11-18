import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Feed from "./tab/Feed";
import Bookmark from "./tab/Bookmark";
import Search from "./tab/Search";
import { Profile } from "../profile/Profile";
import { Notifications } from "../notifications/Notifications";
import { useSelector } from "react-redux";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  const { data: notifications } = useSelector((state: any) => state.notifications);
  const unreadNotifications = notifications && notifications.filter((notification: any) => !notification?.isRead);
  const unreadCount = unreadNotifications ? unreadNotifications.length : 0;
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#3B82F6"
      //    labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "tomato" }}
    >
     <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialCommunityIcons name="bell" color={color} size={26} />
              {unreadCount > 0 && <Text style={{ color: "white", backgroundColor: "red", borderRadius: 10, paddingHorizontal: 6, position: "absolute", top: 0, right: 0 }}>{unreadCount}</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarLabel: "search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarLabel: "Bookmark",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="star" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
