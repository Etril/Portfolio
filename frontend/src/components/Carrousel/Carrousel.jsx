import { useState } from "react";
import "./Carrousel.scss";

function Carrousel ({images}) {
    const [index, setIndex]=useState(0);

    function nextSlide() {
        setIndex((index) => (index === images.length-1 ? 0 : index+1))
    }

    function prevSlide () {
        setIndex((index) => (index === 0 ? images.length-1: index-1))
    }

    return ( 
    <div>
    <div className="carrousel">
        <img src={images[index]} alt={`numéro ${index}`} className="carrousel__image"></img>
        {images.length === 1 ? null : <button onClick={nextSlide} className="carrousel__btn carrousel__btn--suivant"> {">"} </button>}
        {images.length === 1 ? null : <button onClick={prevSlide} className="carrousel__btn carrousel__btn--precedent"> {"<"} </button>}
        {images.length ===1 ? null : <p className="carrousel__counter"> {index+1}/{images.length} </p>}
        </div>
        </div>
    )
}

export default Carrousel