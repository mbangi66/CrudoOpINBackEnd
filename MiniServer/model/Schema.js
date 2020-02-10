const mongodb = require('mongoose');

const subSchema = new mongodb.Schema({
    name:{
        type:String,
        required:true
    },
    subscribedChannel : {
        type:String,
        required:true
    },
    subscribeDate:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports = mongodb.model('Subscribers',subSchema)