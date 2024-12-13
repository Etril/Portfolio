import "./Tags.scss"

function Tags ({tags}) {
    
    return ( 
    <div className="tags">
        <h3 className="tags__title"> Mots-clés:  </h3>
            {tags.map ((tag) => (
                <div className="tags__container" key={tag}> 
                <p className="tags__tag"> {tag} </p>
                </div>
            ))}
        </div>
    )
}

export default Tags