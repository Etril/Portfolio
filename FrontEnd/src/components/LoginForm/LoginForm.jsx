import "./LoginForm.scss";
import { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user === "admin" && password === "password") {
      navigate("/dashboard");
    }
    else {
        setError("Informations incorrectes")
    }
  };

  return (
    <div> 
        <p className="error"> {error} </p>
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="form__field">
          <label for="user"> Nom d'utilisateur </label>
          <input
            type="text"
            value={user}
            id="user"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form__field">
          <label for="password"> Mot de passe </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="field__submit">
          Se connecter
        </button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
