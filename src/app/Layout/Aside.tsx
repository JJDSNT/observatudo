// https://github.com/azouaoui-med/react-pro-sidebar/blob/master/CHANGELOG.md


import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaArrowsAltH, FaGithub, FaChartBar, FaGlobeAmericas, FaHeartbeat, FaHome, FaList, FaMoneyBillWave, FaQuestion, FaUserGraduate, FaShieldAlt, FaCentercode } from 'react-icons/fa';
import { useSidebarStore } from '@/app/stores/useSidebarStore';
import { useInfoStore } from '@/app/stores/useInfoStore';
import sidebarBg from './assets/bg.jpg';
import avatar from './assets/avatar.jpg';



const Aside = () => {
  const { setEixo } = useInfoStore();
  const { handleCollapsedChange, collapsed, handleBackdropClick, toggled, setActivePage } = useSidebarStore();

  const handleMenuItemClick = (item: string | number): void => {
    if (typeof item === 'number') {
      setEixo(item);
    } else {
      setActivePage(item);
    }
  };

  return (
    <Sidebar
      image={sidebarBg.src}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onBackdropClick={handleBackdropClick}
      rootStyles={{
        //border: 'none',
        bgColor: '#0c1e35',
      }}
    >
      <Menu>
        <Menu>
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <img src={avatar.src} style={{ width: '32px', height: '32px', top: '10px', left: '10px', borderRadius: '50%' }} alt="avatar" />
              <br />
              user

            </div>
          </div>
        </Menu>

        <Menu>
          <MenuItem icon={<FaArrowsAltH />} onClick={() => handleCollapsedChange()}> Menu</MenuItem>
        </Menu>
        <Menu>
          <MenuItem icon={<FaChartBar />} onClick={() => handleMenuItemClick('dashboard')}> Dashboard</MenuItem>
        </Menu>
        <Menu>
          <MenuItem icon={<FaHeartbeat />} onClick={() => handleMenuItemClick(1)}> Saúde</MenuItem>
          <MenuItem icon={<FaUserGraduate />} onClick={() => handleMenuItemClick(2)}> Educação</MenuItem>
          <MenuItem icon={<FaHome />} onClick={() => handleMenuItemClick(3)}> Assistência social</MenuItem>
          <MenuItem icon={<FaShieldAlt />} onClick={() => handleMenuItemClick(4)}> Segurança</MenuItem>
          <MenuItem icon={<FaGlobeAmericas />} onClick={() => handleMenuItemClick(5)}> Meio ambiente,<br />Urbanização &<br />Mobilidade</MenuItem>
          <MenuItem icon={<FaMoneyBillWave />} onClick={() => handleMenuItemClick(6)}> Economia & Finanças</MenuItem>
          <MenuItem icon={<FaQuestion />} onClick={() => handleMenuItemClick(7)}> Personalizado</MenuItem>
        </Menu>
        <Menu>
          <MenuItem icon={<FaList />} onClick={() => handleMenuItemClick('listarIndicadores')}> Listar indicadores</MenuItem>
        </Menu>
      </Menu>
      <Menu rootStyles={{ textAlign: 'center' }}>
        <div
          style={{
            padding: '20px 24px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <a
            href="https://github.com/JJDSNT/otfrontend2"
            target="_blank"
            className="ps-sidebar-btn"
            rel="noopener noreferrer"
          >
            <span>
              <FaGithub />
            </span>
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              Código-fonte
            </span>
          </a>
        </div>
      </Menu>
    </Sidebar>
  );
};

export default Aside;
