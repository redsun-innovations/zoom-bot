const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

const zoomConfig = {
  apiKey: 'api-key',
  apiSecret: 'api-secret',
  meetingNumber: 'meeting-num',
  role: 0 
};

// Function to generate Zoom meeting signature
function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');
  return signature;
}

// API endpoint to get the Zoom signature
app.get('/zoom-signature', (req, res) => {
  const signature = generateSignature(
    zoomConfig.apiKey,
    zoomConfig.apiSecret,
    zoomConfig.meetingNumber,
    zoomConfig.role
  );
  res.json({ signature });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
