'use strict';

/**
 * Run the animation functions.
 */
Banner.prototype.start = function () {
  this.banner = document.querySelector('.banner');

  this.bannerWidth = this.banner.offsetWidth;
  this.bannerHeight = this.banner.offsetHeight;

  // Image array for preloading
  this.images = [
    'images/copy1.svg',
    'images/copy2.png',
    'images/grad.png',
    'images/logo.svg',
    'images/replay.svg',
    'images/scribble.png',
  ];

  this.preloadImages(this.images, () => {
    this.createElements();
    this.setup();
    this.hidePreloader();
    this.animate();
    this.bindEvents();
  });
};

/**
 * Create dom elements.
 */
Banner.prototype.createElements = function () {
  this.copy1 = this.smartObject({
    id: 'COPY1',
    backgroundImage: 'images/copy1.svg',
    top: 'none',
    parent: this.banner
  });

  this.copy2 = this.smartObject({
    id: 'COPY2',
    backgroundImage: 'images/copy2.png',
    backgroundSize: '100% 100%',
    retina: true,
    parent: this.banner
  });

  this.scribble = this.smartObject({
    id: 'SCRIBBLE',
    backgroundImage: 'images/scribble.png',
    backgroundSize: '1400% 100%',
    width: 235,
    height: 46,
    parent: this.banner
  });

  this.topGrad = this.smartObject({
    id: 'TOPGRAD',
    backgroundImage: 'images/grad.png',
    parent: this.banner
  });

  this.logo = this.smartObject({
    id: 'LOGO',
    backgroundImage: 'images/logo.svg',
    backgroundSize: '100% 100%',
    top: 'none',
    retina: true,
    parent: this.banner
  });

  this.bottomGrad = this.smartObject({
    id: 'BOTTOMGRAD',
    backgroundImage: 'images/grad.png',
    parent: this.banner
  });

  this.clickArea = this.smartObject({
    width: this.bannerWidth,
    height: this.bannerHeight,
    cursor: 'pointer',
    Index: 9,
    parent: this.banner
  })

  this.replay = this.smartObject({
    id: 'REPLAY',
    backgroundImage: 'images/replay.svg',
    width: 25,
    height: 25,
    cursor: 'pointer',
    zIndex: 10,
    parent: this.banner
  });
};

/**
 * Setup initial element states.
 */
Banner.prototype.setup = function () {
  this.copy1.center();
  this.copy1.set({ bottom: 6 });
  this.copy2.centerHorizontal();
  this.copy2.set({ autoAlpha: 0, top: 71 });
  this.scribble.set({ autoAlpha: 0, top: 75, left: 16 });
  this.topGrad.centerHorizontal();
  this.logo.centerHorizontal();
  this.logo.set({ autoAlpha: 0, bottom: 57 });
  this.bottomGrad.centerHorizontal();
  this.bottomGrad.set({ autoAlpha: 0 });
  this.replay.set({ autoAlpha: 0 });

  this.replay.addEventListener('click', () => {
    this.timeline.play('start');
  });

  this.replay.addEventListener('mouseover', () => {
    TweenLite.to(this.replay, 0.3, { rotation: 360, ease: Sine.easeIn });
  });

  this.replay.addEventListener('mouseout', () => {
    TweenLite.to(this.replay, 0.3, { rotation: 0, ease: Sine.easeOut });
  });
};

/**
 * Hide the preloader.
 */
Banner.prototype.hidePreloader = function () {
  TweenLite.to('.preloader', 1, { autoAlpha: 0 });
};

/**
 * Animation timeline.
 */
Banner.prototype.animate = function () {
  this.timeline = new TimelineMax({ delay: 1 })
    .add('start')
    .set(this.topGrad, { y: 33 }, 'copyOneIn')
    .set(this.copy1, { y: +20 }, 'copyOneIn')
    .to(this.topGrad, 1.5, { y: 190, ease: Power3.easeOut }, 'copyOneIn')
    .to(this.copy1, 1.5, { y: 0, ease: Power3.easeOut }, 'copyOneIn')
    .set(this.scribble, { autoAlpha: 1 }, 'scribble+=1.2' )
    .to(this.scribble, 0.56, { backgroundPosition: '-3055px 0', ease: SteppedEase.config(13) }, 'scribble+=1.2')
    .set(this.topGrad, { y: -189 }, 'copyOneOut+=2')
    .to(this.topGrad, 1.5, { y:-16, ease: Power3.easeIn }, 'copyOneOut+=2')
    .to([this.scribble, this.copy1] , 1.5, { y:-19, ease: Power3.easeIn }, 'copyOneOut+=2')
    .set([this.copy1, this.scribble], { autoAlpha: 0 })
    .set(this.topGrad, { y: 1 })
    .set(this.bottomGrad, { autoAlpha: 1, y: 87 })
    .set(this.logo, { autoAlpha: 1, y: 20 })
    .set(this.copy2, { autoAlpha: 1, y: 20 })
    .add([
       TweenLite.to(this.topGrad, 1.7, { y: 114, ease: Power3.easeOut }),
       TweenLite.to(this.bottomGrad, 1.7, { y: 193, ease: Power3.easeOut }),
       TweenLite.to(this.logo, 1.7, { y: 0, ease: Power3.easeOut }),
       TweenLite.to(this.copy2, 1.7, { y: 0, ease: Power3.easeOut })
    ], 'endFrame')
    .add(TweenLite.to(this.replay, 0.4, { autoAlpha: 1 }));
};
