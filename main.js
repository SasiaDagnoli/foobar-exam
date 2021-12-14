"use strict";

window.addEventListener("DOMContentLoaded", fetchData);

async function fetchData(first = true) {
  const resultat = await fetch("https://bandoen.herokuapp.com/");
  const data = await resultat.json();

  console.log("data", data);
  if (first) {
    fetchTypes();
    displayData(data);
    showDataCstm(data);
  } else {
    updateData(data);
    updateCstmData(data);
  }
}

async function fetchTypes() {
  const resultatTyper = await fetch("https://bandoen.herokuapp.com/beertypes");
  const dataTyper = await resultatTyper.json();
  displayTypeData(dataTyper);
}

function displayTypeData(dataTyper) {
  dataTyper.forEach((type) => {
    const parents = document.querySelectorAll(`[data-name="${type.name}"]`);
    if (parents.length) {
      parents.forEach((parent) => {
        parent.querySelector(".alc").textContent = `Alc: ${type.alc}`;
        parent.querySelector(".type").textContent = type.category;
      });
    }
  });
}

function updateData(data) {
  updateQueueData(data);
  updateServingData(data);
  updateTapData(data);
  updateStorageData(data);
}

function displayData(data) {
  displayStaffData(data);
  displayQueueData(data);
  displayServingData(data);
  displayOnTapData(data);
  displayStorageData(data);
}

function displayStaffData(data) {
  const medarbejderinfo = document.querySelector(".medarbejderinfo-data");
  const temp = document.querySelector(".staff");

  data.bartenders.forEach((elm) => {
    const klon = temp.cloneNode(true).content;
    klon.querySelector(".employee").textContent = elm.name;
    klon.querySelector(".flex").dataset.bartendername = elm.name;
    medarbejderinfo.appendChild(klon);
  });
}

function displayQueueData(data) {
  document.querySelector(".inline").textContent = `KØ: ${data.queue.length}`;

  const queueSize = [];
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
    const klon = bartemp.cloneNode(true).content;
    klon.querySelector(".baren").style.height =
      data.queue.length.toString() + "0px";

    bar.appendChild(klon);
  });
}

function displayServingData(data) {
  const servingDisplay = document.querySelector(".hvembetjenes-data");
  const tempServing = document.querySelector(".serving");

  data.serving.forEach((elm) => {
    const klon = tempServing.cloneNode(true).content;
    klon.querySelector(".servingnow").textContent = elm.id;

    servingDisplay.appendChild(klon);
  });
}

function displayOnTapData(data) {
  const dagens = document.querySelector(".dagens-data");
  const temptap = document.querySelector(".temptap");

  let imgName;
  data.taps.forEach((elm) => {
    const nameLower = elm.beer.toLowerCase();
    const lowerOneWord = nameLower.replaceAll(" ", "");
    imgName = `${lowerOneWord}.png`;
    console.log("LOWERCASE", imgName);
  });

  data.taps.forEach((elm) => {
    const klon = temptap.cloneNode(true).content;
    klon.querySelector(".tapwrapper").dataset.name = elm.beer;
    klon.querySelector(".name").textContent = elm.beer;
    //klon.querySelector(".ontapimg").src = `img/${imgName}`;
    dagens.appendChild(klon);
  });
}

function displayStorageData(data) {
  const lager = document.querySelector(".lager-data");
  const tempStorage = document.querySelector(".tempstorage");

  data.storage.forEach((elm) => {
    const klon = tempStorage.cloneNode(true).content;
    klon.querySelector(".storageflex").dataset.storagebar = elm.name;
    klon.querySelector(".name").textContent = elm.name;
    klon.querySelector(".amounttxt").textContent = elm.amount;
    klon.querySelector(".amount").style.width = elm.amount.toString() + "0px";
    if (elm.amount > 5) {
      klon.querySelector(".amount").classList.add("colorover5");
    } else {
      klon.querySelector(".amount").classList.add("colorunder5");
    }
    lager.appendChild(klon);
  });
}

function updateQueueData(data) {
  document.querySelector(".inline").textContent = `KØ: ${data.queue.length}`;
  const queueSize = [];
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
    const klon = bartemp.cloneNode(true).content;
    klon.querySelector(".baren").style.height =
      data.queue.length.toString() + "0px";

    bar.appendChild(klon);
  });
}

function updateServingData(data) {
  const servingDisplay = document.querySelector(".hvembetjenes-data");
  const tempServing = document.querySelector(".serving");
  servingDisplay.innerHTML = "";

  data.serving.forEach((elm) => {
    const klon = tempServing.cloneNode(true).content;
    klon.querySelector(".servingnow").textContent = elm.id;

    servingDisplay.appendChild(klon);
  });
}

function updateTapData(data) {
  data.taps.forEach((elm) => {
    const elmBeer = document.querySelector(
      `.tapwrapper[data-name="${elm.beer}"]`
    );
    elmBeer.querySelector(".name").textContent = elm.beer;
  });
}

function updateStorageData(data) {
  data.storage.forEach((elm) => {
    const elmAmount = document.querySelector(
      `.storageflex[data-storagebar="${elm.name}"]`
    );
    elmAmount.querySelector(".name").textContent = elm.name;
    elmAmount.querySelector(".amounttxt").textContent = elm.amount;

    elmAmount
      .querySelector(".amount")
      .style.setProperty("width", elm.amount.toString() + "0px");
    if (elm.amount > 5) {
      document
        .querySelector(".amount")
        .classList.replace(".colorunder5", "colorover5");
    } else {
      document
        .querySelector(".amount")
        .classList.replace(".colorover5", "colorunder5");
    }
  });
}

function updateCstmData(data) {
  updateQueueDataCstm(data);
  updateOntapDataCstm(data);
  updateServingDataCstm(data);
}

function showDataCstm(data) {
  displayQueueDataCstm(data);
  displayOnTapDataCstm(data);
  displayServingDataCstm(data);
}

function displayQueueDataCstm(data) {
  document.querySelector(
    ".inlinecstm"
  ).textContent = `QUEUE: ${data.queue.length}`;

  const queueSize = [];
  if (document.querySelectorAll(".baren").length < 18) {
    queueSize.push(data.queue.length);
  } else {
    let elements = document.getElementsByClassName("baren");
    let required = elements[0];
    required.remove();
    queueSize.push(data.queue.length);
  }

  const bar = document.querySelector(".barscstm");
  const bartemp = document.querySelector(".thequeue");

  queueSize.forEach((elm) => {
    const klon = bartemp.cloneNode(true).content;
    klon.querySelector(".baren").style.height =
      data.queue.length.toString() + "0px";

    bar.appendChild(klon);
  });
}

function displayOnTapDataCstm(data) {
  const todays = document.querySelector(".datatodaycstm");
  const temptoday = document.querySelector(".temptap");

  data.taps.forEach((elm) => {
    const clone = temptoday.cloneNode(true).content;
    clone.querySelector(".tapwrapper").dataset.name = elm.beer;
    clone.querySelector(".name").textContent = elm.beer;

    todays.appendChild(clone);
  });
}

function displayServingDataCstm(data) {
  const serving = document.querySelector(".servingnowcstm");
  const tempServingCstm = document.querySelector(".serving");

  data.serving.forEach((elm) => {
    const clone = tempServingCstm.cloneNode(true).content;
    clone.querySelector(".servingnow").textContent = elm.id;

    serving.appendChild(clone);
  });
}

function updateQueueDataCstm(data) {
  document.querySelector(
    ".inlinecstm"
  ).textContent = `QUEUE: ${data.queue.length}`;

  const queueSize = [];
  if (document.querySelectorAll(".baren").length < 18) {
    queueSize.push(data.queue.length);
  } else {
    let elements = document.getElementsByClassName("baren");
    let required = elements[0];
    required.remove();
    queueSize.push(data.queue.length);
  }

  const bar = document.querySelector(".barscstm");
  const bartemp = document.querySelector(".thequeue");

  queueSize.forEach((elm) => {
    const klon = bartemp.cloneNode(true).content;
    klon.querySelector(".baren").style.height =
      data.queue.length.toString() + "0px";

    bar.appendChild(klon);
  });
}

function updateOntapDataCstm(data) {
  data.taps.forEach((elm) => {
    const elmBeerCstm = document.querySelector(
      `.tapwrapper[data-name="${elm.beer}"]`
    );
    elmBeerCstm.querySelector(".name").textContent = elm.beer;
  });
}

function updateServingDataCstm(data) {
  const serving = document.querySelector(".servingnowcstm");
  const tempServingCstm = document.querySelector(".serving");
  serving.innerHTML = "";

  data.serving.forEach((elm) => {
    const clone = tempServingCstm.cloneNode(true).content;
    clone.querySelector(".servingnow").textContent = elm.id;

    serving.appendChild(clone);
  });
}

setInterval(function () {
  fetchData(false);
}, 10000);

countdown();

function countdown() {
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
    document.getElementById("hours").innerHTML = hh;
    document.getElementById("minutes").innerHTML = mm;
    document.getElementById("seconds").innerHTML = ss;
    document.getElementById("hourscstm").innerHTML = hh;
    document.getElementById("minutescstm").innerHTML = mm;
    document.getElementById("secondscstm").innerHTML = ss;
    setTimeout(tick, 1000);
  }

  tick();
}

document.querySelector(".loginbutton").addEventListener("click", clickLoginNav);

function clickLoginNav() {
  document
    .querySelector(".loginbutton")
    .removeEventListener("click", clickLoginNav);
  document.querySelector(".forcustomers").classList.add("hidden");
  document.querySelector(".login").classList.remove("hidden");

  loginForm();
}

function loginForm() {
  const loginForm = document.getElementById("login-form");
  const loginButton = document.getElementById("login-form-submit");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "manager" && password === "manager") {
      document.querySelector(".login").classList.add("hidden");
      document.querySelector(".forstaff").classList.remove("hidden");
      document.querySelector(".loginbutton").textContent = "Log out";
      document.querySelector(".addwhenloggedin").textContent =
        "Hello, Manager!";
    } else {
      alert("Login information not correct");
    }
  });

  document.querySelector(".loginbutton").addEventListener("click", logOut);
}

function logOut() {
  document.querySelector(".addwhenloggedin").textContent = "";
  document.querySelector(".loginbutton").removeEventListener("click", logOut);
  document.querySelector(".forstaff").classList.add("hidden");
  document.querySelector(".forcustomers").classList.remove("hidden");
  document.querySelector(".login").classList.add("hidden");
  document.querySelector(".loginbutton").textContent = "Login";

  document
    .querySelector(".loginbutton")
    .addEventListener("click", clickLoginNav);
}
