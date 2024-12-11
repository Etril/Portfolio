import "./CardProjet.scss"

function CardProjet ({title, cover, snippet}) {
    return (
        <div className="card"> 
            <img src= {cover} alt= {`Couverture du projet ${title}`} className="card__image"></img>
            <h3 className="card__title"> {title} </h3>
            <p className="card__snippet"> {snippet} </p>
            </div>
    )
}

export default CardProjet