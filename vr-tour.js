import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// === KONFIGURASI DASAR ===
const vrContainer = document.getElementById('vr-container');
const enterVRButton = document.getElementById('enter-vr-button');
const exitVRButton = document.getElementById('exit-vr-button');
const canvas = document.getElementById('vr-canvas');
const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.getElementById('loading-text');
const cameraPositionDisplay = document.getElementById('camera-position');
const pauseOverlay = document.getElementById('pause-overlay');
const vrUpButton = document.getElementById('vr-up-button');
const vrDownButton = document.getElementById('vr-down-button');
// === DATA LUKISAN/PAMERAN ===
const paintingsData = [
    { imgSrc: 'assets/vr/andijemma.png', title: 'Andi Djemma', description: 'Andi Djemma (15 Januari 1901 – 23 Februari 1965) adalah seorang tokoh kerajaan di Kedatuan Luwu dan merupakan pejuang kemerdekaan Indonesia asal Sulawesi Selatan yang dianugerahi gelar Pahlawan Nasional oleh Presiden Republik Indonesia pada tanggal 8 November 2002.', position: new THREE.Vector3(-3.78, 14.30, -19.91), rotationY: 0 },
    { imgSrc: 'assets/vr/robert.png', title: 'Robert Wolter Mongisidi', description: 'Robert Wolter Mongisidi dilahirkan di Malalayang (sekarang bagian dari Manado), anak ke-4 dari Petrus Mongisidi dan Lina Suawa pada tanggal 14 Februari 1925. Panggilan akrab Robert Wolter Mongisidi semasa kecil adalah Bote. Dia memulai pendidikannya pada 1931 di sekolah dasar (bahasa Belanda: Hollands Inlandsche School atau (HIS), yang diikuti sekolah menengah (bahasa Belanda: Meer Uitgebreid Lager Onderwijs atau MULO) di Frater Don Bosco di Manado. Mongisidi lalu dididik sebagai guru Bahasa Jepang pada sebuah sekolah di Tomohon. Setelah studinya, dia mengajar Bahasa Jepang di Liwutung, Minahasa, dan Luwuk, sebelum ke Makassar, Celebes.', position: new THREE.Vector3(4.35, 14.30, -20.35), rotationY:0 },
    { imgSrc: 'assets/vr/syekh.png', title: 'Yusuf Al-Makassari', description: 'Ulama besar asal Gowa, tokoh spiritual yang aktif melawan penjajahan. Pengaruhnya meluas hingga Afrika Selatan, tempat ia diasingkan oleh Belanda.', position: new THREE.Vector3(1.15, 14.78, 0.42), rotationY: Math.PI / 2 },
    { imgSrc: 'assets/vr/hasanuddin.png', title: 'Sultan Hasanuddin', description: 'Sultan Hasanuddin (Dijuluki Ayam Jantan dari Timur oleh Belanda) (12 Januari 1631 – 12 Juni 1670) adalah Sultan Gowa ke-16 dan pahlawan nasional Indonesia yang terlahir dengan nama Muhammad Bakir I Mallombasi Daeng Mattawang Karaeng Bonto Mangape. Setelah menaiki takhta, ia digelar Sultan Hasanuddin, setelah meninggal ia digelar Tumenanga Ri Balla Pangkana. Karena keberaniannya, ia dijuluki De Haantjes van Het Osten oleh Belanda yang artinya Ayam Jantan dari Timur. Ia dimakamkan di Katangka, Kabupaten Gowa. Ia diangkat sebagai Pahlawan Nasional dengan Surat Keputusan Presiden No. 087/TK/1973, tanggal 6 November 1973.', position: new THREE.Vector3(-6.58, 9.90, -2.93), rotationY: Math.PI / 2 },
    { imgSrc: 'assets/vr/palakka.png', title: 'Arung Palakka', description: 'Arung Palakka (15 September 1634 – 6 April 1696) adalah Sultan Bone yang menjabat pada tahun 1672-1696. Saat masih berkedudukan sebagai pangeran, ia memimpin kerajaannya dari hasil perjanjian Bungaya antara VOC dan Kesultanan Gowa pada tahun 1666. Ia bekerja sama dengan Belanda saat merebut Makassar. Palakka pula yang menjadikan suku Bugis sebagai kekuatan maritim besar yang bekerja sama dengan Belanda dan mendominasi kawasan tersebut selama hampir seabad lamanya. Arung Palakka bergelar La Tan-ri Tatta To Urong To-ri Sompi Patta Malampéi Gammana Daéng Sérang To Appatunru Paduka Sri Sultan Sa ad ud-din, mengacu pada ejaan Lontara. Adapun pelafalan yang tepat adalah La Tenritatta To Unru To-ri Sompa-é Petta Malampé-é Gemme na Daéng Sérang To Appatunru Paduka Sultan Sa aduddin.', position: new THREE.Vector3(3.97, 13.10, 12.82), rotationY: Math.PI / 2 },
    { imgSrc: 'assets/vr/la.png', title: 'La Maddukelleng', description: 'La Maddukelleng (sekitar 1700–1765) merupakan seorang petualang Bugis yang menjabat sebagai pemimpin tertinggi Wajo pada perempat kedua abad ke-18. Ia kini dianggap sebagai Pahlawan Nasional Indonesia.', position: new THREE.Vector3(-3.38, 10.60, 20.02), rotationY: Math.PI / 2 },
    { imgSrc: 'assets/vr/tiku.png', title: 'Pong Tiku', description: 'Pong Tiku (juga dieja Pontiku dan Pongtiku; 1846 – 10 Juli 1907), yang dikenal di antara sekutu Bugisnya sebagai Ne Baso, adalah seorang pemimpin Toraja dan pejuang gerilya yang beroperasi di Sulawesi bagian selatan. Ia dikenal dengan senjata tirrik lada atau semprotan air cabai menggunakan bambu kecil dalam masa perjuangannya.', position: new THREE.Vector3(1.85, 11.30, 19.50), rotationY: 0},
     { imgSrc: 'assets/vr/karaeng.png', title: 'Karaeng Pattingalloang', description: 'Sultan Mahmud, Karaeng Pattingalloang III (I Mangadacinna Daeng Bakle, Tummenanga ri Bonto Biraeng), adalah tokoh intelektual dari Kerajaan Gowa - Tallo, memerintah di Tallo dari tahun 1641 sampai dengan 15 September 1654. Karaeng Pattingalloang tersohor karena ketertarikannya yang tinggi pada ilmu pengetahuan barat pada masa itu sehingga dijuluki bangsa barat atau eropa (Bapak Makassar).', position: new THREE.Vector3(6.07, 11.30, -5.72), rotationY: Math.PI / 2 },
];  

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// === INISIALISASI SCENE ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 11.19, 8);
const initialCameraPosition = new THREE.Vector3().copy(camera.position);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// === PENCAHAYAAN ===

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;
directionalLight.position.set(15, 30, 10);
directionalLight.shadow.camera.far = 100;
scene.add(directionalLight);
const hemisphereLight = new THREE.HemisphereLight(0xadd8e6, 0x8B4513, 1.0);
scene.add(hemisphereLight);

// === LOADING MANAGER ===
const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => { setTimeout(() => { loadingScreen.style.opacity = '0'; setTimeout(() => loadingScreen.style.display = 'none', 500); }, 500); };
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => { loadingText.innerText = `Memuat... ${Math.round((itemsLoaded / itemsTotal) * 100)}%`; };
loadingManager.onError = (url) => { console.error('Gagal memuat:', url); loadingText.innerText = 'Gagal memuat aset.'; };

// === MEMUAT MODEL & ASET LAIN ===
const gltfLoader = new GLTFLoader(loadingManager);
const textureLoader = new THREE.TextureLoader(loadingManager);
const paintings = [];
const collidableObjects = [];
let ship;

gltfLoader.load('assets/models/AnyConv.com__pinisi3D.glb', (gltf) => {
    ship = gltf.scene;
    ship.position.set(0, 0, 0);
    ship.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8, metalness: 0.1 });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 2.5;
    ship.add(floor);
    scene.add(ship);
    collidableObjects.push(ship);
});

paintingsData.forEach(data => {
    const paintingTexture = textureLoader.load(data.imgSrc);
    paintingTexture.colorSpace = THREE.SRGBColorSpace;
    const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTexture, side: THREE.DoubleSide, transparent: true, alphaTest: 0.5 });
    const paintingGeometry = new THREE.PlaneGeometry(4, 3);
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.copy(data.position);
    painting.rotation.y = data.rotationY;
    painting.userData = { title: data.title, description: data.description };
    paintings.push(painting);
    scene.add(painting);
});

// === KONTROL & INTERAKSI ===
let controls;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false, moveUp = false, moveDown = false;
const raycaster = new THREE.Raycaster();
const paintingInfoOverlay = document.getElementById('painting-info-overlay');
let animationFrameId = null;
let isDragging = false;
let previousTouchX = 0;
let previousTouchY = 0;

// === EVENT LISTENERS ===
enterVRButton.addEventListener('click', () => {
    vrContainer.classList.add('fullscreen');
    vrContainer.style.display = 'block';
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    initControls();
    animate();
    if (isMobile) { initMobileControls(); } else { controls.lock(); }
});

exitVRButton.addEventListener('click', () => {
    vrContainer.classList.remove('fullscreen');
    vrContainer.style.display = 'none';
    if (controls && controls.isLocked) { controls.unlock(); }
    if (isMobile) {
        vrUpButton.style.display = 'none';
        vrDownButton.style.display = 'none';
    }
    if (animationFrameId) { cancelAnimationFrame(animationFrameId); }
    camera.position.copy(initialCameraPosition);
    velocity.set(0, 0, 0);
    moveForward = moveBackward = moveLeft = moveRight = moveUp = moveDown = false;
});

function initControls() {
    controls = new PointerLockControls(camera, renderer.domElement);
    scene.add(controls.getObject());

    // PERBAIKAN: Listener untuk menangani lock/unlock
    controls.addEventListener('lock', () => {
        pauseOverlay.style.display = 'none';
    });
    controls.addEventListener('unlock', () => {
        pauseOverlay.style.display = 'flex';
    });
    
    // PERBAIKAN: Klik pada overlay akan mencoba mengunci kembali
    pauseOverlay.addEventListener('click', () => {
        controls.lock();
    });
    const onKeyDown = (event) => {
        switch (event.code) {
            case 'KeyW': moveForward = true; break;
            case 'KeyS': moveBackward = true; break;
            case 'KeyA': moveLeft = true; break;
            case 'KeyD': moveRight = true; break;
            // PERUBAHAN: Tombol naik/turun diubah ke E dan Q
            case 'KeyE': moveUp = true; break;
            case 'KeyQ': moveDown = true; break;
            // PERUBAHAN: Tombol P untuk mencetak posisi
            case 'KeyP':
                console.log(
                    `Posisi Kamera: X: ${camera.position.x.toFixed(2)}, Y: ${camera.position.y.toFixed(2)}, Z: ${camera.position.z.toFixed(2)}`
                );
                break;
        }
    };
    const onKeyUp = (event) => {
        switch (event.code) {
            case 'KeyW': moveForward = false; break;
            case 'KeyS': moveBackward = false; break;
            case 'KeyA': moveLeft = false; break;
            case 'KeyD': moveRight = false; break;
            case 'KeyE': moveUp = false; break;
            case 'KeyQ': moveDown = false; break;
        }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

function initMobileControls() {
    // Tampilkan tombol naik/turun di layar
    vrUpButton.style.display = 'block';
    vrDownButton.style.display = 'block';

    // Beri fungsi pada tombol naik saat disentuh
    vrUpButton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Mencegah layar scroll/zoom
        moveUp = true;
    });
    vrUpButton.addEventListener('touchend', () => {
        moveUp = false;
    });

    // Beri fungsi pada tombol turun saat disentuh
    vrDownButton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Mencegah layar scroll/zoom
        moveDown = true;
    });
    vrDownButton.addEventListener('touchend', () => {
        moveDown = false;
    });

    initJoystick(); // Panggil inisialisasi joystick dari sini
    initTouchLookControls();
}

function initTouchLookControls() {
    const onTouchStart = (event) => {
        // Hanya aktifkan jika sentuhan ada di luar area joystick dan tombol
        const target = event.target;
        if (target === canvas || target === pauseOverlay || target === vrContainer) {
            isDragging = true;
            previousTouchX = event.touches[0].clientX;
            previousTouchY = event.touches[0].clientY;
        }
    };

    const onTouchMove = (event) => {
        if (!isDragging || !controls) return;
        event.preventDefault();

        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;

        const deltaX = touchX - previousTouchX;
        const deltaY = touchY - previousTouchY;

        // Memutar kamera berdasarkan pergeseran jari
        controls.getObject().rotation.y -= deltaX * 0.008; // Kecepatan putar horizontal
        controls.getObject().rotation.x -= deltaY * 0.008; // Kecepatan putar vertikal

        // Batasi sudut pandang vertikal agar tidak terbalik
        controls.getObject().rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, controls.getObject().rotation.x));
        
        previousTouchX = touchX;
        previousTouchY = touchY;
    };

    const onTouchEnd = () => {
        isDragging = false;
    };

    // Daftarkan event listener ke elemen yang tepat
    vrContainer.addEventListener('touchstart', onTouchStart);
    vrContainer.addEventListener('touchmove', onTouchMove);
    vrContainer.addEventListener('touchend', onTouchEnd);
}

let joystickInstance;
function initJoystick() {
    const joystickContainer = document.getElementById('joystick-container');
    joystickContainer.style.display = 'block';
    if (joystickInstance) joystickInstance.destroy();
    joystickInstance = nipplejs.create({ zone: joystickContainer, mode: 'static', position: { left: '50%', top: '50%' }, color: 'white', size: 150 });
    joystickInstance.on('move', (evt, data) => {
        const angle = data.angle.radian;
        const force = data.force > 1 ? 1 : data.force;
        velocity.x = Math.cos(angle) * force;
        velocity.z = -Math.sin(angle) * force;
    });
    joystickInstance.on('end', () => { velocity.x = 0; velocity.z = 0; });
}

// === ANIMATION LOOP ===
// === ANIMATION LOOP ===
const clock = new THREE.Clock();
const minCameraY = 3.8; // Batas minimal ketinggian kamera

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const mobileSpeed = 20.0; // Kecepatan gerakan mobile
    // Pastikan kontrol sudah siap sebelum menjalankan logika gerakan
    if (controls) {
        // Logika gerakan Vertikal (berlaku untuk keyboard dan tombol mobile)
        const verticalSpeed = 15.0;
        if (moveUp) camera.position.y += verticalSpeed * delta;
        
        // Logika turun dengan deteksi lantai
        const downRaycaster = new THREE.Raycaster(controls.getObject().position, new THREE.Vector3(0, -1, 0));
        const downIntersects = downRaycaster.intersectObjects(collidableObjects, true);

        if (moveDown && (downIntersects.length === 0 || downIntersects[0].distance > 1.2)) {
            camera.position.y -= verticalSpeed * delta;
        }

        // Selalu pastikan kamera tidak di bawah batas
        if (camera.position.y < minCameraY) {
            camera.position.y = minCameraY;
        }


        // Logika gerakan Horizontal (hanya jika terkunci di desktop atau di mobile)
        if (controls.isLocked === true || isMobile) {
            
            // Damping (efek berhenti perlahan untuk keyboard)
            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            // Ambil input dari keyboard (hanya untuk non-mobile)
            if (!isMobile) {
                direction.z = Number(moveForward) - Number(moveBackward);
                direction.x = Number(moveRight) - Number(moveLeft);
                direction.normalize(); // agar kecepatan diagonal sama

                if (moveForward || moveBackward) velocity.z -= direction.z * 50.0 * delta;
                if (moveLeft || moveRight) velocity.x -= direction.x * 50.0 * delta;
            } else {
                // Kecepatan desktop diatur dari atas, jadi tidak perlu pengali di sini
                controls.moveRight(-velocity.x * mobileSpeed * delta);
                controls.moveForward(-velocity.z * mobileSpeed * delta);
            }

            // Terapkan semua gerakan ke kamera (baik dari keyboard maupun joystick)
            controls.moveRight(-velocity.x * delta);
            controls.moveForward(-velocity.z * delta);

            // === Cek interaksi dengan lukisan ===
            const paintingRaycaster = new THREE.Raycaster();
            paintingRaycaster.setFromCamera({ x: 0, y: 0 }, camera); // Tembakkan sinar dari tengah layar
            const intersects = paintingRaycaster.intersectObjects(paintings);

            const paintingTitle = document.getElementById('painting-title');
            const paintingDescription = document.getElementById('painting-description');

            if (intersects.length > 0 && intersects[0].distance < 5) { // Jika ada lukisan dalam jarak 5 unit
                const obj = intersects[0].object;
                paintingTitle.innerText = obj.userData.title;
                paintingDescription.innerText = obj.userData.description;
                paintingInfoOverlay.classList.add('visible');
            } else {
                paintingInfoOverlay.classList.remove('visible');
            }
            // Tampilkan posisi kamera di layar
            cameraPositionDisplay.innerText = `Posisi: X: ${camera.position.x.toFixed(2)}, Y: ${camera.position.y.toFixed(2)}, Z: ${camera.position.z.toFixed(2)}`;
        }
    }

    // Selalu render scene di setiap frame
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    if (vrContainer.classList.contains('fullscreen')) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});