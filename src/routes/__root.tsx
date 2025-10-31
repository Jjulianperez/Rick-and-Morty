import { createRootRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ImgTitulo from "../assets/tituloRickAndMorty.png";
import ImgIcono from "../assets/Icono.png";
import "../scss/main.scss";

const RootRouteComponent = () => {
  const { location } = useRouterState();
  const [backgroundBody, setBackgroundBody] = useState("body-index");

useEffect(() => {

  if (location.pathname === "/") setBackgroundBody("body-index");
  else if (location.pathname === "/favoritos") setBackgroundBody("body-favoritos");
  else if (location.pathname === "/create") setBackgroundBody("body-create");
  else if (location.pathname == "/characters/1") setBackgroundBody("body-character");
  else if (location.pathname == "/edit$id") setBackgroundBody("body-edit");
  
}, [location.pathname]);

  return (
    <section id="character" className={backgroundBody}>
      <header className="header">
        <div className="portalIcono">
          <img src={ImgIcono} alt="Rick And Morty Portal" />
        </div>
        <div className="tituloPrincipal">
          <img src={ImgTitulo} alt="Rick and Morty" />
        </div>
      </header>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/create">Crear</Link>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer"> 
        <p>
          <span className="emoji">💻</span> Desarrollado por <b>JulianDev</b> |{" "} 
          <span className="emoji">🚀</span> Pasante en Bewise 
        </p> 
      </footer>
    </section>
  );
};

export const Route = createRootRoute({
  component: RootRouteComponent,
});
