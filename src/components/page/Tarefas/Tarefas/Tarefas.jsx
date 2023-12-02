import React, { useEffect, useState } from 'react';
import TarefasCard from '../Itens_tarefa/TarefaCard';
import style from '../Itens_tarefa/TarefaCard.module.css';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Tarefas() {
  const [tarefa, setTarefa] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:5000/tarefas", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTarefa(data);
      })
      .catch((error) => {
        console.error('Erro durante a requisição GET:', error);
      });
  }, []);

  function removerTarefa(id) {
    fetch(` http://localhost:5000/tarefas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTarefa(tarefa.filter((tarefa) => tarefa.id !== id));
      })
      .catch((err) => console.log(err));
  }

  return (
   <div className={style.border}>
        <h1>
          Tarefas
          <Link to="/newtarefa">
            <BsFileEarmarkPlus />
          </Link>
        </h1>
        
        <div className={style.pai}>
      {tarefa.length > 0 &&
        tarefa.map((tarefa) => (
          <TarefasCard
            id={tarefa.id}
            name={tarefa.titulo}
            descricao={tarefa.descricao}
            key={tarefa.id}
            handRemover={removerTarefa}
          />
        ))}
      </div>
    </div>
  
  );
}
