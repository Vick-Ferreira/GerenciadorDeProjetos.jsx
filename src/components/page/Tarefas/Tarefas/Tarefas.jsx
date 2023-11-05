import React, { useEffect, useState } from 'react';
import TarefaCard from '../Itens_tarefa/TarefaCard';
import Container from '../../Layout/Container/Container';
import { useLocation } from 'react-router-dom';



export default function Tarefas() {

  const [tarefa, setTarefa] = useState ([])
  const localiza = useLocation();


//regatando dados NewTarefas para LISTAR GET
useEffect(() => {
  fetch("http://localhost:5000/tarefas", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resp.json())
    .then(data => {
      console.log(data)
      setTarefa(data)//setar meus projetos
  })
  .catch((error) => {
    console.error('Erro durante a requisição GET:', error);
  });
}, [])


//IMPORTANTE DELETE TAREFA
function removerTarefa(id){

  fetch(`http://localhost:5000/tarefas/${id}`, {
    method: 'DELETE',
    headers:{ //retorna algo
      'Content-Type': 'application/json'
    },
  }).then((resp) => resp.json())
    .then((data) => {
      setTarefa(tarefa.filter((tarefa) => tarefa.id !== id))//com isso percorro cada um dos objetos e vejo qual tenho o ID que to excluindo (FRONT E BACK)
    })
    .catch(err => console.log(err))
}


  return (
    <div className="">
      <h1>Tarefas</h1>, que é exposto em tarefas, 
      

      <Container>
        {/*verificar se há tarefas a serem renderizadas  */}
           {tarefa.length > 0 &&
          tarefa.map((tarefa) =>  (
          <TarefaCard
          id={tarefa.id}
          name={tarefa.name}
          descricao={tarefa.descricao}
          key={tarefa.id}
          handRemover={removerTarefa} />

        ))
}
      </Container>
      
    </div>
  );
}