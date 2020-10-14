import React, { useState, useEffect }from 'react';
import axios from 'axios';
import './App.css';
import Form from './Form';
import * as yup from 'yup'
import schema from './schema'

const initialFormState = {
  name: '',
  email: '',
  password: '',
  terms: false
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}
const initialUserArr = []

function App() {
  const [users, setUsers] = useState(initialUserArr);
  const [form, setForm] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(true)

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        console.log(res)
        setUsers([...users, res.data]);
        setForm(initialFormState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const change = (name, value) => {
     yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors,
        });
      });

    setForm({
      ...form,
      [name]: value, 
    });
  };

  const submit = evt => {
    const newUser = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      terms: form.terms
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    schema.isValid(form).then((valid) => {
      setDisabled(!valid);
    });
  }, [form]);

  return (
    <div className="App">
      HELLO BITCHES
      <Form change={change} form={form} submit={submit} disabled={disabled} errors={formErrors}></Form>
    </div>
  );
}

export default App;
