import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToMongo, } from "../ServerFunctions";
import 'dotenv/config';
import { therapists, clients } from "../Schemas/UserSchemas";


export async function POST(request: Request){
    try {
        await connectToMongo();
        let data = await request.json();


        let resMessage = "";
        
        return NextResponse.json({"msg": resMessage}, {status: 200});

    } catch (error) {
        mongoose.disconnect();
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}