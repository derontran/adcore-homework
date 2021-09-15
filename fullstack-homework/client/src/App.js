import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom'
import MainRouter from './mainRouter';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainRouter/>
    </BrowserRouter>
  );
}

export default App;
