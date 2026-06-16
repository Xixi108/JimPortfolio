const WORKS_BASE = 'SAMPLE WORKS-20260615T114309Z-3-001/SAMPLE WORKS/';
const THUMBS_BASE = 'Thumbnails-20260615T114305Z-3-001/Thumbnails/';

function encPath(base, filename) {
    return base.replace(/ /g, '%20') + filename.replace(/ /g, '%20');
}

const sampleWorks = [
    { file: 'Zarkasm-Logo-Skull.png',     title: 'Zarkasm Logo' },
    { file: 'Zeke-for-a4-Prints-EDITED.png', title: 'Zeke Print' },
    { file: 'NrshimhaDev4r.png',           title: 'Nrshimha Dev4r' },
    { file: 'SOD.png',                     title: 'SOD' },
    { file: 'Artboard 2.png',              title: 'Artboard 2' },
    { file: 'Artboard 3.png',              title: 'Artboard 3' },
    { file: 'Artboard 4.png',              title: 'Artboard 4' },
    { file: 'Artboard 6.png',              title: 'Artboard 6' },
    { file: 'Artboard 6 copy.png',         title: 'Artboard 6 (Alt)' },
    { file: 'ERE.jpg',                     title: 'ERE' },
    { file: 'Meme.png',                    title: 'Meme' },
    { file: '159948292_4338045926224094_2062273603582633607_n.jpg',  title: 'Artwork 1' },
    { file: '163800514_4368217879873565_8519526866380308224_n.jpg',  title: 'Artwork 2' },
    { file: '166519130_4385676184794401_773476034313238771_n.jpg',   title: 'Artwork 3' },
    { file: '175145080_4461456013883084_5786770876624487101_n.jpg',  title: 'Artwork 4' },
    { file: '312243603_6145916675437001_3813828492041430816_n.jpg',  title: 'Artwork 5' },
];

const thumbNums = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,78,79,80];

const thumbSpecial = [
    { file: 'Bran1.png',            title: 'Brand 1' },
    { file: 'Bran2.png',            title: 'Brand 2' },
    { file: 'LIFELOCK-VS-AURA.png', title: 'LifeLock vs Aura' },
    { file: 'MAY-17.png',           title: 'May 17' },
    { file: 'Thumbnail-Test.png',   title: 'Thumbnail Test' },
    { file: 'You-Could-Be-Next--ID-Theft-PreventionVariation2.png', title: 'ID Theft Prevention' },
];

const thumbnails = [
    ...thumbNums.map(n => ({ file: `${n}.png`, title: `Thumbnail ${n}` })),
    ...thumbSpecial,
];

// ── Gallery state ──
let activeGallery = [];
let activeIndex  = 0;

function buildGalleryItems(items, base) {
    return items.map((item, i) => ({ src: encPath(base, item.file), title: item.title, index: i }));
}

const worksFlat  = buildGalleryItems(sampleWorks, WORKS_BASE);
const thumbsFlat = buildGalleryItems(thumbnails,  THUMBS_BASE);

function createCard(galleryFlat, item) {
    const wrap = document.createElement('div');
    wrap.className = 'gallery-item';

    const img = document.createElement('img');
    img.src     = item.src;
    img.alt     = item.title;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = `<div class="gallery-overlay-text"><div class="gallery-overlay-title">${item.title}</div></div>`;

    wrap.appendChild(img);
    wrap.appendChild(overlay);

    wrap.addEventListener('click', () => {
        activeGallery = galleryFlat;
        activeIndex   = item.index;
        showLightbox();
    });

    return wrap;
}

const worksGrid  = document.getElementById('works-grid');
const thumbGrid  = document.getElementById('thumbnails-grid');

worksFlat.forEach(item  => worksGrid.appendChild(createCard(worksFlat,  item)));
thumbsFlat.forEach(item => thumbGrid.appendChild(createCard(thumbsFlat, item)));

// ── Lightbox ──
const lb      = document.getElementById('lightbox');
const lbImg   = document.getElementById('lightbox-img');
const lbCount = document.getElementById('lightbox-counter');

function showLightbox() {
    const item = activeGallery[activeIndex];
    lbImg.src  = item.src;
    lbImg.alt  = item.title;
    lbCount.textContent = `${activeIndex + 1} / ${activeGallery.length}`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideLightbox() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
}

function navigate(dir) {
    activeIndex = (activeIndex + dir + activeGallery.length) % activeGallery.length;
    showLightbox();
}

document.getElementById('lightbox-close').addEventListener('click', hideLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => navigate(-1));
document.getElementById('lightbox-next').addEventListener('click', () => navigate(1));
lb.addEventListener('click', e => { if (e.target === lb) hideLightbox(); });

document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape')     hideLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
});
