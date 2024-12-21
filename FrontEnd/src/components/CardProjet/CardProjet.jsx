import "./CardProjet.scss"
import { Link } from "react-router-dom"

function CardProjet ({title, cover, snippet, index, _id}) {
    return (
        <div className={`card ${index % 2 === 0 ? "even" : "odd"}`}>
            <Link to={`/fiche-projet/${_id}`}>
            <img src= {cover} alt= {`Couverture du projet ${title}`} className="card__image"></img>
           
            <h3 className="card__title"> {title} </h3>
            <p className="card__snippet"> {snippet} </p>
            </Link> 
            </div>
    )
}

export default CardProjet