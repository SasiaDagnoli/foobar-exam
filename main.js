//import './style.css'

"use strict";

window.addEventListener("DOMContentLoaded", hentData);

async function hentData() {
  const resultat = await fetch("https://bandoen.herokuapp.com/");
  const data = await resultat.json();

  console.log("data", data);
  visData(data);
}

function visData(data) {
  const medarbejderinfo = document.querySelector(".medarbejderinfo");
  const temp = document.querySelector(".medarbejdere");

  data.bartenders.forEach((elm) => {
    const klon = temp.cloneNode(true).content;
    klon.querySelector(".medarbejder").textContent = elm.name;
    klon.querySelector(".status").textContent = elm.status;

    medarbejderinfo.appendChild(klon);
  });

  document.querySelector(".inline").textContent = `KØ: ${data.queue.length}`;

  const betjenes = document.querySelector(".hvembetjenes");
  const tempbetjenes = document.querySelector(".betjenes");

  data.serving.forEach((elm) => {
    const klon = tempbetjenes.cloneNode(true).content;
    klon.querySelector(".betjenesnu").textContent = `${elm.id}`;

    betjenes.appendChild(klon);
  });

  const dagens = document.querySelector(".dagens");
  const tempdagens = document.querySelector(".tempdagens");

  data.taps.forEach((elm) => {
    const klon = tempdagens.cloneNode(true).content;
    klon.querySelector(".navn").textContent = elm.beer;

    dagens.appendChild(klon);
  });

  const lager = document.querySelector(".lager");
  const templager = document.querySelector(".templager");

  data.storage.forEach((elm) => {
    const klon = templager.cloneNode(true).content;
    klon.querySelector(".navn").textContent = elm.name;

    lager.appendChild(klon);
  });
  /* const queue = document.querySelector(".queue");
  const tempqueue = document.querySelector(".thequeue");

  data.queue.forEach((elm) => {
    const klon = tempqueue.cloneNode(true).content;
    klon.querySelector(".inqueue").textContent = `Kø: ${queue.length}`;

    queue.appendChild(klon);
  }); */
}
/* setInterval(function () {
  hentData();
}, 10000);
 */
