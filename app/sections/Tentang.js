import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Tentang({ styles, currentTheme }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true);
    
    // Spotify embed setup
    const spotifyScript = document.createElement("script");
    spotifyScript.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
    spotifyScript.async = true;
    
    spotifyScript.onload = () => {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const element = document.getElementById('spotify-embed');
        const options = {
          uri: 'https://open.spotify.com/playlist/49M1Yo25vTklkCsTyjzVkO?si=6QqRrRpXTcSdMTS46Jnpsg', // Replace with your song URI
          width: '100%',
          height: 80,
          theme: 'dark'
        };
        
        // Create the player
        const callback = (EmbedController) => {
          // Set up event listeners for the player
          EmbedController.addListener('ready', () => {
            // Auto play when ready
            EmbedController.play();
            setIsPlaying(true);
          });
        };
        
        IFrameAPI.createController(element, options, callback);
      };
    };
    
    document.body.appendChild(spotifyScript);
    
    // Clean up
    return () => {
      if (document.body.contains(spotifyScript)) {
        document.body.removeChild(spotifyScript);
      }
      window.onSpotifyIframeApiReady = null;
    };
  }, []);

  // Toggle play/pause function
  const togglePlay = () => {
    const spotifyFrame = document.querySelector('iframe[src*="spotify"]');
    if (spotifyFrame) {
      // Send message to iframe
      spotifyFrame.contentWindow.postMessage(
        { command: isPlaying ? 'pause' : 'play' },
        'https://open.spotify.com'
      );
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={styles.section}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            overflow: "hidden",
            border: `4px solid ${currentTheme.primary}`,
            transform: isLoaded
              ? "scale(1) rotate(0deg)"
              : "scale(0.5) rotate(-10deg)",
            opacity: isLoaded ? 1 : 0,
            transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Image
            src="/foto.jpg"
            alt="Profile"
            layout="fill"
            objectFit="cover"
            priority
            onLoadingComplete={() => setIsLoaded(true)}
          />
        </div>
        
        <div
          style={{
            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            opacity: isLoaded ? 1 : 0,
            transition:
              "transform 0.6s ease-out 0.3s, opacity 0.6s ease-out 0.3s",
          }}
        >
          <h1 style={{ marginBottom: "8px" }}>Helga Puspa C.A</h1>
          <p
            style={{
              fontSize: "18px",
              color: currentTheme.secondary || "#666",
              fontWeight: "500",
            }}
          >
            Mahasiswa Universitas Ma`soem
          </p>
          <div style={{
            display: "flex", 
            alignItems: "center", 
            marginTop: "10px",
            gap: "10px"
          }}>
            <button 
              onClick={togglePlay}
              style={{
                background: currentTheme.primary,
                color: "#fff",
                border: "none",
                borderRadius: "20px",
                padding: "5px 15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "14px",
                transition: "all 0.3s ease"
              }}
            >
              {isPlaying ? "Pause Music" : "Play Music"}
            </button>
            <span style={{fontSize: "14px", color: currentTheme.secondary}}>
              {isPlaying ? "Now Playing" : "Music Paused"}
            </span>
          </div>
        </div>
      </div>

      <h2
        style={{
          color: currentTheme.primary,
          borderBottom: `2px solid ${currentTheme.primary}`,
          paddingBottom: "10px",
          marginBottom: "20px",
          transform: isLoaded ? "translateX(0)" : "translateX(-20px)",
          opacity: isLoaded ? 1 : 0,
          transition:
            "transform 0.6s ease-out 0.5s, opacity 0.6s ease-out 0.5s",
        }}
      >
        Tentang Saya
      </h2>

      <p
        style={{
          lineHeight: "1.6",
          fontSize: "16px",
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          opacity: isLoaded ? 1 : 0,
          transition:
            "transform 0.6s ease-out 0.7s, opacity 0.6s ease-out 0.7s",
        }}
      >
        Saya adalah mahasiswa semester 4 jurusan Sistem Informasi yang memiliki
        minat besar dalam pengembangan teknologi dan solusi berbasis sistem
        informasi. Saat ini, saya tengah memperdalam pemahaman tentang analisis
        dan desain sistem, pemrograman, serta manajemen proyek TI. Selain itu,
        saya juga aktif mengikuti berbagai kegiatan organisasi kampus untuk
        mengasah keterampilan komunikasi dan kepemimpinan. Dengan semangat untuk
        terus belajar dan beradaptasi dengan perkembangan teknologi, saya
        berharap dapat berkontribusi dalam menciptakan sistem yang inovatif dan
        bermanfaat di masa depan.
      </p>
      
      {/* Spotify Player */}
      <div 
        id="spotify-embed"
        style={{
          marginTop: "30px",
          transform: isLoaded ? "translateY(0)" : "translateY(20px)",
          opacity: isLoaded ? 1 : 0,
          transition: "transform 0.6s ease-out 0.9s, opacity 0.6s ease-out 0.9s",
        }}
      ></div>
    </div>
  );
}