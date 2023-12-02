import { useEffect, useState } from 'react';
import React from 'react';
import styles from './ProjetoForm.module.css';
import Input from '../../../form/Input/Input';
import Select from '../../../form/Select/Select';
import ButtonSubmit from '../../../form/ButtonSubmit/ButtonSubmit';

export default function ProjectForm({ handleSubmit, btntext, ProjetoData }) {
  const [projeto, setProjeto] = useState(ProjetoData || {});
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/categorias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategorias(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(projeto);
  };

  function Change(e) {
    setProjeto({ ...projeto, [e.target.name]: e.target.value });
    console.log(projeto);
  }

  function Category(e) {
    const newProjeto = {
      ...projeto,
      categoria: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    };

    console.log(newProjeto);

    setProjeto(newProjeto);
  }

  return (
  <form onSubmit={submit} className={styles.form}>
  <Input
    type="text" 
    text="Nome do projeto"
    name="name"
    placeholder="Insira o nome do projeto"
    handleOnChange={Change} //vai mandar o metodo para ver executado
    value={projeto.name}
  />
  <Input
    type="number" 
    text="Valor do projeto"
    name="budget"
    placeholder="Insira o orçamento total do  projeto"
    handleOnChange={Change}
    value={projeto.budget }
  />
  <Select  
    name="categoria" 
    text="Selecione uma categoria" 
    options={categorias} 
    handleOnChange={Category} 
    value={projeto.categoria ? projeto.categoria.id : ""} //está recendo os dados da API e recebendo 
  />

  <ButtonSubmit text={btntext}/> {/*puxando propriedade do componente PAI */}
  
  </form>
  );
}