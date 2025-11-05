import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import Error from './pages/Error.jsx';
import Games from './pages/Games.jsx';
import AboutUs from './pages/AboutUs.jsx';
import { Container} from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import GameStar from './pages/GameStar.jsx';


function App() {
  return (
    <Container fluid="md">
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/games" element={<Games/>}/>
            <Route path="/gameStar" element={<GameStar/>}/>
            <Route path="/aboutUs" element={<AboutUs/>}/>
            <Route path="*" element={<Error/>}/>
          </Route>
        </Routes>
    </Container>
  );
}

export default App;