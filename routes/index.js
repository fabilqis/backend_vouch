const models = require('../models/index').models

module.exports = app => {
    app.get("/", (req, res) => {
        res.send("Ticket API of backendvouch")
    })

    app.get("/tickets", (req, res)=> {
        models.find({}, (err, details) =>{
            if (err)
            return res.send.err
            res.json(details)
        }).sort("-updateAt")
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
    models.findOne({ name: req.body.name }, (err, ticket) => {
        if (!details) {
        const details = new models();
        details.name = req.body.name;
        details.status = "Open";
        details.logs = req.body.logs;
        ticket.createdAt = new Date();
        ticket.updatedAt = new Date();

        if(details.name){
            details.save((err, details) => {
                if (err) return res.send(err)
                res.json({
                    status : 'Success added',
                    data: details
                })
            })
        } else {
            res.status(400).send("Please fill all data");}
        } else {
            res.status(400).send("This ticket name is taken");
          }
    })
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
                details.updatedAt = new Date();
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