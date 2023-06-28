import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native'

const FPage = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

`

const AuthSegment = styled.View`
  display: flex;
  height: 50%;
  align-items: center;
  justify-content: flex-end;
  
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

`
const AuthButtonView = styled.View`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`

const StartText = styled.Text`
  color: #fff;
`

const AppLogo = styled.Image`
  width: 86px;
  height: 86px;
  border-radius: 15px;
`

export default function FirstScreen() {

    const navigation = useNavigation()
  
    return (
      <FPage >
        <AuthSegment>
          <AppLogo source={require('../imgs/logo.png')}/>
        </AuthSegment>
        
        <AuthSegment>
          <AuthButtonView>
            <AuthButton 
              onPress={() => navigation.navigate("Login")}
            >
              <StartText>Увійти</StartText>
            </AuthButton>
            <AuthButton
              onPress={() => navigation.navigate("Register")}
            >
              <StartText>Створити аккаунт</StartText>
            </AuthButton>
            {/* <AuthButton color="#000000" title="Login"/>
            <AuthButton color="#000000" title="Create an account"/> */}
          </AuthButtonView>
        </AuthSegment>
        
      </FPage>
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