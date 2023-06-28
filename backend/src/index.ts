import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';

const app = express()

app.use(cors({
    
    credentials: true
}))
app.use(compression())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(2222, () => {
    console.log("Server start on port 2222")
})

const MONGO_URL = 'mongodb+srv://VovikZip:VovikZip@diplom-proj.sr0xtey.mongodb.net/diplom?retryWrites=true&w=majority'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL).then(() => console.log('DB is OK'))
mongoose.connection.on("error", (error : Error) => console.log(error))

app.post('/loh', (req : express.Request, res : express.Response) => {
    try {

        const {password, email} = req.body

        if (!email || !password) {
            return res.sendStatus(400).json({
                message: 'misha'
            })
        } 
        
        res.json({
            message: 'Vladick ne loh'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Vladick loh'
        })
    }
})

app.get('/misha', (req : express.Request, res : express.Response) => {
    try {
        console.log(111)
        res.status(200).json({
            message: 'Misha ne loh'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Misha loh'
        })
    }
})


app.post('/mikola', (req : express.Request, res : express.Response) => {
    try {
        const val = req.body
        console.log(2222)

        console.log(val)


        res.status(200).json({
            message: 'Misha loh'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Misha loh'
        })
    }
})

app.post('/data', (req, res) => {
  // Обробка отриманих даних з модуля A9G
  const receivedData = req.body;
  console.log(receivedData)
  // Виконайте необхідні дії з отриманими даними

  // Надішліть відповідь на модуль A9G
  res.send('Дані успішно отримані');
});

app.use('/', router())

