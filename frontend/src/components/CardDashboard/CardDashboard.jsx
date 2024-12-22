import { Link } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react"
import Modal from 'react-modal'
import "./CardDashboard.scss"
import ModaleProjet from "../ModaleProjet/ModaleProjet";


function CardDashboard ({_id, title, cover, snippet, index, onUpdate}) {

    const [isOpen, setIsOpen] = useState(false);
    
    const getCookie = (x) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + x + "=([^;]+)")
      );
      return match ? match[2] : null;
    };
    
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


    const apiUrl = import.meta.env.VITE_API_URL;

    const handleDelete = () => {
      const isConfirmed= window.confirm("Ëtes vous sur de vouloir supprimer ce projet? Cette action est définitive");
      if (isConfirmed) {
      const token = getCookie('token');
      axios.delete (`${apiUrl}/api/projets/${_id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      )
      .then ((response) => {
        console.log(response.data);
        onUpdate();
        navigate("/dashboard")
      })
      .catch((error) => {
        console.log(error)
        onUpdate();
      })
    }
  }

    return (
        <div className={`card ${index % 2 === 0 ? "even" : "odd"}`}>
            <Link to={`/fiche-projet-admin/${_id}`}>
            <img src= {cover} alt= {`Couverture du projet ${title}`} className="card__image"></img>
            
            <h3 className="card__title"> {title} </h3>
            <p className="card__snippet"> {snippet} </p>
            </Link> 
            <button className="card__open" onClick={openModal}> + </button>
            <button className="card__delete" onClick={handleDelete}> 🗑️ </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modale de modification" className= "card__modale">
                <button className="card__close" onClick={closeModal}> X </button>
                <ModaleProjet title= {title} cover= {cover} snippet= {snippet} _id={_id} onUpdate={onUpdate} />
            </Modal>
            
            </div>
    )
}

export default CardDashboard