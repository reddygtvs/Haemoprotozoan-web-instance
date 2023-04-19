import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  //const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    //setImage(e.target.files[0]);
  };

  const handlePredict = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    axios
      .post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setPrediction(res.data.prediction);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="App">
      <h1> Haemoprotozoan Disease Prediction</h1>
      <h3> Upload your image here </h3>

      <input
        type="file"
        accept="image/*"
        name="image"
        onChange={handleFileChange}
      />
      <button onClick={handlePredict}>Predict</button>
      {prediction && (
        <div>
          <h2>Prediction Result:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default App;
