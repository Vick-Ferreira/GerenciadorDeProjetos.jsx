import { useEffect, useState } from "react";
import TarefaForm from '../Itens_tarefa/TarefaForm';
import Container from '../../Layout/Container/Container';
import { useParams } from 'react-router-dom';

export default function EditTarefas() {
    let { id } = useParams();
    const [tarefa, setTarefa] = useState({});

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
                console.log('Dados da tarefa:', data); // Adicione esta linha para verificar os dados

            })
            .catch(err => console.log(err));
    }, [id]);

    function editPost(tarefa) {
        fetch(`http://localhost:5000/tarefas/${tarefa.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefa)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setTarefa(data);
        })
        .catch(err => console.log(err));
    }

    return (
        <Container>
            <div>
                <p>${tarefa.name}</p>
                <h1>Editando Tarefa</h1>
                <TarefaForm
                    handleSubmit={editPost}
                    btntext="Concluir edição"
                    TarefaData={tarefa}
                />
            </div>
        </Container>
    );
}
