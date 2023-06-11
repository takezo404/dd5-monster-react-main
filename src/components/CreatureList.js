import axios from "axios";
import { useEffect, useState } from "react";

export default function ListMonster() {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    getMonsters();
  }, []);

  function getMonsters() {
    axios.get('https://asgaia.fr/api/index.php')
      .then(function (response) {
        setMonsters(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div>
      <h3>Monster List</h3>
      {monsters.length > 0 ? (
        monsters.map((monster, key) => (
          <p key={key}>{monster.name}</p>
        ))
      ) : (
        <p>Loading monsters...</p>
      )}
    </div>
  );
}