(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Handle making the navbar sticky on desktop, smoking on /writing/
        (function() {
            var globalNavbar = document.getElementById("global-navbar");
            var isPageAlreadyScrolled = true;
            
            // We also handle smoking the bg of writing here, since it must be in
            // sync with the navbar
            var globalWritingSmoke = document.getElementById("global-writing-smoke");
            
            // if (globalWritingSmoke) {
            //     globalWritingSmoke.style.height = document.body.scrollHeight + "px";
            // }
            
            function handleChange() {
                if (window.innerWidth >= 768) {
                    // NOTE: This number must match $_vertDist in _styles/partials/_navbar.scss
                    var vertDist = 22;
                    
                    // Here's an explanation of what's happening in here in plain
                    // english since this is complex. There are a few possible flows:
                    //
                    // 1. User starts at the top of the page. No extra classes are supplied, navbar is in its vanilla state
                    // 2. User scrolls down past the threshold. We start the .navbar--compact--animation
                    // 3. When the animation completes, we add the .navbar--compact class. This uses `top` instead of `transform3d`, which results in clear text rendering for Chrome
                    // 4. User scrolls back up above threshold. We remove .navbar--compact and start the .navbar--expanded-animation
                    // 5. When that animation finishes, we simply remove it and go back to vanilla navbar
                    //
                    // 1. User starts in the middle of the page. We add .navbar--compact
                    if (window.pageYOffset > vertDist) {
                        if (!globalNavbar.classList.contains("navbar--compact") &&
                            !globalNavbar.classList.contains("navbar--compact-animation")) {
                            globalNavbar.classList.remove("navbar--expanded-animation");
                            
                            if (isPageAlreadyScrolled) {
                                globalNavbar.classList.add("navbar--compact");
                            }
                            else {
                                globalNavbar.classList.add("navbar--compact-animation");
                            }
                            
                            if (globalWritingSmoke) {
                                globalWritingSmoke.classList.add("writing__smoke--smoked");
                            }
                        }
                    }
                    else {
                        isPageAlreadyScrolled = false;
                        
                        if (globalNavbar.classList.contains("navbar--compact") ||
                            globalNavbar.classList.contains("navbar--compact-animation")) {
                            globalNavbar.classList.remove("navbar--compact");
                            globalNavbar.classList.remove("navbar--compact-animation");
                            globalNavbar.classList.add("navbar--expanded-animation");
                        }
                        
                        if (globalWritingSmoke) {
                            globalWritingSmoke.classList.remove("writing__smoke--smoked");
                        }
                    }
                }
                else {
                    if (globalWritingSmoke) {
                        // Have to set it here instead of with media queries because Edge will
                        // transition on first load for any MQ
                        globalWritingSmoke.classList.add("writing__smoke--smoked");
                    }
                }
            }
            
            window.addEventListener("scroll", handleChange);
            window.addEventListener("resize", handleChange);
            handleChange();
            
            globalNavbar.addEventListener("animationend", function(e) {
                if (e.animationName === "navbar--compact-keyframes") {
                    globalNavbar.classList.remove("navbar--compact-animation");
                    globalNavbar.classList.add("navbar--compact");
                }
                else if (e.animationName === "navbar--expanded-keyframes") {
                    globalNavbar.classList.remove("navbar--expanded-animation");
                }
            });
        })();
        
        // Hook up interactions to tiles so that we get nice states across mouse
        // and touch
        (function() {
            var tiles = document.getElementsByClassName("tile");
            
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                
                tile.addEventListener("touchstart", function(e) {
                    this.classList.add("tile--active");
                });
                
                tile.addEventListener("touchend", function(e) {
                    this.classList.remove("tile--active");
                });
                
                tile.addEventListener("mouseover", function() {
                    this.classList.add("tile--hover");
                });
                
                tile.addEventListener("mouseleave", function() {
                    this.classList.remove("tile--hover");
                });
                
                tile.addEventListener("mousedown", function() {
                    this.classList.add("tile--active");
                });
                
                tile.addEventListener("mouseup", function() {
                    this.classList.remove("tile--active");
                    this.classList.remove("tile--hover");
                });
                
                tile.addEventListener("mouseout", function() {
                    this.classList.remove("tile--active");
                    this.classList.remove("tile--hover");
                });
            }
        })();
        
        // Manage the focal point of the feature image on the /about/ page
        (function() {
            var features = document.getElementsByClassName("about__feature-h1-row-bg");
            
            function handleResize() {
                for (var i = 0; i < features.length; i++) {
                    var feature = features[i];
                    
                    // Only for below md
                    if (window.innerWidth < 768) {
                        // Linear interpolation to put the focal point in a good spot
                        // https://en.wikipedia.org/wiki/Linear_interpolation
                        feature.style.backgroundSize = (330 + ((100 - 330) * ((window.innerWidth - 320) / (768 - 320)))) + "% auto";
                    }
                }
            }
            
            window.addEventListener("resize", handleResize);
            handleResize();
        })();
        
        // Manage fading in the background image on the /about/ page
        (function() {
            var feature = document.getElementById("about__featurebg");
            
            if (feature) {
                var bgImg = new Image();
                bgImg.onload = function() {
                    feature.classList.add("about__feature--loaded");
                };
                
                bgImg.src = "/assets/about/selfr.jpg";
            }
        })();
    });
})()
