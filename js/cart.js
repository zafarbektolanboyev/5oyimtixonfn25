function createCard(cart) {
  if (!cart || !cart.id || !cart.image || !cart.name || !cart.price) {
    return `
      <div class="hero-card" id="hero-card-${!cart.id}"> 
        <div class="hero-cart-details">
          <h4>Корзина</h4>
          <img id='delBtnAll' src="../img/close.png" alt="">
        </div>
        <div class="line1"></div>
        <div class="cart-item">
          <img src="${cart.image}" width="200" height="200" alt="" class="item-image">
          <div class="item-details">
            <p class="item-title" style="margin-bottom: 10px;">${cart.name}</p>
            <div class="item-quantity" style="margin-top: 30px;">
              <button class="minus" id="minus-${cart.id}">-</button>
              <span class='value' id="value-${cart.id}">0</span>
              <button class="plus" id="plus-${cart.id}">+</button>
            </div>
          </div>
          <div class="price-del" style="margin-top: -10px;">
            <button id="delBtn-${cart.id}" class="delete-button" style="align-items: center;">
              <img src="../img/delete.svg" alt="">
              <h6>Удалить</h6>
            </button>
            <div class="item-price" style="margin-top: 20px;">${cart.newPrice}Р</div>
          </div>
        </div>
        <div class="cart-footer">
          <p class="total-price" style="margin-left: -325px; margin-bottom: 10px;">Итого: ${cart.newPrice}Р</p>
          <div class="cart-buttons" style="justify-content: space-between;">
            <button class="checkout-button">Оформить заказ</button>
            <button class="continue-button">Продолжить покупки</button>
          </div>
        </div>
      </div>
  `;
  }
}

function renderCards() {
  const cardContainer = document.getElementById('cardContainer');
  const getLocal = localStorage.getItem('cart'); 
  let data = getLocal ? JSON.parse(getLocal) : [];
  cardContainer.innerHTML = '';
  data.forEach(cart => {
    const cardHTML = createCard(cart);
    cardContainer.innerHTML += cardHTML;
  });
  data.forEach(cart => {
    document.getElementById(`plus-${cart.id}`).addEventListener('click', () => {
      cart.quantity++;
      document.getElementById(`value-${cart.id}`).textContent = cart.quantity;
      localStorage.setItem('cart', JSON.stringify(data));
      renderCards();
    });

    document.getElementById(`minus-${cart.id}`).addEventListener('click', () => {
      if (cart.quantity > 0) {
        cart.quantity--;
        document.getElementById(`value-${cart.id}`).textContent = cart.quantity;
        localStorage.setItem('cart', JSON.stringify(data));
        renderCards();
      }
    });

    document.getElementById(`delBtn-${cart.id}`).addEventListener('click', () => {
      data = data.filter(item => item.id !== cart.id);
      localStorage.setItem('cart', JSON.stringify(data));
      renderCards();
    });
  });

  const delBtnAll = document.getElementById('delBtnAll');
  if (delBtnAll) {
    delBtnAll.addEventListener('click', () => {
      localStorage.removeItem('cart');
      renderCards();
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
});