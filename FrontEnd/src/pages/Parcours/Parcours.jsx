import "./Parcours.scss";
import CV from "../../assets/CV2024.pdf"

function Parcours() {
  return (
    <main className="parcours">
        <h2 className="parcours__title"> Mon Parcours</h2>

        <section className="parcours__etudes">
          <h2>Études</h2>
          <p> J'ai initialement suivi une formation juridique, en obtenant en 2016 un <strong> Master 2 en Droit privé </strong> à l'Université Jean-Moulin Lyon III. Dans le cadre d'une reconversion professionnelle, j'ai suivi en 2024 une formation de <strong> Développeur Web </strong> au sein de OpenClassroom. </p>
          <p> Ce double profil souligne une grande curiosité intellectuelle ainsi qu'une capacité d'adaptation et d'autonomie, doublées d'un sens de la rigueur aigu, qui seront des forces pour être rapidement efficace dans le cadre d'une prise d'emploi ou d'une alternance. Ce parcours éducatif atypique me permet de comprendre
            les enjeux techniques, mais aussi économiques, juridiques et operationnels d'un projet, et est enrichi d'experiences professionnelles variées.    </p>
        </section>

        <section className="parcours__experiences">
          <h2>Expériences professionnelles</h2>
          <p>
            J'ai travaillé entre 2017 et 2020 comme juriste dans différentes sociétés du domaine bancaire. 
            J'ai ensuite réorienté mon activité vers des domaines administratif et dans des fonctions support. 
          </p>
          <p> La rigueur, l'attention au détail, ainsi que le raisonnement logique et la capacité à résoudre des problèmes de manière autonome sont des nécessités du domaine juridique, et sont particulièrement
            utiles dans le domaine du développement. Ce métier exige aussi une capacité de rédaction et une aisance orale qui me permettent de communiquer clairement, que le sujet soit technique ou non, vers tout type d'interlocuteur. 
            De même, la gestion de dossiers et de processus administratifs complexes m'aide à organiser mes tâches et mon code de manière méthodique et efficace.
          </p>
          <p> Je recherche actuellement une alternance pour continuer à me former, et dans laquelle je pourrai être rapidement efficace et productif. Je reste evidemment disponible pour toute proposition qui correspondrait à mon profil.
          </p>
          <div className="cv">
          <p>Pour plus de détails, vous pouvez consulter mon <a
            href={CV}
            target="_blank"
            rel="noopener noreferrer"
          > CV actualisé. </a> </p>
          
        </div>
        </section>
        
        <div className="parcours__qualities"> 
        <section className="parcours__competences">
          <h2>Compétences</h2>
        
          <ul className="parcours__liste">
            
            <li> Intégration web - HTML / CSS </li>
            <li> Développement web en Javascript </li>
            <li> Optimisation SEO, Accessibilité et Debug </li>
            <li> Developpement en <strong>React </strong> </li> 
            <li> Développement en <strong> NodeJS/Express </strong> </li> 
            <li> Gestion de projet, veille technologique, solution technique </li> 
            <li> Langues: Anglais courant, Neerlandais </li>
            
          </ul>
          <p> <strong> Vous trouverez <a href="https://miro.com/app/board/uXjVL27Dm5s=/?share_link_id=583389503175" target ="_blank"> ici</a> une carte plus détaillée de mes compétences. </strong> </p>          
        </section>

        <section className="parcours__etre">
            <h2> Savoir-être </h2>
            <ul className="parcours__liste">
            
            
            <li> Esprit d'équipe </li>
            <li> Autonomie et proactivité </li>
            <li> Adaptabilité </li> 
            <li> Raisonnement logique et résolution de problèmes </li> 
            <li> Communication écrite et aisance orale </li> 
            
          </ul>
        </section>
        </div>
        
    </main>
  );
}

export default Parcours;
