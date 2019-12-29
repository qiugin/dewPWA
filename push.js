var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BGrn87rpdijFk-eDyQwPVGHVU3GgBgQvZrzRZtCGYpBO9DhPCGkgbFTevoYEo13ri9KzmD6PYZnfA7-dBghO4Us",
   "privateKey": "vhDBeGlgrMDew2RiKihPq4SaBjY45snd4GeoDWcJLTQ"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cxmGfRSKTPY:APA91bEOfVoZA1A7JwZrnzAmuRS5gzp0FqfZXSSQLbof0RtCNNBIaJxm9WBeWwlPbd6qv3Hy9CN4SXwW5SlsI5ZA2pgMTGVCSxMVUx2mB634rIJb8F9bfOLCSqWlHOZ6oZ3hmB6N60UZ",
   "keys": {
       "p256dh": "BP6l04mmRQxC+rxEBEuI89douZyJ71FgTKKZ1nIxfYwyQRMPaEPM868zSjct0aMxTNi65qbt8xO9yVyEGQaNEXo=",
       "auth": "Bw5YSMlovMdC0XWO1NnDeQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '950526881062',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);