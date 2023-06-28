import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

export default function QRCodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (result: BarCodeScannerResult) => {
    setScanned(true);
    setScannedData(result.data);
    Alert.alert('Scanned!', `Оренда самокату: ${result.data}`, [
      { text: 'Підтвердити вибір', onPress: () => {
        setScanned(false)
        navigation.navigate("Rent")
        setHasPermission(false)
        
      } },
      { text: 'Відмінити', onPress: () => {
        setScanned(false)
        console.log(result.data)
        } 
      },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
      </View>
      {scanned && (
        <View style={styles.scanOverlay}>
          <Text style={styles.scanOverlayText}>Scanned: {scannedData}</Text>
        </View>
      )}
    </View>
  );
}

const overlayColor = 'rgba(0, 0, 0, 0.5)';
const borderColor = '#fff';
const borderSize = 2;
const borderRadius = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 200,
    height: 200,
    borderWidth: borderSize,
    borderColor: borderColor,
    borderRadius: borderRadius,
    overflow: 'hidden',
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: overlayColor,
  },
  scanOverlayText: {
    fontSize: 24,
    color: '#fff',
  },
});
