const App = (() => {

    // --Cache the DOM
    const userList =  document.querySelector('.user-list')
    const addPersonEl = document.querySelector('.add-person')
    const doubleMoneyEl = document.querySelector('.double-money')
    const showMillionairesEl =document.querySelector('.show-millionaires')
    const sortByRichestEl = document.querySelector('.sort-richest')
    const alculateTotalEl = document.querySelector('.total-wealth')
    let data = []

    // --Event Listeners
    const eventListeners = () => {
        addPersonEl.addEventListener('click', getRandomPerson)
        doubleMoneyEl.addEventListener('click', doubleMoney)
        showMillionairesEl.addEventListener('click', showMillionaires)
        sortByRichestEl.addEventListener('click', sortByRichest)
        alculateTotalEl.addEventListener('click', calculateTotal)
    }

    // -- Creates random person by fetiching from API
    const getRandomPerson = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        const user = data.results[0]

        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        };
        addData(newUser)
    }

    // -- Adds person to object array
    const addData = (obj) => {
        data.push(obj)
        render();
    }

    // -- Double the wealth using MAP
    const doubleMoney = () => {
        data = data.map(item => {
            return {
                name: item.name,
                money: item.money*2
            }
        })
        render();
    }

    // -- Show only Millionaires on the list using Filter
    const showMillionaires = () => {
        data = data.filter(item => {
            if(item.money > 1000000) {
                return item
            }
        })
        render();
    }

    // -- Sort by Richest
    const sortByRichest = () => {
        data = data.sort((a,b) => b.money-a.money)
        render();
    }

    // -- Calculate total wealth
    const calculateTotal = () => {
        let elem = document.createElement("div")
        elem.classList.add('total')
        let result = data.reduce((accum, obj) => {
            return accum + obj.money
        }, 0)

        elem.innerHTML = `<strong>TOTAL:</strong> ${formatMoney(result)}`
        userList.appendChild(elem)
    }

    // --Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    function formatMoney(number) {
        return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }

    const init = () => {
        render();
        eventListeners();
    }

    // --Render the DOM using FOREACH
    const render = (providedData = data) => {
        let markup = '<h2><strong>Person</strong> Wealth</h2>';

        providedData.forEach( item => {
            markup += `
                <div class="person"><strong>${item.name}</strong> ${formatMoney(item.money)}</div>
            `
        })
        userList.innerHTML = markup;
    }

    return {
        init
    }
})();

App.init();