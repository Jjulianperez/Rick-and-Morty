import { createRootRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ImgTitulo from "../assets/tituloRickAndMorty.png";
import ImgIcono from "../assets/Icono.png";
import { ToastContainer } from "../components/toast/Toast";
import { ScrollToTop } from "../components/scrollToTop/ScrollToTop";
import "../scss/main.scss";

const RootRouteComponent = () => {
  const { location } = useRouterState();
  const [backgroundBody, setBackgroundBody] = useState("body-index");

useEffect(() => {
  const path = location.pathname;

  if (path === "/") setBackgroundBody("body-index");
  else if (path === "/favoritos") setBackgroundBody("body-favoritos");
  else if (path === "/create") setBackgroundBody("body-create");
   else if (path.startsWith("/characters/")) setBackgroundBody("body-character");
   else if (path.startsWith("/user-character/")) setBackgroundBody("body-user-character");
   else if (path.startsWith("/edit/")) setBackgroundBody("body-edit");
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

      <ToastContainer />
      <ScrollToTop />
    </section>
  );
};

export const Route = createRootRoute({
  component: RootRouteComponent,
});
