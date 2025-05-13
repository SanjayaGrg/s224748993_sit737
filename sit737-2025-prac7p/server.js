const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const winston = require("winston");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());

// Configure logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// MongoDB connection
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "crudDB";
const collectionName = process.env.COLLECTION_NAME || "items";
const mongoUsername = process.env.MONGO_USERNAME || "admin";
const mongoPassword = process.env.MONGO_PASSWORD || "admin";

let db;

async function connectToDatabase() {
    try {
        const client = new MongoClient(mongoUrl, {
            auth: {
                username: mongoUsername,
                password: mongoPassword
            },
            authSource: 'admin'
        });
        await client.connect();
        db = client.db(dbName);
        logger.info("Connected to MongoDB successfully");

        // Create index if needed
        await db.collection(collectionName).createIndex({ name: 1 });
    } catch (error) {
        logger.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

// Connect to database when server starts
connectToDatabase();

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// CRUD Operations

// Create - POST
app.post('/api/items', async (req, res) => {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(req.body);
        logger.info(`Created item with id: ${result.insertedId}`);
        res.status(201).json({
            success: true,
            id: result.insertedId
        });
    } catch (error) {
        logger.error("Error creating item:", error);
        res.status(500).json({
            success: false,
            error: "Failed to create item"
        });
    }
});

// Read All - GET
app.get('/api/items', async (req, res) => {
    try {
        const collection = db.collection(collectionName);
        const items = await collection.find({}).toArray();
        logger.info(`Retrieved ${items.length} items`);
        res.status(200).json({
            success: true,
            data: items
        });
    } catch (error) {
        logger.error("Error retrieving items:", error);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve items"
        });
    }
});

// Read One - GET
app.get('/api/items/:id', async (req, res) => {
    try {
        const collection = db.collection(collectionName);
        const item = await collection.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!item) {
            logger.warn(`Item not found with id: ${req.params.id}`);
            return res.status(404).json({
                success: false,
                error: "Item not found"
            });
        }

        logger.info(`Retrieved item with id: ${req.params.id}`);
        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        logger.error("Error retrieving item:", error);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve item"
        });
    }
});

// Update - PUT
app.put('/api/items/:id', async (req, res) => {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        if (result.matchedCount === 0) {
            logger.warn(`Item not found for update with id: ${req.params.id}`);
            return res.status(404).json({
                success: false,
                error: "Item not found"
            });
        }

        logger.info(`Updated item with id: ${req.params.id}`);
        res.status(200).json({
            success: true,
            message: "Item updated successfully"
        });
    } catch (error) {
        logger.error("Error updating item:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update item"
        });
    }
});

// Delete - DELETE
app.delete('/api/items/:id', async (req, res) => {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            logger.warn(`Item not found for deletion with id: ${req.params.id}`);
            return res.status(404).json({
                success: false,
                error: "Item not found"
            });
        }

        logger.info(`Deleted item with id: ${req.params.id}`);
        res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    } catch (error) {
        logger.error("Error deleting item:", error);
        res.status(500).json({
            success: false,
            error: "Failed to delete item"
        });
    }
});

// Start server
app.listen(port, () => {
    logger.info(`Server listening on port: ${port}`);
    console.log(`Server listening on port: ${port}`);
});