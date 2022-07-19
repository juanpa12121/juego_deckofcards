import { Link, useLocation, useNavigate } from "react-router-dom"
const NavBar = () => {
    const location = useLocation();
    const locationURL = location.pathname;
    console.log(locationURL);
    const navigate = useNavigate();

    const handleHome = () =>{
        navigate("/", {replace: true});
    }
  return (
    <>
    <nav class="flex sm:gap-8 text-center sm:text-left items-center justify-around flex-wrap bg-slate-600 p-6 fixed w-full z-10 top-0">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        <Link to="/" class="font-semibold text-3xl tracking-tight">Deck Of Cards</Link>
      </div>
      {
        locationURL === "/" ?
        <div className="flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-2xl lg:flex-grow">
            <Link className="block sm:text-left lg:inline-block lg:mt-0 text-slate-200 hover:text-white" to="instructions">Instrucciones</Link>
            </div>
        </div>
        :
        locationURL === "/game" ?
        <div className="flex gap-1">
            <button className="btn-primary" onClick={handleHome}>Jugar</button>
            <button className="btn-secondary" onClick={handleHome}>Salir</button>
        </div>
        :
        locationURL === "/instructions" ?
        <div className="flex-grow lg:flex lg:items-center lg:w-auto">
        </div>
        :
        ""
      }
    </nav>
    </>
  )
}

export default NavBar