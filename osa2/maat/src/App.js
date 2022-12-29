import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, changeHandler}) => {
  return (
    <p>
      find countries <input
        value={filter}
        onChange={changeHandler}
      />
    </p>
  )
}

const Countries = ({ countries, countrySelectorHandler }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  if (countries.length === 1)
    return (
      <Country key={countries[0].ccn3} country={countries[0]} />
    )
  return (
    <>
    {countries.map((country) => 
      <div key={country.ccn3}>{country.name.common}
      <form onSubmit={countrySelectorHandler}>
        <input type="hidden" value={country.ccn3} />
        <input type="submit" value="show"/>
      </form>
      </div>
    )}
    </>
  )
}

const Country = ({ country }) => {
  return (
    <>
    <h2>{country.name.common}</h2>
    <div>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
    </div>
    <div>
      <p>languages:</p>
      <ul>
        {Object.values(country.languages).map((language) =>
          <li key={language}>{language}</li>
        )}
      </ul>
    </div>
    <div>
      <img src={country.flags.png} height="100" width="auto" />
    </div>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [inputs, setInputs] = useState({'filter': '', 'ccn3Selection': ''})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setInputs({'filter': event.target.value, 'ccn3Selection': ''})
  }

  const handleCountrySelectCLick = (event) => {
    event.preventDefault()
    setInputs({'filter':inputs.filter, 'ccn3Selection': event.target.querySelector("input[type=hidden]").value})
  }

  const filterCountries = () => {
    // will prefer exact selector over filter.
    if (inputs.ccn3Selection !== '')
      return countries.filter( country => country.ccn3 === inputs.ccn3Selection )
    if (inputs.filter !== '')
      return countries.filter( country => country.name.common.toLowerCase().includes( inputs.filter.toLowerCase() ) )
    // if no filter or selection, return empty list
    return []
  }

  const filteredCountries = filterCountries()

  return (
    <>
      <Filter filter={inputs.filter} changeHandler={handleFilterChange} />
      <Countries countries={filteredCountries} countrySelectorHandler={handleCountrySelectCLick} />
    </>

  );
}

export default App;
