let removeProductAnimation = [
  {
    opacity: 1,
    transform: "scale(1) translate(0, 0)",
  },
  {
    opacity: 0.8,
    transform: "scale(0.8) translate(0, 0)",
  },
  {
    opacity: 0.6,
    transform: "scale(0.8) translate(0, 30px)",
  },
  {
    opacity: 0.4,
    transform: "scale(0.8) translate(0px, 80px)",
  },
  {
    opacity: 0.2,
    transform: "scale(0.8) translate(-60px, 80px)",
  },
  {
    opacity: 0,
    transform: "scale(0.8) translate(-120px, 80px)",
  },
];


let removeProductAnimationOptions = {
  duration: 1000,
};


let addFavouriteAnimation = [
  {
    filter: "brightness(1)",
  },
  {
    filter: "brightness(1.2)",
  },
  {
    filter: "brightness(1)",
  },
];

let addFavouriteAnimationOptions = {
  duration: 600
};


let removeFavouriteAnimation = [
  { transform: "translateX(0)" },
  { transform: "translateX(-8px)" },
  { transform: "translateX(8px)" },
  { transform: "translateX(-5px)" },
  { transform: "translateX(5px)" },
  { transform: "translateX(0)" }
];

let removeFavouriteAnimationOptions = {
  duration: 800,
};


let clearFavouriteAnimation = [
  { transform: "translateX(0)", opacity: 1 },
  { transform: "translateX(-60px)", opacity: 0 }
];

let clearFavouriteAnimationOptions = {
  duration: 500
};