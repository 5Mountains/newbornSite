const log = console.log;
const form = document.querySelector('#form');
const name = form.querySelector('#name');
const email = form.querySelector('#password');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = {
        name: name.value,
        password: password.value
    };
    log(data);
    send(data).then((res)=>{
        log(res);
        if (res.ok){
            clean();
            window.localStorage.setItem('token', res.token)
        }

    })
    
})

async function send(data) {
    const rawResponse = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const content = await rawResponse.json();

    return  content
}

function clean() {
    name.value = '',
        email.value = '',
        password.value = ''
}