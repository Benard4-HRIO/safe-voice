import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        report: 'Report Incident',
        stories: 'Stories',
        support: 'Find Support',
        emergency: 'Emergency',
        about: 'About',
        login: 'Login',
        logout: 'Logout',
      },
      // Home
      home: {
        title: 'SafeVoice',
        subtitle: 'A Secure Platform for Reporting and Support',
        description: 'Report incidents anonymously, share your story, and connect with verified support professionals.',
        reportButton: 'Report an Incident',
        storiesButton: 'Read Stories',
        supportButton: 'Find Support',
        emergencyButton: 'Emergency Help',
      },
      // Reporting
      report: {
        title: 'Anonymous Incident Report',
        subtitle: 'Your identity is protected. All information is encrypted.',
        form: {
          incidentDate: 'Incident Date',
          location: 'Location (Optional)',
          description: 'Description',
          descriptionPlaceholder: 'Describe what happened...',
          uploadMedia: 'Upload Media (Optional)',
          emergency: 'This is an emergency',
          submit: 'Submit Report',
          submitting: 'Submitting...',
          success: 'Report submitted successfully. Your report ID: {{id}}',
        },
        privacy: {
          title: 'Your Privacy is Protected',
          points: [
            'All data is encrypted end-to-end',
            'Your identity remains anonymous',
            'You can delete your data at any time',
            'Only verified moderators can access reports',
          ],
        },
      },
      // Stories
      stories: {
        title: 'Story Sharing Hub',
        subtitle: 'Share your experience anonymously',
        writeStory: 'Share Your Story',
        noStories: 'No stories yet. Be the first to share.',
        moderation: 'This story is pending moderation',
        upvote: 'Upvote',
        flag: 'Flag',
      },
      // Support
      support: {
        title: 'Find Support',
        subtitle: 'Connect with verified counselors, lawyers, and authorities',
        search: 'Search by location',
        filter: 'Filter by type',
        types: {
          counselor: 'Counselor',
          lawyer: 'Lawyer',
          authority: 'Authority',
          ngo: 'NGO',
          volunteer: 'Volunteer',
        },
        contact: 'Contact',
        verified: 'Verified',
        distance: '{{distance}} km away',
      },
      // Emergency
      emergency: {
        title: 'Emergency Assistance',
        panicButton: 'Panic Button',
        alertSent: 'Alert sent to your emergency contacts',
        locationSharing: 'Location sharing enabled',
        callEmergency: 'Call Emergency Services',
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        submit: 'Submit',
      },
    },
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        report: 'Reportar Incidente',
        stories: 'Historias',
        support: 'Buscar Apoyo',
        emergency: 'Emergencia',
        about: 'Acerca de',
        login: 'Iniciar Sesión',
        logout: 'Cerrar Sesión',
      },
      home: {
        title: 'SafeVoice',
        subtitle: 'Una Plataforma Segura para Reportes y Apoyo',
        description: 'Reporta incidentes de forma anónima, comparte tu historia y conéctate con profesionales verificados.',
        reportButton: 'Reportar un Incidente',
        storiesButton: 'Leer Historias',
        supportButton: 'Buscar Apoyo',
        emergencyButton: 'Ayuda de Emergencia',
      },
      report: {
        title: 'Reporte Anónimo de Incidente',
        subtitle: 'Tu identidad está protegida. Toda la información está encriptada.',
      },
      stories: {
        title: 'Centro de Compartir Historias',
        subtitle: 'Comparte tu experiencia de forma anónima',
      },
      support: {
        title: 'Buscar Apoyo',
        subtitle: 'Conéctate con consejeros, abogados y autoridades verificados',
      },
      emergency: {
        title: 'Asistencia de Emergencia',
        panicButton: 'Botón de Pánico',
      },
    },
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        report: 'Signaler un Incident',
        stories: 'Histoires',
        support: 'Trouver du Soutien',
        emergency: 'Urgence',
        about: 'À Propos',
        login: 'Connexion',
        logout: 'Déconnexion',
      },
      home: {
        title: 'SafeVoice',
        subtitle: 'Une Plateforme Sécurisée pour les Signalements et le Soutien',
        description: 'Signalez des incidents anonymement, partagez votre histoire et connectez-vous avec des professionnels vérifiés.',
        reportButton: 'Signaler un Incident',
        storiesButton: 'Lire les Histoires',
        supportButton: 'Trouver du Soutien',
        emergencyButton: 'Aide d\'Urgence',
      },
    },
  },
  sw: {
    translation: {
      nav: {
        home: 'Nyumbani',
        report: 'Ripoti Tukio',
        stories: 'Hadithi',
        support: 'Tafuta Msaada',
        emergency: 'Dharura',
        about: 'Kuhusu',
        login: 'Ingia',
        logout: 'Toka',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        report: 'الإبلاغ عن حادث',
        stories: 'القصص',
        support: 'العثور على الدعم',
        emergency: 'طوارئ',
        about: 'حول',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
      },
    },
  },
};

if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    });
} else {
  // Server-side initialization
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;

