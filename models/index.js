const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const TicketScheme = new Scheme({
    name :  String,
    status :  String,
    logs : String,
    createdAt : String,
    updateAt : String
    
})

let models = mongoose.model("details", TicketScheme, "details", true);
module.exports.models = models;