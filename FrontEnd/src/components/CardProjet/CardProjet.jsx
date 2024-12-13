import "./CardProjet.scss"
import { Link } from "react-router-dom"

function CardProjet ({id, title, cover, snippet}) {
    return (
        <div className="card">
            <Link to={`/fiche-projet/${id}`}>
            <img src= {cover} alt= {`Couverture du projet ${title}`} className="card__image"></img>
            </Link> 
            <h3 className="card__title"> {title} </h3>
            <p className="card__snippet"> {snippet} </p>
            </div>
    )
}

export default CardProjet