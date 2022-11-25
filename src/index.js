import '../css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('.search-form'),
    searchField: document.querySelector('[name="searchQuery"]'),
    loadMoreBtn: document.querySelector('[type="button"]'), 
    galleryContainer: document.querySelector('.gallery')
    
}

const lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250});

// refs.searchField.value = 'dog';

const searchParams = {
    BASE_URL: 'https://pixabay.com/api/',
    KEY: '31555510-20bee98b1f3b8ae280fb0cd2b',
    Q: '',
    IMAGE_TYPE: 'photo',
    ORIENTATION: 'horizontal',
    SAFESEARCH: false,
    PER_PAGE: 40,

}

let page = 1; 

hideLoadMoreBtn();

refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onFormSubmit(event) { 
    event.preventDefault();
    page = 1; 

    clearGallery();
    hideLoadMoreBtn();


    if (event.currentTarget.searchQuery.value.trim() === "") {
        return
    }   
    
    searchParams.Q = event.currentTarget.searchQuery.value; 
    

    showResult();

}

function onLoadMoreBtnClick(event) {
    page += 1;
    showResult();
}

function clearGallery() {
    refs.galleryContainer.innerHTML = "";
}

function hideLoadMoreBtn() {
    refs.loadMoreBtn.classList.add('visually-hiden');
}

function showLoadMoreBtn() {
    refs.loadMoreBtn.classList.remove('visually-hiden');
}

async function fetchImages(searchParams, page) {
    
    try {
    const {BASE_URL, KEY, Q, IMAGE_TYPE, ORIENTATION, SAFESEARCH, PER_PAGE } = searchParams;    
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${Q}&image_type=${IMAGE_TYPE}&${ORIENTATION}&${SAFESEARCH}&page=${page}&per_page=${PER_PAGE}`);
        
    let responseData = response.data;
    console.log(responseData);
    console.log(responseData.hits);

    return responseData

    } catch (error) {
        console.log(error);
    }
}

async function showResult() {
    try {
        const data = await fetchImages(searchParams, page);

        if (data.total === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again');
            return
        }

        if (data.total > 0 && page === 1) {
            Notify.success(`Hooray! We found ${data.total} images.`);
            const galleryItemsMurkup = await createGalleryItemsMurkup(data);
            refs.galleryContainer.insertAdjacentHTML('beforeend', galleryItemsMurkup);
            showLoadMoreBtn();
        } else if (data.total > 0 && page > 1) {
            const galleryItemsMurkup = await createGalleryItemsMurkup(data);
            refs.galleryContainer.insertAdjacentHTML('beforeend', galleryItemsMurkup);
            showLoadMoreBtn();
        }
        
        if (data.total > 0 && page > 1 && data.hits.length < searchParams.PER_PAGE) {
            Notify.warning("We're sorry, but you've reached the end of search results.");
            hideLoadMoreBtn();
        }
        
        lightbox.refresh();
     
    } catch (error) {
        console.log(error);
    }    
}

function createGalleryItemsMurkup(data) {
    return data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
                <div class="photo-card">
                
                    <a class="gallery__item" href="${largeImageURL}">
                    <img class="photo-card__img" src="${webformatURL}" alt="${tags}" title="${tags}"loading="lazy" />
                    </a>
                    
                    <div class="info">
                        <p class="info-item">
                            <b>Likes </b>
                            ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views </b>
                            ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments </b>
                            ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads </b>
                            ${downloads}
                        </p>
                    </div>
                </div>

        `
    })
        .join('');
}
