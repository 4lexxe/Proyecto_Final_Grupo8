import mario from '../assets/img/mario.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import sonidoMario from '../assets/sounds/mario.mp3'; 
import FormJuegos from '../components/FormJuegos.jsx';

function Games() {

    const navegacion = useNavigate();

    const ejecutarSonido = () => {
        const sonido = new Audio(sonidoMario);
        sonido.play();
    }

    const manejarClickImagen = () => {
        ejecutarSonido();
        navegacion('/');
    }

    return( 
    <>
    <h1><Link to="/">Home</Link></h1>
    <img src={mario} width="60%" onClick={ manejarClickImagen }/>

    <FormJuegos />
    </>
    )
}

export default Games;   