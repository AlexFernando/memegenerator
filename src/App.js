import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Modal from "./components/Modal";
import useModal from './components/useModal';

function App() {

  const [arrayMemes, saveMemes] = useState([]);
  const {isShowing, toggle} = useModal();
  const [elem, getElem] = useState();

  useEffect( () => {
    
    axios.get('https://api.imgflip.com/get_memes')
    .then(response => {
      saveMemes(response.data.data.memes);
      console.log(response.data.data.memes);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  
  if(arrayMemes === "") return

  return (
 
    <div className="contenedor">

        <div className="blog">
            {arrayMemes.map( elem => ( 
                <div className="entrada">
                  <img 
                    key = {elem.id}         
                    src = {elem.url}
                    alt = {elem.name}
                    onClick={() => {toggle(); getElem(elem);}}
                  />
                </div>    
            ))}  
        </div>

          <button className="button-default" onClick={toggle}>Show Modal</button>
          <Modal
            isShowing={isShowing}
            hide={toggle}
            elem = {elem}
          />
    </div>
  );
}

export default App;
