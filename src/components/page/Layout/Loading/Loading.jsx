import React from 'react';
import styles from './Loading.module.css'
import loadding from './img/loading.svg'

export default function Loading() {
  return (
    <div className={styles.loadding_container}>
      <img src={loadding}  className={styles.load}alt="Loading" />
    </div>
  );
}
