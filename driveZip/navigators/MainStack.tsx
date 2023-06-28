import {createStackNavigator} from '@react-navigation/stack'
import { MainParamList } from '../types/navigations'
import HomeScreen from '../screens/HomeScreen'
import QRCodeScannerScreen from '../screens/QRCodeScreen'
import MapScreen from '../screens/MapScreen'
import RentScreen from '../screens/RentScreen'

const Stack = createStackNavigator<MainParamList>()

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={MapScreen} options={{title: 'Підійдіть до обраного самокату'}} />
            <Stack.Screen name="Scan" component={QRCodeScannerScreen} options={{title: 'Проскануйте код'}} />
            <Stack.Screen name="Rent" component={RentScreen} options={{title: 'Ваша поїздка', headerShown: false,}} />
        </Stack.Navigator>
    )
}