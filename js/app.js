const App = (() => {

    const init = () => {
        render();
    }

    const render = () => {
        console.log("rendering")
    }

    return {
        init
    }
})();

App.init();