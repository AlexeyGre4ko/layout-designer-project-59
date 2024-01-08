const people = document.querySelector('.people');
const chat = document.querySelector('.chat');
const person = document.querySelector('.person');

const contacts = document.querySelector('.contacts');
const messages = document.querySelector('.messages');
const profile = document.querySelector('.profile');

people.addEventListener('click', ()=>{
    contacts.classList.toggle('active');
    messages.classList.remove('active');
    profile.classList.remove('active');
});

chat.addEventListener('click', ()=>{
    contacts.classList.remove('active');
    messages.classList.toggle('active');
    profile.classList.remove('active');
});

person.addEventListener('click', ()=>{
    contacts.classList.remove('active');
    messages.classList.remove('active');
    profile.classList.toggle('active');
});