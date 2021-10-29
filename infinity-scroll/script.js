// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []


let count = 5;
const apiKey = 'Vv9jzCf90Umg7qwJdyim589ciKorm4c_xNicER63xkc'
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}
`
// check if all images were loaded
function imagedLoaded() {
    imagesLoaded++;
    // console.log('imageLoaded', imagesLoaded);
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // console.log('READY =', ready)
    }
}
// Helper function
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for links, photos and add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create a anchor element
        const item = document.createElement('a')
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // Create Img for photo
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener, check

        imagedLoaded()
        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try{
        let response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch(err) {
        console.log(err)
    }
}
// window is parent of document and grand parent of body 
// Check to see if scrolling near bottom of page, Load more photos
// window.innerHeight 
// window.scrollY

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= 
        document.body.offsetHeight - 1000 && ready) {
            // console.log('window.innerHeight', window.innerHeight)
            // console.log('window.scrollY', window.scrollY)
            // console.log('window.innerHeight+ scrollY', window.innerHeight + window.scrollY)
            // console.log('document.body.offsetHeight - 1000', document.body.offsetHeight - 1000)
            ready = false;
            getPhotos()
            // console.log('load more');
        }
});
getPhotos()