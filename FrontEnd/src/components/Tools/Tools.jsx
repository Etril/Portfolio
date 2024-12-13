import "./Tools.scss"

function Tools ({tools}) {
    
    return ( 
    <div className="tools">
            <h3 className="tools__title"> Technologies: </h3>
            {tools.map ((tool) => (
                <div className="tools__container">
                    <p className="tools__tool"> {tool} </p>
                    </div>
            ))}
        </div>
    )
}

export default Tools