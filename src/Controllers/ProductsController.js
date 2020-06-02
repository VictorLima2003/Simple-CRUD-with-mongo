const mongoose = require('mongoose');
const Product = require('../Models/product');
const ValidationContract = require('../validators/fluent-validator');

module.exports = {
    
    async get(req, res) {
        const data = await Product.find({active:true}, 'title description price slug tags')

        res.json(data);
    },


    async getBySlug(req, res) {
        const data = await Product.find({ slug: req.params.slug ,active:true}, 'title description price slug tags')

        res.json(data);
    },


    async getById(req, res) {
        try {
            const product = await Product.findById(req.params.id)

            return res.send({ product })
        } catch {
            return res.status(400).send({ error: 'Produto não encontrado...' })
        } 
    },


    async getByTag(req, res) {
        try {
            const product = await Product.find({tags:req.params.tag}, 'title description price slug tags')

            return res.send({ product })
        } catch {
            return res.status(400).send({ error: 'Produto não encontrado...' })
        } 
    },


    async post(req, res) {
        let contract = new ValidationContract()
        contract.hasMinLen(req.body.title, 3, 'O titulo deve conter no minimo três caracteres')
        contract.hasMinLen(req.body.description, 3, 'A descrição deve conter no minimo três caracteres')
        contract.hasMinLen(req.body.slug, 3, 'O slug deve conter no minimo três caracteres')

        // Se os dados forem invalidos
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

        try {
            const product = await Product.create(req.body);

            return res.send({ message: "produto cadastrado com sucesso"})
        } catch {
            res.status(400).send({ error: "Error creating a new product" })
        }
    },
    

    async put(req, res) {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }, { new: true })

            return res.send({ product })
        } catch {
            return res.status(400).send({ error: 'Produto não encontrado...' })
        } 
    },

    async delete(req, res) {
        try {
            Product.findOneAndRemove(req.body.id)
                   .then(() => {
                        res.status(200).send({ message: "Produto deletado com sucesso!" })    
                   })
           
        } catch {
            return res.status(400).send({ error: 'Falha ao deletar produto verifique detalhes na requisição' });
        } 
    }
}
