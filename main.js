import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- BAGIAN 1: LOGIKA 3D ---
console.log("Memulai skrip 3D...");

// Inisialisasi
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    antialias: true,
    alpha: true
});
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

console.log("Memulai proses memuat model 3D baru...");
loader.load(
    // URL BARU: Model 'Abstract Core' dari Poly Pizza (Lisensi CC0)
    'https://models.poly.pizza/s/r3P5H4Nn/b3D0nENF.glb',
    
    // Fungsi callback (tetap sama)
    function (gltf) {
        console.log("Model BERHASIL dimuat.", gltf);
        customModel = gltf.scene;
        // Kita sesuaikan skala & posisi untuk model baru ini
        customModel.scale.set(8, 8, 8); 
        customModel.position.y = -1; // Sedikit ke bawah agar pas di tengah
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
        customModel.rotation.y += (mouse.x * 0.01 - customModel.rotation.y) * 0.05;
        customModel.rotation.x += (mouse.y * 0.01 - customModel.rotation.x) * 0.05;
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

// --- BAGIAN 2: LOGIKA UI (HAMBURGER) ---
const hamburgerBtn = document.querySelector('.hamburger-menu');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const bodyEl = document.body;

if (hamburgerBtn && mobileNavOverlay) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('is-active');
        mobileNavOverlay.classList.toggle('is-open');
        bodyEl.classList.toggle('menu-is-open');
    });

    mobileNavOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('is-active');
            mobileNavOverlay.classList.remove('is-open');
            bodyEl.classList.remove('menu-is-open');
        });
    });
}