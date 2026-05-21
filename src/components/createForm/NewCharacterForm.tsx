import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import * as Yup from "yup";
import imgIcono from "../../assets/cargando.png";
import "./newCharacterForm.scss";
import type { FormCharacter, NewCharacter } from "../../types/Character";
import { useCreateCharacter } from "../../hook/useCreateCharacter";
import { useToastStore } from "../../stores/toastStore";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  genero: Yup.string().required("Selecciona un género"),
  estado: Yup.string().required("Selecciona un estado"),
  especie: Yup.string().required("Selecciona una especie"),
  origen: Yup.string().required("Selecciona un origen"),
});

export const NewCharacterForm = () => {
  const [prevista, setPrevista] = useState(imgIcono);
  const mutation = useCreateCharacter();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: unknown) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("imagen", URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => setPrevista(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: FormCharacter) => {
    const newCharacter: NewCharacter = {
      name: values.nombre,
      gender: values.genero,
      status: values.estado,
      species: values.especie,
      origin: { name: values.origen },
      image: prevista !== imgIcono ? prevista : imgIcono,
      type: values.tipo,
    };

    mutation.mutate(newCharacter, {
      onSuccess: () => {
        addToast("Personaje creado exitosamente", "success");
        navigate({ to: "/" });
      },
      onError: () => {
        addToast("Error al crear el personaje", "error");
      },
    });
  };

  return (
    <section className="contenedor-form">
      <div className="new-character-card">
        <div className="image-carga">
          <img src={prevista} alt="foto de carga" />
          <label htmlFor="file" className="btn-foto">
            Agregar foto
          </label>
        </div>

        <div className="form-section">
          <h2>Nuevo personaje</h2>
          <p>Llena los campos y crea tu propio personaje</p>

          <Formik<FormCharacter>
            initialValues={{
              nombre: "",
              genero: "",
              estado: "",
              especie: "",
              tipo: "",
              origen: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, errors, touched }) => (
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
                  <div>
                    <Field type="text" name="nombre" placeholder="Nombre" />
                    {errors.nombre && touched.nombre && <small className="error">{errors.nombre}</small>}
                  </div>
                  <div>
                    <Field as="select" name="genero">
                      <option value="">Género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </Field>
                    {errors.genero && touched.genero && <small className="error">{errors.genero}</small>}
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <Field as="select" name="estado">
                      <option value="">Estado</option>
                      <option value="Vivo">Vivo</option>
                      <option value="Muerto">Muerto</option>
                      <option value="Desconocido">Desconocido</option>
                    </Field>
                    {errors.estado && touched.estado && <small className="error">{errors.estado}</small>}
                  </div>
                  <div>
                    <Field as="select" name="especie">
                      <option value="">Especie</option>
                      <option value="Humano">Humano</option>
                      <option value="Alien">Alien</option>
                      <option value="Robot">Robot</option>
                    </Field>
                    {errors.especie && touched.especie && <small className="error">{errors.especie}</small>}
                  </div>
                </div>

                <div className="form-row">
                  <Field as="select" name="tipo">
                    <option value="">Sub-Tipo</option>
                    <option value="Humano">Humano</option>
                    <option value="Alien">Alien</option>
                    <option value="Robot">Robot</option>
                  </Field>
                  <div>
                    <Field as="select" name="origen">
                      <option value="">Origen</option>
                      <option value="Tierra">Tierra</option>
                      <option value="Otro planeta">Otro planeta</option>
                    </Field>
                    {errors.origen && touched.origen && <small className="error">{errors.origen}</small>}
                  </div>
                </div>

                {mutation.isError && (
                  <p className="error">Error al crear el personaje: {mutation.error.message}</p>
                )}

                <button type="submit" disabled={isSubmitting || mutation.isPending}>
                  {mutation.isPending ? "Creando..." : "Crear"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};
