const videoAd_videoDiv = document.getElementById('theVideoPlayer');
const desktopGame       = document.getElementById('desktopGame');
const mobileGame        = document.getElementById('mobile-game-overlay');
const gameBtn           = document.getElementById('gameBtn');
const gameCol           = document.getElementById('game-col');
const rotatingContainer = document.getElementById('rotating-image-container');
const funSkillDiv       = document.getElementById('funskill');


const videoAd_headStyle = "background-color:#03F40F;border:solid 1px #03940F;padding:2px 8px;border-radius:2px;font-weight:900;color:#000;margin-right:6px;"

function videoad_consoleLog(msg, ...args) {
    const msgStyle = "font-weight:500;"
    console.log('%c' + 'VideoAd' + '%c' + msg, videoAd_headStyle, msgStyle, ...args);
}
function videoAd_consoleLogErr(errorMsg, ...args) {
    const errMsgStyle = "font-weight:500;color:red;"
    console.log('%c' + 'VideoAd' + '%c' + errorMsg, videoAd_headStyle, errMsgStyle, ...args);
}

/* ====== Config to match your CSS breakpoints ====== */
const MOBILE_MAX_WIDTH   = 1080;   // matches @media (max-width:1080px)
const RIGHT_RAIL_MIN_W   = 1301;   // right rail only shows when >1300px

/* ====== Device detection (matches your existing rules) ====== */
const userAgent   = navigator.userAgent || navigator.vendor || window.opera;
const platform    = navigator.platform || '';
const touchPoints = Number(navigator.maxTouchPoints || 0);
function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
const isChromebook = /CrOS/.test(userAgent);
const isMacBook    = /MacIntel/.test(platform) && touchPoints < 2;
const isIpad       = /iPad/.test(userAgent) || (platform === 'MacIntel' && touchPoints > 2);
const isMobile     = !isChromebook && !isMacBook && (getViewportWidth() <= MOBILE_MAX_WIDTH || isIpad);

/* ====== House-ad rotation (moved from mobileOverlayNovp.js) ====== */
function fillRightRailHouseAd() {
  if (!rotatingContainer) return;
  // Only fill if the CSS will actually show the right rail
  if (!window.matchMedia || !matchMedia('(min-width:' + RIGHT_RAIL_MIN_W + 'px)').matches) return;

  const images = [
    { src: '/images/ffa.png', link: 'https://mathplayground.com/subscribe' },
	{ src: '/images/ffb.png', link: 'https://mathplayground.com/subscribe' },
	{ src: '/images/fca.png', link: 'https://mathplayground.com/subscribe' },
	{ src: '/images/fcb.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/math14.png', link: 'https://mathplayground.com/ASB_Index' },
    { src: '/images/math15.png', link: 'https://mathplayground.com/wordproblems' },
    { src: '/images/math16.png', link: 'https://mathplayground.com/ASB_Index' },
    { src: '/images/math17.png', link: 'https://mathplayground.com/ASB_Index' },
    { src: '/images/160x600-00.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-01.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-02.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-03.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-04.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-05.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-06.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-07.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-08.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/160x600-09.png', link: 'https://mathplayground.com/subscribe' },
    { src: '/images/math05.png' },
    { src: '/images/math06.png' },
    { src: '/images/math07.png' },
    { src: '/images/math08.png' },
    { src: '/images/math09.png' },
    { src: '/images/math10.png' },
    { src: '/images/math11.png' },
    { src: '/images/math12.png' },
    { src: '/images/math13.png' }
  ];

  rotatingContainer.style.width  = '160px';
  rotatingContainer.style.height = '600px';

  const selected = images[Math.floor(Math.random() * images.length)];
  const img = new Image(160, 600);
  img.src = selected.src;
  img.alt = 'Math Playground';

  rotatingContainer.innerHTML = '';
  if (selected.link) {
    const a = document.createElement('a');
    a.href = selected.link;
    a.target = '_self';
    //a.rel = 'noopener';
	a.rel = 'noopener noreferrer';
    a.appendChild(img);
    rotatingContainer.appendChild(a);
  } else {
    rotatingContainer.appendChild(img);
  }
}

/* ====== Right-rail: load on width change to ≥ RIGHT_RAIL_MIN_W ====== */
(function(){
  if (!window.matchMedia) return;
  const mq = matchMedia(`(min-width:${RIGHT_RAIL_MIN_W}px)`);
  function onChange(e){ if (e.matches) fillRightRailHouseAd(); }
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange); // Safari <14
})();

/* ====== Show/hide desktop vs mobile wrappers (moved from mobileOverlayNovp.js) ====== */
function applyLayoutForDevice() {
  if (isMobile) {
    videoad_consoleLog('Setting up for Mobile, no Video Ad');
    if (desktopGame) desktopGame.style.display = 'none';
    if (mobileGame)  mobileGame.style.display  = 'block';
    if (gameBtn) { gameBtn.width = 300; gameBtn.height = 180; }
    if (videoAd_videoDiv) videoAd_videoDiv.style.display = 'none';
  } else {
    videoad_consoleLog('Setting up for Desktop');
    if (desktopGame) desktopGame.style.display = 'flex';
    if (mobileGame)  mobileGame.style.display  = 'none';
    fillRightRailHouseAd(); // populate right rail house ad
  }
}


/* ====== Video ad player lifecycle (unchanged logic) ====== */
let videoAd_gotAdsReady   = false;
let videoAd_closedAlready = false;


function videoAd_closeTheVideoPlayer() {
    //videoAd_videoDiv.style.display = 'none';
	
	if (videoAd_videoDiv) videoAd_videoDiv.style.display = 'none';

    if ( videoAd_closedAlready ) {
        videoad_consoleLog('Player previously closed');
        return;
    }

    videoad_consoleLog("Closing the video player...");
    videoAd_closedAlready = true;

    try {
        ovpjs?.player.instance.destroy();
    } catch (error) {
        videoAd_consoleLogErr('Error occurred while destroying the video player: ', error);
    }
}


function videoad_initVideoPlayer() {

    if ( typeof ovpjs === "undefined" ) {
        videoAd_consoleLogErr('Error: ovpjs object is not present; is ovp.js being loaded on the page?');
        videoAd_closeTheVideoPlayer();
        return;
    }

    if ( typeof amp_getVideoPlacementURL === "undefined" ) {
        videoAd_consoleLogErr('Error: amp_getVideoPlacementURL is not present; potentially missing AMP engine.js');
        videoAd_closeTheVideoPlayer();
        return;
    }
    
    let vastTag = amp_getVideoPlacementURL();
    if (vastTag == 'fail') {
        vastTag = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/22404337467,10850682/MathPlayground-Games-Pre-Roll&description_url=https%3A%2F%2Fwww.mathplayground.com%2Fmath-games.html&tfcd=1&npa=1&sz=320x240%7C480x360%7C640x480%7C1280x960&min_ad_duration=5000&max_ad_duration=60000&gdfp_req=1&unviewed_position_start=1&output=vast&env=vp&impl=s&correlator=';
    }

    ovpjs.addVideoPlayerAdOnly({
        'divContainerId': 'theVideoPlayer',
        'placeholderVideo': {
            'type': 'video/mp4',
            'src': 'https://www.mathplayground.com/blankVideo5s.mp4',
        },
        'adPlacementUrl': vastTag
    });

    if (!ovpjs?.player?.instance) {
        videoAd_consoleLogErr('Error: ovpjs.player.instance is not available');
        videoAd_closeTheVideoPlayer();
        return;
    }

    ovpjs.player.instance.ready(function() {
        videoad_consoleLog('The player is ready!');
        this.on('adsready', function() {
            videoad_consoleLog('The ads are ready!');
            videoAd_gotAdsReady = true;				

            videoAd_videoDiv.style.opacity = '1';
            videoAd_videoDiv.style.pointerEvents = 'auto';

            this.ima.addEventListener(google.ima.AdEvent.Type.COMPLETE, function() {
                videoad_consoleLog('ad completed');
                videoAd_closeTheVideoPlayer();
            });
            this.ima.addEventListener(google.ima.AdEvent.Type.PAUSED, function() {
                videoad_consoleLog('ad paused');
            });
            this.ima.addEventListener(google.ima.AdEvent.Type.RESUMED, function() {
                videoad_consoleLog('ad resumed');
            });
            this.ima.addEventListener(google.ima.AdEvent.Type.SKIPPED, function() {
                videoad_consoleLog('ad skipped');
                videoAd_closeTheVideoPlayer();
            });
        });
    });
    ovpjs.player.instance.on('adserror', ( e ) => {

        const errorCode = e?.data?.AdErrorEvent?.error?.data?.errorCode;
        const errorMessage = e?.data?.AdErrorEvent?.error?.data?.errorMessage;

        if ( errorCode &&  errorMessage )
            videoAd_consoleLogErr( errorCode + ': ' + errorMessage );
        else if ( errorMessage )
            videoAd_consoleLogErr( 'AdsError: ' + errorMessage );
        else if ( errorCode )
            videoAd_consoleLogErr( 'AdsError: code=' + errorCode );
        else
            videoAd_consoleLogErr('ads adserror!');

        console.log( e) ;
        
        videoAd_closeTheVideoPlayer();
    }
    );
    ovpjs.player.instance.on('adtimeout', () => {
        videoAd_consoleLogErr('ads adtimeout!');

        setTimeout( ()=> {
            if ( videoAd_gotAdsReady ) 
                    videoad_consoleLog('Got adsready event, player lives');
            else {
                    videoad_consoleLog('Did not see adsready event, player dies');
                videoAd_closeTheVideoPlayer();
            }

            }, 300 );


    }
    );
    ovpjs.player.instance.on('playing', () => {
        videoad_consoleLog('video content playing!');
    }
    );
    ovpjs.player.instance.on('contentended', () => {
        videoad_consoleLog('video content ended!');
        videoAd_closeTheVideoPlayer();
			
    }
    );
    var playPromise = ovpjs.player.instance.play();
    if (playPromise !== undefined) {
        playPromise.then( _ => {
            videoad_consoleLog('Playback started!');
        }
        ).catch( error => { }
        );
    } else {
        videoAd_consoleLogErr('Video player error: playPromise is undefined');
        videoAd_closeTheVideoPlayer();
    }
}
let videoad_checkForRevCatchLoginRetries = 12;
function videoad_checkForRevCatchLogin() {

    if (!videoad_checkForRevCatchLoginRetries) {
        videoAd_consoleLogErr('Timeout checking for subscription login...');
        try {
            videoad_initVideoPlayer();
        } catch( error ) {
            videoAd_closeTheVideoPlayer();
            videoad_consoleLog('videoad_initVideoPlayer exception, closing player.' );
        }
        return;
    }

    --videoad_checkForRevCatchLoginRetries;

    if (! window.gRevCatch || ! window.gRevCatch.isReady()) {
        setTimeout(videoad_checkForRevCatchLogin, 120);
    } else if (typeof gAMPEngine === 'undefined' ) {
        setTimeout(videoad_checkForRevCatchLogin, 120);
    } else if (typeof ovpjs === 'undefined' ) {
        setTimeout(videoad_checkForRevCatchLogin, 120);
    } else {
        window.gRevCatch.getUser().then(user => {
            if (user?.status === 'success') {
                videoad_consoleLog('User is logged in, skipping video ad...');
                videoAd_closeTheVideoPlayer();
            } else {
                try {
                    videoad_initVideoPlayer();
                } catch( error ) {
                    videoAd_closeTheVideoPlayer();
                    videoad_consoleLog('videoad_initVideoPlayer exception, closing player.' );
                }
            }
        }
        );
    }
}


function showVideoAdOverlay() {
  if (!gameCol || !videoAd_videoDiv) return;

  const container = document.getElementById('game-container');
  if (!container) return;

  // Measure container (position:relative) and the full game column (#game-col)
  const cr = container.getBoundingClientRect();
  const gr = gameCol.getBoundingClientRect();

  // Make the overlay cover the ENTIRE #game-col (works for portrait & landscape)
  videoAd_videoDiv.style.position = 'absolute';   // safety, matches your HTML
  videoAd_videoDiv.style.boxSizing = 'border-box';
  videoAd_videoDiv.style.zIndex = '1000';

  videoAd_videoDiv.style.left   = Math.round(gr.left - cr.left) + 'px';
  videoAd_videoDiv.style.top    = Math.round(gr.top  - cr.top)  + 'px';
  videoAd_videoDiv.style.width  = Math.round(gr.width)  + 'px';
  videoAd_videoDiv.style.height = Math.round(gr.height) + 'px';

  // No letterboxing; just blanket the column so the fullscreen button is covered
  videoAd_videoDiv.style.paddingTop = '0';
  videoAd_videoDiv.style.paddingBottom = '0';

  // Block clicks immediately so fullscreen can’t be hit before adsready
  videoAd_videoDiv.style.pointerEvents = 'auto';
  videoAd_videoDiv.style.display = 'block';
  videoAd_videoDiv.style.opacity = '0';

  // Kick off the ad init/ready flow
  setTimeout(videoad_checkForRevCatchLogin, 60);
}

/* ====== RESIZE RECENTER (add this block below showVideoAdOverlay) ====== */
(function(){
  let t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(function () {
      if (!isMobile && videoAd_videoDiv && videoAd_videoDiv.style.display === 'block') {
        showVideoAdOverlay(); // recompute size/position on desktop
      }
    }, 150);
  });
})();

/* ====== ORIENTATION RECENTER ====== */
window.addEventListener('orientationchange', () => {
  if (!isMobile && videoAd_videoDiv && videoAd_videoDiv.style.display === 'block') {
    setTimeout(showVideoAdOverlay, 100); // allow layout to settle
  }
});
		
		
/* ====== Startup ====== */
function videoAdStartUp() {
  if (funSkillDiv && window.getComputedStyle(funSkillDiv).display === 'none') {
    console.log('VideoAd: funskill is hidden. Skipping video ad.');
    return;
  }

  // Apply desktop/mobile containers first (moved in from mobileOverlayNovp)
  applyLayoutForDevice();

  // Only run preroll on desktop layout
  if (!isMobile) {
    showVideoAdOverlay();
  }
}

// kick it off
setTimeout(videoAdStartUp, 250);
