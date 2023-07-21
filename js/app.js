const form = document.querySelector("form");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productCategory = document.getElementById("category");
const productDiscription = document.getElementById("discription");
const addBtn = form.querySelector("button");
const updateBtn = form.querySelector("button.update");
const table = document.querySelector("table tbody");
const search = document.getElementById("search");

let productsContainer = [];

if (localStorage.getItem("products") != null) {
  productsContainer = JSON.parse(localStorage.getItem("products"));
  displayProductsHandler();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
form.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
});

addBtn.addEventListener("click", () => {
  createProductHandler();
  displayProductsHandler();
  clearInputsHandler();
});

function ProductBlueprint(name, price, category, discription) {
  this.name = name;
  this.price = price;
  this.category = category;
  this.discription = discription;
}

function createProductHandler() {
  const product = new ProductBlueprint(
    productName.value,
    productPrice.value,
    productCategory.value,
    productDiscription.value
  );
  productsContainer.push(product);
  localStorage.setItem("products", JSON.stringify(productsContainer));
}

function clearInputsHandler() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDiscription.value = "";
}

function displayProductsHandler() {
  let tableContent = "";
  if (productsContainer.length >= 1) {
    for (let i = 0; i < productsContainer.length; i++) {
      tableContent += `
           <tr>
           <td>${i + 1}</td>
           <td>${productsContainer[i].name}</td>
           <td>${productsContainer[i].price}</td>
           <td>${productsContainer[i].category}</td>
           <td>${productsContainer[i].discription}</td>
           <td>
             <button class="btn btn-outline-warning" id='${i}' onclick='updateProductHandler(${i})'>update</button>
             <button class="btn btn-outline-danger" id='${i}'  onclick='deleteProductHandler(${i})'>delete</button>
           </td>
         </tr>
         
           `;
    }
  }
  table.innerHTML = tableContent;
}

function deleteProductHandler(index) {
  productsContainer.splice(index, 1);
  displayProductsHandler();
  localStorage.setItem("products", JSON.stringify(productsContainer));
}
function updateProductHandler(index) {
  addBtn.classList.add("hide");
  updateBtn.classList.remove("hide");
  updateBtn.id = `${index}`;
  productName.value = productsContainer[index].name;
  productPrice.value = productsContainer[index].price;
  productCategory.value = productsContainer[index].category;
  productDiscription.value = productsContainer[index].discription;
}

updateBtn.addEventListener("click", () => {
  const index = updateBtn.id;
  addBtn.classList.remove("hide");
  updateBtn.classList.add("hide");
  const updatedProduct = new ProductBlueprint(
    productName.value,
    productPrice.value,
    productCategory.value,
    productDiscription.value
  );
  productsContainer.splice(index, 1, updatedProduct);
  localStorage.setItem("products", JSON.stringify(productsContainer));
  displayProductsHandler();
  clearInputsHandler();
});

search.oninput = function () {
  const term = search.value.toLowerCase();
  let tableContent = "";
  for (let i = 0; i < productsContainer.length; i++) {
    if (productsContainer[i].name.toLowerCase().includes(term)) {
      tableContent += `
      <tr>
      <td>${i + 1}</td>
      <td>${productsContainer[i].name}</td>
      <td>${productsContainer[i].price}</td>
      <td>${productsContainer[i].category}</td>
      <td>${productsContainer[i].discription}</td>
      <td>
        <button class="btn btn-outline-warning" id='${i}' onclick='updateProductHandler(${i})'>update</button>
        <button class="btn btn-outline-danger" id='${i}'  onclick='deleteProductHandler(${i})'>delete</button>
      </td>
    </tr>
    
      `;
    }
  }
  table.innerHTML = tableContent;
};
