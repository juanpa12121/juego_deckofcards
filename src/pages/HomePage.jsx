import { useNavigate } from "react-router-dom";
import usePlayers from "../hooks/usePlayers";
const HomePage = () => {

  const {handleFrmInputChangeP1, handleFrmInputChangeP2, player1, setPlayer1, player2, setPlayer2, sweetAlert } = usePlayers()



  const navigate = useNavigate();

  //Validar que se escriban los nombres de los jugadores y que no sean iguales
  const handleGamePage = (e) =>{
    if(player1.name === "" || player2.name === ""){
      e.preventDefault();
      sweetAlert("error", "Error", "Debes ingresar nombres para ambos jugadores", true);
      return;
    }else if(player1.name === player2.name){
      e.preventDefault();
      sweetAlert("error", "Error", "Los nombres no pueden ser iguales", true);
      setPlayer1({...player1, name: ""});
      setPlayer2({...player2, name: ""});
      return;
    }
    navigate("/game", {replace: true});
  }
  return (
    <>
      <div className="flex h-screen items-center gap-x-6">
        <div className="container flex flex-col h-screen justify-center items-center bg-slate-800">
          <h1 className="text-white mb-20 text-center">Deck of Cards</h1>
          <form className="container">
            <h2 className="text-gray-300 mb-3">Nombre del primer jugador</h2>
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
            <h2 className="text-gray-300 mb-3">Nombre del segundo jugador</h2>
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