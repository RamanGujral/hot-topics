// Define the function to set the style for particles
const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const PARTICLES = document.querySelectorAll(".star");
PARTICLES.forEach((P) => {
  P.setAttribute(
    "style",
    `
    --angle: ${RANDOM(0, 360)};
    --duration: ${RANDOM(6, 20)};
    --delay: ${RANDOM(1, 10)};
    --alpha: ${RANDOM(40, 90) / 100};
    --size: ${RANDOM(2, 6)};
    --distance: ${RANDOM(40, 200)};
  `
  );
});

// Get active parts of HTML
let buttons = document.querySelectorAll("button[data-page]");
let dc = document.querySelector(".dynamic-content");

let url = "./content/home.html";

function pickPartial(ev) {
  let currentItem = ev.target.closest("button"); // Find the closest button element

  if (!currentItem) return; // If the button element is not found, exit the function

  let pathId = currentItem.getAttribute("data-page"); // Use getAttribute to access the data-page attribute
  let dataLocation = `content/${pathId}.html`;

  handleAjax(dataLocation);
}

buttons.forEach((button) => {
  button.addEventListener("click", pickPartial);
});

// Use fetch to trigger HTTP request
function handleAjax(dataLocation) {
  fetch(dataLocation)
    .then(function (rsp) {
      if (rsp.ok) {
        return rsp.text();
      }

      throw new Error(rsp.statusText);
    })
    .then(function (data) {
      dc.innerHTML = data;
    })
    .catch(function (err) {
      console.log(err.message);
    });
}

// Manually trigger the pickPartial function for the home page button when the page loads
window.addEventListener("load", function () {
  let homeButton = document.querySelector("button[data-page='home']");
  if (homeButton) {
    pickPartial({ target: homeButton });
  }
});
