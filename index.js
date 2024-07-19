Shery.mouseFollower();
Shery.makeMagnet('.magnet');
Shery.hoverWithMediaCircle('.hvr',{images:["https://m.media-amazon.com/images/I/519aOqUZ0pL._AC_UF894,1000_QL80_.jpg","https://st3.depositphotos.com/1005404/13980/i/450/depositphotos_139809276-stock-photo-consumer-and-home-electronics.jpg","https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg"]});

gsap.to(".fleftlm", {
    scrollTrigger: {
      trigger: "#fimages",
      pin: true,
      start: "top top",
      end: "bottom bottom",
      endTrigger: ".last",
      scrub: 1,
    },
    y: "-300%",
    ease: Power1,
})
