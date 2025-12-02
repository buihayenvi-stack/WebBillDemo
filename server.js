const express = require('express');
const cors = require('cors');
const path =require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/api/invoices', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData.hoa_don);
    });
});

app.get('/api/invoices/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        const jsonData = JSON.parse(data);
        const invoice = jsonData.hoa_don.find(inv => inv.id === parseInt(req.params.id));
        if (invoice) {
            const details = jsonData.chi_tiet_hoa_don.filter(item => item.ma_hoa_don === invoice.id);
            res.json({ ...invoice, details });
        } else {
            res.status(404).send('Invoice not found');
        }
    });
});

app.get('/api/stats', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        const jsonData = JSON.parse(data);
        const totalRevenue = jsonData.hoa_don.reduce((sum, inv) => sum + inv.tong_tien_thanh_toan, 0);
        const totalInvoices = jsonData.hoa_don.length;
        
        const revenueByStore = jsonData.hoa_don.reduce((acc, inv) => {
            acc[inv.ten_cua_hang] = (acc[inv.ten_cua_hang] || 0) + inv.tong_tien_thanh_toan;
            return acc;
        }, {});

        res.json({
            totalRevenue,
            totalInvoices,
            revenueByStore
        });
    });
});


// Serve the main HTML file
app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});