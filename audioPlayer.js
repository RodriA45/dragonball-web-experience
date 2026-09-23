// audioPlayer.js
document.addEventListener("DOMContentLoaded", () => {
    const songs = [
        "Mi corazón encantado - Aaron Montalvo.mp3",
        "Dragon Ball Z - Chala Head Chala (opening Latino) Full HD 1080p.mp3",
        "Dragon Ball Z Opening 2 El Poder Nuestro Es canta Adrian Barba.mp3",
        "Dragon Ball Z Kai Opening Latino Mario Heras.mp3",
        "Vuela, pega y esquiva (Letra) - Opening 1 Dragon Ball Super Cartoon Network - chozetsu dynamic HD.mp3",
        "Dragon Ball Super Opening 2 en ESPAÑOL LATINO [Oficial] Full HD ((stereo)) Pascual Reyes, GTXS.mp3",
        "Adios mi amor, talvez no era nuestro momento aun Color Rosa [Usubeni] - Sergio García.mp3"
    ];

    // Friendly display titles for the UI
    const displayTitles = [
        "Mi Corazón Encantado",
        "Chala Head Chala",
        "El Poder Nuestro Es",
        "DBZ Kai (Dragon Soul)",
        "Vuela, Pega y Esquiva",
        "Limit Break x Survivor",
        "Usubeni (Color Rosa)"
    ];

    // Load saved state from localStorage
    let currentIndex = parseInt(localStorage.getItem('dbz_musicIndex')) || 0;
    let isPlaying = localStorage.getItem('dbz_musicPlaying') === 'true';
    let savedTime = parseFloat(localStorage.getItem('dbz_musicTime')) || 0;

    // Create Audio Element
    const audio = new Audio(songs[currentIndex]);
    audio.volume = 0.5;

    // Restore exact second when navigating across pages
    const onCanPlay = () => {
        if (savedTime > 0) {
            audio.currentTime = savedTime;
            savedTime = 0; // Only restore once on initial load
        }
        audio.removeEventListener('canplay', onCanPlay);
    };
    audio.addEventListener('canplay', onCanPlay);

    // Save exact second continuously
    audio.addEventListener('timeupdate', () => {
        localStorage.setItem('dbz_musicTime', audio.currentTime);
    });

    // Auto-play next song when current finishes (loops back to start when playlist ends)
    audio.addEventListener('ended', () => {
        currentIndex = (currentIndex + 1) % songs.length;
        loadAndPlay();
    });

    // Create Player UI and inject into the body
    const playerDiv = document.createElement('div');
    playerDiv.className = 'music-player';
    playerDiv.innerHTML = `
        <div class="music-info">
            <div class="music-title-container">
                <span id="music-title">${displayTitles[currentIndex]}</span>
            </div>
        </div>
        <div class="music-controls">
            <button id="music-prev" class="music-btn" title="Anterior">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
            </button>
            <button id="music-toggle" class="music-btn play-btn" title="Reproducir/Pausar">
                <!-- SVG dynamically injected -->
            </button>
            <button id="music-next" class="music-btn" title="Siguiente">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
            </button>
        </div>
    `;
    document.body.appendChild(playerDiv);

    const toggleBtn = document.getElementById('music-toggle');
    const prevBtn = document.getElementById('music-prev');
    const nextBtn = document.getElementById('music-next');
    const titleSpan = document.getElementById('music-title');

    const iconPlay = '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="white" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    const iconPause = '<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="white" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';

    function updateUI() {
        titleSpan.textContent = displayTitles[currentIndex];
        toggleBtn.innerHTML = isPlaying ? iconPause : iconPlay;
    }

    function loadAndPlay() {
        audio.src = songs[currentIndex];
        if (isPlaying) {
            audio.play().catch(e => {
                console.log("Autoplay blocked by browser");
                isPlaying = false;
                localStorage.setItem('dbz_musicPlaying', false);
                updateUI();
            });
        }
        localStorage.setItem('dbz_musicIndex', currentIndex);
        updateUI();
    }

    // Try autoplay on load if it was playing previously
    updateUI();
    if (isPlaying) {
        audio.play().catch(e => {
            console.log("Autoplay blocked on load");
            isPlaying = false;
            localStorage.setItem('dbz_musicPlaying', false);
            updateUI();
        });
    }

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play();
            isPlaying = true;
        }
        localStorage.setItem('dbz_musicPlaying', isPlaying);
        updateUI();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % songs.length;
        loadAndPlay();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
        loadAndPlay();
    });
});
