import { useEffect, useState } from "react";
import Container from "../../Layout/Container/Container";
import TarefaForm from "../Itens_tarefa/TarefaForm";
import styles from '../NewTarefa/NewTarefa.module.css'
import { useParams, useNavigate } from 'react-router-dom';

export default function EditTarefas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tarefa, setTarefa] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(` http://localhost:5000/tarefas/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setTarefa(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  console.log('TarefaData:', tarefa);

  function editPost(updatedTarefa) {
    if (!updatedTarefa.id) {
      console.log('ID da tarefa não definido.');
      return;
    }
  
    console.log('Tentando atualizar tarefa:', updatedTarefa);
  
    fetch(` http://localhost:5000/tarefas/${updatedTarefa.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTarefa),
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('Resposta da API após a atualização:', data);
  
      // Adicione a navegação aqui para redirecionar após a atualização
      navigate('../tarefas');
    })
    .catch((err) => {
      console.error('Erro na requisição para a API:', err);
      // Adicione lógica para lidar com o erro, como exibir uma mensagem de erro
    });
  }
  

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <div className={styles.newtarefa_container}>
        <h1>Editando Tarefa</h1>
        <TarefaForm
          handleSubmit={editPost}
          btnText="Salvar Edição"
          TarefaData={tarefa}
        />
      </div>
    </Container>
  );
}
