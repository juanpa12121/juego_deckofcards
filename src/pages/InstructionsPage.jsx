import { Link, Outlet } from 'react-router-dom'
const InstructionsPage = () => {
  return (
    <>
    <div className="container">
      <div className="mb-16 mt-36">
        <Link to="/" className="btn-secondary">Regresar</Link>
        <h1 className="text-white text-center mt-5 md:mt-0">Instrucciones de Juego</h1>
      </div>
        <img loading="lazy" alt='img-instructions' src="/deckofcards.webp" className="w-3/5 sm:w-2/5 mx-auto"></img>
        <div className="sm:flex gap-10 text-justify">
          <div className="my-12">
            <p className="text-white text-3xl ">1. Ingresar nombres de ambos jugadores.</p>
            <p className="text-white text-3xl ">2. Dar Click en Ingresar.</p>
            <p className="text-white text-3xl ">3. Dar Click en Jugar para generar una carta para cada jugador.</p>
            <p className="text-white text-3xl ">Si desea terminar el Juego, dar Click en Salir. Se reiniciarán los datos nuevamente.</p>
            <p className="text-white text-3xl mb-8"></p>
            <Link to="card-values" className='!mb-5 text-green-400 text-3xl hover:underline hover:text-orange-400'>Ver valores de los simbolos</Link>
            <Outlet />
           
          </div>
          <div className="my-12">
            <p className="text-white text-3xl ">Gana el jugador que saque dos cartas con números iguales o letras iguales. Ejemplo:</p>
            <div className="flex justify-center gap-1 mt-4">
              <img loading="lazy"  alt={"card-example"} className="carta-opcionada" src="https://deckofcardsapi.com/static/img/2S.png"></img>
              <img loading="lazy"  alt={"card-example"} className="carta-opcionada" src="https://deckofcardsapi.com/static/img/2D.png"></img>
            </div>
          </div>
        </div>
    </div>
   
    </>
  );
};
export default InstructionsPage;