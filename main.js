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
                        child.material.emissive.set(0xffffff); // nyala putih
                        child.material.emissiveIntensity = 3;  // sangat terang
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