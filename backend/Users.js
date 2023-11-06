// const mongoose = require("mongoose");

// const schema = new mongoose.Schema({
//     data:Object,
    
// })

// module.exports = mongoose.model('cards',schema);    

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    data: Object,
});

const CardModel = mongoose.model('cards', schema);

CardModel.init().then(() => {
    console.log('Mongoose schema and model are initialized successfully');
}).catch((error) => {
    console.error('Error initializing Mongoose schema and model:', error);
});

module.exports = CardModel;