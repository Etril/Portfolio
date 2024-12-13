import "./ModaleProjet.scss";
import { useState } from "react";

function ModaleProjet({ title, snippet }) {
  const [formTitle, setformTitle] = useState(title);
  const [formSnippet, setformSnippet] = useState(snippet);

  return (
    <div className="modaleProjet">
      <p className="error"> "error" </p>
      <form>
        <div className="modaleProjet__form">
          <div className="modaleProjet__field">
            <label for="title"> Titre </label>
            <input
              type="text"
              value={formTitle}
              id="title"
              onChange={(e) => setformTitle(e.target.value)}
            />
          </div>
          <div className="modaleProjet__field">
            <label for="snippet"> Description courte </label>
            <input
              type="text"
              id="snippet"
              value={formSnippet}
              onChange={(e) => setformSnippet(e.target.value)}
            />
          </div>
          <button type="submit" className="modaleProjet__submit">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModaleProjet;
