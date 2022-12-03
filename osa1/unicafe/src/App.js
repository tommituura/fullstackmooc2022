import { useState } from 'react'

const Statistics = ({good, neutral, bad, all, avg, positivePercentage}) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={avg} />
      <StatisticsLine text="positive" value={`${positivePercentage} %`} />
    </div>
  )
}

const StatisticsLine = ({text, value}) => <p>{text} {value}</p>

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

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
        <Button clickHandler={() => setGood(good + 1)} text="good"/>
        <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral"/>
        <Button clickHandler={() => setBad(bad + 1)} text="bad" />
      </p>
    </div>
    <h1>statistics</h1>
    <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      all={sumCount()}
      avg={avg()}
      positivePercentage={positivePercentage()}
    />
    </>

  )
}

export default App
