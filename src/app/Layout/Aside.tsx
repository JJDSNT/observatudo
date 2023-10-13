"use client";
// https://github.com/azouaoui-med/react-pro-sidebar/blob/master/CHANGELOG.md
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaLandmark, FaArrowsAltH, FaGithub, FaChartBar, FaGlobeAmericas, FaHeartbeat, FaHome, FaList, FaMoneyBillWave, FaQuestion, FaUserGraduate, FaShieldAlt, FaCentercode } from 'react-icons/fa';
import { useSidebarStore } from '@/app/stores/useSidebarStore';
import { useInfoStore } from '@/app/stores/useInfoStore';
import sidebarBg from './assets/bg.jpg';
import NavMenu from "@/app/components/AuthNav"


const Aside = () => {
  const { setEixo } = useInfoStore();
  const { handleCollapsedChange, collapsed, handleBackdropClick, toggled, setActivePage } = useSidebarStore();

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
    <Sidebar
      image={sidebarBg.src}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onBackdropClick={handleBackdropClick}
      rootStyles={{
        //border: 'none',
        Color: '#0c1e35',
      }}
    >
      <Menu>
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
          <MenuItem icon={<FaGlobeAmericas />} onClick={() => handleMenuItemClick(5)}> Meio ambiente</MenuItem>
          <MenuItem icon={<FaMoneyBillWave />} onClick={() => handleMenuItemClick(6)}> Economia & Finanças</MenuItem>
          <MenuItem icon={<FaLandmark />} onClick={() => handleMenuItemClick(6)}> Governança</MenuItem>
          <MenuItem icon={<FaQuestion />} onClick={() => handleMenuItemClick(7)}> Personalizado</MenuItem>
        </Menu>
        <Menu>
          <MenuItem icon={<FaList />} onClick={() => handleMenuItemClick('listarIndicadores')}> Listar indicadores</MenuItem>
        </Menu>
      </Menu>
    </Sidebar>

    </>
  );
};

export default Aside;
