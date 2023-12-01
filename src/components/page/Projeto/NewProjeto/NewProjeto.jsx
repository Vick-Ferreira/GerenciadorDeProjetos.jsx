import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewProjeto.module.css'
import ProjectForm from '../Projeto_itens/ProjetoForm';


export default function NewProject() {
  //HOKE
  const navigate = useNavigate();


      //REQUEST PARA A API
<<<<<<< HEAD
      function createPost(projeto) {//projeto (argumento)
        //inicialização servidor   - ISSO SERIA FEITO NO BACKEND
        projeto.cost = 0
        projeto.servicos = []
    
        fetch('http://localhost:5000/projetos', {
=======
      function createPost(projeto) {
        projeto.cost = 0;
        projeto.servicos = [];
      
        fetch('https://banco-js-gerenciador.vercel.app/projetos', {
>>>>>>> af31ed13035588a9627d8ef0a35470a1ff57b641
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
            // Adicione lógica para lidar com o erro, como exibir uma mensagem de erro
          });
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
