import React from 'react';
import { FaLinkedin} from 'react-icons/fa'
import { BsGithub } from "react-icons/bs";
import { MdHttp } from "react-icons/md";

import styles from './Footer.module.css'

export default function Footer() {
return (
    <footer>
        <ul className={styles.ulFooter}>
            <li className={styles.list}><a href='https://github.com/Vick-Ferreira'><BsGithub /></a></li>
            <li className={styles.list}><a href='https://portfolio-devferreira.vercel.app/'><MdHttp /></a></li>
            <li className={styles.list}><a href='https://www.linkedin.com/in/vitoria-ferreira-ti/' target='_blank' rel='noopener noreferrer'><FaLinkedin/></a></li>

        </ul>
        <p className={styles.span_full}><span className={styles.span}>Vitoria Ferreira </span> &copy; 2023 </p>
    </footer>
);
}
