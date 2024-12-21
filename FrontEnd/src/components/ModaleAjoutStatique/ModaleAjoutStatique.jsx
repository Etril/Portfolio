import React, { useState } from "react";
import "./ModaleAjoutStatique.scss"

const ModaleAjoutStatique = () => {

  const [formData, setFormData] = useState({
    title: "",
    cover: "",
    lien: "",
    snippet: "",
    description: "",
    tags: [],
    tools: [],
    pictures: [],
    tagsInput: "",
    toolsInput: "",
  });

  const [message, setMessage]= useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (formData.tagsInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, formData.tagsInput],
        tagsInput: "",
      }));
    }
  };

  const handleAddTool = () => {
    if (formData.toolsInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        tools: [...prevData.tools, formData.toolsInput],
        toolsInput: "",
      }));
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      tags: newTags,
    }));
  };

  const handleRemoveTool = (index) => {
    const newTools = formData.tools.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      tools: newTools,
    }));
  };

  const handleRemoveCover = () => {
    setFormData((prevData) => ({
      ...prevData,
      cover: "",
    }));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          cover: reader.result, 
        }));
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPictures = files.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prevData) => ({
      ...prevData,
      pictures: [...prevData.pictures, ...newPictures],
    }));
  };

  const handleRemovePicture = (index) => {
    const newPictures = formData.pictures.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      pictures: newPictures,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Le projet aurait bien été ajouté");
  };

  return (
    <div className="ModaleAjoutStatique">
      <h2 className="ModaleAjoutStatique__titre"> Ajouter un projet</h2>
      <p className="ModaleAjoutStatique__message"> {message} </p>
      <form onSubmit={handleSubmit} className="ModaleAjoutStatique__form">

      <div className="ModaleAjoutStatique__field--coverfield">
          <div className="ModaleAjoutStatique__field--coverinput">
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={handleCoverChange}
            />
            
            {formData.cover && (
              <div className="ModaleAjoutStatique__field--cover">
                <img
                  src={formData.cover}
                  alt="Aperçu de la couverture"
                  className="ModaleAjoutStatique__field--coverimage"
                />
                <button type="button" onClick={handleRemoveCover} className="ModaleAjoutStatique__field--coverremove">
                  X
                </button>
              </div>
            )}
          </div>
          <label htmlFor="cover" className="ModaleAjoutStatique__field--coverlabel"> + Ajouter couverture</label>
        </div>

        <div className="ModaleAjoutStatique__field">
          <label htmlFor="title">Titre du projet</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        

        <div className="ModaleAjoutStatique__field">
          <label htmlFor="lien">Lien du projet</label>
          <input
            type="url"
            id="lien"
            name="lien"
            value={formData.lien}
            onChange={handleChange}
            required
          />
        </div>

        <div className="ModaleAjoutStatique__field">
          <label htmlFor="snippet">Snippet</label>
          <input
            type="text"
            id="snippet"
            name="snippet"
            value={formData.snippet}
            onChange={handleChange}
            required
          />
        </div>

        <div className="ModaleAjoutStatique__field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="ModaleAjoutStatique__field">
          <label htmlFor="tags">Tags</label>
          <div className="ModaleAjoutStatique__field--tagsinput">
            <input
              type="text"
              id="tags"
              name="tagsInput"
              value={formData.tagsInput || ""}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!formData.tagsInput.trim()}
            >
              + Tag
            </button>
          </div>
          <div className="ModaleAjoutStatique__field--taglist">
            {formData.tags.map((tag, index) => (
              <span key={index} className="ModaleAjoutStatique__field--tag">
                <p> {tag} </p>
                <button
                  type="button"
                  className="ModaleAjoutStatique__field--remove"
                  onClick={() => handleRemoveTag(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="ModaleAjoutStatique__field">
          <label htmlFor="tools">Outils</label>
          <div className="ModaleAjoutStatique__field--toolsinput">
            <input
              type="text"
              id="tools"
              name="toolsInput"
              value={formData.toolsInput || ""}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={handleAddTool}
              disabled={!formData.toolsInput.trim()}
            >
              +  Outil
            </button>
          </div>
          <div className="ModaleAjoutStatique__field--toolslist">
            {formData.tools.map((tool, index) => (
              <span key={index} className="ModaleAjoutStatique__field--tool">
                <p> {tool} </p>
                <button
                  type="button"
                  className="ModaleAjoutStatique__field--remove"
                  onClick={() => handleRemoveTool(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="ModaleAjoutStatique__field">
          <p className="ModaleAjoutStatique__field--pictitle"> Images du carrousel </p>
          <input
            type="file"
            id="pictures"
            name="pictures"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <div className="ModaleAjoutStatique__field--pictures">
            {formData.pictures.map((picture, index) => (
              <div key={index} className="ModaleAjoutStatique__field--picitem">
                <img src={picture.preview} alt={`preview-${index}`} className="ModaleAjoutStatique__field--picture"/>
                <button
                  type="button"
                  className="ModaleAjoutStatique__field--picremove"
                  onClick={() => handleRemovePicture(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <label htmlFor="pictures" className="ModaleAjoutStatique__field--piclabel">Ajouter des images</label>
        </div>

        <div className="ModaleAjoutStatique__line"> </div>

        <button type="submit" className="ModaleAjoutStatique__submit"> Ajouter le projet</button>
      </form>
    </div>
  );
};

export default ModaleAjoutStatique;