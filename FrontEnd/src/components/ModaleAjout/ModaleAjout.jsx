import React, { useState } from "react";
import "./ModaleAjout.scss";

const ModaleAjout = () => {
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
    console.log(formData);
  };

  return (
    <div className="modaleAjout">
      <h2 className="modaleAjout__titre"> Ajouter un projet</h2>
      <form onSubmit={handleSubmit} className="modaleAjout__form">
        <div className="modaleAjout__field">
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

        <div className="modaleAjout__field">
          <label htmlFor="cover">Couverture (ajouter une image)</label>
          <div className="modaleAjout__field--coverinput">
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={handleCoverChange}
            />
            {formData.cover && (
              <div className="modaleAjout__field--cover">
                <img
                  src={formData.cover}
                  alt="Aperçu de la couverture"
                  className="modaleAjout__field--coverimage"
                />
                <button type="button" onClick={handleRemoveCover}>
                  Supprimer l'image
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="modaleAjout__field">
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

        <div className="modaleAjout__field">
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

        <div className="modaleAjout__field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="modaleAjout__field">
          <label htmlFor="tags">Tags</label>
          <div className="modaleAjout__field--tagsinput">
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
              Ajouter un tag
            </button>
          </div>
          <div className="modaleAjout__field--taglist">
            {formData.tags.map((tag, index) => (
              <span key={index} className="modaleAjout__field--tag">
                <p> {tag} </p>
                <button
                  type="button"
                  className="modaleAjout__field--remove"
                  onClick={() => handleRemoveTag(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="modaleAjout__field">
          <label htmlFor="tools">Outils</label>
          <div className="modaleAjout__field--toolsinput">
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
              Ajouter un outil
            </button>
          </div>
          <div className="modaleAjout__field--toolslist">
            {formData.tools.map((tool, index) => (
              <span key={index} className="modaleAjout__field--tool">
                <p> {tool} </p>
                <button
                  type="button"
                  className="modaleAjout__field--remove"
                  onClick={() => handleRemoveTool(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="modaleAjout__field">
          <label htmlFor="pictures">Ajoutez des images</label>
          <input
            type="file"
            id="pictures"
            name="pictures"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <div className="modaleAjout__field--pictures">
            {formData.pictures.map((picture, index) => (
              <div key={index} className="modaleAjout__field--picitem">
                <img src={picture.preview} alt={`preview-${index}`} className="modaleAjout__field--picture"/>
                <button
                  type="button"
                  className="modaleAjout__field--picremove"
                  onClick={() => handleRemovePicture(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">Ajouter le projet</button>
      </form>
    </div>
  );
};

export default ModaleAjout;
