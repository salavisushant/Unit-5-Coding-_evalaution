import "../styles/foodlist.css"

export const ShowFood = ({
    id,
    title,
    ingredients,
    time,
    instructions,
    image,
    handleDelete

})=>{
    return (
        <>
    <div className="foodList">
        <h3>Name Of the Receipee</h3>
        <p>{title}</p>
        <h3>Ingredient of the Receipee</h3>
        <p>{ingredients}</p>
        <h3>Time to Cook</h3>
        <p>{time+"Min"}</p>
        <h3>Follow the instructions</h3>
        <p>{instructions}</p>
        <img style={{width:"30%", height:"100"}} src={image} alt="pic"/>
        <br />
        <button onClick={()=> handleDelete(id)}>Delete</button>
    </div>
        </>
    )
}