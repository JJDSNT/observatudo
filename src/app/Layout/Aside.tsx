import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";

const Aside = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => setMenuOpen(state.isOpen)}
        styles={{ bmMenu: { paddingTop: '50px' } }}
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
