const mongoose = require("mongoose")
const User = require("../models/user.model");

const connect = async () => {
    try {
         const connection = await mongoose.connect(process.env.MONGO_URI);
        // const db = connection.connection.db;
        //
        // const collections = await db.listCollections({ name: 'users' }).toArray();
        // if (collections.length > 0) {
        //     await db.collection('users').drop();
        //     console.log('Users collection dropped successfully');
        // } else {
        //     console.log('Users collection does not exist.');
        // }

        // await User.updateMany({}, { $set: { subscription: {} } });
        //
        // console.log("Subscription field added to all users.");


        console.log('Connected to database');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connect