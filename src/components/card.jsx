import { BsCart2 } from "react-icons/bs";
function Card(props){
    return(
        <div className="Container">
        <img src={props.image}></img>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <h4>{props.price}</h4>
        <button ><BsCart2/>Add to cart</button>
        </div>

        
    );

}
export default Card;