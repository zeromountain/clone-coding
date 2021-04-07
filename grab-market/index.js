axios.get('https://bda93345-8d1f-46e4-90ad-5972df410e2b.mock.pstmn.io/products')
  .then(function(result) {
    console.log('통신 결과 : ', result);
    const products = result.data.products;
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
  }).catch(function(err) {
    console.error(err);
  })


document.querySelector("#products-list").innerHTML = productsHtml;