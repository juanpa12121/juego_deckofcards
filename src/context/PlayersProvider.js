
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
//1. Crear el contexto (Permitira a los consumidores acceder al Provider)
const PlayersContext = createContext();

//2. Crear el provider para acceder al estado
const PlayersProvider = ({ children }) =>{

    //Estados para guardar información de los jugadores
    const [player1, setPlayer1] = useState({deck_id: "", name: "", cards:[] });
    const [player2, setPlayer2] = useState({deck_id: "", name: "", cards:[] });

    //Estados para guardar las cartas duplicadas de cada jugador
    const [dupCardsPlayer1, setDupCardsPlayer1] = useState([])
    const [dupCardsPlayer2, setDupCardsPlayer2] = useState([])

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
        const generateId = async(state, setState) =>{
            const urlApiId = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
            const {data} = await axios(urlApiId);
            //Asignar Id sin borrar el nombre
            setState({...state, deck_id: data.deck_id});
        }

        useEffect(() => {
            generateId(match, setMatch);
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
            const duplicatesP1 = player1.cards.find((card) => card.code.charAt(0) === newCards[0].code.charAt(0));
            const duplicatesP2 = player2.cards.find((card) => card.code.charAt(0) === newCards[1].code.charAt(0));
            // console.log("Carta repetida player1: "+ repetido2)
            // console.log("Carta repetida player2: " + repetido)

            if((duplicatesP1 !== undefined) && (duplicatesP1 && duplicatesP2) === undefined){
                setWinner({status: true, player: "player1"});
                sweetAlert("success", "Ganador", "Ganó el Jugador 1", true);
                // setPlayer1({...player1, cards: [...player1.cards, newCard ], repeatedCards: [...player1.repeatedCards, repetido, newCard]});
                setDupCardsPlayer1([...dupCardsPlayer1, duplicatesP1, newCards[0]]);
            }else if((duplicatesP2 !== undefined) && (duplicatesP1 && duplicatesP2) === undefined){
                setWinner({status: true, player: "player2"});
                sweetAlert("success", "Ganador", "Ganó el Jugador 2", true);
                //setPlayer2({...player2, cards: [...player2.cards, newCard2 ], repeatedCards: [...player2.repeatedCards, repetido2, newCard2]});
                setDupCardsPlayer2([...dupCardsPlayer2, duplicatesP2, newCards[1]]);
            }else if(duplicatesP1 !== undefined && duplicatesP2 !== undefined){
                setWinner({status: true, player: "draw"});
                sweetAlert("warning", "Empate", "Empate", true);
                // setPlayer1({...player1, cards: [...player1.cards, newCard ], repeatedCards: [...player1.repeatedCards, repetido, newCard]});
                // setPlayer2({...player2, cards: [...player2.cards, newCard2 ], repeatedCards: [...player2.repeatedCards, repetido2, newCard2]});
                setDupCardsPlayer1([...dupCardsPlayer1, duplicatesP1, newCards[0]]);
                setDupCardsPlayer2([...dupCardsPlayer2, duplicatesP2, newCards[1]]); 
            }
        }
    }

    useEffect(() =>{    
        handleSubmitGame();
    },[handleSubmitGame]);

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