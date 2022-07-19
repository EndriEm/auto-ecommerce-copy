import './style.css'

type Car = {
  years:number;
  makes:string;
  types:string;
}
const cars: Car[] = [
  {
    years:2020,
    makes:"Audi",
    types:"Convertible",
  },
];

type State = {
  byType: string;
  byYears: string,
  byMakes: string,
  cars: Car[]
};

let state: State = {
  byType: "",
  byYears: "",
  byMakes: "",
  cars: [],
};
let mainEl = document.querySelector("main")

function renderSearchBar() {
  let h1El = document.createElement("h1");
  h1El.textContent = "List of Cars";

  let searchBarHeader = document.createElement("header");
  searchBarHeader.classList.add("search-bar");

  let searchForm = document.createElement("form");
  searchForm.type = "search-car-form";
  searchForm.autocomplete = "off";
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    state.byType = searchForm["search-car"].value;
    render();
  });

  let searchLabel = document.createElement("label");
  searchLabel.htmlFor = "search-cars";
  searchLabel.textContent = "Search Cars:";

  let searchInput = document.createElement("input");
  searchInput.type = "search-cars";
  searchInput.name = "search-cars";
  searchForm.append(searchLabel, searchInput);
  searchBarHeader.append(searchForm);
  mainEl?.append(h1El, searchBarHeader);
}

function getCarsForTypes() {

  let filteredCars = state.cars.filter((car) => {
    return car.types.toLowerCase().includes(state.byType.toLowerCase());
  });
  return filteredCars;
}

function renderthecarlist() {
  let articleEl = document.createElement("article");

  let ulEl = document.createElement("ul");
  ulEl.classList.add("cars-list");
  for (let cars of getCarsForTypes()) {
    let liEl = document.createElement("li");
    let h2El = document.createElement("h2");
    h2El.textContent = cars.types;
    let makesEl = document.createElement("div");
    makesEl.className = "makes";
    makesEl.textContent = cars.makes;
    let yearsEl = document.createElement("section");
    yearsEl.classList.add("years");
    liEl.append(h2El, makesEl, yearsEl);
    ulEl.append(liEl);
  }
  articleEl.append(ulEl);
  mainEl?.append(articleEl);
}

function renderonesinglecar() {

}

function render() {

}
function listentoselectstateform() {

}

listentoselectstateform()
