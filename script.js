"use strict";

const searchBtn = document.querySelector(".search-btn");
const filterBtn = document.querySelector(".filter");
const contentData = document.querySelector("#country-container");
const informationWrap = document.querySelector(".information-wrap");
const contentWrap = document.querySelector(".content-wrap");
const informationCard = document.querySelector(".info-card");
const countryInfoWarp = document.querySelector(".country-data");
const borderContries = document.querySelector(".border");
const btnBack = document.querySelector(".backbtn");
const continentsBtn = document.querySelectorAll(".continents");
const modeBtn = document.querySelector(".modes");
let countryDataList;
class App {
  constructor() {
    this._getCountryInfo();
    modeBtn.addEventListener("click", this._changeMode.bind(this));
    searchBtn.addEventListener("click", this._getSearchData.bind(this));
    filterBtn.addEventListener("click", this._filter);
    contentData.addEventListener("click", this._selectCard.bind(this));
    btnBack.addEventListener("click", this._backBtnClick.bind(this));
    continentsBtn.forEach((btn) => {
      btn.addEventListener("click", this._filterRegion.bind(this));
    });
  }

  _changeMode(e) {
    const modeImg = document.querySelector(".mode-img");
    const modeTxt = document.querySelector(".mode-txt");
    const searchBtn = document.querySelector(".search-btn");
    modeImg.classList.toggle("chanageImg");
    const root = document.querySelector(":root");
    // const rootColor = getComputedStyle(root);
    const currentMode = e.target.closest(".modes").lastElementChild.textContent;
    if (currentMode === "Light mode") {
      root.style.setProperty("--bg-dark-color", "rgb(255, 255, 255");
      root.style.setProperty("--content-dark-color", "rgb(255, 255, 255)");
      root.style.setProperty("--back-btn-bg", "rgb(255, 255, 255)");
      root.style.setProperty("--bg-mode-text", "rgb(0, 0, 0)");
      modeTxt.textContent = "Dark mode";
      searchBtn.style.backgroundImage =
        "url('./search-magnifying-glass-svgrepo-com.svg')";
    }
    if (currentMode === "Dark mode") {
      root.style.setProperty("--bg-dark-color", "rgb(40, 50, 60)");
      root.style.setProperty("--content-dark-color", "rgb(49, 64, 78)");
      root.style.setProperty("--back-btn-bg", "rgb(60, 70, 80)");
      root.style.setProperty("--bg-mode-text", "rgb(255, 255, 255)");
      modeTxt.textContent = "Light mode";
      searchBtn.style.backgroundImage = "url('./search-svgrepo-com.svg')";
    }
  }
  _loadAllData() {
    countryDataList.forEach((element) => {
      if (element.name) {
        const { name, flag, population, region, capital } = element;
        const html = `<div class="card-wrap">
                  <div class="card-img"><img src="${flag}" alt="Indian flage"></div>
                  <div class="card-discription">
                      <div class="country-heading">
                          <h3>${name}</h3>
                      </div>
                      <div class="country-discription">
                          <ul>
                              <li>Population: <span>${population}</span></li>
                              <li>Region: <span>${region}</span></li>
                              <li>Capital: <span>${
                                capital || "No data found"
                              }</span></li>
                          </ul>
                      </div>
                  </div>
              </div>`;

        contentData.insertAdjacentHTML("beforeend", html);
      }
    });
  }
  _getSearchData() {
    const userInput = document.getElementsByClassName("search-box")[0].value;
    if (!userInput) return;
    const userInputData = userInput
      .toLowerCase()
      .split(" ")
      .map((val) => val.slice(0, 1));
    const newUserInput = userInput
      .toLowerCase()
      .split(" ")
      .map((val) => val.slice(1));

    const finalUserInput = userInputData
      .map((inp, key) => inp.toUpperCase() + newUserInput[key])
      .join(" ");
    contentData.innerHTML = "";
    this._loadData(finalUserInput);
  }

  _getCountryInfo() {
    const getCountry = async function () {
      try {
        const countryData = await fetch("./data.json");
        countryDataList = await countryData.json();
        if (countryDataList) {
          countryDataList.forEach((element) => {
            if (element.name) {
              const { name, flag, population, region, capital } = element;
              const html = `<div class="card-wrap">
                          <div class="card-img"><img src="${flag}" alt="Indian flage"></div>
                          <div class="card-discription">
                              <div class="country-heading">
                                  <h3>${name}</h3>
                              </div>
                              <div class="country-discription">
                                  <ul>
                                      <li>Population: <span>${population}</span></li>
                                      <li>Region: <span>${region}</span></li>
                                      <li>Capital: <span>${
                                        capital || "No data found"
                                      }</span></li>
                                  </ul>
                              </div>
                          </div>
                      </div>`;

              contentData.insertAdjacentHTML("beforeend", html);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCountry();
  }

  _loadData(country) {
    document.getElementsByClassName("search-box")[0].value = "";
    countryDataList.forEach((element) => {
      if (element.name === country) {
        const { name, flag, population, region, capital } = element;
        const html = `<div class="card-wrap">
                    <div class="card-img"><img src="${flag}" alt="Indian flage"></div>
                    <div class="card-discription">
                        <div class="country-heading">
                            <h3>${name}</h3>
                        </div>
                        <div class="country-discription">
                            <ul>
                                <li>Population: <span>${population}</span></li>
                                <li>Region: <span>${region}</span></li>
                                <li>Capital: <span>${
                                  capital || "No data found"
                                }</span></li>
                            </ul>
                        </div>
                    </div>
                </div>`;

        contentData.insertAdjacentHTML("beforeend", html);
      }
    });
  }

  _filter(e) {
    const element = e.target.closest(".filter").lastElementChild;
    element.classList.toggle("hidden");
  }

  _filterRegion(e) {
    const region = e.target.textContent;
    if (contentData.firstElementChild) {
      contentData.innerHTML = "";
    }
    countryDataList.forEach((val) => {
      if (val.region === region) {
        this._loadData(val.name);
      }
    });
  }

  _validateData(...data) {
    let validData = [];
    for (const [_, val] of Object.entries(data[0])) {
      validData.push(val || "No data found");
    }
    const [
      name,
      flag,
      nativeName,
      topLevelDomain,
      population,
      region,
      subregion,
      capital,
      currency,
      language,
    ] = [...validData];
    const countryImage = `<div class="country-image"><img
        src="${flag}" alt="${name} flag"></div>`;
    const countryInfo = `<h3 class='info-head'>${name}</h3>
    <ul class='information-list'>
        <li>Native Name: <span>${nativeName}</span></li>
        <li>Top Level Domain: <span>${topLevelDomain}</span></li>
        <li>Population: <span>${population}</span></li>
        <li>Currencies: <span>${currency}</span></li>
        <li>Region: <span>${region}</span></li>
        <li>Sub Region: <span>${subregion}</span></li>
        <li>Languages: <span>${language.join(", ")}</span></li>
        <li>Capital: <span>${capital}</span></li>
    </ul>`;

    informationCard.insertAdjacentHTML("afterbegin", countryImage);
    countryInfoWarp.insertAdjacentHTML("afterbegin", countryInfo);
  }
  _getFullInfo(country) {
    const {
      name,
      flag,
      nativeName,
      topLevelDomain,
      population,
      region,
      subregion,
      capital,
      currencies,
      languages,
    } = country;

    const currency = currencies ? currencies[0].name : "No Data";
    const language = languages.flatMap((lang) => lang.name);

    this._validateData({
      name,
      flag,
      nativeName,
      topLevelDomain,
      population,
      region,
      subregion,
      capital,
      currency,
      language,
    });
  }
  _selectCard(e) {
    const cardElement =
      e.target.closest(".card-wrap").lastElementChild.firstElementChild
        .firstElementChild.textContent;

    if (!cardElement) return;

    countryDataList.forEach((element) => {
      if (element.name == cardElement) {
        this._getFullInfo(element);

        if (!element.borders) return;

        element.borders.forEach((border) => {
          this._getCountryUsingCode(border);
        });
      }
    });
    contentWrap.classList.add("hidden");
    informationWrap.classList.remove("hidden");
    // this._getFullInfo("India");
  }

  _getCountryUsingCode(code) {
    const countryCode = async function () {
      try {
        const countryName = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        const countryData = await countryName.json();
        const {
          name: { common },
        } = countryData[0];
        const borderList = `<li class='border-list'>${common}</li>`;
        borderContries.insertAdjacentHTML("beforeend", borderList);
      } catch (err) {
        console.log(err.message);
      }
    };
    countryCode();
  }

  _backBtnClick() {
    if (!contentWrap.classList.contains("hidden")) return;
    const imageData = document.querySelector(".country-image");
    imageData.remove();
    const informationhead = document.querySelector(".info-head");
    informationhead.remove();
    const listData = document.querySelector(".information-list");
    listData.remove();
    const borderList = document.querySelectorAll(".border-list");

    borderList.forEach((list) => {
      list.remove();
    });
    if (!borderContries.lastElementChild.classList.contains("border-head"))
      return;
    contentWrap.classList.remove("hidden");
    informationWrap.classList.add("hidden");
    contentData.innerHTML = "";
    this._loadAllData();
  }
}
const app = new App();
