// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) return;

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        showError();
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      console.error(error);
      showError();
    })
    .finally(() => {
      hideLoader();
    });
  
  form.reset();
}

function showError() {
  clearGallery();
  iziToast.error({
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    close: false,
    progressBar: false,
    timeout: '3000',
    messageSize: '16',
  });
}