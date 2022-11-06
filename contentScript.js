
// (function() {
let video;
let playbackRate;
let infoSnackbar;

let settingsMenu;
let playbackMenu;

let settingsIcon;


console.log('Welcome to TurboPlay!');

chrome.runtime.onMessage.addListener((message, sender, response) => {
    const { type, value } = message;
    console.log('message received', message);
    if (type === 'new') {
        video = document.querySelector('video');
        playbackRate = video.playbackRate;
        video.dataset.turborate = playbackRate;

        console.log('new video loaded');
        console.log(playbackRate);

        // toggle the settingsIcon on & off so the settings menu loads
        settingsIcon = document.querySelector('.ytp-settings-button');
        settingsIcon.click();
        settingsIcon.click();

        settingsMenu = document.querySelector('.ytp-popup.ytp-settings-menu.ytp-rounded-menu');
        // settingsMenu.click()
        settingsMenu.firstChild.firstChild.children[1].click();
        console.log(settingsMenu.firstChild.firstChild.children[1]);

        playbackMenu = document.querySelector('.ytp-popup.ytp-settings-menu.ytp-rounded-menu .ytp-panel-menu[role="menu"]');
        // console.log(playbackMenu);

        
    
        [2.5, 3, 3.5, 4].forEach((rate) => {
            let rateStr = rate.toString().replace('.', '-');
            if (!playbackMenu.querySelector(`._${rateStr}x-button`)) {
                let turboButton = document.createElement('div');
                turboButton.className = `ytp-menuitem _${rateStr}x-button`;
                turboButton.tabindex = '0';
                turboButton.setAttribute('role', 'menuitemradio');
                turboButton.innerHTML = `<div class="ytp-menuitem-label">${rate}</div>`;
    
                turboButton.addEventListener('click', () => {
                    playbackRate = rate;
                    video.playbackRate = rate;
                    playbackMenu.querySelectorAll('.ytp-menuitem').forEach(item => item.setAttribute('aria-checked', 'false'));
                    
                    // check the turbo playback rate
                    turboButton.setAttribute('aria-checked', 'true');
    
                    // hide the playback menu
                    document.querySelector('.ytp-popup.ytp-settings-menu.ytp-rounded-menu').style.display = 'none';
                });
                playbackMenu.appendChild(turboButton);
                
            }
        });
        console.log(playbackMenu);

        return true;
    }
});


// }());

let timeout;
document.onkeydown = function keydown(evt) {
    // console.log(evt.key, evt.shiftKey)
    if (evt.shiftKey && evt.key == '>') {
        // toggleKnowledgeBits();
        video = document.querySelector('video');
        
        playbackRate = video.playbackRate;

        playbackRate += 0.25;
        video.playbackRate = playbackRate;
        video.dataset.turborate = playbackRate;

        infoSnackbar = document.querySelector('.ytp-bezel-text-wrapper').parentElement;
        console.log('infoSnackbar', infoSnackbar);
        infoSnackbar.querySelector('.ytp-bezel-text').innerHTML = playbackRate + 'x';
        infoSnackbar.style.removeProperty('display');

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            infoSnackbar.style.display = 'none';
        }, 1000);
        
        // alert('playbackRate: ' + playbackRate);
    }

    if (evt.shiftKey && evt.key == '<') {
        // toggleKnowledgeBits();

        video = document.querySelector('video');
        // console.log(video.playbackRate)
        playbackRate = parseFloat(video.dataset.turborate);

        playbackRate -= 0.25;
        video.playbackRate = playbackRate;
        video.dataset.turborate = playbackRate;

        infoSnackbar = document.querySelector('.ytp-bezel-text-wrapper').parentElement;
        console.log('infoSnackbar', infoSnackbar);
        infoSnackbar.querySelector('.ytp-bezel-text').innerHTML = playbackRate + 'x';
        infoSnackbar.style.removeProperty('display');

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            infoSnackbar.style.display = 'none';
        }, 1000);
        
    }
}