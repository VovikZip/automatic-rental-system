import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components/native'
import imgPath from '../utils/imgPath';
import * as Location from 'expo-location'
import { useEffect, useMemo, useState } from 'react';
import { ILocation } from '../types/location';
import { useNavigation } from '@react-navigation/native';

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
  const [errorMsg, setErrorMsg] = useState('');
  const [location, setLocation] = useState({
    latitude: 48.836410,
    longitude: 30.314693,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })
  const [showMarkers, setShowMarkers] = useState(false); // State to control marker visibility
  
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ ...location, latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      
      // Delay showing the markers after 3 seconds
      setTimeout(() => {
        setShowMarkers(true);
      }, 3000);
    })();
  }, []);

  return (
    <MapContainer>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        showsUserLocation={true}
      >
        {showMarkers && (
          <>
            <Marker
              image={imgPath.ready}
              coordinate={{ latitude: 48.836168, longitude: 30.312845 }}
            >
              <Callout>
                <Text>Scooter 1</Text>
              </Callout>
            </Marker>
            <Marker
              image={imgPath.ready}
              coordinate={{ latitude: 48.748403, longitude: 30.219754 }}
            >
              <Callout>
                <Text>Scooter 2</Text>
              </Callout>
            </Marker>
          </>
        )}
      </MapView>
      <Butt onPress={() => navigation.navigate("Scan")}>
        <ButtText>Розпочати</ButtText>
      </Butt>
      {/* <AuthButton>
        <StartText>Зареєструватися</StartText>
      </AuthButton> */}
    </MapContainer>
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
