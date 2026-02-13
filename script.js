// console.log("connected");

const loadLessons = () => {
  fetch(`https://openapi.programming-hero.com/api/levels/all`)
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const displayLessons = (categories) => {
  // 1. select the container and make innerHTML empty
  const lessonsContainer = document.getElementById("lessons-container");
  // console.log(lessonsContainer);
  lessonsContainer.innerHTML = "";
  // 2. loop through every lesson
  for (oneCategory of categories) {
    // console.log(oneCategory);
    // 3. create div element to keep data
    const div = document.createElement("div");
    div.innerHTML = `
                <button class="flex items-center gap-1 btn btn-sm btn-outline btn-primary">
                  <i class="fa-solid fa-book-open"></i>
                  <p>lesson - ${oneCategory.level_no}</p>
                </button>
              `;
    // 4. append the container child elements
    lessonsContainer.appendChild(div);
  }

  console.log(categories);
};

loadLessons();
