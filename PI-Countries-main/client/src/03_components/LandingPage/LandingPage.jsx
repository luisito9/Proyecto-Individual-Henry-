import React from "react";
import{Link} from 'react-router-dom';
import './LandingPage.css'


export default function LandingPage(){
    return(
        <div className ="landingPage">
            <h1 className = 'landingTitle'> ! Bienvenidos ! </h1>
            <h2 className = 'landingSubTitle'> Proyecto Countries</h2>
            <h2 className = 'henry'> Henry's</h2>
            <Link to ='/home'  /* me redirige a la ruta home de App.js */ >
                <button className='landingButton'>Informacion de Ciudades del Mundo ! </button>
            </Link>
        </div>
    )
}