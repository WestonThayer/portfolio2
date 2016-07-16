(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Handle making the navbar sticky on desktop
        (function() {
            var globalNavbar = document.getElementById("global-navbar");
            var isPageAlreadyScrolled = true;
            
            window.addEventListener("scroll", function(e) {
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
                }
            });
            
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
        
        // Hook up interactions to the project tiles so that we get nice states
        // across mouse and touch
        (function() {
            var projectTiles = document.getElementsByClassName("project-tile");
            
            for (var i = 0; i < projectTiles.length; i++) {
                var projectTile = projectTiles[i];
                
                projectTile.addEventListener("touchstart", function(e) {
                    this.classList.add("project-tile--active");
                });
                
                projectTile.addEventListener("touchend", function(e) {
                    this.classList.remove("project-tile--active");
                });
                
                projectTile.addEventListener("mouseover", function() {
                    this.classList.add("project-tile--hover");
                });
                
                projectTile.addEventListener("mouseleave", function() {
                    this.classList.remove("project-tile--hover");
                });
                
                projectTile.addEventListener("mousedown", function() {
                    this.classList.add("project-tile--active");
                });
                
                projectTile.addEventListener("mouseup", function() {
                    this.classList.remove("project-tile--active");
                    this.classList.remove("project-tile--hover");
                });
                
                projectTile.addEventListener("mouseout", function() {
                    this.classList.remove("project-tile--active");
                    this.classList.remove("project-tile--hover");
                });
            }
        })();
        
        // Workaround for background-image not supporting srcset
        (function() {
            var postImgs = document.getElementsByClassName("post__img");
            
            function handleResize() {
                for (var i = 0; i < postImgs.length; i++) {
                    var postImg = postImgs[i];
                    var container = postImg.parentElement;
                    
                    // Only for md and up
                    if (window.innerWidth >= 768) {
                        if (container.style.backgroundImage === "none" || container.style.backgroundImage === "") {
                            // currentSrc is supplied when srcset is supported in
                            // the browser. If it doesn't exist, the <img> is using
                            // it's real src value because that browser doesn't
                            // support srcset
                            var src = postImg.currentSrc ? postImg.currentSrc : postImg.attributes["src"].nodeValue;
                            
                            container.style.backgroundImage = "url(" + src + ")";
                            postImg.style.opacity = "0";
                        }
                    }
                    else {
                        container.style.backgroundImage = "none";
                        postImg.style.opacity = "1";
                    }
                }
            }
            
            window.addEventListener("resize", handleResize);
            handleResize();
        })();
        
        // Manage the focal point of the feature image on the /about/ page
        (function() {
            var features = document.getElementsByClassName("about__feature-h1-row");
            
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
    });
})()
