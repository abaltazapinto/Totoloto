// import { inizializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
// import{ getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// const appSettings = "https://euromilhoes-cbeff-default-rtdb.europe-west1.firebasedatabase.app/"

// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const historicalDataInDB = ref(database, 'historicalData');

let historicalData = [
    [6 ,9 , 10, 30, 49], // (3,4) Friday 3rd May 2024
    [35, 36, 41, 42, 45],  // (6,11) Tuesday 7th May 2024
    [13, 28, 29, 44, 48], // (4,12) Friday 10th May 2024
    [9, 16, 23, 25, 32], // (7,9) Tuesday 14th May 2024 
    [18, 31, 32, 41, 46], // (1, 10) Friday 17th May 2024
    [11, 13, 14, 34, 48],  // (7, 9) Tuesday 21st May 2024
    [9, 12, 18, 22, 50], // (1, 3) Friday 24th May 2024
    [16, 18, 35, 36, 41], // (6, 7) Tuesday 28th May 2024
    [4, 716, 33, 24], // (7, 8) Friday 31st May 2024
    [6, 7, 9, 14, 43], // (3, 4) Tuesday 4th June 2024
    [15, 16, 26, 30, 37], // (5,8) Friday 7th June 2024
    [7, 15, 34, 45, 48], // (7, 9) Tuesday 11th June 2024 
    [2, 13, 16, 24, 32], // (1, 7) Friday 14th June 2024
    [3, 11, 33, 34, 36], // (1, 12) Tuesday 18th June 2024 
    [3, 4, 7, 11, 17], // (3, 12) Friday 21st June 2024
    
  ];
    // Count the occurrences of each number
    const countOccurrences = (data) => {
        var counts = {};
        data.forEach(draw => {
          draw.forEach(number => {
            counts[number] = (counts[number] || 0 ) +1;
          });
        });
        return counts;
    };
    
      const TotalCount = historicalData.length * historicalData[0].length;

      console.log("total count", TotalCount)
       

      console.log("count of occurrences", countOccurrences(historicalData))
  
      // Calculate the probabilities based on occurrences
      const calculateProbabilities = (counts, totalDraws) => {
        let probabilities = {};
        for (let number in counts) {
          probabilities[number] = counts[number] / totalDraws;
        }
        return probabilities;
      };
  
      const numberCounts = countOccurrences(historicalData);
      console.log("historicalData", historicalData)
      const totalDraws = historicalData[0].length * historicalData.length;
      const numberProbabilities = calculateProbabilities(numberCounts, totalDraws);
            
      console.log("Number counts:", numberCounts);
      console.log("Total draws:", totalDraws);

      // Function to generate a random number based on probabilities

      const weightedRandom = (probabilities) => {
        let sum = 0;
        let r = Math.random();

        // caltculate the total sum of the probabilities
        let total = Object.values(numberProbabilities).reduce((acc, curr) => acc + curr, 0);

        console.log("total", total)

        if (Math.abs(total - 1) > 0.00001) {
          console.error("The sum of probabilities must equal 1. Current sum:", total);
              // Normalize probabilities if needed
              for (let number in probabilities) {
                probabilities[number] /= total;
              }
          }
        
          for (let number in probabilities) {
            sum += (probabilities[number]);
            console.log(`number: ${number}, sum: ${sum}. r: ${r}`)
            if (r <= sum) {
              console.log("number", number)
              return parseInt(number);
            }            
          }
        
          console.error("No number was selected. Check the probabilities.");
          return null;
        };

        console.log("number of probabilities >", numberProbabilities);
        console.log("weighted random", weightedRandom(numberProbabilities));
        console.log("weighted random", weightedRandom(numberProbabilities));



const generateNumbers = (targetId, count, includeStars = false) => {
    const numbers = [];
    const numbersShow = document.getElementById(targetId)

    if (!numbersShow) return;

    numbersShow.innerHTML = ''; 

console.log("random number", weightedRandom(numberProbabilities))  

for (let i = 0; i < 5; i++) {
    let randomNumber;
    do {
        randomNumber = weightedRandom(numberProbabilities);
        }while (numbers.includes(randomNumber));
        numbers.push(randomNumber);
    }
    console.log("Generated numbers:", numbers);
    historicalData.push(numbers)

    // //firebase
    // const histoDataRef = database.ref('historialData');
    // histoDataRef.push(numbers)
    //   .then(() => {
    //     console.log("Data saved successfully to Firebase.", numbers);
    //   })
    //   .catch((error) => {
    //     console.error("Error saving data to Firebase:", error);
    //   });

    numbers.forEach((number,index) => {
        const numberElement = document.createElement('li');
        numberElement.className = index === count - 0 ? 'bonus-ball' : 'number-ball';
        numberElement.textContent = `${number}   `;
        numbersShow.appendChild(numberElement)
    })

    console.log("historicalData", historicalData)
    // if (includeStars) {
    //     generateStars('stars')
    // }

}



// const generateStars = (targetId)=> {

//     const starsShow = document.getElementById(targetId)
//     const numbersShow = document.getElementById(targetId)

//     if (!numbersShow) return;

//     numbersShow.innerHTML = ''; 

//     if(!starsShow) return;
//     const stars = [];
//     for (let i = 0; i < 2; i++) {
//         let randomNumber;
//         do {
//             randomNumber = Math.floor(Math.random() * 9) + 1;
//         } while (stars.includes(randomNumber));
//         stars.push(randomNumber);
//     }

//     stars.forEach((star, index) => {
//         const starsElement = document.createElement('li');
//         starsElement.className = 'bonus-ball'
//         starsElement.textContent = `${star}`
//         numbersShow.appendChild(starsElement)
//     })

// }

const generateStars = (targetId) => {
    const starsShow = document.getElementById(targetId);
    if (!starsShow) return;

    starsShow.innerHTML = ''; 

    // // const starCounts = countOccurrences(historicalData[5].map(draw => draw.slice(-1)));

    // // console.log("star counts", starCounts)
    // const starProbabilities = calculateProbabilities(starCounts, totalDraws);
    
    const stars = [];
    while (stars.length < 2) {
      let randomStar = weightedRandom(starProbabilities);
      if (!stars.includes(randomStar)) {
        stars.push(randomStar);
      }
    }

    stars.forEach((star, index) => {
      const starsElement = document.createElement('li');
      starsElement.className = 'bonus-ball';
      starsElement.textContent = `${star}`;
      starsShow.appendChild(starsElement);
    });
  };

const generateEuroButton = document.getElementById('generateEuroButton')

const generateStarsButton = document.getElementById('generateStars')

generateEuroButton.addEventListener("click", () => generateNumbers('numbers',5, true))

generateStarsButton.addEventListener("click", () => generateStars('stars'))

console.log("number of probabilities" ,numberProbabilities)