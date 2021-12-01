//import './style.css'

"use strict";

window.addEventListener("DOMContentLoaded", hentData);

async function hentData() {
  const resultat = await fetch("https://bandoen.herokuapp.com/");
  const data = await resultat.json();

  console.log("data", data);
  visData(data);
}

async function hentTyper() {
  const resultatTyper = await fetch("https://bandoen.herokuapp.com/beertypes");
  const dataTyper = await resultatTyper.json();

  console.log(dataTyper);
  visTypeData(dataTyper);
}

/* function visTypeData(dataTyper) {
  const temp = document.querySelector(".dagens-data");
  const tempalk = document.querySelector(".tempdagens");
  temp.textContent = "";

  dataTyper.forEach((type) => {
    const klon = tempalk.cloneNode(true).content;
    klon.querySelector(".alk").textContent = type.alc;

    temp.appendChild(klon);
  });
} */

function visData(data) {
  const medarbejderinfo = document.querySelector(".medarbejderinfo-data");
  const temp = document.querySelector(".medarbejdere");
  medarbejderinfo.textContent = "";

  data.bartenders.forEach((elm) => {
    const klon = temp.cloneNode(true).content;
    klon.querySelector(".medarbejder").textContent = elm.name;
    klon.querySelector(".status").textContent = elm.status;

    medarbejderinfo.appendChild(klon);
  });

  document.querySelector(".inline").textContent = `KØ: ${data.queue.length}`;

  const betjenes = document.querySelector(".hvembetjenes-data");
  const tempbetjenes = document.querySelector(".betjenes");

  betjenes.textContent = "";

  data.serving.forEach((elm) => {
    const klon = tempbetjenes.cloneNode(true).content;
    klon.querySelector(".betjenesnu").textContent = `${elm.id}`;

    betjenes.appendChild(klon);
  });

  const dagens = document.querySelector(".dagens-data");
  const tempdagens = document.querySelector(".tempdagens");
  dagens.textContent = "";

  data.taps.forEach((elm) => {
    const klon = tempdagens.cloneNode(true).content;
    klon.querySelector(".navn").textContent = elm.beer;

    dagens.appendChild(klon);
  });

  const lager = document.querySelector(".lager-data");
  const templager = document.querySelector(".templager");
  lager.textContent = "";

  data.storage.forEach((elm) => {
    const klon = templager.cloneNode(true).content;
    klon.querySelector(".navn").textContent = elm.name;

    lager.appendChild(klon);
  });

  const queueSize = [];
  if (document.querySelectorAll(".baren").length < 15) {
    console.log("JA", document.querySelectorAll(".baren").length);
    queueSize.push(data.queue.length);
  } else {
    let elements = document.getElementsByClassName("baren");
    let required = elements[0];
    required.remove();
    queueSize.push(data.queue.length);
  }

  const bar = document.querySelector(".bars");
  const bartemp = document.querySelector(".thequeue");

  queueSize.forEach((elm) => {
    console.log("queue", queueSize);
    console.log(elm);
    const klon = bartemp.cloneNode(true).content;
    klon.querySelector(".baren").style.height =
      data.queue.length.toString() + "px";

    bar.appendChild(klon);
  });
}
setInterval(function () {
  hentData();
}, 10000);

hentTyper();
