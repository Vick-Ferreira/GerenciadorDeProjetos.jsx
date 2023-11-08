import React from 'react';
import { useNavigate } from 'react-router-dom';
import TarefaForm from "../Itens_tarefa/TarefaForm";
import Container from '../../Layout/Container/Container';

export default function Newtarefa() {

 //HOKE
 const navigate = useNavigate();

  //função CRIAR TAREFA

   function createPost(tarefa){
    fetch('http://localhost:5000/tarefas', {
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
    })
    .catch((error) => {
      console.error('Erro durante a requisição POST:', error);
    });

   }

  return (
    <Container>
    
      <h1>Nova Tarefa</h1>
      <p>Crie sua nova tarefa agora!</p>

      <TarefaForm   handleSubmit={createPost} btnText="Criar Tarefa"/>

    </Container>
  );
}
