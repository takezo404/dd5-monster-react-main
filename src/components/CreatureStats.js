import React, { useState } from 'react';


function CreatureStats({ creature, onCreatureUpdate }) {
  const [formData, setFormData] = useState(creature);

  const [showCustomHitDice, setShowCustomHitDice] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === 'checkbox') {
      setShowCustomHitDice(checked);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    onCreatureUpdate(formData);
  };

  const calculHp = (size) => {
    let hitPoints = 0; // Declaration of the hitPoints variable
    switch (size) {
      case "4":
        hitPoints = Math.floor((2.5 * parseInt(formData.hitDice)) + (calculateModifier(formData.constitution) * parseInt(formData.hitDice)));
        break;
      case "6":
        hitPoints = Math.floor((3.5 * parseInt(formData.hitDice)) + (calculateModifier(formData.constitution) * parseInt(formData.hitDice)));
        break;
      case "8":
        hitPoints = Math.floor((4.5 * parseInt(formData.hitDice)) + (calculateModifier(formData.constitution) * parseInt(formData.hitDice)));
        break;
      case "10":
        hitPoints = Math.floor((5.5 * parseInt(formData.hitDice)) + (calculateModifier(formData.constitution) * parseInt(formData.hitDice)));
        break;
      case "12":
        hitPoints = Math.floor((6.5 * parseInt(formData.hitDice)) + (calculateModifier(formData.constitution) * parseInt(formData.hitDice)));
        break;
      case "20":
        hitPoints = Math.floor((10.5 * parseInt(formData.hitDice)) + (calculateModifier(formData.constitution) * parseInt(formData.hitDice)));
        break;
      default:
        break;
    }
    return hitPoints;
  };

  const calculateModifier = (value) => {
    const modifier = Math.floor((value - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : modifier;
  };

  const getSize = (size) => {
    switch (size) {
      case '4':
        return 'Tiny';
      case '6':
        return 'Small';
      case '8':
        return 'Medium';
      case '10':
        return 'Large';
      case '12':
        return 'Huge';
      case '20':
        return 'Gargantuan';
      default:
        return '';
    }
  };

  return (
    <div className="creature-stats mt-5">
      <h2>Statistiques de la créature</h2>
      <h3 class='border-bottom'>{formData.name}</h3>
        {formData.type !== '' && (
        <p>
            <i>{getSize(formData.size)} {formData.type} {formData.tag !== '' && (
        <span>
            ({formData.tag})
        </span>
        )}, {formData.alignment}</i>
        </p>
        )}

                <ul className="list-unstyled">
                    <li><strong>Armor Class</strong> 10</li>
                    {!showCustomHitDice && (parseInt(formData.hitDice) > 0 && parseInt(formData.size) > 0) && (
                        <li>
                        <strong>Hit Points</strong> {calculHp(formData.size)} ({formData.hitDice}d{formData.size} {(() => {
                            const modifier = calculateModifier(formData.constitution) * formData.hitDice;
                            return modifier >= 0 ? `+ ${modifier}` : modifier;
                            })()}) 
                        </li>
                    )}
                    {showCustomHitDice && (
                        <li>
                        <strong>Hit Points</strong> {formData.customHP}
                        </li>
                    )}
                    <li><strong>Speed</strong> 30ft</li>
                </ul>
                
        <div class="d-flex justify-content-around">
                <div class="d-flex flex-column align-items-center justify-content-center"><div><strong>STR</strong></div><div>{formData.strength} ({calculateModifier(formData.strength)})</div></div>
                <div class="d-flex flex-column align-items-center justify-content-center"><div><strong>DEX</strong></div><div>{formData.dexterity} ({calculateModifier(formData.dexterity)})</div></div>
                <div class="d-flex flex-column align-items-center justify-content-center"><div><strong>CON</strong></div><div>{formData.constitution} ({calculateModifier(formData.constitution)})</div></div>
                <div class="d-flex flex-column align-items-center justify-content-center"><div><strong>INT</strong></div><div>{formData.intelligence} ({calculateModifier(formData.intelligence)})</div></div>
                <div class="d-flex flex-column align-items-center justify-content-center"><div><strong>WIS</strong></div><div>{formData.wisdom} ({calculateModifier(formData.wisdom)})</div></div>
                <div class="d-flex flex-column align-items-center justify-content-center"><div><strong>CHA</strong></div><div>{formData.charisma} ({calculateModifier(formData.charisma)})</div></div>
        </div>

      
      
        <form>

        <div class='bg-light my-3 p-3'>
            <h3 class="">Modify infos</h3>

            <div class="col-md-12 d-flex justify-content-around">
                
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control col"
                        id="floatingInputValue"
                        placeholder="name@example.com"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                    />
                    <label htmlFor="floatingInputValue">Name</label>
                </div>

                <div className="form-floating">
                    <select
                        className="form-select col"
                        id="floatingSelect"
                        value={formData.size}
                        onChange={handleChange}
                        name="size"
                    >
                        <option value=''>Select an size</option>
                        <option value='4'>Tiny</option>
                        <option value='6'>Small</option>
                        <option value='8'>Medium</option>
                        <option value='10'>Large</option>
                        <option value='12'>Huge</option>
                        <option value='20'>Gargantuan</option>
                    </select>
                    <label htmlFor="floatingSelect">Selected size : {getSize(formData.size)}</label>
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control col"
                        id="floatingInputTag"
                        placeholder="tag"
                        value={formData.tag}
                        onChange={handleChange}
                        name="tag"
                    />
                    <label htmlFor="floatingInputTag">Tag</label>
                </div>

                <div className="form-floating">
                    <select
                        className="form-select col"
                        id="floatingSelect3"
                        value={formData.type}
                        onChange={handleChange}
                        name="type"
                    >
                        <option value="">Select an type</option>
                        <option value='Abberation'>Abberation</option>
                        <option value='Beast'>Beast</option>
                        <option value='Celestial'>Celestial</option>
                        <option value='Construct'>Construct</option>
                        <option value='Dragon'>Dragon</option>
                    </select>
                    <label htmlFor="floatingSelect3">Selected type : {getSize(formData.type)}</label>
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control col"
                        id="floatingInputAlignment"
                        placeholder="alignment"
                        value={formData.alignment}
                        onChange={handleChange}
                        name="tag"
                    />
                    <label htmlFor="floatingInputAlignment">Tag</label>
                </div>

            </div>
        </div>

        <div class='bg-light my-3 p-3'>
            <h3 class="">Modify caracteristics</h3>

            <div class="col-md-12 d-flex justify-content-around">
                
            {!showCustomHitDice && (    
                <div className="form-floating">
                    <input
                        type="number"
                        min="0"
                        className="form-control col"
                        id="floatingInputhitDice"
                        placeholder="name@example.com"
                        value={isNaN(parseInt(formData.hitDice)) ? '' : parseInt(formData.hitDice)}
                        onChange={handleChange}
                        name="hitDice"
                    />
                    <label htmlFor="floatingInputhitDice">Hit dices</label>
                </div>
            )}

                {showCustomHitDice && (
                            <div className="form-floating">
                                    <input
                                    type="text"
                                    className="form-control col"
                                    id="floatingInputcustomHp"
                                    placeholder="customHP"
                                    value={formData.customHp}
                                    onChange={handleChange}
                                    name="customHP"
                                />
                                <label htmlFor="floatingInputcustomHp">Custom HP</label>
                            </div>
                    )}

                <div className="form-floating">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="showCustomHitDiceCheckbox"
                        checked={showCustomHitDice}
                        onChange={handleChange}
                        name="showCustomHitDice"
                    />
                    <label className="form-check-label" htmlFor="showCustomHitDiceCheckbox">Custom</label>
                </div>

            </div>

        </div>

      <h3 class="mt-5">Modify the caracteristics</h3>

  <label>Points de vie:</label>
  <input type="number" name="hp" value={formData.hp} onChange={handleChange} />

  <label>Force:</label>
  <input type="number" name="strength" value={formData.strength} onChange={handleChange} />

  <label>Dextérité:</label>
  <input type="number" name="dexterity" value={formData.dexterity} onChange={handleChange} />

  <label>Constitution:</label>
  <input type="number" name="constitution" value={formData.constitution} onChange={handleChange} />

  <label>Intelligence:</label>
  <input type="number" name="intelligence" value={formData.intelligence} onChange={handleChange} />

  <label>Sagesse:</label>
  <input type="number" name="wisdom" value={formData.wisdom} onChange={handleChange} />

  <label>Charisme:</label>
  <input type="number" name="charisma" value={formData.charisma} onChange={handleChange} />
</form>
    </div>
  );
}

export default CreatureStats;