var file = document.querySelector('#file');

var toJson = function (workbook) {
    XLSX.SSF.load_table(workbook.SSF);
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],{header:1});
    var result = {};
    if(roa.length > 0) {
        result = roa;
    }
    return result;
};

var toTable = function (item, index) {
    var obj = {};
    var i = 0;
    for (var c in columns) {
        if (columns.hasOwnProperty(c)) {
            var col = columns[c];
            if(col.hasOwnProperty('data')) {
                obj[col.data] = item[i++];
            }
        }
    }
    return obj;
};

var handleFile = function (e) {
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(f);
    reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        var json = toJson(workbook);
        table.loadData(json.map(toTable));
    };
};

file.addEventListener("change", handleFile, false);