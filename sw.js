const GH_PATH = '/flappy_web';
const APP_PREFIX = 'flappy_';
const VERSION = 'v_00';
const URLS = [
    '/',
    'manifest.webmanifest',
    'assets/images/background.png',
    'assets/images/bird-0.png',
    'assets/images/bird-1.png',
    'assets/images/bird-2.png',
    'assets/images/pipe-body.png',
    'assets/images/pipe-head.png',
    'assets/fonts/flappy-bird.ttf',
    'src/bird.js',
    'src/conf.js',
    'src/controller.js',
    'src/evolve-screen.js',
    'src/evolver.js',
    'src/fail-screen.js',
    'src/game.js',
    'src/matrix.js',
    'src/neural-network.js',
    'src/pipe-pair.js',
    'src/play-screen.js',
    'src/renderer.js',
    'src/result-screen.js',
    'src/sandbox.js',
    'src/util.js',
    'src/vec2.js',
    'about.html',
    'evolve.html',
    'fail.html',
    'index.html',
    'play.html',
    'result.html',
    'styles.css',
    'favicon.ico',
];
const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener('install', (ev) => {
    ev.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log(`Installing cache ${CACHE_NAME}`);
            await cache.addAll(URLS);
            console.log(`Installed ${URLS} in ${CACHE_NAME}`);
        })
    );
});
