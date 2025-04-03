function loadContact() {
    document.getElementById('content').innerHTML = `
<div class="contact-section">
        <h1>Contact Me</h1>
        <p>Jika Anda memiliki pertanyaan atau ingin menghubungi saya, silakan isi formulir di bawah ini:</p>
            <form class="contact-form">
                <div class="form-group">
                    <label for="name">Nama:</label>
                    <input type="text" id="name" name="name" placeholder="Masukkan nama Anda" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Masukkan email Anda" required>
                </div>
                <div class="form-group">
                    <label for="message">Pesan:</label>
                    <textarea id="message" name="message" rows="5" placeholder="Tulis pesan Anda di sini" required></textarea>
                </div>
                <button type="submit" class="btn-submit">Kirim</button>
            </form>
        </div>
    `;
}