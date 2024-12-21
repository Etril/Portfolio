import "./Loader.scss";
import { ClipLoader } from "react-spinners";


function Loader() {
    return (
      <div className="loader">
        <ClipLoader color="#3498db" size={100} />
        <p className="loader__message"> Chargement </p>
      </div>
    );
  };

  export default Loader;