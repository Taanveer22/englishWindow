// console.log("connected");
// utility function 01
const removeActiveClass = () => {
  const commonLevelButtons = document.querySelectorAll(".common-level-btn");
  // console.log(commonLevelButtons);
  commonLevelButtons.forEach((btn) => btn.classList.remove("active"));
};

// utility function 02
const arrayElements = (givenArray) => {
  // console.log(givenArray);
  const mappedElements = givenArray.map(
    (element) => `<span class="btn btn-xs btn-secondary">${element}</span>`,
  );
  return mappedElements.join(" ");
};

// utility function 03
const manageSpinner = (status) => {
  // console.log(status);
  if (status === true) {
    document.getElementById("loading-spinner").classList.remove("hidden");
    document.getElementById("words-container").classList.add("hidden");
  } else {
    document.getElementById("loading-spinner").classList.add("hidden");
    document.getElementById("words-container").classList.remove("hidden");
  }
};

// ======= load function 01 =========================
const loadLessons = () => {
  fetch(`https://openapi.programming-hero.com/api/levels/all`)
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

// ======= load function 02 =========================
const loadWords = (id) => {
  // loading spinner show
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`fixed-level-btn-${id}`);
      // console.log(clickedBtn);
      clickedBtn.classList.add("active");
      displayWords(data.data);
    });
};

// ======= load function 03 =========================
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWordDetails(data.data);
  // console.log(data.data);
};

// ======= display function 01 =========================
const displayLessons = (levels) => {
  // console.log(levels);
  // 1. select the container and make innerHTML empty
  const lessonsContainer = document.getElementById("lessons-container");
  // console.log(lessonsContainer);
  lessonsContainer.innerHTML = "";
  // 2. loop through every array
  for (oneLevel of levels) {
    // console.log(oneLevel);
    // 3. create div element to keep data
    const div = document.createElement("div");
    div.innerHTML = `
      <button onclick="loadWords(${oneLevel.level_no})"
          id="fixed-level-btn-${oneLevel.level_no}"
          class="common-level-btn flex items-center gap-1 btn btn-sm btn-outline btn-primary">
              <i class="fa-solid fa-book-open"></i>
              <p>lesson - ${oneLevel.level_no}</p>
      </button>
              `;

    // Correctly attach the event listener
    // button.addEventListener()

    // 4. append the container child elements
    lessonsContainer.appendChild(div);
  }
};

// ======= display function 02 =========================
const displayWords = (words) => {
  // console.log(words);
  // 1.  select the container and make innerHTML empty
  const wordsContainer = document.getElementById("words-container");
  // console.log(wordsContainer);
  wordsContainer.innerHTML = "";
  if (words.length === 0) {
    wordsContainer.innerHTML = `
        <div class="col-span-3 mx-auto text-center bangla-font">
            <img src="./assets/alert-error.png" class="mx-auto">
            <p class="text-sm lg:text-lg font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি</p>
            <h1 class="text-xl lg:text-2xl font-bold">Next Lesson এ যান</h1>
        </div>
    `;
  }
  // 2. loop through every array
  words.forEach((oneWord) => {
    // console.log(oneWord);
    // 3. create div element to keep data
    const div = document.createElement("div");
    div.innerHTML = ` 
        <div class="card bg-white rounded-xl">
          <div class="card-body items-center text-center">
            <h2 class="card-title">${oneWord.word || "No given word"}</h2>
            <p>Meaning / Pronounciation</p>
            <h2 class="card-title">${oneWord.meaning || "অর্থ পাওয়া যায়নি"} / ${oneWord.pronunciation || "উচ্চারণ পাওয়া যায়নি"}</h2>
            <div class="flex justify-between w-full">
              <button onclick="loadWordDetails(${oneWord.id})"> 
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button> 
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        </div>
    `;
    // 4. append the container child elements
    wordsContainer.appendChild(div);
  });
  // loading spinner hide
  manageSpinner(false);
};

// ======= display function 03 =========================
const displayWordDetails = (info) => {
  // console.log(info);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
              <h2 class="card-title">
              ${info.word || "Not Given"} (${info.pronunciation || "পাওয়া যায়নি"})
              </h2>
              <p class="text-lg font-medium">meaning</p>
              <p>${info.meaning || "পাওয়া যায়নি"}</p>
              <p class="text-lg font-medium">example</p>
              <p>${info.sentence || "Not Given"}</p>
              <p>সমার্থক শব্দ গুলো</p>
              <div>${arrayElements(info.synonyms)}</div>
            </div>
          </div>
  
  `;
  document.getElementById("details_modal").showModal();
};

// load function call
loadLessons();
