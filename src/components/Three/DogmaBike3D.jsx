import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Wind,
  Layers,
  Compass,
} from 'lucide-react';
import { sfx } from '../../utils/animations';

export const COLORWAYS = [
  {
    id: 'ineos-grenadier',
    name: 'Team INEOS Grenadiers',
    edition: 'Official WorldTour Pro Edition',
    primaryColor: '#FF3B00',
    secondaryColor: '#E61E00',
    accentColor: '#FF6B00',
    rearColor: '#07080a',
    decalColor: '#FFFFFF',
    gradient: 'from-[#FF3B00] via-[#FF6A00] to-[#0A0C10]',
    metalness: 0.25,
    roughness: 0.15,
    clearcoat: 1.0,
    badge: 'TOUR DE FRANCE SPEC',
  },
  {
    id: 'luxter-red-gold',
    name: 'Luxter Red Gold',
    edition: 'Atelier Treviso Special',
    primaryColor: '#E01E2E',
    secondaryColor: '#B31220',
    accentColor: '#E5A93C',
    rearColor: '#0b0c10',
    decalColor: '#F4D06F',
    gradient: 'from-[#E01E2E] via-[#B31220] to-[#E5A93C]',
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.95,
    badge: 'LUXURY ATELIER',
  },
  {
    id: 'sonic-white',
    name: 'Sonic White & Raw Carbon',
    edition: 'Minimalist Aero Monocoque',
    primaryColor: '#F5F5F7',
    secondaryColor: '#E0E2EC',
    accentColor: '#00F0FF',
    rearColor: '#0F1218',
    decalColor: '#0F1117',
    gradient: 'from-[#FFFFFF] via-[#D1D5DB] to-[#111827]',
    metalness: 0.1,
    roughness: 0.2,
    clearcoat: 0.9,
    badge: 'ULTRA-LIGHTWEIGHT',
  },
  {
    id: 'midnight-venice',
    name: 'Midnight Venice & Carbon',
    edition: 'Veneto Heritage Deep Gloss',
    primaryColor: '#0F2B5C',
    secondaryColor: '#071530',
    accentColor: '#38BDF8',
    rearColor: '#06070a',
    decalColor: '#FFFFFF',
    gradient: 'from-[#1E3A8A] via-[#0F172A] to-[#000000]',
    metalness: 0.6,
    roughness: 0.25,
    clearcoat: 0.95,
    badge: 'VENETO HERITAGE',
  },
  {
    id: 'electro-violet',
    name: 'Electro Violet Chroma',
    edition: 'Chameleon Spectrum Finish',
    primaryColor: '#8B5CF6',
    secondaryColor: '#6366F1',
    accentColor: '#10B981',
    rearColor: '#0a0a0f',
    decalColor: '#FFFFFF',
    gradient: 'from-[#8B5CF6] via-[#EC4899] to-[#064E3B]',
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 1.0,
    badge: 'SPECTRUM CHROMA',
  },
];

export const CAMERA_VIEWS = [
  { id: 'hero', label: '3/4 Hero Profile', pos: [3.4, 1.2, 3.2], target: [0, 0.4, 0] },
  { id: 'onda', label: 'Onda Fork & Flap™', pos: [1.6, 0.5, 1.2], target: [0.95, 0.35, 0] },
  { id: 'cockpit', label: 'MOST Talon Fast', pos: [0.8, 1.4, 0.7], target: [0.75, 0.85, 0] },
  { id: 'keel', label: 'Aero-Keel 3.5° BB', pos: [0.2, 0.1, 1.4], target: [0.05, -0.05, 0] },
  { id: 'duraace', label: 'Dura-Ace Di2 12S', pos: [-0.9, 0.1, 1.2], target: [-0.65, -0.05, 0] },
];

export const HOTSPOTS = [
  {
    id: 'torayca',
    title: 'TorayCa M40X Carbon',
    pos3d: [0.3, 0.5, 0.05],
    screenPos: { x: 55, y: 38 },
    desc: 'High-tensile modulus carbon composite with Nanoalloy Technology. +12% lateral stiffness and superior vibration damping.',
    spec: '392 GPa Modulus | 865g Frame',
  },
  {
    id: 'onda',
    title: 'NEW Onda Fork & ForkFlap™',
    pos3d: [0.98, 0.3, 0.05],
    screenPos: { x: 74, y: 52 },
    desc: '47mm rake curve for high-speed downhill stability with aero winglets that neutralize caliper air turbulence.',
    spec: '47mm Rake | 390g Weight',
  },
  {
    id: 'cockpit',
    title: 'MOST Talon Ultra Fast',
    pos3d: [0.75, 0.9, 0],
    screenPos: { x: 68, y: 22 },
    desc: 'Integrated one-piece aero cockpit with 7° flared drops and 100% TiCR internal routing.',
    spec: '315g | 7° Flare | TiCR™ Integrated',
  },
  {
    id: 'keel',
    title: 'Aero-Keel Bottom Bracket',
    pos3d: [0.0, -0.08, 0.05],
    screenPos: { x: 48, y: 68 },
    desc: 'Downtube rotated by 3.5° around the Italian-threaded 70mm BB shell to guide clean airflow around water bottles.',
    spec: '3.5° Aero Pitch | Italian 70mm',
  },
  {
    id: 'drivetrain',
    title: 'Shimano Dura-Ace Di2 R9200',
    pos3d: [-0.6, -0.05, 0.08],
    screenPos: { x: 32, y: 64 },
    desc: 'Semi-wireless 2x12 electronic shifting with 54-40T chainrings and Hyperglide+ 11-30T cassette.',
    spec: '12-Speed Electronic | Dual Power',
  },
];

export const DogmaBike3D = ({
  activeColorway = COLORWAYS[0],
  onColorChange,
  className = '',
}) => {
  const mountRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(activeColorway);
  const [isWindTunnel, setIsWindTunnel] = useState(true);
  const [isXRayMode, setIsXRayMode] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [activeCameraView, setActiveCameraView] = useState('hero');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [fps, setFps] = useState(60);

  const sceneState = useRef({
    scene: null,
    camera: null,
    renderer: null,
    bikeGroup: null,
    materials: {},
    particles: null,
    wheels: [],
    drivetrainGroup: null,
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
    rotationVelocity: 0.003,
    targetCameraPos: new THREE.Vector3(3.4, 1.2, 3.2),
    targetLookAt: new THREE.Vector3(0, 0.4, 0),
    currentLookAt: new THREE.Vector3(0, 0.4, 0),
    reqId: null,
  });

  // Sync external color prop
  useEffect(() => {
    if (activeColorway && activeColorway.id !== selectedColor.id) {
      setSelectedColor(activeColorway);
    }
  }, [activeColorway]);

  // Build the complete 3D procedural Dogma F model
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050608);
    scene.fog = new THREE.FogExp2(0x050608, 0.12);

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(3.4, 1.2, 3.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic Carbon Weave Texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#14171e';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#0a0c10';
    for (let i = 0; i < 128; i += 8) {
      for (let j = 0; j < 128; j += 8) {
        if ((i + j) % 16 === 0) {
          ctx.fillRect(i, j, 8, 8);
        }
      }
    }
    const carbonTex = new THREE.CanvasTexture(canvas);
    carbonTex.wrapS = THREE.RepeatWrapping;
    carbonTex.wrapT = THREE.RepeatWrapping;
    carbonTex.repeat.set(16, 16);

    // Lighting Setup (Studio Car / Hyper-Bike Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4, 5, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.8);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    const orangeRimLight = new THREE.DirectionalLight(0xff4400, 2.5);
    orangeRimLight.position.set(-3, 2, 4);
    scene.add(orangeRimLight);

    const cyanUnderGlow = new THREE.PointLight(0x00f0ff, 1.2, 8);
    cyanUnderGlow.position.set(0, -0.6, 0);
    scene.add(cyanUnderGlow);

    // Reflective Studio Floor Grid
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050609,
      roughness: 0.4,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.72;
    floor.receiveShadow = true;
    scene.add(floor);

    // Subtle Circular Floor Radar / Podium
    const podiumGeo = new THREE.RingGeometry(1.6, 1.63, 64);
    const podiumMat = new THREE.MeshBasicMaterial({
      color: 0xff3b00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const podiumRing = new THREE.Mesh(podiumGeo, podiumMat);
    podiumRing.rotation.x = -Math.PI / 2;
    podiumRing.position.y = -0.715;
    scene.add(podiumRing);

    const innerPodiumGeo = new THREE.RingGeometry(0.8, 0.81, 64);
    const innerPodiumMat = new THREE.MeshBasicMaterial({
      color: 0xff6a00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const innerRing = new THREE.Mesh(innerPodiumGeo, innerPodiumMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = -0.715;
    scene.add(innerRing);

    // --- PROCEDURAL HIGH-PRECISION PINARELLO DOGMA F 3D MODEL ---
    const bikeGroup = new THREE.Group();
    scene.add(bikeGroup);

    // Materials Dictionary
    const frameMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.primaryColor),
      metalness: selectedColor.metalness,
      roughness: selectedColor.roughness,
      clearcoat: selectedColor.clearcoat,
      clearcoatRoughness: 0.1,
      bumpMap: carbonTex,
      bumpScale: 0.002,
    });

    const rearCarbonMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.rearColor),
      metalness: 0.3,
      roughness: 0.2,
      clearcoat: 0.8,
      bumpMap: carbonTex,
      bumpScale: 0.004,
    });

    const matteCarbonMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.5,
      metalness: 0.2,
      bumpMap: carbonTex,
      bumpScale: 0.005,
    });

    const glossBlackMat = new THREE.MeshStandardMaterial({
      color: 0x07080a,
      roughness: 0.15,
      metalness: 0.4,
    });

    const duraAceMetalMat = new THREE.MeshStandardMaterial({
      color: 0x242830,
      roughness: 0.2,
      metalness: 0.9,
    });

    const chromeBrakeMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      roughness: 0.1,
      metalness: 0.95,
    });

    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      roughness: 0.85,
      metalness: 0.05,
    });

    const decalsMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(selectedColor.decalColor),
      side: THREE.DoubleSide,
    });

    sceneState.current.materials = {
      frame: frameMaterial,
      rearCarbon: rearCarbonMat,
      matteCarbon: matteCarbonMat,
      glossBlack: glossBlackMat,
      duraAce: duraAceMetalMat,
      chrome: chromeBrakeMat,
      rubber: rubberMat,
      decals: decalsMat,
    };

    // Frame Anchor Keypoints (Metric units scaled for 3D realism)
    const BB = new THREE.Vector3(0, -0.05, 0);
    const HT_BOTTOM = new THREE.Vector3(0.9, 0.62, 0);
    const HT_TOP = new THREE.Vector3(0.82, 0.82, 0);
    const ST_TOP = new THREE.Vector3(-0.25, 0.72, 0);
    const DROPOUT_REAR = new THREE.Vector3(-1.05, -0.05, 0);
    const DROPOUT_FRONT = new THREE.Vector3(1.05, -0.05, 0);

    // 1. Head Tube
    const htCurve = new THREE.LineCurve3(HT_BOTTOM, HT_TOP);
    const htGeo = new THREE.TubeGeometry(htCurve, 16, 0.045, 16, false);
    const htMesh = new THREE.Mesh(htGeo, frameMaterial);
    htMesh.castShadow = true;
    bikeGroup.add(htMesh);

    // 2. Dogma Curved Top Tube
    const ttCurve = new THREE.CatmullRomCurve3([
      HT_TOP,
      new THREE.Vector3(0.48, 0.77, 0),
      new THREE.Vector3(0.12, 0.73, 0),
      ST_TOP,
    ]);
    const ttGeo = new THREE.TubeGeometry(ttCurve, 32, 0.034, 16, false);
    const ttMesh = new THREE.Mesh(ttGeo, frameMaterial);
    ttMesh.castShadow = true;
    bikeGroup.add(ttMesh);

    // 3. Aero-Keel Down Tube
    const dtCurve = new THREE.CatmullRomCurve3([
      HT_BOTTOM,
      new THREE.Vector3(0.55, 0.32, 0),
      new THREE.Vector3(0.25, 0.08, 0),
      BB,
    ]);
    const dtGeo = new THREE.TubeGeometry(dtCurve, 32, 0.048, 16, false);
    const dtMesh = new THREE.Mesh(dtGeo, frameMaterial);
    dtMesh.castShadow = true;
    bikeGroup.add(dtMesh);

    // Pinarello Downtube Decals
    const decalGeo = new THREE.PlaneGeometry(0.55, 0.065);
    const decalRight = new THREE.Mesh(decalGeo, decalsMat);
    decalRight.position.set(0.45, 0.32, 0.049);
    decalRight.rotation.z = -0.62;
    decalRight.rotation.y = 0.08;
    bikeGroup.add(decalRight);

    const decalLeft = new THREE.Mesh(decalGeo, decalsMat);
    decalLeft.position.set(0.45, 0.32, -0.049);
    decalLeft.rotation.z = -0.62;
    decalLeft.rotation.y = Math.PI - 0.08;
    bikeGroup.add(decalLeft);

    // 4. Seat Tube
    const stCurve = new THREE.CatmullRomCurve3([
      BB,
      new THREE.Vector3(-0.12, 0.28, 0),
      ST_TOP,
    ]);
    const stGeo = new THREE.TubeGeometry(stCurve, 32, 0.038, 16, false);
    const stMesh = new THREE.Mesh(stGeo, rearCarbonMat);
    stMesh.castShadow = true;
    bikeGroup.add(stMesh);

    // 5. Asymmetrical Rear Stays
    const ssJunction = new THREE.Vector3(-0.23, 0.62, 0);
    const ssRightCurve = new THREE.LineCurve3(
      new THREE.Vector3(ssJunction.x, ssJunction.y, 0.03),
      new THREE.Vector3(DROPOUT_REAR.x, DROPOUT_REAR.y, 0.065)
    );
    const ssLeftCurve = new THREE.LineCurve3(
      new THREE.Vector3(ssJunction.x, ssJunction.y, -0.03),
      new THREE.Vector3(DROPOUT_REAR.x, DROPOUT_REAR.y, -0.065)
    );
    const ssRightGeo = new THREE.TubeGeometry(ssRightCurve, 16, 0.016, 12, false);
    const ssLeftGeo = new THREE.TubeGeometry(ssLeftCurve, 16, 0.016, 12, false);
    const ssRightMesh = new THREE.Mesh(ssRightGeo, rearCarbonMat);
    const ssLeftMesh = new THREE.Mesh(ssLeftGeo, rearCarbonMat);
    bikeGroup.add(ssRightMesh);
    bikeGroup.add(ssLeftMesh);

    // Chainstays
    const csRightCurve = new THREE.LineCurve3(
      new THREE.Vector3(BB.x, BB.y, 0.038),
      new THREE.Vector3(DROPOUT_REAR.x, DROPOUT_REAR.y, 0.065)
    );
    const csLeftCurve = new THREE.LineCurve3(
      new THREE.Vector3(BB.x, BB.y, -0.038),
      new THREE.Vector3(DROPOUT_REAR.x, DROPOUT_REAR.y, -0.065)
    );
    const csRightGeo = new THREE.TubeGeometry(csRightCurve, 16, 0.022, 12, false);
    const csLeftGeo = new THREE.TubeGeometry(csLeftCurve, 16, 0.022, 12, false);
    const csRightMesh = new THREE.Mesh(csRightGeo, rearCarbonMat);
    const csLeftMesh = new THREE.Mesh(csLeftGeo, rearCarbonMat);
    bikeGroup.add(csRightMesh);
    bikeGroup.add(csLeftMesh);

    // 6. Signature Onda Fork with ForkFlap™
    const forkRightCurve = new THREE.CatmullRomCurve3([
      HT_BOTTOM,
      new THREE.Vector3(0.96, 0.38, 0.038),
      new THREE.Vector3(0.99, 0.18, 0.048),
      new THREE.Vector3(DROPOUT_FRONT.x, DROPOUT_FRONT.y, 0.055),
    ]);
    const forkLeftCurve = new THREE.CatmullRomCurve3([
      HT_BOTTOM,
      new THREE.Vector3(0.96, 0.38, -0.038),
      new THREE.Vector3(0.99, 0.18, -0.048),
      new THREE.Vector3(DROPOUT_FRONT.x, DROPOUT_FRONT.y, -0.055),
    ]);
    const forkRightGeo = new THREE.TubeGeometry(forkRightCurve, 24, 0.024, 14, false);
    const forkLeftGeo = new THREE.TubeGeometry(forkLeftCurve, 24, 0.024, 14, false);
    const forkRightMesh = new THREE.Mesh(forkRightGeo, frameMaterial);
    const forkLeftMesh = new THREE.Mesh(forkLeftGeo, frameMaterial);
    bikeGroup.add(forkRightMesh);
    bikeGroup.add(forkLeftMesh);

    // ForkFlap™ Aero Fairings over caliper
    const flapGeo = new THREE.BoxGeometry(0.06, 0.08, 0.012);
    const flapLeft = new THREE.Mesh(flapGeo, frameMaterial);
    flapLeft.position.set(1.02, 0.04, -0.062);
    flapLeft.rotation.y = 0.15;
    bikeGroup.add(flapLeft);

    // 7. Aero Teardrop Seatpost & Saddle
    const spCurve = new THREE.LineCurve3(
      ST_TOP,
      new THREE.Vector3(-0.35, 0.95, 0)
    );
    const spGeo = new THREE.TubeGeometry(spCurve, 12, 0.028, 14, false);
    const spMesh = new THREE.Mesh(spGeo, glossBlackMat);
    bikeGroup.add(spMesh);

    // Saddle
    const saddleGeo = new THREE.BoxGeometry(0.24, 0.035, 0.12);
    const saddleMesh = new THREE.Mesh(saddleGeo, matteCarbonMat);
    saddleMesh.position.set(-0.36, 0.97, 0);
    saddleMesh.rotation.z = 0.05;
    bikeGroup.add(saddleMesh);

    // 8. MOST Talon Ultra Fast Cockpit
    const stemCurve = new THREE.LineCurve3(
      HT_TOP,
      new THREE.Vector3(0.96, 0.86, 0)
    );
    const stemGeo = new THREE.TubeGeometry(stemCurve, 10, 0.028, 12, false);
    const stemMesh = new THREE.Mesh(stemGeo, matteCarbonMat);
    bikeGroup.add(stemMesh);

    const barTopGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.38, 16);
    const barTopMesh = new THREE.Mesh(barTopGeo, matteCarbonMat);
    barTopMesh.rotation.x = Math.PI / 2;
    barTopMesh.position.set(0.96, 0.86, 0);
    bikeGroup.add(barTopMesh);

    const dropRightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.96, 0.86, 0.19),
      new THREE.Vector3(1.05, 0.85, 0.2),
      new THREE.Vector3(1.04, 0.72, 0.21),
      new THREE.Vector3(0.91, 0.7, 0.22),
    ]);
    const dropLeftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.96, 0.86, -0.19),
      new THREE.Vector3(1.05, 0.85, -0.2),
      new THREE.Vector3(1.04, 0.72, -0.21),
      new THREE.Vector3(0.91, 0.7, -0.22),
    ]);
    const dropRightGeo = new THREE.TubeGeometry(dropRightCurve, 20, 0.014, 12, false);
    const dropLeftGeo = new THREE.TubeGeometry(dropLeftCurve, 20, 0.014, 12, false);
    const dropRightMesh = new THREE.Mesh(dropRightGeo, matteCarbonMat);
    const dropLeftMesh = new THREE.Mesh(dropLeftGeo, matteCarbonMat);
    bikeGroup.add(dropRightMesh);
    bikeGroup.add(dropLeftMesh);

    const hoodGeo = new THREE.BoxGeometry(0.07, 0.06, 0.03);
    const hoodRight = new THREE.Mesh(hoodGeo, glossBlackMat);
    hoodRight.position.set(1.04, 0.82, 0.195);
    const hoodLeft = new THREE.Mesh(hoodGeo, glossBlackMat);
    hoodLeft.position.set(1.04, 0.82, -0.195);
    bikeGroup.add(hoodRight);
    bikeGroup.add(hoodLeft);

    // 9. Shimano Dura-Ace C50 Deep Aero Carbon Wheels
    const wheelsList = [];

    const createWheel = (centerPos, isRear = false) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.copy(centerPos);

      // 50mm Carbon Aero Rim
      const rimGeo = new THREE.TorusGeometry(0.58, 0.045, 24, 64);
      const rimMesh = new THREE.Mesh(rimGeo, matteCarbonMat);
      rimMesh.castShadow = true;
      wheelGroup.add(rimMesh);

      // Continental Grand Prix 5000 S TR Tire
      const tireGeo = new THREE.TorusGeometry(0.61, 0.024, 20, 64);
      const tireMesh = new THREE.Mesh(tireGeo, rubberMat);
      wheelGroup.add(tireMesh);

      // Centerlock Disc Rotor
      const rotorRadius = isRear ? 0.12 : 0.14;
      const rotorGeo = new THREE.RingGeometry(0.04, rotorRadius, 32);
      const rotorMesh = new THREE.Mesh(rotorGeo, chromeBrakeMat);
      rotorMesh.position.z = -0.028;
      wheelGroup.add(rotorMesh);

      // Hub Shell
      const hubGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.08, 16);
      const hubMesh = new THREE.Mesh(hubGeo, duraAceMetalMat);
      hubMesh.rotation.x = Math.PI / 2;
      wheelGroup.add(hubMesh);

      // Bladed Aero Spokes
      const spokeCount = 20;
      const spokeGeo = new THREE.CylinderGeometry(0.002, 0.002, 0.54, 4);
      for (let i = 0; i < spokeCount; i++) {
        const angle = (i / spokeCount) * Math.PI * 2;
        const spoke = new THREE.Mesh(spokeGeo, chromeBrakeMat);
        spoke.position.set(
          Math.cos(angle) * 0.27,
          Math.sin(angle) * 0.27,
          (i % 2 === 0 ? 0.015 : -0.015)
        );
        spoke.rotation.z = angle + Math.PI / 2;
        wheelGroup.add(spoke);
      }

      if (isRear) {
        const cassetteGeo = new THREE.CylinderGeometry(0.04, 0.11, 0.035, 24);
        const cassetteMesh = new THREE.Mesh(cassetteGeo, duraAceMetalMat);
        cassetteMesh.rotation.x = Math.PI / 2;
        cassetteMesh.position.z = 0.025;
        wheelGroup.add(cassetteMesh);
      }

      bikeGroup.add(wheelGroup);
      wheelsList.push(wheelGroup);
      return wheelGroup;
    };

    const frontWheel = createWheel(DROPOUT_FRONT, false);
    const rearWheel = createWheel(DROPOUT_REAR, true);
    sceneState.current.wheels = [frontWheel, rearWheel];

    // 10. Shimano Dura-Ace Dual Power Crankset
    const crankGroup = new THREE.Group();
    crankGroup.position.copy(BB);

    const chainringGeo = new THREE.RingGeometry(0.06, 0.14, 40);
    const chainringMesh = new THREE.Mesh(chainringGeo, duraAceMetalMat);
    chainringMesh.position.z = 0.045;
    crankGroup.add(chainringMesh);

    const crankArmGeo = new THREE.BoxGeometry(0.18, 0.032, 0.018);
    const rightArm = new THREE.Mesh(crankArmGeo, glossBlackMat);
    rightArm.position.set(0.08, 0, 0.06);
    crankGroup.add(rightArm);

    const leftArm = new THREE.Mesh(crankArmGeo, glossBlackMat);
    leftArm.position.set(-0.08, 0, -0.06);
    leftArm.rotation.z = Math.PI;
    crankGroup.add(leftArm);

    const pedalGeo = new THREE.BoxGeometry(0.06, 0.015, 0.07);
    const pedalRight = new THREE.Mesh(pedalGeo, matteCarbonMat);
    pedalRight.position.set(0.16, 0, 0.09);
    const pedalLeft = new THREE.Mesh(pedalGeo, matteCarbonMat);
    pedalLeft.position.set(-0.16, 0, -0.09);
    crankGroup.add(pedalRight);
    crankGroup.add(pedalLeft);

    bikeGroup.add(crankGroup);
    sceneState.current.drivetrainGroup = crankGroup;

    // 11. Shimano Dura-Ace Di2 Rear Derailleur
    const rdGeo = new THREE.BoxGeometry(0.08, 0.12, 0.04);
    const rdMesh = new THREE.Mesh(rdGeo, duraAceMetalMat);
    rdMesh.position.set(DROPOUT_REAR.x + 0.04, DROPOUT_REAR.y - 0.06, 0.06);
    bikeGroup.add(rdMesh);

    // 12. Chain Loop
    const chainMat = new THREE.LineBasicMaterial({ color: 0x999999, linewidth: 2 });
    const chainPoints = [
      new THREE.Vector3(BB.x, BB.y + 0.12, 0.045),
      new THREE.Vector3(DROPOUT_REAR.x, DROPOUT_REAR.y + 0.08, 0.035),
      new THREE.Vector3(DROPOUT_REAR.x + 0.04, DROPOUT_REAR.y - 0.08, 0.04),
      new THREE.Vector3(BB.x, BB.y - 0.12, 0.045),
      new THREE.Vector3(BB.x, BB.y + 0.12, 0.045),
    ];
    const chainGeo = new THREE.BufferGeometry().setFromPoints(chainPoints);
    const chainLine = new THREE.Line(chainGeo, chainMat);
    bikeGroup.add(chainLine);

    // --- AERODYNAMIC WIND TUNNEL PARTICLE STREAMS ---
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVel = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 5 + 3;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 1.5 + 0.4;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      particleVel[i] = 0.06 + Math.random() * 0.08;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    sceneState.current.particles = particles;

    sceneState.current.scene = scene;
    sceneState.current.camera = camera;
    sceneState.current.renderer = renderer;
    sceneState.current.bikeGroup = bikeGroup;

    // Interaction Controls
    const handleMouseDown = (e) => {
      sceneState.current.isDragging = true;
      sceneState.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!sceneState.current.isDragging) return;
      const deltaX = e.clientX - sceneState.current.prevMousePos.x;

      if (sceneState.current.bikeGroup) {
        sceneState.current.bikeGroup.rotation.y += deltaX * 0.008;
        sceneState.current.rotationVelocity = deltaX * 0.001;
      }

      sceneState.current.prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      sceneState.current.isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.002;
      const cam = sceneState.current.camera;
      if (cam) {
        const dir = new THREE.Vector3();
        cam.getWorldDirection(dir);
        cam.position.addScaledVector(dir, -zoomDelta);
        const dist = cam.position.length();
        if (dist < 1.4) cam.position.setLength(1.4);
        if (dist > 7.5) cam.position.setLength(7.5);
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        sceneState.current.isDragging = true;
        sceneState.current.prevMousePos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e) => {
      if (!sceneState.current.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - sceneState.current.prevMousePos.x;
      if (sceneState.current.bikeGroup) {
        sceneState.current.bikeGroup.rotation.y += deltaX * 0.008;
      }
      sceneState.current.prevMousePos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      sceneState.current.isDragging = false;
    };

    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      sceneState.current.reqId = requestAnimationFrame(animate);

      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      if (isSpinning) {
        sceneState.current.wheels.forEach((w) => {
          w.rotation.z -= 0.06;
        });
        if (sceneState.current.drivetrainGroup) {
          sceneState.current.drivetrainGroup.rotation.z -= 0.035;
        }
      }

      if (!sceneState.current.isDragging && Math.abs(sceneState.current.rotationVelocity) > 0.0001) {
        if (sceneState.current.bikeGroup) {
          sceneState.current.bikeGroup.rotation.y += sceneState.current.rotationVelocity;
          sceneState.current.rotationVelocity *= 0.96;
        }
      } else if (!sceneState.current.isDragging && isSpinning && activeCameraView === 'hero') {
        if (sceneState.current.bikeGroup) {
          sceneState.current.bikeGroup.rotation.y += 0.0025;
        }
      }

      const cam = sceneState.current.camera;
      if (cam) {
        cam.position.lerp(sceneState.current.targetCameraPos, 0.06);
        sceneState.current.currentLookAt.lerp(sceneState.current.targetLookAt, 0.06);
        cam.lookAt(sceneState.current.currentLookAt);
      }

      if (particles && isWindTunnel) {
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] -= particleVel[i];
          if (positions[i * 3] < -3.5) {
            positions[i * 3] = 3.5 + Math.random();
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5 + 0.4;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (sceneState.current.reqId) cancelAnimationFrame(sceneState.current.reqId);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const mats = sceneState.current.materials;
    if (!mats.frame) return;

    if (isXRayMode) {
      mats.frame.wireframe = true;
      mats.frame.color = new THREE.Color(0x00f0ff);
      mats.frame.emissive = new THREE.Color(0x003355);
      mats.frame.emissiveIntensity = 0.6;
      mats.rearCarbon.wireframe = true;
      mats.rearCarbon.color = new THREE.Color(0x00f0ff);
    } else {
      mats.frame.wireframe = false;
      mats.frame.color = new THREE.Color(selectedColor.primaryColor);
      mats.frame.metalness = selectedColor.metalness;
      mats.frame.roughness = selectedColor.roughness;
      mats.frame.clearcoat = selectedColor.clearcoat;
      mats.frame.emissive = new THREE.Color(0x000000);

      mats.rearCarbon.wireframe = false;
      mats.rearCarbon.color = new THREE.Color(selectedColor.rearColor);

      if (mats.decals) {
        mats.decals.color = new THREE.Color(selectedColor.decalColor);
      }
    }
  }, [selectedColor, isXRayMode]);

  useEffect(() => {
    if (sceneState.current.particles) {
      sceneState.current.particles.visible = isWindTunnel;
    }
  }, [isWindTunnel]);

  const setCameraPreset = (viewId) => {
    const view = CAMERA_VIEWS.find((v) => v.id === viewId);
    if (!view) return;
    setActiveCameraView(viewId);
    sceneState.current.targetCameraPos.set(...view.pos);
    sceneState.current.targetLookAt.set(...view.target);
    sfx.playHover();
  };

  const handleSelectColorway = (colorway) => {
    setSelectedColor(colorway);
    if (onColorChange) onColorChange(colorway);
    sfx.playClick();
  };

  const resetCamera = () => {
    setCameraPreset('hero');
    if (sceneState.current.bikeGroup) {
      sceneState.current.bikeGroup.rotation.y = 0;
    }
    sfx.playClick();
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#06070a] shadow-2xl backdrop-blur-xl h-[600px] sm:h-[680px] lg:h-[760px] ${className}`}
    >
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left HUD */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3B00]"></span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-300">
            3D WebGL Aero Engine
          </span>
          <span className="font-mono text-[10px] text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/20">
            {fps} FPS
          </span>
        </div>

        <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl backdrop-blur-lg max-w-[280px]">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-display font-bold uppercase tracking-wider text-white">
              {selectedColor.name}
            </span>
            <span className="text-[9px] font-mono text-[#FF5E0E]">
              {selectedColor.badge}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-tight">
            TorayCa M40X Carbon • Onda ForkFlap™ • Shimano Dura-Ace Di2 12S
          </p>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center font-mono">
            <div>
              <div className="text-[9px] text-zinc-500 uppercase">WEIGHT</div>
              <div className="text-xs font-bold text-white">6.77 KG</div>
            </div>
            <div>
              <div className="text-[9px] text-zinc-500 uppercase">DRAG (CdA)</div>
              <div className="text-xs font-bold text-[#00F0FF]">0.048</div>
            </div>
            <div>
              <div className="text-[9px] text-zinc-500 uppercase">SAVINGS</div>
              <div className="text-xs font-bold text-[#FF5E0E]">-3.2 W</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Right HUD */}
      <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-3">
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => {
              setIsWindTunnel(!isWindTunnel);
              sfx.playHover();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isWindTunnel
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 shadow-glow-cyan'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Wind Tunnel Aero Particles"
          >
            <Wind className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Wind Tunnel</span>
          </button>

          <button
            onClick={() => {
              setIsXRayMode(!isXRayMode);
              sfx.playHover();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isXRayMode
                ? 'bg-[#FF3B00]/20 text-[#FF5E0E] border border-[#FF3B00]/40'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle TorayCa M40X Carbon X-Ray"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">X-Ray Layup</span>
          </button>

          <button
            onClick={() => {
              setIsSpinning(!isSpinning);
              sfx.playHover();
            }}
            className={`p-1.5 rounded-lg text-xs transition-all ${
              isSpinning ? 'text-[#D4FF00] bg-[#D4FF00]/10' : 'text-zinc-400 hover:text-white'
            }`}
            title="Toggle Spin"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin-slow' : ''}`} />
          </button>

          <button
            onClick={resetCamera}
            className="p-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            title="Reset Camera View"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col gap-1 p-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md max-w-[170px] hidden sm:flex">
          <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 px-2 py-0.5">
            CAMERA INSPECT
          </span>
          {CAMERA_VIEWS.map((cam) => (
            <button
              key={cam.id}
              onClick={() => setCameraPreset(cam.id)}
              className={`text-left px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all ${
                activeCameraView === cam.id
                  ? 'bg-white/15 text-white font-semibold border-l-2 border-[#FF3B00]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              {cam.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hotspots */}
      {HOTSPOTS.map((spot) => (
        <div
          key={spot.id}
          className="absolute z-20 pointer-events-auto transition-all"
          style={{
            left: `${spot.screenPos.x}%`,
            top: `${spot.screenPos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative group">
            <button
              onClick={() => {
                setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
                sfx.playClick();
              }}
              className="relative flex items-center justify-center w-7 h-7 rounded-full bg-black/80 border border-[#FF3B00]/80 text-[#FF5E0E] shadow-glow-crimson transition-transform duration-300 group-hover:scale-125"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B00] opacity-40"></span>
              <span className="font-mono text-[10px] font-bold">+</span>
            </button>

            {activeHotspot?.id === spot.id && (
              <div className="absolute left-1/2 -translate-x-1/2 top-10 w-64 p-3.5 rounded-xl bg-black/90 border border-white/20 shadow-2xl backdrop-blur-xl z-30 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-display font-bold text-white">{spot.title}</span>
                  <span className="font-mono text-[9px] text-[#00F0FF]">{spot.spec}</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">{spot.desc}</p>
                <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspot(null);
                    }}
                    className="text-[10px] font-mono text-zinc-400 hover:text-white"
                  >
                    CLOSE [ESC]
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Bottom Center: Paint Finish / Colorway Switcher */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/75 border border-white/15 backdrop-blur-xl shadow-2xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 mr-1 hidden sm:inline">
            LIVERY:
          </span>

          {COLORWAYS.map((c) => {
            const isSelected = selectedColor.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleSelectColorway(c)}
                className={`relative group flex items-center justify-center p-1 rounded-full transition-all duration-300 ${
                  isSelected ? 'scale-110 ring-2 ring-[#FF3B00] ring-offset-2 ring-offset-black' : 'opacity-70 hover:opacity-100'
                }`}
                title={c.name}
              >
                <div
                  className="w-6 h-6 rounded-full border border-white/20 shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${c.primaryColor} 0%, ${c.accentColor} 50%, ${c.rearColor} 100%)`,
                  }}
                />
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00F0FF] rounded-full border border-black shadow" />
                )}
              </button>
            );
          })}
        </div>

        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <span>DRAG 360°</span>
          <span>•</span>
          <span>SCROLL ZOOM</span>
          <span>•</span>
          <span>CLICK PINS</span>
        </div>
      </div>
    </div>
  );
};
