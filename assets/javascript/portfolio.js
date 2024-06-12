/*

Thanks for:
    - Google
    - StackOverflow
    - jQuery
    - jQuery Marquee
    - animate.css
    - typed.js


*/

'use strict';

const ipgeolocation = '';

const timeouts = [];

const mobileAndTabletCheck = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

$(document).ready(() => {
  const links = [
    {
      name: 'Under Uppbyggnad...',
      link: '',
    },
  ];

  for (let i in links) {
    let link = links[i];

    $('#marquee').append(`<a href="https://oguser.xyz/redirect${link.link}" target="_BLANK">${link.name}</a>`);

    link = $('#marquee').children('a').last();

    if (i != links.length - 1) $('#marquee').append(' <img class="emoticon" src="assets/others/mgh_17.png"> ');
  }

  if (mobileAndTabletCheck()) {
    $('#background').replaceWith('<div id="background" style="background-image: url(assets/images/mobile-background.jpg);"></div>');

    app.shouldIgnoreVideo = true;
  }

  app.titleChanger(['t|', 'ta|', 'tab|', 'taby|', 'tabye|', 'tabyen|', 'tabyens|', 'tabyensk|', 'tabyenski|', 'tabyenskil|', 'tabyenskil|', 'tabyenskild|', 'tabyenskilda|', 'tabyenskilda.|', 'tabyenskilda.c|', 'tabyenskilda.co|', 'tabyenskilda.com|', 'tabyenskilda.com|' , 'tabyenskilda.com|' , 'tabyenskilda.co|', 'tabyenskilda.c|', 'tabyenskilda.|', 'tabyenskilda|', 'tabyenskild|', 'tabyenskil|', 'tabyenski|', 'tabyensk|', 'tabyenskil|', 'tabyens|', 'tabyen|', 'tabye|', 'taby|', 'tab|', 'ta|', 't|', '|', '|', '|', ]);
  app.iconChanger(['assets/icons/t23.jpg']);
});

if ($.cookie('videoTime')) {
  app.videoElement.currentTime = $.cookie('videoTime');
  app.audioElement.currentTime = $.cookie('videoTime');
}

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.body.onkeyup = (event) => {
  if (event.keyCode == 32 && app.skippedIntro) {
    if (app.backgroundToggler) {
      app.videoElement.play();
      app.audioElement.play();
    } else {
      app.videoElement.pause();
      app.audioElement.pause();
    }

    return (app.backgroundToggler = !app.backgroundToggler);
  }
};

$('html').on('contextmenu', (event) => {
  const img = document.createElement('img');

  const trollfaceLight = app.skippedIntro ? '' : 'trollface-light';

  img.src = 'assets/others/trollface.png';
  img.width = 64;
  img.height = 64;
  img.alt = 'tabyenskilda.com';
  img.style = `position: absolute; left: ${event.pageX}px; top: ${event.pageY}px; z-index: 10`;
  img.className = `troll ${trollfaceLight}`;

  document.body.appendChild(img);
});

setInterval(() => {
  $('.troll').remove();
}, 600);

$('.skip').click(() => {
  skipIntro();
});

$.fn.extend({
  animateCss: function (animationName) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    this.addClass(`animated ${animationName}`).one(animationEnd, () => {
      $(this).removeClass(`animated ${animationName}`);
    });

    return this;
  },
});

const writeLine = (text, speed, timeout, callback) => {
  timeout = typeof timeout === 'number' ? timeout : [0, (callback = timeout)];

  const lineNumber = app.id !== 2 ? ++app.id : (app.id += 2);

  setTimeout(() => {
    const typed = new Typed(`#line${lineNumber}`, {
      strings: text,
      typeSpeed: speed,
      onComplete: callback,
    });
  }, timeout);
};

$.getJSON(ipgeolocation, (data) => {
  writeLine(['Authenticating...', "Granting access to <span style='font-size: 14px; color: #06d;'>[unknown]</span>..."], 30, () => {
    if (app.skippedIntro) return;

    clearCursor();

    const usernames = ['user', 'dude'];

    const ip = data.ip ? data.ip : usernames[Math.floor(Math.random() * usernames.length)];
    const country = data.country_name ? data.country_name : 'your country';

    writeLine([`Access granted! <span style='font-size: 14px; color: #0f0;'>[success]</span>`, `Welcome back, <i style='color: #0f0'>${ip}</i>! By the way, nice to see someone from ${country} here!`], 30, 500, () => {
      if (app.skippedIntro) return;

      clearCursor();

      writeLine([`<i style='color: #F62459'>tabyenskilda.com $$$</i>`], 120, 500, () => {
        timeouts.push(
          setTimeout(() => {
            if (app.skippedIntro) return;

            clearCursor();

            setTimeout(() => {
              skipIntro();
            }, 500);
          }, 1000)
        );
      });
    });
  });
});

const skipIntro = () => {
  if (app.skippedIntro) return;

  app.skippedIntro = true;

  timeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });

  $('.top-right').remove();

  $('#main').fadeOut(100, () => {
    $('#main').remove();

    $('#marquee').marquee({
      duration: 5000,
      gap: 200,
      delayBeforeStart: 1000,
      direction: 'left',
      duplicated: true,
    });

    setTimeout(() => {
      $('.brand-header').animateCss(app.effects[Math.floor(Math.random() * app.effects.length)]);
    }, 200);

    setTimeout(() => {
      const typed = new Typed('#brand', {
        strings: app.brandDescription,
        typeSpeed: 40,

        onComplete: () => {
          clearCursor();
        },
      });
    }, 1350);

    setTimeout(() => {
      if (!app.shouldIgnoreVideo) {
        app.videoElement.play();
        app.audioElement.play();
      }

      app.videoElement.addEventListener(
        'timeupdate',
        () => {
          $.cookie('videoTime', app.videoElement.currentTime, { expires: 1 });
        },
        false
      );

      $('.marquee-container').css('visibility', 'visible').hide().fadeIn(100);

      $('.marquee-container').animateCss('zoomIn');

      $('.container').fadeIn();

      $('.background').fadeIn(0, () => {
        if (!app.shouldIgnoreVideo) $('#audio').animate({ volume: app.musicVolume },);
      });
    }, 200);
  });
};

const clearCursor = () => {
  return $('span').siblings('.typed-cursor').css('opacity', '0');
};
