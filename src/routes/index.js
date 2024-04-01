const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/productos', (req, res) => {
    res.render('products.html');
});

router.get('/categorias/:categoria', (req, res) => {
    let categoria = req.params.categoria;
    res.render('category.html', { categoria });
});

router.get('/product/:id', (req, res) => {
    let id = req.params.id;
    res.render('oneProduct.html', { id });
});


router.get('/terminos', (req, res) => {
    res.render('terminos.html');
});

router.get('/preguntas', (req, res) => {
    res.render('preguntas.html');
});

router.get('/nosotros', (req, res) => {
    res.render('nosotros.html');
});

router.get('/adm-control-panel', (req, res) => {
    res.render('adm-control-panel.html');
});


module.exports = router;