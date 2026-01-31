import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <ul class="gallery-img-info">
            <li>Likes<span class="js-info">${likes}</span></li>
            <li>Views<span class="js-info">${views}</span></li>
            <li>Comments<span class="js-info">${comments}</span></li>
            <li>Downloads<span class="js-info">${downloads}</span></li>
          </ul>
        </a>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

export function scrollPage() { 
  const cardEl = gallery.querySelector('li');
  let cardHeight = cardEl.getBoundingClientRect().height * 2;
  window.scrollBy({ 
  top: cardHeight,
  behavior: "smooth",
  });
}