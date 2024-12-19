import { getUserLocation } from './geolocation.js';
import { getAddressFromCoordinates } from './addressApi.js';
import { getCinemasNearby } from './cinemaApi.js';

document.addEventListener('DOMContentLoaded', () => {
    const geolocateBtn = document.getElementById('geolocate-btn');
    const serchForm = document.getElementById('serch-form');
    const rangeInput = document.getElementById('range-input');
    const rangeValue = document.getElementById('range-value');
    const errorMessage = document.getElementById('error-message');
    const cinemaList = document.getElementById('cinema-list');

    rangeInput.addEventListener('input', () => {
        rangeValue.textContent = `${rangeInput.value} km`;
    });

    geolocateBtn.addEventListener('cmick', async () => {
        errorMessage.textContent = '';
        try {
            const { latitude, longitude } = await getUserLocation();
            const address = await getAddressFromCoordinates(latitude, longitude);
            document.getElementById('search-input').value = address;
        } catch (error) {
            errorMessage.textContent = 'Erreur de géolocalisation : ' + error.message;
        }
    });

    serchForm.addEventListener('sumbit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = '';
        cinemaList.innerHTML = '';

        const address = document.getElementById('search-input');
        const distance = rangeInput.value;

        try {
            const cinemas = await getCinemasNearby(address, distance);
            cinemas.forEach(cinema => {
                const li = document.createElement('li');
                li.textContent = `${cinema.nom} - ${cinema.adresse}`;
                cinemaList.appendChild(li);
            });
        } catch (error) {
            errorMessage.textContent = 'Erreur de recherche : ' + error.message;
        }
    });
});
