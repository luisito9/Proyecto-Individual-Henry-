import { useState} from 'react' //importo react
import { useDispatch } from 'react-redux';//importo useDispatch 
import { searchCountries } from '../../02_actions/index'; //para despacho una accion
import './SearchBar.css'

export default function SearchBar() { //hay un formulario pues "search"value={search} esta anclado al estado
    const [search, setSearch] = useState('') //Estado
    const dispatch = useDispatch()
    
    function onSubmit(e){ //Valida que el boton no este vacio
        e.preventDefault(); //evita las acciones predeterminadas realizadas por el navegador
        if (search.length === 0) return alert('Debe colocar un Pais');
          dispatch(searchCountries(search)) //despacha una accion
          //setSearch('')
    }

    function onInputChange(search){
        search.preventDefault();//evita las acciones predeterminadas realizadas por el navegador
        setSearch(search.target.value)// Se marca letra por letra en cada evento, pues esta anclado al estado
        console.log(search.target.value)
    }
    return (
    <div className='formSearchBar'>

      <form onSubmit={onSubmit}>
         <input className='inputCountry' type="text" placeholder='Nombre pais..' onChange = {onInputChange} value={search} />
         <input className='inputButton' type="submit" value="" /* botoncito tipo lupa*//>
      </form>
        
    </div>
    )
}
