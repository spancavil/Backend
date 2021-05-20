const fs = require('fs');

async function readFile (){
    const contenido = await fs.promises.readFile('./info.txt');
    console.log(JSON.parse(contenido));
}

// readFile().then(contenido=>{
//     console.log(contenido);
// });

readFile();