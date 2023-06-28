import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'incorrect email').isEmail(),
    body('password', 'password is too short').isLength({min: 6}),
    body('username', 'username is too short').isLength({min: 3})
]

export const loginValidation = [
    body('email', 'incorrect email').isEmail(),
    body('password', 'password is too short').isLength({min: 6}),
]