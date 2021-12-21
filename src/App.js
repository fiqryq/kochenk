import { useState, useEffect } from "react";
function App() {
  const base = "https://api.thecatapi.com/v1";

  const [breeds, setbreeds] = useState([]);
  const [cat, setCat] = useState([]);

  useEffect(async () => {
    try {
      const cat = await fetch(`${base}/breeds`);
      const response = await cat.json();
      setbreeds(response);
      console.log(`${base}/breeds`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = async (e) => {
    try {
      const breedsId = e.target.value;
      const breedsCat = await fetch(
        `${base}/images/search?breed_ids=${breedsId}`
      );
      const response = await breedsCat.json();
      setTimeout(() => {
        setCat(response);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:max-w-2xl mx-auto px-5">
      <select
        className="w-full h-10 my-3 px-3 bg-white  bg-opacity-30  backdrop-filter backdrop-saturate-150 backdrop-blur-lg rounded-md"
        onChange={handleChange}
      >
        {breeds.map((items) => {
          return (
            <option key={items.id} value={items.id}>
              {items.name}
            </option>
          );
        })}
      </select>
      <div>
        {cat.map((items) => {
          const breeds = items.breeds[0];
          return (
            <div key={items.id} className="relative">
              <img
                className="object-cover w-full h-128 rounded-lg"
                src={items.url}
                alt={breeds.name}
              />
              <div className="absolute bottom-0 rounded-b-lg text-white p-6 space-y-4 bg-white  bg-opacity-30  backdrop-filter backdrop-saturate-150 backdrop-blur-lg">
                <h1 className="text-5xl font-bold font-mono">{breeds.name}</h1>
                <p className="font-mono">breeds id : {breeds.id}</p>
                <p className="font-mono">{breeds.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
