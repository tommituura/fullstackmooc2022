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

const Countries = ({ countries }) => {
  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>
  if (countries.length === 1)
    return (
      <Country key={countries[0].name.common} country={countries[0]} />
    )
  return (
    <>
    {countries.map((country) => <p key={country.name.common}>{country.name.common}</p>)}
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
  const [filter, setFilter] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = filter === '' ? []
    : countries.filter( country => country.name.common.toLowerCase().includes( filter.toLowerCase() ) )

  return (
    <>
      <Filter filter={filter} changeHandler={handleFilterChange} />
      <Countries countries={filteredCountries} />
    </>

  );
}

export default App;
