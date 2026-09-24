document.addEventListener("DOMContentLoaded", () => {
    
    // Lista de mangas con su link de Google Drive específico
    const mangaVolumes = [
        { title: "DBS 01-09", link: "https://drive.google.com/drive/folders/1NaezQx6ahBXTZKwlu9K1fKwGzIp3nfjj?usp=sharing" },
        { title: "DBS 10-15", link: "https://drive.google.com/drive/folders/1LjwXxaLAUCxticeHRpLUzWybjnS0DWNj?usp=sharing" },
        { title: "DBS 16-20", link: "https://drive.google.com/drive/folders/1EusNy8F-KNGwGzCxM5PRXlLhOVP7EXvf?usp=sharing" },
        { title: "DBS 21-24", link: "https://drive.google.com/drive/folders/1gCrsdnpeF23ZX9X2u4YRuix_FN3Asgw2?usp=sharing" },
        { title: "DBS 25-28", link: "https://drive.google.com/drive/folders/181vNLXr6ZCapNN8nQE_e6eDXq-7rFBbL?usp=sharing" },
        { title: "DBS 29-32", link: "https://drive.google.com/drive/folders/1O3Q3dLCNRZseEfiFAXfbeTQtjNzBMBFc?usp=sharing" },
        { title: "DBS 33-36", link: "https://drive.google.com/drive/folders/1dw55CropoCpXxByUqzxjA58uWX9LHZID?usp=sharing" },
        { title: "DBS 37-40", link: "https://drive.google.com/drive/folders/180GJg3G9dZnOMLiB61ARxIIt0nyd1CQk?usp=sharing" },
        { title: "DBS 41-44", link: "https://drive.google.com/drive/folders/1BfZD9cur99NxnnY6bInnflVuXjMuNcI7?usp=sharing" },
        { title: "DBS 45-48", link: "https://drive.google.com/drive/folders/1pXNf7iICblp3VaTvIlMtDOXvbIhAQ7E5?usp=sharing" },
        { title: "DBS 49-52", link: "https://drive.google.com/drive/folders/1jiGEdwnpK260fYj6pHl7sz2kiFleDLPM?usp=sharing" },
        { title: "DBS 53-56", link: "https://drive.google.com/drive/folders/1392dzWaXpn2mqQ1e5syM8L4L0ELCMcDF?usp=sharing" },
        { title: "DBS 57-60", link: "https://drive.google.com/drive/folders/1gDDHRxBbP3ghzlmu65EZ83JicviSMqvp?usp=sharing" },
        { title: "DBS 61-64", link: "https://drive.google.com/drive/folders/1M153Q_hWrO0l6pEvBSiQAdo61hAE5-I0?usp=sharing" },
        { title: "DBS 65-68", link: "https://drive.google.com/drive/folders/1KoY5-ncJbaTXzba0YkJuysfEWA72ZYnd?usp=sharing" },
        { title: "DBS 69-72", link: "https://drive.google.com/drive/folders/1wqMkhmxzIMYLnpD2wEWfF2YUpGEfMudF?usp=sharing" },
        { title: "DBS 73-78", link: "https://drive.google.com/drive/folders/1Xy67vB53vUIC72Z4zGFCFXw7R1g10Jal?usp=sharing" },
        { title: "DBS 79-83", link: "https://drive.google.com/drive/folders/1ukqTqfUFjgNoOsDZNg0CfGMM-RogG7DK?usp=sharing" },
        { title: "DBS 84-87", link: "https://drive.google.com/drive/folders/1eWB1HIOUgadJ_uOC9v5nvKJPYe3Ekf9y?usp=sharing" },
        { title: "DBS 88-92", link: "https://drive.google.com/drive/folders/1hsQG0zNQWmicyZyKPC-I26nG4-NdHKjA?usp=sharing" },
        { title: "DBS 93-96", link: "https://drive.google.com/drive/folders/1WB73POJQS4M2iZX0RRLuqcLYYg3aG3NF?usp=sharing" },
        { title: "DBS 97-100", link: "https://drive.google.com/drive/folders/1tyTqQCOQjinFW9McFFTB8-RS4uDWKsRO?usp=sharing" },
        { title: "DBS 101-104", link: "https://drive.google.com/drive/folders/1ACmttcPBU-dpx6h-BCuBnV4Qw1NodSpk?usp=sharing" },
        { title: "DBS 104.50 (FAN ART)", link: "https://drive.google.com/drive/folders/1uzhtJkv6MlDQRNDTdNtMvU3RBqla9716?usp=sharing" }
    ];

    const grid = document.getElementById('library-grid');
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-iframe');
    const modalTitle = document.getElementById('pdf-title');
    const closeBtn = document.getElementById('close-modal');

    // Helper to extract Folder ID from Google Drive URL
    function getFolderId(url) {
        const match = url.match(/folders\/([a-zA-Z0-9-_]+)/);
        return match ? match[1] : null;
    }

    // Populate the grid
    mangaVolumes.forEach(manga => {
        const card = document.createElement('div');
        card.className = 'manga-card';
        card.innerHTML = `
            <div class="manga-card-overlay">
                <h3>${manga.title}</h3>
            </div>
        `;
        
        card.addEventListener('click', () => {
            const folderId = getFolderId(manga.link);
            if (folderId) {
                modalTitle.textContent = manga.title;
                // Usar la vista incrustada de Google Drive para carpetas
                iframe.src = `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;
                modal.classList.add('active');
            } else {
                // Fallback por si la URL no es de carpeta
                window.open(manga.link, '_blank');
            }
        });

        grid.appendChild(card);
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        iframe.src = ''; // Descargar el PDF para ahorrar recursos
    });

});
