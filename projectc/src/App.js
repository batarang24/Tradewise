
import './App.css';

import Home from './components/Homes';
//import Insert from './components/Insert';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound';
import Coursecard from './components/Coursecard';
import CourseView from './components/CourseView';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
      <Route path="/view-course/:id" element={<CourseView/>}></Route>
      </Routes>
    </BrowserRouter>

  
  );
}

export default App;
