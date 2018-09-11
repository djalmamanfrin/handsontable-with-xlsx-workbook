var data = [
    ["", "Tesla", "Volvo", "Toyota", "Honda"],
    ["2017", 10, 11, 12, 13],
    ["2018", 20, 11, 14, 13],
    ["2019", 30, 15, 12, 13]
];

var options = {
    data: data,
    rowHeaders: true,
    colHeaders: true
};

var container = document.getElementById('example');
var hot = new Handsontable(container, options);