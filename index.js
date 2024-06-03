import express from 'express'
import db_connection from './DB/connection.js'

import userRouter from './src/modules/users/user.router.js'
import productRouter from './src/modules/products/products.router.js'

let app = express()

app.use(express.json())
app.use(userRouter)
app.use(productRouter)

db_connection()

app.listen(3000, ()=>{console.log('running on port 3000');})