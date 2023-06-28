import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styled from 'styled-components/native'
import imgPath from '../utils/imgPath';
import * as Location from 'expo-location'
import { useEffect, useMemo, useState } from 'react';
import { ILocation } from '../types/location';
import MainStack from '../navigators/MainStack';

const MapContainer = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`

const AuthButton = styled.TouchableOpacity`
  width: 200px;
  height: 40px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 10px;
`



const Butt = styled.TouchableOpacity`
  position: absolute;
  height: 7%;
  width: 50%;
  background: #000000;
  z-index: 1;
  top: 89%;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ButtText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`

export default function HomeScreen() {

  // const [location, setLocation] = useState();
  // const [coor, setCoor] = useState({latitude: 0, longitude: 0})
  const [errorMsg, setErrorMsg] = useState('');
  const [location, setLocation] = useState({
    latitude: 48.749922,
    longitude: 30.220484,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  })

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({...location, latitude: loc.coords.latitude, longitude: loc.coords.longitude})
    })();
  }, []);

    return (
      <MainStack/>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
  