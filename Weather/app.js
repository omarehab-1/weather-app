
/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=metric&appid=899e70eda66ebc4b20cda4fe065b7879';
const localUrl = 'http://localhost:8000';

const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

// add an event listener to the generating button to start the program
generate.addEventListener("click", function generateApi(e){
    generating()
});

// afunction that get the zipcode from the client and getting the temperature and city name from (openweathermap) and post it into the server then updating the UI of the bage dynamiclly 
async function generating (){
    let data = {
        zipCode: zip.value,
        content: feelings.value,
        date: d
    };
    getZipInfo(data.zipCode).then(info =>{
        // an error message occur if the zip code not valid or the city is not found
        
        if(info.cod != 200)
        return alert(info.message)
       
        data.temp = info.main.temp
        data.city = info.name
        console.log(data.temp)
        console.log(data.city)
        postData(data)   //posting data to the server
     
    }).then(
       setTimeout(updateUI,1000)  //updating the ui of the page
    )
    };

// async function that fetch the data comes from the zipcode and return it as a JSON

async function getZipInfo (zipCode){
    const res = await fetch(baseUrl + zipCode + apiKey)
    try{
        const post = res.json();
        return post;
    }catch(error){
        console.log("error",error);
    }
};

// async function that posting the data to the server in JSON lang

async function postData(data) {
    const postData = await fetch(`/postData`,{
        method:'POST',
        credentials:'same-origin',
        headers:{'Content-Type': 'application/json',
    },
        body: JSON.stringify(data),
    });
    try{
       const postedData = await postData.json()
        return postedData;
    }catch(error){
        console.log("error",error);
    };

    };

// async function that request a get route from the server and updating the UI of the page dynamiclly based on the data returned
    
    async function updateUI() {
        const response = await fetch(`/all`);
        console.log(response);
        try{
           const data = await response.json();
           console.log(data);
            document.getElementById('date').innerHTML = `Date: ${newDate}   <i class="fa-solid fa-calendar-days"></i>`,
            document.getElementById('temp').innerHTML = `Temperature: ${Math.round(data.temp) + ' degree'}   <i class="fa-solid fa-temperature-three-quarters"></i>`,
            document.getElementById('city').innerHTML = `City Name: ${data.city}   <i class="fa-solid fa-city"></i>`,
            document.getElementById('content').innerHTML = `I Feel ${data.content}   <i class="fa-solid fa-heart"></i>`
        }catch(error){
            console.log("error",error)
        };
    }
    