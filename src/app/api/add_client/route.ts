import { NextResponse } from "next/server";
import mongoose, { ObjectId, Query } from "mongoose";
import { connectToMongo, } from "../ServerFunctions";
import 'dotenv/config';
import { therapists, clients } from "../Schemas/UserSchemas";
import { QueryResult } from "../Interfaces";
/**
 * 
 * Problems: What If two people have the same name?
 */



export async function POST(request: Request){
    try {
        await connectToMongo();
        let data = await request.json();

        let query = await clients.find({"Info.Firstname": data.Firstname, "Info.Lastname": data.Lastname});


        let resMessage = "";

        let x : QueryResult = query[0];
        
        if(x != undefined){
            x.Messages.push("abc")
            await query[0].save()
            resMessage = "Appointment request sent"
        }

        
        return NextResponse.json({"msg": resMessage}, {status: 200});

    } catch (error) {
        mongoose.disconnect();
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}