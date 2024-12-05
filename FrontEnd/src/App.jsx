import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Parcours from './pages/Parcours/Parcours';
import FicheProjet from './pages/Fiche-Projet/FicheProjet';
import Erreur from './pages/Erreur/Erreur';

function App() {

  return (
     <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fiche-projet/:id" element={<FicheProjet />} />
        <Route path="*" element={<Erreur />} />
        <Route path="/parcours" element={<Parcours />} />
      </Routes>
 
    </Router>
  )
}

export default App
