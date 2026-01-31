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
  showLoadMoreBtn,
  hideLoadMoreBtn,
  scrollPage,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) return;

  page = 1;
  totalHits = 0;
  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showError();
      return;
    }

    createGallery(data.hits);
    checkTotalHits();
  } catch (error) {
    console.error(error);
    showError();
  } finally {
    hideLoader();
    form.reset();
  }
  
}

async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    checkTotalHits();
    scrollPage();
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

function checkTotalHits() {
  const loadedImages = page * PER_PAGE;

  if (loadedImages >= totalHits) {
    hideLoadMoreBtn();
    showEndMessage();
  } else {
    showLoadMoreBtn();
  }
}

function showError() {
  clearGallery();
  hideLoadMoreBtn();
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

function showEndMessage() {
  iziToast.error({
    message:
      'We\'re sorry, but you\'ve reached the end of search results.',
    position: 'topRight',
    close: false,
    progressBar: false,
    timeout: '2000',
    messageSize: '16',
  });
}


