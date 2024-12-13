import React from 'react';
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
        <Route path="/" element={<Home />} />
        <Route path="/fiche-projet/:choice" element={<FicheProjet />} />
        <Route path="/fiche-projet-admin/:choice" element ={<FicheProjetAdmin/>} />
        <Route path="/login" element= {<Login />} />
        <Route path="/dashboard" element= {<Dashboard/>} />
        <Route path="*" element={<Erreur />} />
        <Route path="/parcours" element={<Parcours />} />
      </Routes>
      <Footer />
 
    </Router>
  )
}

export default App
