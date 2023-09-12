const express = require("express")
const app = express()

const mongoose = require ("mongoose")

const Product = require('./models/productModel')

app.use(express.json());

app.use(express.urlencoded({extended : false}));


//routes

app.get('/', (req,res) => {
    res.send("Hellooo Node API")
})

app.get('/products' , async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

app.post('/products', async(req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }    
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

//update a product  

app.put('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //we cannot find any product in Database
        if(!product){
            return res.status(404).json({message : `Cannot find any product with this ID ${id}`})
        }

        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error,message);
        res.status(500).json({message : error.message})
        
    }
})

//delete a product

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message : `Cannot find any product with this ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : error.message})        
    }
})




mongoose.connect('mongodb+srv://vrindasukumar:Vrinda2127@cluster0.gt7mhyd.mongodb.net/Node_API?retryWrites=true&w=majority')
.then(() => {
    console.log("Database connected!!!")

    app.listen(3000, () =>{
        console.log("Node API app is running on port 3000!!!!!");
    })
}).catch ((error) => {
    console.log(error);
})