function outputList() {
    const itemsDiv = document.getElementById('itemsList');
    itemsDiv.innerHTML = '';

    const items = getItems();

    items.forEach(function (element, index) {

        let itemLine = `<div>${element} 
        
        <button onclick="deleteItem(${index})">Delete</button>
        <button onclick="editItem(${index})">Edit</button>`

        if (index > 0) {
            itemLine = itemLine + `<button onclick="moveUp(${index})">Up</button>`
        }

        if (index + 1 < items.length) {
            itemLine = itemLine + `<button onclick="moveDown(${index})">Down</button>`
        }

        itemLine = itemLine + '</div>';

        itemsDiv.innerHTML = itemsDiv.innerHTML + itemLine;
    });
}

// stores the items array to local storage
function storeItems(items) {
    localStorage.setItem('toDoList', JSON.stringify(items));
}

// get the items from local storage
function getItems() {
    let items = localStorage.toDoList;

    if (items === undefined) {
        storeItems([]);
        items = localStorage.toDoList;
    }

    return JSON.parse(items);
}

// add a new item
function addItem() {
    const item = document.getElementById("newItem");

    console.log(item);

    if (item.value) {
        const items = getItems()
        items.push(item.value);
        storeItems(items);

        console.log(items);
    }

    outputList();
}

// delete an item
function deleteItem(index) {
    if (confirm('Are you sure?')) {
        const items = getItems();
        items.splice(index, 1);
        storeItems(items);
    
        outputList();
    }
}

// swap two items around - used for move up and down
function swapItems(items, index1, index2) {
    const text = items[index1];
    items[index1] = items[index2];
    items[index2] = text;
    
    storeItems(items);

    outputList();
}

// move an item down
function moveDown(index) {
    const items = getItems();

    if (index + 1 < items.length) {
        swapItems(items, index, index + 1);
    }
}

// move an item up
function moveUp(index) {
    const items = getItems();

    if (index > 0) {
        swapItems(items, index, index - 1);
    }
}

// Handle the edit model
const modal = document.getElementById('editModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

// show the edit modal dialog
function editItem(index) {
    modal.style.display = "block";
    const items = getItems()

    document.getElementById('saveEditItem').onclick = function() { updateItem(index); };
    document.getElementById('editItem').value = items[index];

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

// update the edited item from the model
function updateItem(index){
    const item = document.getElementById("editItem");

    if (item.value) {
        var items = getItems();
        items[index] = item.value;
        storeItems(items);

        modal.style.display = "none";
    }
    
    outputList();
}



outputList();
document.getElementById('addItemButton').onclick = addItem;