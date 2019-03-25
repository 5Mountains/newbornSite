async function send(url, data) {
    const rawResponse = await fetch(url, { // '/api/mail'
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const content = await rawResponse.json();

    console.log(content, '- content from library')

    return  content
}