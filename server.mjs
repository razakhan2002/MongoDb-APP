import express from 'express';
import cors from 'cors'
import mongoose from "mongoose";


const app = express()
const port = 3000


app.use(cors())
app.use(express.json())






////////////////Post///////////////////////////////////////////////

app.post('/todos', (req, res) => {

    todoModel.create({ text: req.body.text }, (err, saved) => {
        if (!err) {
            console.log(saved)
            res.send({
                message: 'Your todo is Saved'
            })

        } else {
            res.status(500).send({
                message: "Server Error"
            })

        }
    })

})


////////////////GET///////////////////////////////////////////////

app.get('/todos', (req, res) => {

    todoModel.find({}, (err, saved) => {
        if (!err) {
            console.log(saved)
            res.send({
                message: 'here is Your todo',
                data:saved
            })

        } else {
            res.status(500).send({
                message: "Server Error"
            })

        }
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

////////////////Schemas///////////////////////////////////////////////

let todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classId: String,
    Date: { type: Date, default: Date.now }
})

let todoModel = mongoose.model('data', todoSchema);

/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb+srv://raza:dbtest@cluster0.l67jo2z.mongodb.net/abcdatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', () => {
    console.log('mongoos is connected')
});
mongoose.connection.on('disconnected', () => {
    console.log('mongoos is disconnected');
    process.exit(1)
});

mongoose.connection.on('error', (err) => {
    console.log('mongoos connection error' + err)
});

process.on('SIGINT', () => {
    console.log('app is terminating');
    mongoose.connection.close(() => {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

////////////////mongodb connected disconnected events///////////////////////////////////////////////






