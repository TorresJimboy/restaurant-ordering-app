import { menuArray } from './data.js'

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
                <button class="item-add">+</button>           
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