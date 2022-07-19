
import { createContext, useState } from "react";

//1. Crear el contexto (Permitira a los consumidores acceder al Provider)
const PlayersContext = createContext();

//2. Crear el provider para acceder al estado
const PlayersProvider = ({ children }) =>{

    //Estados para guardar información de los usuarios
    const [player1, setPlayer1] = useState({deck_id: "", name: "", cards:[{code: "", image: "", value: "", suit: ""}]});
    const [player2, setPlayer2] = useState({deck_id: "", name: "", cards:[{code: "", image: "", value: "", suit: ""}]});
    return(
        <PlayersContext.Provider value={{ player1, setPlayer1, player2, setPlayer2 }}>
            {children}
        </PlayersContext.Provider>
    );
};


export { PlayersProvider };
export default PlayersContext;

