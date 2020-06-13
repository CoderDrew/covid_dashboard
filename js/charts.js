let DATA_URL_STATE = 'https://covidtracking.com/api/states';
let DATA_URL_US = 'http://covidtracking.com/api/us';

//

// Chart 1 options
const options1 = {
  chart: {
    height: 800,
    width: '100%',
    type: 'bar',
    background: '#f4f4f4',
    foreColor: '#333',
  },
  series: [
    {
      name: 'Deaths',
      data: [],
    },
  ],
  xaxis: {
    categories: [],
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  fill: {
    colors: ['#f44336'],
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: 'Covid Deaths by State',
    alight: 'center',
    margin: 20,
    offsetY: 20,
    style: {
      fontSize: '25px',
    },
  },
};
// Init Chart 1
const chart1 = new ApexCharts(document.querySelector('#chart1'), options1);

// Render Chart 1
chart1.render();

let optionsTotalUS = {
  series: [44, 55, 13, 43, 22],
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

const chartTotalUS = new ApexCharts(
  document.querySelector('#totalUS'),
  optionsTotalUS
);
chartTotalUS.render();

//GET DATA

const getData = () => {
  axios({
    method: 'GET',
    url: DATA_URL_STATE,
  })
    .then((response) => parseData(response.data))
    .catch((error) => console.log(error));
};

getData();

// Iterate through all the data
const parseData = (data) => {
  let states = data.map((a) => a.state);
  let death = data.map((a) => a.death);

  chart1Update(states, death);
};

function chart1Update(states, death) {
  chart1.updateSeries([
    {
      name: 'Deaths',
      data: death,
    },
  ]);

  chart1.updateOptions({
    xaxis: {
      categories: states,
    },
  });
}

// Event Method
document.querySelector('#chart1HZ').addEventListener('click', () =>
  chart1.updateOptions({
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  })
);

// Event Method
document.querySelector('#chart1VZ').addEventListener('click', () =>
  chart1.updateOptions({
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
  })
);
