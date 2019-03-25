const log = console.log;
const form = document.querySelector('#form');
const name = form.querySelector('#name');
const email = form.querySelector('#email');
const phone = form.querySelector('#phone');
const text = form.querySelector('#text');

form.addEventListener('submit', (event) => {
    alert('ok')
    event.preventDefault();
    let data = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        text: text.value
    };
    log(data);
    send(data).then((res)=>{
        log(res);
        if (res.ok) clean();
    })
    
})

async function send(data) {
    const rawResponse = await fetch('/api/mail', {
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
        phone.value = '',
        text.value = ''
}