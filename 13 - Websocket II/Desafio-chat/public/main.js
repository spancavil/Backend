let socket = io.connect();

socket.on('messages', (data)=> {
    render(data);
})

function render(data) {
    var html = data.map((elem, index) => {
        return (`<div>
            <strong>${elem.author}</strong>
            <em>${elem.text}</em>
            </div>
        `);
    }).join(" ");

    // inyecta el html en el elemento con id messages
    document.getElementById("messages").innerHTML = html;
}

document.querySelector('#formulario').addEventListener('submit', (e)=>{
    e.preventDefault();
    // crea un mensaje y lo emite para ser enviado al servidor
    var mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = '';
    document.getElementById('texto').focus();

    return false;
})