//import { Base } from 'https://cdn.deta.space/js/deta@horizon/deta.mjs'
var db = require('../db');
            
//const db = Base('phoneNumbersDB');
const submitBtn = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');

submitBtn.addEventListener('click', async () => {
    let phoneNumber = document.getElementById('number-input').value;
    const res = //await db.get(phoneNumber);
    await db.get('SELECT * FROM scammers WHERE phone_number = ?', [phoneNumber], () => {
        if(res) {
            resultDiv.innerHTML = `The person associated with this number is reported as a scammer and uses the name ${res.name}.<br />Aliases associated with scammer are: ${res.aliases.join(", ")}.<br /> Both use these Numbers (they exchange numbers after being caught): ${res.numbers.join(", ")}. <br/> Remember it could be a gand or one person with differet profile names and pictures. <br/> Additionally, the photos and profile names are fake as they are acquired from the internet. So, follow the number`;
        } else {
            resultDiv.innerHTML = 'This number has not been reported for scamming but you should practice caution by: <br/> conducting face to face deals, <br/> signing seller-buyer agreement in presence of a witness, <br> and avoiding sending money without acquiring the product first etc.';
        }
    });
});
    