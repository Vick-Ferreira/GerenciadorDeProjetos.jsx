import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'

export default function Footer() {
return (
    <footer>
        <ul className={styles.ulFooter}>
            <li className={styles.list}><FaFacebook/></li>
            <li className={styles.list}><FaInstagram/></li>
            <li className={styles.list}><FaLinkedin/></li>
        </ul>
        <p className={styles.span_full}><span className={styles.span}>Vitoria Ferreira </span> &copy; 2023 </p>
    </footer>
);
}
