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
    const targetItemObj = menuArray.find(item =>
        item.id === Number(itemId)
    )
    ordersArray.pop(targetItemObj)
    renderOrders()
}

// Render Total Amount

function renderTotal(){
    const total = ordersArray.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    document.getElementById("total-amount").textContent = `$${total}`
}










