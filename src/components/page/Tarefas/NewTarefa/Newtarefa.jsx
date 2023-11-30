import React from 'react';
import { useNavigate } from 'react-router-dom';
import TarefaForm from "../Itens_tarefa/TarefaForm";
import Container from '../../Layout/Container/Container';
import styles from '../NewTarefa/NewTarefa.module.css'
export default function Newtarefa() {

 //HOKE
 const navigate = useNavigate();

  //função CRIAR TAREFA

   function createPost(tarefa){
    fetch('https://json-qrcod.vercel.app/tarefas', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarefa),
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('dados recebidos apos o POST', data)
      navigate('../tarefas', {state: {mensagem: 'Tarefa criada com sucesso!'}})
    
    });

   }

  return (
  <Container>
    <div className={styles.newtarefa_container}>
      <h1>Nova Tarefa</h1>
      <p>Crie sua  tarefa!</p>
      <TarefaForm 
        handleSubmit={createPost}
        btnText="Criar Tarefa"/>
    
    </div>
    </Container>
  );
}
