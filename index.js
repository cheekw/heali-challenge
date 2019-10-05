const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const AWS = require('aws-sdk');
const app = express();

const MENU_IMAGE_TABLE = process.env.MENU_IMAGE_TABLE;
const MENU_JSON_TABLE = process.env.MENU_JSON_TABLE;

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Menu Image API');
});

// get function for menuimage
app.get('/menuimage/:menuId', (req, res) => {
    const params = {
        TableName: MENU_IMAGE_TABLE,
        Key: {
            menuId: req.params.menuId,
        }
    };

    dynamoDB.get(params, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        }
        if (result.Item) {
            const { menuId, menuImage } = result.Item;
            return res.json({ menuId, menuImage });
        } else {
            return res.status(404).json({ error: "menu not found" });
        }
    });
});

// post function for menuimage
app.post('/menuimage', (req, res) => {
    const { menuId, menuImage } = req.body;

    const params = {
        TableName: MENU_IMAGE_TABLE,
        Item: {
            menuId: menuId,
            menuImage: menuImage,
        }
    };

    dynamoDB.put(params, (error) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        } else {
            return res.json({ menuId, menuImage });
        }
    });
});

// get function for menujson
app.get('/menujson/:menuId', (req, res) => {
    const params = {
        TableName: MENU_JSON_TABLE,
        Key: {
            menuId: req.params.menuId,
        }
    };

    dynamoDB.get(params, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        }
        if (result.Item) {
            const { menuId, menuJson } = result.Item;
            return res.json({ menuId, menuJson });
        } else {
            return res.status(404).json({ error: "menu not found" });
        }
    });
}); 

// post function for menujson
app.post('/menujson', (req, res) => {
    const { menuId, menuJson } = req.body;

    const params = {
        TableName: MENU_JSON_TABLE,
        Item: {
            menuId: menuId,
            menuJson: menuJson,
        }
    };

    dynamoDB.put(params, (error) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ error: error.message });
        } else {
            return res.json({ menuId, menuJson });
        }
    });
});

module.exports.handler = serverless(app);