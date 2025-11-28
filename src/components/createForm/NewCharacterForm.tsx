import { Formik, Form, Field } from "formik";
import { useState } from "react";
import imgIcono from "../../assets/cargando.png";
import "./newCharacterForm.scss";
import type{ FormCharacter, NewCharacter } from "../../types/Character";
import { useCreateCharacter } from "../../hook/useCreateCharacter";


export const NewCharacterForm = () => {
  const [prevista, setPrevista] = useState(imgIcono);
  const mutation = useCreateCharacter()

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("imagen", file);
      const reader = new FileReader();
      reader.onloadend = () => setPrevista(reader.result);
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
    image: imgIcono,
    type: values.tipo,
  };

  mutation.mutate(newCharacter);
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
              image: imgIcono,
            }}
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

                <button disabled={isSubmitting}>
                  Crear
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};
