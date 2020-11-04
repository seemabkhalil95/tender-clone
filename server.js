import express from'express';
import mongoose from 'mongoose';
import cors from'cors';
import Cards from'./dbCards.js';
const app = express();
app.use(cors());

// Port
const port = process.env.PORT || 8001;
// Mongo connection url
const connection_url ='mongodb+srv://admin:IrJkqlF3lf5KR5gP@cluster0.cjgic.mongodb.net/tenderdb?retryWrites=true&w=majority';
// DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send("Hello World!!!")
});
// Data pushing
app.post('/tender/cards',(req,res)=>{
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})
// Download Data
app.get('/tender/cards',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
