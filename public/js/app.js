console.log('Client side javascript loaded');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// });



const form  = document.querySelector('form');
const searchText = document.querySelector('input');
const locationField = document.getElementById('locationField');
const addressField = document.getElementById('addressField');
const errorField = document.getElementById('errorField');
const data_wrapper = document.getElementById('data_wrapper');
const loader = document.getElementById('loader');
loader.hidden = true ;
data_wrapper.hidden = true;
form.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log('Form submitted');
    const location = searchText.value;
    console.log(location);
    loader.hidden = false ;
    errorField.textContent = '';
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error);
            errorField.textContent = data.error;
            locationField.textContent = '';
            addressField.textContent = ''
            data_wrapper.hidden = true;
            loader.hidden = true ;
        } else {
            console.log(data);
            loader.hidden = true ;
            data_wrapper.hidden = false
            const locationData = data.location;
            const address = data.address;
            locationField.textContent = locationData;
            addressField.textContent = address;
            errorField.textContent = '';
        }
    });
})
    
    
})
