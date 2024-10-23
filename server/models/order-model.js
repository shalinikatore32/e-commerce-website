const { Schema, model } = require('mongoose');
const { boolean } = require('zod');


const getCurrentISTTime = () => {
    const offsetIST = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const currentUTCTime = new Date();
    const currentISTTime = new Date(currentUTCTime.getTime() + offsetIST);
    return currentISTTime;
};
const orderModel = new Schema({
    email: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    tableNumber: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: getCurrentISTTime
    },
    status: {
        type:Boolean,
        required:false,
        default:false
    }
});

const placeOrder = model('Order', orderModel);

module.exports = placeOrder;
