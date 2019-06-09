const mongoose = require('mongoose');

// Create the order model for mongoose
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Set the product field to reference a valid product id
    quantity: { type: Number, default: 1 } // Set the default quantity to one (if it isn't provided)
});

module.exports = mongoose.model('Order', orderSchema);