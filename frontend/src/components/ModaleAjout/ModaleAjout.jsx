import React, { useState } from "react";
import "./ModaleAjout.scss"
import axios from "axios";

const ModaleAjout = ({onUpdate}) => {

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
  });

  const [message, setMessage] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const getCookie = (x) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + x + "=([^;]+)")
    );
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
    console.log(file)
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
    const newPicturesFiles=files;
    const newPicturesPreview = files.map((file) => 
     ({preview: URL.createObjectURL(file)}
    ));
    setFormData((prevData) => ({
      ...prevData,
      picturesPreview: [...prevData.picturesPreview, ...newPicturesPreview],
      pictures: [...prevData.pictures, ...newPicturesFiles],
    }));
  };

  const handleRemovePicture = (index) => {
    setFormData((prevData) => {
      const newPictures = prevData.pictures.filter((_, i) => i !== index);
      const newPicturesPreview = prevData.picturesPreview.filter((_, i) => i !== index);
  
      return {
        ...prevData,
        pictures: newPictures,
        picturesPreview: newPicturesPreview,
      };
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const token = getCookie('token');
    const fd= new FormData ();
    const projetObject= {
      title: `${formData.title}`,
      description: `${formData.description}`,
      lien: `${formData.lien}`,
      snippet: `${formData.snippet}`,
      tags: formData.tags,
      tools: formData.tools,
    }

    fd.append ('Projet', JSON.stringify(projetObject));

    fd.append('cover', formData.cover);
    formData.pictures.forEach((file) => {
      fd.append("pictures", file);
    });
    
    axios.post(`${apiUrl}/api/projets`, fd,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    )
    .then (() => {
      setMessage("Projet ajouté");
      onUpdate();
    })
    .catch ((error) => {
      console.log(error)
    })


  };

  return (
    <div className="modaleAjout">
      <h2 className="modaleAjout__titre"> Ajouter un projet</h2>
      <p className="modaleAjout__message"> {message} </p>
      <form onSubmit={handleSubmit} className="modaleAjout__form">

      <div className="modaleAjout__field--coverfield">
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
                  src={formData.coverPreview}
                  alt="Aperçu de la couverture"
                  className="modaleAjout__field--coverimage"
                />
                <button type="button" onClick={handleRemoveCover} className="modaleAjout__field--coverremove">
                  X
                </button>
              </div>
            )}
          </div>
          <label htmlFor="cover" className="modaleAjout__field--coverlabel"> + Ajouter couverture</label>
        </div>

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
            >
              + Tag
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
            >
              +  Outil
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
          <p className="modaleAjout__field--pictitle"> Images du carrousel </p>
          <input
            type="file"
            id="pictures"
            name="pictures"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <div className="modaleAjout__field--pictures">
            {formData.picturesPreview.map((picture, index) => (
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
          <label htmlFor="pictures" className="modaleAjout__field--piclabel">Ajouter des images</label>
        </div>

        <div className="modaleAjout__line"> </div>

        <button type="submit" className="modaleAjout__submit"> Ajouter le projet</button>
      </form>
    </div>
  );
};

export default ModaleAjout;