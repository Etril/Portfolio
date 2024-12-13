import "./TitreProjet.scss"

function TitreProjet ({title, lien}) {
    
    return ( 
    <div className="blurb">
        <h2 className="blurb__title"> {title} </h2>
        <a href={lien}> <p> Lien GitHub du projet </p> </a>
        </div>
    )
}

export default TitreProjet