import React from 'react';
import './ProductoLista.css'; 

const ProductoLista = () => {
  return (
    <div className="producto-lista-container">
      <div className="producto-item">
        <img src="" alt="Producto 1" />
        <p>Descripción:</p>
        <p>Precio: $</p>
      </div>
      <div className="producto-item">
        <img src="" alt="Producto 2" />
        <p>Descripción:</p>
        <p>Precio: $</p>
      </div>
      <div className="producto-item">
        <img src="" alt="Producto 3" />
        <p>Descripción:</p>
        <p>Precio: $</p>
      </div>
      <div className="producto-item">
        <img src="" alt="Producto 4" />
        <p>Descripción:</p>
        <p>Precio: $</p>
      </div>
    </div>
  );
};

export default ProductoLista;
