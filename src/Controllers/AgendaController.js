//MODELS
const Agenda = require('../Models/Agenda');

//GET ALL
exports.index = async (req, res) => {
    //all the agendas are searched
    await Agenda.find({})
        .exec((err, agendasDB) => {
            //if an error occurred with the DB
            if(err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    error: 'Error searching in DB'
                });
            }
            
            //if all goes well, return the data
            return res.json({
                ok: true,
                agendas: agendasDB
            });
        });
}

//CREATE ONE
exports.store = async (req, res) => {
    //form data is received
    let body = req.body;
    //console.log(body.age);

    //a new agenda instance is created
    let agenda = new Agenda({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone,
        age: body.age,
        biography: body.biography
    });

    //the agenda is saved in DB
    await agenda.save({runValidators: true}, (err, agendaDB) => {
        
        //if an error occurred with the DB
        if(err){
            console.log(err);
            return res.json({
                ok: false,
                error: 'Error saving in DB',
            });
        }

        //if all goes well, return the data
        return res.json({
            ok: true,
            agenda: agendaDB,
        });
    });
}

//GET ONE
exports.show = async (req, res) => {
    //get the id of the parameters
    let id = req.params.id;

    //the agenda is searched by id
    await Agenda.findById(id)
    .exec((err, agendaDB) => {
        //if an error occurred with the DB
        if(err){
            console.log(err);
            return res.json({
                ok: false,
                error: 'Error searching in DB',
            });
        }

        //if the agenda is not found
        if(!agendaDB){
            return res.json({
                ok: false,
                error: 'Agenda not found',
            });
        }
        
        //if all goes well, return the data
        return res.json({
            ok: true,
            agenda: agendaDB
        });
    });
}

//UPDATE
exports.update = async (req, res) => {
     //get the id of the parameters
    let id = req.params.id

    //receive the data to update
    let body = {};
    if (req.body.first_name) body.first_name = req.body.first_name;
    if (req.body.last_name) body.last_name = req.body.last_name;
    if (req.body.email) body.email = req.body.email;
    if (req.body.phone) body.phone = req.body.phone;
    if (req.body.age) body.age = req.body.age;
    if (req.body.biography) body.biography = req.body.biography;

    body = { $set: body }

    console.log(body);
    //the agenda is searched by id. if is found, it is updated
    await Agenda.findByIdAndUpdate(id,  body, {new: true, runValidators: true}, (err, agendaDB) => {
        //if an error occurred with the DB
        if(err){
            console.log(err);
            return res.json({
                ok: false,
                error: 'Error searching in DB',
            });
        }

        //if the agenda is not found
        if(!agendaDB){
            return res.json({
                ok: false,
                error: 'Agenda not found',
            });
        }
        
        //if all goes well, return the data
        return res.json({
            ok: true,
            agenda: agendaDB
        });
    });
}

//DELETE
exports.delete = async (req, res) => {
    //get the id of the parameters
    let id = req.params.id;

    //the agenda is searched by id. if is found, it is deleted
    await Agenda.findByIdAndDelete(id, (err, agendaDB) => {
        //if an error occurred with the DB
        if(err){
            console.log(err);
            return res.json({
                ok: false,
                error: 'Error searching in DB',
            });
        }

        //if the agenda is not found
        if(!agendaDB){
            return res.json({
                ok: false,
                error: 'Agenda not found',
            });
        }
        
        //if all goes well, return the data
        return res.json({
            ok: true,
            deletedAgenda: agendaDB
        });
    });
}
