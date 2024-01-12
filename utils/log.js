const Item = require('../model/Item');

class ItemService {
    async createItem(itemData) {
        try {
            const newItem = new Item(itemData);
            const savedItem = await newItem.save();
            return savedItem;
        } catch (error) {
            console.error('Error creating item:', error.message);
            throw error;
        }
    }
}

module.exports = new ItemService();
