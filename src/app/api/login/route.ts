import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToMongo, findUser } from "../ServerFunctions";
import 'dotenv/config';


export async function POST(request: Request){
    try {
        await connectToMongo();
        let data = await request.json();

        let queryUsername = data.username;
        let queryPassword = data.password;

        let user = await findUser(queryUsername, queryPassword);
        
        if(user === null){
            mongoose.disconnect();
            return NextResponse.json({ msg: 'User not found'}, {status: 404})
        } else {
            mongoose.disconnect();
            return NextResponse.json(user, {status: 200});
        }
    } catch (error) {
        mongoose.disconnect();
        return NextResponse.json({msg: "Server Error :("}, {status: 500});
    }
}