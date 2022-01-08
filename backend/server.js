import express from "express"
import products from './data/products.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`[${process.env.NODE_ENV}]Listening on 5000`))

app.get('/', (req, res) => {
    res.send('API up..');
})

app.get('/api/products', (req, res) => {
    res.json(products);
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p=> p._id === req.params.id)
    res.json(product);
})