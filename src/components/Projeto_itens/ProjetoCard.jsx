import React from 'react';
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill} from 'react-icons/bs'
import styles from './ProjetoCard.module.css'






export default function ProjetoCard({id, name, budget, categoria, handRemover}) {//props
  
  const remover =(e) => {
    e.preventDefault()
    handRemover(id) //passa para o component projetos para o METODO REMOVERPROJETO
  }
  
  
  
  return (
    <div className={styles.projeto_card}>
      <h4>{name}</h4>

      <p><span>Orçamento:</span> R${budget}</p>

      <p className={styles.categoria_text}>{categoria}</p>

    <div className={styles.projeto_card_btn}>

      <Link to={`/projetoedit/${id}`}><BsPencil/>Editar</Link> 
      <button onClick={remover}><BsFillTrashFill/>Excluir</button>
    </div>
    </div>
  )
}
