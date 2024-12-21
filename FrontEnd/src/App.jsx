import React from 'react';
import { Helmet } from 'react-helmet';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Parcours from './pages/Parcours/Parcours.jsx';
import FicheProjet from './pages/Fiche-Projet/FicheProjet.jsx';
import Erreur from './pages/Erreur/Erreur.jsx';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import FicheProjetAdmin from './pages/Fiche-Projet-Admin/FicheProjetAdmin.jsx';
import Statique from './pages/Statique/Statique.jsx';
import FicheProjetStatique from './pages/Fiche-Projet-Statique/FicheProjetStatique.jsx';



function App() {

  return (
     <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<><Helmet> 
          <title> AG Developpeur Fullstack </title>
          <meta name="description" content="Page d'accueil de mon portfolio de développeur fullstack, React, NodeJS, Express, en recherche d'une alternance"/>
          </Helmet><Home /> </>} />
        <Route path="/fiche-projet/:choice" element={<><Helmet>
          <title> AG Developpeur Fullstack - Projet </title>
          <meta name="description" content="Page détaillant un projet de mon portfolio, avec des détails sur les technologies utilisées comme React, Express, Mongo DB, et sur les compétences acquises, comme le développement Front et BackEnd."/> 
          </Helmet><FicheProjet /></>} />
        <Route path="/fiche-projet-admin/:choice" element ={ <><Helmet>
          <title> AG Developpeur Fullstack - Projet Admin </title>
          <meta name="description" content="Page d'admin permettant de modifier ou supprimer un projet donné via des modales dédiées"/>
          </Helmet><FicheProjetAdmin/></> } />
        <Route path= "/fiche-projet-statique/:choice" element ={<><Helmet>
          <title> AG Developpeur Fullstack - Projet Statique </title>
          <meta name="description" content="Page statique simulant le comportement d'une page d'admin pour des utilisateurs intéressés"/>
          </Helmet><FicheProjetStatique /></>} />
        <Route path="/login" element= {<><Helmet> 
          <title> AG Developpeur Fullstack - Login </title> 
          <meta name="description" content="Page Login de mon portfolio de développeur fullstack, permettant d'accéder à la partie admin du site, et de mettre à jour les projets dynamiquement"/>
          
          </Helmet><Login /></>} />
        <Route path="/dashboard" element= {<><Helmet> 
          <title> AG Developpeur Fullstack - Dashboard </title>
          <meta name="description" content="Page Dashboard de mon portfolio de développeur fullstack, permettant de consulter l'intégralité des projets et les supprimer ou en modifier l'en-tête via des modales dédiées"/> 
          </Helmet><Dashboard/></> } />
        <Route path="/statique" element={<><Helmet>
          <title> AG Developpeur Fullstack - Statique </title>
          <meta name="description" content="Page Statique de mon portfolio de développeur fullstack, permettant de consulter l'intégralité des projets en simulant le comportement de la page admin"/>
          </Helmet><Statique/></>} />
        <Route path="*" element={<Erreur />} />
        <Route path="/parcours" element={<><Helmet>
          <title> AG Developpeur Fullstack - Parcours </title>
          <meta name="description" content="Page Parcours de mon portfolio de développeur fullstack, contenant mes études, mes experiences professionnelles, mes compétences et mon CV"/>
          
           </Helmet><Parcours /></>} />
      </Routes>
      <Footer />
 
    </Router>
  )
}

export default App
