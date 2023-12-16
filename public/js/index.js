// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the element with the id "scroll-spy"
    var scrollspy = document.getElementById("scroll-spy");
  
    // Check if the "scroll-spy" element exists
    if (scrollspy) {
      // Disable scrolling on the body element
      document.body.style.setProperty("overflow", "hidden");
  
      // Function to set overflow: hidden on the body
      function disableBodyScroll() {
        var body = document.getElementsByTagName("body")[0];
        body.setAttribute("overflow", "hidden");
      }
      (function a() {
        "use strict";
        // Call the function to disable body scrolling
        disableBodyScroll();
        // Get the total number of ".wrapper" elements
        var pnls = document.querySelectorAll(".wrapper").length,
          // Variables to track scroll direction and whether to hold scrolling
          scdir,
          hold = false;
  
        // Function to handle vertical scrolling
        function _scrollY(obj) {
          var slength,
            plength,
            pan,
            step = 100,
            vh = window.innerHeight / 100,
            vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
  
          // Check if the object is defined and has an id
          if (
            (this !== undefined && this.id === "owrapper") ||
            (obj !== undefined && obj.id === "owrapper")
          ) {
            pan = this || obj;
            plength = parseInt(pan.offsetHeight / vh);
          }
          if (pan === undefined) {
            return;
          }
          plength = plength || parseInt(pan.offsetHeight / vmin);
          slength = parseInt(pan.style.transform.replace("translateY(", ""));
          if (scdir === "up" && Math.abs(slength) < plength - plength / pnls) {
            slength = slength - step;
          } else if (scdir === "down" && slength < 0) {
            slength = slength + step;
          } else if (scdir === "top") {
            slength = 0;
          }
          if (hold === false) {
            hold = true;
            pan.style.transform = "translateY(" + slength + "vh)";
            setTimeout(function () {
              hold = false;
            }, 1000);
          }
  
          // Update URL based on the currently visible section
          var sections = document.querySelectorAll(".wrapper");
          var currentSection = null;
  
          sections.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
              currentSection = section.id;
            }
          });
        }
        function _swipe(obj) {
          var swdir,
            sX,
            sY,
            dX,
            dY,
            threshold = 100,
            /*[min distance traveled to be considered swipe]*/
            slack = 50,
            /*[max distance allowed at the same time in perpendicular direction]*/
            alT = 500,
            /*[max time allowed to travel that distance]*/
            elT /*[elapsed time]*/,
            stT; /*[start time]*/
          obj.addEventListener(
            "touchstart",
            function (e) {
              var tchs = e.changedTouches[0];
              swdir = "none";
              sX = tchs.pageX;
              sY = tchs.pageY;
              stT = new Date().getTime();
            },
            false
          );
  
          obj.addEventListener(
            "touchmove",
            function (e) {
              e.preventDefault();
            },
            false
          );
  
          obj.addEventListener(
            "touchend",
            function (e) {
              var tchs = e.changedTouches[0];
              dX = tchs.pageX - sX;
              dY = tchs.pageY - sY;
              elT = new Date().getTime() - stT;
              if (elT <= alT) {
                if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
                  swdir = dX < 0 ? "left" : "right";
                } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
                  swdir = dY < 0 ? "up" : "down";
                }
                if (obj.id === "owrapper") {
                  if (swdir === "up") {
                    scdir = swdir;
                    _scrollY(obj);
                  } else if (
                    swdir === "down" &&
                    obj.style.transform !== "translateY(0)"
                  ) {
                    scdir = swdir;
                    _scrollY(obj);
                  }
                  e.stopPropagation();
                }
              }
            },
            false
          );
        }
  
        var owrapper = document.getElementById("owrapper");
        owrapper.style.transform = "translateY(0)";
        owrapper.addEventListener("wheel", function (e) {
          if (e.deltaY < 0) {
            scdir = "down";
          }
          if (e.deltaY > 0) {
            scdir = "up";
          }
          e.stopPropagation();
        });
        owrapper.addEventListener("wheel", _scrollY);
        _swipe(owrapper);
      })();
    }
    document.body.classList.remove("no-scroll");
  });
  
  window.addEventListener("load", function () {
    const delay = 100;
    setTimeout(function () {
      // Access the elements after the specified delay
      const column1 = document.querySelector(".column-1");
      const column2 = document.querySelector(".column-2");
      const column3 = document.querySelector(".column-3");
      const column4 = document.querySelector(".column-4");
      const column5 = document.querySelector(".column-5");
      const column6 = document.querySelector(".column-6");
  
      // Now you can work with column1
      if (column1 && column2 && column3 && column4 && column5 &&column6) {
        column1.classList.add("top-160");
        column6.classList.add("top-160");
        column2.classList.add("top-240");
        column5.classList.add("top-240");
        column3.classList.add("top-400");
        column4.classList.add("top-400");
      }
      animatepins()
      setInterval(animatepins, 6100);
      
    }, delay);
  });
  
  //  Unauthorized Slideshow Animation
  
  function animatepins() {
    const elements = document.querySelectorAll(".fade-up");
  
    const startTime = performance.now();
  
  
    elements.forEach((element, index) => {
      if (element) {
        setTimeout(() => {
          element.classList.add("show"); // Fade in
        }, index * 100); // Adjust the delay (2 seconds in this example)
  
        setTimeout(() => {
          element.classList.remove("show"); // Fade out
        }, (index + 1) * 200 + 3100); // Adjust the delay (2 seconds + 1.5 seconds in this example)
      }
    });
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    console.log(timeTaken)
  
  
  
  }
  
  