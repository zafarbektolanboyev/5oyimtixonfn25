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
//
async function fetchData() {
    const selectElement = document.getElementById('pupolyarnost');
    const selectedValue = selectElement.value;

    try {
        const response = await fetch('https://cars-pagination.onrender.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const products = await response.json();

        const filteredProducts = products.filter(product => product.category === selectedValue);


        console.log(filteredProducts); 

        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const item = document.createElement('div');
            item.textContent = `${product.name} - ${product.price}`;
            productList.innerHTML += createCard(product);
        });

        if (selectedValue === 'не популярен') {
            productList = products;
        } else {
            filteredProducts = products.filter(product => product.category === selectedValue);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}



// ///////////
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const filterButton = document.querySelector('.btn');

filterButton.addEventListener('click', async () => {
    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);

    // const filteredProducts = products.filter(product => {
    //     const productPrice = parseFloat(product.price);
    //     return productPrice >= minPrice && productPrice <= maxPrice;
    // });
    

    try {
        const response = await fetch('https://cars-pagination.onrender.com/products');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const products = await response.json();

        const filteredProducts = products.filter(product => {
            const productPrice = parseFloat(product.price);
            return productPrice >= minPrice && productPrice <= maxPrice;
        });

        console.log(filteredProducts);

        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Oldingi mahsulotlarni tozalash

        filteredProducts.forEach(product => {
            const item = document.createElement('div'); // Yangi div yaratish
            item.textContent = `${product.name} - ${product.price}`;
            productList.innerHTML += item;
        });
        console.log(products.maxPrice)
    } catch (error) {
        console.error('Error fetching or filtering products:', error);
    }
});
