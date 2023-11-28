import React from 'react';
import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import styles from '../servico/ServicoCard.module.css';

export default function ServicoCard({ id, name, cost, descricao, handleRemove }) {
  return (
  <div  className={styles.card_Pai}>
    
    <div className={styles.card}>
      <p>Serviço:{name}</p>
      <p>R${cost}</p> 
     </div>

      <div>
      <h1>{descricao}</h1>
      </div>
      
        <Link to={`/projetoedit/${id}`}>
          <BsPencil />
        </Link>
        <button onClick={handleRemove}>
          <BsFillTrashFill />
        </button>

    </div>
  );
}