import { createContext } from "react";

//1. Crear el contexto (Permitira a los consumidores acceder al Provider)
const PlayersContext = createContext();

//2. Crear el provider para acceder al estado
const PlayersProvider = ({ children }) =>{
    return(
        <PlayersContext.Provider value={""}>
            {children}
        </PlayersContext.Provider>
    );
};

export { PlayersProvider };
export default PlayersContext;

