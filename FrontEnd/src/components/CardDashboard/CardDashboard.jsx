import { Link } from "react-router";
import { useState } from "react"
import Modal from 'react-modal'
import "./CardDashboard.scss"
import ModaleProjet from "../ModaleProjet/ModaleProjet";


function CardDashboard ({id, title, cover, snippet}) {

    const [isOpen, setIsOpen] = useState(false);

    const openModal= () => {
        setIsOpen(true);
    };

    const closeModal= () => {
        setIsOpen(false);
    };

    return (
        <div className="card">
            <Link to={`/fiche-projet-admin/${id}`}>
            <img src= {cover} alt= {`Couverture du projet ${title}`} className="card__image"></img>
            </Link> 
            <h3 className="card__title"> {title} </h3>
            <p className="card__snippet"> {snippet} </p>
            <button className="card__open" onClick={openModal}> + </button>
            <button className="card__delete"> 🗑️ </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modale des projets" className= "card__modale">
                <button className="card__close" onClick={closeModal}> X </button>
                <ModaleProjet title= {title} cover= {cover} snippet= {snippet} />
            </Modal>
            </div>
    )
}

export default CardDashboard