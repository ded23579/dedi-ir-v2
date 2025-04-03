// Daftar layanan ping
const pingServices = [
    "http://rpc.pingomatic.com/",
    "http://rpc.twingly.com/",
    "http://blogsearch.google.com/ping/RPC2",
    "http://ping.feedburner.com/",
    "http://ping.blo.gs/",
    "http://rpc.weblogs.com/RPC2",
    "http://rpc.icerocket.com:10080/",
    "http://rpc.copygator.com/ping/",
    "http://rpc.technorati.com/rpc/ping",
    "http://ping.fc2.com",
    "http://www.blogdigger.com/RPC2",
    "http://www.blogshares.com/rpc.php",
    "http://www.blogsnow.com/ping",
    "http://www.blogstreet.com/xrbin/xmlrpc.cgi",
    "http://rpc.bloggerei.de/ping/",
    "http://ping.cocolog-nifty.com/xmlrpc",
    "http://ping.myblog.jp",
    "http://api.my.yahoo.com/RPC2"
];

// Fungsi untuk mengirim ping ke satu layanan
function sendPing(serviceUrl, blogName, blogUrl, rssUrl) {
    const xmlPayload = `
        <?xml version="1.0"?>
        <methodCall>
            <methodName>weblogUpdates.ping</methodName>
            <params>
                <param><value>${blogName}</value></param>
                <param><value>${blogUrl}</value></param>
                <param><value>${rssUrl}</value></param>
            </params>
        </methodCall>
    `;

    fetch(serviceUrl, {
        method: "POST",
        headers: {
            "Content-Type": "text/xml"
        },
        body: xmlPayload
    })
    .then(response => {
        if (response.ok) {
            console.log(`Ping berhasil dikirim ke: ${serviceUrl}`);
        } else {
            console.error(`Ping gagal ke: ${serviceUrl} - ${response.statusText}`);
        }
    })
    .catch(error => {
        console.error(`Kesalahan saat mengirim ping ke: ${serviceUrl} - ${error}`);
    });
}

// Fungsi untuk mengirim ping ke semua layanan dengan jeda 5 detik
async function pingAllServices(blogName, blogUrl, rssUrl) {
    for (const serviceUrl of pingServices) {
        sendPing(serviceUrl, blogName, blogUrl, rssUrl);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Jeda 5 detik
    }
}

// Contoh penggunaan
document.addEventListener("DOMContentLoaded", () => {
    const blogName = "Dedi IR Blog"; // Nama blog Anda
    const blogUrl = "https://ded23579.github.io/"; // URL blog Anda
    const rssUrl = "https://ded23579.github.io/rss.xml"; // URL RSS feed Anda

    // Kirim ping ke semua layanan
    pingAllServices(blogName, blogUrl, rssUrl);
});
