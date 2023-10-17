
import styles from './Container.module.css';

export default function Container(props) {//ENCAPSULANDO
  return <div className={`${styles.container} ${styles.customClass}}`} >{props.children}</div>; // Use 'styles.container' para aplicar a classe de estilo
}
