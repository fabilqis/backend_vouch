const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const TicketScheme = new Scheme({
    id: String,
    name :  String,
    status :  String,
    logs : String
    
})

let models = mongoose.model("ticket", TicketScheme, "ticket", true);
module.exports.models = models;