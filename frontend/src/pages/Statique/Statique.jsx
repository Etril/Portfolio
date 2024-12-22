import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CardStatique from "../../components/CardStatique/CardStatique";
import Filter from "../../components/Filter/Filter";
import CardAjoutStatique from "../../components/CardAjoutStatique/CardAjoutStatique";
import Projects from "../../components/Projects/Projects";
import Profil from "../../components/Profil/Profil";
import "./Statique.scss";

function Statique() {
  const [tag, setchosenTag] = useState(null);
  const [projets, setProjets] = useState([]);


  const handleTagClick = (tag) => {
    setchosenTag(tag);
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect (() => {axios.get(`${apiUrl}/api/projets`)
    .then((response) => {
      setProjets(response.data)
    })}, []);


  return (
    <main className="statique">
      <section className="statique__about">
      <Profil />
      </section>
      <section className="statique__projets">
      <Projects />
      <div className="statique__projets-filtre">
          <Filter onTagClick={handleTagClick} projets={projets}/>
        </div>
        <div className="statique__projets-container">
          <CardAjoutStatique />
          {tag === null
            ? projets.map(({ id, title, cover, snippet, _id}, index) => (
              <div key={id} className="statique__card-container">

              <CardStatique
                title={title}
                cover={cover}
                snippet={snippet}
                id= {id}
                _id= {_id}
                index= {index}
              />
            </div>
              ))
            : projets
                .filter((projet) => projet.tags.includes(tag))
                .map(({id, title, cover, snippet, _id}, index) => (
                  <div key={id} className="statique__card-container">
                  <CardStatique
                    title={title}
                    cover={cover}
                    snippet={snippet}
                    id={id}
                    index={index}
                    _id= {_id}
                  />
                </div>
                ))}
        </div>
      </section>
    </main>
  );
}

export default Statique;
