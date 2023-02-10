
import React from "react";
import './Paginado.css'

//aqui solo armo los circulos con numeros del paginado
export default function Paginado({countriesPerPage, countries, paginados, currentPage}){
    const numero_de_pags = []
    for (let i = 1; i <= Math.ceil(countries/countriesPerPage); i++) {
        numero_de_pags.push(i) 
    }  
    return(
        <nav className='paginadoContainer'>
          <ul className ='ul'>
             {numero_de_pags.map(numero =>(
              <li key={numero}>
                
                <button className ={numero === currentPage ? "rojo" : "numeroPaginado" }  onClick = { () => paginados(numero)}> {numero} </button>  
      
              </li> 
                ))}
          </ul>
        </nav>
    )
}