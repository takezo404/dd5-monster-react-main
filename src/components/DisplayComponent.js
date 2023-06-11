import React from 'react';

function DisplayComponent({ formData }) {
  const calculHp = (size) => {
    let hitPoints = 0;
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

  const calculatePerception = (value) => {
    return 10 + parseInt(value);
  }

  const calculateModifier = (value) => {
    const modifier = Math.floor((value - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : modifier;
  };

  const isAnyProficiencyChecked = formData.proficiencyStat.some((value) => value === 1);

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

  return (
    <div className="creature-stats mt-5">
      
      <div class="statblock">
        <h2>{formData.name}</h2>

        {formData.type !== '' && (
        <p>
          <i>{getSize(formData.size)} {formData.type} {formData.tag !== '' && (
            <span>({formData.tag})</span>
          )}, {formData.alignment}</i>
        </p>
      )}
        <hr class="divider"></hr>
        
        <ul className="list-unstyled">
            <li><strong>Armor Class</strong> 10</li>
            {!formData.showCustomHitDice && parseInt(formData.hitDice) > 0 && parseInt(formData.size) > 0 && (
                <li>
                    <strong>Hit Points</strong> {calculHp(formData.size)} ({formData.hitDice}d{formData.size} {(() => {
                    const modifier = calculateModifier(formData.constitution) * formData.hitDice;
                    return modifier >= 0 ? `+ ${modifier}` : modifier;
                    })()})
                </li>
            )}
            {formData.showCustomHitDice && (
            <li>
                <strong>Hit Points</strong> {formData.customHP}
            </li>
            )}
            <li><strong>Speed</strong> 30ft</li>
        </ul>

        <hr class="divider"></hr>

        <div class="d-flex justify-content-around flex-wrap">
            <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                <div class="statLabel">STR</div>
                <div>{formData.strength} ({calculateModifier(formData.strength)})</div>
            </div>
            <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                <div class="statLabel">DEX</div>
                <div>{formData.dexterity} ({calculateModifier(formData.dexterity)})</div>
            </div>
            <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                <div class="statLabel">CON</div>
                <div>{formData.constitution} ({calculateModifier(formData.constitution)})</div>
            </div>
            <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                <div class="statLabel">INT</div>
                <div>{formData.intelligence} ({calculateModifier(formData.intelligence)})</div>
            </div>
            <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                <div class="statLabel">WIS</div>
                <div>{formData.wisdom} ({calculateModifier(formData.wisdom)})</div>
            </div>
            <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                <div class="statLabel">CHA</div>
                <div>{formData.charisma} ({calculateModifier(formData.charisma)})</div>
            </div>
        </div>

        <hr class="divider"></hr>

        <ul className="list-unstyled">
            {isAnyProficiencyChecked && (
                <li>
                <strong>Proficiency</strong>
                </li>
            )}
            <li><strong>Senses</strong> passive Perception { calculatePerception(calculateModifier(formData.wisdom)) }</li>
            <li><strong>Languages</strong> -</li>
            <li><strong>Challenge</strong> 1 (200XP)</li>
        </ul>


      </div>
    
    </div>
  );
}

export default DisplayComponent;