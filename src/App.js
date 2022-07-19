import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import { useState } from "react";
import Swal from 'sweetalert2';
import InstructionsPage from "./pages/InstructionsPage";
import Footer from "./components/Footer";
const App = () => {

  function sweetAlert(icon, title, text, showConfirmButton, timer){
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: showConfirmButton,
        timer: timer
    });
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
     
    
  )
};

export default App;