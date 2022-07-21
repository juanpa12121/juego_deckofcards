import {  Route, Routes, Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import usePlayers from "../hooks/usePlayers";
const HomePage = ({sweetAlert}) => {

  const { player1, setPlayer1, player2, setPlayer2 } = usePlayers()

  //Guardar nombre del primer jugador, digitado en el estado player1
  const handleFrmInputChangeP1 = (e) => {
    setPlayer1({...player1, name: e.target.value});
  };
  //Guardar nombre del segundo jugador, digitado en el estado player2
  const handleFrmInputChangeP2 = (e) => {
    setPlayer2({...player2, name: e.target.value});
  }

  const navigate = useNavigate();

  const handleGamePage = (e) =>{
    if(player1.name === "" || player2.name === ""){
      e.preventDefault();
      sweetAlert("error", "Error", "Debes ingresar nombres para ambos jugadores", true);
      return;
    }
    navigate("/game", {replace: true});
  }
  return (
    <>
      <NavBar />
      <div className="flex h-screen items-center gap-x-6">
        <div className="container flex flex-col h-screen justify-center items-center bg-slate-800">
          <h1 className="text-white mb-10 text-center">Deck of Cards</h1>
          <form>
            <h2 className="text-gray-300 mb-3">Ingrese nombre del primer jugador</h2>
            <div className="relative z-0 mb-6 w-full group">
              <input 
                type="text" 
                className="peer" 
                placeholder=" "
                onChange={handleFrmInputChangeP1}
                value={player1.name} >
              </input>
              <label>Jugador #1</label>
            </div>
            <h2 className="text-gray-300 mb-3">Ingrese nombre del segundo jugador</h2>
            <div className="relative z-0 mb-6 w-full group">
              <input 
                type="text" 
                className="peer" 
                placeholder=" "
                onChange={handleFrmInputChangeP2} 
                value={player2.name} >
              </input>
              <label >Jugador #2</label>
            </div>
            <button onClick={handleGamePage} 
            type="submit" 
            className="btn-primary w-100">Ingresar</button>
          </form>
        </div>
          <div className="bg-cartas sm:block" alt="bg-cartas"></div>
      </div>
    </>
  );
};
export default HomePage;