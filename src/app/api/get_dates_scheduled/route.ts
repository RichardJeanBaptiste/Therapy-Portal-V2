import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToMongo, getUserFromUsername, isTherapist} from "../ServerFunctions";
import 'dotenv/config';
import { QueryResult, Therapist } from "../Interfaces";



export async function POST(request: Request){
    try {
        await connectToMongo();
        let data = await request.json();
        
        let res = {};

        let query = await getUserFromUsername(data.Username);

        if(isTherapist(query)){
            //console.log(query.DatesScheduled);
            res = query.DatesScheduled;
        }
        
        return NextResponse.json(res, {status: 200})

    } catch (error) {
        mongoose.disconnect();
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}