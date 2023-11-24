import React from 'react';
import './App.css';
import Login from './componentes/Login/LoginForm';
import Logo from './componentes/Header/Logo';
import MenuDesplegable from './componentes/Header/MenuDesplegable';
import CarruselImagenes from './componentes/Carrusel/ImagenCarrusel';
import ProductoItems from './componentes/ListaProductos/ProductoItems';
import ProductoLista from './componentes/ListaProductos/ProductoLista';
import Info from './componentes/Footer/info';
import Header from './componentes/Header/Header';

function App() {
  return (
    <div>
      <Header />
      <Login />
      <Logo />
      <MenuDesplegable />
      <CarruselImagenes />
      <div className="barra-horizontal-color">
        <p className="productos-destacados">PRODUCTOS DESTACADOS</p>
      </div>
      <ProductoLista />
      <ProductoItems />
      <Info />
    </div>
  );
}

export default App;
