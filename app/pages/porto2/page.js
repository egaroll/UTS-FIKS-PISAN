"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Porto1Page() {

  const [isLoading, setIsLoading] = useState(true);

  // Set loading to false after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const projectDetails = {
    title: "NEO ZONE - NCT MERCH",
    fullDescription: `
     NEO ZONE adalah destinasi utama bagi para penggemar NCT untuk mendapatkan koleksi merchandise eksklusif dan resmi. 
      Sebagai bagian dari dunia NCT, NEO ZONE menawarkan berbagai produk dengan desain yang unik dan keren, yang mencerminkan 
      semangat serta identitas grup NCT. Didedikasikan untuk NCTzen, toko ini menyediakan berbagai produk yang memungkinkan para
      penggemar untuk mengekspresikan kecintaan mereka terhadap grup K-pop favorit mereka.
      Di NEO ZONE, penggemar dapat menemukan berbagai macam produk resmi yang mencakup pakaian seperti kaos, hoodie, hingga jaket, 
      serta aksesori keren seperti topi, tas, gelang, dan pin. Setiap item dirancang dengan penuh perhatian terhadap detail, dengan
      sentuhan desain yang memperlihatkan semangat dan karakter dari setiap anggota NCT.
      Produk-produk di NEO ZONE diproduksi dengan kualitas terbaik, memberikan pengalaman berbelanja yang memuaskan dan autentik 
      bagi setiap NCTzen. Dari desain yang trendy hingga kualitas bahan yang nyaman, setiap barang di NEO ZONE diciptakan untuk 
      memberikan kebanggaan kepada penggemar dalam mendukung NCT, baik saat konser, di kehidupan sehari-hari, atau saat bertemu 
      sesama penggemar.
      NEO ZONE bukan sekadar toko merchandise, melainkan tempat di mana penggemar dapat merayakan kecintaan mereka terhadap NCT 
      dengan produk-produk yang eksklusif, penuh makna, dan memiliki nilai sentimental yang tak ternilai bagi para penggemar 
      sejati.`,
    images: ["/P2-1.jpg", "/P2-2.jpg", "/P2-3.jpg"],
  };


  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.6,
      },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.9,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isLoading ? "hidden" : "visible"}
      exit="exit"
      variants={pageVariants}
      style={{
        background:
          "linear-gradient(135deg,rgb(197, 255, 200), rgb(127, 201, 151), rgb(67, 141, 91))", // Hardcoded background style
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
    

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{
          color: "white",
          borderBottom: "2px solid white",
          paddingBottom: "15px",
          marginBottom: "30px",
          textAlign: "center",
          fontWeight: 1000,
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          fontSize: "2.8rem",
        }}
      >
        {projectDetails.title}
      </motion.h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {projectDetails.images.map((img, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={imageVariants}
            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={img}
              alt={`KQ ENT Project ${index + 1}`}
              width={370}
              height={200}
              style={{
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 12px 20px rgba(0,0,0,0.25)",
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={contentVariants}
        style={{
          backgroundColor: "rgb(195, 246, 187)",
          padding: "35px",
          borderRadius: "18px",
          color: "#2c3e50",
          maxWidth: "1150px",
          margin: "0 auto",
          boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
          lineHeight: "1.8",
        }}
      >
        <p
          style={{
            whiteSpace: "pre-line",
            fontWeight: 500,
            fontSize: "1.05rem",
          }}
        >
          {projectDetails.fullDescription}
        </p>
      </motion.div>
    </motion.div>
  );
}
