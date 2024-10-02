let cart = [];
        let cartCount = 0;
        let cartTotal = 0;

        const cartCountElement = document.getElementById('cartCount');
        const cartItemsElement = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartModal = document.getElementById('cartModal');
        const closeModal = document.querySelector('.close');

        function updateCartUI() {
            cartItemsElement.innerHTML = '';
            cartTotal = 0;

            cart.forEach(item => {
                const li = document.createElement('li');
                li.innerText = `${item.name} - RS ${item.price}`;
                cartItemsElement.appendChild(li);
                cartTotal += item.price;
            });

            cartTotalElement.innerText = cartTotal;
            cartCountElement.innerText = cart.length; // Updated count
        }

        function addToCart(name, price) {
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart)); // Save to local storage
            updateCartUI();

            // Alert message
            alert(`${name} has been added to your cart! Thank you!`);
        }

        const buyButtons = document.querySelectorAll('.buyBtn');
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const name = button.getAttribute('data-name');
                const price = parseInt(button.getAttribute('data-price'));
                addToCart(name, price);
            });
        });

        document.getElementById('viewCart').addEventListener('click', () => {
            cartModal.classList.add('show');
        });

        closeModal.addEventListener('click', () => {
            cartModal.classList.remove('show');
        });

        document.getElementById('clearCart').addEventListener('click', () => {
            cart = [];
            localStorage.removeItem('cart'); // Clear local storage
            updateCartUI();
        });

        window.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cartModal.classList.remove('show');
            }
        });

        // Load cart from local storage
        window.addEventListener('load', () => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCartUI();
            }
        });