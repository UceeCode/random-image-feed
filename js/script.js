const apiURL = 'https://picsum.photos/v2/list?page=1&limit=40';
let page = 1;
let isLoading = false;

const imageContainer = document.getElementById('image-container');
const loadingSign = document.getElementById('loading-sign');

const fetchImages = async () => {
    isLoading = true;
    loadingSign.style.display = "block";

    return new Promise((resolve, reject) => {
        fetch(`${apiURL}&page=${page}`).then(response => {
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            const imageCard = data.map(item => {
                return `
                <div class="image-card">
                    <img src="${item.download_url}" alt="Lorem image"/>
                </div>
                `;
            });

            imageContainer.innerHTML += imageCard.join('');
            page++;
            resolve();
        }).catch(error => {
            console.log('error fetching images: ', error.message);
            loadingSign.innerHTML = 'Error Loading Images. Please try again.';
            reject(error);
        }).finally(() => {
            isLoading = false;
            loadingSign.style.display = 'none';
        });
    });
}

fetchImages()
