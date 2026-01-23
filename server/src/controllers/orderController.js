const Order = require("../models/Order");

const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length == 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const getOrderById = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if(!order) {
            return res.status(404).json({message:'Order not found'});
        }
        res.json(order);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const getMyOrders =  async(req, res) => {
    try{
        const orders = await Order.find({user: req.user._id});
        res.json(orders);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
module.exports = { addOrderItems, getOrderById, getMyOrders};