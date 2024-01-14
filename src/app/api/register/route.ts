import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { therapists, clients } from '../Schemas/UserSchemas';
import { doesUsernameExist, hashPassword, connectToMongo } from "../ServerFunctions";
import 'dotenv/config';


export async function POST(request: Request){

    try {
        await connectToMongo();

        let x = await request.json();

        let query1 = therapists.where({ Username: x.username});
        let query2 = clients.where({ Username: x.username});
        let hashedPassword = await hashPassword(x);
        let userQuery;
        
        if(x.role === "therapist"){
            userQuery = await query1.findOne();

            if(await doesUsernameExist(x.username)){
                mongoose.disconnect();
                return NextResponse.json({ msg: 'Username Already Exists'} , {status: 200});
            } else {
                let newTherapist = new therapists({
                    Username: x.username,
                    Password: hashedPassword,
                    Role: x.role,
                    DatesAvailable: [],
                    History: [],
                    Clients: [],
                    Info: {
                        Name: x.name,
                        Age: x.age,
                        Speciality: x.specialty,
                        Bio: x.bio,
                        Education: x.education,
                        YearsWorking: x.yearsWorking
                    },
                })
    
                await newTherapist.save();
                mongoose.disconnect();
                return NextResponse.json({ msg: 'Account Created'} , {status: 200});
            }

        } else if(x.role === "client") {

            if(await doesUsernameExist(x.username)){
                mongoose.disconnect();
                return NextResponse.json({ msg: 'Username Already Exists'} , {status: 200});
            } else {
                let newClient = new clients({
                    Username: x.username,
                    Password: hashedPassword,
                    Role: x.role,
                    DatesReserved: [],
                    History: [],
                    Therapists: [],
                    Info: {
                        Name: x.name,
                        Age: x.age,
                        Bio: x.bio
                    },
                })
    
                await newClient.save();
                mongoose.disconnect();
                return NextResponse.json({ msg: 'Account Created'}, {status: 200})
            }

        } else {
            mongoose.disconnect();
            return NextResponse.json({ msg: 'Something went wrong'} , {status: 404});
        }
        
    } catch(error) {
        mongoose.disconnect();
        return NextResponse.json({ msg: 'Server Error :('} , {status: 500});
    }
    
}