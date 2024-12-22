import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer () {
    return (
    <footer className="footer"> 
        <section className="footer__contact">
        <h2> Contact </h2>
        <ul className="footer__contacts"> 
        <li> Email : a.croissantguyamier@gmail.com </li>
        <li> Mobile: 07 64 70 45 42 </li>
        <li> GitHub: <a href="https://github.com/Etril" target="_blank">  https://github.com/Etril </a> </li>
        </ul>
      </section>
    </footer>
    )
}

export default Footer