(function() {
  var script = document.currentScript;
  var config = JSON.parse(script.getAttribute('data-args'));
  var parent = script.parentElement;


// TOTAL ITEMS IN CAROUSEL
var totalItems = items.length;
// TIMEOUT INTERVAL
var timeout;
var animate = true;

function getArrowsByFormat(adFormat) {
  var arrows = document.createElement("div");
  var rightArrow = document.createElement("div");
  var leftArrow = document.createElement("div");
  leftArrow.style = `transform: rotate(180deg)`;
  var { arrowSize, arrowColor } = config;
  rightArrow.innerHTML = `<svg fill=${arrowColor} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="${arrowSize}px" height="${arrowSize}px" viewBox="0 0 96.155 96.155"
    xml:space="preserve">
  <g>
    <path d="M20.972,95.594l57.605-45.951c0.951-0.76,0.951-2.367,0-3.127L20.968,0.56c-0.689-0.547-1.716-0.709-2.61-0.414
      c-0.186,0.061-0.33,0.129-0.436,0.186c-0.65,0.35-1.056,1.025-1.056,1.764v91.967c0,0.736,0.405,1.414,1.056,1.762
      c0.109,0.06,0.253,0.127,0.426,0.185C19.251,96.305,20.281,96.144,20.972,95.594z"/>
  </g>
  </svg>`;
  leftArrow.innerHTML = `<svg fill=${arrowColor} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="${arrowSize}px" height="${arrowSize}px" viewBox="0 0 96.155 96.155"
    xml:space="preserve">
  <g>
    <path d="M20.972,95.594l57.605-45.951c0.951-0.76,0.951-2.367,0-3.127L20.968,0.56c-0.689-0.547-1.716-0.709-2.61-0.414
      c-0.186,0.061-0.33,0.129-0.436,0.186c-0.65,0.35-1.056,1.025-1.056,1.764v91.967c0,0.736,0.405,1.414,1.056,1.762
      c0.109,0.06,0.253,0.127,0.426,0.185C19.251,96.305,20.281,96.144,20.972,95.594z"/>
  </g>
  </svg>`;
  arrows.appendChild(leftArrow);
  arrows.appendChild(rightArrow);

  rightArrow.addEventListener("click", function (e) {
    e.stopPropagation();
    animate = false;
    carousel.currentSlide += 1;
  });

  leftArrow.addEventListener("click", function (e) {
    e.stopPropagation();
    animate = false;
    carousel.currentSlide -= 1;
  });

  switch (adFormat) {
    case "160X600":
      arrows.style = `width: 155px; height: 0; position: relative; display: flex; justify-content: space-between; align-items: center; margin: 0 auto; z-index: 9999; top: 232px`;

      return { arrows };

    case "300X600":
      arrows.style = `width: 286px; height: 0; position: relative; display: flex; justify-content: space-between; align-items: center; margin: 0 auto; z-index: 9999; top: 258px`;

      return { arrows };

    case "970X250":
      arrows.style = `width: 516px; height: 0; position: relative; display: flex; justify-content: space-between; align-items: center; margin: 0; z-index: 9999; top: 128px; left: 12px;`;

      return { arrows };

    case "728X90":
      arrows.style = `width: 360px; height: 0; position: relative; display: flex; justify-content: space-between; align-items: center; margin: 0; z-index: 9999; top: 48px; bottom:0; left: 5px;`;

      return { arrows };

    case "320X50":
      arrows.style = `width: 149px; height: 0; top: 27px; position: relative; display: flex; justify-content: space-between; align-items: center; z-index: 9999; left: 3px`;

      return { arrows };
    case "300X50":
      arrows.style = `width: 155px; height: 0; top: 26px; position: relative; display: flex; justify-content: space-between; align-items: center; z-index: 9999;`;

      return { arrows };
    case "300X250":
      arrows.style = `width: 290px; height: 0; top: 101px; position: absolute; display: flex; justify-content: space-between; align-items: center; z-index: 9999; right: 5px`;

      return { arrows };

    default:
      return { arrows };
  }
}

function getItemLayoutByFormat(adFormat, item) {
  var description = document.createElement("div");
  var image = document.createElement("div");
  var price = document.createElement("div");
  var brand = document.createElement("div");
  var title = document.createElement("div");
  var photo = document.createElement("img");
  var score = document.createElement("div");

  // Item image = Custom Image 1
  var photoSrc = item.custom.customImage1;
  // Item rating = Custom Label 3
  var rating = +item.custom.custom3 ?? 0;

  // Item brand = Custom Label 2
  var brandInner = document.createElement("div");
  brandInner.innerHTML = item.custom.custom2;
  brand.appendChild(brandInner);
  description.appendChild(brand);

  var { showTitle } = config;
  // Item title = Title
  if (["320X50", "300X50"].includes(adFormat)) {
    if (showTitle === "true") {
      title.innerHTML = item.title;
      description.appendChild(title);
    }
  } else {
    title.innerHTML = item.title;
    description.appendChild(title);
  }
  photo.src = window.clinchSdk?.getDynImgUrl(photoSrc, 0, 0, 3) || photoSrc;
  image.appendChild(photo);
  score.innerHTML = Array.from(Array(5))
    .map((_, index) =>
      index + 1 <= rating ? `<span>★</span>` : `<span>☆</span>`
    )
    .join("");

  var currentPrice = item.price || item.originalPrice;
  price.innerHTML = `${item.currencySymbol}${
    Number.isInteger(currentPrice) ? currentPrice : currentPrice.toFixed(2)
  }`;

  var {
    ratingFontSize,
    ratingGap,
    priceFontSize,
    priceFontFamily,
    ratingFontFamily,
    textGap,
    brandFontSize,
    brandFontFamily,
    brandPadding,
    titlePadding,
    titleFontSize,
    titleFontFamily,
    priceLetterSpacing,
    brandLetterSpacing,
    titleLetterSpacing,
  } = config;

  switch (adFormat) {
    case "160X600":
      description.style = `width: 100%; height: 155px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; position: absolute; top: 0; gap: ${textGap}px; padding: 0;`;
      brand.style = `font-size: ${brandFontSize}px; height: ${
        brandFontSize * 3
      }px; font-family: ${
        brandFontFamily?.family
      }; display: flex; align-items: flex-end; justify-content: center; letter-spacing: ${brandLetterSpacing}px; width: calc(154px - ${brandPadding}px * 2); padding-left: ${brandPadding}px; padding-right: ${brandPadding}px;`;
      title.style = `font-size: ${titleFontSize}px; padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family};  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      image.style = `width: 100%; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: absolute; top: 172px;`;
      photo.style = "width: 120px; height: 120px; object-fit: contain;";
      score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family}; position: absolute; width: 100%; justify-content: center; top: 295px`;
      price.style = `width: 100%; height: 82px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; font-size: ${priceFontSize}px; position: absolute; bottom: 0; font-family: ${priceFontFamily?.family}; letter-spacing: ${priceLetterSpacing}px;`;

      return {
        description,
        image,
        price,
        score: !!rating ? score : null,
        brand,
      };

    case "300X600":
      description.style = `width: 100%; height: 135px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; position: absolute; top: -4px; gap: ${textGap}px; padding: 0px 0px;`;
      brand.style = `font-size: ${brandFontSize}px; height: ${
        brandFontSize * 2
      }px; font-family: ${
        brandFontFamily?.family
      }; display: flex; align-items: flex-end; justify-content: center; letter-spacing: ${brandLetterSpacing}px; width: calc(300px - ${brandPadding}px * 2); padding-left: ${brandPadding}px; padding-right: ${brandPadding}px;`;
      title.style = `font-size: ${titleFontSize}px; padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family};  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      image.style = `width: 220px; height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: absolute; top: 124px; left: 40px;`;
      photo.style = "width: 200px; height: 200px; object-fit: contain;";
      score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family}; position: absolute; width: 100%; justify-content: center; top: 352px;`;
      price.style = `width: 100%; height: 76px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; font-size: ${priceFontSize}px; position: absolute; bottom: 0; font-family: ${priceFontFamily?.family}; letter-spacing: ${priceLetterSpacing}px;`;

      return {
        description,
        image,
        price,
        score: !!rating ? score : null,
        brand,
      };

    case "970X250":
      description.style = `width: 210px; height: 90px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; text-align: left; position: absolute; top: 31px; left: 292px; gap: ${textGap}px;`;
      brand.style = `font-size: ${brandFontSize}px; height: ${
        brandFontSize * 2 + 4
      }px; padding-left: ${brandPadding}px; padding-right: ${brandPadding}px; font-family: ${
        brandFontFamily?.family
      };  display: flex; align-items: flex-end; letter-spacing: ${brandLetterSpacing}px; width: calc(210px - ${brandPadding}px * 2);`;
      title.style = `font-size: ${titleFontSize}px; padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family};  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      image.style = `width: 210px; height: 210px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left; position: absolute; top: 20px; left: 55px;`;
      photo.style = "width: 180px; height: 180px; object-fit: contain;";
      score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family}; position: absolute; justify-content: center; bottom: 20px; left: 292px;`;
      price.style = `width: 120px; height: 114px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; text-align: left; font-size: ${priceFontSize}px; position: absolute; bottom: 0; left: 291px; font-family: ${priceFontFamily?.family}; letter-spacing: ${priceLetterSpacing}px;`;

      return {
        description,
        image,
        price,
        score: !!rating ? score : null,
        brand,
      };

    case "728X90":
      description.style = `width: 170px; height: 45px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; text-align: left; position: absolute; top: 10px; left: 164px; gap: ${textGap}px;`;
      brand.style = `font-size: ${brandFontSize}px; height: ${brandFontSize}px; padding-left: ${brandPadding}px; padding-right: ${brandPadding}px; font-family: ${brandFontFamily?.family};  display: flex; align-items: flex-end; letter-spacing: ${brandLetterSpacing}px; width: calc(170px - ${brandPadding}px * 2);`;
      title.style = `font-size: ${titleFontSize}px; padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family};  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      image.style = `width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left; position: absolute; top: 5px; left: 50px;`;
      photo.style = "width: 70px; height: 70px; object-fit: contain;";
      score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family};`;
      price.style = `width: 170px; height: 32px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; text-align: left; font-size: ${priceFontSize}px; position: absolute; bottom: 0; left: 164px; font-family: ${priceFontFamily?.family}; letter-spacing: ${priceLetterSpacing}px;`;

      return { description, image, price, score: null, brand };

    case "320X50":
      // description.style = `width: 70px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; text-align: left; position: absolute; top: ${
      //   showTitle === "true" ? 5 : 7
      // }px; left: 72px; gap: ${textGap}px;`;
      // brand.style = `font-size: ${brandFontSize}px; height: ${
      //   brandFontSize * 2
      // }px; padding-left: ${brandPadding}px; padding-right: ${brandPadding}px; font-family: ${
      //   brandFontFamily?.family
      // }; letter-spacing: ${brandLetterSpacing}px; display: flex; align-items: center; width: calc(70px - ${brandPadding}px * 2);`;
      // title.style = `font-size: ${titleFontSize}px; padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family}; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      // image.style = `width: 44px; height: 44px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left; position: absolute; top: 2px; left: 17px;`;
      // photo.style = `width: 40px; height: 40px; object-fit: contain;`;
      // score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family};`;
      // price.style = `width: 60px; height: 10px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; text-align: left; font-size: ${priceFontSize}px; position: absolute; bottom: ${
      //   showTitle === "true" ? 6 : 9
      // }px; left: 72px; font-family: ${
      //   priceFontFamily?.family
      // }; letter-spacing: ${priceLetterSpacing}px;`;
      description.style = `width: 70px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; text-align: left; top: ${
        showTitle === "true" ? 5 : 7
      }px; left: 72px; gap: ${textGap}px;`;
      brand.style = `font-size: ${brandFontSize}px; max-height: ${
        brandFontSize * 2
      }px; padding-left: ${brandPadding}px; padding-right: ${brandPadding}px; font-family: ${
        brandFontFamily?.family
      }; letter-spacing: ${brandLetterSpacing}px; display: flex; align-items: flex-end; width: calc(70px - ${brandPadding}px * 2);`;
      title.style = `font-size: ${titleFontSize}px; padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family}; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      image.style = `width: 44px; height: 44px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left; position: absolute; top: 2px; left: 17px;`;
      photo.style = `width: 40px; height: 40px; object-fit: contain;`;
      score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family};`;
      price.style = `width: 60px; height: 10px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; text-align: left; font-size: ${priceFontSize}px; bottom: ${
        showTitle === "true" ? 6 : 9
      }px; left: 72px; font-family: ${
        priceFontFamily?.family
      }; letter-spacing: ${priceLetterSpacing}px;`;

      return { description, image, price, score: null, brand };

    case "300X50":
      // description.style = `width: 70px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; text-align: left; position: absolute; top: ${
      //   showTitle === "true" ? 5 : 7
      // }px; left: 71px; gap: ${textGap}px;`;
      // brand.style = `font-size: ${brandFontSize}px; height: ${
      //   brandFontSize * 2
      // }px; padding-left: ${brandPadding}px; padding-right: ${brandPadding}px; font-family: ${
      //   brandFontFamily?.family
      // }; display: flex; align-items: center; letter-spacing: ${brandLetterSpacing}px; width: calc(70px - ${brandPadding}px * 2);`;
      // title.style = `font-size: ${titleFontSize}px;  padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family}; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      // image.style = `width: 44px; height: 44px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left; position: absolute; top: 2px; left: 15px;`;
      // photo.style = `width: 40px; height: 40px; object-fit: contain;`;
      // score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family};`;
      // price.style = `width: 60px; height: 10px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; text-align: left; font-size: ${priceFontSize}px; position: absolute; bottom: ${
      //   showTitle === "true" ? 6 : 9
      // }px; left: 71px; font-family: ${
      //   priceFontFamily?.family
      // }; letter-spacing: ${priceLetterSpacing}px;`;
      description.style = `width: 70px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; text-align: left;  top: ${
        showTitle === "true" ? 5 : 7
      }px; left: 71px; gap: ${textGap}px;`;
      brand.style = `font-size: ${brandFontSize}px; max-height: ${
        brandFontSize * 2
      }px; padding-left: ${brandPadding}px; padding-right: ${brandPadding}px; font-family: ${
        brandFontFamily?.family
      }; display: flex; align-items: flex-end; letter-spacing: ${brandLetterSpacing}px; width: calc(70px - ${brandPadding}px * 2);`;
      title.style = `font-size: ${titleFontSize}px;  padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family}; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      image.style = `width: 44px; height: 44px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left; position: absolute; top: 2px; left: 15px;`;
      photo.style = `width: 40px; height: 40px; object-fit: contain;`;
      score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family};`;
      price.style = `width: 60px; height: 10px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; text-align: left; font-size: ${priceFontSize}px; bottom: ${
        showTitle === "true" ? 6 : 9
      }px; left: 71px; font-family: ${
        priceFontFamily?.family
      }; letter-spacing: ${priceLetterSpacing}px;`;

      return { description, image, price, score: null, brand };

    case "300X250":
      description.style = `width: 115px; display: flex; flex-direction: column; align-items: flex-start; text-align: left; position: absolute; top: 15px; left: 25px; gap: ${textGap}px;`;
      brand.style = `font-size: ${brandFontSize}px; height: ${
        brandFontSize * 3
      }px; padding-left: ${brandPadding}px; padding-right: ${brandPadding}px; font-family: ${
        brandFontFamily?.family
      }; letter-spacing: ${brandLetterSpacing}px; display: flex; align-items: flex-end; width: calc(115px - ${brandPadding}px * 2);`;
      title.style = `font-size: ${titleFontSize}px; padding-left: ${titlePadding}px; padding-right: ${titlePadding}px; font-family: ${titleFontFamily?.family};  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; letter-spacing: ${titleLetterSpacing}px;`;
      image.style = `width: 130px; height: 130px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: left; position: absolute; top: 35px; right: 25px;`;
      photo.style = `width: 120px; height: 120px; object-fit: contain;`;
      score.style = `font-size: ${ratingFontSize}px; display: flex; gap: ${ratingGap}px; font-family: ${ratingFontFamily?.family}; position: absolute; left: 25px; top: 125px; width: 90px;`;
      price.style = `width: 100px; height: 55px; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; text-align: left; font-size: ${priceFontSize}px; position: absolute; bottom: 0; left: 25px; font-family: ${priceFontFamily?.family}; letter-spacing: ${priceLetterSpacing}px;`;

      return {
        description,
        image,
        price,
        score: !!rating ? score : null,
        brand,
      };

    default:
      return { description, image, price, score: null, brand };
  }
}

// START
var wrapper = document.createElement("div");
wrapper.style = `width: 100%; height: 100%; position: relative; overflow: hidden;`;

// CONTAINER
var { adFormat, animationDelay } = config;
var container = document.createElement("div");
container.style = `width: -webkit-fill-available; height: -webkit-fill-available; display: flex; position: relative; line-height: 1`;

var carousel = {
  _slide: 0,
  get currentSlide() {
    return this._slide;
  },
  set currentSlide(index) {
    index = (index + totalItems) % totalItems;
    slides.forEach(function (slide, i) {
      slide.style.transition =
        i === index || i === this._slide ? "left .3s ease" : "none";
      if (i === index) slide.style.left = "0";
      else if (i === 0 && index === slides.length - 1)
        slide.style.left = `100%`;
      else if (i === slides.length - 1 && index === 0)
        slide.style.left = `-100%`;
      else if (i > index) slide.style.left = `100%`;
      else slide.style.left = `-100%`;
    });
    this._slide = index;
    window.CAROUSEL_ITEM = index;
  },
};

var slides = items.map(function (item, index) {
  var slide = document.createElement("div");
  slide.setAttribute("id", index);

  function getLeft() {
    switch (index) {
      case 0:
        return 0;
      case totalItems - 1:
        return -100;

      default:
        return 100;
    }
  }

  slide.style = `width: 100%; height: 100%; display: flex; flex-shrink: 0; position: absolute; z-index: ${
    totalItems - index
  }; left: ${getLeft()}%`;

  var { description, image, price, score, brand } = getItemLayoutByFormat(
    adFormat,
    items[index]
  );

  slide.appendChild(image);

  if (["320X50", "300X50"].includes(adFormat)) {
    var details = document.createElement("div");
    details.style = `height: 50px; display: flex; flex-direction: column; justify-content: center; position: absolute; left: 72px; gap:${config.brandPriceSpacing}px;`;

    details.appendChild(description);
    details.appendChild(price);
    slide.appendChild(details);
  } else {
    slide.appendChild(description);
    score && slide.appendChild(score);
    slide.appendChild(price);
  }

  container.appendChild(slide);

  slide.addEventListener("click", function (e) {
    e.stopPropagation();
    window.clinchSdk?.click({
      url: item.clickUrl,
      type: "Item_" + (index + 1),
    });
  });

  slide.description = description;
  slide.brand = brand;

  return slide;
});

// Append ARROWS to WRAPPER
var { arrows } = getArrowsByFormat(adFormat);
container.appendChild(arrows);

// Append CONTAINER to WRAPPER
wrapper.appendChild(container);

// ANIMATE
function infiniteAnimation(step) {
  if (!animate) return;

  switch (step) {
    case totalItems:
      carousel.currentSlide = 0;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        infiniteAnimation(0);
      }, 300);
      break;

    default:
      carousel.currentSlide = step;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        infiniteAnimation(step + 1);
      }, +animationDelay);
      break;
  }
}

window.CAROUSEL_ITEM = 0;
// wrapper.addEventListener("mouseover", () => {
//   animate = false;
// });
timeout = setTimeout(function () {
  infiniteAnimation(0);
}, +animationDelay);

// END
parent.appendChild(wrapper);

function adjustFontSizeToFit(element) {
  let style = window.getComputedStyle(element);
  let fontSize = parseFloat(style.fontSize); // Start with the current font size

  while (
    element.childNodes[0].offsetWidth > element.offsetWidth ||
    element.childNodes[0].offsetHeight > element.offsetHeight
  ) {
    fontSize--; // Decrease the font size

    element.style.fontSize = `${fontSize}px`;
  }

  return fontSize;
}

if (slides.length === items.length) {
  slides.forEach((slide) => {
    adjustFontSizeToFit(slide.brand);
  });
}



})();