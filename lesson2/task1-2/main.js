function Container() {
    this.id = '';
    this.className = '';
    this.htmlCode = '';
};

Container.prototype.render = function() {
    return this.htmlCode;
};

function Menu(myId, myClass, myItems) {
    Container.call(this);
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
};

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function() {
    var renderMenu = '<ul class="' + this.className + '">';
    for (var item in this.items) {
        if (this.items[item] instanceof MenuItem) {
            renderMenu += this.items[item].render();
        } else if (this.items[item] instanceof MenuSubItem) {
            renderMenu += '<ul>' + this.items[item].render() + '</ul>';
        }
    }
    renderMenu += '</ul>';
    return renderMenu;
};

function MenuItem(myHref, myName) {
    Container.call(this);
    this.className = 'menu-item';
    this.href = myHref;
    this.name = myName;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
    return '<li><b><a href=" ' + this.href + '">' + this.name + '</a></b></li>';
};

function MenuSubItem(myHref, myName) {
    Container.call(this);
    this.className = 'menu-sub-item';
    this.href = myHref;
    this.name = myName;
}

MenuSubItem.prototype = Object.create(Container.prototype);
MenuSubItem.prototype.constructor = MenuSubItem;
MenuSubItem.prototype.render = function() {
    return '<li><a href=" ' + this.href + '">' + this.name + '</a></li>';
}

window.onload = function() {
    document.getElementById('btn').addEventListener('click', function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './list.json', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                console.log('Console: Error', xhr.status, xhr.statusText);
            } else {
                var items = [],
                    subItems,
                    myItems = JSON.parse(xhr.responseText);
                for (var i = 0; i < myItems.length; i++) {
                    items.push(new MenuItem(myItems[i].href, myItems[i].title));
                    if (myItems[i].submenu) {
                        for (var j = 0; j < myItems[i].submenu.length; j++) {
                            subItems = myItems[i].submenu[j];
                            items.push(new MenuSubItem(subItems.href, subItems.title))
                        }
                    }
                }
                var menuNew = new Menu('first', 'shop', items);
                document.getElementById('menu').innerHTML = menuNew.render();
            }
        }
    })
}