const { normalize, schema } = require('normalizr');
const fs = require('fs');
const data = require('./empresa').empresa;

const empleadosschema = new schema.Entity('empleados');


const schemaEmp = new schema.Entity('empresa',{
    gerente: empleadosschema,
    encargado: empleadosschema,
    empleados: [empleadosschema]
});

const normalizedEmpresa = normalize(data, schemaEmp);

fs.writeFileSync('./normalizedEmpresa' , JSON.stringify(normalizedEmpresa, null, '\t'));
console.log(normalizedEmpresa);