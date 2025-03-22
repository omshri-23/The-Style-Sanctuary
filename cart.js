document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function formatCurrency(amount) {
        return `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    }

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<tr><td colspan="5">Your cart is empty</td></tr>`;
            cartTotal.innerText = "₹0.00";
            return;
        }

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </td>
                <td>${formatCurrency(itemTotal)}</td>
                <td><button onclick="removeItem(${index})">Remove</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartTotal.innerText = formatCurrency(totalPrice);
        localStorage.setItem("cart", JSON.stringify(cart)); // Save cart updates
    }

    window.updateQuantity = function (index, change) {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
        } else {
            cart.splice(index, 1);
        }
        renderCart();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        renderCart();
    };

    document.getElementById("checkout-btn").addEventListener("click", function () {
        alert("Proceeding to Checkout...");
    });

    // **🔹 Clear Cart Button Function**
    document.getElementById("clear-cart-btn").addEventListener("click", function () {
        if (confirm("Are you sure you want to clear the cart?")) {
            localStorage.removeItem("cart"); // Remove all cart data
            location.reload(); // Refresh page to update UI
        }
    });

    renderCart(); // Initial render of cart
});
