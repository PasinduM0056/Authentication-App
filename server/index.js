const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

// 1) MIDDLEWARE
app.use(express.json());
// 2) ROUTE

// 3) MONGO DB CONNECTION
mongoose.connect('mongodb+srv://pasimred05:54GmEDzYnUJY8z2I@authenticationapp.qkrxo.mongodb.net/?retryWrites=true&w=majority&appName=AuthenticationApp')
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB: ', error));
// 4) GLOBAL ERROR HANDLER

// 5) SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})

