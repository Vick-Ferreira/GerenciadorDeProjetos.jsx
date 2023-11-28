import React from 'react';
import styles from './Cadastro.modules.css'
export default function Cadastro() {
    return (
        <div>
            <h2>Cadastro</h2>

            <form  className={styles.form}>
                <div>
                    <label htmlFor="nome">Nome:</label>{/*htmlFor para lapel em jsx */}
                    <input type="text" id="nome" name="nome" />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" />
                </div>
                <div>
                    <label htmlFor="cidade">Cidade:</label>
                    <input type="text" id="cidade" name="cidade" />
                </div>
                <div>
                    <label htmlFor="estado">Estado:</label>
                    <input type="text" id="estado" name="estado" />
                </div>
                <div>
                    <input type="checkbox" id="aceitar" name="aceitar" />
                    <label htmlFor="aceitar">Aceitar termos</label>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
