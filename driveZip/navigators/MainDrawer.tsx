import React from 'react'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View, Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import { useAppSelector } from '../hooks/reducer';
import LogoutScreen from '../screens/LogoutPage';

type drawerType = {
    Home: undefined;
    Settings: undefined;
    Logout: undefined; 
}

const Drawer = createDrawerNavigator<drawerType>();

const MainDrawer = () => {
  const {data} = useAppSelector(state => state.authReducer)

  return (
    <Drawer.Navigator 
        initialRouteName='Home' 
        drawerContent={
            (props) => {
            return (
                <SafeAreaView>
                <View
                    style={{
                    height: 200,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: "#f4f4f4",
                    borderBottomWidth: 1
                    }}
                >
                    <Image
                    source={require('../assets/defaultUser.png')}
                    style={{
                        height: 130,
                        width: 130,
                        borderRadius: 25
                    }}
                    />
                    <Text
                    style={{
                        fontSize: 22,
                        marginVertical: 6,
                        fontWeight: "bold",
                        color: "#111"
                    }}
                    >{data?.user.username}</Text>
                    <Text
                    style={{
                        fontSize: 16,
                        color: "#111"
                    }}
                    >{data?.user.email}</Text>
                </View>
                <DrawerItemList {...props} />
                </SafeAreaView>
            )
            }
        }
        screenOptions={{
            drawerStyle: {
              backgroundColor: "#fff",
              width: 250
            },
            headerStyle: {
              backgroundColor: "#000000",
              height: 85
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            },
            drawerLabelStyle: {
              color: "#000"
            }
        }}
    >
        <Drawer.Screen 
            name='Home' 
            component={HomeScreen} 
            options={{
                drawerLabel: "Home",
                title: "DriveZip",
                drawerIcon: () => (
                  <SimpleLineIcons name="home" size={20} color="#808080" />
                )
              }}
        />
        <Drawer.Screen 
            name='Settings' 
            component={SettingsScreen}
            options={{
                drawerLabel: "Settings",
                title: "Settings",
                drawerIcon: () => (
                  <SimpleLineIcons name="settings" size={20} color="#808080" />
                )
              }}
        />
        <Drawer.Screen 
            name='Logout' 
            component={LogoutScreen}
            options={{
                drawerLabel: "Logout",
                title: "Logout",
                drawerIcon: () => (
                  <SimpleLineIcons name='logout' size={20} color='#808080' />
                )
              }}
        />
        
    </Drawer.Navigator>
    
  )
}

export default MainDrawer
