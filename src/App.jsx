import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TheCatAPI } from "@thatapicompany/thecatapi";
const ACCESS_KEY = "live_rCEyS2KWICNxPHEqyNk7upZRv5J3Plc15ga8EB1hcIG7rwsvmaZ7PtNfNvkbLC0r";

function App() {
  const [catData, setCatData] = useState(null);
  const [bannedList, setBannedList] = useState([]);
  const ACCESS_KEY = 'YOUR_ACCESS_KEY'; // Replace with your actual API key

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${ACCESS_KEY}`);
      const jsonfile = await response.json();

      // Check if there are any images
      console.log(jsonfile);
      console.log(jsonfile[0].id);
      console.log(`https://api.thecatapi.com/v1/images/${jsonfile[0].id}`);

      while (true) {
        const random_index = Math.floor(Math.random() * jsonfile.length);
        const { reference_image_id, name, life_span, origin } = jsonfile[random_index];

        const attributes = [name, life_span, origin];

        // Check if any of the attributes are in the banned list
        if (attributes.some((attribute) => bannedList.includes(attribute))) {
          // If banned, we don't display this image
          continue;
        }

        // Set the fetched cat data and exit the loop
        setCatData({reference_image_id, name, life_span, origin});
        console.log(catData);
        break;
      }
    } catch (error) {
      console.error("Error fetching cat image:", error);
    }

  };

  const banAttribute = (attribute) => {
    if (!bannedList.includes(attribute)) {
      setBannedList([...bannedList, attribute]);
    }
  }

  const unbanAttribute = (attribute) => {
    setBannedList(bannedList.filter((a) => a !== attribute));
  }

  return (
    <>
      <div>
        <h1>Cat Stuff:</h1>
        <h2><i>Ecce, multi catti</i></h2>

        <button onClick={fetchData}>Fetch a cat!</button>

        {catData && (
          <div>
            <img src={`https://cdn2.thecatapi.com/images/${catData.reference_image_id}.jpg`} alt="A random cat" style={{ maxWidth: '500px', height: 'auto' }} />
            <div>
              <button onClick={() => banAttribute(catData.name)} className='ban'>Name: {catData.name}</button>
              <button onClick={() => banAttribute(catData.life_span)} className='ban'>Life Span: {catData.life_span}</button>
              <button onClick={() => banAttribute(catData.origin)} className='ban'>Origin: {catData.origin}</button>
            </div>
          </div>
        )}

        <div>
          <h2>Banned Attributes:</h2>
          {bannedList.map((item, index) => {
            return <button onClick={() => unbanAttribute(item)} key={index}>{item}</button>;
          })}
        </div>
      </div>
    </>
  );
}

export default App
