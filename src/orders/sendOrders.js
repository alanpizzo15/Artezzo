const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/sendorder', async (req, res)=> {
    //console.log(req.body[1]);
    const productos = req.body[1];

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: `${process.env.NODEMAILER_USER}`,
            pass: `${process.env.NODEMAILER_PASS}`
        }
    };

    var productsHtml = ``;
    var Total = 0;

    productos.forEach(item => {
        Total += item.price*item.quantity;

        productsHtml +=
        `
        <hr>
        <br>
        <img src="${item.imageurl}" style="width: 60px; height: 60px;"/><br>
        <p>Producto: ${item.name}</p>
        <p>Precio: ${item.price}</p>
        <p>Peso: ${item.porcion}</p>
        <p>Cantidad: ${item.quantity}</p>
        `
        
    });

    console.log(productsHtml);

    const Mensaje = {
        from:   process.env.NODEMAILER_USER,
        to:     process.env.NODEMAILER_USER,
        subject:    'Notificacion de venta',
        html:   `<h2 style="text-align:center;">Notificacion de venta</h2>
                <p>Nombre: ${req.body[0].clientname}</p>
                <p>Telefono: ${req.body[0].phone}</p>
                <p>Localidad: ${req.body[0].location}</p>
                <p>Direccion: ${req.body[0].address}</p><br>
                <h3>Productos</h3>
                ${productsHtml}
                <hr>
                <h3>Total: $ ${Total}</h3>
                `

    };

    const transport = nodemailer.createTransport(config);

    const result = await transport.sendMail(Mensaje);
});

module.exports = router;