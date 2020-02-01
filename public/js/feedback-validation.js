const log = console.log;
const form = document.querySelector('#form');
const feedback = document.querySelector('#form');
const name = form.querySelector('#name');
const email = form.querySelector('#email');
const phone = form.querySelector('#phone') || {};
const text = form.querySelector('#text');
const type = form.querySelector('#type') || {};

// validations
let validName = (name) => /^([А-Яа-яA-Za-z- ]{2,500})$/.test(name);
let validEmail = (email) => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
let validPhone = (phone) => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(phone);
let validText = (text) => /^([А-Яа-яA-Za-z-0-9]{2,500})$/.test(text);

function validFeedback() {

    let isValid = true;

    if (validName(name.value)) {
        name.classList.remove('invalid');
        name.classList.add('valid');
    } else {
        isValid = false;
        name.classList.remove('valid');
        name.classList.add('invalid');
    }

    if (validEmail(email.value)) {
        email.classList.remove('invalid');
        email.classList.add('valid');
    }
    else {
        isValid = false;
        email.classList.remove('valid');
        email.classList.add('invalid');
    }

    if (validText(text.value)) {
        text.classList.remove('invalid');
        text.classList.add('valid');
    } else {
        isValid = false;
        text.classList.remove('valid');
        text.classList.add('invalid');
    }

    return isValid;
}

feedback.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = {
        type: type.value,
        name: name.value,
        email: email.value,
        text: text.value
    };

    if (validFeedback()) {
        send(data).then((res)=>{
            log(res);
            if (res.ok) clean();
        });    
        alert('Письмо может попасть Вам в спам.');
    } else {
        alert('Упс, колонки красного цвета заполнены не корректно!');
    }
   
});

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

    return content;
}

function clean() {
    name.value = '',
    email.value = '',
    phone.value = '',
    text.value = '';
}