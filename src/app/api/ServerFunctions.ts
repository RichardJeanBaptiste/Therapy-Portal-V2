import mongoose from "mongoose";
import 'dotenv/config';
import { therapists, clients } from "./Schemas/UserSchemas";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";


interface Therapist {
    id: string;
    Username: string;
    Role: string;
    DatesAvailable: Array<string>;
    DatesScheduled: Array<string>;
    Clients: Array<string>;
    Info: string;
}
  
interface Client {
    _id: string;
    Username: string;
    Role: string;
    DatesReserved: Array<string>;
    Therapists: Array<string>;
    Info: string;
}


let mongo_uri:string | undefined = process.env.MONGO_URI;
const saltRounds = 10;
//const secretKey = process.env.JWT_KEY;


export const connectToMongo = async () => {
    if(mongo_uri == undefined){
        return NextResponse.json({"msg": "Failed to Connect to Server"}, {status: 404});
    } else {
        await mongoose.connect(mongo_uri);
        return "Connected to client";
    }
}


/**
 * Check if Username exists in therapist and client collection || returns boolean
 * @param requestUsername: String
 * @returns {boolean}
 */
export const doesUsernameExist = async (requestUsername: String) => {

    if(mongo_uri == undefined){
        
    } else {
        await mongoose.connect(mongo_uri);
    }

    let query1 = await therapists.findOne({Username: requestUsername}).then((docs) => {
        return docs;
    })

    let query2 = await clients.findOne({Username: requestUsername}).then((docs) => {
        return docs;
    })

    if(query1 === null && query2 === null){
        return false;
    } else {
        return true;
    }

}


export const hashPassword = async (x: any) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(x.password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

export const comparePassword = async (passAttempt: any, hash: any)=> {
    try {
        const result = await bcrypt.compare(passAttempt, hash);
        return result;
    } catch (error) {
        return error;
    } 
}

export const findUser = async (requestUsername: string, requestPassword: string): Promise<Array<string> | null> => {
    let query1 = await therapists.findOne({Username: requestUsername}).then((docs) => {
        return docs;
    });

    let query2 = await clients.findOne({Username: requestUsername}).then((docs) => {
        return docs;
    });

    if(query1 !== null){
        // therapist
       let checkedPassword = await comparePassword(requestPassword, query1.Password);

       if(!checkedPassword){
            return null;
       } else {
            return [query1._id, query1.Username, query1.Role, query1.DatesAvailable, query1.DatesScheduled, query1.Clients, query1.Info]
       }
       
    } else if(query2 !== null){
        //client
        let checkedPassword = await comparePassword(requestPassword, query2.Password);

        if(!checkedPassword){
            return null;
        } else {
            return [query2._id, query2.Username, query2.Role, query2.DatesReserved, query2.Therapists, query2.Info]
        }
        
    } else {
        //User not found
        return null;
    }
}

export const getUserFromUsername = async (requestUsername: string): Promise<Array<string> | Object | null | Therapist> => {
    let query1 = await therapists.findOne({Username: requestUsername}).then((docs) => {
        return docs;
    });

    let query2 = await clients.findOne({Username: requestUsername}).then((docs) => {
        return docs;
    });

    if(query1 !== null){
        // therapist
       
        return { "id": query1._id, "Username": query1.Username, "Role": query1.Role, "DatesAvailable": query1.DatesAvailable, "DatesScheduled": query1.DatesScheduled, "Clients": query1.Clients, "Info": query1.Info } as Therapist;
       
    } else if(query2 !== null){
        //client

        return [query2._id, query2.Username, query2.Role, query2.DatesReserved, query2.Therapists, query2.Info]
        
    } else {
        //User not found
        return null;
    }
}

