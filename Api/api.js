const axios = require('axios');

const token = '';

const meetingId = 'meeting-id'; 

axios.get(`https://api.zoom.us/v2/metrics/meetings/${meetingId}/participants`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).then(response => {
  console.log('Live Participants:', response.data.participants);
}).catch(error => {
  console.error(error.response ? error.response.data : error.message);
});
