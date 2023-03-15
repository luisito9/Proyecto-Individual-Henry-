// Prueba Git
import axios from 'axios';
import { FILTER_BY_0_HAB, FILTER_BY_POPULATION, RESET, ORDER_BY_POPULATION, FILTER_BY_ACTIVITIES,
         FILTER_BY_CONTINENT, GET_COUNTRIES, ORDER_BY_NAME, FILTERCOUNTRIES_BY_POP, SEARCH_COUNTRIES,
         GET_ACTIVITIES, POST_ACTIVITIES, DETAIL } from '../04_const/Const'

export function getCountrieses() {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/countries')//"countries" es la BD
            return dispatch({// despacha una accion con "type" y "payload"
                type: GET_COUNTRIES,
                payload: json.data
            });
        } 
        catch (error) {
            alert('Los paises no fueron encontrados')
            console.log(error)
        }
    }
}
export function searchCountries(search) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/countries?name=' + search)//hago la busqueda y paso el resultado
//                                                                                       al "reducer" para que modifique el estado
            return dispatch({
                type: SEARCH_COUNTRIES,
                payload: json.data
            });
        } 
        catch (error) {
            alert('El pais no fue encontrado aqui !')
            console.log(error)
        }
    }
}

export function filtercountries_0_hab(payload) {
    return {
        type: FILTER_BY_0_HAB, //Debe ser declarado en el archivo "04_const y aqui arriba"
        payload
    }
}

export function filterCountriesByPopulation(payload) {
    return {
        type: FILTER_BY_POPULATION,
        payload
    }
}

export function filterCountriesByContinent(payload) {
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterCountriesByPop(payload) {// Countries 500 
    return {
        type: FILTERCOUNTRIES_BY_POP,
        payload
    }
}

export function filterCountriesByActivity(payload) {
    return {
        type: FILTER_BY_ACTIVITIES,
        payload
    }
}

export function orderByName(payload) {
    console.log(payload)// aqui "payload" es ASCENDENTE O DESCENDENTE todavia ja ja...
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload) {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
}

export function getActivities() {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/activity');
            return dispatch({
                type: GET_ACTIVITIES,
                payload: json.data
            })
        } catch (error) {
            alert('No hay actividades')
            console.log(error)
        }
    }
}

export function postActivities(payload) {
    return async function (dispatch) {
        await axios.post('http://localhost:3001/activity', payload);
        return dispatch({
            type: POST_ACTIVITIES,
        })
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/countries/' + id);
            return dispatch({
                type: DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export function restartDetail() {
    return (dispatch) => {
        dispatch({ type: RESET })
    }
}


