import './Login.scss'

import "./Login.scss";
import LoginForm from '../../components/LoginForm/LoginForm';

function Login() {
    return (
        <main className="login"> 
        <section className="login__section">
           <h2 className="login__title"> CONNEXION </h2>
           <LoginForm />
           </section>
        </main>
    )
}

export default Login;