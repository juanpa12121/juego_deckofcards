import { useContext } from "react";
import PlayersContext from "../context/PlayersProvider";

//Consumidor
//Hook encargado de devolver el estado del jugador 1 y el jugador 2, que esta en PlayersProvider
const usePlayers = () => {
  return useContext(PlayersContext); //Va a devolver el contexto de PlayersContext, y eso que devuelve? El estado del jugador 1 y el jugador 2
};

export default usePlayers;