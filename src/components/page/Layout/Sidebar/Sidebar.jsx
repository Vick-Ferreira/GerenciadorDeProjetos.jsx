
import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'
import { BsMenuButtonFill,BsFillHouseHeartFill, BsFillTelephoneFill, BsBarChartLine, BsCalendarCheck  } from 'react-icons/bs';

export default function CustomSidebar() {
  const [showSidebar, setShowSidebar] = useState(false);


  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={toggleSidebar}><BsMenuButtonFill/>  </button>
      <Sidebar className={styles.sidebar} collapsed={!showSidebar}>
    
        <Menu className={styles.menu}>
        <MenuItem className={styles.menuItem} component={<Link to="/">Home</Link>}><BsFillHouseHeartFill/>Home</MenuItem> 
        <MenuItem className={styles.menuItem} component={<Link to="/sobre">Sobre</Link>}> Sobre</MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/contato">Contato</Link>}><BsFillTelephoneFill/>Contato</MenuItem>

        <SubMenu className={styles.menuItem} label={<><BsBarChartLine />Projetos </>}>
          <MenuItem  component={<Link  to="/projetos">Projetos</Link>}> Projetos</MenuItem>
          <MenuItem className={styles.menuItem} component={<Link   to="/newproject">NewProject</Link>}>New Projeto</MenuItem>
        </SubMenu>

        <SubMenu className={styles.menuItem} label={<>< BsCalendarCheck />Tarefas </>}>
          <MenuItem className={styles.menuItem} component={<Link  to="/tarefas"></Link>}> TODAS</MenuItem>
          <MenuItem className={styles.menuItem} component={<Link  to=""></Link>}> A FAZER</MenuItem>
          <MenuItem className={styles.menuItem} component={<Link   to="/">FAZENDO</Link>}>FAZENDO</MenuItem>
          <MenuItem className={styles.menuItem} component={<Link   to="/">FEITO</Link>}>FEITO</MenuItem>
        </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}