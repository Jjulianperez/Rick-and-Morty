import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import imgIcono from "../../assets/cargando.png";
import "./editForm.scss";
import type { FormCharacter, NewCharacter, ExtendedCharacter } from "../../types/Character";
import { useUpdateCharacter } from "../../hook/useCreateCharacter";
import { LocalStorageService } from "../../services/local/LocalStorageService";
import { useToastStore } from "../../stores/toastStore";

interface EditFormProps {
  id: string;
}

export const EditForm = ({ id }: EditFormProps) => {
  const [prevista, setPrevista] = useState(imgIcono);
  const [initialValues, setInitialValues] = useState<FormCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const mutation = useUpdateCharacter();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const characters = await LocalStorageService.getCreateCharacter();
        const character = (characters as ExtendedCharacter[]).find((c) => String(c.id) === id);
        if (character) {
          setInitialValues({
            nombre: character.name || "",
            genero: character.gender || "",
            estado: character.status || "",
            especie: character.species || "",
            tipo: character.type || "",
            origen: character.origin?.name || "",
            imagen: character.image || imgIcono,
          });
          if (character.image) setPrevista(character.image);
        }
      } catch (err) {
        console.error("Error al cargar personaje", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: unknown) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("imagen", file);
      const reader = new FileReader();
      reader.onloadend = () => setPrevista(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: FormCharacter) => {
    const updatedCharacter: Partial<NewCharacter> = {
      name: values.nombre,
      gender: values.genero,
      status: values.estado,
      species: values.especie,
      origin: { name: values.origen },
      type: values.tipo,
    };
    if (values.imagen && values.imagen !== imgIcono) {
      updatedCharacter.image = values.imagen;
    }

    mutation.mutate(
      { id, data: updatedCharacter },
      {
        onSuccess: () => {
          addToast("Personaje actualizado exitosamente", "success");
          navigate({ to: "/" });
        },
        onError: () => {
          addToast("Error al actualizar el personaje", "error");
        },
      }
    );
  };

  if (loading) return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando personaje...</p>;
  if (!initialValues) return <p style={{ textAlign: "center", padding: "2rem" }}>Personaje no encontrado</p>;

  return (
    <section className="contenedor-form">
      <div className="edit-character-card">
        <div className="image-carga">
          <img src={prevista} alt="foto de carga" />
          <label htmlFor="file" className="btn-foto">
            Agregar foto
          </label>
        </div>

        <div className="form-section">
          <h2>Editar Personaje</h2>
          <p>Modifica los campos y guarda los cambios</p>

          <Formik<FormCharacter>
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="character-form">
                <input
                  id="file"
                  name="imagen"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                />

                <div className="form-row">
                  <Field type="text" name="nombre" placeholder="Nombre" />
                  <Field as="select" name="genero">
                    <option value="">Género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </Field>
                </div>

                <div className="form-row">
                  <Field as="select" name="estado">
                    <option value="">Estado</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Muerto">Muerto</option>
                    <option value="Desconocido">Desconocido</option>
                  </Field>
                  <Field as="select" name="especie">
                    <option value="">Especie</option>
                    <option value="Humano">Humano</option>
                    <option value="Alien">Alien</option>
                    <option value="Robot">Robot</option>
                  </Field>
                </div>

                <div className="form-row">
                  <Field as="select" name="tipo">
                    <option value="">Sub-Tipo</option>
                    <option value="Humano">Humano</option>
                    <option value="Alien">Alien</option>
                    <option value="Robot">Robot</option>
                  </Field>
                  <Field as="select" name="origen">
                    <option value="">Origen</option>
                    <option value="Tierra">Tierra</option>
                    <option value="Otro planeta">Otro planeta</option>
                  </Field>
                </div>

                <button type="submit" disabled={isSubmitting || mutation.isPending}>
                  {mutation.isPending ? "Guardando..." : "Guardar Cambios"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};
