// InfiniteScroll.jsx

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export default function InfiniteScroll({
  // ----- Layout / Style Props -----
  width = "30rem", // Width of the outer wrapper
  maxHeight = "100%", // Max-height of the outer wrapper
  negativeMargin = "-1.5em", // Negative margin to reduce spacing between items
  // ----- Items Prop -----
  items = [], // Array of items with { content: ... }
  itemMinHeight = 160, // Fixed height for each item
  // ----- Tilt Props -----
  isTilted = false, // Whether the container is in "skewed" perspective
  tiltDirection = "left", // tiltDirection: "left" or "right"
  // ----- Autoplay Props -----
  autoplay = false, // Whether it should automatically scroll
  autoplaySpeed = 0.5, // Speed (pixels/frame approx.)
  autoplayDirection = "down", // "down" or "up"
  pauseOnHover = false, // Pause autoplay on hover
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  const getTiltTransform = () => {
    if (!isTilted) return "none";
    return tiltDirection === "left"
      ? "rotateX(20deg) rotateZ(-20deg) skewX(20deg)"
      : "rotateX(20deg) rotateZ(20deg) skewX(-20deg)";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight =
      itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }) => {
        target.style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        target.style.cursor = "grab";
      },
      onChange: ({ deltaY, isDragging, event }) => {
        const d = event.type === "wheel" ? -deltaY : deltaY;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            y: `+=${distance}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
      },
    });

    let rafId;
    if (autoplay) {
      const directionFactor = autoplayDirection === "down" ? 1 : -1;
      const speedPerFrame = autoplaySpeed * directionFactor;

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child, {
            y: `+=${speedPerFrame}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => rafId && cancelAnimationFrame(rafId);
        const startTicker = () => (rafId = requestAnimationFrame(tick));

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          rafId && cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
    isTilted,
    tiltDirection,
    negativeMargin,
  ]);

  return (
    <div
      className="relative flex items-center justify-center w-full overflow-hidden overscroll-none border-t-dotted border-b-dotted border-transparent"
      ref={wrapperRef}
      style={{ maxHeight }}
    >
      {/* Subtle background glow effect */}
      <div className="absolute w-[40vw] h-[30vw] rounded-full opacity-30 bg-[radial-gradient(circle,_#e9d5ff,_#a855f7,_#7e22ce,_transparent)] blur-[80px] z-[-1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black via-45%  via-black/90 to-transparent z-10 pointer-events-none"></div>

      {/* Container */}
      <div
        className="flex flex-col overscroll-contain px-4 cursor-grab relative origin-center"
        ref={containerRef}
        style={{
          width,
          transform: getTiltTransform(),
          transformStyle: "preserve-3d", // Fix for white line in 3D transforms
          backfaceVisibility: "hidden", // Additional fix for rendering issues
        }}
      >
        {items.map((item, i) => (
          <div
            className="flex items-center justify-center bg-black/40 flex-col p-4 text-xl font-semibold text-center border-2 border-white/20 text-gray-200 rounded-[15px] select-none box-border relative backdrop-blur-sm"
            key={i}
            style={{
              height: `${itemMinHeight}px`,
              marginTop: negativeMargin,
              backfaceVisibility: "hidden", // Prevent rendering artifacts
              boxShadow: "0 0 15px rgba(168,85,247,0.1)",
            }}
          >
            <p className="text-slate-200/90 text-sm leading-relaxed mb-3 bg-gradient-to-r from-gray-300 via-silver to-platinum bg-clip-text">" {item.content} "</p>
            <div className="self-end text-right">
              <p className="bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text text-sm font-semibold">- {item.name.split("(")[0].trim()}</p>
              <p className="text-gray-400/90 text-xs bg-gradient-to-r from-silver via-[#c0c0c0] to-[#e5e4e2] bg-clip-text">
                {item.name.split("(")[1].split(")")[0].trim()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
