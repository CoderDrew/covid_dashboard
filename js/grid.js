let DATA_URL_STATE = 'https://covidtracking.com/api/states';

//const BASE_URL = '../../../js/data.json';

// let the grid know which columns and what data to use
var gridOptions = {
  columnDefs: [
    { headerName: 'State', field: 'state' },
    { headerName: 'Positive', field: 'positive' },
    { headerName: 'Negative', field: 'negative' },
    { headerName: 'Recovered', field: 'recovered' },
    {
      headerName: 'Hospitalized Currently',
      field: 'hospitalizedCurrently',
    },
    {
      headerName: 'Hospitalized Cumulative',
      field: 'hospitalizedCumulative',
    },
    { headerName: 'In Icu Currently', field: 'inIcuCurrently' },
    { headerName: 'In Icu Cumulative', field: 'inIcuCumulative' },
    {
      headerName: 'On Ventilator Currently',
      field: 'onVentilatorCurrently',
    },
    {
      headerName: 'On Ventilator Cumulative',
      field: 'onVentilatorCumulative',
    },
  ],
  rowData: [],
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    unSortIcon: true,
  },
  suppressMenuHide: true,
  autoGroupColumnDef: {
    flex: 1,
  },
  pagination: true,
  paginationPageSize: 100,
};

function currencyFormatter(params) {
  return '$' + formatNumber(params.value);
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function onBtnExport() {
  gridOptions.api.exportDataAsCsv();
}

function onFilterTextBoxChanged() {
  gridOptions.api.setQuickFilter(
    document.getElementById('filter-text-box').value
  );
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#grid');
  new agGrid.Grid(gridDiv, gridOptions);
});

agGrid.simpleHttpRequest({ url: DATA_URL_STATE }).then(function (data) {
  gridOptions.api.setRowData(data);
});
