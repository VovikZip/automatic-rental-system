import { validationResult } from "express-validator";
import express from 'express'

export const handleValidationErrors = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    next()
}