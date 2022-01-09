import mongoose from 'mongoose';
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

import users from './data/users.js'
import products from './data/products.js'

dotenv.config()
connectDB()

const importData = async () => {
    //DELETE all data
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        console.log(createdUsers);
        //use admin for all new products added
        const adminUser = createdUsers[0]._id
        
        const dummyProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })
      
        await Product.insertMany(dummyProducts);
        console.log('Data Imported!');
        process.exit(0);
    } catch (error) {
        console.log('DATA IMPORT UNSUCCESFULL: '+error);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
  
      console.log('Data Destroyed!');
      process.exit();
    }catch (error){
      console.error('DATA DESTROY UNSUCCESSFUL! '+error);
      process.exit(1);
    }
}
  
if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
  