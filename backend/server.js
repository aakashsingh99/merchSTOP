import express from "express"
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoute.js'
import { errorHandler, notFoundHandler} from './middleware/errorMiddleware.js'

dotenv.config()
const app = express()
connectDB();

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('API up..');
})

app.use('/api/products', productRoutes)

app.use(notFoundHandler);
app.use(errorHandler);

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p=> p._id === req.params.id)
    res.json(product);
})

app.listen(PORT, console.log(`[${process.env.NODE_ENV}]Listening on 5000`))