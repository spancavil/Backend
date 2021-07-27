document.querySelector("#loginForm").addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    fetch(`/login?username=${username}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
})