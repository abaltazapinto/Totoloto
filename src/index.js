import { inizializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import{ getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const appSettings = "https://euromilhoes-cbeff-default-rtdb.europe-west1.firebasedatabase.app/"

const app = initializeApp(appSettings);
const database = getDatabase(app);
const historicalDataInDB = ref(database, 'historicalData');

let historicalData = [
    [15, 20, 21, 38, 42],
    [10, 14, 20, 28, 38],
    [5, 10, 15, 20, 25],
    [1, 5, 10, 15, 20],
    [4, 18, 17, 19, 23]    // ... more data
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
          return null;
        }
        
          for (let number in probabilities) {
            sum += (1 - probabilities[number]);
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

    //firebase
    const histoDataRef = database.ref('historialData');
    histoDataRef.push(numbers)
      .then(() => {
        console.log("Data saved successfully to Firebase.", numbers);
      })
      .catch((error) => {
        console.error("Error saving data to Firebase:", error);
      });

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

// const generateStars = (targetId) => {
//     const starsShow = document.getElementById(targetId);
//     if (!starsShow) return;

//     starsShow.innerHTML = ''; 

//     const starCounts = countOccurrences(historicalData.map(draw => draw.slice(-2)));

//     console.log("star counts", starCounts)
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

console.log("number of probabilities" ,numberProbabilities)