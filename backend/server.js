import express from "express"
import dotenv from 'dotenv'
import morgan from "morgan"
import connectDB from './config/db.js'

import { errorHandler, notFoundHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'

dotenv.config()

const app = express()
app.use(morgan('dev'));
connectDB();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'backend/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend','build','index.html')));
} else {
    app.get('/', (req, res) => {res.send('API up..');})
}

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`[${process.env.NODE_ENV}]Listening on 5000`))