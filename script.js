      // Sayfa yenilenmeden / kapanmadan HEMEN ÖNCE konumu kaydet
// ==========================================
// 1. SAYFA YÜKLENİR YÜKLENMEZ EKRANI GİZLE (F5 ÇÖZÜMÜ)
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const intro = document.getElementById('intro-screen');
    // Eğer sekmeye daha önce giriş yapıldıysa, ekranı anında sil
    if (sessionStorage.getItem('archiveEntered') === 'true') {
        if (intro) {
            intro.style.display = 'none';
        }
    }
});

// ==========================================
// 2. GİRİŞ BUTONU (MÜZİĞİ ZORLAMAZ, SADECE HAFIZAYI KONTROL EDER)
// ==========================================
function enterArchive() {
    const intro = document.getElementById('intro-screen');
    if (intro) {
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';
        setTimeout(() => intro.style.display = 'none', 1000);
    }
    
    // Giriş yapıldığını kaydet
    sessionStorage.setItem('archiveEntered', 'true'); 
    
    // Müzik en son açık bırakıldıysa, giriş yapınca çalmaya devam etsin
    const audio = document.getElementById('bg-audio');
    if (localStorage.getItem('audioPlaying') === 'true' && audio) {
        audio.play().catch(e => console.log("Otomatik oynatma engellendi."));
    }
}

        // YUKARI ÇIKMA MANTIĞI
        window.onscroll = function() {
            const btn = document.getElementById('scrollTopBtn');
            if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
                btn.style.display = "flex";
            } else {
                btn.style.display = "none";
            }
        };
        function scrollToTop() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        // GİZLİ KART AÇILIR EKRANI (HİÇ KİMSE İÇİN)
        function openSecretModal() {
            document.getElementById('modal-name').innerText = "Hiç Kimse (Jaqen H'ghar)";
            document.getElementById('modal-dates').innerText = "Bilinmiyor";
            document.getElementById('modal-affiliation').innerText = "Yüzsüz Adamlar (Siyah ve Beyazın Evi)";
            document.getElementById('modal-summary').innerText = "Bir adamın adı yoktur. Braavos'taki Siyah ve Beyazın Evi'nde Çok Yüzlü Tanrı'ya hizmet eden ölümcül bir suikastçıdır. Ölümün bir lütuf olduğuna inanır. Arya Stark'a ölümün üç adını vermiş ve ona kimliğini silmeyi, gölgelerde bir 'Hiç Kimse' olmayı öğretmiştir. Valar Morghulis.";
            document.getElementById('modal-watermark').style.backgroundImage = 'none'; // Logo gösterme
            document.getElementById('character-modal').style.display = 'flex';
        }


      function switchTab(tabId, btnElement) {
    currentShow = tabId; // Filtrenin okuduğu değişkeni günceller
    sessionStorage.setItem('activeShow', tabId); // F5 atınca hangi dizide olduğunu hatırlar
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    filterAndRender();
}

      function filterAndRender() {
            const container = document.getElementById('character-container');
            let searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const selectedHouse = document.getElementById('houseFilter').value;
            container.innerHTML = '';

            // GİZLİ ŞİFRE: DRACARYS
            if (searchTerm === "dracarys") {
                document.body.classList.add("dracarys-effect");
                setTimeout(() => document.body.classList.remove("dracarys-effect"), 2000); 
                document.getElementById('searchInput').value = ""; 
                searchTerm = ""; 
            }

            // GİZLİ ŞİFRE: VALAR MORGHULIS
            if (searchTerm === "valar morghulis") {
                // Tıklanabilir özel secret modal
                container.innerHTML = `
                    <div class="card" style="border-color: #555; background-color: #1a1a1a;" onclick="openSecretModal()">
                        <div class="img-container" style="background-color: #000;">
                            <img src="images/jaqen.jpg" alt="Jaqen" onerror="this.style.display='none'">
                        </div>
                        <h3 style="color: #888;">Hiç Kimse</h3>
                        <div class="house-label" style="color: #666;">Yüzsüz Adamlar</div>
                    </div>
                `;
                return; 
            }

            const filteredChars = characters.filter(char => {
                const isCorrectTab = char.show === currentShow;
                const matchesSearch = char.name.toLowerCase().includes(searchTerm) || 
                                      char.affiliation.toLowerCase().includes(searchTerm);
                const matchesHouse = selectedHouse === "all" || char.affiliation.includes(selectedHouse);
                return isCorrectTab && matchesSearch && matchesHouse;
            });

            filteredChars.forEach(char => {
                const originalIndex = characters.indexOf(char);
                
                // HANE AURASI ALGORİTMASI (Bunu koruduk)
                let auraClass = "";
                if (char.affiliation.includes("Stark")) auraClass = "aura-stark";
                else if (char.affiliation.includes("Targaryen")) auraClass = "aura-targaryen";
                else if (char.affiliation.includes("Lannister")) auraClass = "aura-lannister";

                container.innerHTML += `
                    <div class="card ${auraClass}" onclick="openModal(${originalIndex})">
                        <div class="img-container">
                            <img src="${char.image}" alt="${char.name}" onerror="this.style.display='none'">
                        </div>
                        <h3>${char.name}</h3>
                        <div class="house-label">${char.affiliation.split('/')[0].trim()}</div>
                    </div>
                `;
            });
        }

        // SES BUTONU KONTROLÜ
       // SES SEVİYESİNİ AYARLAMA
      function changeVolume() {
    const audio = document.getElementById('bg-audio');
    const volume = document.getElementById('volume-slider').value;
    audio.volume = volume;
    localStorage.setItem('archiveVolume', volume); // Hafızaya kaydet
}

        // SES AÇMA/KAPAMA KONTROLÜ
      function toggleAudio() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('audio-toggle');
    
    if (audio.paused || audio.muted) {
        audio.muted = false;
        audio.play();
        btn.innerText = "Sesi Kapat 🔇";
        localStorage.setItem('archiveMuted', 'false'); // Hafızaya kaydet
    } else {
        audio.muted = true;
        btn.innerText = "Sesi Aç 🔊";
        localStorage.setItem('archiveMuted', 'true'); // Hafızaya kaydet
    }
}

        function openModal(index) {
            const char = characters[index];
            document.getElementById('modal-name').innerText = char.name;
            document.getElementById('modal-dates').innerText = char.dates;
            document.getElementById('modal-affiliation').innerText = char.affiliation;
            document.getElementById('modal-summary').innerText = char.summary;
            
            // Dinamik Lokal Filigran Mantığı
            const watermark = document.getElementById('modal-watermark');
            let foundSigil = false;
            
            for (const [house, url] of Object.entries(houseSigils)) {
                if (char.affiliation.includes(house)) {
                    watermark.style.backgroundImage = `url('${url}')`;
                    foundSigil = true;
                    break;
                }
            }
            
            if (!foundSigil) {
                watermark.style.backgroundImage = 'none'; // Haneye ait değilse boş kalsın
            }

            document.getElementById('character-modal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('character-modal').style.display = 'none';
        }

        function closeModalOutside(event) {
            if (event.target === document.getElementById('character-modal')) closeModal();
        }
// Global değişkenleri sessionStorage'dan çekiyoruz ki sekmeyi kapatınca sıfırlansın
let currentShow = sessionStorage.getItem('activeShow') || 'got';

window.onload = function() {
    const intro = document.getElementById('intro-screen');
    
    // 1. GİRİŞ EKRANI KONTROLÜ (sessionStorage = sadece sekme kapanana kadar)
    if (sessionStorage.getItem('archiveEntered') === 'true') {
        if (intro) intro.remove(); 
    }

    // 2. ANA SEKME VE ALT SERİ HAFIZASI
    const lastSection = sessionStorage.getItem('activeSection') || 'karakterler';
    const sectionBtn = document.querySelector(`.sidebar-btn[onclick*="${lastSection}"]`);
    
    switchMainSection(lastSection, sectionBtn);

 if (lastSection === 'karakterler') {
        const showBtn = document.querySelector(`.tab-btn[onclick*="${currentShow}"]`);
        if (showBtn) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            showBtn.classList.add('active');
        }
    }

    // 3. SES HAFIZASI (Bu localStorage kalsın, kalıcı ayardır)
    const audio = document.getElementById('bg-audio');
    const volumeSlider = document.getElementById('volume-slider');
    const savedVolume = localStorage.getItem('archiveVolume');
    const savedMuted = localStorage.getItem('archiveMuted');

    if (savedVolume !== null && audio) {
        audio.volume = savedVolume;
        if (volumeSlider) volumeSlider.value = savedVolume;
    }
    if (savedMuted === 'true' && audio) {
        audio.muted = true;
        const toggleBtn = document.getElementById('audio-toggle');
        if (toggleBtn) toggleBtn.innerText = "Sesi Aç 🔊";
    }

    if (typeof setRandomQuote === 'function') setRandomQuote();

    // 4. KAYDIRMA (SCROLL) POZİSYONUNU YÜKLE
    // Karakterler render edildikten hemen sonra çalışması için ufak bir gecikme ekliyoruz
    setTimeout(() => {
        const savedScroll = sessionStorage.getItem('scrollPosition');
        if (savedScroll) {
            window.scrollTo(0, parseInt(savedScroll, 10));
        }
    }, 100); 
};

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
})


        function setRandomQuote() {
            const quoteEl = document.getElementById('random-quote');
            if(quoteEl) {
                const randIndex = Math.floor(Math.random() * quotes.length);
                quoteEl.innerText = quotes[randIndex];
            }
        }
        
function filterHouseMotto() {
            const selectedHouse = document.getElementById('houseFilter').value;
            const overlay = document.getElementById('motto-overlay');
            const sigilImg = document.getElementById('motto-sigil');
            const mottoText = document.getElementById('motto-text');
            
            if (selectedHouse !== "all" && houseMottos[selectedHouse] && houseSigils[selectedHouse]) {
                // Logo ve sözü ayarla
                sigilImg.src = houseSigils[selectedHouse];
                mottoText.innerText = houseMottos[selectedHouse];
                
                // 1. Ekranı görünür yap ve karartmaya başla
                overlay.style.display = 'flex';
                setTimeout(() => { overlay.style.opacity = '1'; }, 10);
                
                // 2. KRİTİK NOKTA: Ekran tam karardıktan SONRA (500ms) arkadaki kartları değiştir.
                // Böylece kullanıcı kartların arka planda değiştiğini asla görmez.
                setTimeout(() => {
                    filterAndRender();
                }, 500); 
                
                // 3. 3 saniye ekranda tut, sonra yavaşça karartıp kapat
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => { overlay.style.display = 'none'; }, 500);
                }, 1500); 
                
            } else {
                // "Tüm Sancaklar" seçildiyse geçiş ekranı olmadan direkt filtrele
                filterAndRender();
            }
        }

function filterByShow(showId, btnElement) {
    currentShow = showId; 
    sessionStorage.setItem('activeShow', showId); 
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    
    filterAndRender(); 
}

        // --- SOL MENÜ BÖLÜM DEĞİŞTİRİCİ ---
function switchMainSection(sectionId, btnElement) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');
    if (btnElement) btnElement.classList.add('active');
    
    sessionStorage.setItem('activeSection', sectionId); 
    
    if(sectionId === 'karakterler') filterAndRender();
}