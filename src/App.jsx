import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './Componentes/Formulario.'
import Resultado from './Componentes/Resultado'
import Spinner from './Componentes/Spinner'
import img from './img/imagen-criptos.png'


const Contenedor = styled.div`
 max-width: 900px;
 margin: 0 auto;
 width: 90%;
 @media ( min-width: 992px ) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
 }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
 margin: 100px auto 0 auto;
 display: block;
`
const Heading = styled.h1`
font-family: 'Lato', sans-serif;
color: #fff;
text-align: center;
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
font-size: 34px;

&&::after {
  content: "";
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
  margin: 10px auto 0 auto;
}
`
function App() {0

const [monedas, setMonedas] = useState({});
const [resultado, setResultado] = useState({})
const [spinner, setSpinner] = useState(false)

useEffect( () => {
  if(Object.keys(monedas).length > 0) {
    setResultado({})
      const cotizarCripto = async () => {
        setSpinner(true)

        const { moneda, criptoMonedas } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMonedas}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setTimeout(() => {
          setResultado(resultado.DISPLAY[criptoMonedas][moneda])
          setSpinner(false)
        }, 700);
   
      }
      cotizarCripto();
     
    }
},[monedas] )


  return (
      <Contenedor >
          <Imagen 
          src={img}
          alt="img criptomonedas"
          />
        <div>
        <Heading>Cotiza Criptomonedas</Heading>
        <Formulario
        setMonedas={setMonedas}
        />
        {spinner && <Spinner />}
        { resultado.PRICE && <Resultado resultado={resultado} /> }
        </div>
   
      </Contenedor>

  )
}

export default App
