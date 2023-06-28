import express from 'express'
import { createUser, getUserByEmail } from '../db/users'
import { random, authentication} from '../helpers'
import jwt from 'jsonwebtoken'

export const login = async (req : express.Request, res : express.Response) => {
    try {
        const {password, email} = req.body
        
        if (!email || !password) {
            return res.sendStatus(400).json({
                message: 'misha'
            })
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        if(!user) {
            return res.status(400).json({
                message: 'Email or password is not correct'
            })
        }

        const expectedHash = authentication(user.authentication.salt, password)

        if (user.authentication.password !== expectedHash) {
            return res.status(400).json({
                message: 'Email or password is not correct'
            })
        }

        const salt = random()

        const token = jwt.sign(
            {
                _id: user._id
            },
            salt,
            {
                expiresIn: '10d'
            }
        )

        res.json({
            user,
            token
        })        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Login error'
        })
    }
}

export const register = async(req : express.Request, res : express.Response) => {
    try {
        const {email, password, username} = req.body
        const exitingUser = await getUserByEmail(email)

        if(exitingUser) {
            return res.status(400).json({
                message: 'Email is already used'
            })
        }

        const salt = random()
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        const token = jwt.sign(
            {
                _id: user._id
            },
            salt,
            {
                expiresIn: '10d'
            }
        )
        
        res.json({
            user,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Register error'
        })
    }
}