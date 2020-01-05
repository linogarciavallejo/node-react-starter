const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Product');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://linovallejo:jklsdfjlksdfjkl@cluster0-k4pfw.azure.mongodb.net/node-react-starter`, { useNewUrlParser: true });

app.use(bodyParser.json());

require('./routes/productRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});

