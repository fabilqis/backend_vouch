const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ticketschema = new Schema({
  name: String,
  status: String,
  logs: String,
  createdAt: String,
  updatedAt: String
});

let Models = mongoose.model("ticket", Ticketschema, "ticket", true);
module.exports.Models = Models;