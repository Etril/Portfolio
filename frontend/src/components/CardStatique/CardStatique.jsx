import { Link } from "react-router";
import { useState, useEffect } from "react"
import Modal from 'react-modal'
import "./CardStatique.scss"
import ModaleStatique from "../ModaleStatique/ModaleStatique";


function CardStatique ({id, title, cover, snippet, index, _id}) {

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
            if (isOpen) {
              
              document.body.style.overflow = 'hidden';
            } else {
              
              document.body.style.overflow = 'auto';
            }
            
            return () => {
              
              document.body.style.overflow = 'auto';
            };
          }, [isOpen]);

    const openModal= () => {
        setIsOpen(true);
    };

    const handleDelete= () => {
      window.confirm ("Ëtes vous sur de vouloir supprimer ce projet? Cette action est définitive")
    }

    const closeModal= () => {
        setIsOpen(false);
    };

    return (
        <div className={`card ${index % 2 === 0 ? "even" : "odd"}`}>
            <Link to={`/fiche-projet-statique/${_id}`}>
            <img src= {cover} alt= {`Couverture du projet ${title}`} className="card__image"></img>
            
            <h3 className="card__title"> {title} </h3>
            <p className="card__snippet"> {snippet} </p>
            </Link> 
            <button className="card__open" onClick={openModal}> + </button>
            <button className="card__delete" onClick={handleDelete}> 🗑️ </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modale de modification" className= "card__modale">
                <button className="card__close" onClick={closeModal}> X </button>
                <ModaleStatique title= {title} cover= {cover} snippet= {snippet} />
            </Modal>
            
            </div>
    )
}

export default CardStatique