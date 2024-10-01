import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

function App() {
  const [QRString, setQRString] = useState("");
  const qrRef = useRef(null); // Inicializamos useRef con null

  const QRDownload = (e) => {
    e.preventDefault();
    if(validateInput(e)){
      alert("Revisar los datos ingresados para crear el QR");
      return;
    }

    const canvas = document.getElementById('qrCode');

    const pngURL = canvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.href   
 = pngURL;

    // Format the date and time
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0');   

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2,   
 '0');

    downloadLink.download = `QR_${year}-${month}-${day}_${hours}-${minutes}.png`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const qrcodeEncoder = (e) => {
    setQRString(e.target.value);
  };

  const qrCode = (
    <QRCodeCanvas
      id='qrCode'
      value={QRString}
      size={300}
      bgColor={"#fff"}
      level={"H"}
      ref={qrRef} // Asignamos la referencia al componente QRCodeCanvas
    />
  );

  const validateInput = (e) => {
    const valueInput = e.target.value !== "" && e.target.value !== undefined;
    return valueInput;
  };

  return (
    <div className='qrContainer'>
      <div>{qrCode}</div>
      <form className='inputGroup' onSubmit={QRDownload}>
        <label htmlFor="">Agregar datos a pasar al QR</label>
        <br />
        <input
          value={QRString}
          onChange={qrcodeEncoder}
          placeholder='Agregar direcciones, teléfonos u otro texto'
          size={"50"}
          name='qrString'
          className='inputText'
        />
        <br />
        <button
          type='submit'
          disabled={!QRString}
        >Descargar QR</button>
      </form>
    </div>
  );
}

export default App;