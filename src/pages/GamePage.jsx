import usePlayers from "../hooks/usePlayers";
import {v4 as uuidv4} from "uuid";

const GamePage = () => {

  const {player1, player2, dupCardsPlayer1, dupCardsPlayer2, winner} = usePlayers();
  return (
    <>
        <div className="mt-20 xs:mt-0 pt-1 xs:pt-32 bg-slate-800 container">
          <div className="flex flex-col my-40 xs:my-0 xs:flex-row overflow-y-auto justify-around py-5 text-white">
            <div className="container">
              <div className="flex justify-between">
                <h3>Jugador 1: <span className="text-gray-400">{player1.name}</span> </h3>
                <h3>
                  <span className={winner.player === "player1" ? "text-green-400" : winner.player === "player2" ? "text-red-400": "text-orange-400"}>
                    {
                      winner.player === "player1" ? "GANADOR" : 
                      winner.player==="player2" ? "PERDEDOR" : 
                      winner.player === "draw" ? "EMPATE TOTAL" : 
                      ""
                    }
                  </span>
                </h3>
              </div>
              <div className="border-b border-slate-400 mt-3"></div>
                <div className="py-2">
                  <h4>Cartas opcionadas</h4>
                  <div className="flex justify-center flex-col sm:flex-row items-center py-4">
                    {/* Recorrer cartas del jugador 1 */}
                    {dupCardsPlayer1.map(card =>(
                      <img key={uuidv4()} alt={"card-"+ card.suit.toLowerCase()} className="carta-opcionada" src={card.image}></img>
                    ))}
                  </div>
              </div>
              <div className="border-b border-slate-400 mt-3"></div>
              <div className="py-2 cartas-obtenidas">
                <h4>Cartas obtenidas</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center cartas-obtenidas">
                  {/* Recorrer cartas del jugador 1 */}
                  {player1.cards.map(card =>(
                    <img loading="lazy" key={uuidv4()} alt={"card-"+ card.suit.toLowerCase()} className="carta-obtenida" src={card.image}></img>
                  ))}

                </div>
              </div>
            </div>
            <div className="container">
            <div className="flex justify-between">
                <h3>Jugador 2: <span className="text-gray-400">{player2.name}</span></h3>
                <h3>
                  <span 
                    className={winner.player === "player2" ? "text-green-400" : winner.player === "player1" ? "text-red-400" : "text-orange-400"}>
                    {
                      winner.player === "player2" ? "GANADOR" : 
                      winner.player==="player1" ? "PERDEDOR" :
                      winner.player==="draw" ? "EMPATE TOTAL" : 
                      ""
                    }
                  </span>
                </h3>
              </div>
              <div className="border-b border-slate-400 mt-3"></div>
              <div className="py-2">
                <h4>Cartas opcionadas</h4>
                <div className="flex justify-center flex-col sm:flex-row items-center py-4">
                    {/* Recorrer cartas del jugador 1 */}
                    {dupCardsPlayer2.map(card =>(
                      <img key={uuidv4()} alt={"card-"+ card.suit.toLowerCase()} className="carta-opcionada" src={card.image}></img>
                    ))}
                </div>
            </div>
            <div className="border-b border-slate-400 mt-3"></div>
            <div className="py-2 ">
              <h4>Cartas obtenidas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center cartas-obtenidas">
                {player2.cards.map(card =>(
                  <img loading="lazy" key={uuidv4()} alt={"card-"+ card.suit.toLowerCase()} className="carta-obtenida" src={card.image}></img>
                ))}
                </div>
            </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default GamePage;