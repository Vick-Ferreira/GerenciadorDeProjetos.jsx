import React, { useState } from 'react';
import Input from '../form/Input/Input';
import ButtonSubmit from '../form/ButtonSubmit/ButtonSubmit';

import styles from '../page/Projeto/Projeto_itens/ProjetoForm'


export default function ServicoForm({  handleSubmit, btntext,  projetoData}) {
  const [servico, setServico] = useState({});
 

  const submit = (e) => {
    e.preventDefault();
  
    console.log('ProjetoData.services:', projetoData.services);
  
    projetoData.servicos = projetoData.service || [];
    projetoData.services.push(servico);
    handleSubmit(projetoData);
  }
  
  function handleChange(e) {//formando opjeto no input, serviço sendo formado
    setServico({ ...servico, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={submit} className={styles.form}>
        <Input
            type="text"
            text="Nome do serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={  handleChange} // Corrija a propriedade hand aqui
        />
        <Input
            type="number"
            text="Custo do serviço"
            name="cost"
            placeholder="Valor do serviço"
            handleOnChange={  handleChange} // Corrija a propriedade hand aqui
        />
        <Input
            type="text"
            text="Descrição do serviço"
            name="descricao"
            placeholder="Descreva o serviço"
            handleOnChange={ handleChange} // Corrija a propriedade hand aqui
        />
         <ButtonSubmit text={btntext}/>
    </form>
);
  }