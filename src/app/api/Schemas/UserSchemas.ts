import mongoose from 'mongoose';

const TherapistSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Role: String,
    DatesAvailable: Array,
    DatesScheduled: Array,
    Clients: Array,
    History: Array,
    Messages: Array,
    Info: Array,
})

const ClientSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Role: String,
    DatesReserved: Array,
    Therapists: Array,
    History: Array,
    Messages: Array,
    Info: Array,
})

export const therapists = mongoose.models.therapists || mongoose.model("therapists", TherapistSchema, "therapists");

export const clients = mongoose.models.clients || mongoose.model("clients", ClientSchema, "clients");

