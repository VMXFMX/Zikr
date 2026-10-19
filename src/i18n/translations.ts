export type LanguageCode = 'ar' | 'en' | 'am';

export interface LanguageMeta {
  code: LanguageCode;
  nativeLabel: string;
  shortLabel: string;
  dir: 'rtl' | 'ltr';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'ar', nativeLabel: 'العربية', shortLabel: 'عربي', dir: 'rtl' },
  { code: 'en', nativeLabel: 'English', shortLabel: 'EN', dir: 'ltr' },
  { code: 'am', nativeLabel: 'አማርኛ', shortLabel: 'አማ', dir: 'ltr' },
];

export interface ReadingModeSubItem {
  id: 'easy' | 'continuous';
  title: string;
  badge: string;
  description: string;
}

export interface FeatureCardItem {
  id: 'quran' | 'reading-modes' | 'azkar' | 'books' | 'organized';
  number: string;
  title: string;
  description: string;
  readingModes?: ReadingModeSubItem[];
}

export interface TranslationContent {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    mainNav: string;
    languageSelector: string;
    switchToLight: string;
    switchToDark: string;
    openMobileMenu: string;
    closeMobileMenu: string;
    footerNav: string;
  };
  nav: {
    home: string;
    about: string;
    features: string;
    download: string;
    faq: string;
    themeDark: string;
    themeLight: string;
    languageLabel: string;
  };
  hero: {
    kicker: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    availabilityNote: string;
    comingSoonStatus: string;
    visualCard: {
      sectionLabel: string;
      arabicSampleTitle: string;
      arabicSampleVerse: string;
      arabicSampleSubtext: string;
      pillars: string[];
    };
  };
  intro: {
    sectionIndex: string;
    heading: string;
    description: string;
    highlights: {
      title: string;
      summary: string;
    }[];
    exploreFeaturesCta: string;
    screenshots: {
      sectionIndex: string;
      heading: string;
      subtitle: string;
      prevAria: string;
      nextAria: string;
      zoomAria: string;
      closeZoomAria: string;
      items: {
        id:
          | 'quran-mushaf-index'
          | 'quran-surahs'
          | 'azkar'
          | 'day-night'
          | 'sebha'
          | 'books'
          | 'duas'
          | 'qibla'
          | 'settings';
        label: string;
        caption: string;
      }[];
    };
  };
  features: {
    sectionIndex: string;
    heading: string;
    subtitle: string;
    items: FeatureCardItem[];
  };
  download: {
    sectionIndex: string;
    heading: string;
    description: string;
    platformLabel: string;
    statusLabel: string;
    comingSoon: string;
    downloadButtonReady: string;
    downloadButtonUnavailable: string;
    honestNotice: string;
    readFaqLink: string;
  };
  faq: {
    sectionIndex: string;
    heading: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  footer: {
    tagline: string;
    closingMessage: string;
    navigationHeading: string;
    languageHeading: string;
    appearanceHeading: string;
    socialsHeading?: string;
  };
  socials: {
    sectionIndex: string;
    heading: string;
    subtitle: string;
    connectWithUs: string;
    directEmailLabel: string;
    visitChannel: string;
    copyLink: string;
    copied: string;
    customizeButton: string;
    modalTitle: string;
    modalDescription: string;
    urlPlaceholder: string;
    handlePlaceholder: string;
    save: string;
    cancel: string;
    reset: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationContent> = {
  ar: {
    meta: {
      title: 'ZIKR — أكثر من ذكر | الموقع الرسمي',
      description:
        'ZIKR تجربة إسلامية تجمع بين القرآن الكريم، وأذكار، وكتب، ضمن تجربة تهتم بوضوح النص وسهولة الوصول إلى المحتوى.',
    },
    a11y: {
      skipToContent: 'الانتقال إلى المحتوى الرئيسي',
      mainNav: 'التنقل الرئيسي',
      languageSelector: 'اختيار لغة الموقع',
      switchToLight: 'التبديل إلى المظهر الفاتح',
      switchToDark: 'التبديل إلى المظهر الداكن',
      openMobileMenu: 'فتح قائمة التنقل',
      closeMobileMenu: 'إغلاق قائمة التنقل',
      footerNav: 'روابط تذييل الصفحة',
    },
    nav: {
      home: 'الرئيسية',
      about: 'نظرة عامة',
      features: 'المميزات',
      download: 'التحميل',
      faq: 'الأسئلة الشائعة',
      themeDark: 'داكن',
      themeLight: 'فاتح',
      languageLabel: 'اللغة',
    },
    hero: {
      kicker: 'تجربة إسلامية متكاملة',
      headline: 'أكثر من ذكر',
      description:
        'ZIKR تجربة إسلامية تجمع بين القرآن الكريم، وأذكار، وكتب، ضمن تجربة تهتم بوضوح النص وسهولة الوصول إلى المحتوى.',
      primaryCta: 'اكتشف مميزات ZIKR',
      secondaryCta: 'تحميل التطبيق',
      availabilityNote: 'حالة إصدار أندرويد',
      comingSoonStatus: 'التطبيق قريبًا',
      visualCard: {
        sectionLabel: 'وضوح النص وسهولة الوصول إلى المحتوى',
        arabicSampleTitle: 'القرآن الكريم · أذكار · كتب',
        arabicSampleVerse: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ۝٢٨',
        arabicSampleSubtext: 'تصميم هادئ يضع وضوح المحتوى وسهولة القراءة في المقام الأول',
        pillars: ['القرآن الكريم', 'أذكار', 'اليوم والليلة', 'كتب'],
      },
    },
    intro: {
      sectionIndex: '01. نظرة عامة',
      heading: 'تجربة إسلامية متكاملة',
      description:
        'يجمع ZIKR بين قراءة القرآن الكريم، والقراءة الميسّرة، والقراءة المستمرة، وأذكار، وكتب، ضمن تجربة منظّمة تهتم بوضوح المحتوى وسهولة استخدامه.',
      highlights: [
        {
          title: 'وضوح النص العربي',
          summary: 'عناية فائقة بالمقروئية وتوازن الخطوط لتقديم تجربة قراءة مريحة وهادئة.',
        },
        {
          title: 'تنوع أذكار',
          summary: 'الجمع بين القراءة الميسّرة لراحة العين والقراءة المستمرة للحفاظ على تسلسل النص.',
        },
        {
          title: 'تنظيم واضح للمحتوى',
          summary: 'أقسام مرتبة تتيح الوصول المباشر إلى المصحف، وأذكار اليوم والليلة، وكتب.',
        },
      ],
      exploreFeaturesCta: 'استعرض المميزات الخمس بالتفصيل',
      screenshots: {
        sectionIndex: 'معاينة التطبيق',
        heading: 'لقطات شاشة من تطبيق ZIKR للأندرويد',
        subtitle:
          'جولة بصرية في واجهات تطبيق ZIKR الفعلية، تستعرض قارئ القرآن الكريم، وأبواب الأذكار، ومسار اليوم والليلة، والسبحة، وكتب، وأدعية القرآن، واتجاه القبلة، والإعدادات.',
        prevAria: 'اللقطة السابقة',
        nextAria: 'اللقطة التالية',
        zoomAria: 'تكبير لقطة الشاشة',
        closeZoomAria: 'إغلاق المعاينة المكبّرة',
        items: [
          {
            id: 'quran-mushaf-index',
            label: 'القرآن الكريم — المصحف والفهرس',
            caption: 'تجربة مخصصة لقراءة القرآن الكريم، مع صفحات المصحف والتنقل بين السور والصفحات بسهولة.',
          },
          {
            id: 'quran-surahs',
            label: 'القرآن الكريم — السور ومتابعة القراءة',
            caption: 'استعراض السور والأجزاء والمحفوظات مع بطاقة متابعة القراءة للعودة المباشرة إلى موضعك.',
          },
          {
            id: 'azkar',
            label: 'الأذكار',
            caption: 'أذكار الصباح والمساء وأذكار النوم والصلاة والمسجد والوضوء والمنزل والسفر في أبواب منظمة.',
          },
          {
            id: 'day-night',
            label: 'اليوم والليلة',
            caption: 'دليلك الإيماني عبر ساعات اليوم والليلة بالصلاة والقرآن والذكر من الاستيقاظ حتى المنام.',
          },
          {
            id: 'sebha',
            label: 'السبحة',
            caption: 'مسبحة إلكترونية هادئة للتسبيح والذكر مع اختيار الصيغة وتحديد الهدف اليومي.',
          },
          {
            id: 'books',
            label: 'كتب',
            caption: 'قراءة الكتب الإسلامية بصيغة واضحة مع حفظ موضع التوقف ومتابعة نسبة الإنجاز.',
          },
          {
            id: 'duas',
            label: 'أدعية القرآن',
            caption: 'أدعية مختارة وردت في القرآن الكريم موثقة بالسورة والآية مع النسخ والمشاركة والحفظ.',
          },
          {
            id: 'qibla',
            label: 'اتجاه القبلة',
            caption: 'تحديد اتجاه الكعبة المشرفة بدقة بواسطة مستشعرات الجهاز مع عرض الزاوية والمسافة.',
          },
          {
            id: 'settings',
            label: 'الإعدادات والتنبيهات',
            caption: 'تحديد الموقع تلقائياً عبر GPS أو يدوياً، وإدارة إشعارات أوقات الصلاة والتذكير قبلها.',
          },
        ],
      },
    },
    features: {
      sectionIndex: '02. مميزات ZIKR',
      heading: 'خمس ركائز أساسية في ZIKR',
      subtitle: 'بنية واضحة تجمع أهم ما يحتاجه القارئ اليومي في واجهة هادئة ومنظمة.',
      items: [
        {
          id: 'quran',
          number: '01',
          title: 'القرآن الكريم',
          description:
            'اقرأ القرآن الكريم ضمن تجربة تهتم بوضوح المصحف وسهولة التنقل بين السور والآيات.',
        },
        {
          id: 'reading-modes',
          number: '02',
          title: 'أذكار',
          description: 'نمطان متمايزان للقراءة صُمّما لخدمة وضوح النص أو متابعة التسلسل القرائي:',
          readingModes: [
            {
              id: 'easy',
              title: 'القراءة الميسّرة',
              badge: 'وضوح النص وراحة القارئ',
              description: 'نمط قراءة يركّز على وضوح النص وسهولة متابعته وراحة القارئ.',
            },
            {
              id: 'continuous',
              title: 'القراءة المستمرة',
              badge: 'تواصل القراءة وتسلسل النص',
              description:
                'تجربة تساعد القارئ على متابعة القراءة بصورة متواصلة مع الحفاظ على تسلسل النص.',
            },
          ],
        },
        {
          id: 'azkar',
          number: '03',
          title: 'اليوم والليلة',
          description:
            'تصفّح الأذكار والأدعية المرتبطة بأوقات اليوم وأحواله ضمن أقسام منظّمة تسهّل الوصول إلى المحتوى المطلوب.',
        },
        {
          id: 'books',
          number: '04',
          title: 'كتب',
          description:
            'تصفّح كتب المتاحة في ZIKR ضمن تجربة قراءة تهتم بوضوح النص وسهولة الوصول إلى محتوى الكتاب.',
        },
        {
          id: 'organized',
          number: '05',
          title: 'محتوى إسلامي منظّم',
          description:
            'تنظيم المحتوى الإسلامي ضمن أقسام واضحة يساعدك على العثور على الموضوع الذي تبحث عنه بسهولة.',
        },
      ],
    },
    download: {
      sectionIndex: '03. تحميل التطبيق',
      heading: 'اكتشف ZIKR',
      description:
        'تعرّف على تجربة تجمع بين القرآن الكريم، وأذكار، وكتب.',
      platformLabel: 'نظام التشغيل: Android (APK رسمي)',
      statusLabel: 'حالة التوفر:',
      comingSoon: 'التطبيق قريبًا',
      downloadButtonReady: 'تحميل التطبيق (APK)',
      downloadButtonUnavailable: 'التطبيق قريبًا',
      honestNotice:
        'نسخة أندرويد الرسمية قيد الإعداد حاليًا. سيتم تفعيل رابط التحميل المباشر هنا فور توفر حزمة التطبيق المعتمدة.',
      readFaqLink: 'الأسئلة الشائعة حول ZIKR',
    },
    faq: {
      sectionIndex: '04. الأسئلة الشائعة',
      heading: 'إجابات واضحة حول ZIKR',
      subtitle: 'معلومات دقيقة حول محتوى التطبيق، وأذكار، وحالة توفر نسخة أندرويد.',
      items: [
        {
          question: 'ما الذي يقدّمه تطبيق ZIKR؟',
          answer:
            'يقدّم ZIKR تجربة إسلامية متكاملة تجمع بين قراءة القرآن الكريم، وأذكار (القراءة الميسّرة والقراءة المستمرة)، وأذكار اليوم والليلة، وكتب، ضمن أقسام منظّمة وواضحة.',
        },
        {
          question: 'ما الفرق بين القراءة الميسّرة والقراءة المستمرة؟',
          answer:
            'تركّز «القراءة الميسّرة» على وضوح النص وسهولة متابعته وراحة القارئ، بينما تساعد «القراءة المستمرة» القارئ على متابعة القراءة بصورة متواصلة مع الحفاظ على تسلسل النص.',
        },
        {
          question: 'هل يتوفر تحميل تطبيق أندرويد حاليًا؟',
          answer:
            'حاليًا يظهر التطبيق بحالة «التطبيق قريبًا». يلتزم الموقع بالشفافية التامة فلا يعرض روابط غير مكتملة، وسيتاح التحميل المباشر هنا فور جاهزية النسخة الرسمية.',
        },
        {
          question: 'ما هي اللغات التي يدعمها الموقع الرسمي؟',
          answer:
            'يدعم الموقع الرسمي ثلاث لغات بشكل كامل: العربية (بتخطيط من اليمين إلى اليسار)، والإنجليزية، والأمهرية، مع إمكانية التبديل الفوري بينها في أي وقت.',
        },
      ],
    },
    footer: {
      tagline: 'أكثر من ذكر — تجربة إسلامية متكاملة.',
      closingMessage: 'الموقع الرسمي لتطبيق ZIKR.',
      navigationHeading: 'التنقل',
      languageHeading: 'اللغة',
      appearanceHeading: 'المظهر',
      socialsHeading: 'قنوات التواصل والمتابعة',
    },
    socials: {
      sectionIndex: 'روابط التواصل الرسمية',
      heading: 'تابع زِكْر',
      subtitle: 'رفيقك اليومي للأذكار',
      connectWithUs: 'حسابات التواصل الرسمية',
      directEmailLabel: 'البريد الإلكتروني المباشر',
      visitChannel: 'زيارة القناة',
      copyLink: 'نسخ الرابط',
      copied: 'تم النسخ!',
      customizeButton: 'تخصيص روابط التواصل',
      modalTitle: 'تخصيص روابط التواصل الاجتماعي',
      modalDescription: 'يمكنك تعديل روابط منصاتك أو إضافة روابطك الخاصة لتظهر فورًا في الموقع.',
      urlPlaceholder: 'https://...',
      handlePlaceholder: '@اسم_الحساب',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
      reset: 'استعادة الروابط الافتراضية',
    },
  },

  en: {
    meta: {
      title: 'ZIKR — More Than Remembrance | Official Website',
      description:
        'ZIKR is an Islamic experience uniting the Holy Quran, reading modes, Azkar, and Islamic books within an interface focused on text clarity and effortless access to content.',
    },
    a11y: {
      skipToContent: 'Skip to main content',
      mainNav: 'Main navigation',
      languageSelector: 'Select website language',
      switchToLight: 'Switch to light theme',
      switchToDark: 'Switch to dark theme',
      openMobileMenu: 'Open navigation menu',
      closeMobileMenu: 'Close navigation menu',
      footerNav: 'Footer navigation',
    },
    nav: {
      home: 'Home',
      about: 'Overview',
      features: 'Features',
      download: 'Download',
      faq: 'FAQ',
      themeDark: 'Dark',
      themeLight: 'Light',
      languageLabel: 'Language',
    },
    hero: {
      kicker: 'A Complete Islamic Experience',
      headline: 'More Than Remembrance',
      description:
        'ZIKR is an Islamic experience uniting the Holy Quran, reading modes, Azkar, and Islamic books within an interface focused on text clarity and effortless access to content.',
      primaryCta: 'Explore ZIKR Features',
      secondaryCta: 'Download the App',
      availabilityNote: 'Android release status',
      comingSoonStatus: 'Coming soon',
      visualCard: {
        sectionLabel: 'Text clarity and effortless access to content',
        arabicSampleTitle: 'Holy Quran · Azkar · Islamic Books',
        arabicSampleVerse: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ۝٢٨',
        arabicSampleSubtext: 'A calm interface placing content clarity and comfortable reading first',
        pillars: ['The Holy Quran', 'Reading Modes', 'Day & Night', 'Islamic Books'],
      },
    },
    intro: {
      sectionIndex: '01. Overview',
      heading: 'A Complete Islamic Experience',
      description:
        'ZIKR brings together reading the Holy Quran, Easy Reading, Continuous Reading, Azkar, and Islamic books in an organized experience dedicated to content clarity and ease of use.',
      highlights: [
        {
          title: 'Clear Arabic Script',
          summary: 'Thoughtful typography and balanced contrast designed for calm, comfortable reading.',
        },
        {
          title: 'Distinctive Reading Modes',
          summary: 'Combining Easy Reading for visual comfort with Continuous Reading for uninterrupted sequence.',
        },
        {
          title: 'Structured Organization',
          summary: 'Clearly arranged sections providing direct access to the Mushaf, daily Azkar, and Islamic books.',
        },
      ],
      exploreFeaturesCta: 'Explore all five core features',
      screenshots: {
        sectionIndex: 'App Preview',
        heading: 'ZIKR Android App Screenshots',
        subtitle:
          'An editorial tour through the real ZIKR Android interface across the Holy Quran reader, Adhkar categories, Day & Night path, Electronic Sebha, Books, Quranic Duas, Qibla compass, and Settings.',
        prevAria: 'Previous screenshot',
        nextAria: 'Next screenshot',
        zoomAria: 'Enlarge screenshot',
        closeZoomAria: 'Close enlarged preview',
        items: [
          {
            id: 'quran-mushaf-index',
            label: 'The Holy Quran — Mushaf & Index',
            caption: 'A dedicated experience for reading the Holy Quran, with Mushaf pages and effortless navigation across Surahs and pages.',
          },
          {
            id: 'quran-surahs',
            label: 'The Holy Quran — Surahs & Continue Reading',
            caption: 'Browse all 114 Surahs, Juz, and bookmarks with a one-tap Continue Reading card.',
          },
          {
            id: 'azkar',
            label: 'Daily Adhkar',
            caption: 'Morning and evening adhkar alongside organized daily remembrance categories for sleep, prayer, mosque, and travel.',
          },
          {
            id: 'day-night',
            label: 'Day & Night Path',
            caption: 'Your daily spiritual guide across 19 stages from waking up until sleep with prayer, Quran, and remembrance.',
          },
          {
            id: 'sebha',
            label: 'Electronic Sebha',
            caption: 'Focused digital Tasbih counter with authentic dhikr phrases and customizable target counts.',
          },
          {
            id: 'books',
            label: 'Books',
            caption: 'Read Islamic books with clear typography, saved page positions, and completion progress tracking.',
          },
          {
            id: 'duas',
            label: 'Quranic Duas',
            caption: 'Authenticated supplications from the Holy Quran with Surah and ayah references, copy, share, and favorites.',
          },
          {
            id: 'qibla',
            label: 'Qibla Direction',
            caption: 'Accurate Kaaba direction compass powered by device sensors with live bearing and distance to Makkah.',
          },
          {
            id: 'settings',
            label: 'Settings & Prayer Alerts',
            caption: 'Automatic GPS or manual location detection paired with prayer-time notifications and pre-prayer reminders.',
          },
        ],
      },
    },
    features: {
      sectionIndex: '02. ZIKR Features',
      heading: 'Five Core Pillars of ZIKR',
      subtitle: 'A clear structure bringing together essential Islamic reading and remembrance in a calm interface.',
      items: [
        {
          id: 'quran',
          number: '01',
          title: 'The Holy Quran',
          description:
            'Read the Holy Quran within an experience focused on Mushaf clarity and effortless navigation between Surahs and verses.',
        },
        {
          id: 'reading-modes',
          number: '02',
          title: 'Reading Modes (Al-Qira’ah Al-Muyassarah & Al-Mustamirrah)',
          description:
            'Two clearly distinguished reading modes designed for comfortable text readability and sequential reading flow:',
          readingModes: [
            {
              id: 'easy',
              title: 'Easy Reading (Al-Qira’ah Al-Muyassarah)',
              badge: 'Readability & reader comfort',
              description:
                'A reading mode focused on text clarity, ease of following the lines, and overall reader comfort.',
            },
            {
              id: 'continuous',
              title: 'Continuous Reading (Al-Qira’ah Al-Mustamirrah)',
              badge: 'Continuity & text sequence',
              description:
                'An experience that helps the reader continue reading smoothly while preserving the natural sequence of the text.',
            },
          ],
        },
        {
          id: 'azkar',
          number: '03',
          title: 'Day and Night (Al-Yawm wa Al-Laylah)',
          description:
            'Browse remembrances and supplications connected to the times and circumstances of the day within organized sections that make finding content effortless.',
        },
        {
          id: 'books',
          number: '04',
          title: 'Islamic Books (Al-Kutub)',
          description:
            'Browse the Islamic books available in ZIKR within a reading experience dedicated to clear text and straightforward access to the book’s content.',
        },
        {
          id: 'organized',
          number: '05',
          title: 'Organized Islamic Content',
          description:
            'Structuring Islamic content into clear sections helps you find the topic you are looking for with ease.',
        },
      ],
    },
    download: {
      sectionIndex: '03. Download',
      heading: 'Discover ZIKR',
      description:
        'Explore an experience that brings together the Holy Quran, reading modes, Azkar, and Islamic books.',
      platformLabel: 'Platform: Android (Official APK)',
      statusLabel: 'Availability:',
      comingSoon: 'Coming soon',
      downloadButtonReady: 'Download the App (APK)',
      downloadButtonUnavailable: 'Coming soon',
      honestNotice:
        'The official Android release is currently in preparation. The direct download button will be enabled here as soon as the authentic APK is available.',
      readFaqLink: 'Frequently asked questions about ZIKR',
    },
    faq: {
      sectionIndex: '04. Frequently Asked Questions',
      heading: 'Clear Answers About ZIKR',
      subtitle: 'Accurate information regarding ZIKR’s content, reading modes, and Android availability.',
      items: [
        {
          question: 'What does ZIKR offer?',
          answer:
            'ZIKR provides an integrated Islamic experience combining the Holy Quran, two distinct reading modes (Easy Reading and Continuous Reading), Day and Night Azkar, and Islamic books within clearly organized sections.',
        },
        {
          question: 'What is the difference between Easy Reading and Continuous Reading?',
          answer:
            'Easy Reading focuses on text legibility, comfortable pacing, and ease of following the text, whereas Continuous Reading helps the reader progress smoothly through the material in sequence.',
        },
        {
          question: 'Is the Android application available for download right now?',
          answer:
            'The Android release is currently shown as “Coming soon.” We do not publish placeholder files or unverified links; the direct APK download will be activated on this page once ready.',
        },
        {
          question: 'Which languages does the website support?',
          answer:
            'The official ZIKR website supports Arabic (with full right-to-left layout), English, and Amharic, and updates immediately when you switch languages.',
        },
      ],
    },
    footer: {
      tagline: 'More Than Remembrance — A Complete Islamic Experience.',
      closingMessage: 'The official website for ZIKR.',
      navigationHeading: 'Navigation',
      languageHeading: 'Language',
      appearanceHeading: 'Appearance',
      socialsHeading: 'Official Socials & Connect',
    },
    socials: {
      sectionIndex: 'Official Socials',
      heading: 'Follow ZIKR',
      subtitle: 'Your daily companion for Dhikr',
      connectWithUs: 'Connect With Us',
      directEmailLabel: 'Direct Email',
      visitChannel: 'Visit Channel',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      customizeButton: 'Customize Links',
      modalTitle: 'Customize Social Links',
      modalDescription: 'Update your social links or custom URLs to display them directly across the website.',
      urlPlaceholder: 'https://...',
      handlePlaceholder: '@username',
      save: 'Save Changes',
      cancel: 'Cancel',
      reset: 'Reset to Defaults',
    },
  },

  am: {
    meta: {
      title: 'ZIKR — ከዚክርም በላይ | ይፋዊ ድረ-ገጽ',
      description:
        'ZIKR ቅዱስ ቁርኣንን፣ የተለያዩ የንባብ ስልቶችን፣ አዝካሮችን እና ኢስላማዊ መጻሕፍትን በአንድ ላይ ያቀፈ፤ ለጽሑፍ ግልጽነት እና ለይዘት ተደራሽነት ትኩረት የሚሰጥ ኢስላማዊ ተሞክሮ ነው።',
    },
    a11y: {
      skipToContent: 'ወደ ዋናው ይዘት ይለፉ',
      mainNav: 'ዋና ማውጫ',
      languageSelector: 'የድረ-ገጽ ቋንቋ ይምረጡ',
      switchToLight: 'ወደ ብሩህ ገጽታ ይቀይሩ',
      switchToDark: 'ወደ ጨለማ ገጽታ ይቀይሩ',
      openMobileMenu: 'የሞባይል ማውጫውን ይክፈቱ',
      closeMobileMenu: 'የሞባይል ማውጫውን ይዝጉ',
      footerNav: 'የግርጌ ማውጫ',
    },
    nav: {
      home: 'መነሻ',
      about: 'አጠቃላይ እይታ',
      features: 'ገጽታዎች',
      download: 'አውርድ',
      faq: 'ጥያቄዎች',
      themeDark: 'ጨለማ',
      themeLight: 'ብሩህ',
      languageLabel: 'ቋንቋ',
    },
    hero: {
      kicker: 'የተሟላ ኢስላማዊ ተሞክሮ',
      headline: 'ከዚክርም በላይ',
      description:
        'ZIKR ቅዱስ ቁርኣንን፣ የንባብ ስልቶችን፣ አዝካሮችን እና ኢስላማዊ መጻሕፍትን በአንድ ላይ ያቀፈ፤ ለጽሑፍ ግልጽነት እና ይዘቶችን በቀላሉ ለማግኘት ትኩረት የሚሰጥ ኢስላማዊ ተሞክሮ ነው።',
      primaryCta: 'የZIKR ገጽታዎችን ይመልከቱ',
      secondaryCta: 'መተግበሪያውን ያውርዱ',
      availabilityNote: 'የአንድሮይድ ስሪት ሁኔታ',
      comingSoonStatus: 'በቅርቡ',
      visualCard: {
        sectionLabel: 'የጽሑፍ ግልጽነት እና ቀላል ተደራሽነት',
        arabicSampleTitle: 'ቅዱስ ቁርኣን · አዝካር · ኢስላማዊ መጻሕፍት',
        arabicSampleVerse: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ۝٢٨',
        arabicSampleSubtext: 'ለይዘት ግልጽነት እና ለምቹ ንባብ ቅድሚያ የሚሰጥ የተረጋጋ ንድፍ',
        pillars: ['ቅዱስ ቁርኣን', 'የንባብ ስልቶች', 'የቀንና የሌሊት አዝካር', 'ኢስላማዊ መጻሕፍት'],
      },
    },
    intro: {
      sectionIndex: '01. አጠቃላይ እይታ',
      heading: 'የተሟላ ኢስላማዊ ተሞክሮ',
      description:
        'ZIKR የቅዱስ ቁርኣን ንባብን፣ ቀላል ንባብን፣ ተከታታይ ንባብን፣ አዝካሮችን እና ኢስላማዊ መጻሕፍትን ለይዘት ግልጽነትና ለአጠቃቀም ምቾት ትኩረት በሚሰጥ የተደራጀ ተሞክሮ ውስጥ ያቀርባል።',
      highlights: [
        {
          title: 'ግልጽ የዓረብኛ ጽሑፍ',
          summary: 'ለዓይን ምቹ እና የተረጋጋ የንባብ ተሞክሮ እንዲኖር በጥንቃቄ የተመረጡ የፊደል አቀማመጦች።',
        },
        {
          title: 'ሁለት ግልጽ የንባብ ስልቶች',
          summary: 'ለአንባቢው ምቾት የሚሰጠውን «ቀላል ንባብ» እና የጽሑፉን ቅደም ተከተል የሚጠብቀውን «ተከታታይ ንባብ» ያካትታል።',
        },
        {
          title: 'ስርዓት ያለው አደረጃጀት',
          summary: 'ሙስሐፉን፣ የቀንና የሌሊት አዝካሮችን እንዲሁም ኢስላማዊ መጻሕፍትን በቀጥታ ለማግኘት የሚያስችሉ ግልጽ ክፍሎች።',
        },
      ],
      exploreFeaturesCta: 'አምስቱን ዋና ገጽታዎች በዝርዝር ይመልከቱ',
      screenshots: {
        sectionIndex: 'የመተግበሪያ ቅድመ-እይታ',
        heading: 'የZIKR አንድሮይድ መተግበሪያ ገጽታዎች',
        subtitle:
          'የቅዱስ ቁርኣን ማንበቢያን፣ የአዝካር ክፍሎችን፣ የቀንና የሌሊት መንገድን፣ ዲጂታል መስቢሃን፣ መጻሕፍትን፣ የቁርኣን ዱዓዎችን፣ የቂብላ አቅጣጫን እና ቅንብሮችን የሚያሳዩ ትክክለኛ የZIKR ገጽታዎችን ይመልከቱ።',
        prevAria: 'ቀዳሚ ገጽታ',
        nextAria: 'ቀጣይ ገጽታ',
        zoomAria: 'ገጽታውን አጉላ',
        closeZoomAria: 'የጎላውን ቅድመ-እይታ ዝጋ',
        items: [
          {
            id: 'quran-mushaf-index',
            label: 'ቅዱስ ቁርኣን — ሙስሐፍ እና ማውጫ',
            caption: 'የሙስሐፍ ገጾችን እና በሱራዎችና በገጾች መካከል በቀላሉ የመዘዋወር አማራጭን ያካተተ የቁርኣን ንባብ ተሞክሮ።',
          },
          {
            id: 'quran-surahs',
            label: 'ቅዱስ ቁርኣን — ሱራዎች እና ንባብ መቀጠያ',
            caption: '114 ሱራዎችን፣ ጁዞችን እና የተቀመጡ ገጾችን ከፈጣን የንባብ መቀጠያ ካርድ ጋር ይመልከቱ።',
          },
          {
            id: 'azkar',
            label: 'አዝካሮች',
            caption: 'የጧትና የማታ አዝካሮች እንዲሁም የእንቅልፍ፣ የሶላት፣ የመስጂድ እና የጉዞ አዝካሮች በግልጽ ክፍሎች።',
          },
          {
            id: 'day-night',
            label: 'የቀንና የሌሊት መንገድ',
            caption: 'ከመንቃት እስከ መኝታ በሶላት፣ በቁርኣን እና በዚክር የተዋቀረ ባለ 19 ደረጃ ዕለታዊ መመሪያ።',
          },
          {
            id: 'sebha',
            label: 'ዲጂታል መስቢሃ (Sebha)',
            caption: 'የተለያዩ የዚክር ቃላትን እና የቁጥር ዒላማዎችን ያካተተ የተረጋጋ ዲጂታል የተስቢህ መቁጠሪያ።',
          },
          {
            id: 'books',
            label: 'መጻሕፍት',
            caption: 'ኢስላማዊ መጻሕፍትን በግልጽ አቀራረብ ማንበቢያ፤ ያቆሙበትን ገጽ እና የንባብ ሂደትዎን በመቶኛ ያሳያል።',
          },
          {
            id: 'duas',
            label: 'የቁርኣን ዱዓዎች',
            caption: 'በቅዱስ ቁርኣን ውስጥ የተጠቀሱ ዱዓዎች ከሱራና አንቀጽ ማጣቀሻ እንዲሁም ከቅጂና ማጋሪያ መሳሪያዎች ጋር።',
          },
          {
            id: 'qibla',
            label: 'የቂብላ አቅጣጫ',
            caption: 'በመሳሪያዎ ሴንሰሮች የካዕባን አቅጣጫ፣ ማዕዘን እና እስከ መካ ያለውን ርቀት በትክክል የሚያሳይ ኮምፓስ።',
          },
          {
            id: 'settings',
            label: 'ቅንብሮች እና ማሳሰቢያዎች',
            caption: 'በGPS ወይም በእጅ አካባቢን መለየት እና የሶላት ሰዓት ማሳወቂያዎችን ከቅድመ-ማስታወሻ ጋር ማስተዳደር።',
          },
        ],
      },
    },
    features: {
      sectionIndex: '02. የZIKR ገጽታዎች',
      heading: 'አምስቱ የZIKR ዋና ምሰሶዎች',
      subtitle: 'ለዕለታዊ ንባብ እና ዚክር የሚያስፈልጉ ዋና ክፍሎችን በተረጋጋ እና ግልጽ በሆነ ገጽታ ያቀርባል።',
      items: [
        {
          id: 'quran',
          number: '01',
          title: 'ቅዱስ ቁርኣን (القرآن الكريم)',
          description:
            'የሙስሐፉን ግልጽነት በጠበቀ እና በሱራዎችና በአንቀጾች (አያቶች) መካከል በቀላሉ ለመዘዋወር በሚያስችል ተሞክሮ ቅዱስ ቁርኣንን ያንብቡ።',
        },
        {
          id: 'reading-modes',
          number: '02',
          title: 'የንባብ ስልቶች (أذكار)',
          description: 'ለጽሑፍ ግልጽነት እና ለንባብ ቅደም ተከተል ታስበው የተዘጋጁ ሁለት የተለያዩ የንባብ ስልቶች፦',
          readingModes: [
            {
              id: 'easy',
              title: 'ቀላል ንባብ (القراءة الميسّرة)',
              badge: 'የጽሑፍ ግልጽነት እና የአንባቢ ምቾት',
              description: 'በጽሑፉ ግልጽነት፣ በቀላሉ ለመከታተል እና በአንባቢው ምቾት ላይ የሚያተኩር የንባብ ስልት።',
            },
            {
              id: 'continuous',
              title: 'ተከታታይ ንባብ (القراءة المستمرة)',
              badge: 'የንባብ ቀጣይነት እና የጽሑፍ ቅደም ተከተል',
              description: 'የጽሑፉን ተፈጥሯዊ ቅደም ተከተል በመጠበቅ አንባቢው ንባቡን በተከታታይ እንዲቀጥል የሚያግዝ ተሞክሮ።',
            },
          ],
        },
        {
          id: 'azkar',
          number: '03',
          title: 'የቀንና የሌሊት አዝካሮች (اليوم والليلة)',
          description:
            'ከቀኑ ወቅቶች እና ሁኔታዎች ጋር የተያያዙ አዝካሮችን እና ዱዓዎችን ወደ ሚፈልጉት ይዘት በቀላሉ ለመድረስ በሚያስችሉ የተደራጁ ክፍሎች ውስጥ ይመልከቱ።',
        },
        {
          id: 'books',
          number: '04',
          title: 'ኢስላማዊ መጻሕፍት (كتب)',
          description:
            'በZIKR ውስጥ የሚገኙ ኢስላማዊ መጻሕፍትን ለጽሑፍ ግልጽነት እና ወደ መጽሐፉ ይዘት በቀላሉ ለመድረስ ትኩረት በሚሰጥ የንባብ ተሞክሮ ይመልከቱ።',
        },
        {
          id: 'organized',
          number: '05',
          title: 'የተደራጀ ኢስላማዊ ይዘት (محتوى إسلامي منظّم)',
          description:
            'ኢስላማዊ ይዘቶችን በግልጽ ክፍሎች ማደራጀቱ የሚፈልጉትን ርዕስ በቀላሉ ለማግኘት ይረዳዎታል።',
        },
      ],
    },
    download: {
      sectionIndex: '03. መተግበሪያውን ያውርዱ',
      heading: 'ZIKRን ይወቁ',
      description:
        'ቅዱስ ቁርኣንን፣ የተለያዩ የንባብ ስልቶችን፣ አዝካሮችን እና ኢስላማዊ መጻሕፍትን አጣምሮ የያዘውን ተሞክሮ ይመልከቱ።',
      platformLabel: 'ስርዓተ ክወና፦ Android (ይፋዊ APK)',
      statusLabel: 'የዝግጁነት ሁኔታ፦',
      comingSoon: 'በቅርቡ',
      downloadButtonReady: 'መተግበሪያውን ያውርዱ (APK)',
      downloadButtonUnavailable: 'በቅርቡ',
      honestNotice:
        'ይፋዊው የአንድሮይድ መተግበሪያ በአሁኑ ወቅት በዝግጅት ላይ ይገኛል። ትክክለኛው የAPK ፋይል ሲጠናቀቅ የማውረጃ ቁልፉ እዚህ በቀጥታ ይከፈታል።',
      readFaqLink: 'ስለ ZIKR ተደጋጋሚ ጥያቄዎችን ይመልከቱ',
    },
    faq: {
      sectionIndex: '04. ተደጋጋሚ ጥያቄዎች',
      heading: 'ስለ ZIKR ግልጽ መልሶች',
      subtitle: 'ስለ ZIKR ይዘቶች፣ የንባብ ስልቶች እና ስለ አንድሮይድ መተግበሪያው ዝግጁነት ትክክለኛ መረጃዎች።',
      items: [
        {
          question: 'ZIKR ምን ያቀርባል?',
          answer:
            'ZIKR ቅዱስ ቁርኣንን፣ ሁለት የንባብ ስልቶችን (ቀላል ንባብ እና ተከታታይ ንባብ)፣ የቀንና የሌሊት አዝካሮችን እና ኢስላማዊ መጻሕፍትን በግልጽ በተደራጁ ክፍሎች ውስጥ አጣምሮ ያቀርባል።',
        },
        {
          question: 'በቀላል ንባብ (القراءة الميسّرة) እና በተከታታይ ንባብ (القراءة المستمرة) መካከል ያለው ልዩነት ምንድን ነው?',
          answer:
            '«ቀላል ንባብ» በጽሑፉ ግልጽነት፣ በቀላሉ መከታተል እና በአንባቢው ምቾት ላይ ያተኩራል፤ «ተከታታይ ንባብ» ደግሞ የጽሑፉን ቅደም ተከተል በመጠበቅ ንባቡን በተከታታይ ለመቀጠል ያግዛል።',
        },
        {
          question: 'የአንድሮይድ መተግበሪያው አሁን ለማውረድ ዝግጁ ነው?',
          answer:
            'በአሁኑ ጊዜ መተግበሪያው «በቅርቡ» በሚል ሁኔታ ላይ ይገኛል። ያልተጠናቀቁ ፋይሎችን አናቀርብም፤ ይፋዊው የAPK ፋይል ሲዘጋጅ በዚህ ገጽ ላይ በቀጥታ ይቀርባል።',
        },
        {
          question: 'ይህ ድረ-ገጽ የትኞቹን ቋንቋዎች ይደግፋል?',
          answer:
            'ይፋዊው የZIKR ድረ-ገጽ ዓረብኛን (ከቀኝ ወደ ግራ አቀማመጥ ጋር)፣ እንግሊዝኛን እና አማርኛን ሙሉ በሙሉ ይደግፋል።',
        },
      ],
    },
    footer: {
      tagline: 'ከዚክርም በላይ — የተሟላ ኢስላማዊ ተሞክሮ።',
      closingMessage: 'የZIKR ይፋዊ ድረ-ገጽ።',
      navigationHeading: 'ማውጫ',
      languageHeading: 'ቋንቋ',
      appearanceHeading: 'ገጽታ',
      socialsHeading: 'ይፋዊ ማህበራዊ ገጾችና ግንኙነት',
    },
    socials: {
      sectionIndex: 'ይፋዊ የማህበራዊ ገጾች',
      heading: 'ዚክርን ይከተሉ',
      subtitle: 'ለዕለታዊ አዝካር ታማኝ ጓደኛዎ',
      connectWithUs: 'ከእኛ ጋር ይገናኙ',
      directEmailLabel: 'ቀጥታ ኢሜይል',
      visitChannel: 'ገጹን ይጎብኙ',
      copyLink: 'ሊንኩን ቅዳ',
      copied: 'ተቀድቷል!',
      customizeButton: 'ሊንኮችን ያብጁ',
      modalTitle: 'የማህበራዊ ገጽ ሊንኮችን ማበጀት',
      modalDescription: 'በድረ-ገጹ ላይ የሚታዩትን የማህበራዊ ገጾች ሊንኮችና መለያዎች እንደ ፍላጎትዎ ይቀይሩ።',
      urlPlaceholder: 'https://...',
      handlePlaceholder: '@መለያ',
      save: 'ለውጦችን መዝግብ',
      cancel: 'ሰርዝ',
      reset: 'ወደ ነባሪ መልስ',
    },
  },
};
