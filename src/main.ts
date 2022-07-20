import './style.css'

type Car = {

  id: number,
  make: string,
  model: string,
  year:string,
  bodytype: string,
  fuel: string,
  image:string,
}
const cars: Car[] = [
  {
   
  id: 1,
  make: "Jaguar",
  model: "XJ6",
  year: "1990",
  bodytype: "sedan",
  fuel: "gasoline",
  image: "https://cdn.motor1.com/images/mgl/vvM34/s1/4x3/jaguar-xj6-einzelstuck-mit-musik.webp"
  },
];

type State = {
  byManyfacture: string;
  byBodyType: string,
  byFuel: string,
  cars: Car[]
};

let state: State = {
  byManyfacture: "",
  byBodyType: "",
  byFuel: "",
  cars: [],
};
let mainEl = document.querySelector("main")

function renderHeader() {
  let h1El = document.createElement("h1");
  h1El.textContent = "CarTrader";

  let Header = document.createElement("header");
  Header.classList.add("h1");

  let searchForm = document.createElement("form");
  searchForm.type = "search-car-form";
  searchForm.autocomplete = "off";
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    state.byManyfacture = searchForm["search-car"].value;
    render();
  });

  let searchLabel = document.createElement("label");
  searchLabel.htmlFor = "search-cars";
  searchLabel.textContent = "Search Cars:";

  let searchInput = document.createElement("input");
  searchInput.type = "search-cars";
  searchInput.name = "search-cars";
  searchForm.append(searchLabel, searchInput);
  Header.append(searchForm);
  mainEl?.append(h1El, Header);
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
