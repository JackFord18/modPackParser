const fs = require('fs');
const {JSDOM} = require("jsdom");

function constructList(error, documentContents){
    if(error){
        console.log("Error loading HTML file, please verify that you are inputting the exact name of the HTML file and that it is in the same folder as this script.");
        return;
    }

    let idList = [];
    let document = new JSDOM(documentContents).window.document;
    let tableEntryList = Array.from(document.body.getElementsByClassName('mod-list')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].children);

    console.log(tableEntryList);
    tableEntryList.forEach(tableEntry => (
        idList.push(extractID(tableEntry))
    ));
    
    return idList;
}

function writeFile(listToWrite){
    console.log(listToWrite);
    var fileStream = fs.createWriteStream("idList.txt");
    listToWrite.forEach(id => {
        fileStream.write(id);
    });
    fileStream.close();
}

function extractID(tableEntry){
    return tableEntry.children[2].getElementsByTagName('a')[0].innerHTML.split("=")[1] + ';';
}

function main(){
    var fileName = process.argv[2];
    fs.readFile(('./'+fileName), 'utf8', (error, documentContents) => {
        let listToWrite = constructList(error, documentContents);
        writeFile(listToWrite);
    });
}

main();