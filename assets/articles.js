const apiUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjlsoBhX6g-KTTgwhLeD6cDaWObbvu_-nwLdnt3XZIWwLao50OraO901XhEp72hPZQI3gKNSqd0eiLa6TtBIWDxGf37AftQxv6Zqfg8noJ7sr_uXNfLHYDQBI_IWyOcwNnWlJ4mmCzFKehEmW-vfRARyh8mtosMQZ4cihaaNXoddeVJg1XaMriel98kOSsT3ohmtVjXYI9as0S_MjkIXF-wnSWkx4hQV0IZfT8AH9NmgC4ncnz7Hf5mllzcdW0ecDXKxV-Fr_qc3sbEfCmLYAGU5BFTsw&lib=MgnNHUJ8nyHtCMfKhbjqgCUf_rrIVLfIM";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('puisi-container');
        
        data.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';

          // Menampilkan potongan konten (maksimal 300 karakter)
          const previewContent = item.Content.substring(0, 300).replace(/\n/g, '<br>') + "...";

          card.innerHTML = `
            <h2>${item.Tite}</h2>
            <p>${item.Description}</p>
            <p>${previewContent}</p>
            <a class="read-more" href="${item['Url FeaturedImage']}" target="_blank">Baca Selengkapnya</a>
          `;

          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Gagal memuat data:', error);
        document.getElementById('puisi-container').innerHTML = '<p>Gagal memuat puisi. Silakan coba lagi nanti.</p>';
      });
