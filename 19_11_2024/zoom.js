const { exec } = require('child_process');
const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const port = 3000;

// Load the config.json file and extract the meetings array
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const meetings = config.meetings;

// Middleware to parse JSON bodies
app.use(express.json());

// Function to get the correct Zoom executable path based on the OS
function getZoomExecutablePath() {
    return path.join(process.env.USERPROFILE, 'AppData', 'Roaming', 'Zoom', 'bin', 'Zoom.exe');
}

// Endpoint to join a meeting
app.post('/join-meeting', (req, res) => {
    const meetingId = req.body.meetingId;  // Meeting ID from request
    const meetingDetails = meetings.find(meeting => meeting.meetingId === meetingId);

    if (!meetingDetails) {
        return res.status(404).send('Meeting ID not found in config.json');
    }

    const password = meetingDetails.password;  // Passcode from config.json

    const zoomPath = getZoomExecutablePath();  // Get the correct Zoom executable path for the OS
    console.log(`Joining meeting: ${meetingId} with passcode: ${password}`);

    // Construct the Zoom command to join the meeting
    const zoomUrl = `zoommtg://zoom.us/join?action=join&confno=${meetingId}&pwd=${password}`;

    // Start Zoom client
    exec(`"${zoomPath}" --url "${zoomUrl}"`, (err, stdout, stderr) => {
        if (err) {
            console.error('Error starting Zoom:', err);
            console.error('stderr:', stderr);
            return res.status(500).send('Failed to start Zoom meeting.');
        }
        console.log('Zoom client started:', stdout);
        res.send(`Successfully joined meeting ${meetingId}`);
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
