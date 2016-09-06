var slider = document.getElementById("slider");
var menuButton = document.getElementById("menu_button");
var imageButtons = document.getElementsByClassName("images");
var overlay = document.getElementById("overlay");
var active = "menu_active";

// Eventlisteners

menuButton.addEventListener("click", function() {
	menuButton.classList.contains(active) ? menuHide() : menuShow();
	slider.focus();
});
overlay.addEventListener("click", menuHide);
for (var i = 0; i < imageButtons.length; i++) {
	imageButtons[i].addEventListener("click", function() {
		var url = this.previousElementSibling.firstElementChild.firstElementChild.href;
		var win = window.open(url, '_blank');
  		win.focus();
	});
}

// Mobile Menu

function menuShow() {
	menuButton.classList.add(active);
	overlay.classList.add("show");
	slider.classList.add("show");
}

function menuHide() {
	menuButton.classList.remove(active);
	overlay.classList.remove("show");
	slider.classList.remove("show");
}

// Solid navbar on scroll

var didScroll;
var lastScrollTop = 0;
var wHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var dHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

document.onscroll = function(){
  	didScroll = true;
};

setInterval(function() {
 	if (didScroll) {
    	hasScrolled();
   		didScroll = false;
  	}
}, 250);

function hasScrolled() {
	var st = document.body.scrollTop;

    if (Math.abs(lastScrollTop - st) <= 5) {
		return;
	}
    if (st > lastScrollTop && st > slider.offsetHeight){
        // Scroll Down
        slider.classList.remove('down');
		slider.classList.add('up');
    } else {
        // Scroll Up
        if(st + wHeight < dHeight) {
			slider.classList.add('down');
            slider.classList.remove('up');
        }
    }
	if (st < 200) {
		slider.classList.remove('up');
		slider.classList.remove('down');
	}
    lastScrollTop = st;
}