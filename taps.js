"use strict";

export function taps(data) {
  const dagens = document.querySelector(".dagens-data");
  const tempdagens = document.querySelector(".tempdagens");

  /*   let imgName;
  data.taps.forEach((elm) => {
    const nameLower = elm.beer.toLowerCase();
    const lowerOneWord = nameLower.replaceAll(" ", "");
    imgName = `${lowerOneWord}.png`;
    console.log("LOWERCASE", imgName);
  }); */

  data.taps.forEach((elm) => {
    const klon = tempdagens.cloneNode(true).content;
    klon.querySelector(".dagensdiv").dataset.name = elm.beer;
    klon.querySelector(".navn").textContent = elm.beer;
    klon.querySelector(".ontapimg").src = `img/${imgName}`;
    console.log("HEJ", imgName);
    dagens.appendChild(klon);
  });
}
