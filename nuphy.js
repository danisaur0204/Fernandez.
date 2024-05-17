let openShopping = document.querySelector('.Shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'NuPhy Air75',
        price: 8593.87,
    },
    {
        id: 2,
        name: 'NuPhy Gem80',
        price: 8593.87,
    },
    {
        id: 3,
        name: 'NuPhy Halo75',
        price: 4150.00,
    },
    {
        id: 4,
        name: 'NuPhy Field75',
        price: 4895.00,
    }
];

let listCards = [];

function addToCart(name) {
    let product = products.find(item => item.name === name);
    if (product) {
        let existingProduct = listCards.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            listCards.push({ ...product, quantity: 1 });
        }
        reloadCard();
        
        // Open the shopping cart
        body.classList.add('active');
    }
}

function reloadCard() {
    listCard.innerHTML = '';
    let totalPrice = 0;
    listCards.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>${item.name}</div>
            <div>Price: ₱${item.price.toLocaleString()}</div>
            <div>
                Quantity: &nbsp;<input type="number" value="${item.quantity}" onchange="changeQuantity(${index}, this.value)">
            </div>
            <div>Total: ₱${(item.price * item.quantity).toLocaleString()}</div>
        `;
        listCard.appendChild(listItem);
    });
    total.textContent = `   Confirm Total Price: ₱${totalPrice.toLocaleString()}`; // Update total price element
    quantity.textContent = listCards.reduce((acc, item) => acc + item.quantity, 0);
}


function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        listCards[key].quantity = 0; // Set quantity to 0
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}

total.addEventListener('click', confirmOrder);

function confirmOrder() {
    let confirmed = confirm(`Are you sure you want to confirm your order with a total of ₱${total.textContent.trim().split('₱')[1].replace(/,/g, '')}?`);
    if (confirmed) {
        // Ask for payment method and shipping details
        let paymentMethod = prompt("Please enter your payment method (e.g., credit card, PayPal):");
        let shippingDetails = prompt("Please enter your shipping details (e.g., address, contact number):");

        // Call a function to handle the payment method and shipping details
        handlePaymentAndShipping(paymentMethod, shippingDetails);
    }
}

function handlePaymentAndShipping(paymentMethod, shippingDetails) {
    // Here, you can perform further actions with the payment method and shipping details
    if (paymentMethod && shippingDetails) {
        // Display a confirmation message with payment method and shipping details
        let confirmationMessage = `
            Your order has been confirmed!
            Payment Method: ${paymentMethod}
            Shipping Details: ${shippingDetails}
        `;
        alert(confirmationMessage);

        // Proceed with the order completion
        orderComplete();
    } else {
        // If payment method or shipping details are not provided, show an alert
        alert("Please provide both payment method and shipping details to proceed.");
    }
}

function placeOrder() {
    if (listCards.length > 0) {
        orderConfirmation();
        orderComplete();
        listCards = [];
        reloadCard();
    } else {
        alert("Your cart is empty. Please add items to place an order.");
    }
}

function orderConfirmation() {
    alert("Your order has been confirmed!");
}

function orderComplete() {
    alert("Your order is complete! Thank you for shopping with us.");
}
