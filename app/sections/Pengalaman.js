import React, { useState, useEffect } from "react";

export default function Pengalaman({ styles, currentTheme }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  const sectionHeaderStyle = {
    color: currentTheme.primary,
    borderBottom: `2px solid ${currentTheme.primary}`,
    paddingBottom: "10px",
    marginBottom: "25px",
    fontWeight: "600",
    transform: isVisible ? "translateY(0)" : "translateY(-20px)",
    opacity: isVisible ? 1 : 0,
    transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
  };

  const experienceCardStyle = (delay) => ({
    marginBottom: "30px",
    padding: "15px",
    borderLeft: `3px solid ${currentTheme.primary}`,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: "4px",
    transform: isVisible ? "translateX(0)" : "translateX(-30px)",
    opacity: isVisible ? 1 : 0,
    transition: `transform 0.6s ease-out ${delay}s, opacity 0.6s ease-out ${delay}s`,
    boxShadow: isVisible ? "0 4px 10px rgba(0, 0, 0, 0.05)" : "none",
  });

  const experienceTitleStyle = {
    marginBottom: "15px",
    color: currentTheme.secondary || "#333",
    fontWeight: "500",
  };

  const bulletPointStyle = (index) => ({
    marginBottom: "15px",
    lineHeight: "1.6",
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    opacity: isVisible ? 1 : 0,
    transition: `transform 0.5s ease-out ${0.6 + (index * 0.1)}s, opacity 0.5s ease-out ${0.6 + (index * 0.1)}s`,
  });

  return (
    <div style={styles.section}>
      <h2 style={sectionHeaderStyle}>Pengalaman Organisasi</h2>
      
      <div style={experienceCardStyle(0.2)}>
        <h3 style={experienceTitleStyle}>Anggota OSIS | SMAN CIMANGGUNG</h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li style={bulletPointStyle(0)}>
            <b>Sekretaris Acara 17 Agustus:</b> Bertanggung jawab dalam menyusun
            dan mendokumentasikan seluruh agenda acara peringatan Hari
            Kemerdekaan Indonesia. Mengkoordinasikan jadwal, menulis notulen
            rapat, serta memastikan semua kebutuhan administrasi acara
            terlaksana dengan baik. Berperan aktif dalam mengorganisir tim dan
            memastikan kelancaran jalannya acara.
          </li>
          <li style={bulletPointStyle(1)}>
            <b>Pengelola Media Sosial OSIS:</b> Mengelola dan memperbarui akun
            media sosial OSIS untuk mempromosikan kegiatan sekolah, acara, dan
            informasi penting lainnya. Membuat konten visual dan tulisan yang
            menarik, serta berinteraksi dengan audiens untuk meningkatkan
            partisipasi siswa dalam berbagai kegiatan.
          </li>
          <li style={bulletPointStyle(2)}>
            <b>Dokumentasi Kegiatan Sekolah:</b> Bertanggung jawab dalam
            mendokumentasikan berbagai kegiatan sekolah, termasuk acara-acara
            besar dan pertemuan rutin. Menyusun laporan kegiatan, serta mengatur
            foto dan video yang relevan untuk kebutuhan publikasi di media
            sosial dan laporan tahunan OSIS.
          </li>
        </ul>
      </div>

      <h2 
        style={{
          ...sectionHeaderStyle,
          transition: "transform 0.5s ease-out 0.5s, opacity 0.5s ease-out 0.5s"
        }}
      >
        Pengalaman Ekstrakulikuler
      </h2>
      
      <div style={experienceCardStyle(0.7)}>
        <h3 style={experienceTitleStyle}>Anggota Pramuka | SMAN CIMANGGUNG</h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li style={bulletPointStyle(3)}>
            <b>Pengaturan Agenda Perkumpulan:</b> Bertanggung jawab untuk
            menyusun dan mengatur agenda kegiatan setiap pertemuan pramuka,
            mulai dari perencanaan kegiatan, penentuan materi, hingga
            penjadwalan acara. Memastikan setiap pertemuan berjalan sesuai
            rencana dan memberikan dampak positif bagi para anggota.
          </li>
          <li style={bulletPointStyle(4)}>
            <b>Koordinasi dengan Pembina:</b> Bekerja sama dengan pembina
            pramuka untuk menentukan tema dan tujuan setiap kegiatan, serta
            memastikan persiapan logistik dan kebutuhan lainnya tersedia dengan
            baik.
          </li>
          <li style={bulletPointStyle(5)}>
            <b>Evaluasi dan Pelaporan:</b> Melakukan evaluasi terhadap setiap
            kegiatan yang telah dilaksanakan, serta menyusun laporan hasil
            kegiatan yang kemudian disampaikan kepada pembina dan anggota
            pramuka.
          </li>
        </ul>
      </div>
    </div>
  );
}