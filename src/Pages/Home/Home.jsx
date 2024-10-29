import React, { useState, useEffect, useContext } from 'react';
// import React from 'react'
import Header from './Header'
import CardPizza from './cardpizza'
// import { pizzas } from '../../assets/js/pizzas'     - Array ejercicio anterior
import { CounterContext } from '../../CounterContext';


export default function Home() {
  const [pizzas, setPizzas] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { increaseQuantity } = useContext(CounterContext);
  const { addToCart} = useContext(CounterContext);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pizzas');
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error al cargar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas(); 
  }, []);  

  if (loading) {
    return <div>Cargando pizzas... (se necesita la api del Hito 4)</div>;
  }

  const handleAddToCart = (id) => {
    increaseQuantity(id); // Agregar al carrito
  };



  return (
<div>
 <Header/>
 <div className="home">
      <h1>Nuestras Pizzas</h1>
      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            name={pizza.name}
            img={pizza.img}
            desc={pizza.desc}
            price={pizza.price}
            ingredients={pizza.ingredients}
            // onAddToCart={() => handleAddToCart(pizza.id)}
            onAddToCart={() => addToCart(pizza)}
          />
        ))}
      </div>
    </div>

    </div>
  )
}
