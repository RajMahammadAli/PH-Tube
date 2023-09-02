// fetching data
const loadData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const allData = data.data;
  displayAllData(allData);
};

// category section
const displayAllData = (categories) => {
  const categoryWiseData = document.getElementById("categoryWiseData");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.classList.add(`flex`);
    div.innerHTML = `
        <div class="tabs m-2 w-full grid justify-center">
          <button onclick="displayCards(${category.category_id})" class="tab bg-gray-300 rounded text-xl">${category.category}</button> 
        </div>
      `;
    categoryWiseData.appendChild(div);
  });
};

// Function to parse view counts like "100k", "1.5k", "99k" to integers
function parseViews(views) {
  const numericPart = parseFloat(views);
  if (isNaN(numericPart)) {
    return 0; // Return 0 if parsing fails
  }

  if (views.includes("k")) {
    return numericPart * 1000;
  } else if (views.includes("m")) {
    return numericPart * 1000000;
  } else if (views.includes("b")) {
    return numericPart * 1000000000;
  } else {
    return numericPart;
  }
}

let sortedArray = [];

const sortAndDisplayData = () => {
  // Sort sortedArray by views in ascending order
  sortedArray.sort((a, b) => {
    return parseViews(a.others?.views) - parseViews(b.others?.views);
  });
  displaySortedCards();
};

const displaySortedCards = () => {
  const cards = document.getElementById("cards");
  const AddNullData = document.getElementById("AddNullData");
  const nullData = document.createElement("div");

  cards.innerHTML = "";
  AddNullData.innerHTML = "";

  sortedArray?.length != 0
    ? sortedArray.forEach((data) => {
        const ms = parseFloat(data.others?.posted_date);
        const minutes = Math.floor(ms / 60);
        const hour = Math.floor(minutes / 60);

        const timesAgo =
          data.others.posted_date.length != 0
            ? `<p class="absolute rounded-lg right-5 bottom-3 inline bg-[#171717] text-white text-right px-2">${
                hour % 24
              } hrs ${minutes % 60} min ago</p>`
            : "";

        const card = document.createElement("div");

        const isTrue = data.authors[0].verified
          ? `<img
          class="w-5 h-5 inline"
            src=Assets/verified.svg
            alt="verified"
          />`
          : "";
        card.innerHTML = `
          <div class="card bg-base-100 shadow-xl">
          <figure class="relative">
            <img
            class="w-80 h-52 rounded-xl"
              src=${data.thumbnail}
              alt="thumbnail"
            />
            ${timesAgo}
  
          </figure>
          <div class="card-body">
          
            <h2 class="card-title w-full text-base"><span><img
            class="w-10 h-10 rounded-full"
              src=${data.authors[0].profile_picture}
              alt="Shoes"
            /></span> ${data.title}</h2>
            <h2>${data.authors[0].profile_name} <span class="px-1">${isTrue}</span></h2>
            <p>${data.others.views} </p>
          </div>
          </div>
          `;
        cards.appendChild(card);
      })
    : (nullData.innerHTML = `
      <div class="text-center">
      <img class="mx-auto"
              src="Assets/icon.png"
              alt="Shoes"
            />
        <p class="w-full text-center text-[#171717] md:text-3xl font-bold">Oops!! Sorry, There is no</br> content here</p>
      </div>
      `);
  AddNullData.appendChild(nullData);
};

const displayCards = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();
  const allDataById = data.data;
  sortedArray = allDataById.slice();
  sortAndDisplayData();
};

loadData();
displayCards("1000");

// Function to trigger sorting and displaying data based on views
const sortDataByViews = () => {
  sortAndDisplayData();
};

// ... Your previous code ...

// Function to sort and display the data in descending order of views
const sortAndDisplayDataDescending = () => {
  // Sort sortedArray by views in descending order
  sortedArray.sort((a, b) => {
    return parseViews(b.others?.views) - parseViews(a.others?.views);
  });
  console.log(sortedArray);
  displaySortedCards();
};

// ... Your previous code ...

// Function to trigger sorting and displaying data in descending order of views
const sortDataByViewsDescending = () => {
  sortAndDisplayDataDescending();
};
