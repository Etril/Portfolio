import "./ModaleProjet.scss";
import axios from "axios";
import { useState } from "react";

function ModaleProjet({ title, snippet, _id, onUpdate }) {
  const [formTitle, setformTitle] = useState(title);
  const [formSnippet, setformSnippet] = useState(snippet);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const getCookie = (x) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + x + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = getCookie('token');

    const fd = new FormData();
    fd.append("Projet", JSON.stringify({
        title: formTitle,
        snippet: formSnippet
    }));

    axios.put(`${apiUrl}/api/projets/${_id}`, fd, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(() => {
        setMessage("Projet modifié");
        onUpdate();
    })
    .catch((error) => {
        console.log(error);
    });
};

  return (
    <div className="modaleProjet">
      <h2 className="modaleProjet__titre"> Modifier l'en-tête du projet </h2>
      <p className="error"> {error} </p>
      <p className="modaleProjet__message"> {message} </p>
      <form onSubmit={handleSubmit}>
        <div className="modaleProjet__form">
          <div className="modaleProjet__field">
            <label htmlFor="title"> Titre </label>
            <input
              type="text"
              value={formTitle}
              id="title"
              onChange={(e) => setformTitle(e.target.value)}
            />
          </div>
          <div className="modaleProjet__field">
            <label htmlFor="snippet"> Description courte </label>
            <input
              type="text"
              id="snippet"
              value={formSnippet}
              onChange={(e) => setformSnippet(e.target.value)}
            />
          </div>

          <div className="modaleProjet__line"> </div>

          <button type="submit" className="modaleProjet__submit">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModaleProjet;
