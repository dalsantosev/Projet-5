//---------Slides datas-------------------------------------------------------------------------------------------------------------------------------//

const slides = [
  {
    image: "slide1.jpg",
    tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
  },
  {
    image: "slide2.jpg",
    tagLine:
      "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
  },
  {
    image: "slide3.jpg",
    tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
  },
  {
    image: "slide4.png",
    tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
  },
  
  
];




//--------------Variables------------------------------------------------------------------------------------------------------------------------------//


//initialise for global scope
let shiftDirection = null;

//copy slides for work on copy
let slidesToShow = Array.from(slides);

// initialize slideNumber
let slideNumber = 1;

//         Create DOM elements       //


//select parent banner node for childs
const divBanner = document.querySelector("#banner");

//----------- element "banner arrows" ------------//

//generate div arrow container
const divArrow = document.createElement("div");

//set class arrow to div
divArrow.setAttribute("class", "arrow");

// create left arrow
const leftArrow = document.createElement("img");
leftArrow.setAttribute("class", "arrow_left");
leftArrow.src = "./assets/images/arrow_left.png";

// create right arrow
const rightArrow = document.createElement("img");
rightArrow.setAttribute("class", "arrow_right");
rightArrow.src = "./assets/images/arrow_right.png";


//----------- element "banner img" ------------//


// generate banner img
const bannerImg = document.createElement("img");

//set src to banner img
bannerImg.src = `./assets/images/slideshow/${slidesToShow[0].image}`;

//set class to banner img
bannerImg.setAttribute("class", "banner-img");
bannerImg.setAttribute("alt", `slide-picture-${slideNumber}`);


//-------- element "banner-tagline"----------//

//generate element p for tagline
const bannerTagLine = document.createElement("p");

//insert html tagline inside p from slidesToShow 
bannerTagLine.innerHTML = slidesToShow[0].tagLine;



//--------- element "banner-dots"------------//

//div dots container
const divDots = document.createElement("div");
divDots.setAttribute("class", "dots");

//regenerate divBanner content
divBanner.innerHTML = "";

// add previously created elements to DOM
divBanner.appendChild(divArrow);
divArrow.appendChild(leftArrow);
divArrow.appendChild(rightArrow);
divBanner.appendChild(bannerImg);
divBanner.appendChild(bannerTagLine);
divBanner.appendChild(divDots);

//genenerate 1 bullet point by object in slidesToShow area.
for (let i = 0; i < slidesToShow.length; i++) {
  
  //generate div bullet point
  let divDot = document.createElement("div");
  
  //add div bullet point to DOM
  divDots.appendChild(divDot);
  
  //set class to div bullet point
  divDot.setAttribute("class", "dot");
  
  //active first bullet point
  if (i === 0) {
    divDot.classList.add("dot_selected");
  }
}



//--------Create functions-----------------------------------------------------------------------------------------------------------------------------//



//   function "shift and show"   //


function shiftAndShow(shiftDirection, arrayToShift) {
  //shift:
  //elements to show will ever be the first one of the arrayToShift

  if (shiftDirection === "left") {
    //pop() method remove and return the last element of an array
    //unshift method add a new item at the begining on an array
    //move elements in array to the left
    
    arrayToShift.unshift(arrayToShift.pop());
  }
  if (shiftDirection === "right") {
    //shift() method remove and return the first element of an array
    //push method add a new item to the end of an array
    //move elements in array to the right
    
    arrayToShift.push(arrayToShift.shift());
  }
  //Show:
  //change src img according to list
  bannerImg.src = `./assets/images/slideshow/${arrayToShift[0].image}`;
  
  //change alt img attribute according to slide number
  bannerImg.setAttribute("alt", `slide-picture-${slideNumber}`);
  
  //change banner tagline according to list
  bannerTagLine.innerHTML = arrayToShift[0].tagLine;
}



//      function "active Dot" //

/**
 *  this function unset current .dot_selected class
 *  and set it to a new one according to the slide number
 * @param {string} shiftDirection - values : "left" , "right"
 */

function activeDot(shiftDirection) {
  if (shiftDirection === "left") {
    //infinite count 1-4-3-2-1... for dot activation
    slideNumber === 1 ? (slideNumber = slides.length) : slideNumber--;
  }
  if (shiftDirection === "right") {
    //infinite count 1-2-3-4-1... for dot activation
    slideNumber === slides.length ? (slideNumber = 1) : slideNumber++;
  }
  
  //select dot active
  let dotActive = document.querySelector(".dot_selected");
  
  //desactive dot by removing .dot_selected class
  dotActive.classList.remove("dot_selected");
  
  //select dot according to the slide number
  let dotToActive = divDots.querySelector(`:nth-child(${slideNumber})`);
  
  //activate this dot by adding .dot_selected class
  dotToActive.classList.add("dot_selected");
}


//      function " click on event Listener "       //


document.addEventListener("click", function (clicBanner) {
  //click on left arrow
  if (clicBanner.target.matches(".arrow_left")) {
    shiftDirection = "left";
    
    //call 2 functions
    activeDot(shiftDirection);
    shiftAndShow(shiftDirection, slidesToShow);
   
  }
  //click on right arrow
  if (clicBanner.target.matches(".arrow_right")) {
    shiftDirection = "right";
    activeDot(shiftDirection);
    shiftAndShow(shiftDirection, slidesToShow);
    
  }
});


