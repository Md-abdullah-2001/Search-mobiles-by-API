// Step-01: API data request start

const AllData = async (searchValue, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data, dataLimit);
};

// Step-02: Get the data from above & and create children cards by this API data and use few dynamic data from API

const displayData = (phones, dataLimit) => {
  // console.log(phones);
  const cardContainer = document.getElementById("card-container");

  //   empty the container
  cardContainer.textContent = "";

  // slice to show only 10 results & show all Btn when result is <10
  const showAllBtn = document.getElementById("show-all-div");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAllBtn.classList.remove("d-none");
  } else {
    showAllBtn.classList.add("d-none");
  }

  // Step-04:if the result not found then show the not found message by defining if phone has length or not
  const notFoundMsg = document.getElementById("none-msg");
  if (phones.length === 0) {
    notFoundMsg.classList.remove("d-none");
  } else {
    notFoundMsg.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const createDiv = document.createElement("div");
    createDiv.classList.add("col");
    createDiv.innerHTML = `
    <div class="card h-full  ">
    <img src="${phone.image}" class="card-img-top p-5" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text" >This is a longer card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.</p>
            <button onclick="getDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
           
    
            </div>
</div>
    
    `;
    cardContainer.appendChild(createDiv);
  });
  // stop spinner here
  spinnerToggle(false);
  //
};

// spinner function to show it or not
const spinnerToggle = (ifLoading) => {
  const spinnerField = document.getElementById("spinner-loader");
  if (ifLoading == true) {
    spinnerField.classList.remove("d-none");
  } else {
    spinnerField.classList.add("d-none");
  }
};

// common function for loading all datawhen buttons are clicked
const commonDataLoad = (dataLimit) => {
  // start spinner
  spinnerToggle(true);
  //
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  AllData(searchValue, dataLimit);
};

// keyboard enter button trick
document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      commonDataLoad(10);
    }
  });

// Step-03: get search result when you click on button by getting input texts and setting as dynamic search value || also set spinner as data loading started from here awith clicking button

document.getElementById("search-btn").addEventListener("click", function () {
  commonDataLoad(10);
});

// show all data when show all button is clicked
document.getElementById("show-all-btn").addEventListener("click", function () {
  commonDataLoad("");
});

// show details function
const getDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showDetail(data.data);
};

const showDetail = (details) => {
  console.log(details);
  const modaTitle = document.getElementById("exampleModalLabel");
  modaTitle.innerText = details.name;
  const modaDes = document.getElementById("modalDescription");
  modaDes.innerHTML = `
  <p>'${
    details.releaseDate ? details.releaseDate : "No release date yet!!!"
  }'</p>
  
  `;
};

AllData();
