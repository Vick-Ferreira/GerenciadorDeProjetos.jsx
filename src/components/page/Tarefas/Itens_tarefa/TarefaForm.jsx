import React, { useState } from "react";
import Input from '../../../form/Input/Input'
import styles from "../Itens_tarefa/TarefaForm.module.css";

export default function TarefaForm({ handleSubmit, btnText, TarefaData }) {
  const [formData, setFormData] = useState(TarefaData || {}); // Defina um objeto vazio como valor padrão se TarefaData for undefined.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit}  className={styles.form}>
      <input
        id="name" 
        type="text"
        name="titulo"
        placeholder="Insira o nome da tarefa"
        value={formData.titulo || ''} // Verifica se formData.titulo está definido
        onChange={handleChange}
      />
      <input
        type="text"
        name="descricao"
        placeholder="Insira a descrição da tarefa"
        value={formData.descricao || ''} // Verifica se formData.descricao está definido
        onChange={handleChange}
      />
      <button type="submit">{btnText}</button>
    </form>
  );
}
