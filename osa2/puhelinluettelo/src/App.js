import { useState } from 'react'

const Person = ({ name }) => <p>{name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

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

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: nextUniqueID(persons)
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => 
        <Person key={person.id} name={person.name} />
      )}
    </div>
  )

}

export default App
