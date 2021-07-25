// inicializamos la conexion
const socket = io.connect();

const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

//Se renderiza la tabla utilizando una template de Handlebars
let renderTabla = Handlebars.compile(`<style>
.table td, .table th {
    vertical-align: middle;
}
h1 {
    color: blue;
}
hr {
    background-color: #ddd;
}
.jumbotron {
    min-height: 100vh;
}
</style>

<div class="jumbotron">
<h1>Vista de Productos</h1>
<br>

{{#if hayProductos}} 
    <div class="table-responsive">
        <table class="table table-dark">
            <tr> <th>Nombre</th> <th>Precio</th> <th>Foto</th></tr>
            {{#each productos}}
                <tr> <td>{{this.title}}</td> <td>{{this.price}}</td> <td><img width="50" src={{this.thumbnail}} alt="not found"></td> </tr>
            {{/each}}
        </table>
    </div>
{{else}}  
    <h3 class="alert alert-warning">No se encontraron productos</h3>
{{/if}}
</div>`);

//Recibo el evento content desde el server con los datos de los productos.
socket.on('content', ({hayProductos, productos}) => {
    console.log("Detecto un mensaje entrante desde el server!");
    let contenido = renderTabla({hayProductos, productos}); //Completamos los datos de la tabla con los datos recibidos desde el server
    document.querySelector("#tablaDinamica").innerHTML = contenido;
});

//Por cada submit se hace un evento
document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault(); //Prevenimos la recarga

    //Captura de datos
    const nombre = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    const thumb = document.querySelector("#thumb").value;
    objeto = {title: nombre, price: price, thumbnail: thumb};

    //Configuración de mi JSON para enviarlo a la ruta correspondiente utilizando fetch
    //Hay que configurar el content-type del tipo json, sino no lo toma el server.
    fetch('/api/productos/guardar',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
    })
    .then (()=> socket.emit("contentSent")) //Una vez hecho el post lo emitimos al server
    .catch((e)=> console.log("Ooops, error: ", e)); //Catch errors
})

socket.on('messages', (data)=> {
    console.log(data);
    //Armado del esquema (mismo que había en el back)
    const users = new schema.Entity('users', {}, {idAttribute: 'email'})

    const schemaMensaje = new schema.Entity('mensajes', {
        author: users
    }, {idAttribute: 'timestamp'})

    const schemaMensajes = new schema.Entity('allmensajes', {
        mensajes: [schemaMensaje]
    }, {idAttribute: "id"});
    //Denormalización de la data
    const denormalizedData = denormalize(data.result, schemaMensajes, data.entities)
    console.log(denormalizedData);
    document.getElementById('compresion').innerHTML = `Compresión: ${Math.round((JSON.stringify(data).length/JSON.stringify(denormalizedData).length) * 100)} %`;
    render(denormalizedData.mensajes);
})

function render(data) {
    console.log(data);
    if (data!== {}){
        var html = data.map((elem, index) => {
            return (`<div style="display: block">
                        <strong class='fw-bold text-primary' >${elem.author.email}</strong>
                        <span class='text-warning'>[${elem.timestamp}]</span>
                        <em class= 'fst-italic text-success'>${elem.text}</em>
                        <img src=${elem.author.avatar} style="width: 50px"></img>
                </div>
            `);
        }).join(" ");
        // inyecta el html en el elemento con id messages
        document.getElementById("messages").innerHTML = html;
    }

}

document.querySelector('#formulario').addEventListener('submit', (e)=>{
    e.preventDefault();
    fecha = (new Date()).toLocaleString();
    // crea un mensaje y lo emite para ser enviado al servidor
    var mensaje = {
        author: {
            email: document.getElementById('email').value,
            date: fecha,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('text').value,
        timestamp: fecha
    };
    console.log(mensaje);
    socket.emit('new-message', mensaje);
    document.getElementById('text').value = '';
    document.getElementById('text').focus();
    return false;
})