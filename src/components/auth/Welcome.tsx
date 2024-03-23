import anime from "animejs/lib/anime.es.js";
import { useEffect } from "react";

export default function Welcome() {
  useEffect(() => {
    anime({
      targets: ".ke-1",
      keyframes: [
        { top: "60%", duration: 4000 },
        { left: "60%", duration: 4000, delay: 1000 },
        { top: "25%", left: "25%", duration: 4000, delay: 1000 },
        { top: 0, left: 0, duration: 4000, delay: 1000 },
      ],

      easing: "easeInOutQuad",
      loop: true,
    });
    anime({
      targets: ".ke-2",
      keyframes: [
        { right: "60%", duration: 4000 },

        { top: "60%", duration: 4000, delay: 1000 },
        { top: "25%", right: "25%", duration: 4000, delay: 1000 },
        { top: 0, right: 0, duration: 4000, delay: 1000 },

        // { translateX: 250 },
        // { translateY: 40 },
        // // { left: "60%" },
        // { top: "60%" },
        // { right: "100%", left: 0 },
        // { top: 0 },
        // { translateX: 0 },
        // { translateY: 0 },
      ],

      easing: "easeInOutQuad",
      loop: true,
    });
    anime({
      targets: ".ke-3",
      keyframes: [
        { bottom: "60%", duration: 4000 },

        { right: "60%", duration: 4000, delay: 1000 },
        { right: "25%", bottom: "25%", duration: 4000, delay: 1000 },
        { bottom: 0, right: 0, duration: 4000, delay: 1000 },
      ],

      easing: "easeInOutQuad",
      loop: true,
    });
    anime({
      targets: ".ke-4",
      keyframes: [
        { left: "60%", duration: 4000 },

        { bottom: "60%", duration: 4000, delay: 1000 },
        { left: "25%", bottom: "25%", duration: 4000, delay: 1000 },
        { bottom: 0, left: 0, duration: 4000, delay: 1000 },
      ],

      easing: "easeInOutQuad",
      loop: true,
    });
  }, []);
  return (
    <section className="flex-1 relative   after:bg-[#0000008F] after:backdrop-blur-3xl after:absolute after:inset-0 overflow-hidden">
      <div className="bg-[#5EACDD] left-0 top-0 absolute w-[40%] aspect-square blur-3xl ke-1" />
      <div className="bg-secondary right-0 top-0 absolute w-[40%] aspect-square blur-3xl ke-2" />
      <div className="bg-[#5EACDD] right-0 bottom-0 absolute w-[40%] aspect-square blur-3xl ke-3" />
      <div className="bg-secondary left-0 bottom-0 absolute w-[40%] aspect-square blur-3xl ke-4" />
      <div className="absolute z-30 font-extrabold text-[86px] px-14  inset-0 flex justify-center items-center text-white">
        Welcome Back!
      </div>
    </section>
  );
}
