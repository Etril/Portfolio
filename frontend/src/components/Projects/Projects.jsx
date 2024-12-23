import { Link } from "react-router-dom";
import "./Projects.scss";


function Projects () {
    return (
        
        <div className="projets"> 
        <h2 className="projets__title"> Mes projets </h2>
        <p>
          Dans le cadre de ma formation, j'ai réalisé de multiples projets afin de développer des compétences transverses.
          Ces projets, comme la réalisation ou l'optimisation de sites portfolios, ou encore le développement du back-end d'un site de notation de livres, m'ont permis de découvrir
          des technologies comme <strong> React, NodeJS/Express </strong>, et l'importance de thèmes comme <strong> l'accessibilité, la sécurité ou le référencement </strong>. 
        </p>
        <p> Je travaille aussi en parallèle sur des projets personnels, avec pour objectif l'acquisition de technologies supplémentaires
          comme les framework <strong> Angular et Vue. </strong> De plus, je souhaite sur le plus long terme acquérir des connaissances
          dans de nouveaux langages, comme le <strong> PhP </strong> ou encore <strong> Python </strong>, ainsi que perfectionner mes
          compétences dans le domaine du Back-End et de la sécurité. 
        </p>
        <p>
          La galerie ci-dessous, générée dynamiquement à partir de la base de donnée contenant l'ensemble de mes projets, permet aussi de filtrer ceux-ci par des mots clés.
          Une fiche s'ouvre au clic, elle aussi générée dynamiquement, et permet d'obtenir plus d'informations sur chaque projet, les outils utilisés, les difficultés rencontrées et les enseignements que j'en retire. 
    
        </p>
        </div>
    )
}

export default Projects 