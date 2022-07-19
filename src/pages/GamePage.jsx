import {  Route, Routes, Link, Outlet, useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar";
const GamePage = () => {
    const navigate = useNavigate();

    const handleHome = () =>{
      navigate("/", {replace: true});
    }

  return (
    <>
      <NavBar/>
        <div className="mt-20 xs:mt-0 pt-1 xs:pt-32 bg-slate-800 container">
          <div className="flex flex-col xs:flex-row overflow-y-auto justify-around py-5 text-white">
            <div className="container">
              <h2>Jugador 1: </h2>
              <hr></hr>
                <div className="py-2">
                  <h3>Cartas opcionadas</h3>
                  <div className="flex justify-center flex-col sm:flex-row items-center py-4">
                    <img className="carta-opcionada" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                    <img className="carta-opcionada" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                  </div>
              </div>
              <hr></hr>
              <div className="py-2 cartas-obtenidas">
                <h3>Cartas obtenidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center cartas-obtenidas">
                  <img className="carta-obtenida" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                  <img className="carta-obtenida" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                  <img className="carta-obtenida" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                  <img className="carta-obtenida" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                </div>
              </div>
            </div>
            <div className="container">
              <h2>Jugador 2: </h2>
              <hr></hr>
              <div className="py-2">
                <h3>Cartas opcionadas</h3>
                <div className="flex justify-center flex-col sm:flex-row items-center py-4">
                  <img className="carta-opcionada" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                  <img className="carta-opcionada" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                </div>
            </div>
            <hr></hr>
              <div className="py-2 ">
                <h3>Cartas obtenidas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center cartas-obtenidas">
                  <img className="carta-obtenida" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                  <img className="carta-obtenida" src="http://deckofcardsapi.com/static/img/KH.png"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default GamePage;