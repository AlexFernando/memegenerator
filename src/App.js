import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Col, Row, Button, Modal} from 'react-bootstrap';
import './App.css';

function App()  {
  
  //principal state
  //

  const [arrayMemes, saveMemes] = useState([]);
  const [topText, saveTopText] = useState('');
  const [bottomText, saveBottomText] = useState('');


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("handleshow" , setShow);

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
      <Container>
          <Row>    
            
            {arrayMemes.map( index => ( 
              <div className="entrada">
                <img onClick={handleShow}
                  key = {index.id}         
                  src = {index.url}
                  alt = {index.name}
                />
              </div>
              
            ))}    
          </Row>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Hola</Modal.Title>
              </Modal.Header>
              <Modal.Body>sjfioasjfiojasfiojsafiojas</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Download
                </Button>
              </Modal.Footer>
            </Modal>      
            
      </Container>    
    );
}



export default App;
