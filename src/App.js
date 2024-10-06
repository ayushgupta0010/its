import './App.css';
import Car from './components/Car';
import Canvas from './components/Canvas';
import { getMatrix } from './matrix';

const matrix = getMatrix()

function App() {
  return (
    <div className="App">
      <Canvas matrix={matrix}/>
    </div>
  );
}

export default App;
