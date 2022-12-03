import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sumCount = () => good + neutral + bad
  const avg = () => (good + (bad * -1)) / sumCount()
  const positivePercentage = () => (good / sumCount()) * 100

  return (
    <>
    <div>
      <h1>give feedback</h1>
      <p>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </p>
    </div>
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sumCount()}</p>
      <p>average {avg()}</p>
      <p>positive {positivePercentage()} %</p>
    </div>
    </>

  )
}

export default App
