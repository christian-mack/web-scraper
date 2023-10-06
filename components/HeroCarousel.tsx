"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/public/hero-1.svg", alt: "smartwatch" },
  { imgUrl: "/public/hero-2.svg", alt: "bag" },
  { imgUrl: "/public/hero-3.svg", alt: "lamp" },
  { imgUrl: "/public/hero-4.svg", alt: "air fryer" },
  { imgUrl: "/public/hero-5.svg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image, index) => (
          <Image
            key={index}
            src={image.imgUrl}
            alt={image.alt}
            width={484}
            height={484}
            className="object-contain"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
