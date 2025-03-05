import * as fs from 'node:fs'

let test = {
    id: 1,
    isAdmin: false


};

let user_json = JSON.stringify(test)

function fileHandler(){

    fs.appendFile('user_config.json', user_json, (err) => {
        if(err) throw err;
        console.log('Data has been added!');
    });
    
}
const data = fs.readFileSync('./user_config.json', 'utf8');
const jsonData = JSON.parse(data)
console.log(jsonData.id)
fileHandler()
