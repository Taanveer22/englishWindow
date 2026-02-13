// console.log("connected");

const loadLessons = () => {
  fetch(`https://openapi.programming-hero.com/api/levels/all`)
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWords(data.data));
};

const displayLessons = (levels) => {
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
                        class="flex items-center gap-1 btn btn-sm btn-outline btn-primary">
                  <i class="fa-solid fa-book-open"></i>
                  <p>lesson - ${oneLevel.level_no}</p>
                </button>
              `;

    // Correctly attach the event listener
    // button.addEventListener()

    // 4. append the container child elements
    lessonsContainer.appendChild(div);
  }

  console.log(levels);
};

const displayWords = (words) => {
  // console.log(words);
  // 1.  select the container and make innerHTML empty
  const wordsContainer = document.getElementById("words-container");
  // console.log(wordsContainer);
  wordsContainer.innerHTML = "";
  // 2. loop through every array
  words.forEach((oneWord) => {
    console.log(oneWord);
    // 3. create div element to keep data
    const div = document.createElement("div");
    div.innerHTML = ` 
        <div class="card bg-white rounded-xl">
          <div class="card-body items-center text-center">
            <h2 class="card-title">${oneWord.word}</h2>
            <p>Meaning / Pronounciation</p>
            <h2 class="card-title">${oneWord.meaning} / ${oneWord.pronunciation}</h2>
            <div class="flex justify-between w-full">
              <i class="fa-solid fa-circle-info"></i>
              <i class="fa-solid fa-volume-high"></i>
            </div>
          </div>
        </div>
    `;
    // 4. append the container child elements
    wordsContainer.appendChild(div);
  });
};

loadLessons();
