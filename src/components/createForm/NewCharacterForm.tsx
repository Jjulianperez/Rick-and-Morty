import { Formik, Form, Field} from "formik";
import * as Yup from "yup";

import imgIcono from '../../assets/cargando.png'
import './newCharacterFrom.scss'

// Validación con Yup
const validationSchema = Yup.object({
nombre: Yup.string().required("Requerido"),
genero: Yup.string().required("Requerido"),
estado: Yup.string().required("Requerido"),
especie: Yup.string().required("Requerido"),
tipo: Yup.string().required("Requerido"),
origen: Yup.string().required("Requerido"),
});

export const NewCharacterForm = () => {
  return (
    <div className="new-character-card">
      <div className="image-carga">
        <img src={imgIcono} alt="foto de carga"/>
      </div>
      <div className="form-section">
        <h2>Nuevo personaje</h2>
        <p>Llena los campos y crea tu propio personaje</p>

        <Formik
          initialValues={{
            nombre: "",
            genero: "",
            estado: "",
            especie: "",
            tipo: "",
            origen: "",
          }}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ isSubmitting }) => (
            <Form className="character-form">
              
              <div className="form-row">
                <Field type="text" name="nombre" placeholder="Nombre" />
                <Field as="select" name="genero">
                  <option value="">Genero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </Field>
              </div>

              
              <div className="form-row">
                <Field as="select" name="estado">
                  <option value="">Estados</option>
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
                  <option value="">Tipo</option>
                  <option value="Principal">Principal</option>
                  <option value="Secundario">Secundario</option>
                </Field>
                <Field as="select" name="origen">
                  <option value="">Origen</option>
                  <option value="Tierra">Tierra</option>
                  <option value="Otro planeta">Otro planeta</option>
                </Field>
              </div>

              <button type="submit" disabled={isSubmitting}>
                Crear
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
