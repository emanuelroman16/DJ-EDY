import React, { useState, useEffect, useContext } from "react";
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music2,
  Lightbulb,
  Sparkles,
  Mic2,
  Camera,
  Video,
  Phone as PhoneIcon,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Star,
  Check,
  MapPin,
  ArrowLeft,
  Package,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Heart,
  Calendar,
  Users,
  User,
  PartyPopper,
} from "lucide-react";

/* =========================
   CONFIGURACIÓN / CONSTANTES
   ========================= */

const WHATSAPP_NUMBER = "17873568786";
const CONTACT_EMAIL = "djedypr@gmail.com";

const PRIMARY_LOGO = "/4toDisenoLogo.png";
const FALLBACK_LOGO = "/WhitelogoDjEdyNew.png";

const HERO_VIDEO = "/hero-video.mp4";
const HERO_FALLBACK_IMAGE = "/hero-fallback.jpg";

const glass = "backdrop-blur-md bg-white/5 border border-white/10";
const sectionPad = "py-20 md:py-28";
const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";





/* ==============
   HELPERS / UI
   ============== */

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash || "#home");
  useEffect(() => {
    const handler = () => setHash(window.location.hash || "#home");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`${sectionPad} ${className}`}>
      <div className={container}>{children}</div>
    </section>
  );
}

/* Helper Component */
/* ======
   NAVBAR
   ====== */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Inicio", href: "#home" },
    { label: "Servicios", href: "#section-montajes" },
    { label: "Paquetes", href: "#paquetes" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className={container}>
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#home" className="flex items-center">
              <img
                src={PRIMARY_LOGO}
                alt="DJ EDY"
                className="h-14 md:h-18 w-auto"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_LOGO;
                }}
              />
            </a>

            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(link.href.replace('#', ''));
                    if (el) {
                      smoothScrollTo(link.href);
                    } else {
                      window.location.hash = link.href;
                    }
                  }}
                  className="text-sm text-zinc-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {links.map((link) => (
                
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-zinc-300 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const GroupExpandedContext = React.createContext(false);

// Función de scroll suave
const smoothScrollTo = (id) => {
  const element = document.getElementById(id.replace('#', ''));
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};


/* =====
   HERO
   ===== */
function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {!videoError ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
            {!videoLoaded && (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_FALLBACK_IMAGE})` }}
              />
            )}
          </>
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_FALLBACK_IMAGE})` }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className={`${container} relative z-10 text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Tu evento perfecto
            <br />
            empieza aquí
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            Paquetes completos para bodas, proms, cumpleaños y más. DJ + sonido + iluminación + efectos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => smoothScrollTo('#servicios-selector')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full text-base font-semibold hover:bg-zinc-200 transition-all shadow-2xl"
            >
              Explorar servicios
            </button>
            <a
              href="#paquetes"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/40 hover:border-white hover:bg-white hover:text-black text-white rounded-full text-base font-semibold transition-all"
            >
              Paquetes para tu evento
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



/* ===========================
   CARRUSEL + LIGHTBOX COMPONENT
   =========================== */

function ImageCarousel({ images, alt }) {
  // Validación segura
  if (!images || images.length === 0) {
    return <div className="h-48 bg-zinc-900 rounded-xl" />;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextImage();
    if (distance < -minSwipeDistance) prevImage();
  };


  return (
    <>
      <div 
        className="relative h-48 overflow-hidden cursor-pointer group"
        onClick={openLightbox}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${alt} - ${currentIndex + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-6 h-6" />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronRight className="w-8 h-8 rotate-180" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}




/* ============
   TESTIMONIALS
   ============ */
function Testimonials() {
  const testimonials = [
    {
      name: "Alondra Maria Peluyera",
      event: "Boda",
      text: "Compromiso, profesionalismo y un talento excepcional. Todos gozamos en cantidad, te brinda un servicio muy especializado. Recomendado 100% como DJ.",
      rating: 5,
    },
    {
      name: "Yaritza Cruz Hernandez",
      event: "Quinceañero",
      text: "Demasiados de complacidos y agradecidos. Desde el inicio el DJ súper amable, atento y responsable. El día de la boda súper puntual, y el servicio hermoso y de muy alta calidad.",
      rating: 5,
    },
    {
      name: "Hector Christian",
      event: "Prom",
      text: "Quiero agradecerte por tu entendimiento y compromiso. Te esmeraste en servirnos. Los graduados lo disfrutaron al máximo. Tu trato, profesionalismo y empatía fueron A+.",
      rating: 5,
    },
  ];

  return (
    <Section className="bg-black">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Clientes satisfechos
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className={`p-6 rounded-2xl ${glass}`}
          >
            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-zinc-300 mb-4 leading-relaxed">"{t.text}"</p>
            <div>
              <p className="text-white font-medium">{t.name}</p>
              <p className="text-sm text-zinc-500">{t.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}


/* ========
   CONTACTO - REDISEÑADO CON BOTONES GRANDES
   ======== */
function Contact() {
  return (
    <Section id="contacto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Hablemos de tu evento
        </h2>
        <p className="text-lg text-zinc-400">
          Elige tu forma favorita de contactarnos
        </p>
      </div>

      {/* BOTONES PRINCIPALES - WhatsApp y Llamar */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 hover:border-green-500/50 transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-1">WhatsApp</h3>
              <p className="text-green-400 font-medium">(787) 356-8786</p>
              <p className="text-sm text-zinc-400 mt-2">Respuesta inmediata</p>
            </div>
          </div>
        </a>

        <a
          href={`tel:+1${WHATSAPP_NUMBER}`}
          className="group relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 hover:border-blue-500/50 transition-all hover:scale-105"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-1">Llamar</h3>
              <p className="text-blue-400 font-medium">(787) 356-8786</p>
              <p className="text-sm text-zinc-400 mt-2">Habla directo con nosotros</p>
            </div>
          </div>
        </a>
      </div>

      {/* REDES SOCIALES Y EMAIL */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <a
          href="https://instagram.com/dj_edy3"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-6 rounded-2xl ${glass} hover:bg-white/10 transition-all hover:scale-105 group`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white">Instagram</h4>
              <p className="text-sm text-zinc-400 mt-1">@dj_edy3</p>
            </div>
          </div>
        </a>

        <a
          href="https://www.facebook.com/share/1CCCxKhjC8/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-6 rounded-2xl ${glass} hover:bg-white/10 transition-all hover:scale-105 group`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white">Facebook</h4>
              <p className="text-sm text-zinc-400 mt-1">Dj Edy</p>
            </div>
          </div>
        </a>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className={`p-6 rounded-2xl ${glass} hover:bg-white/10 transition-all hover:scale-105 group`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zinc-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white">Email</h4>
              <p className="text-sm text-zinc-400 mt-1">djedypr@gmail.com</p>
            </div>
          </div>
        </a>
      </div>

      {/* UBICACIÓN */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 text-zinc-300">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">Servicio a todo Puerto Rico</span>
        </div>
      </div>
    </Section>
  );
}

/* ======
   FOOTER
   ====== */
function Footer() {
  return (
    <footer className="pt-10 pb-20 border-t border-white/10">
      <div className={container}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} DJ EDY. Todos los derechos reservados.
          </div>
          <div className="text-zinc-400 text-sm flex gap-4">
            <a href="#" className="hover:text-zinc-200">
              Privacidad
            </a>
            <a href="#" className="hover:text-zinc-200">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
/* ==========================================
   SISTEMA DE COTIZACIÓN FINAL COMPLETO
   Con navegación por rutas hash
   ========================================== */



// COMPONENTE DE FORMULARIO (se renderiza cuando hash === "#formulario-cotizacion")
function FormularioCotizacion({ selectedServices }) {
  const [formData, setFormData] = useState({
    fecha: "",
    personas: "",
    lugar: "",
    nombre: "",
    whatsapp: "",
    email: ""
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const enviarCotizacion = async () => {
    if (!formData.nombre.trim()) {
      setErrorMessage("Por favor escribe tu nombre");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    if (!formData.whatsapp.trim() || formData.whatsapp.length !== 10) {
      setErrorMessage("El WhatsApp debe tener 10 dígitos");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setSending(true);

    try {
      const serviciosConPrecio = selectedServices.map(s => ({
        nombre: s.nombre,
        precio: s.precio ?? getPrecio(s.id, s.duracion)
      }));
      const total = serviciosConPrecio.reduce((sum, s) => sum + s.precio, 0);
      const serviciosTexto = serviciosConPrecio.length > 0
        ? serviciosConPrecio.map(s => `• ${s.nombre}${s.precio > 0 ? ` — $${s.precio.toLocaleString()}` : ''}`).join('\n')
        : "No especificados";
      const totalTexto = total > 0 ? `$${total.toLocaleString()}` : "Por cotización";

      const pdfData = btoa(encodeURIComponent(JSON.stringify({
        nombre: formData.nombre,
        whatsapp: formData.whatsapp,
        email: formData.email || "",
        fecha: formData.fecha || "",
        personas: formData.personas || "",
        lugar: formData.lugar || "",
        servicios: serviciosConPrecio,
        total: totalTexto
      }))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const pdfLink = `https://www.djedypr.com/#cotizacion-pdf/${pdfData}`;

      const fecha = formData.fecha || 'Por definir';
      const lugar = formData.lugar || 'Por definir';
      const mensajeCliente = [
        `Hola ${formData.nombre}! 👋 Soy DJ EDY.`,
        ``,
        `Recibí tu solicitud y me da mucho gusto poder ser parte de tu evento el ${fecha} en ${lugar}.`,
        ``,
        `Verifiqué disponibilidad para tu fecha y te adjunto la propuesta de cotización con los servicios que seleccionaste. Cualquier pregunta o ajuste que necesites, con gusto te ayudo.`,
        ``,
        `¡Hablamos pronto!`,
        `— DJ EDY`,
        `📱 787-356-8786`,
        `🌐 www.djedypr.com`
      ].join('\n');

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_hik8xkn',
          template_id: 'template_eiagx3a',
          user_id: 'rITQraGRa7eL9gr9P',
          template_params: {
            nombre: formData.nombre,
            whatsapp: formData.whatsapp,
            email: formData.email || "No proporcionó",
            fecha: fecha,
            personas: formData.personas || "Por definir",
            lugar: lugar,
            servicios: "",
            extras: serviciosTexto,
            total: totalTexto,
            mensaje_cliente: mensajeCliente,
            pdf_link: pdfLink
          }
        })
      });

      if (response.ok) {
        setShowConfirmation(true);
      } else {
        throw new Error('Error al enviar');
      }
    } catch (error) {
      setErrorMessage("Error al enviar. Intenta de nuevo.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setSending(false);
    }
  };

  const inputClass = "w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 outline-none focus:border-white/30 transition-colors text-sm";
  const labelClass = "flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2";

  const ErrorToast = () => (
    <AnimatePresence>
      {showError && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <X className="w-5 h-5" />
            <p className="font-medium text-sm">{errorMessage}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (showConfirmation) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-9 h-9 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">¡Solicitud recibida!</h2>
          <p className="text-zinc-400 mb-1">
            Gracias, <span className="text-white font-semibold">{formData.nombre}</span>.
          </p>
          <p className="text-zinc-500 text-sm mb-10">
            Verificamos disponibilidad y te contactamos pronto por WhatsApp al <span className="text-white">{formData.whatsapp}</span>.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </a>
        </motion.div>
        <ErrorToast />
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black pt-24 pb-20">
      {/* Top border line */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back button */}
        <button
          onClick={() => window.location.hash = "#home"}
          className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 text-zinc-400 hover:text-white text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase mb-3">— Cotización —</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Casi listo</h2>
          <p className="text-zinc-400 mt-3">Completa tus datos y te enviamos los precios por WhatsApp.</p>
        </motion.div>

        {/* Dos columnas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-5 gap-6"
        >
          {/* ── Columna izquierda: resumen ── */}
          <div className="md:col-span-2">
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 sticky top-28">
              <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-4">Tu pedido</p>
              {selectedServices.length === 0 ? (
                <p className="text-zinc-600 text-sm">Sin servicios seleccionados.</p>
              ) : (
                <ul className="space-y-2.5">
                  {selectedServices.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-zinc-300 text-sm leading-snug">{service.nombre}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="text-xs text-zinc-600">{selectedServices.length} servicio{selectedServices.length !== 1 ? 's' : ''} · Precio por cotización</p>
              </div>
            </div>
          </div>

          {/* ── Columna derecha: formulario ── */}
          <div className="md:col-span-3 space-y-5">

            {/* Sección evento */}
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-5">Sobre el evento</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>
                    <Calendar className="w-3.5 h-3.5" /> Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <Users className="w-3.5 h-3.5" /> Personas
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={formData.personas}
                    onChange={(e) => setFormData({...formData, personas: e.target.value})}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <MapPin className="w-3.5 h-3.5" /> Lugar
                </label>
                <input
                  placeholder="Nombre del salón o dirección"
                  value={formData.lugar}
                  onChange={(e) => setFormData({...formData, lugar: e.target.value})}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Sección datos de contacto */}
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-5">Tus datos</p>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>
                    <User className="w-3.5 h-3.5" /> Nombre <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
                  </label>
                  <input
                    placeholder="Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <PhoneIcon className="w-3.5 h-3.5" /> WhatsApp <span className="text-white/40 normal-case tracking-normal font-normal">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="7871234567"
                      value={formData.whatsapp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({...formData, whatsapp: value});
                      }}
                      maxLength={10}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Mail className="w-3.5 h-3.5" /> Email <span className="text-zinc-600 normal-case tracking-normal font-normal">(opcional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botón enviar */}
            <button
              onClick={enviarCotizacion}
              disabled={sending}
              className="w-full py-4 bg-white hover:bg-zinc-100 text-black rounded-xl font-bold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Enviando..." : "Enviar solicitud de cotización"}
            </button>

            <p className="text-xs text-zinc-600 text-center">* Campos requeridos. Te contactamos en menos de 24 horas.</p>
          </div>
        </motion.div>
      </div>

      <ErrorToast />
    </section>
  );
}


/* ==========================================
   COMPONENTES DE SECCIONES COLAPSABLES
   Para: Photo Booth, Efectos, Pantallas, Animación
   ========================================== */

// COMPONENTE: Sección Colapsable Genérica
function SeccionColapsable({ 
  id, 
  titulo, 
  descripcion, 
  imagenHeader, 
  children, 
  expandedSections, 
  setExpandedSections 
}) {
  const isExpanded = expandedSections[id];

  return (
    <div id={`section-${id}`} className="mb-20">
      {/* HEADER COLAPSABLE */}
      <button
        onClick={() => setExpandedSections(prev => ({...prev, [id]: !prev[id]}))}
        className="w-full group mb-8"
      >
        <div className="relative rounded-3xl overflow-hidden">
          {/* Imagen de fondo */}
          <div className="relative h-48 md:h-64">
            <img 
              src={imagenHeader} 
              alt={titulo} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
            
            {/* Contenido sobre la imagen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                {titulo}
              </h2>
              {descripcion && (
                <p className="text-base md:text-lg text-zinc-300 mb-4 max-w-2xl">
                  {descripcion}
                </p>
              )}
              
              {/* Indicador de expansión */}
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm font-medium">
                  {isExpanded ? 'Ocultar servicios' : 'Ver servicios'}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* CONTENIDO EXPANDIBLE */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// COMPONENTE: Galería auto-slide horizontal
function GaleriaAutoSlide({ fotos, intervalo = 3500, className = "rounded-lg aspect-square border border-white/10 bg-white/5" }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (!fotos || fotos.length <= 1) return;
    const t = setInterval(() => {
      setDir(1);
      setIdx(prev => (prev + 1) % fotos.length);
    }, intervalo);
    return () => clearInterval(t);
  }, [fotos, intervalo]);

  if (!fotos || fotos.length === 0) return null;

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%' }),
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence custom={dir} initial={false}>
        <motion.img
          key={idx}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          src={fotos[idx]}
          alt={`Foto ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      </AnimatePresence>

      {/* Dots */}
      {fotos.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
          {fotos.map((_, i) => (
            <div
              key={i}
              className={`rounded-full bg-white transition-all duration-300 ${
                i === idx ? 'w-4 h-1.5 opacity-100' : 'w-1.5 h-1.5 opacity-40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// COMPONENTE: Tarjeta con Foto de Fondo
function TarjetaServicioConFondo({
  imagen,
  imagenes = [],
  titulo,
  subtitulo,
  children,
  isSelected,
  className = ""
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const forceExpanded = useContext(GroupExpandedContext);
  const fotos = imagenes.length > 1 ? imagenes : [imagen];
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  useEffect(() => {
    if (!forceExpanded) setIsExpanded(false);
  }, [forceExpanded]);

  useEffect(() => {
    if (fotos.length <= 1) return;
    const t = setInterval(() => {
      setSlideDir(1);
      setSlideIdx(prev => (prev + 1) % fotos.length);
    }, 3500);
    return () => clearInterval(t);
  }, [fotos.length]);

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%' }),
    center: { x: 0 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%' }),
  };

  const imagenOverlay = (
    <button
      onClick={() => { if (!forceExpanded) setIsExpanded(prev => !prev); }}
      className={`relative overflow-hidden bg-black w-full ${forceExpanded ? 'h-52' : 'h-72'}`}
    >
      <AnimatePresence custom={slideDir} initial={false}>
        <motion.img
          key={slideIdx}
          custom={slideDir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          src={fotos[slideIdx]}
          alt={titulo}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
      {fotos.length > 1 && (
        <div className="absolute top-3 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
          {fotos.map((_, i) => (
            <div key={i} className={`rounded-full bg-white transition-all duration-300 ${i === slideIdx ? 'w-4 h-1.5 opacity-90' : 'w-1.5 h-1.5 opacity-35'}`} />
          ))}
        </div>
      )}
      {forceExpanded ? (
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pointer-events-none text-left">
          <h3 className="text-lg font-bold text-white leading-tight text-left">{titulo}</h3>
          {subtitulo && <p className="text-xs text-white/75 mt-0.5 tracking-wide text-left">{subtitulo}</p>}
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pointer-events-none flex flex-col items-start gap-2 text-left">
          <div>
            <h3 className="text-xl font-bold text-white leading-tight text-left">{titulo}</h3>
            {subtitulo && <p className="text-xs font-semibold text-white tracking-wide opacity-75 mt-0.5 text-left">{subtitulo}</p>}
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-sm transition-all ${
            isExpanded ? 'bg-white/25 border-white/50 text-white' : 'bg-black/40 border-white/40 text-white'
          }`}>
            {isExpanded ? 'Ocultar' : 'Ver detalles'}
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
    </button>
  );

  /* Grupo expandido: layout estático con h-full para alinear botones */
  if (forceExpanded) {
    return (
      <div className={`group ${className} h-full`}>
        <div className={`rounded-2xl overflow-hidden ${glass} border-2 ${
          isSelected ? 'border-white/40' : 'border-white/10'
        } hover:border-white/30 transition-all h-full flex flex-col`}>
          {imagenOverlay}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10 flex flex-col flex-1"
          >
            <div className="p-5 bg-black/40 flex flex-col flex-1 [&>*:last-child]:mt-auto">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* Toggle individual: h-full + opacity para alinear botones en el grid */
  return (
    <div className={`group ${className} h-full`}>
      <div className={`rounded-2xl overflow-hidden ${glass} border-2 ${
        isSelected ? 'border-white/40' : 'border-white/10'
      } hover:border-white/30 transition-all h-full flex flex-col`}>
        {imagenOverlay}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/10 flex flex-col flex-1"
            >
              <div className="p-5 bg-black/40 flex flex-col flex-1 [&>*:last-child]:mt-auto">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



/* ==========================================
   QUOTEFLOW COMPLETO REDISEÑADO
   Todas las tarjetas con foto de fondo + botón info
   ========================================== */

// DATOS ACTUALIZADOS CON NUEVAS FOTOS
const SERVICIOS_DATA = {
  montajes: {
    nombre: "Montajes DJ",
    opciones: [
      {
        id: "sencillo",
        nombre: "Montaje Sencillo",
        imagenes: ["/montaje-Sencillo.jpg", "/montaje-Sencillo-2.jpg"],
        duracion: "4 horas",
        incluye: [
          "2 bocinas RCF Evox 12 (hasta 200 personas)",
          "Pantalla TV 32\" Opcional",
          "Karaoke / Just Dance",
          "1 micrófono inalámbrico",
          "DJ Booth iluminado",
          "2 luces Party LED",
          "Mixeo de música en vivo"
        ]
      },
      {
        id: "mediano",
        nombre: "Montaje Mediano",
        imagenes: ["/montajeMediano.jpg", "/montajeSencillo.jpg", "/montajeMediano-2.PNG"],
        duracion: "5 horas",
        incluye: [
          "2 bocinas RCF Evox 12 (hasta 200 personas)",
          "Pantalla gigante 100\" o TV 55\"",
          "Karaoke / Just Dance",
          "2 micrófonos inalámbricos",
          "DJ Booth iluminado",
          "2 trussing iluminados",
          "2 luces Moving Heads",
          "Máquina de humo o haze",
          "Mixeo de música en vivo",
          "Animación desde el DJ Stage"
        ]
      },
      {
        id: "premium",
        nombre: "Montaje Premium",
        imagenes: ["/montaje-Premium.jpg", "/montaje-Premium-2.PNG", "/montaje-Premium-3.jpg"],
        duracion: "6 horas",
        incluye: [
          "2 bocinas RCF Evox 12 (hasta 200 personas)",
          "2 pantallas TV 55\"",
          "Karaoke / Just Dance",
          "2 micrófonos inalámbricos",
          "DJ Booth iluminado",
          "2 trussing iluminados",
          "2 luces Moving Heads Gobo",
          "2 luces Moving Heads BeeEye",
          "Máquina de humo o haze",
          "Mixeo de música en vivo",
          "Animación desde el DJ Stage"
        ]
      }
    ]
  },

  pistas: {
    nombre: "Pistas de Baile LED",
    opciones: [
      {
        id: "3d",
        nombre: "Pista 3D Mirror & Frost",
        imagen: "/pista-3d-1.jpg",
        tipo: "3D con efectos espejo",
        incluye: ["Efectos 3D interactivos", "Acabado espejo", "Efecto frost", "Instalación profesional"],
        tamanos: ["10x10", "12x12", "14x14", "16x16"]
      },
      {
        id: "blanca",
        nombre: "Pista Blanca con Puntos LED",
        imagen: "/pista-blanca-1.jpg",
        tipo: "Puntos LED de colores o blanco",
        incluye: ["Puntos LED programables (colores o blanco)", "Base blanca elegante", "Múltiples patrones", "Instalación profesional"],
        tamanos: ["10x10", "12x12", "14x14", "16x16"]
      }
    ]
  },

  sonidoCeremonia: {
    nombre: "Sonido Ceremonia/Cóctel",
    opciones: [
      {
        id: "ceremonia",
        nombre: "Sonido Ceremonia/Cóctel",
        imagen: "/sonido-ceremonia-service.jpg",
        imagenes: [
  "/sc.jpg",
  "/sc2.jpg",
  "/sc3.jpg",
  "/sc4.jpg",
  "/sc5.jpg",
  "/sc6.jpg",
  "/sc8.jpg",
  "/sc9.jpg"
],
        duracion: "1 hora",
        incluye: [
          "1 bocina de batería en stand con tela blanca",
          "1 micrófono inalámbrico con stand",
          "Cualquier tipo de música",
          "Operador incluido"
        ]
      }
    ]
  },

  lucesAmbiente: {
    nombre: "Luces de Ambiente",
    opciones: [
      {
        id: "ambiente",
        nombre: "Luces LED de Ambiente",
        imagen: "/luces-ambiente-service.jpg",
        imagenes: [
  "/la.jpg",
  "/la1.jpg",
  "/la2.jpg",
  "/la3.jpg",
  "/la4.jpg",
  "/la5.jpg",
  "/la6.jpg",
  "/la7.jpg"
],
        duracion: "~5 horas de batería",
        incluye: [
          "Luces LED de batería inalámbricas",
          "Duración aproximada de 5 horas",
          "Paquetes disponibles: 10, 14, 16, 20, 28, 35 luces",
          "Se pueden añadir más según necesidad",
        ]
      }
    ]
  },
  
  fotografia: {
    nombre: "Fotografía",
    opciones: [
      {
        id: "profesional",
        nombre: "Fotografía Profesional",
        subtitulo: "Fotografía Profesional General",
        imagen: "/fotografia-service.png",
        duracion: "4 horas",
        galeria: [
          "/foto-galeria-1.jpg",
          "/foto-galeria-2.jpg",
          "/foto-galeria-3.jpg",
          "/foto-galeria-4.jpg",
          "/foto-galeria-5.jpg",
          "/foto-galeria-6.jpg",
        ],
        incluye: [
          "Cámara profesional Canon M50",
          "Flash en cámara",
          "Fotógrafo experimentado",
          "Cobertura completa",
          "Entrega digital",
          "Edición básica"
        ]
      }
    ]
  },
  
photobooth: {
  nombre: "Photo Booth",
  opciones: [
    {
      id: "360",
      nombre: "Photo Booth 360°",
      subtitulo: "Plataforma grande · Cámara lenta",
      imagen: "/photoBooth360.png",
      incluye: [
        "Plataforma grande (5-7 personas)",
        "Videos con edición en cámara lenta",
        "Mesa con props (collares, gafas, sombreros)",
        "Separadores estilo alfombra roja",
        "Alfombra debajo de la maquinaria",
        "Entrega digital instantánea",
        "Operador dedicado"
      ],
      duraciones: ["2 horas", "3 horas"],
      extras: [
        {
          id: "cabina-inflable",
          nombre: "Cabina Inflable",
          imagen: "/cabina-inflable.jpg",
          descripcion: "Cabina inflable personalizable con iluminación LED"
        }
      ]
    },
    {
      id: "estatico",
      nombre: "Photo Booth Estático",
      subtitulo: "Pedestal · Entrega digital instantánea",
      imagen: "/photobooth-service.png",
      incluye: [
        "Pedestal profesional",
        "Mesa con props (collares, gafas, sombreros)",
        "Separadores estilo alfombra roja",
        "Entrega intantánea digital",
        "Operador dedicado"
        
      ],
      duraciones: ["2 horas", "3 horas"],
      extras: [
        {
          id: "cabina-inflable",
          nombre: "Cabina Inflable",
          imagen: "/cabina-inflable.jpg",
          descripcion: "Cabina inflable personalizable con iluminación LED"
        }
      ]
    }
  ]
},
  
  efectos: {
    nombre: "Efectos Especiales",
    opciones: [
      {
        id: "truss-gobos",
        nombre: "Decoración de Luces Gobo",
        imagen: "/decorLum.jpg",
        subtitulo: "Truss con Moving Heads",
        opciones: [
          "2 truss 10' con 4 luces",
          "4 truss 10' con 8 luces"
        ],
        incluye: [
          "Tela blanca",
          "Trussing de 10 pies",
          "Moving Heads profesionales",
          "Gobos y colores a escoger",
          "Técnico de luces dedicado",
          "Consola digital de programación profesional",
          "Proyección en paredes del venue",
          "Instalación completa"
        ]
      },
      {
        id: "chispas",
        nombre: "Chispas Frías",
        imagen: "/chispas-frias-service.jpg",
        detalles: "3 tiros de 15 segundos en momentos que elija",
        incluye: [
          "2 máquinas de chispas frías",
          "Pirotecnia segura",
          "Altura hasta 15 pies",
          "Técnico certificado",
          "Ideal para primer baile",
          "3 tiros de 15 segundos"
        ]
      },
      {
        id: "humo-bajo",
        nombre: "Humo Bajo (Baile en Nubes)",
        imagen: "humoBajo.jpg",
        incluye: ["Efecto nube baja", "Humo denso", "Ideal para primer baile", "Máquina de hielo seco"],
        disponible: false
      },
      {
        id: "humo-vertical",
        nombre: "Humo Vertical",
        imagen: "humoVertical.jpg",
        detalles: "2 máquinas, 4 horas",
        incluye: ["2 máquinas profesionales","Luces led iluminan el humo", "Tiros ilimitados", "Fluido incluido", "Técnico dedicado"]
      },
      {
        id: "confeti",
        nombre: "Confeti",
        imagen: "confeti.jpg",
        incluye: [
          "Confeti del color elegido",
          "Lanzamiento aéreo profesional",
          "Control de timing",
          "Sujeto a permisos del venue"
        ]
      },
      {
        id: "espuma",
        nombre: "Máquina de Espuma",
        imagen: "espuma.jpg",
        incluye: ["Espuma no tóxica", "Cañón de alta potencia", "Instalación en estructura", "Sujeto a permisos del venue"]
      }
    ]
  },
  
  pantallas: {
    nombre: "Pantallas & Visuales",
    opciones: [
      {
        id: "led",
        nombre: "Pantalla LED Modular 13x7",
        imagen: "/pantallaLed.jpg",
        detalles: "Waterproof - Ideal para exteriores",
        incluye: [
          "Alta resolución y brillo",
          "Tamaño ajustable",
          "Waterproof - Resistente al agua",
          "Uso en exteriores e interiores",
          "Instalación profesional",
          "Técnico dedicado"
        ]
      },
      {
        id: "proyeccion",
        nombre: "Sistema de Proyección 100\"",
        subtitulo: "Pantalla + proyector alta luminosidad",
        imagen: "/pantallaProyeccion.png",
        incluye: ["Pantalla profesional", "Proyector alta luminosidad", "Montaje incluido"]
      }
    ]
  },
  
  animacion: {
    nombre: "Animación & Coordinación",
    opciones: [
      {
        id: "animador",
        nombre: "Animador Profesional",
        imagen: "/animador.jpg",
        duracion: "4 horas",
        incluye: ["Interacción con invitados", "Juegos y actividades", "Manejo de público"]
      },
      {
        id: "mc",
        nombre: "Maestro de Ceremonias",
        imagen: "/animacion-service.png",
        duracion: "3 horas",
        incluye: ["Conducción del evento", "Anuncios oficiales", "Voz profesional"]
      },
      {
        id: "batucada",
        nombre: "Batucada",
        imagen: "/batucada.jpg",
        detalles: "3-5 integrantes",
        incluye: ["Percusión en vivo", "Animación energética"]
      },
      {
        id: "coordinador",
        nombre: "Coordinador de Eventos",
        imagen: "/event-coordinator.jpg",
        incluye: ["Planificación completa", "Coordinación con proveedores", "Supervisión del evento"]
      }
    ]
  }
};

// Servicios de paquetes que no están en SERVICIOS_DATA (fallback inline)
const SERVICIOS_PAQUETES_EXTRA = {
  "hora-loca": {
    nombre: "Hora Loca",
    imagen: "glowSticks.jpg",
    incluye: ["Props y accesorios GLOW", "100 Glow Sticks", "40 Foam Sticks", "Animación especial", "Música para hora loca"]
  },
  "sonido-rcf": {
    nombre: "2 Bocinas RCF EVOX 12",
    imagen: "/sonido-service.jpg",
    incluye: ["Sistema compacto de alta potencia", "Sonido cristalino hasta 100 personas", "Ideal para interiores"]
  },
  "mics-2": {
    nombre: "2 Micrófonos Inalámbricos",
    imagen: "/sonido-service.jpg",
    incluye: ["Micrófonos Shure profesionales", "Transmisión inalámbrica estable", "Soporte incluido"]
  },
  "mics-4": {
    nombre: "4 Micrófonos Inalámbricos",
    imagen: "/sonido-service.jpg",
    incluye: ["4 micrófonos Shure profesionales", "Cobertura para paneles y conferencistas"]
  },
  "mics-6": {
    nombre: "6 Mics Inalámbricos + Headsets",
    imagen: "/sonido-service.jpg",
    incluye: ["6 micrófonos inalámbricos", "Headsets para presentadores", "Set completo para eventos grandes"]
  },
  "tecnico": {
    nombre: "Técnico Dedicado",
    imagen: "/animacion-service.png",
    incluye: ["Técnico de audio/video dedicado", "Soporte durante todo el evento", "Resolución inmediata de problemas"]
  },
  "tecnicos-2": {
    nombre: "2 Técnicos Dedicados",
    imagen: "/animacion-service.png",
    incluye: ["Equipo de 2 técnicos especializados", "Cobertura de audio y visuales", "Soporte durante todo el evento"]
  },
  "sonido-15": {
    nombre: "2 Bocinas 15\" + 2 Subs 18\"",
    imagen: "/sonido-service.jpg",
    incluye: ["Sistema para 100-300 personas", "2 bocinas frontales 15\"", "2 subwoofers 18\" para graves"]
  },
  "luces-wash": {
    nombre: "Iluminación Básica",
    imagen: "/iluminacion-service.jpg",
    incluye: ["Luces Front Wash", "Iluminación de escenario", "Control profesional"]
  },
  "luces-pro": {
    nombre: "Iluminación Profesional",
    imagen: "/iluminacion-service.jpg",
    incluye: ["Moving Heads en altura", "Efectos programados", "Técnico de luces dedicado"]
  },
  "line-array": {
    nombre: "Line Array Profesional",
    imagen: "/sonido-service.jpg",
    incluye: ["6 bocinas en line array", "2 subwoofers profesionales", "Ideal para 300-500+ personas", "Cobertura uniforme de sonido"]
  },
  "line-array-full": {
    nombre: "Sistema Line Array Completo",
    imagen: "/sonido-service.jpg",
    incluye: ["Sistema line array de concierto", "Audio profesional de alto impacto", "Ideal para eventos masivos"]
  },
  "pantallas-55": {
    nombre: "2 Pantallas LED 55\" Adicionales",
    imagen: "/pantallas-service.png",
    incluye: ["2 pantallas LED 55\" adicionales", "Posicionamiento estratégico", "Repetición de contenido principal"]
  },
  "tv-timer": {
    nombre: "TV 32\" para Timer",
    imagen: "/pantallas-service.png",
    incluye: ["TV 32\" visible para presentadores", "Reloj regresivo", "Señal de programa"]
  },
  "dj-famoso": {
    nombre: "DJ Famoso / Presentación Artística",
    imagen: "/grupoMusical.jpg",
    incluye: ["King Arthur, DJ Playero, Monjas Raperas", "Show en vivo de alta energía", "Coordinación completa"]
  },
  "dj-grupo": {
    nombre: "DJ Famoso + Grupo Son Con Clase",
    imagen: "/grupoMusical.jpg",
    incluye: ["DJ de renombre", "Grupo musical en vivo", "Show completo de entretenimiento"]
  },
  "artista": {
    nombre: "Artista Invitado",
    imagen: "/grupoMusical.jpg",
    incluye: ["Artista invitado especial", "Cotización según artista seleccionado", "Coordinación logística incluida"]
  },
  "truss-moving": {
    nombre: "Estructura Truss con 8 Moving Heads",
    imagen: "/iluminacion-service.jpg",
    incluye: ["Estructura truss profesional", "8 Moving Heads programados", "Efectos de luz sincronizados"]
  },
  "lasers": {
    nombre: "2 Láser Profesionales",
    imagen: "/iluminacion-service.jpg",
    incluye: ["2 láseres de alta potencia", "Efectos láser multicolor", "Técnico certificado"]
  },
  "efectos-full": {
    nombre: "Efectos Especiales Completos",
    imagen: "/efectos-service.jpg",
    incluye: ["Humo, confeti y chispas frías", "Paquete completo de efectos", "Coordinación con momentos clave"]
  },
  "coordinacion": {
    nombre: "Coordinación y Ujieres",
    imagen: "/animacion-service.png",
    incluye: ["Coordinador de prom", "Equipo de ujieres", "Manejo de lista de invitados"]
  },
  "letras-prom": {
    nombre: "Letras Iluminadas PROM",
    imagen: "/pantallas-service.png",
    incluye: ["Letras LED grandes PROM", "Iluminación de colores", "Decoración icónica del evento"]
  },
  "foto-video": {
    nombre: "Fotografía y Videografía",
    imagen: "/fotografia-service.png",
    incluye: ["Fotógrafo y videógrafo profesionales", "Cobertura completa del evento", "Entrega digital editada"]
  },
  "montaje-rcf": {
    nombre: "Montaje DJ con RCF EVOX 12",
    imagen: "/montajeSencillo.jpg",
    duracion: "4 horas",
    incluye: ["2 bocinas RCF Evox 12 (hasta 200 personas)", "DJ Booth iluminado", "Mixeo de música en vivo", "Ideal para eventos hasta 200 personas"]
  }
};

function getPrecio(id, duracion) {
  if (id === 'montajes-sencillo')          return 550;
  if (id === 'montajes-mediano')           return 750;
  if (id === 'montajes-premium')           return 850;

  if (id === 'pistas-3d-16x16')           return 1100;
  if (id === 'pistas-3d-14x14')           return 1000;
  if (id === 'pistas-3d-12x12')           return 900;
  if (id === 'pistas-3d-10x10')           return 850;

  if (id === 'pistas-blanca-16x16')       return 1000;
  if (id === 'pistas-blanca-14x14')       return 950;
  if (id === 'pistas-blanca-12x12')       return 850;
  if (id === 'pistas-blanca-10x10')       return 750;

  if (id === 'sonidoCeremonia-ceremonia') return 150;

  if (id.startsWith('lucesAmbiente-ambiente-')) {
    const n = parseInt(id.split('-')[2], 10);
    return isNaN(n) ? 0 : n * 15;
  }

  if (id === 'fotografia-profesional')    return 350;

  if (id === 'photobooth-360')
    return (duracion === '3 horas') ? 550 : 450;
  if (id === 'photobooth-estatico')
    return (duracion === '3 horas') ? 450 : 350;

  if (id === 'efectos-truss-gobos')       return 550;
  if (id === 'efectos-chispas')           return 350;
  if (id === 'efectos-humo-vertical')     return 250;
  if (id === 'efectos-confeti')           return 350;
  if (id === 'efectos-espuma')            return 650;

  if (id === 'pantallas-led')             return 1300;
  if (id === 'pantallas-proyeccion')      return 200;

  if (id === 'animacion-animador')        return 500;
  if (id === 'animacion-mc')             return 350;
  if (id === 'animacion-batucada')        return 550;
  if (id === 'animacion-coordinador')     return 650;

  if (id === 'hora-loca')                 return 150;
  if (id === 'cabina-inflable')           return 250;

  return 0;
}

// Resuelve la info completa de un servicio de paquete usando SERVICIOS_DATA como fuente de verdad
function resolveServicioInfo(servicio) {
  const { id, duracion } = servicio;

  for (const [catKey, catData] of Object.entries(SERVICIOS_DATA)) {
    if (!id.startsWith(catKey + '-')) continue;

    const rest = id.slice(catKey.length + 1);

    // Intento de match exacto
    let option = catData.opciones?.find(o => o.id === rest);
    let suffix = null;

    // Match con sufijo (ej: "blanca-12x12" → optionId="blanca", suffix="12x12")
    if (!option) {
      const lastDash = rest.lastIndexOf('-');
      if (lastDash > 0) {
        const optionId = rest.slice(0, lastDash);
        suffix = rest.slice(lastDash + 1);
        option = catData.opciones?.find(o => o.id === optionId);
      }
    }

    if (!option) continue;

    let nombre = option.nombre;
    if (suffix) {
      nombre = /^\d+$/.test(suffix) ? `${suffix} ${nombre}` : `${nombre} ${suffix}`;
    }
    if (duracion) nombre += ` - ${duracion}`;

    return {
      nombre,
      imagen: option.imagen || (option.imagenes && option.imagenes[0]) || null,
      incluye: option.incluye || []
    };
  }

  // Fallback a SERVICIOS_PAQUETES_EXTRA
  const fallback = SERVICIOS_PAQUETES_EXTRA[id];
  if (fallback) {
    let nombre = fallback.nombre;
    if (duracion) nombre += ` - ${duracion}`;
    return { ...fallback, nombre };
  }

  return { nombre: id, imagen: null, incluye: [] };
}

// Lista plana de todos los servicios de SERVICIOS_DATA (excluye los marcados como no disponibles)
const TODOS_SERVICIOS_FLAT = Object.entries(SERVICIOS_DATA).flatMap(([catKey, catData]) =>
  (catData.opciones || [])
    .filter(opt => opt.disponible !== false)
    .map(opt => ({
      id: `${catKey}-${opt.id}`,
      nombre: opt.nombre,
      imagen: opt.imagen || (opt.imagenes && opt.imagenes[0]) || null,
      incluye: opt.incluye || []
    }))
);

// Retorna los servicios de SERVICIOS_DATA que NO están cubiertos por el paquete
function getExtrasDisponibles(packageServiceList) {
  const includedIds = new Set();
  for (const s of packageServiceList) {
    for (const [catKey, catData] of Object.entries(SERVICIOS_DATA)) {
      if (!s.id.startsWith(catKey + '-')) continue;
      const rest = s.id.slice(catKey.length + 1);
      const opt = catData.opciones?.find(o => o.id === rest);
      if (opt) { includedIds.add(`${catKey}-${opt.id}`); break; }
      const lastDash = rest.lastIndexOf('-');
      if (lastDash > 0) {
        const opt2 = catData.opciones?.find(o => o.id === rest.slice(0, lastDash));
        if (opt2) { includedIds.add(`${catKey}-${opt2.id}`); break; }
      }
    }
  }
  return TODOS_SERVICIOS_FLAT.filter(s => !includedIds.has(s.id));
}



function TarjetaMontaje({ option, isSelected, openMontajesAll, setOpenMontajesAll, toggleSelection }) {
  const imagenes = option.imagenes || [option.imagen];
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (imagenes.length <= 1) return;
    const t = setInterval(() => setSlideIdx(p => (p + 1) % imagenes.length), 3500);
    return () => clearInterval(t);
  }, [imagenes.length]);

  return (
    <div className="group h-full">
      <div className={`rounded-2xl overflow-hidden ${glass} border-2 ${isSelected ? 'border-white/40' : 'border-white/10'} hover:border-white/30 transition-all h-full flex flex-col`}>
        <div className="relative h-80 overflow-hidden bg-black flex-shrink-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={slideIdx}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={imagenes[slideIdx]}
              alt={option.nombre}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </AnimatePresence>
          {imagenes.length > 1 && (
            <div className="absolute top-3 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
              {imagenes.map((_, i) => (
                <div key={i} className={`rounded-full bg-white transition-all duration-300 ${i === slideIdx ? 'w-4 h-1.5 opacity-90' : 'w-1.5 h-1.5 opacity-35'}`} />
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-black/40 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">{option.nombre}</h3>
            <span className="text-sm text-zinc-400 font-medium">{option.duracion}</span>
          </div>

          <button
            onClick={() => setOpenMontajesAll(prev => !prev)}
            className="w-full mb-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center justify-center gap-2"
          >
            {openMontajesAll ? 'Ocultar información' : 'Más información'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${openMontajesAll ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {openMontajesAll && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-lg bg-white/5 mb-4">
                  <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                  <ul className="space-y-2 text-sm text-zinc-300">
                    {option.incluye.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => toggleSelection('montajes', option)}
            className={`w-full py-3 rounded-xl font-semibold transition-colors mt-auto ${
              isSelected ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSelected ? '✓ Seleccionado para cotizar' : 'Seleccionar para cotizar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL QUOTEFLOW
function QuoteFlow() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [activeCat, setActiveCat] = useState('montajes');
  const [showExtrasModal, setShowExtrasModal] = useState(false);
  const [extrasQuoteIds, setExtrasQuoteIds] = useState([]);
  const [extraExpandidoQuote, setExtraExpandidoQuote] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [openMontajesAll, setOpenMontajesAll] = useState(false);

  const toggleGroupExpanded = (sectionId) => {
    setExpandedGroups(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

const toggleSection = (sectionId) => {
  setOpenSections(prev => ({...prev, [sectionId]: !prev[sectionId]}));
};

  useEffect(() => {
    const saved = localStorage.getItem('selectedServices');
    if (saved) {
      setSelectedServices(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
  }, [selectedServices]);

  useEffect(() => {
    const ids = ['montajes','pistas','sonidoCeremonia','fotografia','efectos','pantallas','animacion'];
    const observers = ids.map(id => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCat(id); },
        { threshold: 0.2, rootMargin: '-120px 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const handleSolicitarCotizacion = () => {
    const extras = getExtrasDisponibles(selectedServices).filter(e => !e.id.startsWith('montajes-'));
    if (extras.length > 0) {
      setExtrasQuoteIds([]);
      setExtraExpandidoQuote(null);
      setShowExtrasModal(true);
    } else {
      window.location.hash = '#formulario-cotizacion';
    }
  };

  const handleContinuarCotizacion = () => {
    const mainServices = selectedServices.map(s => ({
      id: s.id,
      categoryId: s.categoryId,
      nombre: s.nombre,
      precio: s.precio,
      duracion: s.duracion || null,
    }));
    const extraServices = extrasQuoteIds.map(id => {
      const ext = TODOS_SERVICIOS_FLAT.find(e => e.id === id);
      return { id, categoryId: id.split('-')[0], nombre: ext?.nombre || id, precio: getPrecio(id, null) };
    });
    localStorage.setItem('selectedServices', JSON.stringify([...mainServices, ...extraServices]));
    setShowExtrasModal(false);
    setExtrasQuoteIds([]);
    setExtraExpandidoQuote(null);
    window.location.hash = '#formulario-cotizacion';
  };

  const scrollToSection = (sectionId) => {
  const element = document.getElementById(`section-${sectionId}`);
  if (element) {
    // Offset diferente: móvil vs desktop
    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 500 : 300;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
};


const toggleSelection = (categoryId, option, size = null, duration = null) => {
  // Manejar extras de photobooth
  if (categoryId === 'photobooth-extra') {
    const extraId = `photobooth-${option.id}-extra-${size}`; // size contiene el extra.id
    const isSelected = selectedServices.some(s => s.id === extraId);
    
    if (isSelected) {
      setSelectedServices(selectedServices.filter(s => s.id !== extraId));
    } else {
      const nombre = `${option.nombre} - ${option.extraData.nombre}`;
      setSelectedServices([...selectedServices, {
        id: extraId,
        categoryId: 'photobooth',
        nombre
      }]);
    }
    return;
  }

  // Resto del código original
  const itemId = size 
    ? `${categoryId}-${option.id}-${size}` 
    : duration
      ? `${categoryId}-${option.id}-${duration}`
      : `${categoryId}-${option.id}`;
  
  const isSelected = selectedServices.some(s => s.id === itemId);
  
  if (isSelected) {
    setSelectedServices(selectedServices.filter(s => s.id !== itemId));
  } else {
    let nombre = option.nombre;
    if (size) nombre += ` ${size}`;
    if (duration) nombre += ` - ${duration}`;
    
    setSelectedServices([...selectedServices, {
      id: itemId,
      categoryId,
      nombre
    }]);
  }
};

  const clearSelection = () => {
    setSelectedServices([]);
    localStorage.removeItem('selectedServices');
  };

const categoriasNav = [
  { id: 'montajes', nombre: 'Montajes DJ' },
  { id: 'pistas', nombre: 'Pistas de Baile' },
  { id: 'sonidoCeremonia', nombre: 'Sonido Ceremonia & Luces Amb.' },
  { id: 'fotografia', nombre: 'Captura de Momentos' },
  { id: 'efectos', nombre: 'Efectos Especiales' },
  { id: 'pantallas', nombre: 'Pantallas & Visuales' },
  { id: 'animacion', nombre: 'Animación & Coordinación' }
];
  return (
    <>
      <section id="servicios-selector" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* NAVEGACIÓN — pills sticky */}
            <div className="sticky top-[68px] z-40 mb-10 -mx-4 px-4">
              <div className="relative">
                <div className="absolute inset-0 bg-black/75 backdrop-blur-xl rounded-2xl border border-white/8 shadow-xl shadow-black/40" />
                <div className="relative flex items-center gap-2 px-3 py-2.5 overflow-x-auto scrollbar-none">
                  {categoriasNav.map((cat) => (
                    <motion.button
                      key={cat.id}
                      onClick={() => { scrollToSection(cat.id); setActiveCat(cat.id); }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        activeCat === cat.id
                          ? 'text-black'
                          : 'text-zinc-400 hover:text-white hover:bg-white/8'
                      }`}
                    >
                      {activeCat === cat.id && (
                        <motion.div
                          layoutId="cat-pill"
                          className="absolute inset-0 bg-white rounded-xl"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat.nombre}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              Servicios disponibles para tu evento
            </h1>
            <p className="text-zinc-400 text-center mb-16">
              Explora nuestros servicios y cotiza lo que necesites
            </p>

            {/* MONTAJES DJ CON CAROUSEL */}
<div id="section-montajes" className="mb-20">
  <h2 className="text-3xl font-bold text-white mb-3">Montajes DJ</h2>
  <p className="text-zinc-400 mb-8">Elige el montaje base para tu evento</p>

  <div className="grid md:grid-cols-3 gap-6">
    {SERVICIOS_DATA.montajes.opciones.map(option => {
      const itemKey = `montajes-${option.id}`;
      const isSelected = selectedServices.some(s => s.id === itemKey);
      return (
        <TarjetaMontaje
          key={option.id}
          option={option}
          isSelected={isSelected}
          openMontajesAll={openMontajesAll}
          setOpenMontajesAll={setOpenMontajesAll}
          toggleSelection={toggleSelection}
        />
      );
    })}
  </div>
</div>

            {/* SEPARADOR */}
            <div className="my-24">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  También puedes añadir estos servicios
                </h2>
                <div id="servicios-adicionales" className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full"></div>
              </div>
            </div>

{/* PISTAS - COLAPSABLE */}
<SeccionCategoria
  id="pistas"
  titulo="Pistas de Baile LED"
  subtitulo="3D Mirror & Frost · Blanca con Puntos LED"
  imagenHeader="/pista-3d-1.jpg"
  isOpen={openSections.pistas}
  onToggle={() => toggleSection('pistas')}
  isGroupExpanded={!!expandedGroups.pistas}
  onToggleGroup={() => toggleGroupExpanded('pistas')}
>
  <div className="grid md:grid-cols-2 gap-8">
    {SERVICIOS_DATA.pistas.opciones.map(option => (
      <TarjetaServicioConFondo
        key={option.id}
        imagen={option.imagen}
        titulo={option.nombre}
        subtitulo={option.tipo}
      >
        <div className="p-4 rounded-lg bg-white/5 mb-4">
          <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
          <ul className="space-y-2 text-sm text-zinc-300">
            {option.incluye.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-zinc-400 mb-3 font-medium">Selecciona el tamaño para cotizar:</p>
        <div className="grid grid-cols-2 gap-2">
          {option.tamanos.map(size => {
            const sizeId = `pistas-${option.id}-${size}`;
            const isSelected = selectedServices.some(s => s.id === sizeId);
            
            return (
              <button
                key={size}
                onClick={() => toggleSelection('pistas', option, size)}
                className={`py-3 rounded-xl font-semibold text-sm transition-colors ${
                  isSelected 
                    ? 'bg-white text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isSelected ? `✓ ${size}` : size}
              </button>
            );
          })}
        </div>
      </TarjetaServicioConFondo>
    ))}
  </div>
</SeccionCategoria>

           {/* SONIDO + LUCES - VISIBLES LADO A LADO */}
<div id="section-sonidoCeremonia" className="mb-20">
  <div className="grid md:grid-cols-2 gap-8">
    {/* SONIDO CEREMONIA */}
    {SERVICIOS_DATA.sonidoCeremonia.opciones.map(option => {
      const isSelected = selectedServices.some(s => s.id === `sonidoCeremonia-${option.id}`);
      
      return (
        <TarjetaServicioConFondo
          key={option.id}
          imagen={option.imagen}
          imagenes={option.imagenes}
          titulo={option.nombre}
          subtitulo={option.duracion}
          isSelected={isSelected}
        >
          <div className="p-4 rounded-lg bg-white/5 mb-4">
            <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              {option.incluye.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => toggleSelection('sonidoCeremonia', option)}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${
              isSelected 
                ? 'bg-white text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
          </button>
        </TarjetaServicioConFondo>
      );
    })}

    {/* LUCES AMBIENTE */}
    {SERVICIOS_DATA.lucesAmbiente.opciones.map(option => {
      const isSelected = selectedServices.some(s => s.id === `lucesAmbiente-${option.id}`);
      
      return (
        <TarjetaServicioConFondo
          key={option.id}
          imagen={option.imagen}
          imagenes={option.imagenes}
          titulo={option.nombre}
          subtitulo={option.duracion}
          isSelected={isSelected}
        >
          <div className="p-4 rounded-lg bg-white/5 mb-4">
            <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              {option.incluye.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => toggleSelection('lucesAmbiente', option)}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${
              isSelected 
                ? 'bg-white text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
          </button>
        </TarjetaServicioConFondo>
      );
    })}
  </div>
</div>

      
{/* CAPTURA DE MOMENTOS - COLAPSABLE */}
<SeccionCategoria
  id="fotografia"
  titulo="Captura de Momentos"
  subtitulo="Fotografía Profesional · Photo Booth 360° · Photo Booth Estático"
  imagenHeader="/fotografia-service.png"
  isOpen={openSections.fotografia}
  onToggle={() => toggleSection('fotografia')}
  isGroupExpanded={!!expandedGroups.fotografia}
  onToggleGroup={() => toggleGroupExpanded('fotografia')}
>
  <div className="grid md:grid-cols-3 gap-6">
    {/* FOTOGRAFÍA PROFESIONAL */}
    {SERVICIOS_DATA.fotografia.opciones.map(option => {
      const isSelected = selectedServices.some(s => s.id === `fotografia-${option.id}`);
      
      return (
        <TarjetaServicioConFondo
          key={option.id}
          imagen={option.imagen}
          titulo={option.nombre}
          subtitulo={option.subtitulo || option.duracion}
          isSelected={isSelected}
        >
          <div className="p-4 rounded-lg bg-white/5 mb-3">
            <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              {option.incluye.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {option.galeria?.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-white font-bold mb-2 tracking-wide">Galería</p>
              <GaleriaAutoSlide fotos={option.galeria} intervalo={3500} />
            </div>
          )}

          <button
            onClick={() => toggleSelection('fotografia', option)}
            className={`w-full py-3 rounded-xl font-semibold transition-colors ${
              isSelected
                ? 'bg-white text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
          </button>
        </TarjetaServicioConFondo>
      );
    })}

{/* PHOTO BOOTH 360 Y ESTÁTICO */}
{SERVICIOS_DATA.photobooth.opciones.map(option => (
  <TarjetaServicioConFondo
    key={option.id}
    imagen={option.imagen}
    titulo={option.nombre}
    subtitulo={option.subtitulo}
  >
    <div className="p-4 rounded-lg bg-white/5 mb-4">
      <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
      <ul className="space-y-2 text-sm text-zinc-300">
        {option.incluye.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <p className="text-sm text-zinc-400 mb-3 font-medium">Selecciona duración para cotizar:</p>
    <div className="grid grid-cols-2 gap-3 mb-4">
      {option.duraciones.map(dur => {
        const durId = `photobooth-${option.id}-${dur}`;
        const isSelected = selectedServices.some(s => s.id === durId);
        
        return (
          <button
            key={dur}
            onClick={() => toggleSelection('photobooth', option, null, dur)}
            className={`py-3 rounded-xl font-semibold text-sm transition-colors ${
              isSelected 
                ? 'bg-white text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSelected ? `✓ ${dur}` : dur}
          </button>
        );
      })}
    </div>

    {/* EXTRAS: CABINA INFLABLE */}
    {option.extras && (
      <div className="mb-4">
        <p className="text-sm text-zinc-400 mb-3 font-medium">Extras disponibles:</p>
        <div className="space-y-3">
          {option.extras.map(extra => {
            const extraId = `photobooth-${option.id}-extra-${extra.id}`;
            const isSelected = selectedServices.some(s => s.id === extraId);
            
            return (
              <div key={extra.id} className="space-y-2">
                <div className="relative rounded-xl overflow-hidden">
                  <img 
                    src={extra.imagen} 
                    alt={extra.nombre} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-base">{extra.nombre}</p>
                    <p className="text-zinc-300 text-xs">{extra.descripcion}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSelection('photobooth-extra', {...option, extraData: extra}, extra.id)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    isSelected 
                      ? 'bg-white text-black' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {isSelected ? '✓ Añadido a cotización' : 'Añadir a cotización'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </TarjetaServicioConFondo>
))}
  </div>
</SeccionCategoria>


{/* EFECTOS ESPECIALES - COLAPSABLE */}
<SeccionCategoria
  id="efectos"
  titulo="Efectos Especiales"
  subtitulo="Chispas · Confeti · Humo Vertical · Moving Heads · Espuma"
  imagenHeader="/chispas-frias-service.jpg"
  isOpen={openSections.efectos}
  onToggle={() => toggleSection('efectos')}
  isGroupExpanded={!!expandedGroups.efectos}
  onToggleGroup={() => toggleGroupExpanded('efectos')}
>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {SERVICIOS_DATA.efectos.opciones.map(option => {
      const isSelected = selectedServices.some(s => s.id === `efectos-${option.id}`);
      const isDisabled = option.disponible === false;

      return (
        <TarjetaServicioConFondo
          key={option.id}
          imagen={option.imagen}
          titulo={option.nombre}
          subtitulo={option.subtitulo || option.detalles}
          isSelected={isSelected}
          className=""
        >
          {isDisabled && (
            <div className="mb-4">
              <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-red-500/20 text-red-400">
                No disponible
              </span>
            </div>
          )}

          {option.opciones && (
            <div className="mb-4 p-3 rounded-lg bg-white/5">
              <p className="text-xs text-zinc-400 mb-2 font-medium">OPCIONES:</p>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {option.opciones.map((opt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white mt-0.5">•</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {option.incluye && (
            <div className="p-3 rounded-lg bg-white/5 mb-4">
              <p className="text-xs text-zinc-400 mb-2 font-medium">INCLUYE:</p>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {option.incluye.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => !isDisabled && toggleSelection('efectos', option)}
            disabled={isDisabled}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isDisabled
                ? 'bg-white/5 text-zinc-500 cursor-not-allowed'
                : isSelected 
                  ? 'bg-white text-black' 
                  : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isDisabled ? 'No disponible' : isSelected ? '✓ Seleccionado' : 'Seleccionar'}
          </button>
        </TarjetaServicioConFondo>
      );
    })}
  </div>
</SeccionCategoria>

{/* PANTALLAS & VISUALES - COLAPSABLE */}
<SeccionCategoria
  id="pantallas"
  titulo="Pantallas & Visuales"
  subtitulo={"Pantalla LED 13×7 · Proyección 100\""}
  imagenHeader="/pantallas-service.png"
  isOpen={openSections.pantallas}
  onToggle={() => toggleSection('pantallas')}
  isGroupExpanded={!!expandedGroups.pantallas}
  onToggleGroup={() => toggleGroupExpanded('pantallas')}
>
  <div className="grid md:grid-cols-2 gap-6">
    {SERVICIOS_DATA.pantallas.opciones.map(option => {
      const isSelected = selectedServices.some(s => s.id === `pantallas-${option.id}`);

      return (
        <TarjetaServicioConFondo
          key={option.id}
          imagen={option.imagen}
          titulo={option.nombre}
          subtitulo={option.subtitulo || option.detalles}
          isSelected={isSelected}
        >
          <div className="p-3 rounded-lg bg-white/5 mb-4">
            <p className="text-xs text-zinc-400 mb-2 font-medium">INCLUYE:</p>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {option.incluye.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => toggleSelection('pantallas', option)}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isSelected 
                ? 'bg-white text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
          </button>
        </TarjetaServicioConFondo>
      );
    })}
  </div>
</SeccionCategoria>

{/* ANIMACIÓN & COORDINACIÓN - COLAPSABLE */}
<SeccionCategoria
  id="animacion"
  titulo="Animación & Coordinación"
  subtitulo="Animador · Maestro de Ceremonias · Batucada · Coordinador"
  imagenHeader="/animacion-service.png"
  isOpen={openSections.animacion}
  onToggle={() => toggleSection('animacion')}
  isGroupExpanded={!!expandedGroups.animacion}
  onToggleGroup={() => toggleGroupExpanded('animacion')}
>
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {SERVICIOS_DATA.animacion.opciones.map(option => {
      const isSelected = selectedServices.some(s => s.id === `animacion-${option.id}`);

      return (
        <TarjetaServicioConFondo
          key={option.id}
          imagen={option.imagen}
          titulo={option.nombre}
          subtitulo={option.duracion || option.detalles}
          isSelected={isSelected}
        >
          <div className="p-3 rounded-lg bg-white/5 mb-4">
            <p className="text-xs text-zinc-400 mb-2 font-medium">INCLUYE:</p>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {option.incluye.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => toggleSelection('animacion', option)}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              isSelected 
                ? 'bg-white text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isSelected ? '✓ Seleccionado' : 'Seleccionar'}
          </button>
        </TarjetaServicioConFondo>
      );
    })}
  </div>
</SeccionCategoria>

          </div>
        </div>
      </section>

      {/* BOTONES FLOTANTES */}
      {selectedServices.length > 0 && (
        <>
          <motion.button
            onClick={handleSolicitarCotizacion}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hidden md:flex fixed bottom-6 right-6 px-6 py-3 bg-white text-black rounded-full text-base font-bold shadow-2xl hover:scale-105 transition-transform z-50 items-center gap-2"
          >
            Solicitar cotización ({selectedServices.length})
          </motion.button>

          <motion.button
            onClick={handleSolicitarCotizacion}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black rounded-full text-base font-bold shadow-2xl hover:scale-105 transition-transform z-50"
          >
            Solicitar ({selectedServices.length})
          </motion.button>

          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={clearSelection}
            className="fixed bottom-24 right-6 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full text-sm font-medium shadow-xl transition-colors z-50"
          >
            Limpiar selección
          </motion.button>
        </>
      )}

      {/* MODAL DE EXTRAS — igual que en Paquetes */}
      <AnimatePresence>
        {showExtrasModal && (() => {
          const extras = getExtrasDisponibles(selectedServices).filter(e => !e.id.startsWith('montajes-'));
          const viendoExtra = extras.find(e => e.id === extraExpandidoQuote);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => { setShowExtrasModal(false); setExtraExpandidoQuote(null); setExtrasQuoteIds([]); }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-900 rounded-2xl max-w-lg w-full border border-white/10 flex flex-col max-h-[88vh]"
              >
                {/* Header */}
                <div className="p-5 border-b border-white/10 flex-shrink-0 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">¿Quieres añadir algo más?</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Toca un servicio para ver detalles y añadirlo</p>
                  </div>
                  {extrasQuoteIds.length > 0 && (
                    <span className="flex-shrink-0 ml-3 text-xs bg-white text-black font-bold px-2.5 py-1 rounded-full">
                      +{extrasQuoteIds.length} extra{extrasQuoteIds.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {/* Contenido scrollable */}
                <div className="overflow-y-auto flex-1 p-4">
                  {extras.length === 0 ? (
                    <p className="text-zinc-500 text-center py-10 text-sm">Ya tienes todos los servicios disponibles.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {(() => {
                        const items = [];
                        for (let rowIdx = 0; rowIdx < Math.ceil(extras.length / 3); rowIdx++) {
                          const rowCards = extras.slice(rowIdx * 3, rowIdx * 3 + 3);
                          rowCards.forEach(extra => {
                            const isAdded = extrasQuoteIds.includes(extra.id);
                            const isViewing = extraExpandidoQuote === extra.id;
                            items.push(
                              <button
                                key={extra.id}
                                onClick={() => setExtraExpandidoQuote(isViewing ? null : extra.id)}
                                className={`relative aspect-square rounded-xl overflow-hidden transition-all ${isViewing ? 'ring-2 ring-white' : ''} ${isAdded ? 'ring-2 ring-green-400' : ''}`}
                              >
                                {extra.imagen
                                  ? <img src={extra.imagen} alt={extra.nombre} className="w-full h-full object-cover" />
                                  : <div className="w-full h-full bg-zinc-800" />
                                }
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                <p className="absolute bottom-0 left-0 right-0 px-2 pb-2 text-white text-[10px] font-semibold leading-tight text-left">{extra.nombre}</p>
                                {isAdded && (
                                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-black" />
                                  </div>
                                )}
                              </button>
                            );
                          });
                          const rowHasViewing = rowCards.some(e => e.id === extraExpandidoQuote);
                          if (rowHasViewing && viendoExtra) {
                            items.push(
                              <motion.div
                                key={`detail-${viendoExtra.id}`}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="col-span-3 p-4 bg-white/5 rounded-xl border border-white/10"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <p className="text-white font-semibold text-sm">{viendoExtra.nombre}</p>
                                  <button onClick={() => setExtraExpandidoQuote(null)} className="text-zinc-500 hover:text-white flex-shrink-0 ml-2">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                {viendoExtra.imagen && (
                                  <img src={viendoExtra.imagen} alt={viendoExtra.nombre} className="w-full h-28 object-cover rounded-lg mb-3" />
                                )}
                                <ul className="space-y-1.5 mb-4">
                                  {viendoExtra.incluye.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                                      <Check className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  onClick={() => setExtrasQuoteIds(prev =>
                                    prev.includes(viendoExtra.id)
                                      ? prev.filter(id => id !== viendoExtra.id)
                                      : [...prev, viendoExtra.id]
                                  )}
                                  className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${
                                    extrasQuoteIds.includes(viendoExtra.id)
                                      ? 'bg-white/10 border border-white/20 text-white hover:bg-white/5'
                                      : 'bg-white text-black hover:bg-zinc-200'
                                  }`}
                                >
                                  {extrasQuoteIds.includes(viendoExtra.id) ? '✓ Añadido — Quitar' : 'Añadir a la cotización'}
                                </button>
                              </motion.div>
                            );
                          }
                        }
                        return items;
                      })()}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 flex-shrink-0 space-y-2">
                  <button
                    onClick={handleContinuarCotizacion}
                    className="w-full py-4 bg-white hover:bg-zinc-200 text-black rounded-xl font-bold transition-colors"
                  >
                    {extrasQuoteIds.length > 0
                      ? `Continuar con ${extrasQuoteIds.length} extra${extrasQuoteIds.length > 1 ? 's' : ''}`
                      : 'Continuar sin añadir'}
                  </button>
                  <button
                    onClick={() => { setShowExtrasModal(false); setExtraExpandidoQuote(null); setExtrasQuoteIds([]); }}
                    className="w-full py-2.5 text-zinc-500 hover:text-white transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}

/* ==========================================
   SECCIÓN: OTROS SERVICIOS DISPONIBLES
   Diseño colapsable con 3 tarjetas
   ========================================== */

// COMPONENTE: Sección Colapsable
function SeccionCategoria({
  id,
  titulo,
  subtitulo,
  imagenHeader,
  children,
  isOpen,
  onToggle,
  isGroupExpanded = false,
  onToggleGroup = () => {}
}) {
  return (
    <GroupExpandedContext.Provider value={isGroupExpanded}>
      <div id={`section-${id}`} className="mb-16">
        <button
          onClick={onToggle}
          className="w-full group mb-8"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="relative h-56 md:h-64">
              <img
                src={imagenHeader}
                alt={titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-1">
                  {titulo}
                </h2>
                {subtitulo && (
                  <p className="text-sm text-white/80 font-medium mb-4 tracking-wide">{subtitulo}</p>
                )}

                <div className={`flex items-center gap-2 px-5 py-2 rounded-full border font-semibold text-sm transition-all ${isOpen ? 'bg-white text-black border-white' : 'bg-white/10 text-white border-white/30 group-hover:bg-white/20'}`}>
                  {isOpen ? 'Ocultar' : 'Ver servicios'}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {children}
              {/* Botón desktop-only para expandir todos — bottom center */}
              <div className="hidden md:flex justify-center mt-8">
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleGroup(); }}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                    isGroupExpanded
                      ? 'bg-white text-black border-white'
                      : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                  }`}
                >
                  {isGroupExpanded ? 'Ocultar detalles de todos' : 'Ver detalles de todos'}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isGroupExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GroupExpandedContext.Provider>
  );
}

// DATOS DE SERVICIOS ADICIONALES
const SERVICIOS_ADICIONALES = {
  grupoVivo: {
    nombre: "Grupo Musical en Vivo",
    subtitulo: "DJ Edy × Son Con Clase",
    imagen: "/grupoMusical.jpg",
    galeria: [
      "/grupoMusical.jpg",
      "/grupoMusical2.jpg"

    ],
    descripcion: "Una colaboración exclusiva entre DJ Edy y Son Con Clase. Entretenimiento musical profesional que combina grupo en vivo y DJ en un solo sistema de audio integrado.",
    caracteristicas: [
      {
        titulo: "Experiencia Completa",
        detalles: "1 hora para actos protocolares + 4 horas de música variada sin interrupciones"
      },
      {
        titulo: "Grupo + DJ Integrado",
        detalles: "Ensemble profesional con DJ Edy en un solo sistema de audio de alta calidad. 3 presentaciones musicales con recesos donde DJ Edy continúa la fiesta"
      },
      {
        titulo: "Shows Temáticos Variados",
        detalles: "Merengue, salsa, bachata, rock en español, ranchera, plena, reggaetón (Bad Bunny temático), 70's & 80's y batucada"
      },
      {
        titulo: "Producción Completa Incluida",
        detalles: "2 torres truss con moving heads, 6 luces de ambiente, DJ Booth iluminado con pantalla 55\", máquina de haze y efectos especiales"
      }
    ],
    incluye: [
      "Grupo musical profesional de 5-7 integrantes",
      "DJ en vivo durante todos los recesos",
      "Sistema de audio integrado de alta calidad",
      "2 torres truss con 2 moving heads",
      "6 luces de ambiente de batería",
      "DJ Booth iluminado profesional",
      "Pantalla 55\" en el DJ Booth",
      "Máquina de haze (sujeto a aprobación del venue)",
      "Interacción constante con invitados",
      "Coordinación completa del evento musical"
    ]
  },
  
  sonido: {
    nombre: "Sonido Profesional",
    imagen: "/sonido-service.jpg",
    galeria: [
      "/sonido-service.jpg",
      "/sonido-sistema-2.jpg",
      "/sonido-sistema-3.jpg",
      "/sonido-sistema-4.jpg"
    ],
    descripcion: "Sistemas de sonido profesional escalables para cualquier tipo de evento. Desde conferencias hasta grandes producciones al aire libre.",
    equipos: [
      {
        titulo: "Line Array",
        fotos: ["t8.jpg", "t8-2.jpg", "t8-3.jpg"],
        descripcion: "dB-Technologies T8 con bocinas de 8\", 6.5\" y drivers de 1\""
      },
      {
        titulo: "Subwoofers",
        fotos: ["sub1.jpg", "sub2.jpg", "sub3.jpg"],
        descripcion: "dB-Technologies S30 con doble bocina de 18\""
      },
      {
        titulo: "Consolas Digitales",
        fotos: ["dm7.jpg", "dm3.jpg", "midas.jpg"],
        descripcion: "Yamaha DM7, DM3, Midas M32, Behringer X32"
      }
    ],
    incluye: [
      "Line Array dB-Technologies T8",
      "Subwoofers S30",
      "Networking y control digital avanzado",
      "Micrófonos inalámbricos Shure & headsets",
      "In-ear monitoring",
      "Monitores de piso o en stand JBL PRX 12\"",
      "Rigging motorizado y manual",
      "Sistema eléctrico 3-fásico con distribuidor & cableado 000 profesional",
      "Ingenieros de sonido para equalización profesional",
      "Microfonería específica con stands para cada instrumento"
    ],
    sistemasRecomendados: [
      {
        titulo: "3 bocinas · 1 bajo por lado",
        subtitulo: "6 bocinas + 2 bajos en total",
        foto: "midas.jpg",
      },
      {
        titulo: "6 bocinas · 2 bajos por lado",
        subtitulo: "12 bocinas + 4 bajos en total",
        foto: "/sistema-sonido-md.jpg",
      },
      {
        titulo: "8 bocinas · 3 bajos por lado",
        subtitulo: "16 bocinas + 6 bajos en total",
        foto: "/sistema-sonido-lg.jpg",
      }
    ],
    complementos: [
      {
        titulo: "Monitores de Piso",
        foto: "/sonido-monitores.jpg",
        descripcion: "JBL PRX 12\" en escena — retorno para músicos y presentadores"
      },
      {
        titulo: "Microfonería & Instrumentos",
        foto: "/sonido-mics-instrumentos.jpg",
        descripcion: "Shure SM58/SM57 con stands individuales para cada vocalista e instrumento"
      },
      {
        titulo: "Distribución de corriente",
        foto: "/sonido-stands.jpg",
        descripcion: "Distribuidor de corriente tri-fásico con cableado 000 profesional"
      }
    ],
  },

  luces: {
    nombre: "Iluminación Profesional",
    imagen: "/iluminacion-service.jpg",
    galeria: [
      "/iluminacion-service.jpg",
      "/luces-sistema-2.jpg",
      "/luces-sistema-3.jpg",
      "/luces-sistema-4.jpg"
    ],
    descripcion: "Diseño de iluminación profesional para cualquier tipo de evento. Desde iluminación básica hasta producciones complejas con moving heads, láser y estructuras truss personalizadas.",
    equipos: [
      {
        titulo: "Moving Heads",
        fotos: ["/luces-moving-1.jpg", "/luces-moving-2.jpg", "/luces-moving-3.jpg"],
        descripcion: "30+ Moving Heads Wash, Beam/Spot/Gobo 700W"
      },
      {
        titulo: "Wash & Efectos",
        fotos: ["/luces-wash-1.jpg", "/luces-wash-2.jpg", "/luces-wash-3.jpg"],
        descripcion: "Chauvet Strike, luces waterproof, wash regulares"
      },
      {
        titulo: "Estructuras Truss",
        fotos: ["/luces-truss-1.jpg", "/luces-truss-2.jpg", "/luces-truss-3.jpg"],
        descripcion: "Arcos, arañas y sistemas de más de 50'"
      }
    ],
    incluye: [
      "Moving Heads Beam, Spot, Wash & Gobo",
      "30+ Moving Heads Wash",
      "Barras LED profesionales",
      "Sistemas láser",
      "Máquinas de haze",
      "Chauvet Strike",
      "Luces waterproof para exteriores",
      "Wash regulares",
      "Consola Chamsys",
      "Técnico de luces profesional",
      "Estructuras truss: arcos, arañas y sistemas de más de 50'"
    ]
  }
};


// DATOS: Paquetes por tipo de evento
// Cada servicio solo tiene { id, duracion? } — la info completa se resuelve desde SERVICIOS_DATA
const PAQUETES_POR_EVENTO = {
  bodas: {
    nombre: "Bodas",
    paquetes: [
      {
        id: "esencial",
        nombre: "ESENCIAL",
        servicios: [
          { id: "montajes-mediano" },
          { id: "pistas-blanca-12x12" },
          { id: "photobooth-360", duracion: "2 horas" },
          { id: "sonidoCeremonia-ceremonia" },
          { id: "lucesAmbiente-ambiente-10" },
          { id: "hora-loca" }
        ]
      },
      {
        id: "completo",
        nombre: "COMPLETO",
        destacado: true,
        servicios: [
          { id: "montajes-premium" },
          { id: "pistas-blanca-16x16" },
          { id: "photobooth-360", duracion: "3 horas" },
          { id: "sonidoCeremonia-ceremonia" },
          { id: "lucesAmbiente-ambiente-16" },
          { id: "hora-loca" },
          { id: "efectos-chispas" },
          { id: "animacion-coordinador" }
        ]
      },
      {
        id: "premium",
        nombre: "PREMIUM",
        servicios: [
          { id: "montajes-premium" },
          { id: "pistas-blanca-16x16" },
          { id: "photobooth-360", duracion: "3 horas" },
          { id: "sonidoCeremonia-ceremonia" },
          { id: "lucesAmbiente-ambiente-22" },
          { id: "hora-loca" },
          { id: "efectos-chispas" },
          { id: "animacion-coordinador" },
          { id: "animacion-batucada", duracion: "30 min" },
          { id: "animacion-mc" }
        ]
      }
    ]
  },

  quinceaneros: {
    nombre: "Quinceañeros",
    paquetes: [
      {
        id: "esencial",
        nombre: "ESENCIAL",
        servicios: [
          { id: "montajes-mediano" },
          { id: "pistas-blanca-12x12" },
          { id: "photobooth-360", duracion: "2 horas" },
          { id: "fotografia-profesional" },
          { id: "lucesAmbiente-ambiente-10" },
          { id: "hora-loca" }
        ]
      },
      {
        id: "completo",
        nombre: "COMPLETO",
        destacado: true,
        servicios: [
          { id: "montajes-premium" },
          { id: "pistas-blanca-16x16" },
          { id: "photobooth-360", duracion: "3 horas" },
          { id: "fotografia-profesional" },
          { id: "lucesAmbiente-ambiente-16" },
          { id: "hora-loca" },
          { id: "efectos-chispas" }
        ]
      },
      {
        id: "premium",
        nombre: "PREMIUM",
        servicios: [
          { id: "montajes-premium" },
          { id: "pistas-blanca-16x16" },
          { id: "photobooth-360", duracion: "3 horas" },
          { id: "fotografia-profesional" },
          { id: "lucesAmbiente-ambiente-22" },
          { id: "hora-loca" },
          { id: "efectos-chispas" },
          { id: "animacion-batucada", duracion: "30 min" },
          { id: "animacion-mc" }
        ]
      }
    ]
  },

  corporativos: {
    nombre: "Eventos Corporativos",
    paquetes: [
      {
        id: "esencial",
        nombre: "ESENCIAL",
        capacidad: "50-100 personas",
        servicios: [
          { id: "sonido-rcf" },
          { id: "pantallas-proyeccion" },
          { id: "mics-2" },
          { id: "tecnico" }
        ]
      },
      {
        id: "completo",
        nombre: "COMPLETO",
        destacado: true,
        capacidad: "100-300 personas",
        servicios: [
          { id: "sonido-15" },
          { id: "pantallas-led" },
          { id: "mics-4" },
          { id: "tecnico" },
          { id: "luces-wash" }

        ]
      },
      {
        id: "premium",
        nombre: "PREMIUM",
        capacidad: "300-500+ personas",
        servicios: [
          { id: "line-array" },
          { id: "pantallas-led" },
          { id: "mics-6" },
          { id: "tecnicos-2" },
          { id: "luces-pro" },
          { id: "pantallas-55" },
          { id: "tv-timer" }
          
          
        ]
      }
    ]
  },

  proms: {
    nombre: "Proms / Graduaciones",
    paquetes: [
      {
        id: "esencial",
        nombre: "ESENCIAL",
        servicios: [
          { id: "montaje-rcf" },
          { id: "pistas-blanca-12x12" },
          { id: "photobooth-360", duracion: "3 horas" },
          { id: "fotografia-profesional" },
          { id: "lucesAmbiente-ambiente-10" },
          { id: "hora-loca" }
        ]
      },
      {
        id: "completo",
        nombre: "COMPLETO",
        destacado: true,
        servicios: [
          { id: "sonido-15" },
          { id: "pistas-blanca-16x16" },
          { id: "photobooth-360", duracion: "3 horas" },
          { id: "fotografia-profesional" },
          { id: "lucesAmbiente-ambiente-16" },
          { id: "hora-loca" },
          { id: "efectos-chispas" },
          { id: "animacion-animador" },
          { id: "dj-famoso" }
          
        ]
      },
      {
        id: "premium",
        nombre: "PREMIUM",
        servicios: [
          
          { id: "line-array-full" },
          { id: "pistas-blanca-16x16" },
          { id: "photobooth-360", duracion: "3 horas" },
          { id: "foto-video" },
          { id: "lucesAmbiente-ambiente-22" },
          { id: "hora-loca" },
          { id: "efectos-full" },
          { id: "animacion-animador" },
          { id: "dj-grupo" },
          { id: "artista" },
          { id: "truss-moving" },
          { id: "lasers" },
          { id: "coordinacion" },
          { id: "letras-prom" },
          
          
        ]
      }
    ]
  },

  sociales: {
    nombre: "Eventos Sociales",
    descripcion: "Cumpleaños, Navidad, Fiestas",
    paquetes: [
      {
        id: "esencial",
        nombre: "ESENCIAL",
        servicios: [
          { id: "montajes-sencillo" },
          { id: "photobooth-estatico" },
          { id: "fotografia-profesional" },
          { id: "lucesAmbiente-ambiente-10" }
        ]
      },
      {
        id: "completo",
        nombre: "COMPLETO",
        destacado: true,
        servicios: [
          { id: "montajes-mediano" },
          { id: "photobooth-360", duracion: "2 horas" },
          { id: "fotografia-profesional" },
          { id: "lucesAmbiente-ambiente-10" },
          { id: "hora-loca" },
          { id: "pistas-blanca-12x12" }
        ]
      },
      {
        id: "premium",
        nombre: "PREMIUM",
        servicios: [
          { id: "montajes-premium" },
          { id: "photobooth-360", duracion: "3 horas" },
          { id: "fotografia-profesional" },
          { id: "lucesAmbiente-ambiente-16" },
          { id: "hora-loca" },
          { id: "pistas-blanca-16x16" },
          { id: "efectos-chispas" },
          { id: "animacion-mc" }
        ]
      }
    ]
  },

  otro: {
    nombre: "Otro Tipo de Evento",
    descripcion: "Personaliza según tus necesidades",
    paquetes: []
  }
};

// COMPONENTE: Sección de Paquetes
function SeccionPaquetes() {
  const [tipoEvento, setTipoEvento] = useState(null);
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);
  const [serviciosPersonalizados, setServiciosPersonalizados] = useState([]);
  const [servicioExpandido, setServicioExpandido] = useState(null);
  const [mostrarModalExtras, setMostrarModalExtras] = useState(false);
  const [paqueteParaCotizar, setPaqueteParaCotizar] = useState(null);
  const [extraExpandidoModal, setExtraExpandidoModal] = useState(null);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);


  const tiposEvento = [
  { id: "bodas", nombre: "Bodas" },
  { id: "quinceaneros", nombre: "Quinceañeros" },
  { id: "corporativos", nombre: "Corporativos" },
  { id: "proms", nombre: "Proms" },
  { id: "sociales", nombre: "Eventos Sociales" },
  { id: "otro", nombre: "Otro" }
];

  const seleccionarPaquete = (paquete) => {
    setPaqueteSeleccionado(paquete);
    setServiciosPersonalizados(paquete.servicios.map(s => ({ ...s, ...resolveServicioInfo(s) })));
  };

  const quitarServicio = (servicioId) => {
    setServiciosPersonalizados(serviciosPersonalizados.filter(s => s.id !== servicioId));
  };

  const serviciosDisponiblesParaAnadir = paqueteSeleccionado
    ? SERVICIOS_DATA // Necesitarías filtrar los que NO están ya en serviciosPersonalizados
    : [];

  return (
    <section id="paquetes" className="relative py-20 md:py-28 bg-zinc-950">
      {/* Borde superior decorativo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glow central sutil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* PASO 1: SELECTOR DE TIPO DE EVENTO */}
        {!tipoEvento && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            {/* Eyebrow */}
            <p className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase mb-6">
              — Nuestros Paquetes —
            </p>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-5">
              Paquetes Diseñados Para Ti
            </h2>
            <p className="text-lg text-zinc-400 mb-14 max-w-xl mx-auto">
              Selecciona tu tipo de evento para ver paquetes realizados por nosotros.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {tiposEvento.map((tipo) => (
                <motion.button
                  key={tipo.id}
                  onClick={() => setTipoEvento(tipo.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-5 px-6 rounded-2xl bg-transparent border-2 border-white/50 hover:bg-white hover:border-white text-white hover:text-black font-bold text-lg transition-all"
                >
                  {tipo.nombre}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* PASO 2: MOSTRAR PAQUETES */}
        {tipoEvento && !paqueteSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center mb-12">
              <button
                onClick={() => setTipoEvento(null)}
                className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-xl border-2 border-white/40 hover:border-white hover:bg-white hover:text-black text-white font-semibold transition-all"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Cambiar tipo de evento
              </button>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Paquetes para {PAQUETES_POR_EVENTO[tipoEvento].nombre}
              </h2>
              {PAQUETES_POR_EVENTO[tipoEvento].descripcion && (
                <p className="text-xl text-zinc-400">
                  {PAQUETES_POR_EVENTO[tipoEvento].descripcion}
                </p>
              )}
            </div>

            {/* Caso especial: "Otro" */}
            {tipoEvento === "otro" ? (
              <div className="text-center max-w-2xl mx-auto">
                <div className="p-12 rounded-2xl bg-white/5 border-2 border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    ¿Tienes algo específico en mente?
                  </h3>
                  <p className="text-zinc-400 mb-8">
                    Contáctanos y creamos un paquete personalizado para tu evento
                  </p>
                  

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola, necesito un paquete personalizado para mi evento`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
) : (
              <>
                {/* Paquetes en grid horizontal: 3 columnas desktop, 1 mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PAQUETES_POR_EVENTO[tipoEvento].paquetes.map((paquete, idx) => (
                      <motion.div
                        key={paquete.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`rounded-2xl overflow-hidden bg-white/5 border-2 flex flex-col ${
                          paquete.destacado ? 'border-white/30 ring-4 ring-white/10' : 'border-white/10'
                        }`}
                      >
                        {/* Badge strip — igual altura en todas las tarjetas */}
                        <div className="h-9 flex items-center justify-center border-b border-white/10 bg-black/20">
                          {paquete.destacado && (
                            <span className="px-3 py-0.5 rounded-full bg-white/15 border border-white/30 text-xs font-bold text-white tracking-widest">
                              MÁS POPULAR
                            </span>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                          {/* Header */}
                          <div className="mb-6">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                              {paquete.nombre}
                            </h3>
                            {paquete.capacidad && (
                              <p className="text-sm text-zinc-400 mt-1">{paquete.capacidad}</p>
                            )}
                          </div>

                          {/* Servicios expandibles */}
                          <div className="space-y-3 mb-6 flex-1">
                            {paquete.servicios.map((servicio) => {
                              const resolved = resolveServicioInfo(servicio);
                              const servicioExpandidoId = `${paquete.id}-${servicio.id}`;
                              const isExpanded = servicioExpandido === servicioExpandidoId;

                              return (
                                <div
                                  key={`${paquete.id}-${servicio.id}-${servicio.duracion || ''}`}
                                  className="rounded-xl overflow-hidden bg-white/5 border-2 border-white/10"
                                >
                                  {/* Tarjeta clickeable */}
                                  <button
                                    onClick={() => setServicioExpandido(isExpanded ? null : servicioExpandidoId)}
                                    className="w-full relative h-16 overflow-hidden group"
                                  >
                                    {resolved.imagen && (
                                      <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${resolved.imagen})` }}
                                      />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

                                    <div className="relative h-full flex items-center justify-between px-4">
                                      <h4 className="text-white font-bold text-sm text-left leading-tight">
                                        {resolved.nombre}
                                      </h4>
                                      <ChevronDown
                                        className={`w-4 h-4 text-white flex-shrink-0 ml-2 transition-transform ${
                                          isExpanded ? 'rotate-180' : ''
                                        }`}
                                      />
                                    </div>
                                  </button>

                                  {/* Info expandida */}
                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden border-t border-white/10"
                                      >
                                        <div className="p-4 bg-black/40">
                                          {resolved.imagen && (
                                            <img
                                              src={resolved.imagen}
                                              alt={resolved.nombre}
                                              className="w-full h-40 rounded-xl object-cover mb-4"
                                            />
                                          )}
                                          <p className="text-xs text-zinc-500 mb-2 font-medium">INCLUYE:</p>
                                          <ul className="space-y-1.5">
                                            {(resolved.incluye || []).map((item, i) => (
                                              <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                                                <Check className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>

                          {/* Botón cotizar al fondo */}
                          <button
                            onClick={() => {
                              setPaqueteParaCotizar(paquete);
                              setMostrarModalExtras(true);
                            }}
                            className="w-full py-4 rounded-xl font-bold transition-all mt-auto bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white"
                          >
                            Cotizar paquete {paquete.nombre}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                {/* MODAL DE EXTRAS */}
                <AnimatePresence>
                  {mostrarModalExtras && paqueteParaCotizar && (() => {
                    const extras = getExtrasDisponibles(paqueteParaCotizar.servicios)
                      .filter(e => !e.id.startsWith('montajes-'));
                    const viendoExtra = extras.find(e => e.id === extraExpandidoModal);

                    const handleCotizar = () => {
                      const packageServices = paqueteParaCotizar.servicios.map(s => {
                        const info = resolveServicioInfo(s);
                        return { id: s.id, categoryId: s.id.split('-')[0], nombre: info.nombre, precio: getPrecio(s.id, s.duracion), duracion: s.duracion || null };
                      });
                      const extraServices = extrasSeleccionados.map(id => {
                        const ext = TODOS_SERVICIOS_FLAT.find(e => e.id === id);
                        return { id, categoryId: id.split('-')[0], nombre: ext?.nombre || id, precio: getPrecio(id, null) };
                      });
                      localStorage.setItem('selectedServices', JSON.stringify([...packageServices, ...extraServices]));
                      setMostrarModalExtras(false);
                      setExtraExpandidoModal(null);
                      setExtrasSeleccionados([]);
                      window.location.hash = '#formulario-cotizacion';
                    };

                    const cerrarModal = () => {
                      setMostrarModalExtras(false);
                      setExtraExpandidoModal(null);
                      setExtrasSeleccionados([]);
                    };

                    return (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={cerrarModal}
                      >
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          onClick={(e) => e.stopPropagation()}
                          className="bg-zinc-900 rounded-2xl max-w-lg w-full border border-white/10 flex flex-col max-h-[88vh]"
                        >
                          {/* Header */}
                          <div className="p-5 border-b border-white/10 flex-shrink-0 flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-white">
                                Paquete {paqueteParaCotizar.nombre}
                              </h3>
                              <p className="text-xs text-zinc-500 mt-0.5">
                                Toca un servicio para ver detalles y añadirlo
                              </p>
                            </div>
                            {extrasSeleccionados.length > 0 && (
                              <span className="flex-shrink-0 ml-3 text-xs bg-white text-black font-bold px-2.5 py-1 rounded-full">
                                +{extrasSeleccionados.length} extra{extrasSeleccionados.length > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>

                          {/* Contenido scrollable */}
                          <div className="overflow-y-auto flex-1 p-4">
                            {extras.length === 0 ? (
                              <p className="text-zinc-500 text-center py-10 text-sm">
                                Tu paquete ya incluye todos los servicios disponibles.
                              </p>
                            ) : (
                              /* Grid con panel de detalle inline debajo de la fila seleccionada */
                              <div className="grid grid-cols-3 gap-2">
                                {(() => {
                                  const items = [];
                                  for (let rowIdx = 0; rowIdx < Math.ceil(extras.length / 3); rowIdx++) {
                                    const rowCards = extras.slice(rowIdx * 3, rowIdx * 3 + 3);
                                    // Tarjetas de esta fila
                                    rowCards.forEach(extra => {
                                      const isAdded = extrasSeleccionados.includes(extra.id);
                                      const isViewing = extraExpandidoModal === extra.id;
                                      items.push(
                                        <button
                                          key={extra.id}
                                          onClick={() => setExtraExpandidoModal(isViewing ? null : extra.id)}
                                          className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                                            isViewing ? 'ring-2 ring-white' : ''
                                          } ${isAdded ? 'ring-2 ring-green-400' : ''}`}
                                        >
                                          {extra.imagen
                                            ? <img src={extra.imagen} alt={extra.nombre} className="w-full h-full object-cover" />
                                            : <div className="w-full h-full bg-zinc-800" />
                                          }
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                          <p className="absolute bottom-0 left-0 right-0 px-2 pb-2 text-white text-[10px] font-semibold leading-tight text-left">
                                            {extra.nombre}
                                          </p>
                                          {isAdded && (
                                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                                              <Check className="w-3 h-3 text-black" />
                                            </div>
                                          )}
                                        </button>
                                      );
                                    });
                                    // Panel de detalle inline si esta fila tiene la tarjeta seleccionada
                                    const rowHasViewing = rowCards.some(e => e.id === extraExpandidoModal);
                                    if (rowHasViewing && viendoExtra) {
                                      items.push(
                                        <motion.div
                                          key={`detail-${viendoExtra.id}`}
                                          initial={{ opacity: 0, y: -6 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className="col-span-3 p-4 bg-white/5 rounded-xl border border-white/10"
                                        >
                                          <div className="flex items-start justify-between mb-3">
                                            <p className="text-white font-semibold text-sm">{viendoExtra.nombre}</p>
                                            <button onClick={() => setExtraExpandidoModal(null)} className="text-zinc-500 hover:text-white flex-shrink-0 ml-2">
                                              <X className="w-4 h-4" />
                                            </button>
                                          </div>
                                          {viendoExtra.imagen && (
                                            <img src={viendoExtra.imagen} alt={viendoExtra.nombre} className="w-full h-28 object-cover rounded-lg mb-3" />
                                          )}
                                          <ul className="space-y-1.5 mb-4">
                                            {viendoExtra.incluye.map((item, i) => (
                                              <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                                                <Check className="w-3.5 h-3.5 text-white mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                              </li>
                                            ))}
                                          </ul>
                                          <button
                                            onClick={() => setExtrasSeleccionados(prev =>
                                              prev.includes(viendoExtra.id)
                                                ? prev.filter(id => id !== viendoExtra.id)
                                                : [...prev, viendoExtra.id]
                                            )}
                                            className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${
                                              extrasSeleccionados.includes(viendoExtra.id)
                                                ? 'bg-white/10 border border-white/20 text-white hover:bg-white/5'
                                                : 'bg-white text-black hover:bg-zinc-200'
                                            }`}
                                          >
                                            {extrasSeleccionados.includes(viendoExtra.id) ? '✓ Añadido — Quitar' : 'Añadir a la cotización'}
                                          </button>
                                        </motion.div>
                                      );
                                    }
                                  }
                                  return items;
                                })()}
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="p-4 border-t border-white/10 flex-shrink-0 space-y-2">
                            <button
                              onClick={handleCotizar}
                              className="w-full py-4 bg-white hover:bg-zinc-200 text-black rounded-xl font-bold transition-colors"
                            >
                              {extrasSeleccionados.length > 0
                                ? `Cotizar ${paqueteParaCotizar.nombre} + ${extrasSeleccionados.length} extra${extrasSeleccionados.length > 1 ? 's' : ''}`
                                : `Cotizar paquete ${paqueteParaCotizar.nombre}`}
                            </button>
                            <button
                              onClick={cerrarModal}
                              className="w-full py-2.5 text-zinc-500 hover:text-white transition-colors text-sm"
                            >
                              Cancelar
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        )}

          </div>
        </section>
      );
    }


// COMPONENTE: Sección de Otros Servicios
function OtrosServiciosDisponibles() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCards, setExpandedCards] = useState({ grupoVivo: false, sonido: false, luces: false });
  const [slides, setSlides] = useState({ grupoVivo: 0, sonido: 0, luces: 0 });

  const toggleCard = (key) => setExpandedCards(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const timers = [
      setInterval(() => setSlides(p => ({ ...p, grupoVivo: (p.grupoVivo + 1) % SERVICIOS_ADICIONALES.grupoVivo.galeria.length })), 4000),
      setInterval(() => setSlides(p => ({ ...p, sonido: (p.sonido + 1) % SERVICIOS_ADICIONALES.sonido.galeria.length })), 4300),
      setInterval(() => setSlides(p => ({ ...p, luces: (p.luces + 1) % SERVICIOS_ADICIONALES.luces.galeria.length })), 3700),
    ];
    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <section id="otros-servicios" className="relative py-20 md:py-28 bg-zinc-900">
      {/* Borde superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Patrón diagonal sutil */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
        backgroundSize: '24px 24px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* HEADER: eyebrow + título encima, imagen debajo como banner clickeable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          {/* Eyebrow + título fuera de la imagen */}
          <div className="text-center mb-6">
            <p className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase mb-4">
              — También Disponible —
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Producción &amp; Entretenimiento
            </h2>
          </div>

          {/* Banner imagen colapsable */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full group"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <div className="relative h-48 md:h-64">
                <img
                  src="/otrosServicios.jpg"
                  alt="Producción y Entretenimiento"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="flex items-center justify-between gap-4 px-6 py-4 bg-black/40 backdrop-blur-sm">
                <p className="text-white text-lg md:text-xl font-bold tracking-wide text-left">
                  Grupo Musical en Vivo · Sonido Line Array · Iluminación Moving Heads
                </p>
                <div className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/40 text-white text-sm font-semibold group-hover:bg-white group-hover:text-black transition-all">
                  {isExpanded ? 'Ver menos' : 'Ver servicios'}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          </button>
        </motion.div>

        {/* CONTENIDO EXPANDIBLE */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-12 pb-12">
                
                {/* GRUPO MUSICAL */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, boxShadow: '0 24px 48px rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.25)' }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 30 }}
                  className="rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border-2 border-white/10"
                >
                  {/* GALERÍA PRINCIPAL */}
                  <button onClick={() => toggleCard('grupoVivo')} className="relative h-[28rem] overflow-hidden w-full block cursor-pointer">
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={slides.grupoVivo}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        src={SERVICIOS_ADICIONALES.grupoVivo.galeria[slides.grupoVivo]}
                        alt="Grupo Musical"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-3 left-0 right-0 flex justify-center gap-1 z-20 pointer-events-none">
                      {SERVICIOS_ADICIONALES.grupoVivo.galeria.map((_, i) => (
                        <div key={i} className={`rounded-full bg-white transition-all duration-300 ${i === slides.grupoVivo ? 'w-4 h-1.5 opacity-90' : 'w-1.5 h-1.5 opacity-35'}`} />
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-20 pointer-events-none flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{SERVICIOS_ADICIONALES.grupoVivo.nombre}</h3>
                        <p className="text-sm text-zinc-300">{SERVICIOS_ADICIONALES.grupoVivo.subtitulo}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold backdrop-blur-sm whitespace-nowrap flex-shrink-0 transition-all ${expandedCards.grupoVivo ? 'bg-white text-black border-white' : 'bg-black/40 border-white/40 text-white'}`}>
                        {expandedCards.grupoVivo ? 'Ocultar' : 'Ver info'}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${expandedCards.grupoVivo ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedCards.grupoVivo && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-black/40">
                          <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                            {SERVICIOS_ADICIONALES.grupoVivo.descripcion}
                          </p>

                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {SERVICIOS_ADICIONALES.grupoVivo.caracteristicas.map((item, idx) => (
                              <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-white font-semibold text-xs mb-1">{item.titulo}</p>
                                <p className="text-zinc-400 text-xs leading-snug">{item.detalles}</p>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 rounded-xl bg-white/5 mb-4">
                            <p className="text-xs text-zinc-400 mb-3 font-medium">INCLUYE:</p>
                            <ul className="grid md:grid-cols-2 gap-2 text-sm text-zinc-300">
                              {SERVICIOS_ADICIONALES.grupoVivo.incluye.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola, me interesa información sobre Grupo Musical en Vivo`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 rounded-xl text-center font-bold bg-green-600 hover:bg-green-700 text-white transition-colors mb-2"
                          >
                            Consultar por WhatsApp
                          </a>
                          <a
                            href={`tel:+1${WHATSAPP_NUMBER}`}
                            className="block w-full py-3 rounded-xl text-center font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                          >
                            Llamar ahora
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* SONIDO PROFESIONAL */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, boxShadow: '0 24px 48px rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.25)' }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
                  className="rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border-2 border-white/10"
                >
                  {/* GALERÍA PRINCIPAL */}
                  <button onClick={() => toggleCard('sonido')} className="relative h-[28rem] overflow-hidden w-full block cursor-pointer">
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={slides.sonido}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        src={SERVICIOS_ADICIONALES.sonido.galeria[slides.sonido]}
                        alt="Sonido Profesional"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-3 left-0 right-0 flex justify-center gap-1 z-20 pointer-events-none">
                      {SERVICIOS_ADICIONALES.sonido.galeria.map((_, i) => (
                        <div key={i} className={`rounded-full bg-white transition-all duration-300 ${i === slides.sonido ? 'w-4 h-1.5 opacity-90' : 'w-1.5 h-1.5 opacity-35'}`} />
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-20 pointer-events-none flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{SERVICIOS_ADICIONALES.sonido.nombre}</h3>
                        <p className="text-sm text-zinc-300">{SERVICIOS_ADICIONALES.sonido.subtitulo}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold backdrop-blur-sm whitespace-nowrap flex-shrink-0 transition-all ${expandedCards.sonido ? 'bg-white text-black border-white' : 'bg-black/40 border-white/40 text-white'}`}>
                        {expandedCards.sonido ? 'Ocultar' : 'Ver info'}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${expandedCards.sonido ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedCards.sonido && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-8 bg-black/40">
                          <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                            {SERVICIOS_ADICIONALES.sonido.descripcion}
                          </p>

                          <div className="mb-8">
                            <h4 className="text-white font-bold text-xl mb-4">Equipos Profesionales</h4>
                            <div className="grid md:grid-cols-3 gap-6">
                              {SERVICIOS_ADICIONALES.sonido.equipos.map((equipo, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                  <GaleriaAutoSlide
                                    fotos={equipo.fotos}
                                    intervalo={3000 + idx * 400}
                                    className="rounded-none h-64"
                                  />
                                  <div className="p-4">
                                    <h5 className="text-white font-semibold mb-1">{equipo.titulo}</h5>
                                    <p className="text-zinc-400 text-sm">{equipo.descripcion}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mb-8">
                            <h4 className="text-white font-bold text-xl mb-4">Sistemas Recomendados</h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              {SERVICIOS_ADICIONALES.sonido.sistemasRecomendados.map((sistema, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                  <div className="h-48 overflow-hidden bg-black">
                                    <img
                                      src={sistema.foto}
                                      alt={sistema.titulo}
                                      className="w-full h-full object-cover"
                                      onError={e => { e.currentTarget.style.display = 'none'; }}
                                    />
                                  </div>
                                  <div className="p-4">
                                    <h5 className="text-white font-semibold mb-0.5">{sistema.titulo}</h5>
                                    <p className="text-xs text-white/50 font-medium mb-2">{sistema.subtitulo}</p>
                                    <p className="text-zinc-400 text-sm leading-snug">{sistema.descripcion}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mb-8">
                            <div className="grid md:grid-cols-3 gap-4">
                              {SERVICIOS_ADICIONALES.sonido.complementos.map((comp, idx) => (
                                <div key={idx} className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                  <div className="h-40 overflow-hidden bg-black">
                                    <img
                                      src={comp.foto}
                                      alt={comp.titulo}
                                      className="w-full h-full object-cover"
                                      onError={e => { e.currentTarget.style.display = 'none'; }}
                                    />
                                  </div>
                                  <div className="p-4">
                                    <h5 className="text-white font-semibold mb-1">{comp.titulo}</h5>
                                    <p className="text-zinc-400 text-sm leading-snug">{comp.descripcion}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-6 rounded-xl bg-white/5 mb-8">
                            <p className="text-sm text-zinc-400 mb-4 font-medium">INCLUYE:</p>
                            <ul className="grid md:grid-cols-2 gap-3 text-sm text-zinc-300">
                              {SERVICIOS_ADICIONALES.sonido.incluye.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola, me interesa información sobre Sonido Profesional`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 rounded-xl text-center font-bold bg-green-600 hover:bg-green-700 text-white transition-colors mb-2"
                          >
                            Consultar por WhatsApp
                          </a>
                          <a
                            href={`tel:+1${WHATSAPP_NUMBER}`}
                            className="block w-full py-3 rounded-xl text-center font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                          >
                            Llamar ahora
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* ILUMINACIÓN PROFESIONAL */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, boxShadow: '0 24px 48px rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.25)' }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                  className="rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border-2 border-white/10"
                >
                  <button onClick={() => toggleCard('luces')} className="relative h-[28rem] overflow-hidden w-full block cursor-pointer">
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={slides.luces}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        src={SERVICIOS_ADICIONALES.luces.galeria[slides.luces]}
                        alt="Iluminación Profesional"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-3 left-0 right-0 flex justify-center gap-1 z-20 pointer-events-none">
                      {SERVICIOS_ADICIONALES.luces.galeria.map((_, i) => (
                        <div key={i} className={`rounded-full bg-white transition-all duration-300 ${i === slides.luces ? 'w-4 h-1.5 opacity-90' : 'w-1.5 h-1.5 opacity-35'}`} />
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-20 pointer-events-none flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{SERVICIOS_ADICIONALES.luces.nombre}</h3>
                        <p className="text-sm text-zinc-300">{SERVICIOS_ADICIONALES.luces.subtitulo}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-semibold backdrop-blur-sm whitespace-nowrap flex-shrink-0 transition-all ${expandedCards.luces ? 'bg-white text-black border-white' : 'bg-black/40 border-white/40 text-white'}`}>
                        {expandedCards.luces ? 'Ocultar' : 'Ver info'}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${expandedCards.luces ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedCards.luces && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-8 bg-black/40">
                          <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                            {SERVICIOS_ADICIONALES.luces.descripcion}
                          </p>

                          <div className="mb-8">
                            <h4 className="text-white font-bold text-xl mb-6">Equipos Profesionales</h4>
                            <div className="grid md:grid-cols-3 gap-6">
                              {SERVICIOS_ADICIONALES.luces.equipos.map((equipo, idx) => (
                                <div key={idx} className="p-5 rounded-xl bg-white/5 border border-white/10">
                                  <div className="grid grid-cols-3 gap-2 mb-4">
                                    {equipo.fotos.map((foto, fIdx) => (
                                      <div key={fIdx} className="aspect-square rounded-lg overflow-hidden bg-white/5">
                                        <img src={foto} alt={equipo.titulo} className="w-full h-full object-cover" />
                                      </div>
                                    ))}
                                  </div>
                                  <h5 className="text-white font-semibold mb-2">{equipo.titulo}</h5>
                                  <p className="text-zinc-400 text-sm">{equipo.descripcion}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-6 rounded-xl bg-white/5 mb-8">
                            <p className="text-sm text-zinc-400 mb-4 font-medium">INCLUYE:</p>
                            <ul className="grid md:grid-cols-2 gap-3 text-sm text-zinc-300">
                              {SERVICIOS_ADICIONALES.luces.incluye.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola, me interesa información sobre Iluminación Profesional`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 rounded-xl text-center font-bold bg-green-600 hover:bg-green-700 text-white transition-colors mb-2"
                          >
                            Consultar por WhatsApp
                          </a>
                          <a
                            href={`tel:+1${WHATSAPP_NUMBER}`}
                            className="block w-full py-3 rounded-xl text-center font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors"
                          >
                            Llamar ahora
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}


/* =========================
   COTIZACIÓN PDF (vista para DJ Edy)
   ========================= */
function CotizacionPDFPage() {
  const [data, setData] = useState(null);
  const [generando, setGenerando] = useState(false);
  const [generado, setGenerado] = useState(false);

  useEffect(() => {
    try {
      const hashParts = window.location.hash.split('/');
      const raw = hashParts[1];
      if (raw) {
        const b64 = raw.replace(/-/g, '+').replace(/_/g, '/');
        const padded = b64 + '=='.slice(0, (4 - b64.length % 4) % 4);
        const parsed = JSON.parse(decodeURIComponent(atob(padded)));
        setData(parsed);
      }
    } catch {
      setData(null);
    }
  }, []);

  const descargarPDF = () => {
    if (!data) return;
    setGenerando(true);

    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = doc.internal.pageSize.getWidth();
    let y = 0;

    // Fondo blanco
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, W, 297, 'F');

    // Franja header negra
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, W, 36, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('DJ EDY', 14, 20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 180);
    doc.text('Producción & Entretenimiento  |  www.djedypr.com  |  787-356-8786', 14, 29);

    const hoy = new Date().toLocaleDateString('es-PR', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.setTextColor(180, 180, 180);
    doc.setFontSize(8);
    doc.text(hoy, W - 14, 29, { align: 'right' });

    y = 52;

    // Título
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('PROPUESTA DE COTIZACIÓN', 14, y);
    y += 4;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, y, W - 14, y);
    y += 10;

    // --- Cliente ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('DATOS DEL CLIENTE', 14, y);
    y += 6;

    const fila = (label, val) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(label, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(val, 55, y);
      y += 7;
    };

    fila('Nombre:', data.nombre);
    fila('WhatsApp:', data.whatsapp);
    if (data.email) fila('Email:', data.email);
    y += 2;

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.2);
    doc.line(14, y, W - 14, y);
    y += 8;

    // --- Evento ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('DETALLES DEL EVENTO', 14, y);
    y += 6;

    fila('Fecha:', data.fecha || 'Por confirmar');
    fila('Invitados:', data.personas ? `${data.personas} personas` : 'Por confirmar');
    fila('Lugar:', data.lugar || 'Por confirmar');
    y += 2;

    doc.setDrawColor(220, 220, 220);
    doc.line(14, y, W - 14, y);
    y += 8;

    // --- Servicios ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('SERVICIOS INCLUIDOS', 14, y);
    y += 7;

    const serviciosList = data.servicios || [];
    let totalPDF = 0;
    serviciosList.forEach(s => {
      const nombre = typeof s === 'string' ? s : s.nombre;
      const precio = typeof s === 'object' ? (s.precio || 0) : 0;
      if (precio > 0) totalPDF += precio;
      doc.setFillColor(0, 0, 0);
      doc.circle(17, y - 1.5, 1.2, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(nombre, 22, y);
      if (precio > 0) {
        doc.setFont('helvetica', 'bold');
        doc.text(`$${precio.toLocaleString()}`, W - 14, y, { align: 'right' });
      }
      y += 7;
      if (y > 265) { doc.addPage(); y = 20; }
    });

    y += 4;
    doc.setDrawColor(220, 220, 220);
    doc.line(14, y, W - 14, y);
    y += 8;

    // --- Total ---
    const totalFinal = data.total || (totalPDF > 0 ? `$${totalPDF.toLocaleString()}` : 'Por cotización');
    doc.setFillColor(0, 0, 0);
    doc.roundedRect(14, y, W - 28, 20, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text('TOTAL ESTIMADO', 24, y + 8);
    doc.setFontSize(14);
    doc.text(totalFinal, W - 24, y + 9, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text('Sujeto a disponibilidad · Válido por 7 días', W / 2, y + 16, { align: 'center' });
    y += 28;

    // --- Footer ---
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 275, W, 22, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text('DJ EDY  |  djedypr@gmail.com  |  787-356-8786  |  www.djedypr.com', W / 2, 286, { align: 'center' });

    doc.save(`Cotizacion_DJEDY_${data.nombre.replace(/\s+/g, '_')}.pdf`);
    setGenerando(false);
    setGenerado(true);
  };

  if (!data) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">Link inválido o datos no encontrados.</p>
          <a href="#home" className="text-white underline text-sm">Ir al inicio</a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase mb-4">— Cotización lista —</p>
        <h1 className="text-4xl font-bold text-white mb-8">Propuesta para {data.nombre}</h1>

        {/* Preview */}
        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-zinc-500">WhatsApp</span><p className="text-white font-semibold mt-0.5">{data.whatsapp}</p></div>
            {data.email && <div><span className="text-zinc-500">Email</span><p className="text-white font-semibold mt-0.5">{data.email}</p></div>}
            <div><span className="text-zinc-500">Fecha</span><p className="text-white font-semibold mt-0.5">{data.fecha || '—'}</p></div>
            <div><span className="text-zinc-500">Personas</span><p className="text-white font-semibold mt-0.5">{data.personas || '—'}</p></div>
            <div className="col-span-2"><span className="text-zinc-500">Lugar</span><p className="text-white font-semibold mt-0.5">{data.lugar || '—'}</p></div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">Servicios</p>
            <ul className="space-y-1.5">
              {(data.servicios || []).map((s, i) => {
                const nombre = typeof s === 'string' ? s : s.nombre;
                const precio = typeof s === 'object' ? (s.precio || 0) : 0;
                return (
                  <li key={i} className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />{nombre}
                    </div>
                    {precio > 0 && <span className="text-zinc-400 font-medium">${precio.toLocaleString()}</span>}
                  </li>
                );
              })}
            </ul>
            {data.total && (
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Total estimado</span>
                <span className="text-lg font-bold text-white">{data.total}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={descargarPDF}
          disabled={generando}
          className="w-full flex items-center justify-center gap-2.5 py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {generando ? 'Generando...' : generado ? '✓ PDF descargado' : 'Descargar PDF de cotización'}
        </button>

        {generado && (
          <p className="text-center text-zinc-500 text-sm mt-4">
            Ahora envíalo al cliente por WhatsApp al <span className="text-white font-semibold">{data.whatsapp}</span> o por email a <span className="text-white font-semibold">{data.email || '—'}</span>.
          </p>
        )}
      </div>
    </section>
  );
}


/* =========================
   APP (control de "pantallas")
   ========================= */
export default function App() {
  const hash = useHash();
  const showQuote = hash === "#cotizar";
  const showFormulario = hash === "#formulario-cotizacion";
  const showCotizacionPDF = hash.startsWith("#cotizacion-pdf");

  const PAGE_HASHES = new Set(["#cotizar", "#formulario-cotizacion"]);
  React.useEffect(() => {
    if (PAGE_HASHES.has(hash) || hash.startsWith("#cotizacion-pdf/") || hash === "#cotizacion-pdf") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-black text-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
              html { scroll-behavior: smooth; }
              @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
            `,
        }}
      />

      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-20 bg-cyan-400" />
        <div className="absolute top-1/2 -right-20 w-[35vw] h-[35vw] rounded-full blur-3xl opacity-20 bg-fuchsia-500" />
      </div>

      <Navbar />

      {showCotizacionPDF ? (
        <>
          <CotizacionPDFPage />
          <Footer />
        </>
      ) : showQuote ? (
        <>
          <section className="pt-28 pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => {
                  if (window.history.length > 1) window.history.back();
                  else window.location.hash = "#home";
                }}
                className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-black hover:bg-white rounded-full px-3 py-2 border border-white/10 hover:border-white transition-colors"
                aria-label="Volver"
              >
                <ArrowLeft className="w-4 h-4" /> Atrás
              </button>
            </div>
          </section>

          <QuoteFlow />
          <Footer />
        </>

      ) : showFormulario ? (
        /* ===== Sub-pantalla: FORMULARIO COTIZACIÓN ===== */
        <>
          <FormularioCotizacion 
            selectedServices={JSON.parse(localStorage.getItem('selectedServices') || '[]')}
          />
          <Footer />
        </>  

      ) : (
        <>
          <Hero />
          <QuoteFlow />
          <SeccionPaquetes />
          <OtrosServiciosDisponibles />
          <Testimonials />
          <Contact />
          <Footer />

        </>
      )}
    </div>
  );
}
