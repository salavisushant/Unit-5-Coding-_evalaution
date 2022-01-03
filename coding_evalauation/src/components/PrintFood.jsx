import {useState,useEffect} from "react";
import {Food} from "./Food.jsx";
import {ShowFood} from "./ShowFood.jsx"
import {nanoid} from "nanoid";
import "../styles/print.css"


export const PrintFood = (food) => {
    let [list,setList] = useState([]);

    let [page,setPage] = useState(1)

    useEffect(()=>{
        getTodo(page)
    },[page])

    const getTodo = (page) => {
        fetch(`http://localhost:3001/api/receipee?_page=${page}&_limit=3`)
        .then((d)=> d.json())

        .then((res)=>{
            setList(res)
        })
    }



    const handleData = async (receipee)=>{
        const payload = {
            id:nanoid(4),
            title:receipee.title,
            ingredients:receipee.ingredients,
            time:Number(receipee.time),
            instructions:receipee.instructions,
            image:receipee.image,
        };

        setList([...list,payload]);

        try{
            let resp = await fetch("http://localhost:3001/api/receipee",{
                method: "POST",
                body: JSON.stringify(payload),
                headers: {'Content-Type': 'application/json'}
            });
            let data = await resp.json();
            console.log(data);

        } catch(err){
            console.log(err);
        }
        getTodo();
    };

    const handleDelete = async(id) => {
        setList(list.filter(list => list.id !== id));

        let resp = await fetch(`http://localhost:3001/api/receipee/${id}`,{
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        });
        let data = await resp.json();
        console.log(data);
    }

    return (
        <>
    <div>
        <div className="input">
            <Food getData = {handleData}/>
            <button  disabled={page === 1} onClick={()=>setPage(page-1)}>Prev</button>
            <button style={{margin:"1% 0% 2% 2%"}} onClick={()=>setPage(page+1)}>Next</button>
        </div>
        <div>
                
            {list.map((e)=>(
                <ShowFood key={e.id} {...e} handleDelete={handleDelete}/>
            ))}
        </div>
    </div>
        
        </>
    )
}