'use strict';

let myContainer = document.querySelector('section');
let resultsButton = document.querySelector('#resultsButton');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let howManyTimesVoted = 0;
let maxNumberOfVotes = 25;

let indexArray = [];

let allOddDuck = [];


function OddDuck(name, fileExtension = 'jpeg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.score = 0;
  this.views = 0;
  allOddDuck.push(this);
}

new OddDuck('bag');
new OddDuck('banana');
new OddDuck('bathroom');
new OddDuck('boots');
new OddDuck('breakfast');
new OddDuck('bubblegum');
new OddDuck('chair');
new OddDuck('cthulhu');
new OddDuck('dog-duck');
new OddDuck('pen');
new OddDuck('pet-sweep');
new OddDuck('scissors');
new OddDuck('shark');
new OddDuck('sweep', 'png');
new OddDuck('tauntaun');
new OddDuck('unicorn');
new OddDuck('water-can');
new OddDuck('wine-glass');

function selectRandomOddDuck() {
  return Math.floor(Math.random() * allOddDuck.length);
}

function renderOddDuck() {
  while (indexArray.length < 6) {
    let ranNum = selectRandomOddDuck();
    if (!indexArray.includes(ranNum)) {
      indexArray.push(ranNum);
    }
  }
  let duck1 = indexArray.shift();
  let duck2 = indexArray.shift();
  let duck3 = indexArray.shift();

  image1.src = allOddDuck[duck1].src;
  image1.alt = allOddDuck[duck1].name;
  allOddDuck[duck1].views++;
  image2.src = allOddDuck[duck2].src;
  image2.alt = allOddDuck[duck2].alt;
  allOddDuck[duck2].views++;
  image3.src = allOddDuck[duck3].src;
  image3.alt = allOddDuck[duck3].alt;
  allOddDuck[duck2].views++;
}


function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  console.log(event.target.alt);
  howManyTimesVoted++;
  let clickedOddDuck = event.target.alt;

  for (let i = 0; i < allOddDuck.length; i++) {
    if (event.target.alt === allOddDuck[i].name) {
      console.log(allOddDuck[i]);
      allOddDuck[i].score++;
      break;
    }
  }
  if (howManyTimesVoted === maxNumberOfVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultsButton.className = 'clicks-allowed';
    resultsButton.addEventListener('click', renderChart);
  }else {
    renderOddDuck();
  }
  // console.log(allOddDuck);
}

function renderChart() {

  let duckNames = [];
  let duckViews = [];
  let duckScore = [];
  for (let i = 0; i < allOddDuck.length; i++) {
    duckNames.push(allOddDuck[i].name);
    duckViews.push(allOddDuck[i].views);
    duckScore.push(allOddDuck[i].score);
  }

  const data = {
    labels: duckNames,
    datasets: [
      {
        label: 'Number of Views',
        data: duckViews,
        backgroundColor: [
          '#966666',
        ],
        borderColor: [
          'rgb(100, 20, 20)',
        ],
        borderWidth: 1
      },
      {
        label: 'Number of Votes',
        data: duckScore,
        backgroundColor: [
          '#485F6C',
        ],
        borderColor: [
          '#243037',
        ],
        borderWidth: 1
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  let canvas = document.getElementById('myChart').getContext('2d');
  new Chart(
    canvas,
    config
  );
}



myContainer.addEventListener('click', handleClick);

renderOddDuck();
