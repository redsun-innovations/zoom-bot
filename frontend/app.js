 // Zoom Web SDK configuration
 ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.5/lib', '/av');
 ZoomMtg.preLoadWasm();
 ZoomMtg.prepareWebSDK();

 const zoomConfig = {
     apiKey: 'zoom_key',
     meetingNumber: 'Meeting-num',
     role: 0,
     userName: 'Zoom Bot',
     userEmail: '',
     passWord: 'meeting-pass',
 };

 function joinMeeting() {
     // Fetch signature from backend
     fetch('http://localhost:3000/zoom-signature')
         .then(response => response.json())
         .then(data => {
             const signature = data.signature;

             // Initialize Zoom Meeting
             ZoomMtg.init({
                 leaveUrl: 'https://zoom.us',
                 isSupportAV: true,
                 success: () => {
                     ZoomMtg.join({
                         signature: signature,
                         apiKey: zoomConfig.apiKey,
                         meetingNumber: zoomConfig.meetingNumber,
                         userName: zoomConfig.userName,
                         passWord: zoomConfig.passWord,
                         success: () => {
                             console.log('Joined meeting successfully');
                         },
                         error: (err) => {
                             console.error('Failed to join meeting:', err);
                         }
                     });
                 },
                 error: (err) => {
                     console.error('Zoom init error:', err);
                 }
             });
         })
         .catch(err => console.error('Error fetching signature:', err));
 }