import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModaleModification.scss";

const ModaleModification = ({ projetChoisi, onUpdate }) => {

  const [formData, setFormData] = useState({
    title: "",
    cover: "",
    coverPreview: "",
    lien: "",
    snippet: "",
    description: "",
    tags: [],
    tools: [],
    pictures: [],
    tagsInput: "",
    toolsInput: "",
    picturesPreview: [],
    existingPictures: projetChoisi? projetChoisi.pictures || [] : [],
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (projetChoisi) {
      setFormData({
        title: projetChoisi.title || "",
        cover: projetChoisi.cover || "",
        coverPreview: projetChoisi.cover || "", 
        lien: projetChoisi.lien || "",
        snippet: projetChoisi.snippet || "",
        description: projetChoisi.description || "",
        tags: projetChoisi.tags || [],
        tools: projetChoisi.tools || [],
        pictures: projetChoisi.pictures || [],
        picturesPreview: projetChoisi.pictures
          ? projetChoisi.pictures.map((picture) => ({ preview: picture }))
          : [],
        tagsInput: "",
        toolsInput: "",
        existingPictures: projetChoisi.pictures || [],
      });
    }
  }, [projetChoisi]);

  const getCookie = (x) => {
    const match = document.cookie.match(new RegExp("(^| )" + x + "=([^;]+)"));
    return match ? match[2] : null;
  };

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
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(file);
        setFormData((prevData) => ({
          ...prevData,
          coverPreview: reader.result,
          cover: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPicturesFiles = files;
    const newPicturesPreview = files.map((file) => ({
      preview: URL.createObjectURL(file),
    }));
    setFormData((prevData) => ({
      ...prevData,
      picturesPreview: [...prevData.picturesPreview, ...newPicturesPreview],
      pictures: [...prevData.pictures, ...newPicturesFiles],
    }));
  };

  const handleRemovePicture = (index, isExisting = false) => {
    if (isExisting) {
      
      setFormData((prevData) => {
        const updatedExistingPictures = prevData.existingPictures.filter((_, i) => i !== index);
        return {
          ...prevData,
          existingPictures: updatedExistingPictures,
        };
      });
    } else {
      
      setFormData((prevData) => {
        const updatedPictures = prevData.pictures.filter((_, i) => i !== index);
        const updatedPicturesPreview = prevData.picturesPreview.filter((_, i) => i !== index);
        return {
          ...prevData,
          pictures: updatedPictures,
          picturesPreview: updatedPicturesPreview,
        };
      });
    }
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = getCookie("token");
    const fd = new FormData();
  
    
    const projetObject = {
      title: formData.title,
      description: formData.description,
      lien: formData.lien,
      snippet: formData.snippet,
      tags: formData.tags,
      tools: formData.tools,
      existingPictures: formData.existingPictures, 
    };

    console.log(projetObject);
  
    
    fd.append("Projet", JSON.stringify(projetObject));
    if (formData.cover instanceof File) {
      fd.append("cover", formData.cover);
    }
  
    formData.pictures.forEach((file) => {
      fd.append("pictures", file); 
    });
  
  
    axios
      .put(`${apiUrl}/api/projets/${projetChoisi._id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    <div className="modaleModif">
      <h2 className="modaleModif__titre"> Modifier un projet</h2>
      <p className="modaleModif__message"> {message} </p>
      <form onSubmit={handleSubmit} className="modaleModif__form">
        <div className="modaleModif__field--coverfield">
          <div className="modaleModif__field--coverinput">
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={handleCoverChange}
            />

            {formData.cover && (
              <div className="modaleModif__field--cover">
                <img
                  src={formData.coverPreview}
                  alt="Aperçu de la couverture"
                  className="modaleModif__field--coverimage"
                />
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  className="modaleModif__field--coverremove"
                >
                  X
                </button>
              </div>
            )}
          </div>
          <label htmlFor="cover" className="modaleModif__field--coverlabel">
            + Modifier couverture
          </label>
        </div>

        <div className="modaleModif__field">
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

        <div className="modaleModif__field">
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

        <div className="modaleModif__field">
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

        <div className="modaleModif__field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="modaleModif__field">
          <label htmlFor="tags">Tags</label>
          <div className="modaleModif__field--tagsinput">
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
          <div className="modaleModif__field--taglist">
            {formData.tags.map((tag, index) => (
              <span key={index} className="modaleModif__field--tag">
                <p> {tag} </p>
                <button
                  type="button"
                  className="modaleModif__field--remove"
                  onClick={() => handleRemoveTag(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="modaleModif__field">
          <label htmlFor="tools">Outils</label>
          <div className="modaleModif__field--toolsinput">
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
              + Outil
            </button>
          </div>
          <div className="modaleModif__field--toolslist">
            {formData.tools.map((tool, index) => (
              <span key={index} className="modaleModif__field--tool">
                <p> {tool} </p>
                <button
                  type="button"
                  className="modaleModif__field--remove"
                  onClick={() => handleRemoveTool(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="modaleModif__field">
          <p className="modaleModif__field--pictitle"> Images du carrousel </p>
          <input
            type="file"
            id="pictures"
            name="pictures"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <div className="modaleModif__field--pictures">
            {formData.picturesPreview.map((picture, index) => (
              <div key={index} className="modaleModif__field--picitem">
                <img
                  src={picture.preview || picture}
                  alt={`preview-${index}`}
                  className="modaleModif__field--picture"
                />
                <button
                  type="button"
                  className="modaleModif__field--picremove"
                  onClick={() => handleRemovePicture(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <label htmlFor="pictures" className="modaleModif__field--piclabel">
            Ajouter des images
          </label>
        </div>

        <div className="modaleModif__line"> </div>

        <button type="submit" className="modaleModif__submit">
          {" "}
          Modifier le projet
        </button>
      </form>
    </div>
  );
};

export default ModaleModification;
