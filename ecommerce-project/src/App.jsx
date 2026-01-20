import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} /> {/* path="/" can be simplified to index and since there is nother between the <Route></Route>, then it be simplified into a self closing tag <Route />*/}
      <Route path="checkout" element={<div> test checkout </div>} />
    </Routes>
  )
}

export default App
