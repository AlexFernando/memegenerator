import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Modal from "./components/Modal";
import useModal from './components/useModal';

function App() {

  const [arrayMemes, saveMemes] = useState([]);
  const {isShowing, toggle} = useModal();
  const [imageInfo, setImageInfo] = useState("")
  const [elem, saveElem] = useState({});

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


  function getBase64Image(img) {
    console.log("img en getbase64Image: ", img, " ", img.width, " ", img.height)
    let canvas = document.createElement("canvas"); // crea un canvas
    canvas.width = img.width; 
    canvas.height = img.height;
    console.log("canvas: ", canvas," ", canvas.width, " ", canvas.height)
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0); // dibujo la imagen en el canvas
    let dataURL = canvas.toDataURL("");//convierto a URI data
    console.log("dataUrl", dataURL);
    return dataURL;
  }

  function openImage(elem) {
    //const image = arrayMemes[elem];//le paso el index desde onClick y busco el objeto con la img en el array
    
    saveElem(elem);

    console.log("el elemento:", elem)

    const base_image = new Image(); //creo un objeto Img ver documentacion
    base_image.setAttribute('crossOrigin', 'anonymous');
    base_image.src = elem.url;//le paso la imagen 
    console.log(elem.url)
    console.log(base_image.src, " ", base_image," ", base_image.width, " ", base_image.height);
    const base64 = getBase64Image(base_image);//le paso una image y me la regresa como data.
    console.log("el base 64", base64)
    setImageInfo(base64)
  }

  const base_image = new Image();
  base_image.setAttribute('crossOrigin', 'anonymous');
  base_image.src = elem.url;
  let wrh = base_image.width / base_image.height;
  let newWidth = 600;
  let newHeight = newWidth / wrh;

  console.log("base_image: ", base_image,"base_image.src: ",base_image.src , "width: ", base_image.width, "height: ", base_image.height, "wrh: ", wrh, "newHeight: ", newHeight);

  if(arrayMemes === "") return

 

  return (
 
    <div className="contenedor">

        <div className="blog">
            {arrayMemes.map( elem => ( 
                <div className="entrada">
                  <img crossOrigin="anonymous"
                    width="200"
                    height="180"
                    key = {elem.id}         
                    src = {elem.url}
                    alt = {elem.name}
                    onClick={() => {toggle(); openImage(elem) ;}}
                  />
                </div>    
            ))}  
        </div>

          <Modal
            isShowing={isShowing}
            hide={toggle}
            elem = {imageInfo}
            newWidth = {newWidth}
            newHeight = {newHeight}
          />
    </div>
  );
}

export default App;
