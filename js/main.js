let DATA_URL_STATE = 'https://covidtracking.com/api/states';
let DATA_URL_US = 'http://covidtracking.com/api/us';

totalInfectedChart();
totalPosNegChart();
totalHospital();
totalICU();

async function totalInfectedChart() {
  const data = await getDataStates();

  const { state, positive } = data;
  const ctx = document.getElementById('totalInfectedChart');

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: state,
      datasets: [
        {
          label: 'COVID-19 Total infected',
          data: positive,
          fill: false,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  document.getElementById(
    'dateUpdated'
  ).textContent = `Updated: ${getTodayDate()}`;
}

async function totalPosNegChart() {
  const data = await getDataUS();

  const { posNeg, labels } = data;
  const ctx = document.getElementById('totalUS');

  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'COVID-19 Total infected',
          data: posNeg,
          fill: false,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });

  document.getElementById(
    'dateUpdated'
  ).textContent = `Updated: ${getTodayDate()}`;
}

async function totalHospital() {
  const data = await getDataUS();

  const { hospitalLabels, totalHospital } = data;
  const ctx = document.getElementById('totalHospital');

  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: hospitalLabels,
      datasets: [
        {
          label: 'COVID-19 Total infected',
          data: totalHospital,
          fill: false,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });

  document.getElementById(
    'dateUpdated'
  ).textContent = `Updated: ${getTodayDate()}`;
}

async function totalICU() {
  const data = await getDataUS();

  const { inICU, inICULabels } = data;
  const ctx = document.getElementById('totalICU');

  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: inICULabels,
      datasets: [
        {
          label: 'COVID-19 Total infected',
          data: inICU,
          fill: false,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {},
  });

  document.getElementById(
    'dateUpdated'
  ).textContent = `Updated: ${getTodayDate()}`;
}

function getTodayDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  return today;
}

async function getDataStates() {
  const response = await fetch(DATA_URL_STATE);
  const data = await response.json();

  let state = data.map((a) => a.state);
  let positive = data.map((a) => a.positive);

  return { state, positive };
}

async function getDataUS() {
  const response = await fetch(DATA_URL_US);
  const data = await response.json();

  let positive = data.map((a) => a.positive);
  let negative = data.map((a) => a.negative);
  let hospitalizedCurrently = data.map((a) => a.hospitalizedCurrently);
  let hospitalizedCumulative = data.map((a) => a.hospitalizedCumulative);
  let inIcuCurrently = data.map((a) => a.inIcuCurrently);
  let inIcuCumulative = data.map((a) => a.inIcuCumulative);
  let onVentilatorCurrently = data.map((a) => a.onVentilatorCurrently);
  let onVentilatorCumulative = data.map((a) => a.onVentilatorCumulative);

  const labels = ['Positive', 'Negative'];
  const posNeg = [];

  const hospitalLabels = ['Cumulative', 'Current'];
  const totalHospital = [];

  const inICULabels = ['In ICU Currently', 'in ICU Cumulative'];
  const inICU = [];

  inICU.push(inIcuCurrently);
  inICU.push(inIcuCumulative);

  totalHospital.push(hospitalizedCumulative);
  totalHospital.push(hospitalizedCurrently);

  posNeg.push(positive);
  posNeg.push(negative);

  return {
    posNeg,
    labels,
    hospitalLabels,
    totalHospital,
    inICU,
    inICULabels,
  };
}
