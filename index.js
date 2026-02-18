import { menuArray } from './data.js'

// Render Items
function getMenuItems(){
    let menuItems = ''

    menuArray.forEach(function(menu){
        menuItems += `
        <div class="items">
            <div class="items-inner">
                <p class="item-emoji">${menu.emoji}</p>
                <div>
                    <p class="item-name">${menu.name}</p>
                    <p class="item-ingredients">${menu.ingredients}</p>
                    <p class="item-price">$${menu.price}</p>
                </div>
                <button class="item-add" id="item-add" data-add="${menu.id}">+</button>           
            </div>
        </div>
        `
    })
    return menuItems
}

function render(){
    document.getElementById('menu').innerHTML = getMenuItems()
}

render()

// Clicks Handler

document.addEventListener('click', function(e){
    if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if (e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    
})

// Add Items
let ordersArray = []
function handleAddClick(itemId){
    cart.hidden = false

    const targetItemObj = menuArray.find(item =>
        item.id === Number(itemId)
    )
    
    const existingItem = ordersArray.find(item =>
        item.id === targetItemObj.id
    )

    if (existingItem){
        existingItem.quantity += 1
    } else {
        ordersArray.push({
            ...targetItemObj, 
            quantity: 1
        })
    }
    
    renderOrders()
    renderTotal()
}

// Render Orders

function renderOrders(){

    let orderItem = ''

    ordersArray.forEach(function(item){
        orderItem += `
            <div class="order-items">
                <p class="item-count" id="item-count">x${item.quantity}</p>
                <p class="order-name">${item.name}</p>
                <button class="order-remove-btn" data-remove="${item.id}">remove</button>
                <p class="order-price" id="order-price">$${item.price * item.quantity}</p>
            </div>
        `
    })

    document.getElementById('orders-container').innerHTML = orderItem
}

// Remove Items

function handleRemoveClick(itemId){

    const existingItem = ordersArray.find(item =>
        item.id === Number(itemId)
    )

    if (existingItem){

        if (existingItem.quantity > 1){
            existingItem.quantity -= 1 
        } else {
            ordersArray = ordersArray.filter(item =>
                item.id !== Number(itemId)
            )
        }

    }

    if (ordersArray.length === 0){
        cart.hidden = true
    }

    renderOrders()
    renderTotal()
}


// Render Total Amount

function renderTotal(){
    const total = ordersArray.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    document.getElementById("total-amount").textContent = `$${total}`
    
    return total
}

// Handle complete order button

document.getElementById("complete-order-btn").addEventListener("click", function(){

    const totalOrder = renderTotal()

    document.getElementById('overlay').style.display = 'block'
    document.getElementById('modal').style.display = 'flex'

    console.log(totalOrder)
})

// Form Section

// Card Number Inputfield
const cardInput = document.getElementById('form-card-number');

cardInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    value = value.match(/.{1,4}/g)?.join(' ') || '';
    
    e.target.value = value;
});

// CVV Inputfield

const cvvInput = document.getElementById('form-cvv');
cvvInput.addEventListener('input', () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, '');
});
















