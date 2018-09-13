const models = require('../models/index').models

module.exports = app => {
    app.get("/", (req, res) => {
        res.send("Ticket API")
    })

    app.get("/tickets", (req, res)=> {
        models.find({}, (err, details) =>{
            if (err)
            return res.send.err
            res.json(details)
        })
    })

    app.get("/tickets/:stats", (req, res) => {
        models.find({
            status : req.params.status
        },
        (err, details) => {
            if (details) {
                res.json(details)
            } else {
                res.status(400).send("Invalid status")
            }
        })
    })

    app.post("/tickets/add", (req, res)=> {
        const details = new models();
        details.id = req.body.id;
        details.name = req.body.name;
        details.status = "Open";
        details.logs = req.body.logs;

        if(details.name){
            details.save((err, details) => {
                if (err) return res.send(err)
                res.json({
                    status : 'Success added',
                    data: details
                })
            })
        } else {
            res.status(400).send("Please fill all data")
        }
    })

    app.post("/tickets/delete", (req, res) => {
        models.findById(req.body._id, (err, details) => {
            if(details){
                details.remove(err => {
                    if (err) return res.send(err)
                    res.json({
                        status : 'Ticket deleted'
                    })
                })
            } else {
                res.status(400).send("Invalid ID")
            } 
        })
    })

    app.post("/tickets/update", (req,res)=> {
        models.findOne({name : req.body.name}, (err, details) => {
            if (details){
                details.status = req.body.status
                details.logs = req.body.logs
                
                details.save((err, details) => {
                    res.json({
                        status : 'Ticket Updated',
                        data: details
                    })
                })
            } else {
                res.status(400).send("Invalid ticket logs")
            }
        })
    })
}