import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import ImgTitulo from "../assets/tituloRickAndMorty.png";
import ImgIcono from "../assets/Icono.png";

import "../styles/main.scss";

const RootRouteComponent = () => {
  return (
    <>
    <section className="layout">
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
      </>
  );
};

export const Route = createRootRoute({
  component: RootRouteComponent,
});
