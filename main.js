import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {
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
            setTimeout(typeVisual, 200); 
        } else {
            visualEl.style.borderRight = 'none'; 
            coreEl.classList.add('typewriter-text');
            let j = 0;
            function typeCore() {
                if (j < text2.length) {
                    coreEl.textContent += text2.charAt(j);
                    j++;
                    setTimeout(typeCore, 200);
                } else {
                    coreEl.style.borderRight = '4px solid #333';
                }
            }
            typeCore();
        }
    }
    typeVisual();
}

runTypewriterAnimation();
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

    const navItems = document.querySelectorAll('.nav-item');
    const contentPanels = document.querySelectorAll('.content-panel');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            contentPanels.forEach(panel => panel.classList.remove('active'));

            item.classList.add('active');

            const targetPanelId = item.getAttribute('data-target');
            const targetPanel = document.getElementById(targetPanelId);
            if(targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
    const collectionCards = document.querySelectorAll('.collection-card');

    collectionCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });
    const modalContainer = document.getElementById('collection-modal');
    if (modalContainer) {
        const modalImg = modalContainer.querySelector('.modal-img');
        const modalTitle = modalContainer.querySelector('.modal-title');
        const modalDescription = modalContainer.querySelector('.modal-description');
        const closeModalBtn = modalContainer.querySelector('.modal-close-btn');

        const openModal = (cardBack) => {
            modalTitle.textContent = cardBack.dataset.title;
            modalDescription.textContent = cardBack.dataset.description;
            modalImg.src = cardBack.dataset.imgSrc;
            modalContainer.classList.add('is-visible');
        };

        const closeModal = () => {
            modalContainer.classList.remove('is-visible');
        };

        document.querySelectorAll('.card-back a').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); 
                const cardBack = e.target.closest('.card-back');
                openModal(cardBack);
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) { 
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

        ticketContainer.addEventListener('mouseenter', () => {
            let i = 0;
            priceInterval = setInterval(() => {
                ticketPriceElement.textContent = prices[i];
                i = (i + 1) % prices.length;
            }, 150); 
        });

        ticketContainer.addEventListener('mouseleave', () => {
            clearInterval(priceInterval);
            ticketPriceElement.textContent = originalPrice;
        });
    }
    const createStars = (rating, container) => {
        container.innerHTML = ''; 
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        const starFullSVG = `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>`;
        const starHalfSVG = `<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.417 3.967 1.481-8.279-6.064-5.828-8.332-1.151z"/></svg>`;
        const starEmptySVG = `<svg class="star" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>`;

        for (let i = 0; i < fullStars; i++) container.innerHTML += starFullSVG;
        if (halfStar) container.innerHTML += starHalfSVG;
        for (let i = 0; i < emptyStars; i++) container.innerHTML += starEmptySVG;
    };

    document.querySelectorAll('.card-rating').forEach(card => {
        const rating = parseFloat(card.dataset.rating);
        const starContainer = card.querySelector('.stars');
        createStars(rating, starContainer);
    });

    const summaryContainer = document.querySelector('.summary-stars');
    if(summaryContainer) {
        const summaryScore = parseFloat(document.querySelector('.summary-score').textContent);
        createStars(summaryScore, summaryContainer);
    }
    
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    const galleryRadios = document.querySelectorAll('#thumbnail-gallery [type="radio"]');
    function reorderGallery(targetEl, els) {
        const nItems = els.length;
        let processedUncheck = 0;
        for (const el of els) {
            const containerEl = el.nextElementSibling;
            if (el === targetEl) { 
                containerEl.style.setProperty("--w", "100%");
                containerEl.style.setProperty("--l", "0");
            } else { 
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
        reorderGallery(galleryRadios[0], galleryRadios);
    }

    function initializeVideoSection() {
        const section = document.querySelector('#video');
        if (!section) return; 
        initializeAvatarTooltips();
        initializeParallaxEffect();
    }

    function initializeAvatarTooltips() {
        const avatars = document.querySelectorAll('.video-docs-avatar');
        const visitorNames = ['Dian Puspita', 'Budi Santoso', 'Sarah Abdullah'];

        avatars.forEach((avatar, index) => {
            avatar.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'video-docs-avatar-tooltip';
                tooltip.textContent = visitorNames[index] || 'Pengunjung'; 
                
                avatar.appendChild(tooltip);

                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translate(-50%, -5px)';
                }, 10); 
            });

            avatar.addEventListener('mouseleave', () => {
                const tooltip = avatar.querySelector('.video-docs-avatar-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.transform = 'translate(-50%, 0)';
                    setTimeout(() => {
                        tooltip.remove();
                    }, 200); 
                }
            });
        });
    }

    function initializeParallaxEffect() {
        const floatingDots = document.querySelectorAll('.video-docs-floating-dot');
        const section = document.querySelector('.video-docs-section');
        if (floatingDots.length === 0 || !section) return;

        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width;
            const mouseY = (e.clientY - rect.top) / rect.height;
            
            floatingDots.forEach((dot, index) => {
                const speed = (index + 1) * 7;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                dot.style.setProperty('--parallax-x', `${x}px`);
                dot.style.setProperty('--parallax-y', `${y}px`);
            });
        });
    }

    initializeVideoSection();
});


console.log("Memulai skrip 3D...");

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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let customModel;

    console.log("Memulai proses memuat model 3D dengan URL yang benar...");
    loader.load(
        'assets/models/phinisi.glb', 
        function (gltf) {
            console.log("Model 3D BERHASIL dimuat!");
            customModel = gltf.scene;
            
            customModel.scale.set(0.7, 0.7, 0.7);
            customModel.position.y = 0;
           customModel.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(0x8B4513);
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

    const mouse = { x: 0, y: 0 };
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
    requestAnimationFrame(animate);
    if (customModel) {
        customModel.rotation.y += 0.01;
        customModel.rotation.x += 0.005;
    }
    renderer.render(scene, camera);
}

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


(function() {
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

        imageHeight = window.innerHeight; 

        const numScrollIndices = isMobile ? images.length : Math.ceil(images.length / 2);

        const totalScrollHeight = (numScrollIndices > 1) ? (numScrollIndices - 1) * imageHeight : imageHeight;
        
        section.style.height = totalScrollHeight + 'px';
        
        startAnimation();
    }

    function updateScroll() {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0) {
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
        setTransform(container, 'translateY(' + -current + 'px)');
    }

    function updateAnimationImages() {
        const ratio = current / imageHeight;
        
        images.forEach(function (image, index) {
            const isMobile = windowWidth <= 768;
            const intersectionRatioIndex = isMobile ? index : Math.floor(index / 2);
            
            const intersectionRatioValue = ratio - intersectionRatioIndex;
            
            const intersectionRatio = Math.max(0, 1 - Math.abs(intersectionRatioValue));

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
            
            if (intersectionRatio > 0.3) {
                image.classList.add('is-intersecting');
            } else {
                image.classList.remove('is-intersecting');
            }
        });
    }
    
    window.addEventListener('resize', setupAnimation);
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    setupAnimation();
})();