
let image = document.getElementById("image");
let title = document.getElementById('title');
let explanation  = document.getElementById('explanation');
let heading = document.getElementById('heading');
let dates = [];
localStorage.setItem("dates" , JSON.stringify(dates));
let submitButton = document.getElementById('date-button');
let searchHistory = document.getElementById('search-history');
let historyArray = [];
const api_key = `LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a`;
// https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=2023-03-30

let todaysDate;
(function getCurrentImageOfTheDay(){
   let currDate = new Date();
   let year = currDate.getFullYear();
   let month =String(currDate.getMonth()+1).padStart(2,'0');
   let day = String(currDate.getDate()).padStart(2,'0');
   let formattedDate = `${year}-${month}-${day}`;
   todaysDate = formattedDate;
//    console.log(formattedDate);
     dates.push(formattedDate);
    displayData(formattedDate);
    saveSearch(formattedDate);
})();


async function fetchData(date){
let url = `https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=${date}`;

   try{
      const response = await fetch(url);
      if(!response.ok){
         throw new Error(`HTTP error ! status : ${response.status}`);
      }

      const data = await response.json();

      return data;
   }catch (error){
      alert("There is no data on the selected date");
      console.error('There was a problem with the fetch operation' , error);
   }
}

async function displayData(date){
   try{
      const data = await fetchData(date);
      
      image.src = data.url;
      explanation.innerText = data.explanation;
      title.innerText = data.title;
      if(todaysDate != date){
         console.log(todaysDate , date);
         heading.innerText = `Picture On ${date}`;
      }
   }catch (error){
      console.log('There was a problem in displaying the data' , error);
   }
}



submitButton.addEventListener('click' , (event) => {
   event.preventDefault();
   getImageOfTheDay();
});

function getImageOfTheDay(){
   let inputDate = String(document.getElementById('date').value);
   saveSearch(inputDate);
   displayData(inputDate);
};

function saveSearch(date) {
   let arr = JSON.parse(localStorage.getItem('dates')) || []; 
   let dateIsIncluded = arr.includes(date);
   if(!dateIsIncluded){
      arr.push(date);
   }
   localStorage.setItem('dates', JSON.stringify(arr)); 
   addSearchToHistory(date);
}

function addSearchToHistory(date){
   let searchHistory = document.getElementById('search-history');

   if(!historyArray.includes(date)){
   searchHistory.innerHTML += `<li><a href="">${date}</a></li>`;
   historyArray.push(date);
   }
}


searchHistory.addEventListener('click' , (event) => {
   event.preventDefault();
  
   let clickedDate = event.target.textContent;
   displayData(clickedDate);
});