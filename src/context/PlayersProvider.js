
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";

//1. Crear el contexto (Permitira a los consumidores acceder al Provider)
const PlayersContext = createContext();

//2. Crear el provider para acceder al estado
const PlayersProvider = ({ children }) =>{

    //Estados para guardar información de los usuarios
    const [player1, setPlayer1] = useState({deck_id: "", name: "", cards:[{code: "", image: "", value: "", suit: ""}]});
    const [player2, setPlayer2] = useState({deck_id: "", name: "", cards:[{code: "", image: "",  value: "", suit: ""}]});
    const [match, setMatch] = useState({});
    
    // Método para generar una nueva carta para cada jugador
    const handleSubmitGame = async (e) =>{
        if(e && e.preventDefault){
            e.preventDefault();
            const urlApiCards = `http://deckofcardsapi.com/api/deck/${match.deck_id}/draw/?count=2`;
            const {data} = await axios(urlApiCards);
            //Crear nuevas cartas
            const newCard = {code: data.cards[0].code, image: data.cards[0].image, value: data.cards[0].value, suit: data.cards[0].suit};
            const newCard2 = {code: data.cards[1].code, image: data.cards[1].image, value: data.cards[1].value, suit: data.cards[1].suit};
            //Agregar las nuevas cartas sin afectar al estado actual
            setPlayer1({...player1, cards: [...player1.cards, newCard]});
            setPlayer2({...player2, cards: [...player2.cards, newCard2]});
        }
    }
    // Generar nueva carta para cada jugador
    useEffect(() =>{    
        handleSubmitGame();
    },[handleSubmitGame]);

   //Generar id de la partida y de cada jugador
    useEffect(() => {
        //Metodo para generar id de la api para cada jugador y para la partida
        const generateId = async(state, setState) =>{
            const urlApiId = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
            const {data} = await axios(urlApiId);
            //Asignar Id sin borrar el nombre
            setState({...state, deck_id: data.deck_id});
        }
        //generateId(player1, setPlayer1);
        //generateId(player2, setPlayer2);
        generateId(match, setMatch);
        setPlayer1({...player1, deck_id: uuidv4()})
        setPlayer2({...player2, deck_id: uuidv4()})
    },[]);

    //Generar las cartas iniciales de cada jugador
    useEffect(() => {
        const generateInitialCards = async () =>{
            const  urlApiCards = `http://deckofcardsapi.com/api/deck/${match.deck_id}/draw/?count=2`;
            await fetch(urlApiCards)
            .then(res =>  res.json())
            .then(data => {
                setPlayer1({ ...player1, cards: [data.cards[0]] });
                setPlayer2({ ...player1, cards: [data.cards[1]] });
                console.log("DATOS API: " +Object.values(data.cards[0]))
            })
        }
        generateInitialCards();
    }, [match]);

    return(
        <PlayersContext.Provider value={{ player1, setPlayer1, player2, setPlayer2, handleSubmitGame }}>
            {children}
        </PlayersContext.Provider>
    );
};

export { PlayersProvider };
export default PlayersContext;