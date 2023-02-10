import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Debo importar las acciones desde "02_actions/index"
import { filtercountries_0_hab, filterCountriesByPopulation, getCountrieses, filterCountriesByPop, 
         filterCountriesByContinent, filterCountriesByActivity, orderByName, orderByPopulation,
         getActivities} from "../../02_actions/index.js";

// Debo importar las constantes desde "04_const/Const", estas son de los "Select"
import { LESS_POPULATION, HIGHER_POPULATION, ALL, ALL_OF_AFRICA, ALL_OF_N_AMERICA, ALL_OF_S_AMERICA,
         ALL_0_1, ALL_1_50, ALL_50_100, ALL_100_500, ALL_500, ALL_OF_ANTARCTICA, ALL_OF_ASIA, ALL_OF_EUROPE,
         ALL_OF_OCEANIA, ASCENDENTE, DESCENDENTE} from "../../04_const/Const.js";

import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado"//Importo Paginado
import "./Cards.css";

export default function Home(index) {
  const dispatch = useDispatch();//Dispatch funcionará con todas las acciones importadas de la carpeta de acciones.
  const activities = useSelector((state) => state.activities);//devuelve la parte del estado que desea y que se encuentra en el "reducer"
  const countries = useSelector((state) => state.countries);
  //console.log(countries)

  const [currentPage, setCurrentPage] = useState(1); //Son los estados
  const [countriesPerPage] = useState(10);
  const [, setOrden] = useState("");

  const lastCountry = currentPage * countriesPerPage; 
  const firstCountry = lastCountry - countriesPerPage;
  const currentCountry = countries.slice(firstCountry, lastCountry);
  //console.log("aqui paginados number 1 ")
  //currentCountry son los paises a desplegar segun
  // nro pulsado del paginado, se envian a card.js

  const paginados = (numero) => {
    console.log("aqui paginados number 3 ")
    setCurrentPage(numero);//actualizo el estado "setCurrentPage"
  };

  function reloadButton(e){
    e.preventDefault()
    dispatch(getCountrieses())
  }
  
  function handleFilterPopulation(e) {
    console.log(e)
    dispatch(filterCountriesByPopulation(e.target.value));
    setCurrentPage(1);
  }
  function handleFilterContinent(e) {
    dispatch(filterCountriesByContinent(e.target.value));
    setCurrentPage(1);
  }

  function handleCountries_Pop(e) {//Countries 500 
    dispatch(filterCountriesByPop(e.target.value)); //despacho una accion
    setCurrentPage(1);
  }

  function handleCountries_0_hab(e) {
    dispatch(filtercountries_0_hab(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterActivity(e) {
    dispatch(filterCountriesByActivity(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {//Se genera una accion llamada "orderByName"
    e.preventDefault();
    dispatch(orderByName(e.target.value)); //Aqui el valor de (e.target.value) ES ASCENDENTE O DESCENDENTE
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  useEffect(() => {
    dispatch(getCountrieses());
    dispatch(getActivities());
  }, [dispatch]);

  return (
    
    <div className="cardsContainer">
      <div className="filterContainer">

      <button id='b1' className='filterOutSider' onClick = { (e) => handleCountries_0_hab(e) }>Countries 0 hab </button>

      <button id='b1' key={index} className={"filterAndOrder"} onClick = { (e) => handleCountries_Pop(e) }>Countries 500 </button>

      <button id='b2' className='filterAndOrder' onClick = { (e) => reloadButton(e) }>Recargar</button>

        <select className='filterAndOrder' onChange = {(e) => { handleSort(e) }} >
          <option>Filtrar / Orden Alfabetico</option>
          <option value={ASCENDENTE}>- Desde "A" hasta "Z" </option>
          <option value={DESCENDENTE}>- Desde "Z" hasta "A" </option>
        </select>

        <select className = 'filterAndOrder' onChange = {(e) => handleSort2(e)} >
          <option>Filtrar / Poblacion</option>
          <option value={HIGHER_POPULATION}>- Mayor Poblacion</option>
          <option value={LESS_POPULATION}>- Menor Poblacion</option>
        </select>

        <select className='filterAndOrder' onChange = { (e) => handleFilterActivity(e)}>
          <option value="todos"> Actividades </option>
          {activities.map((v) => ( <option value={v.name}>{v.name}</option> ))}
        </select>

        <select className = 'filterAndOrder' onChange = {(e) => handleFilterPopulation(e)}>
          <option value = "continent">Poblacion / Millones</option>
          <option value = {ALL_0_1}>- (0 hasta 1 Mill)</option>
          <option value = {ALL_1_50}>- (1 Mill - 50 Mill)</option>
          <option value = {ALL_50_100}>- (50 Mill - 100 Mill)</option>
          <option value = {ALL_100_500}>- (100 Mill - 500 Mill)</option>
          <option value = {ALL_500}>- (Mas de 500 Mill) </option>
        </select>

        <select className = 'filterAndOrder' onChange={(e) => handleFilterContinent(e)}>
          <option value = "continent">Filtrar / Continentes</option>
          <option value = {ALL}>- Todos</option>
          <option value = {ALL_OF_AFRICA}  >- Africa</option>
          <option value = {ALL_OF_ANTARCTICA}>- Antartida</option>
          <option value = {ALL_OF_N_AMERICA}>- America del Norte</option>
          <option value = {ALL_OF_S_AMERICA}>- America del Sur</option>
          <option value = {ALL_OF_ASIA}>- Asia</option>
          <option value = {ALL_OF_EUROPE}>- Europa</option>
          <option value = {ALL_OF_OCEANIA}>- Oceania</option>
        </select>
      </div>

      <Paginado //aqui paso los valores al componente "Paginado" para armar los numeritos
        countriesPerPage = {countriesPerPage}
        countries = {countries.length}
        paginados = {paginados}
        currentPage = {currentPage}
        />
     
      <div className='cardsBox'>
        {currentCountry.map((pais) => {//aqui despliego segun el paginado
          return (
            <div key={pais.id}>
              <Link to={"/home/" + pais.id}>
                <Card
                  name={pais.name}
                  flag={pais.flag}
                  continent={pais.continent}
                  capital={pais.capital}
                  population={pais.population}
                />
              </Link>
            </div>
          )})}
      </div>
    </div>
  )
}
