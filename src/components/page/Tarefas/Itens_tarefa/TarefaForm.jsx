
import {  useState } from 'react';

import React from 'react';
import styles from './TarefaForm.module.css'
import Input from '../../../form/Input/Input';
import ButtonSubmit from '../../../form/ButtonSubmit/ButtonSubmit';



export default function ProjectForm({ handleSubmit, btntext, tarefaData}) { // Vindo do componente pai
  //vendo se os dados estão chenado -  vindo do form edição
  const [tarefa, settarefa] = useState(tarefaData || {})


  
const submit = (e) => {
  e.preventDefault()
  handleSubmit(tarefa) // executa o metodo que foi passado pela PROPS e passo o tarefa que está cadastrado no forms como argumento
}



//IMPORTANTE metodo dinamico para ALTERAR o valor de um objeto
function Change(e) {
  settarefa({ ...tarefa, [e.target.name]: e.target.value })
  //independende do input que preencher vai alterar algum texto
  console.log(tarefa)
}


  return (
  <form onSubmit={submit} className={styles.form}>
  <Input
    type="text" 
    text="Nome da tarefa"
    name="name"
    placeholder="Insira o nome do tarefa"
    hand={Change} //vai mandar o metodo para ver executado
    value={tarefa.name}
  />
<Input
  type="text"  
  text="Descrição da tarefa"
  name="descricao"
  placeholder="Insira a descrição da tarefa"
  hand={Change}
  value={tarefa.descricao}
/>



  <ButtonSubmit text={btntext}/> {/*puxando propriedade do componente PAI */}
  
  </form>
  );
}
