const historicalData = [
    [15, 20, 21, 38, 42, 6],
    [10, 14, 20, 28, 38, 6],
    [5, 10, 15, 20, 25, 6],
    // ... more data
  ];


    // Count the occurrences of each number
    const countOccurrences = (data) => {
        let counts = {};
        data.forEach(draw => {
          draw.forEach(number => {
            counts[number] = counts[number] ? counts[number] + 1 : 1;
          });
        });
        return counts;
      };
  
      // Calculate the probabilities based on occurrences
      const calculateProbabilities = (counts, totalDraws) => {
        let probabilities = {};
        for (let number in counts) {
          probabilities[number] = counts[number] / totalDraws;
        }
        return probabilities;
      };
  
      const numberCounts = countOccurrences(historicalData);
      const totalDraws = historicalData.length;
      const numberProbabilities = calculateProbabilities(numberCounts, totalDraws);
  
      // Function to generate a random number based on probabilities
      const weightedRandom = (probabilities) => {
        let sum = 0;
        let r = Math.random();
        for (let number in probabilities) {
          sum += probabilities[number];
          if (r <= sum) {
            return parseInt(number);
          }
        }
      };


const generateNumbers = (targetId, count, includeStars = false) => {
    const numbers = [];
    const numbersShow = document.getElementById(targetId)

    if (!numbersShow) return;

    numbersShow.innerHTML = ''; 

    // while (numbers.length < count) {
    //     let randomNumber = weightedRandom(numberProbabilities);
    //     if (!numbers.includes(randomNumber)) {
    //       numbers.push(randomNumber);
    //     }
    //   }

    for (let i = 0; i < 5; i++) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 50) + 1;
        }while (numbers.includes(randomNumber));
        numbers.push(randomNumber);
    }

    numbers.forEach((number,index) => {
        const numberElement = document.createElement('li');
        numberElement.className = index === count - 0 ? 'bonus-ball' : 'number-ball';
        numberElement.textContent = `${number}   `;
        numbersShow.appendChild(numberElement)
    })

    if (includeStars) {
        generateStars('stars')
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
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 9) + 1;
        } while (stars.includes(randomNumber));
        stars.push(randomNumber);
    }

    stars.forEach((star, index) => {
        const starsElement = document.createElement('li');
        starsElement.className = 'bonus-ball'
        starsElement.textContent = `${star}`
        numbersShow.appendChild(starsElement)
    })

}

// const generateStars = (targetId) => {
//     const starsShow = document.getElementById(targetId);
//     if (!starsShow) return;

//     starsShow.innerHTML = ''; 

//     const starCounts = countOccurrences(historicalData.map(draw => draw.slice(-1)));
//     const starProbabilities = calculateProbabilities(starCounts, totalDraws);
//     const stars = [];
//     while (stars.length < 2) {
//       let randomStar = weightedRandom(starProbabilities);
//       if (!stars.includes(randomStar)) {
//         stars.push(randomStar);
//       }
//     }

//     stars.forEach((star, index) => {
//       const starsElement = document.createElement('li');
//       starsElement.className = 'bonus-ball';
//       starsElement.textContent = `${star}`;
//       starsShow.appendChild(starsElement);
//     });
//   };

const generateEuroButton = document.getElementById('generateEuroButton')

const generateStarsButton = document.getElementById('generateStars')

generateEuroButton.addEventListener("click", () => generateNumbers('numbers',5, true))

generateStarsButton.addEventListener("click", () => generateStars ('stars'))