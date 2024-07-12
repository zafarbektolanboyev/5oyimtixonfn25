const productList = document.getElementById('product-list');
const cardsWrapper = document.getElementById('cards-wrapper')

function createCard(product) {
    return `
        <div class="product" id="card" onclick="handleCardClick(${product.id})">
            <div class="product-status product-card">
                <h6 class="not-available">Нет в наличии</h6>
                <h3 class="sale">SALE</h3>
            </div>
            <div class='gift'>
                <img src="../img/gift.svg">
                <p>Подарок</p>
            </div>
            <img class='card-img' src="${product.image}" width="288" height="320px" alt="Product Image" class="product-image">
            <div class="stars" display=:'flex'; flex-direction:'row';>
                ${"★".repeat(Math.round(product.star))}
                ${"☆".repeat(5 - Math.round(product.star))}
                <h5 >(${product.comments})отзывов</h5>
            </div>
            <h2 class="product-title">${product.name}</h2>
            <div class="product-price">
                <span class="current-price">${product.newPrice}</span>
                <span class="old-price">${product.oldPrice}</span>
            </div>
        </div> 
    `;
}

function handleCardClick(productId) {
    window.location.href = `/pages/single.html?id=${productId}`;
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cars-pagination.onrender.com/products')
        .then(res => res.json())
        .then(data => {
            data.forEach((element, index) => {
                if (index != 0 && index < 13) {
                    productList.innerHTML += createCard(element);
                }
            });
        });
});
document.addEventListener('DOMContentLoaded', function(){
    fetch('https://cars-pagination.onrender.com/products')
        .then(res => res.json())
        .then(data => {
            data.forEach((element, index) => {
                if(index != 0 && index < 5){
                    cardsWrapper.innerHTML += createCard(element)
                }
            })
        })
})
// ////////
function fetchData() {
    const dropdown = document.getElementById('dropdown');
    const selectedValue = dropdown.value;
  
    let apiUrl = '';
  
    if (selectedValue === 'popularity') {
      apiUrl = 'YOUR_API_ENDPOINT_FOR_POPULARITY';
    } else if (selectedValue === 'not_popular') {
      apiUrl = 'YOUR_API_ENDPOINT_FOR_NOT_POPULAR';
    }
  
    if (apiUrl) {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          displayData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }
  
  function displayData(data) {
    const resultDiv1 = document.getElementById('product-list');
    const resultDiv2 = document.getElementById('cards-wrapper');
    resultDiv1.innerHTML = '';
    resultDiv2.innerHTML = '';
  
    data.forEach(item => {
      resultDiv1.innerHTML += createCard(item);
      resultDiv2.innerHTML += createCard(item);
    });
  }