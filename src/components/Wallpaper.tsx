const Wallpaper = () => {
  return (
    <div
      className="wallpaper-container"
      style={{
        position: 'fixed',
        inset: -30, // Negative inset to allow room for panning
        zIndex: 0,
        backgroundImage: 'url(/minimal_wallpaper_4k.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.8) contrast(1.1)', // make it slightly darker so text pops
      }}
    >
      {/* Subtle noise texture via SVG filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: 'url(#noise)',
          opacity: 0.03,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};

export default Wallpaper;
