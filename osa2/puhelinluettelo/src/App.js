import { useState } from 'react'

const Person = ({ name, number }) => <p>{name} {number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456'},
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    persons.map((person) => person.name).indexOf(newName) > -1


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
      <div>
        filter shown with <input 
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter((person) => {
        if (filter === '') return true
        return person.name.toLocaleLowerCase().indexOf(filter.toLowerCase()) > -1
      }).map((person) => 
        <Person key={person.id} name={person.name} number={person.number}/>
      )}
    </div>
  )

}

export default App
