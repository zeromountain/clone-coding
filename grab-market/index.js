const products = [{
  name: '농구공',
  price: 100000,
  seller: '조던',
  imageUrl: 'images/products/basketball1.jpeg',
},
{
  name: '축구공',
  price: 50000,
  seller:'메시',
  imageUrl:'images/products/soccerball1.jpg',
},
{
  name: '키보드',
  price: 10000,
  seller: '제로마운틴',
  imageUrl: 'images/products/keyboard1.jpg',
}];

let productsHtml = '';
for(let i = 0; i < products.length; i++) {
  let product = products[i];
  productsHtml = productsHtml + `
  <div class="product-card">
    <div>
      <img class="product-image" src="${product.imageUrl}" />
      <div class="product-contents" >
        <span class="product-name">${product.name}</span>
        <span class="product-price">${product.price}원</span>
      </div>
      <div class="product-seller">
        <img class="product-avatar" src="images/icons/avatar.png" />
        <span>${product.seller}</span>
      </div>
    </div>
  </div>
  `
}

document.querySelector("#products-list").innerHTML = productsHtml;