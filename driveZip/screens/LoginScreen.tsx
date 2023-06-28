import React, { useState } from 'react'

import { StatusBar, View, Text} from 'react-native'
import styled from 'styled-components/native'
import { useAppDispatch, useAppSelector } from '../hooks/reducer'
import { fetchAuth, fetchTest } from '../store/slices/auth'

const LogPage = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #1b1b1b;
`

const FormContent = styled.View`
  background: #f0f0f0;
  width: 90%;
  border-radius: 15px;
  padding: 10px 5px 10px 5px;
`

const FormText = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`

const AuthText = styled.Text`
  font-size: 26px;
  font-weight: 600;
`

const AuthSubText = styled.Text`
  font-size: 15px;
`

const FormInputs = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LoginInput = styled.TextInput`
  height: 40px;
  width: 90%;
  border-width: 2px;
  margin-top: 25px;
  border-radius: 30px;
  padding-left: 15px;
`

const TextForget = styled.Text`
  color: blue;
  text-align: right;
  padding-right: 15px;
  margin-top: 10px;
`

const FormButtons = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
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
const StartText = styled.Text`
  color: #fff;
`

export default function LoginPage()  {
  const dispatch = useAppDispatch()
  const {status, data} = useAppSelector(state => state.authReducer)

  // const [auth, setAuth] = useState({email: '', password: ''})
  const [email, setUserEmail] = useState('')
  const [password, setUserPassword] = useState('')

  const loginHandler = () => {
    dispatch(fetchAuth({email,password}))
  }

  return (
    <LogPage>
      <FormContent>
        <FormText>
          <AuthText>Авторизуватися</AuthText>
          <AuthSubText>у свій обліковий запис, щоб продовжити</AuthSubText>
        </FormText>
        <FormInputs>
          <LoginInput 
            placeholder="Email..." 
            value={email}
            onChangeText={setUserEmail}
          />
          <LoginInput 
            secureTextEntry={true} 
            placeholder="Пароль..."
            value={password}
            onChangeText={setUserPassword}
          />
        </FormInputs>
        <TextForget>Forgot password?</TextForget>
        <FormButtons>
          {/* <Text>{status}</Text> */}
          <AuthButton
            onPress={loginHandler}
          >
            <StartText>Увійти</StartText>
          </AuthButton>
        </FormButtons>
      </FormContent>
    </LogPage>
  )
}
