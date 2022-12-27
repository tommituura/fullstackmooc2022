import './App.css'

const Header = ({ coursename }) => <h1>{coursename}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Course = ({ course }) => {
  return(
    <div className='course'>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, currentPart) => accumulator + currentPart.exercises,
    0
  )
  return (
    <p className="total">total of {total} exercises</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <>
      <Course key={course.id} course={course} />
    </>
  )
}

export default App;
