import { useEffect, useState } from "react";
import Container from "../../Layout/Container/Container";
import TarefaForm from "../Itens_tarefa/TarefaForm";
import { useParams, useNavigate } from 'react-router-dom'; // Importe useNavigate

export default function EditTarefas() {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate em vez de useHistory
  const [tarefa, setTarefa] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/tarefas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
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

  function editPost(tarefa) {
    if (!tarefa.id) {
      console.log('ID da tarefa não definido.');
      return;
    }

    console.log('Tentando atualizar tarefa:', tarefa);
    fetch(`http://localhost:5000/tarefas/${tarefa.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarefa),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('Resposta da API após a atualização:', data);
        navigate('/tarefas'); // Use navigate para redirecionar
      })
      .catch((err) => console.log(err));
  }

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <div>
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
