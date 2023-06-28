import mongoose from "mongoose";

const ScooterSchema = new mongoose.Schema(
    { 
        title: {
            type: String,
            required: true
        },
        location: {
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            }, 
        },
        busy: {
            type: Boolean,
            required: true,
        }
    }
)

export const ScooterModel = mongoose.model('Scooter', ScooterSchema)