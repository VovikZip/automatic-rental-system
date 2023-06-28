import {createStackNavigator} from '@react-navigation/stack'
import FirstScreen from '../screens/FirstScreen'
import LoginPage from '../screens/LoginScreen'
import RegisterPage from '../screens/RegisterScreen'
import { AuthStackParamList } from '../types/navigations'

const Stack = createStackNavigator<AuthStackParamList>()

export default function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Start" component={FirstScreen} options={{title: 'DriveZip'}} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
        </Stack.Navigator>
    )
}