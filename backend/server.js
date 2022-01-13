import express from "express"
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import { errorHandler, notFoundHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const app = express()
connectDB();

app.use(express.json())

app.get('/', (req, res) => {res.send('API up..');})

app.use('/api/products', productRoutes)
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p=> p._id === req.params.id)
    res.json(product);
})

app.use('/api/users', userRoutes)
app.use('/api/order', orderRoutes)

app.use('/api/config/paypal', (req, res)=> {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`[${process.env.NODE_ENV}]Listening on 5000`))