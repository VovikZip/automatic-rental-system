import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import { setupStore } from './store';
import MainNavCont from './screens/MainNavCont';
import { LogBox } from 'react-native';
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {

  

  const store = setupStore()
  
  return (
    <Provider store={store}>
        <MainNavCont/>

    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
