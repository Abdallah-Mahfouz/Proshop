import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./Models/userModel.js";
import Product from "./Models/productModels.js";
import Order from "./Models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users); //users inserted from this line
    const adminUser = createdUsers[0]._id; //we get the admin
    //we're going to have a variable that's going to hold the products that we're going to insert.
    const sampleProducts = products.map((product) => {
      //we create a variable with all the products, including the admin user
      return { ...product, user: adminUser };
    });
    //we insert all that into the insert all the products into the database.
    await Product.insertMany(sampleProducts);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
