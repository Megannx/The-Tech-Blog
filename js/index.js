import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

  axios.get('https://api.example.com/data')
    .then(response => {
      const data = response.data;

      const dataElement = document.getElementById('data-container');
      if (dataElement) {
        dataElement.textContent = JSON.stringify(data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});