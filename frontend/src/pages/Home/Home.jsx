import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardProjet from "../../components/CardProjet/CardProjet";
import Filter from "../../components/Filter/Filter";
import Profil from "../../components/Profil/Profil";
import Projects from "../../components/Projects/Projects";
import "./Home.scss";

function Home() {
  const [tag, setchosenTag] = useState(null);
  const [projets, setProjets] = useState([]);

 const apiUrl = import.meta.env.VITE_API_URL;

useEffect (() => {axios.get(`${apiUrl}/api/projets/`)
  .then((response) => {
    setProjets(response.data)
  })}, []);

  const handleTagClick = (tag) => {
    setchosenTag(tag);
  };
  

  return (
    <main className="home">
      <section className="home__about">
        <Profil />
      </section>
      <section className="home__projets">
        <Projects />
        <div className="home__projets-filtre">
          <Filter onTagClick={handleTagClick} projets={projets} />
        </div>
        <div className="home__projets-container">
          {tag === null
            ? projets.map(({_id, title, cover, snippet}, index) => (
                <div key={index} className="home__card-container">
                    <CardProjet  title={title} cover={cover} snippet={snippet} index= {index} _id={_id} />
                </div>
              ))
            : projets
                .filter((projet) => projet.tags.includes(tag))
                .map(({_id, title, cover, snippet }, index) => (
                  <div key={index} className="home__card-container">
                      <CardProjet
                        title={title}
                        cover={cover}
                        snippet={snippet}
                        index= {index}
                        _id={_id}
                      />
                  </div>
                ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
