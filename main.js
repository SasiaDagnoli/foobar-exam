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

function visTypeData(dataTyper) {
  const temp = document.querySelector(".dagens-data");
  const tempalk = document.querySelector(".tempdagens");
  console.log("TEST1");
  dataTyper.forEach((type) => {
    const klon = tempalk.cloneNode(true).content;
    klon.querySelector(".alc").textContent = type.alc;
    console.log(type.alc);

    temp.appendChild(klon);
  });
  console.log("TEST2");
}

function visData(data) {
  const medarbejderinfo = document.querySelector(".medarbejderinfo-data");
  const temp = document.querySelector(".medarbejdere");
  medarbejderinfo.textContent = "";

  data.bartenders.forEach((elm) => {
    const klon = temp.cloneNode(true).content;
    klon.querySelector(
      ".medarbejder"
    ).textContent = `${elm.name} ${elm.status}`;

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
    klon.querySelector(".navn").textContent = `${elm.name} ${elm.amount}`;
    klon.querySelector(".antal").style.width = elm.amount.toString() + "0px";
    /* if (document.querySelectorAll(".antal") < 5) {
      document.querySelector(".antal").classList.add("colorover5");
    } */
    if (elm.amount > 5) {
      klon.querySelector(".antal").classList.add("colorover5");
    } else {
      console.log("RØD");
      klon.querySelector(".antal").classList.add("colorunder5");
    }
    /*  console.log(document.querySelector(".antal").height); */
    lager.appendChild(klon);
    //setColorStorage(data);
  });

  const queueSize = [];
  if (document.querySelectorAll(".baren").length < 18) {
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
      data.queue.length.toString() + "0px";

    bar.appendChild(klon);
  });
}
/* hentTyper(); */
setInterval(function () {
  hentData();
}, 10000);

/* function setColorStorage(data) {
  console.log("ER VI HER");
  data.storage.forEach((amount) => {
    if (data.storage.amount < 5) {
      document.querySelector(".antal").classList.add("colorover5");
    }
  });
} */
