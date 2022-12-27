const Header = ({ coursename }) => <h2>{coursename}</h2>

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

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, currentPart) => accumulator + currentPart.exercises,
    0
  )
  return (
    <p className="total">total of {total} exercises</p>
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

export default Course
