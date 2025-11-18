(function() {
  var script = document.currentScript;
  var config = JSON.parse(script.getAttribute('data-args'));
  var parent = script.parentElement;


var ctaButton = document.createElement("div");
var arrow = document.createElement("div");
var text = document.createElement("div");
var {
  bgColor,
  fontSize,
  color,
  fontFamily,
  showArrow,
  ctaText,
  arrowSize,
  arrowColor,
  gap,
  textTopMargin,
  arrowTopMargin,
} = config;

ctaButton.style = `width: 100%; height: 100%; background: ${bgColor}; display: flex; justify-content: center; align-items: center; font-size: ${fontSize}px; color: ${color}; font-family: ${fontFamily?.family}; gap: ${gap}px`;
arrow.style = `margin-top: ${arrowTopMargin}px`;
text.innerHTML = ctaText;
text.style = `margin-top: ${textTopMargin}px`;
arrow.innerHTML = `<svg fill=${arrowColor} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="${arrowSize}px" height="${arrowSize}px" viewBox="0 0 96.155 96.155"
	 xml:space="preserve">
<g>
	<path d="M20.972,95.594l57.605-45.951c0.951-0.76,0.951-2.367,0-3.127L20.968,0.56c-0.689-0.547-1.716-0.709-2.61-0.414
		c-0.186,0.061-0.33,0.129-0.436,0.186c-0.65,0.35-1.056,1.025-1.056,1.764v91.967c0,0.736,0.405,1.414,1.056,1.762
		c0.109,0.06,0.253,0.127,0.426,0.185C19.251,96.305,20.281,96.144,20.972,95.594z"/>
</g>
</svg>`;
ctaButton.appendChild(text);

if (showArrow === "true") {
  ctaButton.appendChild(arrow);
}

ctaButton.addEventListener("click", function (e) {
  e.stopPropagation();
  window.clinchSdk?.click({
    url: items[window.CAROUSEL_ITEM].clickUrl,
    type: "Item_" + (window.CAROUSEL_ITEM + 1),
  });
});

parent.appendChild(ctaButton);



})();