import { useRef,useState } from "react";
import "../styles/food.css"

export const Food = ({getData}) => {
    const [food,setFood] = useState(null);
    const fileRef = useRef(null);

    const handleChange = (e) => {
        let {name,value,type} = e.target;
        value = type === "file" ? URL.createObjectURL(fileRef.current.files[0]):value;

        setFood({...food,[name]:value})
    };

    const submittedData = (e) => {
        e.preventDefault();
        getData(food)
    }

    return (
        <>
        <form onSubmit={submittedData}>
        <label>Name </label>
        <input
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Title"
            ></input>
        <label>Ingradients </label>
        <input
            onChange={handleChange}
            type="text"
            name="ingredients"
            placeholder="Ingradients"
            ></input>
        <label>Time To Cook </label>
        <input
            onChange={handleChange}
            type="Number"
            name="time"
            placeholder="Time To cook In min"
            ></input>
        <label>Instructions </label>
        <input
            onChange={handleChange}
            type="Text"
            name="instructions"
            placeholder="Instructions"
            ></input>
        <label>Image</label>
        <input
            onChange={handleChange}
            type="file"
            name="image"
            ref={fileRef}
            ></input>
        <input className="button" type="submit" name="Submit"/>
        
        </form>
        
        </>
    )
}