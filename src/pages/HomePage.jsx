const HomePage = () => {
  return (
    <>
    <div className="flex h-screen items-center">
      <div className="container flex flex-col h-screen justify-center items-center bg-slate-800">
        <h1 className="text-white text-2xl mb-10">Deck of Cards</h1>
        <form>
          <h2 className="text-gray-300 mb-3">Ingrese nombre del primer jugador</h2>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text"  className="peer" placeholder=" " required></input>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Jugador #1</label>
          </div>
          <h2 className="text-gray-300 mb-3">Ingrese nombre del segundo jugador</h2>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" className="peer" placeholder=" " required></input>
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Jugador #2</label>
          </div>
          <button type="submit" className="btn-primary w-100">Ingresar</button>
          
        </form>
      </div>
        <div className="bg-cartas sm:block"></div>
    </div>
    </>
  )
}

export default HomePage