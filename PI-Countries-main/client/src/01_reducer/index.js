
import { FILTER_BY_0_HAB, FILTER_BY_POPULATION, FILTER_BY_ACTIVITIES, FILTERCOUNTRIES_BY_POP, FILTER_BY_CONTINENT,
GET_COUNTRIES, ORDER_BY_NAME, SEARCH_COUNTRIES, ASCENDENTE, POST_ACTIVITIES, GET_ACTIVITIES, ORDER_BY_POPULATION, 
HIGHER_POPULATION, DETAIL, RESET } from '../04_const/Const'

const initialState = { //El reducer tiene todo el estado de redux
        countries: [],
        allCountries: [],
        activities: [],
        detail: [],
    }

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {...state, countries: action.payload, allCountries: action.payload
            }

        case FILTER_BY_CONTINENT:
            const filtredCountriesByContinent = state.allCountries
            const continentFilteredBC = action.payload === 'All' ? filtredCountriesByContinent : 
            filtredCountriesByContinent.filter(el => el.continent === action.payload)
            return {...state, countries: continentFilteredBC }


        case FILTER_BY_POPULATION:
            const countries_ALL_0_1 = state.allCountries
            if (action.payload === 'ALL_0_1') {  //"ALL_0_1" es el value del "select" en "Cards.js"
            const FilteredBP = countries_ALL_0_1.filter(el => el.population < 1000000) 
            return {
                ...state,
                countries: FilteredBP
                      } }

            const countries_ALL_1_50 = state.allCountries
            if (action.payload === 'ALL_1_50') { //"ALL_1_50" es el value del "select" en "Cards.js" 
            const FilteredBP = countries_ALL_1_50.filter(el => el.population > 1000000 && el.population < 50000000)
            return {
                ...state,
                countries: FilteredBP
                      } } 
                      
                      
            const countries_ALL_50_100 = state.allCountries
            if (action.payload === 'ALL_50_100') {  
            const FilteredBP = countries_ALL_50_100.filter(el => el.population > 50000000 && el.population < 100000000)
            return {
                ...state,
                countries: FilteredBP
                      } }           
                      
            const countries_ALL_100_500 = state.allCountries
            if (action.payload === 'ALL_100_500') {  
            const FilteredBP = countries_ALL_100_500.filter(el => el.population > 100000000 && el.population < 500000000) 
            return {
                ...state,
                countries: FilteredBP
                      } }

            const countries_ALL_500_ = state.allCountries
            if (action.payload === 'ALL_500') {  
            const FilteredBP = countries_ALL_500_.filter(el => el.population > 500000000) 
            return {
                ...state,
                countries: FilteredBP
                    } }
                    break
    

        case FILTERCOUNTRIES_BY_POP:  //Countries 500 
            const countriesNumPop = state.allCountries
            const filter_Pop = countriesNumPop.filter((el) => el.population <= 500)
            return {...state, countries: filter_Pop } //actualizo el estado con los paises < de 500 hab.
                    

                    
        case FILTER_BY_0_HAB:
            const countriesNum_0 = state.allCountries
            const filter_Pop_0 = countriesNum_0.filter(el => el.population === 1 )
            if (filter_Pop_0.length===0) {
                alert(`No hay paises con 0 habitantes, presione "Recargar`)
            }
              return {
              ...state,
              countries: filter_Pop_0
            } 

        case FILTER_BY_ACTIVITIES:
            const filtredCountriesByActivities = state.allCountries

            const continentFilteredBA = filtredCountriesByActivities.filter(c =>
             { return c.activities.find((c) => { return c.name === action.payload; }); });

            if (action.payload === 'todos') {
                return { ...state, countries: filtredCountriesByActivities }
            } else {
                return {
                    ...state,
                    countries: continentFilteredBA
                }
            }

        case POST_ACTIVITIES:
            return {
                ...state
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }

        case DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case RESET:
            return {
                ...state,
                detail: []
            }

        case SEARCH_COUNTRIES:// Modifico el estado.....
            return {
                ...state,
                countries: action.payload
               
            }

        case ORDER_BY_NAME:  //Esto es un ternario
            let orderCountriesByName = action.payload === ASCENDENTE ?  //  si action.payload = ASCENDENTE entonces
                state.countries.sort((a, b) => {  // aqui aplico un sort y ordeno
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;

            }) : // sino

                state.countries.sort((a, b) => {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                })
                //console.log(orderCountriesByName)
            return {
                 ...state,
                countries: orderCountriesByName
            }

        case ORDER_BY_POPULATION:  //Esto es un ternario
            let orderCountriesByPopulation = action.payload === HIGHER_POPULATION ? state.countries.sort((a, b) => {
                if (a.population < b.population) {
                    return 1;
                }
                if (a.population > b.population) {
                    return -1;
                }
                return 0; 
            }) :
                state.countries.sort((a, b) => {

                    if (a.population < b.population) {
                        return -1;
                    }
                    if (a.population > b.population) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                countries: orderCountriesByPopulation
            }

        default:
            return state;
    }
}
