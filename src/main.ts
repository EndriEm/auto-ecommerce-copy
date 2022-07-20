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
type User = {
  firstName: string,
  lastName: string,
  id: string,
  password: string | number,
  posts: []
}
type State = {
  cars: Car[];
  users: User[];
  searchTerm: string;
  selectedCar: Car | null
  page: 'store' | 'item' | 'filtered'
  modal: 'search' | 'login' | ''
  total: number
};

const state: State = {
    cars: [],
    users: [],
    searchTerm: "",
    selectedCar: null,
    modal: '',
    page: 'store',
    total: 0
}

function renderFilteredCars() {
    let filteredCars = state.cars.filter(item => {
        return item.make.toLowerCase().includes(state.searchTerm.toLowerCase())
    })
    return filteredCars
  }

function renderSearchModal () {
    let mainEl = document.querySelector('main')

    let wrapperEl = document.createElement('div')
    wrapperEl.className = 'modal-wrapper'
  
    let containerEl = document.createElement('div')
    containerEl.className = 'modal-container'
  
    let closeButton = document.createElement('button')
    closeButton.textContent = 'X'
    closeButton.className = 'modal-close-button'
    closeButton.addEventListener('click', function () {
      state.modal = ''
      render()
    })

    let divEl = document.createElement('div')
    divEl.className = 'modal-search'
  
    let titleEl = document.createElement('h2')
    titleEl.textContent = 'Search your favourite car!'
  
    let formEl = document.createElement('form')
    formEl.className = 'search-form'
    formEl.addEventListener('submit', function (event) {
        event.preventDefault()
        state.searchTerm = inputEl.value
        state.page = 'filtered'
        state.modal = ''
        render()
    })

    let inputEl = document.createElement('input')
    inputEl.placeholder = 'Search...'
    inputEl.className = 'search-input'

    formEl.append(inputEl)
    divEl.append(titleEl, formEl)
    containerEl.append(closeButton, divEl)
    wrapperEl.append(containerEl)
    mainEl.append(wrapperEl)
  }

  
function renderProfileModal () {
    let mainEl = document.querySelector('main')

    let wrapperEl = document.createElement('div')
    wrapperEl.className = 'modal-wrapper'
  
    let containerEl = document.createElement('div')
    containerEl.className = 'modal-container'
  
    let closeButton = document.createElement('button')
    closeButton.textContent = 'X'
    closeButton.className = 'modal-close-button'
    closeButton.addEventListener('click', function () {
      state.modal = ''
      render()
    })
  
    let titleEl = document.createElement('h2')
    titleEl.textContent = 'Register'
  
    let formEl = document.createElement('form')
    formEl.className = 'register-form'
    formEl.addEventListener('submit', function (event) {
        event.preventDefault()
        fetch('http://localhost:4999/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: inputNameEl.value,
                id: inputIdEl.value,
                password: inputPasswordEl.value,
                bag: []
        })
    }).then(response => response.json())
    .then(user => {
        state.users.push(user)
        state.modal = ''
        render()
    })
})
    
    let Name = document.createElement('a')
    Name.textContent = 'Your Name:'
    let inputNameEl = document.createElement('input')
    inputNameEl.placeholder = 'Name...'
    inputNameEl.className = 'search-input'

    let id = document.createElement('a')
    id.textContent = 'Your Email:'
    let inputIdEl = document.createElement('input')
    inputIdEl.placeholder = 'Email...'
    inputIdEl.className = 'search-input'

    let password = document.createElement('a')
    password.textContent = 'Your Password:'
    let inputPasswordEl = document.createElement('input')
    inputPasswordEl.placeholder = 'Password...'
    inputPasswordEl.className = 'search-input'

    let submitButton = document.createElement('button')
    submitButton.textContent = 'Register'
    submitButton.className = 'submit-button'
    
  
    formEl.append(Name, inputNameEl, id, inputIdEl, password, inputPasswordEl, submitButton)
    containerEl.append(closeButton, titleEl, formEl)
    wrapperEl.append(containerEl)
    mainEl.append(wrapperEl)
  }

function getCars(){
    fetch('http://localhost:4999/cars')
    .then(res => res.json())
    .then(data => {
        state.cars = data
        render()
    })
}

function renderSelectedCarsPage(){
    let mainEl = document.querySelector('main')
    let selectedCar = state.cars

    let divEl = document.createElement('div')
    divEl.className = 'selected-car'

    let imgEl = document.createElement('img')
    imgEl.src = selectedCar.image
    imgEl.alt = selectedCar.make
    imgEl.width = 500


    let infoEl = document.createElement('div')
    infoEl.className = 'selected-car-info'

    let h3El = document.createElement('h3')
    h3El.innerText = selectedCar.make
    h3El.className = 'selected-car-name'

    let priceEl = document.createElement('div')
    priceEl.className = 'selected-car-price'

    if(selectedCar?.dateEntered === "2021/07/10"){
        let pEl = document.createElement('p')
        pEl.innerText = `New!`
        pEl.className = "recently-added"
        priceEl.append(pEl)
    }

   
    infoEl.append(priceEl ,h3El, buttonEl)
    divEl.append(imgEl, infoEl)
    mainEl.append(divEl)
        
}


function render(){
    let mainEl = document.querySelector('main')
    mainEl.innerHTML = ''

  
    let searchEl = document.querySelector('.search-bar')
    searchEl.addEventListener('click', function(){
        state.modal = 'search'
        render()
    })

    let loginEl = document.querySelector('.log-in')
    loginEl.addEventListener('click', function(){
        state.modal = 'login'
        render()
    })


    if (state.modal === 'search') renderSearchModal()
    if (state.modal === 'login') renderProfileModal()

    if(state.page === 'item'){
        renderSelectedCarPage()
    } else{

    renderStoreCar()
    }
}

let logoEl = document.querySelector('.the-logo')
    logoEl?.addEventListener('click', function (){
    deselectCar()
    state.page = 'store'
    state.modal = ""
    state.searchTerm = ""
    render()
})


getStoreCars()
render()

