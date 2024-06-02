//The process of making api

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req:NextRequest) {
    try { 
        const {rows} = await sql `select * from todo2`;
        return NextResponse.json(rows, {status: 200})        
    } catch (err) {
        return NextResponse.json(err, {status: 500})
    }
}

//create POST which accept id, text and completed, then insert data into todo2 table

export async function POST(req:NextRequest) {
    const {id, text, completed} = await req.json();
    try {

        // Execute SQL INSERT query to insert data into todo2 table
        // returning * (return staric kro jo like wohi return bh krdo )
        const {rows} = await sql `insert into todo2 values (${id}, ${text}, ${completed}) returning *;`;
        // Return success response
        return NextResponse.json(rows, {status: 200})
    } catch (err) {
        // Return error response if any error occursf
        return NextResponse.json(err,{status: 500})   
    }
}

//create DELETE which accept id then delete id's record from todo table

export async function DELETE (req: NextRequest) {
    const { id } = await req.json();
    try {    // The RETURNING * clause returns the updated row after the update operation is performed.
        // DELETE FROM todo specifies the table from which rows are to be deleted (todo).
        const {rows} = await sql` delete from todo2 where id =  ${id} returning *;`;
        return NextResponse.json({"Record deleted =" : rows }, {status: 200});
    } catch (err) {     
        console.error('Error deleting todo:', err);
        return NextResponse.json(err,{status: 500})
    }
}

//create PATCH which accept id and completed then updates the id's record from todo table
export async function PATCH(req: NextRequest) {
    // Extract id and completed from the request body
    const {id, completed} = await req.json()
    try {   //The RETURNING * clause returns the updated row after the update operation is performed.
        // SET completed = ${completed} sets the value of the completed column to the value provided by the completed variable.
        // WHERE id = ${id} specifies the condition for updating, ensuring that only rows with a specific id are updated. ${id} is likely a placeholder for the value of the id variable.
        const {rows} = await sql`update todo2 set completed = ${completed} where id = ${id} returning *;`;
        return NextResponse.json(rows,{status: 200})
    } catch (err) {
        return NextResponse.json(err, {status: 500})
    }
}

export async function PUT(req:NextRequest) {
    const {id, text}= await req.json()
    try {
        const {rows} = await sql`update todo2 set text = ${text} where id = ${id} returning *;`;
        return NextResponse.json({"update=" : rows},{status: 200})
        
    } catch (err) {
        return NextResponse.json(err, {status : 500})

    }
    
}