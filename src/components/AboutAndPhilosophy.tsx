import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FolderUp,
  Layers,
  Maximize2,
  Sparkles,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePreferences } from '../context/PreferencesContext';
import { LanguageCode } from '../i18n/translations';
import { ZikrEmblem, setCustomZikrLogoDataUrl } from './ZikrLogo';

export type ScreenshotId =
  | 'quran-mushaf-index'
  | 'quran-surahs'
  | 'azkar'
  | 'day-night'
  | 'sebha'
  | 'books'
  | 'duas'
  | 'qibla'
  | 'settings';

export type ShowcaseAreaId =
  | 'quran'
  | 'azkar'
  | 'day-night'
  | 'sebha'
  | 'books'
  | 'duas'
  | 'qibla'
  | 'settings';

/**
 * Genuine matching screenshot assets in /public/screenshots/ mapped to each slot.
 */
const GENUINE_SCREENSHOT_PATHS: Record<ScreenshotId, string> = {
  'quran-mushaf-index': '/screenshots/quran-mushaf-index.svg',
  'quran-surahs': '/screenshots/quran-surahs.svg',
  azkar: '/screenshots/azkar.svg',
  'day-night': '/screenshots/day-night.svg',
  sebha: '/screenshots/sebha.svg',
  books: '/screenshots/books.svg',
  duas: '/screenshots/duas.svg',
  qibla: '/screenshots/qibla.svg',
  settings: '/screenshots/settings.svg',
};

interface EditorialShowcaseArea {
  id: ShowcaseAreaId;
  index: string;
  accent: 'emerald' | 'ice';
  screens: ScreenshotId[];
  title: Record<LanguageCode, string>;
  kicker: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
  highlights: Record<LanguageCode, [string, string, string]>;
  screenLabels?: Partial<Record<ScreenshotId, Record<LanguageCode, string>>>;
}

const EDITORIAL_SHOWCASE_AREAS: EditorialShowcaseArea[] = [
  {
    id: 'quran',
    index: '01',
    accent: 'emerald',
    screens: ['quran-mushaf-index', 'quran-surahs'],
    title: {
      ar: 'القرآن الكريم',
      en: 'The Holy Quran',
      am: 'ቅዱስ ቁርኣን',
    },
    kicker: {
      ar: 'صفحات المصحف وفهرس السور',
      en: 'Mushaf Reader & Surah Directory',
      am: 'የሙስሐፍ አንባቢ እና የሱራ ማውጫ',
    },
    description: {
      ar: 'تجربة مخصصة لقراءة القرآن الكريم، مع صفحات المصحف والتنقل بين السور والصفحات بسهولة.',
      en: 'A dedicated experience for reading the Holy Quran, featuring Mushaf pages and effortless navigation across Surahs and pages.',
      am: 'ቅዱስ ቁርኣንን ለማንበብ የተዘጋጀ ልዩ ተሞክሮ፤ የሙስሐፍ ገጾችን እና በሱራዎችና በገጾች መካከል በቀላሉ የመዘዋወር አማራጭን ያካትታል።',
    },
    highlights: {
      ar: [
        'عرض صفحات المصحف الشريف مع خيار القراءة الميسّرة',
        'فهرس متكامل للسور والأجزاء والانتقال المباشر والمفضلة',
        'بطاقة متابعة القراءة للعودة الفورية إلى آخر موضع توقفت عنده',
      ],
      en: [
        'Mushaf page presentation paired with Easy Reading mode',
        'Complete index for Surahs, Juz, direct page jump, and favorites',
        'Continue Reading card returning you immediately to your last position',
      ],
      am: [
        'የሙስሐፍ ገጾች እይታ ከቀላል ንባብ አማራጭ ጋር',
        'የሱራዎች፣ የጁዞች፣ የቀጥታ ገጽ መዝለያ እና የተወዳጆች ማውጫ',
        'ካቆሙበት ቦታ ወዲያውኑ ለመቀጠል የሚያስችል የንባብ መከታተያ',
      ],
    },
    screenLabels: {
      'quran-mushaf-index': {
        ar: 'صفحة المصحف وفهرس السور',
        en: 'Mushaf Page & Index',
        am: 'የሙስሐፍ ገጽ እና ማውጫ',
      },
      'quran-surahs': {
        ar: 'قائمة السور ومتابعة القراءة',
        en: 'Surahs & Continue Reading',
        am: 'ሱራዎች እና ንባብ መቀጠያ',
      },
    },
  },
  {
    id: 'azkar',
    index: '02',
    accent: 'ice',
    screens: ['azkar'],
    title: {
      ar: 'الأذكار',
      en: 'Daily Adhkar',
      am: 'አዝካሮች',
    },
    kicker: {
      ar: 'أذكار الصباح والمساء وأبواب الذكر',
      en: 'Morning, Evening & Daily Remembrance',
      am: 'የጧት፣ የማታ እና ዕለታዊ አዝካሮች',
    },
    description: {
      ar: 'أذكار الصباح والمساء وأبواب الذكر اليومية المرتبة بعناية، مع آيات قرآنية وتصنيفات واضحة لسهولة الوصول.',
      en: 'Morning and evening adhkar alongside organized daily remembrance categories, framed with Quranic verses and clear visual navigation.',
      am: 'የጧት እና የማታ አዝካሮች ከዕለታዊ የዚክር ክፍሎች ጋር በጥንቃቄ የተደራጁ ሲሆን በቀላሉ ለማግኘት በግልጽ ተከፋፍለዋል።',
    },
    highlights: {
      ar: [
        'أذكار الصباح والمساء وأذكار النوم والصلاة والمسجد',
        'أذكار الوضوء والطعام والشراب والمنزل والسفر في أبواب منظمة',
        'بطاقة وصول سريع إلى مسار اليوم والليلة المتكامل',
      ],
      en: [
        'Morning, evening, sleep, prayer, and mosque remembrances',
        'Ablution, dining, home, and travel adhkar in structured sections',
        'Quick-launch banner into the full Day & Night spiritual journey',
      ],
      am: [
        'የጧት፣ የማታ፣ የእንቅልፍ፣ የሶላት እና የመስጂድ አዝካሮች',
        'የውዱእ፣ የምግብ፣ የቤት እና የጉዞ አዝካሮች በግልጽ ክፍሎች',
        'ወደ ቀንና ሌሊት መንፈሳዊ ጉዞ ፈጣን መግቢያ',
      ],
    },
  },
  {
    id: 'day-night',
    index: '03',
    accent: 'emerald',
    screens: ['day-night'],
    title: {
      ar: 'اليوم والليلة',
      en: 'Day & Night Path',
      am: 'የቀንና የሌሊት መንገድ',
    },
    kicker: {
      ar: 'المسار الإيماني اليومي عبر ١٩ مرحلة',
      en: '19-Stage Daily Spiritual Timeline',
      am: 'ባለ 19 ደረጃ ዕለታዊ መንፈሳዊ መመሪያ',
    },
    description: {
      ar: 'دليلك الإيماني عبر ساعات اليوم والليلة بالصلاة والقرآن والذكر، من الاستيقاظ حتى المنام ضمن مسار تفاعلي متسلسل.',
      en: 'Your faith companion across the hours of day and night through prayer, Quran, and dhikr—guiding you step by step from waking up until sleep.',
      am: 'ከእንቅልፍ ከመንቃት ጀምሮ እስከ መኝታ ድረስ በሶላት፣ በቁርኣን እና በዚክር የቀኑንና የሌሊቱን ሰዓታት የሚመራ መንፈሳዊ ጓደኛ።',
    },
    highlights: {
      ar: [
        'متابعة الإنجاز اليومي عبر ١٩ مرحلة إيمانية متتابعة',
        'ربط الأذكار والسنن بمواقيت الفجر والظهر والعصر وسائر الصلوات',
        'مراحل مخصصة للاستيقاظ والوضوء وورد القرآن والعمل والدراسة',
      ],
      en: [
        'Daily progress tracking across 19 sequential spiritual stages',
        'Integrates Fajr, Dhuhr, Asr, and prayer-time remembrances',
        'Dedicated stages for waking, ablution, Quran wird, and daily work',
      ],
      am: [
        'በ19 ተከታታይ መንፈሳዊ ደረጃዎች የዕለቱን ክንውን መከታተያ',
        'ከፈጅር፣ ዙህር፣ ዐስር እና ሌሎች የሶላት ወቅቶች ጋር የተቆራኘ',
        'ለመንቃት፣ ለውዱእ፣ ለቁርኣን ዊርድ እና ለሥራ የተዘጋጁ ደረጃዎች',
      ],
    },
  },
  {
    id: 'sebha',
    index: '04',
    accent: 'ice',
    screens: ['sebha'],
    title: {
      ar: 'السبحة',
      en: 'Electronic Sebha',
      am: 'ዲጂታል መስቢሃ (Sebha)',
    },
    kicker: {
      ar: 'اذكر الله يذكرك',
      en: 'Focused Digital Tasbih Counter',
      am: 'ትኩረትን የሚሰበስብ የዚክር መቁጠሪያ',
    },
    description: {
      ar: 'مسبحة إلكترونية بتصميم هادئ يساعدك على التسبيح والذكر، مع التبديل الفوري بين صيغ التسبيح وتحديد عدد المرات المستهدف.',
      en: 'A serene digital Tasbih interface designed for mindful remembrance, featuring instant dhikr phrase switching and customizable target counts.',
      am: 'ለተረጋጋ ዚክርና ተስቢህ የተዘጋጀ ዲጂታል መቁጠሪያ፤ የተለያዩ የዚክር ቃላትን እና የቁጥር ዒላማዎችን በቀላሉ ለመምረጥ ያስችላል።',
    },
    highlights: {
      ar: [
        'اختيار مباشر بين سبحان الله، الحمد لله، لا إله إلا الله، والله أكبر',
        'تحديد الهدف اليومي بمرونة (٣٣، ١٠٠، أو عدّاد مفتوح ∞)',
        'حلقة تسبيح مركزية واضحة مع زر إعادة الضبط الفوري',
      ],
      en: [
        'Direct selection between SubhanAllah, Alhamdulillah, La ilaha illa Allah, and Allahu Akbar',
        'Flexible target presets (33, 100, or open-ended counter ∞)',
        'Tactile central Tasbih ring with one-tap counter reset',
      ],
      am: [
        'ሱብሓነላህ፣ አልሐምዱ ሊላህ፣ ላ ኢላሀ ኢለላህ እና አላሁ አክበርን በቀጥታ መምረጫ',
        'ተለዋዋጭ የቁጥር ዒላማዎች (33፣ 100 ወይም ክፍት መቁጠሪያ ∞)',
        'ግልጽ የሆነ መካከለኛ የመቁጠሪያ ክብ ከፈጣን ማስጀመሪያ ቁልፍ ጋር',
      ],
    },
  },
  {
    id: 'books',
    index: '05',
    accent: 'emerald',
    screens: ['books'],
    title: {
      ar: 'كتب',
      en: 'Books',
      am: 'መጻሕፍት',
    },
    kicker: {
      ar: 'قراءة الكتب ومتابعة التقدم',
      en: 'Islamic Library & Reading Progress',
      am: 'ኢስላማዊ መጻሕፍት እና የንባብ ክትትል',
    },
    description: {
      ar: 'تجربة منظمة لقراءة الكتب الإسلامية بصيغة واضحة، مع حفظ صفحة التوقف وعرض نسبة الإنجاز لاستكمال القراءة في أي وقت.',
      en: 'An organized reading space for Islamic books with clear typography, automatic page bookmarking, and visual completion tracking.',
      am: 'ኢስላማዊ መጻሕፍትን በግልጽ አቀራረብ ለማንበብ የሚያስችል ክፍል፤ ያቆሙበትን ገጽ በማስታወስ የንባብ ሂደትዎን በመቶኛ ያሳያል።',
    },
    highlights: {
      ar: [
        'بطاقة «تابع القراءة» للانتقال المباشر إلى الصفحة الحالية',
        'مؤشر دقيق لعدد الصفحات المقروءة ونسبة الاكتمال',
        'عرض واضح لبيانات الكتاب ووصفه مع دعم ملفات PDF',
      ],
      en: [
        'Continue Reading banner jumping straight to your current page',
        'Precise page-count indicator and percentage completion bar',
        'Clean book cards with synopsis and built-in PDF reading support',
      ],
      am: [
        'ወደ ደረሱበት ገጽ በቀጥታ የሚወስድ «ንባብ ይቀጥሉ» ካርድ',
        'የተነበቡ ገጾችን ብዛት እና የማጠናቀቂያ መቶኛን የሚያሳይ መለኪያ',
        'የመጽሐፉን አጭር መግለጫ እና የPDF ንባብ ድጋፍን ያካተተ',
      ],
    },
  },
  {
    id: 'duas',
    index: '06',
    accent: 'ice',
    screens: ['duas'],
    title: {
      ar: 'أدعية القرآن',
      en: 'Quranic Duas',
      am: 'የቁርኣን ዱዓዎች',
    },
    kicker: {
      ar: 'أدعية وردت في القرآن الكريم',
      en: 'Verified Supplications from the Quran',
      am: 'በቅዱስ ቁርኣን ውስጥ የተጠቀሱ ዱዓዎች',
    },
    description: {
      ar: 'مجموعة من الأدعية الواردة في القرآن الكريم مع توثيق السورة ورقم الآية، مصممة في بطاقات واضحة تتيح النسخ والمشاركة والحفظ.',
      en: 'Curated supplications directly from the Holy Quran documented with Surah and ayah references, presented in clear cards for reading, copying, and sharing.',
      am: 'በቅዱስ ቁርኣን ውስጥ የተጠቀሱ ዱዓዎች ከሱራ ስም እና ከአንቀጽ ቁጥር ጋር ተደራጅተው ለመቅዳት፣ ለማጋራት እና ለማስቀመጥ በሚያመቹ ካርዶች ቀርበዋል።',
    },
    highlights: {
      ar: [
        'نص قرآني مضبوط بالشكل مع بيان السورة ورقم الآية والموضوع',
        'أدوات سريعة لنسخ الدعاء أو مشاركته أو استعراض تفاصيله',
        'إمكانية حفظ الأدعية في قائمة المفضلة للرجوع إليها بسهولة',
      ],
      en: [
        'Vocalized Quranic script tagged with Surah, ayah number, and context',
        'One-tap actions to copy, share, or inspect verse details',
        'Favorite bookmarking for quick personal access',
      ],
      am: [
        'ከሱራ ስም፣ ከአንቀጽ ቁጥር እና ከዐውዱ ጋር የቀረበ የቁርኣን ጽሑፍ',
        'ዱዓውን ለመቅዳት፣ ለማጋራት ወይም ዝርዝሩን ለማየት ፈጣን ቁልፎች',
        'በተወዳጆች ዝርዝር ውስጥ በማስቀመጥ በቀላሉ የመመለስ አማራጭ',
      ],
    },
  },
  {
    id: 'qibla',
    index: '07',
    accent: 'emerald',
    screens: ['qibla'],
    title: {
      ar: 'اتجاه القبلة',
      en: 'Qibla Direction',
      am: 'የቂብላ አቅጣጫ',
    },
    kicker: {
      ar: 'تحديد اتجاه الكعبة المشرفة بدقة',
      en: 'Precision Kaaba Compass & Distance',
      am: 'ትክክለኛ የካዕባ አቅጣጫ መጠቆሚያ',
    },
    description: {
      ar: 'بوصلة تفاعلية لتحديد اتجاه الكعبة المشرفة بدقة بواسطة مستشعرات الجهاز، مع عرض زاوية القبلة والمسافة إلى مكة المكرمة.',
      en: 'An interactive compass that determines the exact direction of the Holy Kaaba using device sensors, displaying Qibla bearing, alignment status, and distance to Makkah.',
      am: 'የመሳሪያዎን ሴንሰሮች በመጠቀም የቅዱስ ካዕባን አቅጣጫ በትክክል የሚያሳይ ኮምፓስ፤ የቂብላን ማዕዘን እና እስከ መካ ያለውን ርቀት ያሳያል።',
    },
    highlights: {
      ar: [
        'مؤشر بصري واضح يؤكد محاذاة الجهاز نحو القبلة مباشرة',
        'عرض زاوية القبلة بالدرجات والمسافة بالكيلومترات إلى الكعبة المشرفة',
        'بيان الموقع الحالي للجهاز ومستوى دقة مستشعر البوصلة',
      ],
      en: [
        'Visual alignment confirmation when facing the Qibla directly',
        'Live Qibla angle in degrees and distance in kilometers to the Kaaba',
        'Displays detected location and real-time compass sensor accuracy',
      ],
      am: [
        'ወደ ቂብላ በትክክል ሲዞሩ የሚያረጋግጥ ግልጽ ምልክት',
        'የቂብላን ማዕዘን በዲግሪ እና እስከ ካዕባ ያለውን ርቀት በኪሎሜትር ያሳያል',
        'ያሉበትን ቦታ እና የኮምፓሱን ትክክለኛነት ደረጃ ያሳያል',
      ],
    },
  },
  {
    id: 'settings',
    index: '08',
    accent: 'ice',
    screens: ['settings'],
    title: {
      ar: 'الإعدادات والتنبيهات',
      en: 'Settings & Prayer Alerts',
      am: 'ቅንብሮች እና ማሳሰቢያዎች',
    },
    kicker: {
      ar: 'تخصيص الموقع وإشعارات الصلاة',
      en: 'Location Detection & Prayer Reminders',
      am: 'የአካባቢ ልየታ እና የሶላት ማስታወሻዎች',
    },
    description: {
      ar: 'تخصيص شامل لتفضيلات التطبيق، يجمع بين الرصد التلقائي للموقع لحساب مواقيت الصلاة بدقة، وإدارة تنبيهات الأذان والتذكير قبل كل صلاة.',
      en: 'Comprehensive control over location detection—via automatic GPS or manual city selection—paired with customizable prayer-time notifications and pre-prayer reminders.',
      am: 'የሶላት ሰዓታትን በትክክል ለማስላት በGPS ወይም በእጅ አካባቢን የመምረጥ አማራጭ፤ ከሶላት በፊት የሚደርሱ ማሳሰቢያዎችን ከማስተዳደሪያ ጋር።',
    },
    highlights: {
      ar: [
        'تحديد الموقع تلقائياً عبر GPS أو يدوياً باختيار الدولة والمدينة',
        'تفعيل إشعارات أوقات الصلاة وتحديد وقت التذكير المسبق (١٥ أو ٢٠ دقيقة)',
        'بطاقة عرض مباشر للصلاة القادمة والوقت المتبقي لدخولها',
      ],
      en: [
        'Automatic GPS location detection or manual country and city selection',
        'Prayer time alerts with configurable advance reminders (15 or 20 minutes)',
        'Live countdown card highlighting the next upcoming prayer',
      ],
      am: [
        'በGPS በራስ-ሰር ወይም ሀገርና ከተማን በእጅ በመምረጥ አካባቢን መወሰን',
        'የሶላት ሰዓት ማሳወቂያዎች ከቅድመ-ማስታወሻ ምርጫ (ከ15 ወይም 20 ደቂቃ በፊት) ጋር',
        'ቀጣዩን ሶላት እና የቀረውን ሰዓት በቀጥታ የሚያሳይ ካርድ',
      ],
    },
  },
];

const IDB_NAME = 'zikr_original_screenshots_v2_db';
const IDB_STORE = 'screenshots';

function openScreenshotsDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadStoredScreenshots(): Promise<Record<string, string>> {
  try {
    const db = await openScreenshotsDb();
    return await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const result: Record<string, string> = {};
      const cursorReq = store.openCursor();
      cursorReq.onsuccess = () => {
        const cursor = cursorReq.result;
        if (cursor) {
          if (typeof cursor.key === 'string' && typeof cursor.value === 'string') {
            result[cursor.key] = cursor.value;
          }
          cursor.continue();
        } else {
          resolve(result);
        }
      };
      cursorReq.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

async function saveStoredScreenshot(slotId: ScreenshotId, dataUrl: string): Promise<void> {
  try {
    const db = await openScreenshotsDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(dataUrl, slotId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // Ignore storage quota/availability errors
  }
}

/**
 * Renders the genuine ZIKR Android screenshot inside the smartphone viewport
 * with zero filters, zero recoloring, and exact 540x1170 proportion.
 */
const OriginalScreenshotImage: React.FC<{
  id: ScreenshotId;
  alt: string;
  customSrc?: string;
  onSelectFilesClick?: () => void;
}> = ({ id, alt, customSrc, onSelectFilesClick }) => {
  const defaultPath = GENUINE_SCREENSHOT_PATHS[id];
  const [missingOnDisk, setMissingOnDisk] = useState(false);

  useEffect(() => {
    setMissingOnDisk(false);
  }, [defaultPath, customSrc]);

  const activeSrc = customSrc || defaultPath;

  if (missingOnDisk && !customSrc) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
        <p className="font-mono text-[11px] font-semibold text-emerald-400 break-all">
          {defaultPath}
        </p>
        {onSelectFilesClick && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectFilesClick();
            }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 cursor-pointer"
          >
            <FolderUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Load Screenshot</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => {
        if (!customSrc) {
          setMissingOnDisk(true);
        }
      }}
      className="block h-full w-full object-cover object-top select-none"
    />
  );
};

/**
 * Realistic Android Phone Hardware Frame wrapping each genuine ZIKR screenshot
 */
const SmartphoneFrame: React.FC<{
  id: ScreenshotId;
  alt: string;
  customSrc?: string;
  onSelectFilesClick?: () => void;
  isSelected?: boolean;
  size?: 'default' | 'secondary' | 'modal';
  accent?: 'emerald' | 'ice';
}> = ({
  id,
  alt,
  customSrc,
  onSelectFilesClick,
  isSelected = false,
  size = 'default',
  accent = 'emerald',
}) => {
  const widthClasses =
    size === 'modal'
      ? 'w-full max-w-[266px] sm:max-w-[334px]'
      : size === 'secondary'
        ? 'w-full max-w-[218px] sm:max-w-[244px] lg:max-w-[248px]'
        : 'w-full max-w-[250px] sm:max-w-[296px] lg:max-w-[308px]';

  const ambientGradient =
    accent === 'ice'
      ? 'radial-gradient(ellipse at 50% 42%, rgba(56, 189, 248, 0.24) 0%, rgba(16, 185, 129, 0.16) 48%, transparent 76%)'
      : 'radial-gradient(ellipse at 50% 42%, rgba(16, 185, 129, 0.25) 0%, rgba(56, 189, 248, 0.16) 48%, transparent 76%)';

  return (
    <div className={`relative mx-auto select-none ${widthClasses}`}>
      {/* Subtle Emerald & Ice-Blue Ambient Light Reflection Behind Android Frame */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-5 -z-10 rounded-[3.4rem] blur-2xl transition-opacity duration-500 ${
          isSelected ? 'opacity-95' : 'opacity-65 group-hover:opacity-95'
        }`}
        style={{ background: ambientGradient }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 left-1/2 -z-10 h-10 w-3/4 -translate-x-1/2 rounded-full blur-xl opacity-65"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.2) 0%, rgba(16, 185, 129, 0.14) 55%, transparent 80%)',
        }}
      />

      {/* Outer Metallic Dark Navy Android Phone Chassis */}
      <div
        className={`relative overflow-hidden rounded-[2.5rem] border bg-[#040911] p-2.5 shadow-[0_26px_60px_-14px_rgba(2,6,23,0.9),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-300 ${
          isSelected
            ? 'border-emerald-400/50'
            : 'border-slate-700/65 group-hover:border-emerald-400/40'
        }`}
      >
        {/* Top Earpiece Speaker & Front Camera Punch-Hole Bezel */}
        <div className="relative z-20 mx-auto mb-1.5 flex h-3.5 w-24 items-center justify-center gap-2 rounded-full bg-[#02060B] px-3">
          <span className="h-1 w-8 rounded-full bg-slate-800" />
          <span className="h-1.5 w-1.5 rounded-full bg-sky-900/90 ring-1 ring-slate-700" />
        </div>

        {/* Inner 540x1170 Android Viewport Screen */}
        <div className="relative aspect-[540/1170] w-full overflow-hidden rounded-[1.95rem] border border-white/[0.08] bg-[#050C09]">
          <OriginalScreenshotImage
            id={id}
            alt={alt}
            customSrc={customSrc}
            onSelectFilesClick={onSelectFilesClick}
          />
        </div>

        {/* Bottom Android Gesture Pill Indicator */}
        <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-slate-700/75" />
      </div>
    </div>
  );
};

export const AboutAndPhilosophy: React.FC = () => {
  const { t, setActiveView, dir, language } = usePreferences();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const areaRefs = useRef<Record<string, HTMLElement | null>>({});

  const [activeAreaId, setActiveAreaId] = useState<ShowcaseAreaId>('quran');
  const [activeQuranScreen, setActiveQuranScreen] = useState<ScreenshotId>('quran-mushaf-index');
  const [zoomedScreenId, setZoomedScreenId] = useState<ScreenshotId | null>(null);
  const [storedFiles, setStoredFiles] = useState<Record<string, string>>({});

  const screenshots = t.intro.screenshots.items;

  useEffect(() => {
    loadStoredScreenshots().then((loaded) => {
      setStoredFiles(loaded);
    });
  }, []);

  const handleOriginalFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const orderedSlots: ScreenshotId[] = [
      'quran-mushaf-index',
      'quran-surahs',
      'azkar',
      'day-night',
      'sebha',
      'books',
      'duas',
      'qibla',
      'settings',
    ];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== 'string') return;
        const dataUrl = reader.result;

        if (file.name.toLowerCase().includes('zikr')) {
          setCustomZikrLogoDataUrl(dataUrl);
          return;
        }

        const slotId = orderedSlots[index % orderedSlots.length];
        saveStoredScreenshot(slotId, dataUrl);
        setStoredFiles((prev) => ({
          ...prev,
          [slotId]: dataUrl,
        }));
      };
      reader.readAsDataURL(file);
    });

    event.target.value = '';
  };

  const triggerSelectOriginalFiles = () => {
    fileInputRef.current?.click();
  };

  const getHighlightIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <BookOpen className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />;
      case 1:
        return <Sparkles className="h-4 w-4 text-sky-400 shrink-0" aria-hidden="true" />;
      default:
        return <Layers className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />;
    }
  };

  const jumpToShowcaseArea = (areaId: ShowcaseAreaId) => {
    setActiveAreaId(areaId);
    const targetEl = areaRefs.current[areaId];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const zoomedScreenIndex = zoomedScreenId
    ? screenshots.findIndex((item) => item.id === zoomedScreenId)
    : -1;

  const stepZoomedScreen = (delta: number) => {
    if (zoomedScreenIndex < 0) return;
    const nextIdx = (zoomedScreenIndex + delta + screenshots.length) % screenshots.length;
    setZoomedScreenId(screenshots[nextIdx].id);
  };

  // Close zoomed modal on Escape or navigate with Arrow keys
  useEffect(() => {
    if (!zoomedScreenId) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomedScreenId(null);
      } else if (event.key === 'ArrowRight') {
        stepZoomedScreen(dir === 'rtl' ? -1 : 1);
      } else if (event.key === 'ArrowLeft') {
        stepZoomedScreen(dir === 'rtl' ? 1 : -1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedScreenId, zoomedScreenIndex, dir]);

  const inspectLabel =
    language === 'ar'
      ? 'معاينة الشاشة بالحجم الكامل'
      : language === 'am'
        ? 'ገጽታውን በሙሉ መጠን ይመልከቱ'
        : 'Inspect full-size screen';

  const showcaseSummaryMeta =
    language === 'ar'
      ? '٨ أقسام رئيسية · ٩ واجهات فعلية من تطبيق أندرويد'
      : language === 'am'
        ? '8 ዋና ክፍሎች · 9 ትክክለኛ የአንድሮይድ ገጽታዎች'
        : '8 Core App Areas · 9 Genuine Android Screens';

  return (
    <section
      id="about"
      className="relative w-full min-w-0 shrink-0 py-4 sm:py-6 lg:py-8 space-y-8 sm:space-y-12"
    >
      {/* Hidden input to allow loading custom screenshot files if desired */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        multiple
        className="hidden"
        onChange={handleOriginalFilesSelected}
      />

      {/* 1. Existing Overview Introduction Content (Preserved) */}
      <div className="relative mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Gentle Ambient Reflection Behind Introduction Panel */}
        <div
          aria-hidden="true"
          className="zikr-section-reflection zikr-ambient-orb-2 absolute -top-10 end-12 -z-10 h-60 w-72 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 54%, transparent 76%)',
          }}
        />
        <div className="zikr-glass rounded-[1.75rem] sm:rounded-[2rem] p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-10 items-center">
            {/* Primary Introduction Column */}
            <div className="lg:col-span-6 min-w-0">
              <div
                data-zikr-reveal="heading"
                style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
                className="flex items-center gap-2.5 min-w-0"
              >
                <ZikrEmblem size="sm" />
                <p className="min-w-0 break-words text-xs font-semibold leading-[1.4] text-emerald-500">
                  {t.intro.sectionIndex}
                </p>
              </div>
              <h2
                data-zikr-reveal="heading"
                style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
                className="zikr-heading-section mt-2.5 text-[var(--text-primary)]"
              >
                {t.intro.heading}
              </h2>
              <p
                data-zikr-reveal="editorial"
                style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
                className="zikr-body-lead mt-3.5 text-[var(--text-secondary)]"
              >
                {t.intro.description}
              </p>

              <div
                data-zikr-reveal="editorial"
                style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
                className="mt-6"
              >
                <button
                  type="button"
                  onClick={() => setActiveView('features')}
                  className="zikr-control-pill inline-flex max-w-full items-center gap-2.5 rounded-full px-5 py-3 sm:px-6 text-xs sm:text-sm font-semibold leading-[1.4] text-start sm:text-center text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
                >
                  <span className="break-words">{t.intro.exploreFeaturesCta}</span>
                  <ArrowRight
                    className={`h-4 w-4 text-emerald-500 shrink-0 ${
                      dir === 'rtl' ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* Structured Pillars Column */}
            <div className="lg:col-span-6 min-w-0 space-y-3.5">
              {t.intro.highlights.map((item, index) => (
                <div
                  key={index}
                  data-zikr-reveal="card"
                  style={{ '--reveal-delay': `${index * 65}ms` } as React.CSSProperties}
                  className="zikr-glass-subcard min-w-0 rounded-2xl p-4 sm:p-5 space-y-1.5"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="mt-0.5 shrink-0">{getHighlightIcon(index)}</span>
                    <h3 className="min-w-0 flex-1 break-words text-sm sm:text-base font-semibold leading-[1.42] text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="zikr-body-card text-[var(--text-secondary)]">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Redesigned Editorial ZIKR Android App Showcase Section */}
      <div
        id="app-screenshots"
        className="mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8"
      >
        <div className="zikr-glass relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] p-4 sm:p-8 lg:p-12">
          {/* Continuous Ambient Emerald & Ice-Blue Lighting Layers */}
          <div
            aria-hidden="true"
            className="zikr-section-reflection zikr-ambient-orb-1 pointer-events-none absolute -top-24 start-1/5 -z-10 h-80 w-96 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice) 52%, transparent 74%)',
            }}
          />
          <div
            aria-hidden="true"
            className="zikr-section-reflection zikr-ambient-orb-2 pointer-events-none absolute top-1/2 end-1/6 -z-10 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--ambient-ice) 0%, var(--ambient-emerald-soft) 52%, transparent 76%)',
            }}
          />
          <div
            aria-hidden="true"
            className="zikr-section-reflection zikr-ambient-orb-3 pointer-events-none absolute -bottom-24 start-1/3 -z-10 h-80 w-96 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--ambient-emerald) 0%, var(--ambient-ice-soft) 54%, transparent 76%)',
            }}
          />

          {/* Showcase Editorial Header */}
          <div className="border-b border-[var(--border-subtle)] pb-6 sm:pb-8">
            <div className="max-w-3xl min-w-0">
              <div
                data-zikr-reveal="heading"
                style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
                className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--text-muted)]"
              >
                <span className="font-semibold text-emerald-500">
                  {t.intro.screenshots.sectionIndex}
                </span>
                <span aria-hidden="true">·</span>
                <span>{showcaseSummaryMeta}</span>
              </div>

              <h2
                data-zikr-reveal="heading"
                style={{ '--reveal-delay': '55ms' } as React.CSSProperties}
                className="zikr-heading-section mt-2.5 text-[var(--text-primary)]"
              >
                {t.intro.screenshots.heading}
              </h2>

              <p
                data-zikr-reveal="editorial"
                style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
                className="zikr-body-lead mt-3 text-[var(--text-secondary)]"
              >
                {t.intro.screenshots.subtitle}
              </p>
            </div>

            {/* Interactive Quick-Jump Index Across All 8 App Areas */}
            <nav
              aria-label={t.intro.screenshots.heading}
              data-zikr-reveal="editorial"
              style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
              className="mt-6 flex flex-wrap items-center gap-2 pb-1"
            >
              {EDITORIAL_SHOWCASE_AREAS.map((area) => {
                const isSelected = activeAreaId === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => jumpToShowcaseArea(area.id)}
                    className={`inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-2 sm:px-4 text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'zikr-nav-item-active font-semibold text-[var(--text-primary)]'
                        : 'zikr-control-pill text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span
                      dir="ltr"
                      className="font-mono text-[11px] font-semibold text-emerald-400 tabular-nums shrink-0"
                    >
                      {area.index}
                    </span>
                    <span className="break-words">{area.title[language]}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Alternating Editorial Showcase Chapters */}
          <div className="divide-y divide-[var(--border-subtle)]">
            {EDITORIAL_SHOWCASE_AREAS.map((area, areaIdx) => {
              const isEvenRow = areaIdx % 2 === 1;
              const isDualQuranArea = area.screens.length > 1;
              const primaryScreenId = isDualQuranArea ? activeQuranScreen : area.screens[0];
              const accentTextClass =
                area.accent === 'ice' ? 'text-sky-400' : 'text-emerald-400';

              return (
                <article
                  key={area.id}
                  ref={(el) => {
                    areaRefs.current[area.id] = el;
                  }}
                  onMouseEnter={() => setActiveAreaId(area.id)}
                  className="py-8 sm:py-12 lg:py-16 first:pt-7 last:pb-4"
                >
                  <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Editorial Narrative Column */}
                    <div
                      className={`lg:col-span-6 min-w-0 flex flex-col items-start text-start ${
                        isEvenRow ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      {/* Unboxed Editorial Index & Kicker */}
                      <div
                        data-zikr-reveal="heading"
                        className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--text-muted)]"
                      >
                        <span
                          dir="ltr"
                          className={`font-mono font-semibold tabular-nums shrink-0 ${accentTextClass}`}
                        >
                          {area.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="break-words">{area.kicker[language]}</span>
                      </div>

                      {/* Feature Title */}
                      <h3
                        data-zikr-reveal="heading"
                        className="mt-2.5 text-xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] break-words"
                      >
                        {area.title[language]}
                      </h3>

                      {/* Concise Editorial Description */}
                      <p
                        data-zikr-reveal="editorial"
                        className="zikr-body-lead mt-3.5 text-[var(--text-secondary)]"
                      >
                        {area.description[language]}
                      </p>

                      {/* Dual-Screen Interactive Switcher for The Holy Quran */}
                      {isDualQuranArea && area.screenLabels && (
                        <div
                          data-zikr-reveal="editorial"
                          className="mt-5 w-full max-w-md min-w-0"
                        >
                          <div className="zikr-pill-track inline-flex max-w-full flex-wrap items-center gap-1 rounded-2xl p-1">
                            {area.screens.map((screenId) => {
                              const active = activeQuranScreen === screenId;
                              const labelObj = area.screenLabels?.[screenId];
                              return (
                                <button
                                  key={screenId}
                                  type="button"
                                  onClick={() => setActiveQuranScreen(screenId)}
                                  className={`max-w-full rounded-xl px-3 py-2 sm:px-3.5 text-xs font-medium text-start sm:text-center transition-all cursor-pointer ${
                                    active
                                      ? 'zikr-nav-item-active font-semibold text-[var(--text-primary)]'
                                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                  }`}
                                >
                                  <span className="break-words">
                                    {labelObj ? labelObj[language] : screenId}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Structured Feature Highlights List (Hairline-Divided, No Pill Clutter) */}
                      <ul className="mt-6 w-full min-w-0 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
                        {area.highlights[language].map((point, ptIdx) => (
                          <li
                            key={ptIdx}
                            data-zikr-reveal="editorial"
                            style={{ '--reveal-delay': `${ptIdx * 45}ms` } as React.CSSProperties}
                            className="flex items-start gap-3 py-3 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]"
                          >
                            <span
                              dir="ltr"
                              className={`mt-0.5 font-mono text-[11px] font-semibold tabular-nums shrink-0 ${accentTextClass}`}
                            >
                              0{ptIdx + 1}
                            </span>
                            <span className="min-w-0 flex-1 break-words">{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Enlarge / Inspect Screen Action */}
                      <div
                        data-zikr-reveal="editorial"
                        className="mt-6 flex flex-wrap items-center gap-3 w-full sm:w-auto"
                      >
                        <button
                          type="button"
                          onClick={() => setZoomedScreenId(primaryScreenId)}
                          className="zikr-control-pill inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2.5 sm:px-5 text-xs font-semibold text-start sm:text-center text-[var(--text-primary)] hover:border-emerald-500/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
                        >
                          <Maximize2
                            className={`h-3.5 w-3.5 shrink-0 ${accentTextClass}`}
                            aria-hidden="true"
                          />
                          <span className="break-words">{inspectLabel}</span>
                        </button>
                      </div>
                    </div>

                    {/* Realistic Android Phone Stage Column */}
                    <div
                      data-zikr-reveal="mockup"
                      className={`lg:col-span-6 min-w-0 flex flex-col items-center justify-center ${
                        isEvenRow ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      {isDualQuranArea ? (
                        /* Dual-Phone Editorial Showcase for The Holy Quran */
                        <div className="relative flex w-full min-w-0 flex-col items-center justify-center gap-6 md:flex-row md:items-end md:justify-center md:gap-5 lg:gap-6">
                          {area.screens.map((screenId) => {
                            const isPrimary = activeQuranScreen === screenId;
                            const labelObj = area.screenLabels?.[screenId];
                            const screenTitle = labelObj
                              ? `${area.title[language]} — ${labelObj[language]}`
                              : area.title[language];

                            return (
                              <div
                                key={screenId}
                                onClick={() => {
                                  if (activeQuranScreen === screenId) {
                                    setZoomedScreenId(screenId);
                                  } else {
                                    setActiveQuranScreen(screenId);
                                  }
                                }}
                                className={`group relative flex w-full md:w-auto min-w-0 flex-col items-center transition-all duration-300 cursor-pointer ${
                                  isPrimary
                                    ? 'z-20 scale-100 opacity-100'
                                    : 'hidden md:flex z-10 md:scale-95 md:opacity-80 hover:opacity-100'
                                }`}
                              >
                                <SmartphoneFrame
                                  id={screenId}
                                  alt={screenTitle}
                                  customSrc={storedFiles[screenId]}
                                  onSelectFilesClick={triggerSelectOriginalFiles}
                                  isSelected={isPrimary}
                                  size={isPrimary ? 'default' : 'secondary'}
                                  accent={area.accent}
                                />
                                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-2 text-center text-xs text-[var(--text-muted)]">
                                  <span className="font-medium text-[var(--text-secondary)] break-words">
                                    {labelObj ? labelObj[language] : ''}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setZoomedScreenId(screenId);
                                    }}
                                    className="font-semibold text-emerald-400 hover:underline cursor-pointer"
                                  >
                                    {t.intro.screenshots.zoomAria}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Single-Phone High-Clarity Editorial Stage */
                        <div
                          onClick={() => setZoomedScreenId(primaryScreenId)}
                          className="group relative flex w-full min-w-0 flex-col items-center transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
                        >
                          <SmartphoneFrame
                            id={primaryScreenId}
                            alt={area.title[language]}
                            customSrc={storedFiles[primaryScreenId]}
                            onSelectFilesClick={triggerSelectOriginalFiles}
                            isSelected={activeAreaId === area.id}
                            size="default"
                            accent={area.accent}
                          />
                          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-2 text-center text-xs text-[var(--text-muted)]">
                            <span
                              dir="ltr"
                              className={`font-mono font-semibold tabular-nums ${accentTextClass}`}
                            >
                              {area.index}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium text-[var(--text-secondary)] break-words">
                              {area.title[language]}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-emerald-400 group-hover:underline">
                              {t.intro.screenshots.zoomAria}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enlarged Full-Screen Smartphone Preview Modal */}
      <AnimatePresence>
        {zoomedScreenId && zoomedScreenIndex >= 0 && screenshots[zoomedScreenIndex] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={screenshots[zoomedScreenIndex].label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-md"
            onClick={() => setZoomedScreenId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.94 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="zikr-floating-bar relative flex max-h-[94dvh] w-full max-w-lg min-w-0 flex-col items-center overflow-y-auto rounded-[1.85rem] sm:rounded-[2.25rem] p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex w-full min-w-0 items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-sm sm:text-base font-bold text-[var(--text-primary)]">
                    {screenshots[zoomedScreenIndex].label}
                  </h3>
                  <p className="mt-0.5 break-words text-xs text-[var(--text-secondary)]">
                    {screenshots[zoomedScreenIndex].caption}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomedScreenId(null)}
                  aria-label={t.intro.screenshots.closeZoomAria}
                  className="zikr-control-pill inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] hover:text-emerald-400 cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <SmartphoneFrame
                id={screenshots[zoomedScreenIndex].id}
                alt={screenshots[zoomedScreenIndex].label}
                customSrc={storedFiles[screenshots[zoomedScreenIndex].id]}
                onSelectFilesClick={triggerSelectOriginalFiles}
                isSelected
                size="modal"
              />

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => stepZoomedScreen(-1)}
                  aria-label={t.intro.screenshots.prevAria}
                  className="zikr-control-pill inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] cursor-pointer"
                >
                  {dir === 'rtl' ? (
                    <ChevronRight className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <ChevronLeft className="h-4 w-4 text-emerald-400" />
                  )}
                </button>
                <span
                  dir="ltr"
                  className="font-mono text-xs font-semibold text-[var(--text-secondary)] tabular-nums"
                >
                  {zoomedScreenIndex + 1} / {screenshots.length}
                </span>
                <button
                  type="button"
                  onClick={() => stepZoomedScreen(1)}
                  aria-label={t.intro.screenshots.nextAria}
                  className="zikr-control-pill inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] cursor-pointer"
                >
                  {dir === 'rtl' ? (
                    <ChevronLeft className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-emerald-400" />
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
