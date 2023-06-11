import React, { useState } from 'react';
import CreatureList from './components/CreatureList';
import FormComponent from './components/FormComponent';
import DisplayComponent from './components/DisplayComponent';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [creature, setCreature] = useState({
    name: 'Gollum',
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    size: 0,
    hp: 0,
    hitDice: 0,
    type: '',
    tag: '',
    alignment: 'any alignment',
    customHP: '2 (1d4 + 0)',
    showCustomHitDice: false,
    proficiency: 0,
    proficiencyStat: [0, 0, 0, 0, 0, 0],
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCreature(prevCreature => ({
      ...prevCreature,
      [name]: value
    }));
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-7'>
          <FormComponent formData={creature} onChange={handleFormChange} setCreature={setCreature}  />
        </div>
        <div className='col-md-5'>
          <DisplayComponent formData={creature} />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <CreatureList />
        </div>
      </div>
    </div>
  );
}

export default App;