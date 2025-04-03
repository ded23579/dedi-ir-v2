function loadHome() {
    document.getElementById('content').innerHTML = `
        <div class="hero-header">
        <div class="wrapper">
            <div class="container">
                <div class="hero-pic">
                    <img src="images/Dedi-Ir.webp" alt="Dedi Ir profile picture">
                </div>
                <div class="hero-text">
                    <h5>Hi I'm </h5><h1><span class="input">Dedi Ir</span></h1>
                    <p>
I'm just an ordinary guy who is interested in the world of editing, drawing, poetry, 
rhymes, literation, and photography.
                    </p>
                    <div class="btn-group">
                                                <a href="https://edu.abjad.eu.org" class="btn active">https://edu.abjad.eu.org</a>
<a href="#" onclick="loadPage('articles')" class="btn active">article</a>
                    </div>
                    <div class="social">
                        <a href="https://www.instagram.com/ded.dedii" target="_blank" rel="noopener noreferrer">
<i class="fa-brands fa-instagram"></i>
</a>
                        <a href="https://github.com/ded23579" target="_blank" rel="noopener noreferrer">
<i class="fa-brands fa-github"></i>
</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Inisialisasi Typed.js setelah elemen tersedia
new Typed(".input", {
            strings: ["Dedi Ir", "Weriter", "Content Writer", "Conten Creator", "Dedi Ir"],
            typeSpeed: 50, // Kecepatan mengetik
            backSpeed: 50, // Kecepatan menghapus
            loop: true // Ulangi animasi
        });
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
sidebar.style.display = 'none'; // Sembunyikan sidebar
    }
}