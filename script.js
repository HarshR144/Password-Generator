const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-paswordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const sybmols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'

let password = "";
let passwordLength = 10;
let checkCount = 1;
// 1st set inital password length when page load
handleSlider();
//set strength circle initially -> grey


// functions

// to reflect change in password length value on UI
function handleSlider() {    

    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    
    
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "color";
}
function getRandomInteger(min, max){
    return (Math.floor(Math.random()*(max-min)) + min);
}

function generateRandomNumber(){
    return getRandomInteger(0,10);
}
function generateLowerCase(){
    return String.fromCharCode( getRandomInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function generateSymbol(){
    let idx = getRandomInteger(0,sybmols.length) 
    return sybmols[idx];
}

// Clac strength
function calcStrength(){
    let hasUpperCase =false;
    let hasLowerCase =false;
    let hasNumber =false;
    let hasSybmols =false;
    if(uppercaseCheck.checked) hasUpperCase = true;
    if(lowercaseCheck.checked) hasLowerCase = true;
    if(symbolsCheck.checked) hasSybmols = true;
    if(numbersCheck.checked) hasNumber = true;
    
    if(hasUpperCase && hasLowerCase && (hasNumber|| hasSybmols) && passwordLength >=10){
        setIndicator('#0f0');
    }
    else if((hasUpperCase || hasLowerCase) && (hasNumber || hasSybmols) && passwordLength >=8  ){
        setIndicator('#ff0');

    }
    else{
        setIndicator('#f00');
    }
}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }catch(e){
         copyMsg.innerText = "Failed";
    }
// make copy message visible
    copyMsg.classList.add("active");
// make the msg invisible after a certain amt of time

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    }, 2000);

} 

function shufflePassword(arr){
    // Fisher Yates method
    for(let i = arr.length -1 ; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr.join("");
}


// event Listner for slider
inputSlider.addEventListener('input', (event)=>{
    passwordLength = event.target.value;
    handleSlider();
})


// event listner for copy btn
copyBtn.addEventListener('click', () =>{
    if(passwordDisplay.value){
        copyContent();
    } 
})


// function handleCheckboxChange(){
//     checkCount = 0;
//     allcheckBox.forEach((checkbox)=>{
//         if(checkbox.checked){
//             checkCount++;
//         }
//     })

// }
// allcheckBox.forEach((checkbox)=>{
//     checkbox.addEventListener('change',handleCheckboxChange);
// });
  


allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',(event)=>{
        if(event.target.checked){
            checkCount++;
        }
        else{
            checkCount--;
        }
    })
})



generateBtn.addEventListener('click',()=>{
    // if none of the checkboxes are ticked then no genrate operation 
    if(checkCount <= 0 ){
        return;
    }
    // if password length < checkcount
    
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // new password creating section
    // 1st remove old password
    password = "";
    // 2nd create new password

    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    for(let i =0; i < funcArr.length;i++){
        password += funcArr[i]();
    }

    for(let i = 0; i < passwordLength -funcArr.length; i++){
        let randomIdx = getRandomInteger(0,funcArr.length);
        password+= funcArr[randomIdx]();

    }
// shuffle the password
    password = shufflePassword(Array.from(password));
// display password
    passwordDisplay.value = password;
// calculate strength
    calcStrength();
})






