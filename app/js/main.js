const people = document.querySelector('.people');
const chat = document.querySelector('.chat');
const person = document.querySelector('.person');

const contacts = document.querySelector('.contacts');
const messages = document.querySelector('.messages');
const profile = document.querySelector('.profile');

people.addEventListener('click', ()=>{
    contacts.classList.add('active');
    messages.classList.remove('active');
    profile.classList.remove('active');
});

chat.addEventListener('click', ()=>{
    contacts.classList.remove('active');
    messages.classList.add('active');
    profile.classList.remove('active');
});

person.addEventListener('click', ()=>{
    contacts.classList.remove('active');
    messages.classList.remove('active');
    profile.classList.add('active');
});