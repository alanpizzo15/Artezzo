const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    porciones: {type: Boolean},
    destacado: {type: Boolean},
    name: {type: String},    
    description: {type: String},
    stock: {type: String},
    nostock: {type: Boolean},
    price: {type: Number},
    imageUrl: {type: String},
    category: {type: String},
    subcategory: {type: String},
    imageid: {type: String},
    porcion1: {type: Number},
    porcion2: {type: Number},
    porcion3: {type: Number}
});

module.exports = mongoose.model('Product', productSchema);