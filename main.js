import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- FASE 1: INISIALISASI SAAT HALAMAN SIAP ---

// Pastikan DOM sepenuhnya dimuat sebelum menjalankan skrip UI & animasi
document.addEventListener('DOMContentLoaded', () => {
    // --- LOGIKA UNTUK ANIMASI TYPEWRITER ---
function runTypewriterAnimation() {
    const visualEl = document.querySelector('.font-visual');
    const coreEl = document.querySelector('.font-core');

    if (!visualEl || !coreEl) return;

    const text1 = visualEl.textContent;
    const text2 = coreEl.textContent;

    visualEl.textContent = '';
    coreEl.textContent = '';
    visualEl.classList.add('typewriter-text');

    let i = 0;
    function typeVisual() {
        if (i < text1.length) {
            visualEl.textContent += text1.charAt(i);
            i++;
            setTimeout(typeVisual, 200); // Kecepatan ketikan
        } else {
            // Setelah kata pertama selesai, mulai kata kedua
            visualEl.style.borderRight = 'none'; // Hapus kursor dari kata pertama
            coreEl.classList.add('typewriter-text');
            let j = 0;
            function typeCore() {
                if (j < text2.length) {
                    coreEl.textContent += text2.charAt(j);
                    j++;
                    setTimeout(typeCore, 200);
                } else {
                    // Animasi selesai
                    coreEl.style.borderRight = '4px solid #333';
                }
            }
            typeCore();
        }
    }
    typeVisual();
}

runTypewriterAnimation();
// ------------------------------------
    // 2. Inisialisasi Logika Menu Hamburger
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinksList = document.querySelector('.nav-links');
    const bodyEl = document.body;

    if (hamburgerBtn && navLinksList) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('is-active');
            navLinksList.classList.toggle('is-open');
            bodyEl.classList.toggle('menu-is-open');
        });

        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksList.classList.contains('is-open')) {
                    hamburgerBtn.classList.remove('is-active');
                    navLinksList.classList.remove('is-open');
                    bodyEl.classList.remove('menu-is-open');
                }
            });
        });
        console.log("Logika Hamburger Menu berhasil diinisialisasi.");
    } else {
        console.error("Elemen untuk hamburger atau nav-links tidak ditemukan!");
    }

    // --- LOGIKA UNTUK KARTU FILOSOFI ---
    const navItems = document.querySelectorAll('.nav-item');
    const contentPanels = document.querySelectorAll('.content-panel');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Hapus kelas 'active' dari semua item dan panel
            navItems.forEach(nav => nav.classList.remove('active'));
            contentPanels.forEach(panel => panel.classList.remove('active'));

            // Tambahkan kelas 'active' ke item yang diklik
            item.classList.add('active');

            // Tampilkan panel konten yang sesuai
            const targetPanelId = item.getAttribute('data-target');
            const targetPanel = document.getElementById(targetPanelId);
            if(targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    // --- LOGIKA UNTUK KARTU KOLEKSI 3D ---
    const collectionCards = document.querySelectorAll('.collection-card');

    collectionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Balik kartu yang diklik
            card.classList.toggle('is-flipped');
        });
    });
    // --- LOGIKA UNTUK MODAL POP-UP ---
    const modalContainer = document.getElementById('collection-modal');
    if (modalContainer) {
        const modalImg = modalContainer.querySelector('.modal-img');
        const modalTitle = modalContainer.querySelector('.modal-title');
        const modalDescription = modalContainer.querySelector('.modal-description');
        const closeModalBtn = modalContainer.querySelector('.modal-close-btn');

        // Fungsi untuk membuka modal
        const openModal = (cardBack) => {
            modalTitle.textContent = cardBack.dataset.title;
            modalDescription.textContent = cardBack.dataset.description;
            modalImg.src = cardBack.dataset.imgSrc;
            modalContainer.classList.add('is-visible');
        };

        // Fungsi untuk menutup modal
        const closeModal = () => {
            modalContainer.classList.remove('is-visible');
        };

        // Tambahkan event listener ke semua tombol 'Lihat Detail'
        document.querySelectorAll('.card-back a').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Mencegah link berpindah halaman
                const cardBack = e.target.closest('.card-back');
                openModal(cardBack);
            });
        });

        // Event listener untuk tombol close dan klik di luar modal
        closeModalBtn.addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) { // Hanya tutup jika klik di area overlay
                closeModal();
            }
        });
    }
    
    const ticketPriceElement = document.getElementById('ticket-price-value');
    const ticketContainer = document.querySelector('.ticket-price-interactive');

    if (ticketPriceElement && ticketContainer) {
        const originalPrice = "5.000";
        const prices = ["1.000", "2.000", "3.000", "4.000", "5.000"];
        let priceInterval;

        // Saat mouse masuk ke area harga
        ticketContainer.addEventListener('mouseenter', () => {
            let i = 0;
            priceInterval = setInterval(() => {
                ticketPriceElement.textContent = prices[i];
                i = (i + 1) % prices.length;
            }, 150); // Ganti angka setiap 150ms
        });

        // Saat mouse keluar, kembalikan ke harga asli
        ticketContainer.addEventListener('mouseleave', () => {
            clearInterval(priceInterval);
            ticketPriceElement.textContent = originalPrice;
        });
    }
    // Fungsi untuk menggambar bintang
    const createStars = (rating, container) => {
        container.innerHTML = ''; // Kosongkan kontainer
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        // SVG untuk setiap jenis bintang
        const starFullSVG = `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>`;
        const starHalfSVG = `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.417 3.967 1.481-8.279-6.064-5.828-8.332-1.151z"/></svg>`;
        const starEmptySVG = `<svg class="star" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`;

        for (let i = 0; i < fullStars; i++) container.innerHTML += starFullSVG;
        if (halfStar) container.innerHTML += starHalfSVG;
        for (let i = 0; i < emptyStars; i++) container.innerHTML += starEmptySVG;
    };

    // Terapkan ke setiap kartu testimoni
    document.querySelectorAll('.card-rating').forEach(card => {
        const rating = parseFloat(card.dataset.rating);
        const starContainer = card.querySelector('.stars');
        createStars(rating, starContainer);
    });

    // Terapkan ke ringkasan total di header
    const summaryContainer = document.querySelector('.summary-stars');
    if(summaryContainer) {
        const summaryScore = parseFloat(document.querySelector('.summary-score').textContent);
        createStars(summaryScore, summaryContainer);
    }
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Hapus kelas 'active' dari semua option
            options.forEach(opt => opt.classList.remove('active'));
            // Tambahkan kelas 'active' ke option yang diklik
            option.classList.add('active');
        });
    });

    const galleryRadios = document.querySelectorAll('#thumbnail-gallery [type="radio"]');
    function reorderGallery(targetEl, els) {
        const nItems = els.length;
        let processedUncheck = 0;
        for (const el of els) {
            const containerEl = el.nextElementSibling;
            if (el === targetEl) { // radio yang di-check
                containerEl.style.setProperty("--w", "100%");
                containerEl.style.setProperty("--l", "0");
            } else { // radio yang tidak di-check
                containerEl.style.setProperty("--w", `${100 / (nItems - 1)}%`);
                containerEl.style.setProperty("--l", `${processedUncheck * 100 / (nItems - 1)}%`);
                processedUncheck++;
            }
        }
    }

    if (galleryRadios.length > 0) {
        for (const el of galleryRadios) {
            el.addEventListener("input", e => reorderGallery(e.target, galleryRadios));
        }
        // Atur urutan awal saat halaman dimuat
        reorderGallery(galleryRadios[0], galleryRadios);
    }

    // Fungsi utama untuk menginisialisasi semua interaksi di section video
    function initializeVideoSection() {
        const section = document.querySelector('#video');
        if (!section) return; // Jika section tidak ditemukan, hentikan eksekusi

        // 1. Inisialisasi Tooltip saat hover di avatar
        initializeAvatarTooltips();

        // 2. Inisialisasi efek parallax pada elemen latar belakang
        initializeParallaxEffect();
    }

    // Fungsi untuk menangani logika tooltip avatar
    function initializeAvatarTooltips() {
        const avatars = document.querySelectorAll('.video-docs-avatar');
        const visitorNames = ['Dian Puspita', 'Budi Santoso', 'Sarah Abdullah']; // Nama sesuai urutan avatar

        avatars.forEach((avatar, index) => {
            // Event saat kursor masuk ke area avatar
            avatar.addEventListener('mouseenter', () => {
                // Buat elemen tooltip baru
                const tooltip = document.createElement('div');
                tooltip.className = 'video-docs-avatar-tooltip';
                tooltip.textContent = visitorNames[index] || 'Pengunjung'; // Tampilkan nama, atau 'Pengunjung' jika nama tidak ada
                
                // Tambahkan tooltip ke dalam elemen avatar
                avatar.appendChild(tooltip);

                // Animasikan kemunculan tooltip
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translate(-50%, -5px)';
                }, 10); // Delay kecil untuk memastikan transisi berjalan
            });

            // Event saat kursor meninggalkan area avatar
            avatar.addEventListener('mouseleave', () => {
                const tooltip = avatar.querySelector('.video-docs-avatar-tooltip');
                if (tooltip) {
                    // Animasikan tooltip menghilang lalu hapus dari DOM
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translate(-50%, 0)';
                    setTimeout(() => {
                        tooltip.remove();
                    }, 200); // Waktu harus cocok dengan transisi di CSS
                }
            });
        });
    }

    // Fungsi untuk menangani efek parallax pada titik-titik di latar belakang
    function initializeParallaxEffect() {
        const floatingDots = document.querySelectorAll('.video-docs-floating-dot');
        const section = document.querySelector('.video-docs-section');
        if (floatingDots.length === 0 || !section) return;

        section.addEventListener('mousemove', (e) => {
            // Dapatkan posisi mouse relatif terhadap section, bukan window
            const rect = section.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width; // Nilai 0 sampai 1
            const mouseY = (e.clientY - rect.top) / rect.height; // Nilai 0 sampai 1
            
            // Gerakkan setiap titik dengan kecepatan yang berbeda
            floatingDots.forEach((dot, index) => {
                const speed = (index + 1) * 7; // Kecepatan berbeda untuk setiap dot
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                // Terapkan transformasi dengan properti 'transform' yang sudah ada dari animasi 'float'
                // Ini akan menggabungkan efek float dengan parallax mouse
                dot.style.setProperty('--parallax-x', `${x}px`);
                dot.style.setProperty('--parallax-y', `${y}px`);
            });
        });
    }

    // Jalankan inisialisasi untuk section video
    initializeVideoSection();
});

// --- FASE 2: LOGIKA 3D (BERJALAN SECARA INDEPENDEN) ---

console.log("Memulai skrip 3D...");

// Inisialisasi Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true,
    alpha: true
});

if (renderer.domElement) {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(20);

    // Pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Loader Model 3D
    const loader = new GLTFLoader();
    let customModel;

    console.log("Memulai proses memuat model 3D dengan URL yang benar...");
    loader.load(
        'assets/models/merkahba.glb', 
        function (gltf) {
            console.log("Model 3D BERHASIL dimuat!");
            customModel = gltf.scene;
            
            customModel.scale.set(10, 10, 10); 
            customModel.position.y = 0;
           customModel.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(0xffffff);
                    if (child.material.emissive) {
                        child.material.emissive.set(0x000000);
                        child.material.emissiveIntensity = 1;
                    }
                    child.material.needsUpdate = true;
                }
            });


            scene.add(customModel);
        },
        undefined,
        function (error) {
            console.error('GAGAL memuat model 3D:', error);
        }
    );

    // Interaksi Mouse
    const mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Loop Animasi
    function animate() {
    requestAnimationFrame(animate);
    if (customModel) {
        customModel.rotation.y += 0.01;
        customModel.rotation.x += 0.005;
    }
    renderer.render(scene, camera);
}

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
    console.log("Skrip 3D berhasil dijalankan dan loop animasi dimulai.");
    } else {
        console.error("Elemen canvas #bg-canvas tidak ditemukan!");
    }

// ---------------------------------------
// --- LOGIKA UNTUK ANIMASI SCROLL TIM (VERSI PERBAIKAN TOTAL) ---
(function() {
    // Helper functions
    function easeOutQuad(t) { return t * (2 - t); }
    function random(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function randomPositiveOrNegative(min, max) { return random(min, max) * (Math.random() > 0.5 ? 1 : -1); }
    function setTransform(el, transform) { el.style.transform = transform; el.style.WebkitTransform = transform; }

    const section = document.querySelector('#team-scroll-section');
    const container = document.querySelector('.team-scroll-container');
    if (!container || !section) return;

    let current = 0, target = 0, ease = 0.075, rafId = undefined, rafActive = false;
    const images = Array.prototype.slice.call(container.querySelectorAll('.team-image-card'));
    let windowWidth, imageHeight;
    const rotateXMaxList = [], rotateYMaxList = [], translateXMax = -200;

    images.forEach(() => {
        rotateXMaxList.push(randomPositiveOrNegative(20, 40));
        rotateYMaxList.push(randomPositiveOrNegative(20, 60));
    });

    function setupAnimation() {
        windowWidth = window.innerWidth;
        const isMobile = windowWidth <= 768;

        // --- PERBAIKAN UTAMA ---
        // 1. Tentukan tinggi scroll per gambar secara eksplisit menggunakan tinggi viewport.
        // Ini memastikan setiap 'langkah' scroll konsisten.
        imageHeight = window.innerHeight; 

        // 2. Tentukan jumlah 'indeks' atau 'posisi' berdasarkan layout.
        const numScrollIndices = isMobile ? images.length : Math.ceil(images.length / 2);

        // 3. Hitung total tinggi area scroll.
        // Kita gunakan (jumlah posisi - 1) agar scroll berakhir saat gambar terakhir di tengah.
        const totalScrollHeight = (numScrollIndices > 1) ? (numScrollIndices - 1) * imageHeight : imageHeight;
        
        // 4. Terapkan tinggi yang sudah dihitung dengan pasti ke section.
        section.style.height = totalScrollHeight + 'px';
        
        startAnimation();
    }

    function updateScroll() {
        const rect = section.getBoundingClientRect();
        // Hanya update target jika section sedang atau telah melewati bagian atas layar
        if (rect.top <= 0) {
            // Batasi target agar tidak melebihi total tinggi scroll
            target = Math.min(-rect.top, parseFloat(section.style.height));
        } else {
            target = 0;
        }
        startAnimation();
    }

    function startAnimation() {
        if (!rafActive) { rafActive = true; rafId = requestAnimationFrame(updateAnimation); }
    }

    function updateAnimation() {
        const diff = target - current;
        const delta = Math.abs(diff) < 0.1 ? 0 : diff * ease;

        if (delta) {
            current += delta;
            current = parseFloat(current.toFixed(2));
            rafId = requestAnimationFrame(updateAnimation);
        } else {
            current = target;
            rafActive = false;
            cancelAnimationFrame(rafId);
        }

        updateAnimationImages();
        // Pindahkan container. Karena container 'sticky', ini akan bekerja dengan benar
        // untuk menggeser kartu-kartu di dalamnya.
        setTransform(container, 'translateY(' + -current + 'px)');
    }

    function updateAnimationImages() {
        // 'ratio' adalah indikator posisi scroll saat ini, diukur dalam 'langkah' (imageHeight).
        const ratio = current / imageHeight;
        
        images.forEach(function (image, index) {
            const isMobile = windowWidth <= 768;
            // Indeks posisi untuk kartu ini (di mobile: 0, 1, 2, ... | di desktop: 0, 0, 1, 1, ...)
            const intersectionRatioIndex = isMobile ? index : Math.floor(index / 2);
            
            // Seberapa jauh 'ratio' dari indeks kartu ini. 0 = tepat di tengah.
            const intersectionRatioValue = ratio - intersectionRatioIndex;
            
            // Nilai antara 0 (jauh) dan 1 (tepat di tengah).
            const intersectionRatio = Math.max(0, 1 - Math.abs(intersectionRatioValue));

            // Kalkulasi Transformasi
            const rotateXMax = rotateXMaxList[index];
            let rotateX = (rotateXMax - (rotateXMax * intersectionRatio)).toFixed(2);
            const rotateYMax = rotateYMaxList[index];
            let rotateY = (rotateYMax - (rotateYMax * intersectionRatio)).toFixed(2);
            let translateX = isMobile ? 0 : (translateXMax - (translateXMax * easeOutQuad(intersectionRatio))).toFixed(2);
            
            if (intersectionRatioValue < 0) {
                rotateX = -rotateX;
                rotateY = -rotateY;
                if (!isMobile) {
                    translateX = index % 2 ? -translateX : 0;
                }
            } else {
                 if (!isMobile) {
                    translateX = index % 2 ? 0 : translateX;
                 }
            }
            
            setTransform(image, 'perspective(500px) translateX(' + translateX + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
            
            // Tambah/Hapus kelas untuk menampilkan info
            if (intersectionRatio > 0.3) {
                image.classList.add('is-intersecting');
            } else {
                image.classList.remove('is-intersecting');
            }
        });
    }
    
    // Setup awal dan saat ukuran window berubah.
    window.addEventListener('resize', setupAnimation);
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    // Jalankan setup awal
    setupAnimation();
})();