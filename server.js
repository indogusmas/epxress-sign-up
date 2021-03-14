const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/routes');
const errorHandle = require('./middleware/errorMiddleware')

dotenv.config();

mongoose.connect(process.env.DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
});





app.listen(port, ()=> {
    console.log(`Server running ${port}`);
});


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use('/images',express.static('./images'));

//Error handle
app.use(errorHandle.errorHandler);
//app.use(errorHandle.notFound);

app.use('/api/v1/',userRoute);
