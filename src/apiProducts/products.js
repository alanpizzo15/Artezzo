const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2; 
const fs = require('fs-extra');

//models
const Product = require('../models/product');

//Obtener todos los productos
router.get('/api/getproducts', async (req, res)=> {
    await Product
        .find()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({ message: error }));
});

//Obtener UN SOLO producto
router.get('/api/getproducts/:id', (req, res)=> {
    const { id } = req.params;
    Product
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error)=> res.json({ message: error }));
});

router.get('/api/getrelatedproducts/:category', (req, res) => {
    let cat = req.params.category;
    Product
        .aggregate([
            { $match: { category: cat } },
            { $sample: { size: 9 } }
        ])
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err}));
});

//añadir producto
router.post('/api/addproduct', async(req, res)=> {
    const result= await cloudinary.uploader.upload(req.file.path);
    const product = new Product();

    console.log(req.body)

    product.porciones = req.body.porciones;
    product.destacado = req.body.destacado; 
    product.name      = req.body.name;
    product.description  = req.body.description;
    product.nostock     = 'false';
    product.price     = req.body.price;
    product.category  = req.body.category;
    product.subcategory  = req.body.subcategory;
    product.filename  = req.file.filename;
    product.imageUrl  = result.secure_url;
    product.imageid   = result.public_id;
    product.originalname = req.file.originalname;

    product.porcion1 = req.body.porcion1;
    product.porcion2 = req.body.porcion2;
    product.porcion3 = req.body.porcion3;

    await product.save();
    await fs.unlink(req.file.path);
});

//Editar un producto
router.put('/api/editproduct/:id', async (req, res)=> {
    let productToEdit = await Product.findById(req.params.id);
    let prodId = req.params.id;

    console.log('tipo de dato porcion1: '+typeof(req.body.porcion1));

    if(req.body.name !== ''){
        const name = req.body.name;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { name } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.destacado !== ''){
        const destacado = req.body.destacado;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { destacado } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.category !== ''){
        const category = req.body.category;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { category } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.subcategory !== ''){
        const subcategory = req.body.subcategory;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { subcategory } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.description !== ''){
        const description = req.body.description;
        const prod_edited = await Product.updateOne({ _id: prodId}, { $set: { description } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.price !== ""){
        console.log("Entro a actualizar el precio")
        const price = req.body.price;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { price } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.nostock !== ''){
        const nostock = req.body.nostock;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { nostock } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.porcion1 !== ''){
        const porcion1 = req.body.porcion1;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { porcion1 } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.porcion2 !== ''){
        const porcion2 = req.body.porcion2;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { porcion2 } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.body.porcion3 !== ''){
        const porcion3 = req.body.porcion3;
        const prod_edited = await Product.updateOne({ _id: prodId }, { $set: { porcion3 } })
                                    .then((data)=> res.json(data))
                                    .catch((error)=> res.json({ message: error }));
    }
    if(req.file){
        //Elimino la imagen anterior en Cloudinary
        await cloudinary.uploader.destroy(productToEdit.imageid);
        //Subo a Cloudinary la imagen nueva
        let newImage = await cloudinary.uploader.upload(req.file.path);
        console.log(newImage);
        await fs.unlink(req.file.path);
        const imageUrl = newImage.secure_url;
        await Product.updateOne({ _id: productToEdit}, { $set: { imageUrl }})
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error}));
    };
});

//Eliminar un producto

router.delete('/api/deleteproduct/:id', async (req, res) => {
    const prod_id = req.params.id;
    await Product.findByIdAndDelete(prod_id, function (err, data){
        console.log(data);
        if(err){
            console.log(err)
        } else {
            cloudinary.uploader.destroy(data.imageid);
            console.log('Se eliminó el producto '+ data.name)
        }}).clone();
});

module.exports = router;