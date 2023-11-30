import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewProjeto.module.css'
import ProjectForm from '../Projeto_itens/ProjetoForm';


export default function NewProject() {
  //HOKE
  const navigate = useNavigate();


      //REQUEST PARA A API
      function createPost(projeto) {//projeto (argumento)
        //inicialização servidor   - ISSO SERIA FEITO NO BACKEND
        projeto.cost = 0
        projeto.servicos = []
    
        fetch('https://json-qrcod.vercel.app/projetos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projeto),
        })
        .then((resp) => resp.json())
        setTimeout(() => {
          navigate('../projetos/projetos', { state: { mensagem: 'Projeto criado com sucesso!' } });
        }, 500);
      }

  return (
    <div className={styles.newproject_container}>
      <h1>Novo Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços!</p>
      <ProjectForm handleSubmit={createPost} btntext="Criar Projeto"/>
       {/*chamando component formulario  */}
       {/*handleSubmit={createPost} passando propriedade - preciso aceira ela em projectForm */}
    </div>
  );
}
