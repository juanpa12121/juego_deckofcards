import {  Route, Routes, Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
const HomePage = () => {
    const navigate = useNavigate();
    const handleGamePage = (e) =>{
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
              <input type="text" className="peer" placeholder=" "></input>
              <label>Jugador #1</label>
            </div>
            <h2 className="text-gray-300 mb-3">Ingrese nombre del segundo jugador</h2>
            <div className="relative z-0 mb-6 w-full group">
              <input type="text" className="peer" placeholder=" "></input>
              <label >Jugador #2</label>
            </div>
            <button onClick={handleGamePage} type="submit" className="btn-primary w-100">Ingresar</button>
          </form>
        </div>
          <div className="bg-cartas sm:block" alt="bg-cartas"></div>
      </div>
    </>
  );
};
export default HomePage;