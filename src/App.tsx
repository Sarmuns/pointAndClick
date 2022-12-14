import { useState } from 'react'
import './App.css'

interface CircleProps {
  clientX: number
  clientY: number
}

const colors = ['red', 'yellow', 'blue', 'blueviolet'];
const controlColor = Math.floor(Math.random() * colors.length);
function App() {
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [removedCircles, setRemovedCircles] = useState<CircleProps[]>([]);


  const getCoordinates = (e: any) => {
    const { clientX, clientY } = e;
    setCircles([...circles, { clientX, clientY }])

  }

  const handleUndo = () => {
    const newCircle = [...circles];
    const controlCircle = newCircle.pop();
    if (!controlCircle) return
    setCircles(newCircle);
    setRemovedCircles([...removedCircles, controlCircle])

  }

  const handleRedo = () => {
    const removeCircle = [...removedCircles]
    const controlRedoCircle = removeCircle.pop()
    if (!controlRedoCircle) return
    setRemovedCircles(removeCircle)
    setCircles([...circles, controlRedoCircle])
  }


  return (
    <>

      <button
        disabled={circles.length === 0}
        onClick={handleUndo}
      >Undo</button>
      <button
        disabled={removedCircles.length === 0}
        onClick={handleRedo}
      >Redo</button>

      <div className="App" onClick={getCoordinates}>
        {circles.map((circle, index) => {

          return <div
            key={index}
            style={{
              left: circle.clientX - 5,
              top: circle.clientY - 5,
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: colors[controlColor],
              width: '15px',
              height: '15px'

            }}
          ></div>
        })}
      </div>
    </>
  )
}

export default App
