const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <>
        <footer className=" bg-slate-600 py-10">
            <p className="text-white text-center text-2xl">Todos los Derechos reservados Deck of cards <strong> {year}</strong></p>
        </footer>
    </>
  );
};

export default Footer;