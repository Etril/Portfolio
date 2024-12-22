import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import CardDashboard from "../../components/CardDashboard/CardDashboard";
import Filter from "../../components/Filter/Filter";
import CardAjout from "../../components/CardAjout/CardAjout";
import Projects from "../../components/Projects/Projects";
import Profil from "../../components/Profil/Profil";
import "./Dashboard.scss";

function Dashboard() {
  const [tag, setchosenTag] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [projets, setProjets] = useState([]);



  const getCookie = (x) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + x + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

   useEffect(() => {
      const token = getCookie('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);

  const handleTagClick = (tag) => {
    setchosenTag(tag);
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const getProjets= () => {axios.get(`${apiUrl}/api/projets/`)
    .then((response) => {
      setProjets(response.data)
    })}

    

  useEffect(() => {
     getProjets();
    }, []);

  return (
    isAuthenticated ? (
    <main className="dashboard">
      <section className="dashboard__about">
      <Profil />
      </section>
      <section className="dashboard__projets">
      <Projects />
      <div className="dashboard__projets-filtre">
          <Filter onTagClick={handleTagClick} projets= {projets} />
        </div>
        <div className="dashboard__projets-container">
          <CardAjout onUpdate= {getProjets} />
          {tag === null
            ? projets.map(({ _id, title, cover, snippet}, index, ) => (
              <div key={index} className="dashboard__card-container">

              <CardDashboard
                title={title}
                cover={cover}
                snippet={snippet}
                _id= {_id}
                index= {index}
                onUpdate={getProjets}
              />
            </div>
              ))
            : projets
                .filter((projet) => projet.tags.includes(tag))
                .map(({_id, title, cover, snippet}, index) => (
                  <div key={index} className="dashboard__card-container">
                  <CardDashboard
                    title={title}
                    cover={cover}
                    snippet={snippet}
                    _id= {_id}
                    index={index}
                    onUpdate={getProjets}
                  />
                </div>
                ))}
        </div>
      </section>
    </main> ) :
    (<Navigate to="/login" replace />)
  );
}

export default Dashboard;
