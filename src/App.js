import React, { useRef } from "react";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import "./App.css";
import Input from "./components/Form/input";

const initialData = {
  email: "test@example.com",
  address: {
    city: "San Pablo",
  },
};

function App() {
  const formRef = useRef(null);

  function handleSubmit(data) {
    if (data.name === "") {
      formRef.current.setErrors({
       name: "o nome é obrigatorio",
       address: {
         city: "a cidade é obrigatorio",
       }
     })
    }
    console.log(data);
  }
  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form initialData={initialData} onSubmit={handleSubmit}>
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
