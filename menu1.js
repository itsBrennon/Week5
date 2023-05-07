class Item {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    } 
    
    describe() {
        return `${this.name} plays ${this.position}.`; //creates item that holds that position and then describes that item
    } 
}

class Groceries { //created Groceries
    constructor(name) {
        this.name = name;
        this.items = []; //each time we create Groceries we will have an array 
    }

    addItem(item) { // method will take a item & makes sure its groceries because of instance
        if (item instanceof Item) {
            this.items.push(item);//just like a regular array push is a method on the array we'll push the item to it
        } else {
            throw new Error(`You can only add instance of Item. Argument is not a item: ${item}`)
        }
    }
 //similar to other describe but this prints the name of the Groceries and how many items are on the Groceries 
    describe() {
        return `${this.name} has ${this.items.length} items.`;
    }
}
//setting up the menu 
class Menu {
    constructor() {
        this.groceriess = [];//array for the list
        this.selectedGroceries = null;//null because we dont know what is going to be selected yet
    }

    start() { //start menu 
        let selection = this.showMainMenuOptions();

        while(selection != 0) {
            switch (selection) { //selection tab where we control by selecting 0-4 
                case '1':
                    this.createGroceries();
                    break;
                case '2':
                    this.viewGroceries();
                    break;
                case '3':
                    this.deleteGroceries();
                    break;
                case '4':
                    this.displayGroceries();
                    break;
                default:
                     selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert("See you later have a Great Day!"); // default set to 0 and alert is see you later 
    }

    showMainMenuOptions() { //Actual Menu options 0-4 0 is default alert see you later
        return prompt( `
            0) Exit
            1) Create item(s)
            2) View item(s)
            3) Delete item(s)
            4) Display all items
        `);
    }

    showGroceriesMenuOptions(groceriesInfo) { //other prompt after viewing items
        return prompt( `
            0) Back
            1) Create item
            2) Delete item
            --------------------
            ${groceriesInfo}
        `);
    }

    displayGroceries() { 
        let groceriesString = '';
        for (let i = 0; i < this.groceriess.length; i++) {
            groceriesString += i + ') ' + this.groceriess[i].name + '\n';  
        }
        alert(groceriesString);
    }

    createGroceries() { //method for creating groceries
        let name = prompt('Enter name for new item:');
        this.groceriess.push(new Groceries(name)); //whatever groceries we like to add it will push to the groceriess arrary
    }

    viewGroceries() { //method to view Groceries
        let index = prompt('Enter the index of the groceries you wish to view:')
        if (index > -1 && index < this.groceriess.length) {
            this.selectedGroceries = this.groceriess[index];
            let description = 'Groceries List: ' + this.selectedGroceries.name + '\n';
            for(let i = 0; i < this.selectedGroceries.items.length; i++) {
                description += i + ') ' + this.selectedGroceries.items[i].name 
                 + ' - ' + this.selectedGroceries.items[i].position + '\n';
            }

            let selection = this.showGroceriesMenuOptions(description);
            switch (selection) {//how we create item or delete by selection  
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
            }
        }
    }

    deleteGroceries() { //method delete Groceries
        let index = prompt('Enter the index of the groceries you wish to delete:');
        if (index > -1 && index < this.groceriess.length) {
            this.groceriess.splice(index, 1);
        }
    }

    createItem() { //method to Create Item
        let name = prompt('Enter name for new item: ');
        let position = prompt('Enter position for new item: ');
        this.selectedGroceries.items.push(new Item(name, position));
    }

    deleteItem() {
        let index = prompt('Enter the index of the item you wish to delete:');
        if (index > -1 && index < this.selectedGroceries.items.length) {
            this.selectedGroceries.items.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();