"use strict";

const menu = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-menu");

const linkInput = document.querySelector(".link-input");
const linkSubmit = document.querySelector(".link-submit");
const errorMessage = document.querySelector(".error");

const shortenedLinkContainer = document.querySelector(".shortened-links");

const bars = document.querySelectorAll("span");

//Open mobile menu by toggling the menu icon
menu.addEventListener("click", () => {
  menu.classList.toggle("open");
  mobileNav.classList.toggle("menu-closed");
});

//Fetch the api and perform shortening function
const shortener = async () => {
  const response = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${linkInput.value}`
  );
  const data = await response.json();

  const htmlUrls = `<div class="cont">
      <p class="cont-one">${data?.result.original_link}</p>
      <div class="cont-two">
      <p class="generated-link">${data?.result.full_short_link}</p>
      <button class="copyBtn">copy</button>
      </div>
      </div>`;

  shortenedLinkContainer.insertAdjacentHTML("afterbegin", htmlUrls);

  //Copy the link and remove the link card from the browser
  const copy = shortenedLinkContainer.querySelectorAll(".copyBtn");
  const genLink =
    shortenedLinkContainer.querySelector(".generated-link").textContent;
  copy.forEach((i) => {
    i.addEventListener("click", (e) => {
      navigator.clipboard.writeText(genLink).then(() => {
        e.target.style.backgroundColor = "var(--Dark-Violet)";
        e.target.textContent = "copied!";
      });

      let removeCopied = e.target.parentElement.parentElement;

      setTimeout(() => {
        removeCopied.remove();
      }, 2000);
    });
  });
};

const handleShortenClick = () => {
  if (linkInput.value === "") {
    linkInput.classList.add("invalid");
    errorMessage.style.display = "block";
  } else {
    linkInput.classList.remove("invalid");
    errorMessage.style.display = "none";
    shortener();
  }

  linkInput.value = "";
};

//Check if a linke is pasted in the input section and then display
linkSubmit.addEventListener("click", handleShortenClick);

linkInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    // trigger search button click
    console.log("press key up 13");
    handleShortenClick();
  }
});
