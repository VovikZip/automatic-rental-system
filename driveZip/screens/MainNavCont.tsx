import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../navigators/AuthStack';
import MainDrawer from '../navigators/MainDrawer';
import { navigationRef } from '../navigators/RootNavigator';
import { useAppSelector } from '../hooks/reducer';

const MainNavCont = () => {

    const isAuth = useAppSelector(state => state.authReducer.data)
    // console.log(Boolean(isAuth))
    
    return (
        <NavigationContainer ref={navigationRef}>
            {!Boolean(isAuth)
                ? <AuthStack />
                : <MainDrawer />
            }
        </NavigationContainer>
    )
}

export default MainNavCont