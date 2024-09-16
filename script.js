let cart = [];
let cartCount = 0;
let cartTotal = 0;

const cartButton = document.getElementById('viewCart');
const cartModal = document.getElementById('cartbox');
const cartItemsElement = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const closeModal = document.querySelector('.close');
const clearCartButton = document.getElementById('clearCart');

function updateCartUI() {
    cartItemsElement.innerHTML = '';
    cartTotal = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - RS ${item.price}`;
        cartItemsElement.appendChild(li);
        cartTotal += item.price;
    });

    cartTotalElement.textContent = cartTotal;
    cartButton.textContent = `🛒View Cart (${cartCount})`;
}

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount++;
    updateCartUI();
}

document.querySelectorAll('.buyBtn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

cartButton.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

clearCartButton.addEventListener('click', () => {
    cart = [];
    cartCount = 0;
    updateCartUI();
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});
