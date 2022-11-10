import {useState, useEffect } from 'react';
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas} from '../data/monedas';
import Error from './Error';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }

`

const Formulario = ({setMonedas}) => {

    const [cripto, setCripto] = useState([])

  const [ moneda, SelectMoneda ] = useSelectMonedas('Selecciona tu Moneda', monedas)
  const [ criptoMonedas, SelectcriptoMoneda ] = useSelectMonedas('Selecciona tu CriptoMoneda', cripto)
  const [ error, setError ] = useState(false)

  useEffect( () => {
      const consultarAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const arrayCriptos = resultado.Data.map( cripto => {
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
            return objeto

        } )

        setCripto(arrayCriptos)
      }
      consultarAPI()
  }, [] )

  const HandleSubmit = e => {
    e.preventDefault();

    if( [moneda, criptoMonedas].includes('') ) {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 3000);
        return;
    }

    setMonedas( {
        moneda,
        criptoMonedas,
    } )

  }

    return ( 
        <>
      { error && <Error>Todos Los Campos Son Obligatorios</Error> }
        <form
        onSubmit={HandleSubmit}
        >
               
            <SelectMoneda />
            <SelectcriptoMoneda />
        <InputSubmit 
        type='submit'
        value='Cotizar'
        />

        </form>
        </>
     );
}
 
export default Formulario;