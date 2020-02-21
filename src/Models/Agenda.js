const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let email_match = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let AgendaSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [email_match, 'Invalid email'],
    },
    phone: {
        type: String,
        unique: true,
        required: [true, 'Phone is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    biography: {
        type: String,
        required: [true, 'Biography is required'],
    }
}, {
    versionKey: false
});

//exports
module.exports = mongoose.model('Agenda', AgendaSchema);