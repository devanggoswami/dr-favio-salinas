// Atelier Clínico & Logic for Dr. Favio Salinas G.
// High-End Editorial Urology Experience with Real Medical Simulators & 100% Comprehensive Bilingual Engine

let currentLang = 'es';
let currentHolepGrams = 75;
let currentMatrixFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  // Load persisted language preference if present
  try {
    const savedLang = localStorage.getItem('dr_favio_lang');
    if (savedLang === 'en' || savedLang === 'es') {
      currentLang = savedLang;
    }
  } catch (e) {
    console.warn(e);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  initClinicClock();
  initLanguageEngine();
  initHolepSimulator();
  initSurgicalStepsWalkthrough();
  initClinicalIntakeSlip();
  initDemographicMatrix();
  initCrossBorderTabs();
  initBookingModal();
  initMobileNav();

  // Apply initial language across entire DOM
  applyLanguage(currentLang);
});

// Comprehensive Bilingual Dictionary
const i18nDictionary = {
  es: {
    // Top Bar & Navigation
    status_open: "Consultorio Abierto • Citas Disponibles",
    status_closed: "Fuera de Horario • Recepción WhatsApp 24/7",
    top_council: "Consejo Nal. Mex. de Urología A.C.",
    top_corridor: "Nuevo Laredo, Tamps. (Corredor Binacional)",
    brand_role: "Cirujano Urólogo • Especialista Certificado",
    nav_about: "Perfil Profesional",
    nav_matrix: "Especialidades Clínicas",
    nav_holep: "Tecnología HoLEP",
    nav_intake: "Papeleta de Consulta",
    nav_border: "Pacientes Binacionales (USA)",
    nav_contact: "Consultorio",
    nav_quick_book: "Agendar Consulta",
    mobile_lang_label: "Idioma / Language",
    wp_direct: "WhatsApp Directo",

    // Hero Section
    hero_label: "CONSEJO NACIONAL MEXICANO DE UROLOGÍA A.C. • CERTIFICADO OFICIAL",
    hero_title: `Cirugía Urológica de <span class="italic font-normal text-teal">Mínima Invasión</span> & Tecnología Láser HoLEP`,
    hero_subtitle: `Práctica urológica privada de alta especialidad a cargo del <strong>Dr. Favio Salinas G.</strong> Cuidado vanguardista, ético y sin cortes externos para padecimientos de riñón, vejiga y próstata en Nuevo Laredo.`,
    cedula_title: "Cédulas Profesionales Registradas ante la SEP",
    cedula_1_label: "Médico Cirujano",
    cedula_2_label: "Esp. en Urología",
    cedula_3_label: "Certificación Nal.",
    hero_btn_intake: "Generar Papeleta de Cita",
    hero_btn_holep: "Ver Protocolo HoLEP Láser",

    // Atelier Card
    atelier_title: "Atelier Quirúrgico",
    atelier_city: "Nuevo Laredo, México",
    doctor_name_role: "Cirujano Urólogo de Alta Especialidad",
    atelier_mission: `"Nuestra misión es brindar un servicio personalizado con alta calidad médica para el tratamiento y prevención de padecimientos urológicos en un entorno sereno, digno y de total confidencialidad."`,
    cap_holep: "Láser HoLEP de Próstata",
    cap_holep_badge: "Gold Standard",
    cap_stones: "Litiasis Renal Flexible (RIRS)",
    cap_stones_badge: "Sin Incisión",
    cap_robotics: "Cirugía Robótica y Laparoscopía",
    cap_robotics_badge: "Mínima Invasión",
    tel_label: "Tel: 867 714 4361",

    // Simulator Section
    sim_tag: "SIMULADOR QUIRÚRGICO DE PRÓSTATA • EVIDENCIA CLÍNICA",
    sim_title: "¿Por qué el Láser HoLEP es el Gold Standard Mundial?",
    sim_desc: "Ajuste el volumen estimado de la próstata en gramos para observar la comparativa clínica en tiempo real entre la resección tradicional (RTUP) y la enucleación con láser Holmio (HoLEP).",
    sim_vol_label: "Volumen Prostático",
    sim_vol_mild: "30 g (Normal / Leve)",
    sim_vol_limit: "80 g (Límite RTUP)",
    sim_vol_giant: "220 g (Gigante)",
    sim_stay_label: "Estancia Hospitalaria:",
    sim_bleed_label: "Riesgo de Sangrado:",
    sim_holep_header: "Láser HoLEP",
    sim_turp_header: "Cirugía Tradicional (RTUP)",

    // Simulator Dynamic Verdicts
    sim_turp_badge_low: "Factible pero Limitada",
    sim_turp_desc_low: "Corta tejido en fragmentos térmicos. Riesgo moderado de sangrado y posibilidad de recidiva a largo plazo.",
    sim_holep_badge_low: "Excelente / Gold Standard",
    sim_holep_desc_low: "Enuclea la totalidad del adenoma preservando el esfínter. Sin cortes térmicos excesivos.",
    sim_stay_low: "12 a 24 horas",

    sim_turp_badge_mid: "Alto Riesgo Quirúrgico",
    sim_turp_desc_mid: "Límite de seguridad convencional. Mayor tiempo quirúrgico y riesgo de síndrome de reabsorción líquida (RTU).",
    sim_holep_badge_mid: "Indicación Primaria de Elección",
    sim_holep_desc_mid: "Máxima precisión. Desprende el lóbulo entero por planos anatómicos naturales sin límite de tiempo.",
    sim_stay_mid: "24 horas",

    sim_turp_badge_high: "Contraindicada Tradicionalmente",
    sim_turp_desc_high: "Obliga a cirugía abierta con incisión suprapúbica grande, semanas de recuperación y alto sangrado.",
    sim_holep_badge_high: "Única Técnica Láser Viable sin Incisión",
    sim_holep_desc_high: "Enuclea próstatas gigantescas (>150g) a través de la uretra. Paciente egresa caminando al día siguiente.",
    sim_stay_high: "24 a 36 horas",

    // Surgical Steps
    steps_tag: "RIGOR QUIRÚRGICO PASO A PASO",
    steps_title: "Técnica Quirúrgica de Enucleación HoLEP",
    steps_desc: "El procedimiento se realiza íntegramente a través de la uretra guiado por cámara endoscópica de alta definición y fibra láser de 2,100 nm.",

    // Demographic Matrix
    matrix_tag: "CATÁLOGO DIAGNÓSTICO & TRATAMIENTOS",
    matrix_title: "Matriz de Atención Médica y Quirúrgica",
    tab_all: "Todos los Grupos",
    tab_men: "👨 Hombres",
    tab_women: "👩 Mujeres",
    tab_kids: "👶 Niños",
    tab_surgeries: "🔬 Robótica & Láser",
    matrix_conditions_lbl: "Condiciones Tratadas",
    matrix_tech_lbl: "Tecnología Aplicada",
    matrix_btn_consult: "Coordinar Consulta",

    // Clinical Intake Slip (Papeleta)
    intake_tag: "RECEPCIÓN CLÍNICA DIRECTA",
    intake_title: "Papeleta de Consulta Digital",
    intake_desc: `Para coordinar su valoración de forma eficiente, complete este formulario clínico preliminar. Se generará un <strong>Folio de Consulta Único</strong> y se transmitirá directamente al consultorio del Dr. Favio Salinas G. vía WhatsApp oficial.`,
    intake_safe_title: "Atención Confidencial y Ética",
    intake_safe_desc: "Toda la información es recibida únicamente por el equipo médico del consultorio para preparar su expediente clínico previo a su llegada.",
    slip_label_folio: "FOLIO DIGITAL",
    lbl_patient_name: "Nombre del Paciente",
    placeholder_patient_name: "Nombre y Apellidos",
    lbl_patient_phone: "Teléfono / WhatsApp",
    placeholder_patient_phone: "Ej. 867 123 4567",
    lbl_demographic: "Perfil del Paciente",
    opt_demo_men: "Hombre (Salud Prostática / Andrología)",
    opt_demo_women: "Mujer (Litiasis / Incontinencia)",
    opt_demo_kids: "Pediátrico / Niño(a)",
    opt_demo_opinion: "Segunda Opinión Quirúrgica",
    lbl_urgency: "Prioridad / Urgencia",
    opt_urg_routine: "Programada (Esta semana)",
    opt_urg_urgent: "Urgente (Dolor / Cólico Renal)",
    opt_urg_border: "Paciente de Texas / Fin de semana",
    lbl_concern: "Motivo Principal de Consulta",
    opt_con_holep: "Valoración Prostática / Láser HoLEP",
    opt_con_stones: "Litiasis Renal (Piedras en el riñón / Vejiga)",
    opt_con_bph: "Hiperplasia Prostática Benigna (HPB)",
    opt_con_robotics: "Cirugía Robótica o Laparoscópica",
    opt_con_onco: "Oncología Urológica",
    opt_con_fert: "Infertilidad Masculina / Disfunción Eréctil",
    opt_con_incont: "Incontinencia Urinaria Femenina",
    opt_con_ped: "Urología Pediátrica",
    opt_con_checkup: "Chequeo Urológico Preventivo General",
    lbl_notes: "Síntomas o Estudios Previos (Opcional)",
    placeholder_notes: "Ej. APE elevado, ultrasonido reciente, dolor en fosa renal...",
    btn_send_slip: "Transmitir Papeleta al WhatsApp del Doctor",

    // Cross-Border Section
    border_tag: "CORREDOR MÉDICO TRANSFRONTERIZO",
    border_title: "Atención para Pacientes de Texas y Estados Unidos",
    border_desc: "Ubicados estratégicamente en Nuevo Laredo, Tamaulipas, a escasos minutos de los cruces internacionales. Brindamos atención bilingüe con los más altos estándares quirúrgicos y costos significativamente más accesibles que en EE.UU.",
    border_point_1: "Facturación médica con desglose para reembolso internacional (HSA / FSA / Seguros).",
    border_point_2: "Personal 100% bilingüe (English & Spanish spoken fluently).",
    btn_route_p1: "Desde Puente I (Puerta de las Américas)",
    btn_route_p2: "Desde Puente II (Juárez-Lincoln)",
    route_p1_title: "Tiempo estimado: 7 a 9 minutos en automóvil",
    route_p1_desc: "Cruzar por Puente I hacia Nuevo Laredo, incorporarse directamente por Av. Vicente Guerrero hacia el sur hasta Av. Benito Juárez 2713.",
    route_p2_title: "Tiempo estimado: 9 a 12 minutos en automóvil",
    route_p2_desc: "Al salir de la garita de Puente II, continuar por Av. César López de Lara y virar al poniente hacia Av. Benito Juárez 2713, Col. Juárez.",
    map_badge_addr: "Av. Benito Juárez 2713, Col. Juárez",
    map_badge_city: "Nuevo Laredo, Tamaulipas",
    btn_gps: "Ruta GPS",

    // Social Channels
    social_tag: "CANALES DE DIVULGACIÓN MÉDICA",
    social_title: "Siga al Dr. Favio Salinas G. en Redes Oficiales",
    social_desc: "Educación urológica continua, casos quirúrgicos explicados y prevención para pacientes.",
    yt_badge: "Canal de YouTube",
    yt_desc: "Videos explicativos sobre HoLEP, litiasis y cirugía robótica.",
    tt_badge: "TikTok Oficial",
    tt_desc: "Cápsulas cortas de salud prostática, mitos y síntomas de alerta.",
    fb_badge: "Comunidad Facebook",
    fb_desc: "Noticias del consultorio, testimonios y fechas de consulta.",
    ig_badge: "Instagram Clínico",
    ig_desc: "Actualizaciones de procedimientos y actividades médicas.",

    // Footer
    footer_role: "Cirujano Urólogo de Alta Especialidad",
    footer_cert: "Certificado por el Consejo Nacional Mexicano de Urología A.C. Práctica privada dedicada al tratamiento vanguardista de enfermedades de riñón, vejiga y próstata.",
    footer_ced_1: "Médico Cirujano:",
    footer_ced_2: "Especialidad en Urología:",
    footer_ced_3: "Certificación Consejo Mexicano:",
    footer_clinic_title: "Consultorio Principal",
    footer_hours_title: "Horario Clínico",
    footer_hours_mf: "Lunes a Viernes:",
    footer_hours_sat: "Sábados:",
    footer_hours_note: "*Urgencias de litiasis renal con recepción prioritaria.",
    footer_copy: "© 2026 Dr. Favio Salinas G. • Todos los derechos reservados.",
    footer_design: "Diseño │ www.stnet.com.mx",
    footer_loc: "Nuevo Laredo, Tamaulipas, México",

    // Floating actions
    float_call_title: "Llamar directo al 867 714 4361",
    float_wa_title: "WhatsApp Inmediato"
  },
  en: {
    // Top Bar & Navigation
    status_open: "Clinic Open • Appointments Available",
    status_closed: "After Hours • 24/7 WhatsApp Receiving",
    top_council: "Mexican National Council of Urology A.C.",
    top_corridor: "Nuevo Laredo, Tamps. (Cross-Border Corridor)",
    brand_role: "Urological Surgeon • Board-Certified Specialist",
    nav_about: "Doctor's Profile",
    nav_matrix: "Clinical Specialties",
    nav_holep: "HoLEP Technology",
    nav_intake: "Clinical Intake Slip",
    nav_border: "Bi-National Patients (USA)",
    nav_contact: "Clinic Office",
    nav_quick_book: "Book Consultation",
    mobile_lang_label: "Language / Idioma",
    wp_direct: "Direct WhatsApp",

    // Hero Section
    hero_label: "MEXICAN NATIONAL COUNCIL OF UROLOGY A.C. • BOARD CERTIFIED",
    hero_title: `Minimally Invasive <span class="italic font-normal text-teal">Urological Surgery</span> & HoLEP Laser Precision`,
    hero_subtitle: `High-specialty private urology practice led by <strong>Dr. Favio Salinas G.</strong> Cutting-edge, ethical, incisionless care for kidney, bladder, and prostate conditions in Nuevo Laredo.`,
    cedula_title: "Professional Medical Licenses (SEP Registered)",
    cedula_1_label: "Physician Surgeon",
    cedula_2_label: "Urology Specialist",
    cedula_3_label: "National Board Certified",
    hero_btn_intake: "Generate Intake Slip",
    hero_btn_holep: "Explore HoLEP Protocol",

    // Atelier Card
    atelier_title: "Surgical Atelier",
    atelier_city: "Nuevo Laredo, Mexico",
    doctor_name_role: "High-Specialty Urological Surgeon",
    atelier_mission: `"Our mission is to provide personalized, high-quality medical care for the prevention and treatment of urological diseases in a serene, dignified, and confidential setting."`,
    cap_holep: "HoLEP Prostate Laser",
    cap_holep_badge: "Gold Standard",
    cap_stones: "Flexible Kidney Stones (RIRS)",
    cap_stones_badge: "No Incision",
    cap_robotics: "Robotic & Laparoscopic Surgery",
    cap_robotics_badge: "Minimally Invasive",
    tel_label: "Call: 867 714 4361",

    // Simulator Section
    sim_tag: "PROSTATE SURGICAL SIMULATOR • CLINICAL EVIDENCE",
    sim_title: "Why is HoLEP Laser the Definitive Global Gold Standard?",
    sim_desc: "Adjust the estimated prostate volume in grams to view real-time clinical comparisons between traditional resection (TURP) and Holmium laser enucleation (HoLEP).",
    sim_vol_label: "Prostate Volume",
    sim_vol_mild: "30 g (Normal / Mild)",
    sim_vol_limit: "80 g (TURP Limit)",
    sim_vol_giant: "220 g (Giant Prostate)",
    sim_stay_label: "Hospital Stay:",
    sim_bleed_label: "Bleeding Risk:",
    sim_holep_header: "HoLEP Laser",
    sim_turp_header: "Traditional Surgery (TURP)",

    // Simulator Dynamic Verdicts
    sim_turp_badge_low: "Feasible but Limited",
    sim_turp_desc_low: "Cuts tissue into thermal chips. Moderate bleeding risk and possibility of long-term regrowth.",
    sim_holep_badge_low: "Excellent / Gold Standard",
    sim_holep_desc_low: "Enucleates the entire adenoma while preserving the sphincter. Zero excessive thermal cuts.",
    sim_stay_low: "12 to 24 hours",

    sim_turp_badge_mid: "High Surgical Risk",
    sim_turp_desc_mid: "Conventional safety threshold. Prolonged surgical time and risk of transurethral resection (TUR) syndrome.",
    sim_holep_badge_mid: "Primary Treatment of Choice",
    sim_holep_desc_mid: "Maximum precision. Dissects the entire lobe along natural anatomic planes without time limits.",
    sim_stay_mid: "24 hours",

    sim_turp_badge_high: "Traditionally Contraindicated",
    sim_turp_desc_high: "Forces open surgery with large suprapubic abdominal cut, weeks of recovery, and high bleeding.",
    sim_holep_badge_high: "Only Incisionless Laser Technique Viable",
    sim_holep_desc_high: "Safely enucleates massive prostates (>150g) transurethrally. Patient walks home the next day.",
    sim_stay_high: "24 to 36 hours",

    // Surgical Steps
    steps_tag: "STEP-BY-STEP SURGICAL PROTOCOL",
    steps_title: "HoLEP Surgical Enucleation Technique",
    steps_desc: "The procedure is performed entirely transurethrally guided by high-definition endoscopy and 2,100 nm Holmium laser fiber.",

    // Demographic Matrix
    matrix_tag: "DIAGNOSTIC & CLINICAL CATALOG",
    matrix_title: "Medical & Surgical Care Matrix",
    tab_all: "All Patient Groups",
    tab_men: "👨 Men",
    tab_women: "👩 Women",
    tab_kids: "👶 Children",
    tab_surgeries: "🔬 Robotic & Laser",
    matrix_conditions_lbl: "Conditions Treated",
    matrix_tech_lbl: "Applied Technology",
    matrix_btn_consult: "Request Consultation",

    // Clinical Intake Slip (Papeleta)
    intake_tag: "DIRECT CLINICAL INTAKE",
    intake_title: "Digital Clinical Intake Slip",
    intake_desc: `To coordinate your consultation efficiently, complete this preliminary clinical intake. A <strong>Unique Consultation Folio</strong> will be generated and transmitted directly to Dr. Favio Salinas G.'s official WhatsApp.`,
    intake_safe_title: "Confidential & Ethical Care",
    intake_safe_desc: "All information is received exclusively by the clinic medical team to prepare your medical file prior to your visit.",
    slip_label_folio: "DIGITAL FOLIO",
    lbl_patient_name: "Patient's Full Name",
    placeholder_patient_name: "First & Last Name",
    lbl_patient_phone: "Phone / WhatsApp",
    placeholder_patient_phone: "e.g. +1 956 000 0000",
    lbl_demographic: "Patient Profile",
    opt_demo_men: "Men (Prostate Health / Andrology)",
    opt_demo_women: "Women (Kidney Stones / Incontinence)",
    opt_demo_kids: "Pediatric / Child",
    opt_demo_opinion: "Surgical Second Opinion",
    lbl_urgency: "Priority / Urgency",
    opt_urg_routine: "Scheduled (This week)",
    opt_urg_urgent: "Urgent (Pain / Renal Colic)",
    opt_urg_border: "Texas Patient / Weekend Slot",
    lbl_concern: "Primary Consultation Reason",
    opt_con_holep: "Prostate Evaluation / HoLEP Laser",
    opt_con_stones: "Urinary Stones (Kidney / Bladder Stones)",
    opt_con_bph: "Benign Prostatic Hyperplasia (BPH)",
    opt_con_robotics: "Robotic or Laparoscopic Surgery",
    opt_con_onco: "Urologic Oncology",
    opt_con_fert: "Male Infertility / Erectile Dysfunction",
    opt_con_incont: "Female Urinary Incontinence",
    opt_con_ped: "Pediatric Urology",
    opt_con_checkup: "General Preventive Urology Checkup",
    lbl_notes: "Symptoms or Previous Tests (Optional)",
    placeholder_notes: "e.g., Elevated PSA, recent ultrasound, flank pain...",
    btn_send_slip: "Transmit Intake Slip to Doctor's WhatsApp",

    // Cross-Border Section
    border_tag: "CROSS-BORDER HEALTHCARE CORRIDOR",
    border_title: "Care for Patients from Texas & the United States",
    border_desc: "Strategically located in Nuevo Laredo, Tamaulipas, just minutes from international bridge crossings. We provide bilingual care matching the highest surgical standards at significantly more accessible costs than the US.",
    border_point_1: "Itemized medical billing receipts for international reimbursement (HSA / FSA / Insurances).",
    border_point_2: "100% bilingual medical team (English & Spanish spoken fluently).",
    btn_route_p1: "From Bridge I (Puerta de las Américas)",
    btn_route_p2: "From Bridge II (Juárez-Lincoln)",
    route_p1_title: "Estimated drive time: 7 to 9 minutes",
    route_p1_desc: "Cross Bridge I into Nuevo Laredo, head south directly along Av. Vicente Guerrero to Av. Benito Juárez 2713.",
    route_p2_title: "Estimated drive time: 9 to 12 minutes",
    route_p2_desc: "Exiting Bridge II port of entry, proceed along Av. César López de Lara and turn west onto Av. Benito Juárez 2713, Col. Juárez.",
    map_badge_addr: "Av. Benito Juárez 2713, Col. Juárez",
    map_badge_city: "Nuevo Laredo, Tamaulipas",
    btn_gps: "GPS Route",

    // Social Channels
    social_tag: "MEDICAL OUTREACH & EDUCATION",
    social_title: "Follow Dr. Favio Salinas G. on Official Channels",
    social_desc: "Continuous urological education, explained surgical cases, and patient prevention.",
    yt_badge: "YouTube Channel",
    yt_desc: "Educational videos on HoLEP, kidney stones, and robotic surgery.",
    tt_badge: "Official TikTok",
    tt_desc: "Short clinical clips on prostate health, myths, and warning signs.",
    fb_badge: "Facebook Community",
    fb_desc: "Clinic news, patient testimonials, and schedule updates.",
    ig_badge: "Clinical Instagram",
    ig_desc: "Procedure updates and academic medical activities.",

    // Footer
    footer_role: "High-Specialty Urological Surgeon",
    footer_cert: "Certified by the Mexican National Council of Urology A.C. Private practice dedicated to cutting-edge treatment of kidney, bladder, and prostate conditions.",
    footer_ced_1: "General Physician:",
    footer_ced_2: "Urology Specialty:",
    footer_ced_3: "Mexican Board Certification:",
    footer_clinic_title: "Main Clinic Office",
    footer_hours_title: "Clinic Hours",
    footer_hours_mf: "Monday to Friday:",
    footer_hours_sat: "Saturday:",
    footer_hours_note: "*Urgent kidney stone cases receive priority intake.",
    footer_copy: "© 2026 Dr. Favio Salinas G. • All rights reserved.",
    footer_design: "Design │ www.stnet.com.mx",
    footer_loc: "Nuevo Laredo, Tamaulipas, Mexico",

    // Floating actions
    float_call_title: "Call directly at 867 714 4361",
    float_wa_title: "Instant WhatsApp"
  }
};

// Language Engine Switcher & DOM Updater
function initLanguageEngine() {
  const toggleBtn = document.getElementById('lang-switch-btn');
  const mobileToggleBtn = document.getElementById('mobile-lang-switch-btn');

  function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    try {
      localStorage.setItem('dr_favio_lang', currentLang);
    } catch (e) {
      console.warn(e);
    }
    applyLanguage(currentLang);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleLanguage);
  }
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', toggleLanguage);
  }
}

function applyLanguage(lang) {
  const dict = i18nDictionary[lang] || i18nDictionary['es'];

  // 1. Update text labels on buttons
  const labelEl = document.getElementById('current-lang-code');
  if (labelEl) labelEl.textContent = lang.toUpperCase();

  const mobileLabelEl = document.getElementById('mobile-lang-code');
  if (mobileLabelEl) mobileLabelEl.textContent = lang.toUpperCase();

  // 2. Pure textContent elements [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // 3. HTML formatting elements [data-i18n-html]
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // 4. Input placeholders [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  // 5. Title / Tooltips [data-i18n-title]
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] !== undefined) {
      el.title = dict[key];
    }
  });

  // 6. Refresh Dynamic Simulator in Current Language
  if (window.refreshHolepSimulator) {
    window.refreshHolepSimulator(currentHolepGrams);
  }

  // 7. Refresh 4 Surgical Steps in Current Language
  if (window.refreshSurgicalSteps) {
    window.refreshSurgicalSteps();
  }

  // 8. Refresh Demographic Matrix in Current Language
  if (window.refreshMatrix) {
    window.refreshMatrix(currentMatrixFilter);
  }

  // 9. Re-render Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 1. Live Local Clock & Clinic Status (Nuevo Laredo, Tamaulipas CST)
function initClinicClock() {
  const clockEl = document.getElementById('clinic-live-clock');
  const statusEl = document.getElementById('clinic-status-badge');
  if (!clockEl) return;

  function updateClock() {
    try {
      const now = new Date();
      const locale = currentLang === 'es' ? 'es-MX' : 'en-US';
      const options = { 
        timeZone: 'America/Matamoros', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      };
      const timeStr = new Intl.DateTimeFormat(locale, options).format(now);
      const tzLabel = currentLang === 'es' ? '(CST • Nuevo Laredo)' : '(CST • Nuevo Laredo / TX Border)';
      clockEl.textContent = `${timeStr} ${tzLabel}`;

      const day = now.getDay();
      const hour = now.getHours();
      const isOpen = (day >= 1 && day <= 5 && hour >= 9 && hour < 19) ||
                     (day === 6 && hour >= 9 && hour < 14);

      if (statusEl) {
        const dict = i18nDictionary[currentLang] || i18nDictionary['es'];
        if (isOpen) {
          statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1.5 beacon-dot"></span><span>${dict.status_open}</span>`;
        } else {
          statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500 inline-block mr-1.5"></span><span>${dict.status_closed}</span>`;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 2. Interactive HoLEP Prostate Size & Feasibility Simulator (Bilingual)
function initHolepSimulator() {
  const slider = document.getElementById('holep-slider');
  const sizeDisplay = document.getElementById('holep-size-val');
  const holepVerdict = document.getElementById('holep-verdict');
  const turpVerdict = document.getElementById('turp-verdict');
  const bleedingMeter = document.getElementById('holep-bleeding-meter');
  const hospitalMeter = document.getElementById('holep-hospital-meter');

  if (!slider) return;

  function updateSimulator(grams) {
    currentHolepGrams = grams;
    sizeDisplay.textContent = `${grams} g`;

    const dict = i18nDictionary[currentLang] || i18nDictionary['es'];

    if (grams < 60) {
      turpVerdict.innerHTML = `
        <span class="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">${dict.sim_turp_badge_low}</span>
        <p class="text-xs text-[#52707B] mt-1">${dict.sim_turp_desc_low}</p>
      `;
      holepVerdict.innerHTML = `
        <span class="text-xs font-bold text-teal bg-teal-tint px-2 py-0.5 rounded border border-teal/20">${dict.sim_holep_badge_low}</span>
        <p class="text-xs text-[#3D606C] mt-1">${dict.sim_holep_desc_low}</p>
      `;
      bleedingMeter.style.width = '12%';
      hospitalMeter.textContent = dict.sim_stay_low;
    } else if (grams >= 60 && grams < 90) {
      turpVerdict.innerHTML = `
        <span class="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">${dict.sim_turp_badge_mid}</span>
        <p class="text-xs text-[#52707B] mt-1">${dict.sim_turp_desc_mid}</p>
      `;
      holepVerdict.innerHTML = `
        <span class="text-xs font-bold text-teal bg-teal-tint px-2 py-0.5 rounded border border-teal/20">${dict.sim_holep_badge_mid}</span>
        <p class="text-xs text-[#3D606C] mt-1">${dict.sim_holep_desc_mid}</p>
      `;
      bleedingMeter.style.width = '18%';
      hospitalMeter.textContent = dict.sim_stay_mid;
    } else {
      turpVerdict.innerHTML = `
        <span class="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">${dict.sim_turp_badge_high}</span>
        <p class="text-xs text-[#52707B] mt-1">${dict.sim_turp_desc_high}</p>
      `;
      holepVerdict.innerHTML = `
        <span class="text-xs font-bold text-teal bg-teal-tint px-2 py-0.5 rounded border border-teal/20">${dict.sim_holep_badge_high}</span>
        <p class="text-xs text-[#3D606C] mt-1">${dict.sim_holep_desc_high}</p>
      `;
      bleedingMeter.style.width = '24%';
      hospitalMeter.textContent = dict.sim_stay_high;
    }
  }

  slider.addEventListener('input', (e) => {
    updateSimulator(parseInt(e.target.value));
  });

  window.refreshHolepSimulator = updateSimulator;
  updateSimulator(75);
}

// 3. Step-by-Step Surgical Theater Walkthrough (Bilingual)
const surgicalSteps = [
  {
    step: "01",
    phase_es: "Acceso Endoscópico Mínimamente Invasivo",
    phase_en: "Minimally Invasive Endoscopic Access",
    desc_es: "Se introduce un instrumento óptico de alta definición a través de la uretra sin realizar ningún corte en la piel del paciente.",
    desc_en: "A high-definition optical resectoscope is gently guided through natural urethral channels without any skin incisions.",
    highlight_es: "Cero cicatrices externas • Anestesia regional controlada",
    highlight_en: "Zero external scars • Controlled regional anesthesia",
    icon: "eye"
  },
  {
    step: "02",
    phase_es: "Enucleación Anatómica con Láser Holmio (2,100 nm)",
    phase_en: "Anatomic Enucleation with Holmium Laser (2,100 nm)",
    desc_es: "La fibra láser de 550 micras separa el tejido obstructivo (adenoma) de la cápsula prostática siguiendo el plano embriológico natural, coagulando instantáneamente los vasos.",
    desc_en: "The 550-micron laser fiber dissects the enlarged obstructive adenoma cleanly off the prostatic capsule while instantly sealing blood vessels.",
    highlight_es: "Sangrado mínimo microscópico • Máxima desobstrucción",
    highlight_en: "Microscopic minimal bleeding • Complete channel clearance",
    icon: "zap"
  },
  {
    step: "03",
    phase_es: "Morcelación Mecánica Intravesical Segura",
    phase_en: "Intravesical Mechanical Morcellation",
    desc_es: "El adenoma enucleado se traslada a la vejiga, donde un morcelador quirúrgico lo tritura suavemente y lo aspira para enviarlo íntegro a patología y descartar cáncer.",
    desc_en: "The enucleated tissue is moved to the bladder, where a specialized morcellator safely suctions and fragments it for comprehensive biopsy analysis.",
    highlight_es: "100% de tejido disponible para análisis patológico",
    highlight_en: "100% tissue preserved for thorough pathology workup",
    icon: "layers"
  },
  {
    step: "04",
    phase_es: "Retiro Temprano de Sonda y Alta Hospitalaria",
    phase_en: "Early Catheter Removal & Swift Discharge",
    desc_es: "Gracias a la ausencia de heridas abiertas y al control vascular del láser, la sonda urinaria se retira en 12-24 horas, permitiendo al paciente reincorporarse rápidamente a su vida.",
    desc_en: "Thanks to zero open incisions and precise laser coagulation, the urinary catheter is removed within 12-24 hours, returning patients home quickly.",
    highlight_es: "Alta en 24h • Retorno seguro a casa",
    highlight_en: "24-hour discharge • Fast, dignified recovery",
    icon: "check-circle-2"
  }
];

function initSurgicalStepsWalkthrough() {
  const container = document.getElementById('surgical-steps-container');
  if (!container) return;

  function renderSteps() {
    container.innerHTML = '';
    surgicalSteps.forEach((s) => {
      const stepCard = document.createElement('div');
      stepCard.className = "dossier-card rounded-2xl p-6 relative border border-[#DFE8EA] hover:border-gold transition-all";
      
      const title = currentLang === 'es' ? s.phase_es : s.phase_en;
      const desc = currentLang === 'es' ? s.desc_es : s.desc_en;
      const highlight = currentLang === 'es' ? s.highlight_es : s.highlight_en;

      stepCard.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <span class="font-mono text-2xl font-bold text-gold">${s.step}</span>
          <div class="w-8 h-8 rounded-lg bg-teal-tint text-teal flex items-center justify-center">
            <i data-lucide="${s.icon}" class="w-4 h-4"></i>
          </div>
        </div>
        <h4 class="font-serif font-bold text-lg text-heading mb-2 leading-snug">${title}</h4>
        <p class="text-xs sm:text-sm text-slate-text leading-relaxed mb-4">${desc}</p>
        <div class="pt-3 border-t border-[#EDF4F5] flex items-center gap-1.5 text-xs font-semibold text-teal">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-gold shrink-0"></i>
          <span>${highlight}</span>
        </div>
      `;
      container.appendChild(stepCard);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  renderSteps();
  window.refreshSurgicalSteps = renderSteps;
}

// 4. Clinical Intake Slip Generator (Bilingual WhatsApp Formatter)
function initClinicalIntakeSlip() {
  const folioEl = document.getElementById('slip-folio-id');
  const dateEl = document.getElementById('slip-date');
  const printBtn = document.getElementById('slip-send-btn');

  if (folioEl) {
    const randomFolio = Math.floor(1000 + Math.random() * 9000);
    folioEl.textContent = `FS-${randomFolio}`;
  }

  if (dateEl) {
    const today = new Date();
    const locale = currentLang === 'es' ? 'es-MX' : 'en-US';
    dateEl.textContent = today.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('triage-patient-name')?.value.trim() || (currentLang === 'es' ? 'Paciente' : 'Patient');
      const patientPhone = document.getElementById('triage-patient-phone')?.value.trim() || (currentLang === 'es' ? 'No especificado' : 'Not specified');
      const demographicSelect = document.getElementById('triage-demographic');
      const demographic = demographicSelect?.options[demographicSelect.selectedIndex]?.text || demographicSelect?.value;
      
      const concernSelect = document.getElementById('triage-concern');
      const concern = concernSelect?.options[concernSelect.selectedIndex]?.text || concernSelect?.value;
      
      const urgencySelect = document.getElementById('triage-urgency');
      const urgency = urgencySelect?.options[urgencySelect.selectedIndex]?.text || urgencySelect?.value;

      const notes = document.getElementById('triage-notes')?.value.trim() || (currentLang === 'es' ? 'Sin notas adicionales' : 'No additional notes');
      const folio = folioEl ? folioEl.textContent : 'FS-0000';

      let msg = '';
      if (currentLang === 'es') {
        msg = `Hola Dr. Favio Salinas G., solicito agendar una consulta médica urológica:%0A%0A` +
          `📋 *FOLIO CLÍNICO:* ${encodeURIComponent(folio)}%0A` +
          `👤 *Paciente:* ${encodeURIComponent(patientName)}%0A` +
          `📱 *Teléfono:* ${encodeURIComponent(patientPhone)}%0A` +
          `👥 *Perfil:* ${encodeURIComponent(demographic)}%0A` +
          `🩺 *Motivo Principal:* ${encodeURIComponent(concern)}%0A` +
          `⏱️ *Prioridad:* ${encodeURIComponent(urgency)}%0A` +
          `📝 *Síntomas/Estudios:* ${encodeURIComponent(notes)}%0A%0A` +
          `_Enviado desde el portal oficial www.drfaviosalinas.com_`;
      } else {
        msg = `Hello Dr. Favio Salinas G., I would like to request a urological medical consultation:%0A%0A` +
          `📋 *CLINICAL FOLIO:* ${encodeURIComponent(folio)}%0A` +
          `👤 *Patient Name:* ${encodeURIComponent(patientName)}%0A` +
          `📱 *Phone / WhatsApp:* ${encodeURIComponent(patientPhone)}%0A` +
          `👥 *Profile:* ${encodeURIComponent(demographic)}%0A` +
          `🩺 *Primary Reason:* ${encodeURIComponent(concern)}%0A` +
          `⏱️ *Priority Level:* ${encodeURIComponent(urgency)}%0A` +
          `📝 *Symptoms / Medical Notes:* ${encodeURIComponent(notes)}%0A%0A` +
          `_Transmitted via official portal www.drfaviosalinas.com_`;
      }

      const waUrl = `https://api.whatsapp.com/send?phone=+528677415761&text=${msg}`;
      window.open(waUrl, '_blank');
    });
  }
}

// 5. Demographic Matrix (Men, Women, Kids, Surgical Excellence - Bilingual)
const clinicalMatrix = [
  {
    demographic: "men",
    title_es: "Salud Integral Masculina & Próstata",
    title_en: "Men's Health & Prostate Care",
    badge_es: "Alta Especialidad",
    badge_en: "High Specialty",
    code: "URO-M",
    conditions_es: "Hiperplasia Prostática Benigna (HPB), Obstrucción Urinaria, Disfunción Eréctil, Infertilidad Masculina, Varicocele, Cáncer de Próstata.",
    conditions_en: "Benign Prostatic Hyperplasia (BPH), Urinary Obstruction, Erectile Dysfunction, Male Infertility, Varicocele, Prostate Cancer.",
    tech_es: "Láser Holmio HoLEP, Biopsia Transrectal Guiada, Varicocelectomía Microquirúrgica, Cirugía Robótica.",
    tech_en: "Holmium Laser HoLEP, Ultrasound-Guided Biopsy, Microsurgical Varicocelectomy, Robotic Surgery.",
    consult_trigger: "Valoración Prostática / Láser HoLEP"
  },
  {
    demographic: "women",
    title_es: "Urología Femenina & Suelo Pélvico",
    title_en: "Female Urology & Pelvic Floor",
    badge_es: "Cuidado Especializado",
    badge_en: "Specialized Care",
    code: "URO-F",
    conditions_es: "Infecciones Urinarias Recurrentes, Incontinencia Urinaria de Esfuerzo, Vejiga Hiperactiva, Cistitis Intersticial, Cálculos Renales.",
    conditions_en: "Recurrent UTIs, Stress Urinary Incontinence, Overactive Bladder, Interstitial Cystitis, Kidney Stones.",
    tech_es: "Cistoscopia Digital HD, Cirugía de Malla Mínimamente Invasiva (TOT), Pulverización Láser de Litiasis RIRS.",
    tech_en: "Digital HD Cystoscopy, Minimally Invasive Sling (TOT), Laser Stone Dusting RIRS.",
    consult_trigger: "Incontinencia Urinaria Femenina"
  },
  {
    demographic: "kids",
    title_es: "Urología Pediátrica para Niños y Niñas",
    title_en: "Pediatric Urology for Children",
    badge_es: "Atención Pediátrica",
    badge_en: "Pediatric Care",
    code: "URO-P",
    conditions_es: "Fimosis (Circuncisión), Testículo No Descendido (Criptorquidia), Hidrocele Pediátrico, Enuresis (mojar la cama), Reflujo Vesicoureteral.",
    conditions_en: "Phimosis (Circumcision), Undescended Testis (Cryptorchidism), Pediatric Hydrocele, Nocturnal Enuresis, Vesicoureteral Reflux.",
    tech_es: "Microcirugía Ambulatoria Pediátrica, Enfoque Conservador, Ambiente Tranquilo sin Estrés.",
    tech_en: "Outpatient Pediatric Microsurgery, Conservative Management, Stress-Free Clinic Environment.",
    consult_trigger: "Urología Pediátrica"
  },
  {
    demographic: "surgeries",
    title_es: "Cirugía Láser, Laparoscópica & Robótica",
    title_en: "Laser, Laparoscopic & Robotic Surgery",
    badge_es: "Mínima Invasión",
    badge_en: "Minimally Invasive",
    code: "SURG-X",
    conditions_es: "Litiasis Renal Compleja (Piedras gigantes en riñón o uréter), Tumores Renales, Tumores de Vejiga, Reconstrucción Urológica.",
    conditions_en: "Complex Renal Lithiasis (Staghorn / Large Stones), Renal Tumors, Bladder Tumors, Reconstructive Urology.",
    tech_es: "Ureterorrenoscopia Flexible Láser, Cirugía Laparoscópica Tridimensional, Asistencia Robótica.",
    tech_en: "Flexible Digital Laser Ureterorenoscopy, 3D Laparoscopy, Robotic-Assisted Surgery.",
    consult_trigger: "Cirugía Robótica / Laparoscópica"
  }
];

function initDemographicMatrix() {
  const container = document.getElementById('demographic-matrix-grid');
  const tabs = document.querySelectorAll('.matrix-filter-tab');
  if (!container) return;

  function renderMatrix(filter = 'all') {
    currentMatrixFilter = filter;
    container.innerHTML = '';
    const filtered = filter === 'all' 
      ? clinicalMatrix 
      : clinicalMatrix.filter(item => item.demographic === filter);

    const dict = i18nDictionary[currentLang] || i18nDictionary['es'];

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = "dossier-card rounded-2xl p-7 flex flex-col justify-between relative";

      const title = currentLang === 'es' ? item.title_es : item.title_en;
      const badge = currentLang === 'es' ? item.badge_es : item.badge_en;
      const cond = currentLang === 'es' ? item.conditions_es : item.conditions_en;
      const tech = currentLang === 'es' ? item.tech_es : item.tech_en;

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-4 pb-3 border-hairline-b">
            <span class="font-mono text-xs text-slate font-bold uppercase tracking-widest">${item.code}</span>
            <span class="gold-chip text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              ${badge}
            </span>
          </div>
          <h3 class="font-serif font-bold text-xl sm:text-2xl text-heading mb-4">
            ${title}
          </h3>
          
          <div class="space-y-4 mb-6 text-xs sm:text-sm">
            <div class="p-3.5 rounded-xl bg-sky-light/60 border border-[#E0EBEE]">
              <span class="font-mono uppercase text-[10px] text-teal font-bold block mb-1">
                ${dict.matrix_conditions_lbl}
              </span>
              <p class="text-[#3F606A] leading-relaxed">${cond}</p>
            </div>

            <div class="p-3.5 rounded-xl bg-gold-tint/40 border border-[#EBDCCF]">
              <span class="font-mono uppercase text-[10px] text-[#8C6234] font-bold block mb-1">
                ${dict.matrix_tech_lbl}
              </span>
              <p class="text-[#5E4830] leading-relaxed">${tech}</p>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-[#EDF3F5] flex items-center justify-between">
          <button onclick="prefillIntake('${item.consult_trigger}')" class="btn-ghost-teal px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <span>${dict.matrix_btn_consult}</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('bg-teal', 'text-white'));
      tabs.forEach(t => t.classList.add('bg-white', 'text-slate-text'));
      tab.classList.remove('bg-white', 'text-slate-text');
      tab.classList.add('bg-teal', 'text-white');
      renderMatrix(tab.getAttribute('data-demo'));
    });
  });

  renderMatrix('all');
  window.refreshMatrix = renderMatrix;
}

window.prefillIntake = function(reason) {
  const concernSelect = document.getElementById('triage-concern');
  const triageSection = document.getElementById('triaje');
  if (concernSelect && reason) {
    concernSelect.value = reason;
  }
  if (triageSection) {
    triageSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// 6. Cross-Border International Patient Tabs
function initCrossBorderTabs() {
  const btnP1 = document.getElementById('btn-route-p1');
  const btnP2 = document.getElementById('btn-route-p2');
  const infoP1 = document.getElementById('route-info-p1');
  const infoP2 = document.getElementById('route-info-p2');

  if (!btnP1 || !btnP2) return;

  btnP1.addEventListener('click', () => {
    btnP1.classList.add('border-teal', 'bg-teal-tint', 'text-teal');
    btnP1.classList.remove('border-[#DCE7EA]', 'bg-white', 'text-slate-text');
    btnP2.classList.remove('border-teal', 'bg-teal-tint', 'text-teal');
    btnP2.classList.add('border-[#DCE7EA]', 'bg-white', 'text-slate-text');
    infoP1.classList.remove('hidden');
    infoP2.classList.add('hidden');
  });

  btnP2.addEventListener('click', () => {
    btnP2.classList.add('border-teal', 'bg-teal-tint', 'text-teal');
    btnP2.classList.remove('border-[#DCE7EA]', 'bg-white', 'text-slate-text');
    btnP1.classList.remove('border-teal', 'bg-teal-tint', 'text-teal');
    btnP1.classList.add('border-[#DCE7EA]', 'bg-white', 'text-slate-text');
    infoP2.classList.remove('hidden');
    infoP1.classList.add('hidden');
  });
}

// 7. Booking Modal Helper (if triggered anywhere)
function initBookingModal() {
  const modal = document.getElementById('quick-modal');
  const openButtons = document.querySelectorAll('.open-modal-trigger');
  const closeBtn = document.getElementById('modal-close-trigger');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  });
}

// 8. Mobile Navigation Drawer
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-drawer-toggle');
  const drawer = document.getElementById('mobile-drawer-panel');
  const links = document.querySelectorAll('.mobile-menu-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      drawer.classList.add('hidden');
    });
  });
}
