import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToMongo, getUserFromUsernameWithPass } from "../ServerFunctions";
import 'dotenv/config';


export async function POST(request: any){
    try {
        await connectToMongo();
        let data = await request.json();

        let queryUsername = data.username;

        let user = await getUserFromUsernameWithPass(queryUsername);
        
        if(user === null){
            mongoose.disconnect();
            return NextResponse.json({ msg: 'User not found'}, {status: 404})
        } else {
            return NextResponse.json(user, {status: 200});
        }
    } catch (error) {
        
    }
}