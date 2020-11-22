const App = (() => {

    const userList =  document.querySelector('.user-list')
    const addPerson = document.querySelector('.add-person')
    let data = []

    const eventListeners = () => {
        addPerson.addEventListener('click', getRandomPerson)
    }

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

    // -- Adds users to object array
    const addData = (obj) => {
        data.push(obj)
        render();
    }

    // --Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    function formatMoney(number) {
        return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }

    const init = () => {
        render();
        eventListeners();
    }

    // --Render the DOM
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
        init,
        getRandomPerson
    }
})();

App.init();
App.getRandomPerson();
App.getRandomPerson();
App.getRandomPerson();