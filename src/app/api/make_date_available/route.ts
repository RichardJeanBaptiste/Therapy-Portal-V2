import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToMongo } from "../ServerFunctions";
import 'dotenv/config';
import { therapists, clients } from "../Schemas/UserSchemas";

const saveQuery = async (x:any, date: any) => {

    if(x.DatesAvailable.includes(date)){
        mongoose.disconnect();
        return  "Date already available";
    } else {
        x.DatesAvailable.push(date);
        await x.save();
        mongoose.disconnect();
        return "Date made available";
    }
}

export async function POST(request: Request){
    try {
        await connectToMongo();
        let data = await request.json();

        let queryUsername = data.Username;
        let queryDate = data.newDate;
  

        let query1 = await therapists.findOne({Username: queryUsername}).then((docs) => {
            return docs;
        });
    
        let query2 = await clients.findOne({Username: queryUsername}).then((docs) => {
            return docs;
        });

        let resMessage = "";
        if(query1 !== null){
            // therapist
            resMessage = await saveQuery(query1, queryDate);
        } else if(query2 !== null){
            //client
            resMessage = await saveQuery(query2, queryDate);
        } else {
            //User not found
            return null;
        }
        
        return NextResponse.json({"msg": resMessage}, {status: 200});

    } catch (error) {
        mongoose.disconnect();
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}