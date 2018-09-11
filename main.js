var typeNumber = {
        pattern: '0.00',
        culture: 'pt-BR',
        thousandSepareted: false
    },
    validatorRentalCode = function (value, callback) {
        if (value && /^[\w]*$/.test(value)) {
            callback(true);
        } else {
            callback(false);
        }
    },
    justTwoDigits = function (value, callback) {
        if (value && /^[\d]{2}$/.test(value)) {
            callback(true);
        } else {
            callback(false);
        }
    },
    // collorSucess = "#739E73",
    // collorError = "#CC7878",
    // linhasProcessadas = 0,
    numInicialLinhasValidar = 30,
    blocked = true,
    div = document.querySelector('#handsontable');
// save = document.querySelector("#btn_enviar_dados_planilha"),

var colHeaders = [
    "Código da Locadora",
    "Valor Comissionável",
    "Alíquota de Comissão",
    "Total de Diarias",
    "Horas Extras",
];

var columns = [
    {data: 'cod_locadora', validator: validatorRentalCode, allowEmpty: false, allowInvalid: false},
    {data: 'valor_comissionavel', type: 'numeric', numericFormat: typeNumber, allowEmpty: false},
    {data: 'aliquota_rentcars', validator: justTwoDigits, allowEmpty: false, allowInvalid: false},
    {data: 'total_diarias', type: 'numeric', numericFormat: justTwoDigits, allowEmpty: false, allowInvalid: false},
    {data: 'horas_extras', type: 'time', timeFormat: 'hh:mm', correctFormat: true, allowEmpty: false},
];

var validateCells = function() {
    blocked = false;
    if (table) {
        if (table.countRows() < numInicialLinhasValidar) {
            table.validateCells();
        } else {
            table.validateRows(Array.from(new Array(numInicialLinhasValidar).keys()));
        }
    }
};

var options = {
    startRows: 0,
    columns: columns,
    stretchH: 'all',
    autoWrapRow: true,
    height: 545,
    afterLoadData: validateCells,
    minSpareRows: true,
    rowHeaders: true,
    colHeaders: colHeaders,
    readOnly: false,
    manualRowResize: true,
    manualColumnResize: true,
    contextMenu: ['copy', 'cut', 'remove_row', 'row_above', 'row_below'],
    language: 'pt-BR',
    cells: function () {
        var cellProperties = {};
        cellProperties.readOnly = (blocked === true);
        return cellProperties;
    }
};

var table = new Handsontable(div, options);