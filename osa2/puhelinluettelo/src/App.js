import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, changeHandler}) => {
  return (
    <div>
      filter shown with <input
        value={filter}
        onChange={changeHandler}
      />
    </div>
  )
}

const Persons = ({personlist, filter}) => {
  return (
    <>
    {personlist.filter((person) => {
      if (filter === '') return true
      return person.name.toLocaleLowerCase().indexOf(filter.toLowerCase()) > -1
    }).map((person) =>
      <Person key={person.id} name={person.name} number={person.number}/>
    )}
    </>
  )
}

const Person = ({ name, number }) => <p>{name} {number}</p>

const PersonForm = ({ nameValue, numberValue, nameChangeHandler, numberChangeHandler, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input
          value={nameValue}
          onChange={nameChangeHandler}
        />
      </div>
      <div>
        number: <input
          value={numberValue}
          onChange={numberChangeHandler}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // This function implicitly expects to get a list of objects that 
  // all have top-level "id" attribute 
  // which always holds positive number value.
  // Empty list is also fine. 
  const nextUniqueID = (datalist) => {
    const maxId = datalist.reduce(
      (curMaxID, curData) => curMaxID = curData.id > curMaxID ? curData.id : curMaxID
      , 0
    )
    return maxId + 1
  }

  const personExists = () => 
    persons.map((person) => person.name.toLowerCase()).indexOf(newName.toLowerCase()) > -1


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: nextUniqueID(persons),
      name: newName,
      number: newNumber
    }

    if (personExists()) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} changeHandler={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        submitHandler={addPerson}
      />

      <h3>Numbers</h3>

      <Persons personlist={persons} filter={filter}/>
    </div>
  )
}

export default App
