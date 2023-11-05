import React from 'react';
import { Link } from 'react-router-dom';
import style from './TarefaCard.module.css';


export default function TarefaCard({id, name, descricao, handRemover}) {

    const remover = (e) => {
      e.preventDefault();
        handRemover(id)
    }

  return (
    <div className={style.container}>
      <h1>Tarefa: {name}</h1>
   
      <p>Descrição:{descricao}</p>

      <div className={style.btn}>
        <Link to={`/edittarefas/${id}`}>Editar</Link>
        <button onClick={remover}>Exluir</button>
      </div>
      
    </div>
  );
}