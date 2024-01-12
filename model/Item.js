const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: String,
    note_id: String,
    cat: String,
    content: String,
    user_id: String,
    user_name: String,
}, {
    timestamps: true
});

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);
module.exports = Item;
