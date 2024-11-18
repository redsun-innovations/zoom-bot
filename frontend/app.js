// Zoom Web SDK Initialization
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

// Zoom API Credentials
const API_KEY = 'RXA_QzzRnmSVFB_deOmYw';
const API_SECRET = 'BqdJl9WKN2A7FW8J4xR2AnkFsGjJt7ZF';
const meetingNumber = '75420686814';
const passWord = 'PG4YPN';
const userName = 'jeff';
const leaveUrl = 'https://zoom.us'; // URL to redirect after leaving meeting

// Generate Signature
function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
    const hash = CryptoJS.HmacSHA256(msg, apiSecret);
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${CryptoJS.enc.Base64.stringify(hash)}`).toString('base64');
    return signature.replace(/=+$/, '');
}

// Join Meeting Function
function joinMeeting(signature) {
    ZoomMtg.init({
        leaveUrl: leaveUrl,
        success: function () {
            ZoomMtg.join({
                signature: signature,
                meetingNumber: meetingNumber,
                userName: userName,
                apiKey: API_KEY,
                userEmail: 'your-email@example.com',
                passWord: passWord,
                success: function (res) {
                    console.log('Join meeting success');
                },
                error: function (err) {
                    console.error(err);
                }
            });
        },
        error: function (err) {
            console.error(err);
        }
    });
}

// Button Click Handler
document.getElementById('joinMeetingBtn').addEventListener('click', function () {
    const signature = generateSignature(API_KEY, API_SECRET, meetingNumber, 0); // 0 for attendee
    joinMeeting(signature);
});
