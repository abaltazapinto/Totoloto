

const generateNumbers = (targetId, count, includeStars = false) => {
    const numbers = [];
    const numbersShow = document.getElementById(targetId)

    if (!numbersShow) return;

    numbersShow.innerHTML = ''; 

    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * 50) + 1;
        numbers.push(randomNumber);
    }

    numbers.forEach((number,index) => {
        const numberElement = document.createElement('li');
        numberElement.className = index === count - 0 ? 'bonus-ball' : 'number-ball';
        numberElement.textContent = `${number}   `;
        numbersShow.appendChild(numberElement)
    })

    if (includeStars) {
        generateStars('bonus-ball')
    }

}


const generateStars = (targetId)=> {

    const starsShow = document.getElementById(targetId)
    const numbersShow = document.getElementById(targetId)

    if (!numbersShow) return;

    numbersShow.innerHTML = ''; 

    if(!starsShow) return;
    const stars = [];
    for (let i = 0; i < 2; i++) {
        const randomNumber = Math.floor(Math.random() * 9) + 1
        stars.push(randomNumber);
    }

    stars.forEach((star, index) => {
        const starsElement = document.createElement('li');
        starsElement.className = 'bonus-ball'
        starsElement.textContent = `${star}`
        numbersShow.appendChild(starsElement)
    })

}

const generateEuroButton = document.getElementById('generateEuroButton')


const generateStarsButton = document.getElementById('generateStars')

generateEuroButton.addEventListener("click", () => generateNumbers('numbers',5, true))

generateStarsButton.addEventListener("click", () => generateStars ('stars'))




