import React from 'react';
import avatar from './assets/avatar.jpg';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaArrowsAltH, FaGithub, FaGlobeAmericas, FaHeartbeat, FaHome, FaList, FaMoneyBillWave, FaQuestion, FaUserGraduate, FaShieldAlt } from 'react-icons/fa';
import sidebarBg from './assets/bg.jpg';

interface Props{
  collapsed: boolean;
  toggled: boolean;
  handleToggleSidebar: () => void;
  handleCollapsedChange: () => void;
}

const Aside = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange }:Props) => {
  return (
    <ProSidebar
      image={sidebarBg}

      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            paddingTop: '80px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
      <div style={{justifyContent:'center', textAlign:'center'}}>
        <img src={avatar} style={{width:'32px', height:'32px', top:'10px', left:'10px', borderRadius:'50%'}} alt="avatar"/>
        <br />
        user

      </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
      <Menu iconShape="circle">
      <MenuItem icon={<FaArrowsAltH />} onClick={() => handleCollapsedChange()}> Menu</MenuItem>
      </Menu>
        <Menu iconShape="circle">
          <MenuItem icon={<FaHeartbeat />}> Saúde</MenuItem>
          <MenuItem icon={<FaUserGraduate />}> Educação</MenuItem>
          <MenuItem icon={<FaHome />}> Assistência social</MenuItem>
          <MenuItem icon={<FaShieldAlt />}> Segurança</MenuItem>
          <MenuItem icon={<FaGlobeAmericas />}> Meio ambiente,<br />Urbanização &<br />Mobilidade</MenuItem>
          <MenuItem icon={<FaMoneyBillWave />}> Economia & Finanças</MenuItem>
          <MenuItem icon={<FaQuestion />}> Personalizado</MenuItem>
        </Menu>
        <Menu iconShape="square">
          <MenuItem icon={<FaList />}> Listar indicadores</MenuItem>
          </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/JJDSNT/otfrontend2"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Código-fonte
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;