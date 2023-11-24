import React from 'react';
import './Header.css'; // Importa el archivo de estilos específico para el encabezado

const Header = () => {
  return (
    <div className="header-bar">
        <div className="spacer"></div>
      <button className="login-button">Login</button>
    </div>
  );
};

export default Header;
