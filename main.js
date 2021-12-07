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
    showDataCstm(data);
  } else {
    opdaterData(data);
    updateCstmData(data);
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

  const betjenes = document.querySelector(".hvembetjenes-data");
  const tempbetjenes = document.querySelector(".betjenes");
  betjenes.innerHTML = "";

  data.serving.forEach((elm) => {
    const klon = tempbetjenes.cloneNode(true).content;
    klon.querySelector(".betjenesnu").textContent = elm.id;

    betjenes.appendChild(klon);
  });

  data.taps.forEach((elm) => {
    const elmBeer = document.querySelector(
      `.dagensdiv[data-name="${elm.beer}"]`
    );
    console.log("Beer", elmBeer, elm.beer);
    elmBeer.querySelector(".navn").textContent = elm.beer;
  });

  data.storage.forEach((elm) => {
    const elmAmount = document.querySelector(
      `.lagerflex[data-storagebar="${elm.name}"]`
    );
    //console.log("AMOUNTBEER", elmAmount);
    elmAmount.querySelector(".navn").textContent = elm.name;
    elmAmount.querySelector(".antaltal").textContent = elm.amount;

    // console.log("AMOUNT", elm.amount, elm.name);
    elmAmount
      .querySelector(".antal")
      .style.setProperty("width", elm.amount.toString() + "0px");
    if (elm.amount > 5) {
      document
        .querySelector(".antal")
        .classList.replace(".colorunder5", "colorover5");
    } else {
      document
        .querySelector(".antal")
        .classList.replace(".colorover5", "colorunder5");
    }
  });

  const queueSize = [];
  console.log("KØEM", queueSize);
  if (document.querySelectorAll(".baren").length < 18) {
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

/* import { taps } from "./taps.js";

taps(); */

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
    klon.querySelector(".betjenesnu").textContent = elm.id;

    betjenes.appendChild(klon);
  });

  const dagens = document.querySelector(".dagens-data");
  const tempdagens = document.querySelector(".tempdagens");

  let imgName;
  data.taps.forEach((elm) => {
    const nameLower = elm.beer.toLowerCase();
    const lowerOneWord = nameLower.replaceAll(" ", "");
    imgName = `${lowerOneWord}.png`;
    console.log("LOWERCASE", imgName);
  });

  data.taps.forEach((elm) => {
    const klon = tempdagens.cloneNode(true).content;
    klon.querySelector(".dagensdiv").dataset.name = elm.beer;
    klon.querySelector(".navn").textContent = elm.beer;
    klon.querySelector(".ontapimg").src = `img/${imgName}`;
    console.log("HEJ", imgName);
    dagens.appendChild(klon);
  });

  const lager = document.querySelector(".lager-data");
  const templager = document.querySelector(".templager");

  data.storage.forEach((elm) => {
    const klon = templager.cloneNode(true).content;
    klon.querySelector(".lagerflex").dataset.storagebar = elm.name;
    klon.querySelector(".navn").textContent = elm.name;
    klon.querySelector(".antaltal").textContent = elm.amount;
    klon.querySelector(".antal").style.width = elm.amount.toString() + "0px";
    if (elm.amount > 5) {
      klon.querySelector(".antal").classList.add("colorover5");
    } else {
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

setInterval(function () {
  hentData(false);
}, 10000);

function updateCstmData(data) {
  document.querySelector(
    ".inlinecstm"
  ).textContent = `QUEUE: ${data.queue.length}`;
}

function showDataCstm(data) {
  document.querySelector(
    ".inlinecstm"
  ).textContent = `QUEUE: ${data.queue.length}`;

  const todays = document.querySelector(".datatodaycstm");
  const temptoday = document.querySelector(".tempdagens");

  data.taps.forEach((elm) => {
    const clone = temptoday.cloneNode(true).content;
    clone.querySelector(".dagensdiv").dataset.name = elm.beer;
    clone.querySelector(".navn").textContent = elm.beer;

    todays.appendChild(clone);
  });

  const serving = document.querySelector(".servingnowcstm");
  const tempserving = document.querySelector(".betjenes");

  data.serving.forEach((elm) => {
    const clone = tempserving.cloneNode(true).content;
    clone.querySelector(".betjenesnu").textContent = elm.id;

    serving.appendChild(clone);
  });
}

/* function getLabels(data) {
  let imgName;
  data.taps.forEach((elm) => {
    const nameLower = elm.beer.toLowerCase();
    const lowerOneWord = nameLower.replaceAll(" ", "");
    imgName = `${lowerOneWord}.png`;
    console.log("LOWERCASE", imgName);
  });

  return imgName;
} */

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
    document.getElementById("hourscstm").innerHTML = hh;
    document.getElementById("minutescstm").innerHTML = mm;
    document.getElementById("secondscstm").innerHTML = ss;
    setTimeout(tick, 1000);
  }

  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login-form-submit");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "manager" && password === "manager") {
      document.querySelector(".forcustomers").classList.add("hidden");
      document.querySelector(".forstaff").classList.remove("hidden");
    } else {
      alert("Login information not correct");
    }
  });

  document.addEventListener("DOMContentLoaded", tick);
}
