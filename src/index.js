// import foo, { bar } from './foo';

// foo();
// bar();
// console.log('hello world'); 
import axios from 'axios';

const userList = document.querySelector('#user-list');
const carList = document.querySelector('#car-list');
const saleList = document.querySelector('#sales-list');

let users;

const renderUsers = (users) => {
    const userId = window.location.hash.slice(1);
    const html = users.map(user => `
        <li class='${ user.id === userId? 'selected' : ''}'>
            <a href='#${user.id}'>${user.name}</a>
        </li>
    `).join('');
    userList.innerHTML = html;
}

const renderCars = (cars) => {
    const html = cars.map(car => `
        <li>
            ${car.name}
        </li>
    `).join('');
    carList.innerHTML = html;
}

const renderSales = (sales) => {
    const html = sales.map(sale => `
        <li>
            ${sale.car.name}
            ${sale.extendedWarranty ? ' with warranty ': ''}
        </li>
    `).join('');
    saleList.innerHTML = html;
}

const init = async() => {
    try{
        //console.log(fetch('/api/users')) is a promise. Therefore,I need to add await in order to read it.
        // fetch('/api/users');
        
        // const response = await fetch('/api/users');
        
        // const response = await axios.get('/api/users');
        // const users = await response.json();

        users = (await axios.get('/api/users')).data;
        const cars = (await axios.get('/api/cars')).data;
        renderUsers(users);
        renderCars(cars);
        const userId = window.location.hash.slice(1);
        const url = `/api/users/${userId}/sales`;
        const sales = (await axios(url)).data;
        renderSales(sales);
    }
    catch(ex){
        console.log(ex);
    }
};

window.addEventListener('hashchange', async() => {
    const userId = window.location.hash.slice(1);
    const url = `/api/users/${userId}/sales`;
    const sales = (await axios(url)).data;
    renderSales(sales);
    renderUsers(users);
})
init();