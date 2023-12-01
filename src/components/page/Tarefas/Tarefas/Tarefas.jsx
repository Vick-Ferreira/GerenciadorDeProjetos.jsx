import React, { useEffect, useState } from 'react';
import TarefasCard from '../Itens_tarefa/TarefaCard';
import Container from '../../Layout/Container/Container';
import {BsFileEarmarkPlus}  from 'react-icons/bs';
import { Link } from 'react-router-dom';


export default function Tarefas() {

  const [tarefa, setTarefa] = useState ([])



//regatando dados NewTarefas para LISTAR GET
useEffect(() => {
  fetch("https://json-qrcod.vercel.app/tarefas", {
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

  fetch(`https://json-qrcod.vercel.app/tarefas/${id}`, {
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

    
      
      <Container customClass="linkNew">
      <div>
      <h1>Tarefas
        <Link to="/newtarefa"><BsFileEarmarkPlus/></Link> 
      </h1>
      </div>
      {/*verificar se há tarefas a serem renderizadas  */}
      {tarefa.length > 0 &&
      tarefa.map((tarefa) =>  (
          <TarefasCard
          id={tarefa.id}
          name={tarefa.titulo}
          descricao={tarefa.descricao}
          key={tarefa.id}
          handRemover={removerTarefa} />
        ))
}
      </Container>
      
  );
}