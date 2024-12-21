import "./ModaleStatique.scss";
import { useState } from "react";

function ModaleStatique({ title, snippet }) {
  const [formTitle, setformTitle] = useState(title);
  const [formSnippet, setformSnippet] = useState(snippet);
  const [message, setMessage] = useState(null);

  const handleSubmit= (e) => {
    e.preventDefault();
    setMessage("Le projet aurait ici été modifié")

  }

  return (
    <div className="modaleStatique">
      <h2 className="modaleStatique__titre"> Modifier l'en-tête du projet </h2>
      <p className="modaleStatique__message"> {message} </p>
      <form onSubmit={handleSubmit}>
        <div className="modaleStatique__form">
          <div className="modaleStatique__field">
            <label for="title"> Titre </label>
            <input
              type="text"
              value={formTitle}
              id="title"
              onChange={(e) => setformTitle(e.target.value)}
            />
          </div>
          <div className="modaleStatique__field">
            <label for="snippet"> Description courte </label>
            <input
              type="text"
              id="snippet"
              value={formSnippet}
              onChange={(e) => setformSnippet(e.target.value)}
            />
          </div>

          <div className="modaleStatique__line"> </div>

          <button type="submit" className="modaleStatique__submit">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModaleStatique;
