import { menuArray } from '/data.js'

const {name, ingredients, id, price, emoji} = menu

function getMenuItems(){
    let menuItems = ''

    menu.forEach(function(menu){
        menuItems += `
        <div class="items">
            <div class="items-inner">
                <img src="${menu.emoji}" class="item-emoji">
                <div>
                    <p class="item-name">${menu.name}</p>
                    <p class="item-ingredients">${menu.ingredients}</p>
                    <p class="item-price">$${menu.price}</p>
                </div>            
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

console.log("i love my mom")