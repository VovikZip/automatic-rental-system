import exporess from 'express'
import {register, login} from '../controllers/authentication'
import { registerValidation, loginValidation } from '../validations/UserValid'
import {handleValidationErrors} from '../helpers/handleValidationErrors'

export default (router : exporess.Router) => {
    router.post('/auth/register', registerValidation, handleValidationErrors, register)
    router.post('/auth/login', loginValidation, handleValidationErrors, login)
}