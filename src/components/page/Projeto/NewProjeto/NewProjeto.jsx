import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewProjeto.module.css';
import ProjectForm from '../Projeto_itens/ProjetoForm';

export default function NewProject() {
  const navigate = useNavigate();

  function createPost(projeto) {
    projeto.cost = 0;
    projeto.servicos = [];

    fetch('http://localhost:5000/projetos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projeto),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Resposta da API após a criação:', data);
        setTimeout(() => {
          navigate('../projetos', { state: { mensagem: 'Projeto criado com sucesso!' } });
        }, 500);
      })
      .catch((err) => {
        console.error('Erro na requisição para a API:', err.message);
      });
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Novo Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços!</p>
      <ProjectForm handleSubmit={createPost} btntext="Criar Projeto" />
    </div>
  );
}
