import { useState } from 'react'
import './App.css'

interface CircleProps {
  clientX: number
  clientY: number
  controlColor: number
}

function App() {
  const colors = ['red', 'yellow', 'blue', 'blueviolet', 'AliceBlue', 'Aqua', 'BlanchedAlmond', 'Chartreuse', 'Crimson', 'GoldenRod', 'Gold', 'HotPink', 'Indigo', 'Ivory', 'Lime', 'LimeGreen'];
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [removedCircles, setRemovedCircles] = useState<CircleProps[]>([]);


  const getCoordinates = (e: any) => {
    const { clientX, clientY } = e;
    const controlColor = Math.floor(Math.random() * colors.length);
    setCircles([...circles, { clientX, clientY, controlColor }])
    setRemovedCircles([]);

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
      <div className='buttonDiv'>
        <button
          disabled={circles.length === 0}
          onClick={handleUndo}
        >
          Undo</button>
        <button
          disabled={removedCircles.length === 0}
          onClick={handleRedo}
        >
          Redo</button>
      </div>
      <div className="App" onClick={getCoordinates}>

        {circles.map((circle, index) => {

          return <div
            key={index}
            style={{
              left: circle.clientX - 8,
              top: circle.clientY - 7,
              borderRadius: '50%',
              backgroundColor: colors[circle.controlColor],
              position: 'absolute',
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
