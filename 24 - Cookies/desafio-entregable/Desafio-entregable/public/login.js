document.querySelector("#loginForm").addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    fetch(`/login?username=${username}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())
    .then(data=>{
        if (data.status === "ok"){
            alert("Login correcto, ya puede proceder a /content");
        } else {
            alert("Login fallido, username inválido");
        }
    });
})