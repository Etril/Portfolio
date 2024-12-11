import "./CardDashboard.scss"

function CardDashboard ({title, cover, snippet}) {
    return (
        <div className="card"> 
            <img src= {cover} alt= {`Couverture du projet ${title}`} className="card__image"></img>
            <h3 className="card__title"> {title} </h3>
            <p className="card__snippet"> {snippet} </p>
            <button className="card__open"> + </button>
            </div>
    )
}

export default CardDashboard