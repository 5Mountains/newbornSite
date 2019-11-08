// start modal window

const btnModal = document.querySelectorAll('.modal-btn'),
modal = document.querySelector('.modal'),
closeModal = document.querySelector('.modal-close-btn'),
closeModalBtn = document.getElementById('send-modal-from-btn');

btnModal.forEach(function(btn){
    btn.addEventListener('click', ()=>{
    modal.style.display = 'flex';
})
})

closeModal.addEventListener('click', ()=>{
modal.style.display = 'none';
})

window.addEventListener('click', (e)=>{
if(e.target == modal) {
    modal.style.display = 'none';
}
})

closeModalBtn.addEventListener('click', ()=>{
modal.style.display = 'none';
})
// end modal window