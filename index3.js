document.getElementById('generateButton').addEventListener('click', () => {
    const historicalData = [
      [1, 2, 3, 4, 5, 6, 7],
      [2, 3, 4, 5, 6, 7, 8],
      [3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 10]
    ];
  
    const countOccurrences = (data) => {
      const counts = {};
      data.forEach(draw => {
        draw.forEach(number => {
          counts[number] = (counts[number] || 0) + 1;
        });
      });
      return counts;
    };
  
    const calculateProbabilities = (counts, totalDraws) => {
      const probabilities = {};
      for (let number in counts) {
        probabilities[number] = counts[number] / totalDraws;
      }
      return probabilities;
    };
  
    const numberCounts = countOccurrences(historicalData);
    const totalDraws = historicalData.length * historicalData[0].length;
    const numberProbabilities = calculateProbabilities(numberCounts, totalDraws);
  
    const weightedRandom = (probabilities) => {
      let sum = 0;
      let r = Math.random();
  
      let total = Object.values(probabilities).reduce((acc, val) => acc + val, 0);
      if (total !== 1) {
        console.error("The sum of probabilities must equal 1. Current sum:", total);
        return null;
      }
  
      for (let number in probabilities) {
        sum += probabilities[number];
        if (r <= sum) {
          return parseInt(number);
        }
      }
  
      console.error("No number was selected. Check the probabilities.");
      return null;
    };
  
    let numbers = [];
    for (let i = 0; i < 5; i++) {
      let randomNumber;
      do {
        randomNumber = weightedRandom(numberProbabilities);
      } while (numbers.includes(randomNumber));
      numbers.push(randomNumber);
    }
  
    const numbersList = document.getElementById('numbersList');
    numbersList.innerHTML = '';
    numbers.forEach(number => {
      const li = document.createElement('li');
      li.textContent = number;
      numbersList.appendChild(li);
    });
  
    console.log("Generated numbers:", numbers);
  });