
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
//1. Crear el contexto (Permitira a los consumidores acceder al Provider)
const PlayersContext = createContext();

//2. Crear el provider para acceder al estado
const PlayersProvider = ({ children }) =>{

    //Estados para guardar información de los jugadores
    const [player1, setPlayer1] = useState({ name: "", cards:[] });
    const [player2, setPlayer2] = useState({ name: "", cards:[] });

    //Estados para guardar las cartas duplicadas de cada jugador
    const [dupCardsPlayer1, setDupCardsPlayer1] = useState([]);
    const [dupCardsPlayer2, setDupCardsPlayer2] = useState([]);

    //Estado para guardar id de la partida
    const [match, setMatch] = useState({});

    //Estado para saber si ya hay un ganador y quien es
    const [winner, setWinner] = useState({status: false, player: ""});

    //Funcion para alertas
    function sweetAlert(icon, title, text, showConfirmButton, timer){
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: showConfirmButton,
            timer: timer
        });
    }

    //Generar id de la partida
    const generateId = async() =>{
        const urlApiId = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        const {data} = await axios(urlApiId);
        setMatch({deck_id: data.deck_id});
    }

    useEffect(() => {
        generateId();
    },[]);

    //Generar las cartas iniciales de cada jugador
    useEffect(() => {
        const generateInitialCards = async () =>{
            const  urlApiCards = `http://deckofcardsapi.com/api/deck/${match.deck_id}/draw/?count=2`;
            const {data} = await axios(urlApiCards);
            setPlayer1({ ...player1, cards: [data.cards[0]] });
            setPlayer2({ ...player1, cards: [data.cards[1]] });
        }
        generateInitialCards();
    }, [match]);

    // Método para generar una nueva carta para cada jugador
    const handleSubmitGame = async (e) =>{
        if(e && e.preventDefault){  
            e.preventDefault();
            const urlApiCards = `http://deckofcardsapi.com/api/deck/${match.deck_id}/draw/?count=2`;
            const {data} = await axios(urlApiCards);
            //Crear nuevas cartas
            const newCards = [
                {code: data.cards[0].code, image: data.cards[0].image, value : data.cards[0].value, suit: data.cards[0].suit},
                {code: data.cards[1].code, image: data.cards[1].image, value : data.cards[1].value, suit: data.cards[1].suit}
            ]
            //Agregar las nuevas cartas sin afectar al estado actual
            setPlayer1({...player1, cards: [...player1.cards, newCards[0]]});
            setPlayer2({...player2, cards: [...player2.cards, newCards[1]]});

            //Variables que guardan la primera coincidencia de carta duplciada
            const duplicateP1 = player1.cards.find((card) => card.code.charAt(0) === newCards[0].code.charAt(0));
            const duplicateP2 = player2.cards.find((card) => card.code.charAt(0) === newCards[1].code.charAt(0));

            if((duplicateP1 !== undefined) && (duplicateP1 && duplicateP2) === undefined){
                setWinner({status: true, player: "player1"});
                sweetAlert("success", "Ganador", "Ganó el Jugador 1", true);
                setDupCardsPlayer1([...dupCardsPlayer1, duplicateP1, newCards[0]]);
            }else if((duplicateP2 !== undefined) && (duplicateP1 && duplicateP2) === undefined){
                setWinner({status: true, player: "player2"});
                sweetAlert("success", "Ganador", "Ganó el Jugador 2", true);
                setDupCardsPlayer2([...dupCardsPlayer2, duplicateP2, newCards[1]]);
            }else if(duplicateP1 !== undefined && duplicateP2 !== undefined){
                setWinner({status: true, player: "draw"});
                setDupCardsPlayer1([...dupCardsPlayer1, duplicateP1, newCards[0]]);
                setDupCardsPlayer2([...dupCardsPlayer2, duplicateP2, newCards[1]]);
            }
        }
    }

    useEffect(() =>{    
        handleSubmitGame();
    },[handleSubmitGame]);

    
    useEffect(() => {
        //Metodo para desempatar partida
        const tieBreaker = () =>{
            //Asignar puntajes a las suit de cada carta
            //Entre mayor valor, mayor puntaje
            const cardsValues = {'CLUBS': 100, 'DIAMONDS': 200, 'SPADES': 300, 'HEARTS': 400}
    
            //Variables para guardar los puntajes de cada jugador
            let player1Score = 0;
            let player2Score = 0;
            
            //Recorrer las cartas duplicadas de cada jugador
            //Sumar los puntajes de cada suit de cada carta duplicada
            dupCardsPlayer1.forEach((card) => {
                player1Score += cardsValues[card.suit];
            })
            dupCardsPlayer2.forEach((card) => {
                player2Score += cardsValues[card.suit];
            })
    
            //Definir ganadores
            if(player1Score > player2Score){
                setWinner({...winner, player: "player1"});
                sweetAlert("success", "Ganador por Desempate Jugador 1", `Con ${player1Score} puntos frente a  ${player2Score}`, true);
            }else if(player1Score < player2Score){
                setWinner({...winner, player: "player2"});
                sweetAlert("success", "Ganador por Desempate Jugador 2", `Con ${player2Score} puntos frente a ${player1Score}`, true);
            }else if(player1Score === player2Score && player1Score !== 0 && player2Score !== 0){
                //setWinner({status: true, player: "tie"});
                sweetAlert("success", "Empate Total", `Jugador1: ${player1Score} puntos. Jugador 2: ${player2Score} puntos`, true);
            }
        }
      tieBreaker();
    }, [winner.player === "draw"]);

    // Funcion para salirse, reiniciar datos y el juego
    const handleExitGame = () =>{
        setMatch({deck_id: ""});
        setWinner({status: false, player: ""});
        setPlayer1({deck_id: "", name: "", cards: []});
        setPlayer2({deck_id: "", name: "", cards: []});
        setDupCardsPlayer1([]);
        setDupCardsPlayer2([]);
        generateId(match, setMatch);
    }

    return(
        <PlayersContext.Provider value={{ generateId, player1, setPlayer1, player2, setPlayer2, dupCardsPlayer1, dupCardsPlayer2, winner, handleSubmitGame, handleExitGame }}>
            {children}
        </PlayersContext.Provider>
    );
};

export { PlayersProvider };
export default PlayersContext;