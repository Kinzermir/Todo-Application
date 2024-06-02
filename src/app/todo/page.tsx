"use client";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillPlusCircle, AiFillSave } from "react-icons/ai";
const Page= () =>{
// todos: The current state, which will hold the list of todos. setTodos: A function to update the state.
// array destructuring to create two variables: [todos, setTodos] in variable ke through we will use useState aik variable se data ko access krnge oor aik se update krnge
//This specifies the type of the state that useState will manage. The type here is an array of objects which is id, text and completed.    
    const [todos, setTodos] = useState 
    <  
        {id: number , text : string, completed: boolean}[] //This is the initial value of the todos state, which is an empty array.
    >([])
    const [editText, setEditText] = useState<{
        id:number;
        text: string;
        completed: boolean;
    }>();
    const [input, setInput] = useState("");  //This line initializes the state variable input with an empty string as the initial value.

    
    // fetch data from the server 
    // The fetchData function asynchronously fetches data from the /api/todo endpoint and updates the todos state with the retrieved data.
    const fetchData  = async () => {
        const res = await fetch("/api/todo")
        const data = await res.json()
        console.log(data);
        
        setTodos(data)
    }
    useEffect(()=>{
        fetchData();
    },[]) //array ([]) to useEffect, it ensures that the useeffect runs only once agr ye app use na kro tu ye terminal me infinitely execute hota rahe ga mtln aik dafa fetch kro oor aik dafa render kro instead of infinitely.

    async function handleAdd() {
         //call POST method to pass id, text, completed
        const res = await fetch("/api/todo",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },// id: Date.now is builtin function which generate number of mili-seconds which will be our new unique id
            body: JSON.stringify({id: Date.now(), text: input, completed: false})
        });
        setInput(""); 
        fetchData(); // mtlb update data mujhe show kre after chagnes
    }

    // create handleDelete which deletes record from server
    const handleDelete = async (id: number)=>{
        const res = await fetch(`/api/todo`,{
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({id}),
        });
        fetchData();//After the DELETE request is completed, fetchData is called to refresh the list of todos.
    }
//create handleCompleted which update record from server
    async function handleCompleted(id:number, completed: boolean){
        const res = await fetch(`/api/todo`,{
            method:"PATCH",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({id, completed: !completed}),
        })
        fetchData();
    }

    function handleText(id: number) {
        //find the todo with the id
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {  //setEditText(todo): Sets the editText state to the found todo item. Sets the input state to the text of the found todo item. This allows the text of the selected todo to be shown in the input field for editing.
          setEditText(todo);
          setInput(todo.text);
        }
      }
    async function handleSave() {
          //create put method which update the text of the todo
        const res= await fetch(`/api/todo`,{
            method : "PUT",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({id: editText?.id, text:input})
        })
        fetchData()
    }
    return(
        <div className=" w-screen h-screen bg-gray-300 p-8">
            <div className="w-1/2  mx-auto bg-white rounded-lg shadow-2xl mt-5 h-96 pt-3">
            <h1 className=" text-2xl font-extrabold text-black text-center">TODO APPLICATION</h1>
            <div className="flex justify-around items-center p-8">
                <input className=" border border-gray-300 rounded-md px-2 py-1 text-black "
                type="text"
                placeholder="Enter todo" //  value={input}: Binds the input field's value to the input state variable. onChange={(e) => setInput(e.target.value)}: Updates the input state with the current value of the input field whenever it changes.
                value = {input}
                onChange={(e) => setInput(e.target.value)}
                />
                <AiFillSave
                onClick={handleSave}
                className=" text-red-500 text-3xl"/>

                <button>
                <AiFillPlusCircle 
                onClick={handleAdd}
                className=" text-green-500 text-3xl"/>
                </button>
               
            </div>
            {/* list of todos */}
            <ul className=" max-w-[300px] mx-auto p-5">
                {todos.map((todo)=>(
                    <li key={todo.id} className=" flex justify-between items-center my-2 flex-grow  text-black " >
                        <span className=" flex-grow "
                        onClick={()=> handleText(todo.id)}>
                        {todo.text}</span>
                        <span>{todo.completed ? "Done": "Not Done"}</span>
                        <input type="checkbox" className=" size-5" checked= {todo.completed}
                        onClick={()=> handleCompleted(todo.id, todo.completed)}
                        />
                        <span>  
                            <AiFillDelete // {()=> handleDelete(todo.id)} we applied here callback function bec we passed paramters above
                            onClick={()=> handleDelete(todo.id)}
                             className=" text-red-600"/>
                        </span>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Page