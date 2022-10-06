import React, { useEffect, useRef} from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import "./App.css";
import * as Yup from "yup";
import Input from "./components/Form/input";


function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("o nome é obrigatório"),
        email: Yup.string()
          .email("Digite um email válido")
          .required("o email é obrigatório"),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, "No minimo 3 caracteres")
            .required("a cidade é obrigatório"),
        }),
      });

      await schema.validate({
        abortEarly: false,
      });
      console.log(data);
      formRef.current.setError({});
      reset();
      
    }catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setError(errorMessages);
    }
  }

  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'luis teste',
        email: 'teste@example.com',
      })
    }, 200);
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />
        <Input type="email" name="email" />
        <Input type="password" name="password" />

        <Scope path="address">
          <Input name="city" />
          <Input name="street" />
          <Input name="state" />
          <Input name="number" />
          <Input name="neighborhood" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
