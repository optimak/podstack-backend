const cron = require('node-cron');
const { exec } = require('child_process');
const fs = require('fs');
const knex = require('knex')(require('./knexfile')); 

const pythonCommand = 'python3';
const pythonScript = './retrieve_podcasters.py';

process.env.PYTHONPATH = './venv/lib/python3.10/site-packages';



// Schedule a cron job to run once every month

cron.schedule('0 0 1 * *', () => {
    console.log(`Running scheduled task at: ${new Date().toLocaleString()}`);

    // Step 1: Execute the Python script
    exec(`${pythonCommand} ${pythonScript}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Python script STDERR: ${stderr}`);
            return;
        }

        // Step 2: Parse JSON data directly from stdout
        let podcasters;
        try {
            podcasters = JSON.parse(stdout); // Parse the JSON output
        } catch (parseErr) {
            console.error(`Error parsing JSON data: ${parseErr.message}`);
            return;
        }

        // Step 3: Insert the data into the podstack table
        knex('podstack')
            .insert(podcasters)
            .then(() => {
                console.log('Data successfully inserted into the database.');
            })
            .catch((dbErr) => {
                console.error(`Error inserting data into the database: ${dbErr.message}`);
            });
    });
});