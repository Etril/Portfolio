import "./LoginForm.scss";
import axios from "axios";
import { useState } from "react";
import { replace, useNavigate } from "react-router";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}/api/auth/login`, {name, password})
    .then ((response) => {
      document.cookie= `token=${response.data.token}; path=/;`
      navigate('/dashboard');
      window.location.reload();
    })
    .catch ((erreur => {
      setError("Identifiants incorrects")
    }
  ))
  };

  return (
    <div> 
        <p className="error"> {error} </p>
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="form__field">
          <label htmlFor="name"> Nom d'utilisateur </label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form__field">
          <label htmlFor="password"> Mot de passe </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="form__submit">
          Se connecter
        </button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
