import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- FASE 1: INISIALISASI SAAT HALAMAN SIAP ---

// Pastikan DOM sepenuhnya dimuat sebelum menjalankan skrip UI & animasi
document.addEventListener('DOMContentLoaded', () => {

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

    const carousel = document.querySelector('.team-carousel');
    const cards = document.querySelectorAll('.team-profile-card');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');

    if (carousel && cards.length > 0) {
        let currentIndex = Math.floor(cards.length / 2); // Start with the middle card active
        const cardWidth = cards[0].offsetWidth + 30; // card width + gap

        function updateCarousel() {
            // Center the active card
            const offset = (carousel.offsetWidth / 2) - (cardWidth / 2);
            carousel.style.transform = `translateX(${-currentIndex * cardWidth + offset}px)`;

            // Update active class
            cards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        // Initial setup
        updateCarousel();
        window.addEventListener('resize', updateCarousel); // Adjust on window resize
    }
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
        // URL INI DIJAMIN BEBAS DARI MASALAH CORS
        'assets/models/merkahba.glb', 
        
        // Fungsi ini akan berjalan jika model berhasil dimuat
        function (gltf) {
            console.log("Model 3D BERHASIL dimuat!");
            customModel = gltf.scene;
            
            // Sesuaikan ukuran & posisi untuk model Crystal ini
            customModel.scale.set(10, 10, 10); 
            customModel.position.y = 0;
           customModel.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(0xffffff); // putih
                    if (child.material.emissive) {
                        child.material.emissive.set(0x000000); // nyala putih
                        child.material.emissiveIntensity = 1;  // sangat terang
                    }
                    child.material.needsUpdate = true;
                }
            });


            scene.add(customModel);
        },
        undefined,
        function (error) {
            // Ini seharusnya tidak akan berjalan lagi
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
        customModel.rotation.y += 0.01; // terus muter di Y
        customModel.rotation.x += 0.005; // sedikit muter di X
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

