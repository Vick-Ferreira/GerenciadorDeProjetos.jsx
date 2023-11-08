import React, { useState } from "react";

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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="titulo"
        value={formData.titulo || ''} // Verifica se formData.titulo está definido
        onChange={handleChange}
      />
      <input
        type="text"
        name="descricao"
        value={formData.descricao || ''} // Verifica se formData.descricao está definido
        onChange={handleChange}
      />
      <button type="submit">{btnText}</button>
    </form>
  );
}
