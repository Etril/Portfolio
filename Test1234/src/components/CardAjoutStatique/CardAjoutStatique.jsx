import "./CardAjoutStatique.scss";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import ModaleAjoutStatique from "../ModaleAjoutStatique/ModaleAjoutStatique";

function CardAjoutStatique () {

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
    
        const closeModal= () => {
            setIsOpen(false);
        };

    return (
        <div className="CardAjoutStatique"> 
            <button className="CardAjoutStatique__open" onClick={openModal}> <p> + </p>
            <h3 className="CardAjoutStatique__title"> Ajouter un projet </h3> 
            </button>
            
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modale d'ajout" className="CardAjoutStatique__modale">
                <button className="CardAjoutStatique__close" onClick={closeModal}> X </button>
                <ModaleAjoutStatique />
            </Modal>
            </div>
    )
}

export default CardAjoutStatique