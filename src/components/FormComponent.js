import React from 'react';

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
        break;
    }
  };

function FormComponent({ formData, onChange, setCreature }) {
  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
  
    if (type === 'checkbox') {
      // If the checkbox is part of the proficiency, update the corresponding value in `creature.proficiencyStat`
      const index = parseInt(name.slice(-1)) - 1;
      if (!isNaN(index)) {
        setCreature((prevCreature) => {
          const newProficiencyStat = [...prevCreature.proficiencyStat];
          newProficiencyStat[index] = checked ? 1 : 0;
          return {
            ...prevCreature,
            proficiencyStat: newProficiencyStat,
          };
        });
      } else {
        // Otherwise, update the other properties as usual
        setCreature((prevCreature) => ({
          ...prevCreature,
          [name]: checked ? value : '',
        }));
      }
    } else {
      setCreature((prevCreature) => ({
        ...prevCreature,
        [name]: value,
      }));
    }
  };

  return (
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
              <option value=''>Select a size</option>
              <option value='4'>Tiny</option>
              <option value='6'>Small</option>
              <option value='8'>Medium</option>
              <option value='10'>Large</option>
              <option value='12'>Huge</option>
              <option value='20'>Gargantuan</option>
            </select>
            <label htmlFor="floatingSelect">Selected size: {getSize(formData.size)}</label>
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
              <option value="">Select a type</option>
              <option value='Abberation'>Abberation</option>
              <option value='Beast'>Beast</option>
              <option value='Celestial'>Celestial</option>
              <option value='Construct'>Construct</option>
              <option value='Dragon'>Dragon</option>
            </select>
            <label htmlFor="floatingSelect3">Selected type: {getSize(formData.type)}</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control col"
              id="floatingInputAlignment"
              placeholder="alignment"
              value={formData.alignment}
              onChange={handleChange}
              name="alignment"
            />
            <label htmlFor="floatingInputAlignment">Alignment</label>
          </div>
        </div>
      </div>

      <div class='bg-light my-3 p-3'>
        <h3 class="">Modify infos</h3>

        <div class="col-md-12 d-flex justify-content-around">
          {!formData.showCustomHitDice && (    
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

          {formData.showCustomHitDice && (
            <div className="form-floating">
              <input
                type="text"
                className="form-control col"
                id="floatingInputcustomHp"
                placeholder="customHP"
                value={formData.customHP}
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
              checked={formData.showCustomHitDice}
              onChange={handleChange}
              name="showCustomHitDice"
            />
            <label className="form-check-label" htmlFor="showCustomHitDiceCheckbox">Custom</label>
          </div>
        </div>
      </div>

      <div class='bg-light my-3 p-3'>
        <h3 class="mt-3">Modify characteristics</h3>

      <div class='d-flex justify-content-around'>
        <div class='d-flex flex-column justify-content-center align-items-center'>
          <div class="form-floating">
                <input
                  type="number"
                  class="form-control col"
                  id="floatingInputStr"
                  placeholder="name@example.com"
                  value={isNaN(parseInt(formData.hitDice)) ? '' : parseInt(formData.strength)}
                  onChange={handleChange}
                  name="strength"
                />
                <label htmlFor="floatingInputStr">Strenght</label>
          </div>
          <div>      
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="expertiseStrengthCheckbox"
                checked={formData.expertiseStrength}
                onChange={handleChange}
                name="expertiseStrength"
              />
              <label className="form-check-label small" htmlFor="expertiseStrengthCheckbox">
                Proficiency
              </label>
            </div>
          </div>
        </div>
            <div class="form-floating">
              <input
                type="number"
                class="form-control col"
                id="floatingInputDex"
                placeholder="name@example.com"
                value={isNaN(parseInt(formData.hitDice)) ? '' : parseInt(formData.dexterity)}
                onChange={handleChange}
                name="dexterity"
              />
              <label htmlFor="floatingInputDex">Dexterity</label>
            </div>

            <div class="form-floating">
              <input
                type="number"
                class="form-control col"
                id="floatingInputCon"
                placeholder="name@example.com"
                value={isNaN(parseInt(formData.hitDice)) ? '' : parseInt(formData.constitution)}
                onChange={handleChange}
                name="constitution"
              />
              <label htmlFor="floatingInputCon">Constitution</label>
            </div>

            <div class="form-floating">
              <input
                type="number"
                class="form-control col"
                id="floatingInputInt"
                placeholder="name@example.com"
                value={isNaN(parseInt(formData.hitDice)) ? '' : parseInt(formData.intelligence)}
                onChange={handleChange}
                name="intelligence"
              />
              <label htmlFor="floatingInputInt">Intelligence</label>
            </div>

            <div class="form-floating">
              <input
                type="number"
                class="form-control col"
                id="floatingInputWis"
                placeholder="name@example.com"
                value={isNaN(parseInt(formData.hitDice)) ? '' : parseInt(formData.wisdom)}
                onChange={handleChange}
                name="wisdom"
              />
              <label htmlFor="floatingInputWis">Wisdom</label>
            </div>

            <div class="form-floating">
              <input
                type="number"
                class="form-control col"
                id="floatingInputCha"
                placeholder="name@example.com"
                value={isNaN(parseInt(formData.hitDice)) ? '' : parseInt(formData.charisma)}
                onChange={handleChange}
                name="charisma"
              />
              <label htmlFor="floatingInputCha">Charisma</label>
            </div>

    </div>
    </div>
    </form>
  );
}

export default FormComponent;