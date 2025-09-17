import { Outlet, Link } from "@tanstack/react-router";

// export const Route = () => {
//   return (
//     <div>
//       <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
//         <Link to="/index.tsx">Home</Link>
//         <Link to="/favoritos">Favoritos</Link>
//       </nav>
//       <Outlet /> {
//         <h1>funcionalidad de las rutas</h1>
//       }
//     </div>
//   );
// };

import { createRootRoute } from "@tanstack/react-router";


const RootRouteComponent = () => {
    return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>
      <Outlet /> {
        <h1>funcionalidad de las rutas</h1>
      }
    </div>
  )
};
export const Route = createRootRoute({
          component: RootRouteComponent,
        });