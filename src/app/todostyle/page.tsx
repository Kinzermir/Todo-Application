"use client";
import { useState } from "react";
import { AiFillDelete, AiFillPlusCircle, AiFillSave } from "react-icons/ai";
const Page= () =>{
// todos: The current state, which will hold the list of todos. setTodos: A function to update the state.
// array destructuring to create two variables: [todos, setTodos] in variable ke through we will use useState aik variable se data ko access krnge oor aik se update krnge
//This specifies the type of the state that useState will manage. The type here is an array of objects which is id, text and completed.    
    const [todos, setTodos] = useState 
    <  
        {id: number , text : string, completed: boolean}[] //This is the initial value of the todos state, which is an empty array.
    >([])


    return(
        <div className=" w-screen h-screen bg-gray-300 p-8">
            <div className="w-1/2 mx-auto bg-white rounded-lg shadow-2xl mt-5 h-72 pt-3">
            <h1 className=" text-2xl font-extrabold text-black text-center">TODO APPLICATION</h1>
            <div className="flex justify-between items-center p-8">
                <input className=" border border-gray-300 rounded-md px-2 py-1 text-black "
                type="text"
                placeholder="Enter todo"
                />
                <AiFillSave className=" text-red-500 text-3xl"/>
                <button>
                <AiFillPlusCircle className=" text-green-500 text-3xl"/>
                </button>
               
            </div>
            {/* list of todos */}
            <ul className=" max-w-[300px] mx-auto p-5">
                {todos.map((todo)=>(
                    <li key={todo.id} className=" grid grid-cols-4 gap-x-4" >
                        <span>{todo.text}</span>
                        <span>{todo.completed ? "Done": "Not DOne"}</span>
                        <input type="checkbox" checked= {todo.completed} />
                        <span>
                            <AiFillDelete className=" text-red-600"/>
                        </span>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Page