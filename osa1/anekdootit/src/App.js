import { useState } from 'react'

const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>

const Anecdote = ({anecdotes, points, index}) => {
  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>has {points[index]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const nextRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const giveVote = (currentAnecdote) => {
    const copy = [ ...points ]
    copy[currentAnecdote] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} points={points} index={selected} />
      <Button clickHandler={() => giveVote(selected)} text="vote" />
      <Button clickHandler={nextRandomAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote  anecdotes={anecdotes} points={points}
        index={points.indexOf(Math.max(...points))}
      />
    </div>
  )
}

export default App
