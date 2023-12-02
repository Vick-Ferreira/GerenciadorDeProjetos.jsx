import React from 'react';
import { useNavigate } from 'react-router-dom';
import TarefaForm from "../Itens_tarefa/TarefaForm";
import Container from '../../Layout/Container/Container';
import styles from '../NewTarefa/NewTarefa.module.css'
import { v4 as uuidv4 } from 'uuid';

export default function Newtarefa() {
  // HOKE
  const navigate = useNavigate();

  function createPost(tarefa) {
    // Gerar um ID único usando a função v4 do uuid
    const id = uuidv4();

    // Adicionar o ID à tarefa
    const tarefaComID = { ...tarefa, id };

    fetch(' http://localhost:5000/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarefaComID),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Dados recebidos após o POST:', data);
        navigate('/tarefas', { state: { mensagem: 'Tarefa criada com sucesso!' } });
      })
      .catch((error) => {
        console.error('Erro durante a requisição POST:', error);
        // Adicione lógica para lidar com o erro, como exibir uma mensagem de erro
      });
  }

  return (
    <Container>
      <div className={styles.newtarefa_container}>
        <h1>Nova Tarefa</h1>
        <p>Crie sua tarefa!</p>
        <TarefaForm
          handleSubmit={createPost}
          btnText="Criar Tarefa"
        />
      </div>
    </Container>
  );
}
