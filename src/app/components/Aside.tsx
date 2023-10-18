"use client";
// https://github.com/azouaoui-med/react-pro-sidebar/issues/175
// https://github.com/azouaoui-med/react-pro-sidebar/blob/master/CHANGELOG.md
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { FaCogs, FaLandmark, FaArrowsAltH, FaGithub, FaChartBar, FaGlobeAmericas, FaHeartbeat, FaHome, FaList, FaMoneyBillWave, FaQuestion, FaUserGraduate, FaShieldAlt, FaCentercode } from 'react-icons/fa';
import { useSidebarStore } from '@/app/stores/useSidebarStore';
import { useInfoStore } from '@/app/stores/useInfoStore';
import sidebarBg from './assets/bg.jpg';
import { useSession } from 'next-auth/react';
import ThemeSelector from './ThemeSelector';


const Aside = () => {
  const { setEixo } = useInfoStore();
  const { handleCollapsedChange, collapsed, handleBackdropClick, toggled, setActivePage } = useSidebarStore();

  const { data: session } = useSession();

  const handleMenuItemClick = (item: string | number): void => {
    if (typeof item === 'number') {
      setActivePage('dashboard');
      setEixo(item);
    } else {
      setActivePage(item);
    }
  };



  return (
    <>
    <nav>
      <Sidebar
        image={sidebarBg.src}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint={typeof window !== 'undefined' ? 'all' : undefined}
        onBackdropClick={handleBackdropClick}
        width='270px'
        collapsedWidth='80px'
        rootStyles={{
          border: 'none',
          [`.${sidebarClasses.container}`]: {
            backgroundColor: 'rgba(30, 64, 175, 0.5)',
            paddingTop: '70px',
            height: '100%',
            //zIndex: '5',
            top: 0,
            left: 0
          },
          [`.${sidebarClasses.root}`]: {
            marginTop: '0px',
            left: '0px',
            height: '100%'
          }
        }}
      >
        <Menu>
          <Menu>
            <ThemeSelector />
          </Menu>
          <Menu>
            {session && session.user.role === 'admin' && ( 
              <MenuItem icon={<FaCogs />} component={<Link href="/admin" />}> Admin</MenuItem>
            )}
            <MenuItem icon={<FaArrowsAltH />} onClick={() => handleCollapsedChange()}> Menu</MenuItem>
          </Menu>
          <Menu>
            <MenuItem icon={<FaChartBar />} component={<Link href="/" />}> Dashboard</MenuItem>
          </Menu>
          <Menu>
            <MenuItem icon={<FaHeartbeat />} onClick={() => handleMenuItemClick(1)}> Saúde</MenuItem>
            <MenuItem icon={<FaUserGraduate />} onClick={() => handleMenuItemClick(2)}> Educação</MenuItem>
            <MenuItem icon={<FaHome />} onClick={() => handleMenuItemClick(3)}> Assistência social</MenuItem>
            <MenuItem icon={<FaShieldAlt />} onClick={() => handleMenuItemClick(4)}> Segurança</MenuItem>
            <MenuItem icon={<FaGlobeAmericas />} onClick={() => handleMenuItemClick(5)}> Meio ambiente</MenuItem>
            <MenuItem icon={<FaMoneyBillWave />} onClick={() => handleMenuItemClick(6)}> Economia & Finanças</MenuItem>
            <MenuItem icon={<FaLandmark />} onClick={() => handleMenuItemClick(6)}> Governança</MenuItem>
            <MenuItem icon={<FaQuestion />} onClick={() => handleMenuItemClick(7)}> Personalizado</MenuItem>
          </Menu>
          <Menu>
            <MenuItem icon={<FaList />} component={<Link href="/indicadores" />}> Listar indicadores</MenuItem>
          </Menu>
        </Menu>
      </Sidebar >
      </nav>
    </>
  );
};

export default Aside;
