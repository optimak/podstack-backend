const { exec } = require('child_process');
const fs = require('fs');

const pythonCommand = 'python3'; 
const pythonScript = './retrieve_podcasters.py'; 

// Set the PYTHONPATH environment variable to include the site-packages directory
// process.env.PYTHONPATH = '/Users/chiamakaaghaizu/Library/Python/3.9/lib/python/site-packagespath_to_your_python_lib/site-packages'; // Replace with the path to your Python site-packages directory
process.env.PYTHONPATH = '/opt/homebrew/lib/python3.10/site-packages'
// Execute the Python script
exec(`${pythonCommand} ${pythonScript}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Python script STDERR: ${stderr}`);
        return;
    }
    fs.writeFile('./seed-data/podcasters.json', stdout, (err) => {
        if (err) {
            console.error(`Error writing Python output to file: ${err}`);
            return;
        }
        console.log('Python output written to podcasters.json');
    });

    // console.log(`Python script output: ${stdout}`);
});
