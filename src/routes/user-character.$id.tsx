import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LocalStorageService } from "../services/local/LocalStorageService";
import { UserCharacterDetail } from "../components/userCharacterDetail/UserCharacterDetail";
import type { ExtendedCharacter } from "../types/Character";

export const Route = createFileRoute("/user-character/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [character, setCharacter] = useState<ExtendedCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    LocalStorageService.getCreateCharacter().then((chars) => {
      const found = chars.find((c) => String(c.id) === id) ?? null;
      setCharacter(found);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando...</p>;
  }

  if (!character) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Personaje no encontrado</p>
        <button
          onClick={() => navigate({ to: "/" })}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1.5rem",
            border: "2px solid #00b894",
            borderRadius: "8px",
            background: "transparent",
            color: "#00b894",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return <UserCharacterDetail character={character} />;
}
