const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Specific route for translation files
app.get('/smartread_tradução_site_:lang', (req, res) => {
    const lang = req.params.lang;
    console.log(`Serving translation file for language: ${lang}`);
    res.sendFile(path.join(__dirname, `smartread_tradução_site_${lang}`), (err) => {
        if (err) {
            console.error(`Error serving translation file for ${lang}:`, err);
            res.status(404).json({ error: `Translation file for ${lang} not found` });
        } else {
            console.log(`Successfully served translation file for ${lang}`);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 