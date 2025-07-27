import Image from "next/image";

const LogoTicker = ({ 
  logos = [], 
  speed = 20, 
  gap = 60, 
  height = 120,
  pauseOnHover = true 
}) => {
  
  const defaultLogos = [
    {
      id: 1,
      src: "https://framerusercontent.com/images/wkkTLknws3f9UU6EHLlTuPTAWTA.png",
      alt: "Company 1"
    },
    {
      id: 2,
      src: "https://framerusercontent.com/images/vdDDh6N0IVEpe7DhExLFW95Z9o.png",
      alt: "Company 2"
    },
    {
      id: 3,
      src: "https://framerusercontent.com/images/k0rTaGjtPgrYgWuyCd76J8FvigU.png",
      alt: "Company 3"
    },
    {
      id: 4,
      src: "https://framerusercontent.com/images/rIBZT0b3sUi4s9Mm8pKx2AU0TuA.png",
      alt: "Company 4"
    },
    {
      id: 5,
      src: "https://framerusercontent.com/images/aagQfnkZKKF8AcTW40iU12k8.png",
      alt: "Company 5"
    }
  ];

  const displayLogos = logos.length > 0 ? logos : defaultLogos;

  const duplicatedLogos = [...displayLogos, ...displayLogos, ...displayLogos];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    height: `${height}px`,
    alignItems: 'center',
    margin: 0,
    padding: '10px',
    overflow: 'hidden',
    maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)',
    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)'
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    gap: `${gap}px`,
    flexDirection: 'row',
    animation: `scroll ${speed}s linear infinite`,
    ...(pauseOnHover && {
      animationPlayState: 'running'
    })
  };

  const logoItemStyle: React.CSSProperties = {
    flexShrink: 0,
    height: `${height - 20}px`,
    width: 'auto',
    minWidth: '120px'
  };

  const logoImageStyle: React.CSSProperties = {
    display: 'block',
    width: '100',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    filter: 'grayscale(100%)',
    transition: 'filter 0.3s ease',
    opacity: 0.7
  };

  return (
   <div className="absolute bottom-0 left-0 w-full z-20">
     <div className="logo-ticker-container  max-w-[1000px] mx-auto">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        
        .logo-ticker-container:hover .logo-list {
          ${pauseOnHover ? 'animation-play-state: paused;' : ''}
        }
        
        .logo-item img:hover {
          filter: grayscale(0%);
          opacity: 1;
        }
      `}</style>
      
      <div style={containerStyle}>
        <ul 
          className="logo-list"
          style={listStyle}
        >
          {duplicatedLogos.map((logo, index) => (
            <li key={`${logo.id}-${index}`} className="logo-item">
              <div style={logoItemStyle} >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={200}
                  style={logoImageStyle}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
   </div>
  );
};


export default LogoTicker;