import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default function initThreeJS(canvas) {
    // Scene setup
    const scene = new THREE.Scene();
    const clock = new THREE.Clock();

    // Performance optimizations
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const maxPixelRatio = isMobile ? 1 : 2;

    // Theme management
    const themeMaterials = {
        current: null,
        light: null,
        dark: null,
        loading: false
    };

    // Texture loader with cache
    const textureLoader = new THREE.TextureLoader();
    const loadMaterial = (path) => new Promise(resolve => {
        textureLoader.load(path, texture => {
            texture.colorSpace = THREE.SRGBColorSpace;
            resolve(new THREE.MeshMatcapMaterial({ matcap: texture }));
        });
    });

    // Preload both themes
    Promise.all([
        loadMaterial('/textures/matcaps/9.png'),
        loadMaterial('/textures/matcaps/10.png')
    ]).then(([lightMat, darkMat]) => {
        themeMaterials.light = lightMat;
        themeMaterials.dark = darkMat;
        handleThemeChange(document.documentElement.getAttribute('data-theme') || 'light');
    });

    // Optimized theme switching
    const handleThemeChange = (theme) => {
        if (themeMaterials.loading || !themeMaterials[theme]) return;
        
        themeMaterials.loading = true;
        const newMaterial = themeMaterials[theme];
        
        scene.traverse(child => {
            if (child instanceof THREE.Mesh || child instanceof THREE.InstancedMesh) {
                child.material = newMaterial;
            }
        });

        if (themeMaterials.current) {
            setTimeout(() => {
                themeMaterials.current.dispose();
                themeMaterials.current = newMaterial;
                themeMaterials.loading = false;
            }, 100);
        } else {
            themeMaterials.current = newMaterial;
            themeMaterials.loading = false;
        }
    };

    // Theme observer
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const newTheme = document.documentElement.getAttribute('data-theme');
                handleThemeChange(newTheme);
            }
        });
    });
    themeObserver.observe(document.documentElement, { attributes: true });

    // Random text placeholders
    const textPlaceholders = [
        "Bonsoir.",
        "Wesh \nMomo!",
        "ohayo¬",
        "OKLM.",
        "Si si, \nla famille!"
    ];

    // Select a random text
    const randomText = textPlaceholders[Math.floor(Math.random() * textPlaceholders.length)];

    // Font loading with geometry reuse
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/geist_mono_bold.json', font => {
        // Text geometry
        const textGeometry = new TextGeometry(randomText, {
            font,
            size: 0.5,
            depth: 0.1,
            curveSegments: 6,
            bevelEnabled: false
        });
        textGeometry.center();

        // Donut geometry with instancing
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 32);
        const donutCount = 0;
        
        // Create instanced mesh with current material
        const instancedDonuts = new THREE.InstancedMesh(
            donutGeometry,
            themeMaterials.current, // Use current material
            donutCount
        );
        
        // Set initial transformations
        const dummy = new THREE.Object3D();
        for (let i = 0; i < donutCount; i++) {
            dummy.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            dummy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            );
            const scale = Math.random();
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            instancedDonuts.setMatrixAt(i, dummy.matrix);
        }
        
        // Create text mesh with current material
        const textMesh = new THREE.Mesh(textGeometry, themeMaterials.current);
        scene.add(textMesh);
        scene.add(instancedDonuts);
    });

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 2);

    // Renderer optimizations
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Controls optimizations
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.1;
    controls.enableZoom = false;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    // Responsive handling
    const resizeHandler = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    window.addEventListener('resize', resizeHandler);

    // Cleanup
    return () => {
        window.removeEventListener('resize', resizeHandler);
        themeObserver.disconnect();
        [themeMaterials.light, themeMaterials.dark].forEach(mat => mat?.dispose());
        scene.traverse(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
        });
        renderer.dispose();
    };
}