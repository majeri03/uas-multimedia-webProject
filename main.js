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

