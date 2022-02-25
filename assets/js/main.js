const btnCart = document.getElementById('btn-cart')
const iconClose = document.getElementById('close')
const cleanCartBtn = document.querySelector('.vaciar')
const sidebarCart = document.querySelector('.sidebar-menu')
const productsContainer = document.querySelector('.productos-container')
const cartContainer = document.querySelector('.carrito')
const subtotal = document.querySelector('.subtotal') 

const dataProducts = [
  {
    id: 1,
    nombre: 'Mantequilla GLORIA con Sal Barra 200g',
    imagen: './assets/images/mantequilla-gloria.webp',
    precio: 9.40
  },
  {
    id: 2,
    nombre: 'Pack Aceite Vegetal PRIMOR Premium Botella 1L Paquete 2un',
    imagen: './assets/images/primor.webp',
    precio: 21.90
  },
  {
    id: 3,
    nombre: 'Arroz Extra PAISANA Bolsa 5Kg',
    imagen: './assets/images/paisana.webp',
    precio: 18.10
  },
  {
    id: 4,
    nombre: 'Mayonesa ALACENA Doypack 950g',
    imagen: './assets/images/mayonesa.webp',
    precio: 14.90
  },
  {
    id: 5,
    nombre: 'Trozos de Atún NICOLINI Lata 170g',
    imagen: './assets/images/atun.webp',
    precio: 5.30
  },
  {
    id: 6,
    nombre: 'Azúcar Rubia BELL\'S Bolsa 5Kg',
    imagen: './assets/images/azucar.webp',
    precio: 15.20
  },
  {
    id: 7,
    nombre: 'Fideo Spaghetti NICOLINI Bolsa 1kg',
    imagen: './assets/images/spagueti.webp',
    precio: 3.30
  }
]


let productsInCart = []

const eventos = () => {

  showProducts()
  btnCart.addEventListener('click',() => sidebarCart.classList.toggle('open'))
  iconClose.addEventListener('click',() => sidebarCart.classList.toggle('open'))

  productsContainer.addEventListener('click',addProduct)
  cartContainer.addEventListener('click',removeProduct)
  cleanCartBtn.addEventListener('click',cleanCart)
}

const showProducts = () => {

  dataProducts.map(({id,nombre,imagen,precio}) => {
    const product = document.createElement('div')
    product.classList.add('producto', 'border', 'rounded', 'p-2', 'font-monospace')
    product.innerHTML = `
      <div class="row">
      <div class="col-12 product-body">
      <img src=${imagen} alt=${nombre} class="img-fluid p-2">

      <div class="p-1">
      <span class="fw-bold">S./${precio}</span> 
      <span class="text-decoration-line-through">S./${(precio+10*precio/100).toFixed(2)}</span>
        <p>${nombre}</p>
        
      </div>
      </div>
      <div class="col-12 d-flex justify-content-center align-content-end product-footer">
      <button class=" btn btn-verde text-light agregar-producto">Añadir al carrito</button>
      <input type="hidden" value=${id}  />
      </div>
      </div>
      
      
      
      
      <div>
        
      </div>
    `
    productsContainer.appendChild(product)
  })
}

const addProduct = e => {
  e.preventDefault()

  if(e.target.classList.contains('agregar-producto')) {
    const idProduct = e.target.nextElementSibling.value;
    showProductsInCart(idProduct)
    updateCountCart()
    calcSubTotal()
  }

}

const removeProduct = e => {
  e.preventDefault();

  if(e.target.classList.contains('quitar-producto')){
    const id = e.target.parentElement.firstElementChild.value
    productsInCart = productsInCart.filter(product => product.id != id)
    printCart()
  }
}

const showProductsInCart = idProduct => {
  let filterProduct = dataProducts.filter(select => select.id == idProduct)
  const selectProduct = {...filterProduct[0],cantidad: 1}

  if( productsInCart.some( product => product.id == selectProduct.id) ) {
    const products = productsInCart.map( product  => {
      if( product.id == selectProduct.id ) {
        product.cantidad++
        return product
      } else {
        return product
      }
    })
    productsInCart = [ ...products ]
  } else {
    productsInCart = [ ...productsInCart, selectProduct ]
  }

  printCart()

}

const printCart = () => {
  clean()

  productsInCart.forEach(({id,nombre,imagen,precio,cantidad}) => {
    const productItem = document.createElement('li')
    productItem.innerHTML = `
      <div class="producto-carrito d-flex align-items-center justify-content-between">
        <input type="hidden" value=${id}  />
        <img src=${imagen} alt=${nombre} class="img-fluid producto-carrito__imagen">

        <div class="ms-2">
          <p>${nombre}</p>
          <p>
            <span class="fw-bold producto-carrito__cantidad">${cantidad}</span> x
            <span class="fw-bold producto-carrito__precio">S/.${precio}</span>
          </p>
        </div>

      
        <i class="bi-x-lg btn btn-danger rounded-circle quitar-producto"></i>
        

      </div>
    `

    cartContainer.appendChild(productItem)
  })

}

const clean = () => {
  while( cartContainer.firstChild ) {
    cartContainer.removeChild(cartContainer.firstChild)
    calcSubTotal()
  }
}

const cleanCart = () => {
  while( cartContainer.firstChild ) {
    cartContainer.removeChild(cartContainer.firstChild)
    productsInCart = []
    updateCountCart()
    calcSubTotal()
  }
}

const calcSubTotal = () => {
  let price = 0
  let cant = 0
  let sub = 0
  productsInCart.forEach(({precio,cantidad}) => {
    price = precio
    cant = cantidad
    sub += precio * cantidad
  })

  subtotal.innerHTML = sub.toFixed(2)
}

const updateCountCart = () => {
  if(productsInCart.length > 0) {
    const span = document.createElement('span')
    span.className = 'position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle icon-carrito__cantidad'
    span.textContent = productsInCart.length
    btnCart.appendChild(span)
  }
}

eventos()