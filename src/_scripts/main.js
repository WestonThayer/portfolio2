(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var globalNavbar = document.getElementById("global-navbar");
        
        window.addEventListener("scroll", function(e) {
            if (window.pageYOffset > 22) { // NOTE: This number must match the offset in _styles/partials/_navbar.scss
                globalNavbar.classList.add("navbar--compact");
            }
            else {
                globalNavbar.classList.remove("navbar--compact");
            }
        })
    });
})()
