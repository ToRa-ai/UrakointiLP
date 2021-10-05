var header = document.querySelector('header');
var menuBtn = document.getElementById('menuBtn');
var menu = document.getElementById('menu');
var closeMenuBtn = document.getElementById('closeMenuBtn');
var menuLinks = document.querySelectorAll('#menu a');
var lastScrollTop = 0;

function setHash(hash) {
    // Get reference to the element
    var el = document.querySelector(hash);
    // Rename element id to prevent page jump
    el.id = hash + '-tmp';
    // Set location hash
    window.location.hash = hash;
    // Set element id back to what it was
    el.id = hash.replace('#', '');
}

// Menu button click event handler
menuBtn.onclick = function() {
    menu.classList.add('show');
    menuBtn.classList.add('hide');
};

// Close menu button click event handler
closeMenuBtn.onclick = function() {
    menu.classList.remove('show');
    menuBtn.classList.remove('hide');
};

// Window scroll event handler
window.onscroll = function() {
    // Get current scrollTop
    var currentScrollTop = document.documentElement.scrollTop;

    // Compare currentScrollTop and lastScrollTop to check scroll direction
    if (currentScrollTop > lastScrollTop && currentScrollTop > header.offsetHeight) {
        // Going down and scrolled more than header height, hide header
        header.classList.add('hide');
    } else if (currentScrollTop < lastScrollTop) {
        // Going up, show header
        header.classList.add('condensed');
        header.classList.remove('hide');
    }

    // Make header great again if scrolled back to the top
    if (currentScrollTop <= header.offsetHeight) {
        header.classList.remove('condensed');
    }

    // Update lastScrollTop
    lastScrollTop = currentScrollTop;
};

// Loop through menu links
for (var i = 0; i < menuLinks.length; i++) {
    // Add click handler to link
    menuLinks[i].onclick = function(e) {
        // Prevent link default behavior
        e.preventDefault();
        // Get element id selector from link href
        var sel = this.getAttribute('href');
        // Get the element
        var el = document.querySelector(sel);
        // Scroll to element
        el.scrollIntoView({
            behavior: 'smooth'
        });
        setHash(sel);
        // Hide menu
        menu.classList.remove('show');
        menuBtn.classList.remove('hide');
        // Hide header with a slight delay
        setTimeout(function() {
            header.classList.add('hide');
        }, 1000);
    };
}