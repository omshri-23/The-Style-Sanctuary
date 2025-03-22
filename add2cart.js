
{
  document.addEventListener("DOMContentLoaded", function () {
   function addToCart(event) {
      const productCard = event.target.closest(".item");
      const productName = productCard.querySelector("h3").innerText;
      const productPrice = parseFloat(productCard.querySelector("p").innerText);

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let existingProduct = cart.find(item => item.name === productName);
      if (existingProduct) {
          existingProduct.quantity += 1;
      } else {
          cart.push({ name: productName, price: productPrice, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${productName} added to cart!`);
  }

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", addToCart);
  });
});

}