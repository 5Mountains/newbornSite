
// start hide and show the menu
const panelItem = document.querySelectorAll('.menu-item'),
    active = document.getElementsByClassName('open');

Array.from(panelItem).forEach(function (item, i, panelItem) {
    // panelItem.preventDefault();
    item.addEventListener('click', function (e) {
        if (active.length > 0 && active[0] !== this) // если есть активный элемент, и это не тот по которому кликнули
            active[0].classList.remove('open'); // убрать класс panel-active

        // изменить состояние класса panel-active на текущем элементе: добавить если не было, убрать если было.
        this.classList.toggle('open');
    });
});

document.addEventListener('click', function(event) {
    panelItem.forEach((item)=>{
        if (!item.contains(event.target)) item.classList.remove('open');
    });
});

// end hide and show the menu

// Start fixed menu

    window.onscroll = function showHeader (){
        const nav = document.querySelector('.navigation');
        const menu = document.querySelector('.menu');

        if (pageYOffset > 208) {
            nav.classList.add('fixed');
            menu.classList.add('moved');
        } else {
            nav.classList.remove('fixed');
            menu.classList.remove('moved');
        }
    }

// End fixed menu


// start mobile menu

const navBtn = document.querySelector('.nav-btn');

navBtn.addEventListener('click', ()=>{
    let navMenu = document.querySelector('.menu');
    let burger = document.querySelector('.burger-line');
    navMenu.classList.toggle('show');
    burger.classList.toggle('active');
})

// end mobile menu
