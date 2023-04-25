import "./App.css";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPrediction(null);

    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handlePredict = () => {
    const formData = new FormData();
    setPrediction("...Fetching");
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
      <header>
        <h1> Haemoprotozoan Disease Prediction</h1>
      </header>
      <main>
        <h2> Upload the cattle bloodsmear image </h2>

        {image && (
          <img alt="preview image" width={300} height={300} src={image} />
        )}

        <input
          title=""
          id="getFile"
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
        />
        <div>
          <button onClick={handlePredict}>Predict</button>
        </div>
        {prediction && (
          <div>
            <h1>Prediction Result:</h1>
            <h3>{prediction}</h3>
          </div>
        )}
      </main>
      <footer>
        <p style={{ fontSize: "2vh" }}>Batch 2 | Final Year Project</p>
      </footer>
    </div>
  );
};

export default App;
