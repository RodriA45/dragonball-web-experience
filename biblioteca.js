document.addEventListener("DOMContentLoaded", () => {
    
    // Lista de mangas con su link directo al archivo de Google Drive
    const mangaVolumes = [
        { title: "DBS 01-09", link: "https://drive.google.com/file/d/1DH0jBUbUXHjkWP4Sz8AvwkObpwSGwbVJ/view?usp=sharing" },
        { title: "DBS 10-15", link: "https://drive.google.com/file/d/1fA1oCCoD5J0OaHsrt_taDcG-KkVzRIG_/view?usp=sharing" },
        { title: "DBS 16-20", link: "https://drive.google.com/file/d/1WnFYjGbzVsvJHkgXGsP-oOjoqghtQm4U/view?usp=sharing" },
        { title: "DBS 21-24", link: "https://drive.google.com/file/d/1ZdUw4ej5fJGo-ttmFLy2GO1xr3kq1gHI/view?usp=sharing" },
        { title: "DBS 25-28", link: "https://drive.google.com/file/d/1_hP8sDna4gW8vFuC5VtdCwkdQfl1mZ7x/view?usp=sharing" },
        { title: "DBS 29-32", link: "https://drive.google.com/file/d/1vBUCKOjxJP9YXR2mwvBc_kVVFT4qjB57/view?usp=sharing" },
        { title: "DBS 33-36", link: "https://drive.google.com/file/d/1cqxcglbAm1f9--2-vPNrJPVNRVGeLQII/view?usp=sharing" },
        { title: "DBS 37-40", link: "https://drive.google.com/file/d/1GN1LqxdDtiGq0Nmg9bD_xswjzqV8kQd5/view?usp=sharing" },
        { title: "DBS 41-44", link: "https://drive.google.com/file/d/1ETvbE96vZUjaecTbH5ux8j44UaZxZNQp/view?usp=sharing" },
        { title: "DBS 45-48", link: "https://drive.google.com/file/d/1xZG4A-VI9OCqPM7_v79AmC-D5Fhdgr3O/view?usp=sharing" },
        { title: "DBS 49-52", link: "https://drive.google.com/file/d/1Fji9xV9TpagXbSIUG6Nni3IWtwWi8R1K/view?usp=sharing" },
        { title: "DBS 53-56", link: "https://drive.google.com/file/d/161kZ_PiO0pkBoKtaItJYK4Jl8sQd7GGv/view?usp=sharing" },
        { title: "DBS 57-60", link: "https://drive.google.com/file/d/1N6kwBdXT7nL8E9lKixCDf_A4lQ55DlgL/view?usp=sharing" },
        { title: "DBS 61-64", link: "https://drive.google.com/file/d/12O4Ok69tAWRmXhN1oNeUMKOf2SvRtbHj/view?usp=sharing" },
        { title: "DBS 65-68", link: "https://drive.google.com/file/d/1lEjDE_YE0FY1DFO3qkeAzMvW92O65LWE/view?usp=sharing" },
        { title: "DBS 69-72", link: "https://drive.google.com/file/d/1S9ozOcrsPIh4ICwCe71nTKxE5CO3vOTi/view?usp=sharing" },
        { title: "DBS 73-78", link: "https://drive.google.com/file/d/12ThPT3A7GsXrwrHR2_J-g-15l8bpfNji/view?usp=sharing" },
        { title: "DBS 79-83", link: "https://drive.google.com/file/d/1heoMAYkUK-IceTqrnb2DNmf2e2nS9Nw3/view?usp=sharing" },
        { title: "DBS 84-87", link: "https://drive.google.com/file/d/1hmWcMCZGux6eLCrma0P8U0y7rD23r98R/view?usp=sharing" },
        { title: "DBS 88-92", link: "https://drive.google.com/file/d/1EPGx7Y5Z76x_KrdlLm3hYhT6G49rWNll/view?usp=sharing" },
        { title: "DBS 93-96", link: "https://drive.google.com/file/d/1D7bLhFEW_Y1ZEufU2MMKnePAvg1YpjLY/view?usp=sharing" },
        { title: "DBS 97-100", link: "https://drive.google.com/file/d/1YLQR7suu_MYDRtH3ncC2jtAcgHDBBxy7/view?usp=sharing" },
        { title: "DBS 101-104", link: "https://drive.google.com/file/d/1U2XndMMXJ9OUQkH7N98HoS67ZSMDPKCJ/view?usp=sharing" },
        { title: "DBS 104.50 (FAN ART)", link: "https://drive.google.com/file/d/16yKW54VmTr862vfrIU0XGl6RV3LCWcY3/view?usp=sharing" }
    ];

    const grid = document.getElementById('library-grid');
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-iframe');
    const modalTitle = document.getElementById('pdf-title');
    const closeBtn = document.getElementById('close-modal');

    // Helper to extract File ID from Google Drive URL
    function getFileId(url) {
        const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
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
            const fileId = getFileId(manga.link);
            if (fileId) {
                modalTitle.textContent = manga.title;
                // Usar la vista incrustada (preview) de Google Drive para archivos directos
                iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
                modal.classList.add('active');
            } else {
                // Fallback
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
