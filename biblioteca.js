document.addEventListener("DOMContentLoaded", () => {
    
    // Lista de PDFs leídos del directorio
    const pdfFiles = [
        "DBS 01-09.pdf",
        "DBS 10-15.pdf",
        "DBS 16-20.pdf",
        "DBS 21-24.pdf",
        "DBS 25-28.pdf",
        "DBS 29-32.pdf",
        "DBS 33-36.pdf",
        "DBS 37-40.pdf",
        "DBS 41-44.pdf",
        "DBS 45-48.pdf",
        "DBS 49-52.pdf",
        "DBS 53-56.pdf",
        "DBS 57-60.pdf",
        "DBS 61-64.pdf",
        "DBS 65-68.pdf",
        "DBS 69-72.pdf",
        "DBS 73-78.pdf",
        "DBS 79-83.pdf",
        "DBS 84-87.pdf",
        "DBS 88-92.pdf",
        "DBS 93-96.pdf",
        "DBS 97-100.pdf",
        "DBS 101-104.pdf",
        "DBS 104.50 (FAN ART).pdf"
    ];

    const grid = document.getElementById('library-grid');
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-iframe');
    const modalTitle = document.getElementById('pdf-title');
    const closeBtn = document.getElementById('close-modal');

    // Populate the grid
    pdfFiles.forEach(file => {
        const title = file.replace('.pdf', ''); // Quitar extensión
        
        const card = document.createElement('div');
        card.className = 'manga-card';
        card.innerHTML = `
            <div class="manga-card-overlay">
                <h3>${title}</h3>
            </div>
        `;
        
        card.addEventListener('click', () => {
            // Abrir el modal y cargar el PDF
            modalTitle.textContent = title;
            // The path must correctly reference the folder
            iframe.src = `Manga Dragon ball super completo/${file}`;
            modal.classList.add('active');
        });

        grid.appendChild(card);
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        iframe.src = ''; // Descargar el PDF para ahorrar recursos
    });

});
