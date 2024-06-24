function renderInterests() {
    const interestList = document.querySelector(".list ul");
    const storedInterests =
        JSON.parse(localStorage.getItem("meus-interesses")) || [];

    interestList.innerHTML = "";

    storedInterests.forEach((interest) => {
        const listItem = document.createElement("li");
        listItem.textContent = interest;
        interestList.appendChild(listItem);
    });
}

function addInterest() {
    const input = document.querySelector(".form input");
    const newInterest = input.value.trim();

    if (newInterest !== "") {
        let storedInterests =
            JSON.parse(localStorage.getItem("meus-interesses")) || [];

        storedInterests.push(newInterest);

        localStorage.setItem(
            "meus-interesses",
            JSON.stringify(storedInterests)
        );

        input.value = "";

        renderInterests();
    }
}

const input = document.querySelector('.form input')

input.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addInterest()
    }
})

function clearInterests() {
    localStorage.removeItem("meus-interesses");
    renderInterests();
}

const addButton = document.querySelector(".button-add");
addButton.addEventListener("click", addInterest);

const clearButton = document.querySelector(".button-clear");
clearButton.addEventListener("click", clearInterests);

function updateNews() {
    
    const newsTitleElement = document.querySelector(".title-news-today");

    fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release")
        .then((response) => response.json())
        .then((data) => {
            
            const randomIndex = Math.floor(Math.random() * data.items.length);
            const newsTitle = data.items[randomIndex].titulo;
            newsTitleElement.textContent = newsTitle;
        })
        .catch((error) => {
            console.error("Erro ao obter notícias do IBGE: ", error);
        });
}

updateNews();


setInterval(updateNews, 2000);

setInterval(renderInterests, 1000);

renderInterests();
