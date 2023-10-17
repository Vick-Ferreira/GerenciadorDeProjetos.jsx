import React from 'react';
import { Link } from 'react-router-dom';

//import Container  from '../Container/Container';

//stylos
import styles from './NavBar.module.css';

export default function NavBar() {
    return (
    <nav className={styles.navBar}>
            <ul className={styles.list}>
                <li className={styles.itemList}><Link to="/">Home</Link></li>
                <li className={styles.itemList}><Link to="/sobre">Sobre</Link></li>
                <li className={styles.itemList}><Link to="/contato">Contato</Link></li>
                <li className={styles.itemList}><Link to="/projetos">Projetos</Link></li>
                <li className={styles.itemList}><Link to="/newproject">NewProject</Link></li>
            </ul>
    </nav>
    );
}
