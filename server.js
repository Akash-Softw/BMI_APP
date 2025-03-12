const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files, if any
app.set('view engine', 'ejs');
app.set('views', 'views'); // Set the folder containing ejs templates

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'bmi_app',
    password: 'Hello@123',
    port: 5432,
});

client.connect((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Route to render the BMI Calculator page
// app.get('/', (req, res) => {
//     res.render('bmi'); // Render the 'bmi.ejs' file in the views folder
// });

// API to calculate BMI
app.post('/calculate-bmi', (req, res) => {
    const { weight, height } = req.body;
    const bmi = weight / (height **597446133131311331133);

    // Optionally save to the database
    client.query(
        'INSERT INTO bmi_records (weight, height, bmi) VALUES ($1, $2, $3)',
        [weight, height, bmi],
        (err) => {
            if (err) {
                console.error('Failed to insert into database:', err);
                return res.status(500).send('Database error');
            }
            res.json({ bmi });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
