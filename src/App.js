import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import InstructionsPage from "./pages/InstructionsPage";
import Footer from "./components/Footer";
import { PlayersProvider } from "./context/PlayersProvider";
import Swal from 'sweetalert2';
import NavBar from "./components/NavBar";
import CardValuesPage from "./pages/CardValuesPage";

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
      <PlayersProvider>
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={ <HomePage sweetAlert={sweetAlert} />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/instructions/*" element={<InstructionsPage />} >
              <Route path="card-values" element={<CardValuesPage />} />
            </Route >
          </Routes>
          <Footer/>
        </BrowserRouter>
      </PlayersProvider>
  )
};

export default App;