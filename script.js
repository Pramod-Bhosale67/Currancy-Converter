const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// we have remove last option from/to.json and added alter using the ${} in backtick

const dropdown = document.querySelectorAll(".dropdown select");

for (let select of dropdown){  //outer for loop because we have 2 return item for the dropdown, so adding to each dropdown
    for (let code in countryList){
        let newCountry = document.createElement("option");
        newCountry.innerText = code;
        newCountry.value = code;

        if (select.name === "from" && code === "USD"){
            newCountry.selected = "selected";
        } else if (select.name === "to" && code === "INR"){
            newCountry.selected = "selected";
        }
        select.append(newCountry);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}
 
const updateFlag = (element) => {  //mainly return the element of the select
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    //element is at select, we need to go to its parent i.e select-container to access the img
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let message = document.querySelector(".msg")


btn.addEventListener("click", async (evt) =>{
    evt.preventDefault(); //it refreshes the page, so we have to stop it so that we can see the output as it is

    let amt = document.querySelector(".amount input");
    let amtValue = amt.value;

    if (amtValue === 0 || amtValue < 1){
        amtValue = 1;
        amt.value = "1";
    }

  
   const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const response = await fetch(url);
    let data = await response.json();
    //.json because we have converted it to the readable form

    let rate = data[toCurr.value.toLowerCase()];
    //console.log(rate);  


     let finalAmount = amtValue * rate;
     message.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
   
});