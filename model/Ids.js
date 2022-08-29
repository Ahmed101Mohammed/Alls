// modules:
const mongoose = require('mongoose');

// Ids models:
const IdsSchema = mongoose.Schema(
    {
        users: String,
        products: String,
        channels: String,
    }
)

// export:
module.exports = Ids;