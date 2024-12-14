import "./CardAjout.scss";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import ModaleAjout from "../ModaleAjout/ModaleAjout";

function CardAjout () {

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
        <div className="cardAjout"> 
            <button className="cardAjout__open" onClick={openModal}> <p> + </p>
            <h3 className="cardAjout__title"> Ajouter un projet </h3> 
            </button>
            
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modale d'ajout" className="cardAjout__modale">
                <button className="cardAjout__close" onClick={closeModal}> X </button>
                <ModaleAjout />
            </Modal>
            </div>
    )
}

export default CardAjout