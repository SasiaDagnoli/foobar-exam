//import './style.css'

"use strict";

window.addEventListener("DOMContentLoaded", hentData);

async function hentData(first = true) {
  const resultat = await fetch("https://bandoen.herokuapp.com/");
  const data = await resultat.json();

  console.log("data", data);
  if (first) {
    hentTyper();
    visData(data);
  } else {
    opdaterData(data);
  }
}

async function hentTyper() {
  const resultatTyper = await fetch("https://bandoen.herokuapp.com/beertypes");
  const dataTyper = await resultatTyper.json();

  console.log(dataTyper);
  visTypeData(dataTyper);
}

function visTypeData(dataTyper) {
  dataTyper.forEach((type) => {
    const parents = document.querySelectorAll(`[data-name="${type.name}"]`);
    if (parents.length) {
      parents.forEach((parent) => {
        parent.querySelector(".alc").textContent = type.alc;
        parent.querySelector(".type").textContent = type.category;
        console.log(type.name);
      });
    }
  });
}

function opdaterData(data) {
  document.querySelector(".inline").textContent = `KØ: ${data.queue.length}`;
  data.bartenders.forEach((elm) => {
    document.querySelector(
      `[data-bartendername="${elm.name}"] .status`
    ).textContent = elm.status;
  });

  data.serving.forEach((elm) => {
    document.querySelector(".betjenesnu").textContent = `${elm.id}`;
  });

  data.taps.forEach((elm) => {
    document.querySelector(".dagensdiv").dataset.name = elm.beer;
    document.querySelector(".navn").textContent = elm.beer;
  });

  data.storage.forEach((elm) => {
    document.querySelector(
      `[data-storage-bar="${elm.amount}"] .antal`
    ).style.width = elm.amount.toString() + "0px";
    document.querySelector(".navn").textContent = `${elm.name} ${elm.amount}`;
    if (elm.amount > 5) {
      document.querySelector(".antal").classList.add("colorover5");
      document.querySelector(".antal").classList.remove("colorunder5");
    } else {
      console.log("RØD");
      document.querySelector(".antal").classList.add("colorunder5");
      document.querySelector(".antal").classList.remove("colorover5");
    }
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

function visData(data) {
  const medarbejderinfo = document.querySelector(".medarbejderinfo-data");
  const temp = document.querySelector(".medarbejdere");

  data.bartenders.forEach((elm) => {
    const klon = temp.cloneNode(true).content;
    klon.querySelector(".medarbejder").textContent = elm.name;
    klon.querySelector(".flex").dataset.bartendername = elm.name;
    medarbejderinfo.appendChild(klon);
  });

  document.querySelector(".inline").textContent = `KØ: ${data.queue.length}`;

  const betjenes = document.querySelector(".hvembetjenes-data");
  const tempbetjenes = document.querySelector(".betjenes");

  data.serving.forEach((elm) => {
    const klon = tempbetjenes.cloneNode(true).content;
    klon.querySelector(".betjenesnu").textContent = `${elm.id}`;

    betjenes.appendChild(klon);
  });

  const dagens = document.querySelector(".dagens-data");
  const tempdagens = document.querySelector(".tempdagens");

  data.taps.forEach((elm) => {
    const klon = tempdagens.cloneNode(true).content;
    klon.querySelector(".dagensdiv").dataset.name = elm.beer;
    klon.querySelector(".navn").textContent = elm.beer;

    dagens.appendChild(klon);
  });

  const lager = document.querySelector(".lager-data");
  const templager = document.querySelector(".templager");

  data.storage.forEach((elm) => {
    const klon = templager.cloneNode(true).content;
    klon.querySelector(".lagerflex").dataset.storageBar = elm.amount;
    klon.querySelector(".navn").textContent = `${elm.name} ${elm.amount}`;
    klon.querySelector(".antal").style.width = elm.amount.toString() + "0px";
    if (elm.amount > 5) {
      klon.querySelector(".antal").classList.add("colorover5");
    } else {
      console.log("RØD");
      klon.querySelector(".antal").classList.add("colorunder5");
    }
    lager.appendChild(klon);
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
  hentData(false);
}, 10000);

countdown();

function countdown() {
  console.log("COUNTDOWN");
  let start = new Date();
  start.setHours(22, 0, 0);

  function pad(num) {
    return ("0" + parseInt(num)).substr(-2);
  }

  function tick() {
    let now = new Date();
    if (now > start) {
      start.setDate(start.getDate() + 1);
    }
    let remain = (start - now) / 1000;
    let hh = pad((remain / 60 / 60) % 60);
    let mm = pad((remain / 60) % 60);
    let ss = pad(remain % 60);
    /* document.getElementById("time").innerHTML = hh + ":" + mm + ":" + ss; */
    document.getElementById("hours").innerHTML = hh;
    document.getElementById("minutes").innerHTML = mm;
    document.getElementById("seconds").innerHTML = ss;
    setTimeout(tick, 1000);
  }

  document.addEventListener("DOMContentLoaded", tick);
}
