import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../hooks/reducer'
import { resetData } from '../store/slices/auth'

const LogoutScreen = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(resetData())
    }, [])
    
  return (
    <View>
      
    </View>
  )
}

export default LogoutScreen

const styles = StyleSheet.create({})