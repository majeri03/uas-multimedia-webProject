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

console.log("Memulai proses memuat model 3D...");
loader.load(
    'https://models.poly.pizza/s/Z92T2w9wgr/bYEDgGqXn2.glb',
    function (gltf) {
        console.log("Model BERHASIL dimuat.", gltf);
        customModel = gltf.scene;
        customModel.scale.set(1.5, 1.5, 1.5);
        scene.add(customModel);
    },
    undefined, // Kita abaikan progress log untuk sekarang
    function (error) {
        console.error('GAGAL memuat model 3D:', error); // Ini pesan error penting!
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
const navLinksList = document.querySelector('.nav-links'); // Menggunakan nama variabel yg lebih jelas

if (hamburgerBtn && navLinksList) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('is-active');
        navLinksList.classList.toggle('is-open');
    });

    navLinksList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('is-active');
            navLinksList.classList.remove('is-open');
        });
    });
} else {
    console.error("Elemen hamburger atau nav-links tidak ditemukan!");
}