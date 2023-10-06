import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

interface AsideProps {
  pageWrapId: string;
  outerContainerId: string;
}

const Aside: React.FC<AsideProps> = ({ pageWrapId, outerContainerId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <Menu
        noOverlay 
        pageWrapId={pageWrapId}
        outerContainerId={outerContainerId}
        isOpen={menuOpen}
        onStateChange={(state) => setMenuOpen(state.isOpen)}
        styles={{
          bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)',
          },
          bmMenu: {
            background: 'rgba(0, 0, 0, 0.7)', // Plano de fundo semi-transparente
            paddingTop: '50px',
          },
          // Outros estilos conforme necessário
        }}
      >
        {[
          { text: "Home", link: "/" },
          { text: "About", link: "/about" },
          { text: "Services", link: "/services" },
          { text: "Contact us", link: "/contact" },
        ].map((item, index) => (
          <a key={index} className="menu-item" href={item.link}>
            {item.text}
          </a>
        ))}
      </Menu>
    </div>
  );
};

export default Aside;

