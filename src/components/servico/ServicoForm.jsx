import React, { useState } from 'react';
import Input from '../form/Input/Input';
import ButtonSubmit from '../form/ButtonSubmit/ButtonSubmit';

import styles from '../page/Projeto/Projeto_itens/ProjetoForm'


export default function ServicoForm({  handleSubmit, btntext,  ProjetoData}) {
  const [servico, setServico] = useState({});
 

  const submit = (e) => {
    console.log(servico)
    e.preventDefault();
    ProjetoData.servicos.push(servico);
    handleSubmit(ProjetoData);

    //servico em cima de servico e  inlcui ao projeto jogando ao creatservice
  }
  
  function handleChange(e) {//formando objeto no input, serviço sendo formado
    setServico({ ...servico, [e.target.name]: e.target.value });
  }
  return (
    <form onSubmit={submit} className={styles.form}>
        <Input
            type="text"
            text="Nome do serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange} // Corrija a propriedade hand aqui
        />
        <Input
            type="number"
            text="Custo do serviço"
            name="cost"
            placeholder="Valor do serviço"
            handleOnChange={handleChange}// Corrija a propriedade hand aqui
        />
        <Input
            type="text"
            text="Descrição do serviço"
            name="descricao"
            placeholder="Descreva o serviço"
            handleOnChange={handleChange} // Corrija a propriedade hand aqui
        />
         <ButtonSubmit text={btntext}/>
    </form>
);
  }