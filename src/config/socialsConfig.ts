import { LanguageCode } from '../i18n/translations';

export type SocialPlatform = 'tiktok' | 'telegram' | 'facebook' | 'instagram' | 'x';

export interface OfficialSocialLink {
  id: SocialPlatform;
  platform: SocialPlatform;
  label: Record<LanguageCode, string>;
  handle: string;
  url: string;
  description: Record<LanguageCode, string>;
  ariaLabel: Record<LanguageCode, string>;
  accentColor: string;
  glowColor: string;
  hoverBorder: string;
}

export const OFFICIAL_SOCIAL_LINKS: OfficialSocialLink[] = [
  {
    id: 'tiktok',
    platform: 'tiktok',
    label: {
      ar: 'تيك توك',
      en: 'TikTok',
      am: 'ቲክቶክ',
    },
    handle: '@thezikrapp',
    url: 'https://www.tiktok.com/@thezikrapp',
    description: {
      ar: 'مقاطع مرئية وتلاوات قرآنية وتذكيرات بالأذكار',
      en: 'Short video clips, recitations, and daily Dhikr reminders',
      am: 'አጫጭር ቪዲዮዎች፣ የቁርኣን ንባቦችና የአዝካር ማስታወሻዎች',
    },
    ariaLabel: {
      ar: 'تابع زِكْر على تيك توك (@thezikrapp)',
      en: 'Follow ZIKR on TikTok (@thezikrapp)',
      am: 'ZIKRን በቲክቶክ ይከተሉ (@thezikrapp)',
    },
    accentColor: '#fe2c55',
    glowColor: 'rgba(254, 44, 85, 0.22)',
    hoverBorder: 'hover:border-rose-500/40',
  },
  {
    id: 'telegram',
    platform: 'telegram',
    label: {
      ar: 'تيليجرام',
      en: 'Telegram',
      am: 'ቴሌግራም',
    },
    handle: '@thezikrapp',
    url: 'https://t.me/thezikrapp',
    description: {
      ar: 'القناة الرسمية للتحديثات والإعلانات والفوائد الإيمانية',
      en: 'Official channel for releases, announcements, and benefits',
      am: 'ይፋዊ ማስታወቂያዎችንና አዳዲስ ዝመናዎችን ለመከታተል',
    },
    ariaLabel: {
      ar: 'انضم إلى قناة زِكْر على تيليجرام (@thezikrapp)',
      en: 'Join ZIKR on Telegram (@thezikrapp)',
      am: 'የZIKR ቴሌግራም ቻናልን ይቀላቀሉ (@thezikrapp)',
    },
    accentColor: '#229ed9',
    glowColor: 'rgba(34, 158, 217, 0.22)',
    hoverBorder: 'hover:border-sky-500/40',
  },
  {
    id: 'facebook',
    platform: 'facebook',
    label: {
      ar: 'فيسبوك',
      en: 'Facebook',
      am: 'ፌስቡክ',
    },
    handle: 'thezikrapp',
    url: 'https://www.facebook.com/share/19WcUujJUG/',
    description: {
      ar: 'الصفحة الرسمية لمجتمع وتواصل مستخدمي زِكْر',
      en: 'Official Facebook community page for the ZIKR app',
      am: 'የZIKR ይፋዊ የፌስቡክ ገጽ',
    },
    ariaLabel: {
      ar: 'تابع صفحة زِكْر على فيسبوك (thezikrapp)',
      en: 'Follow ZIKR on Facebook (thezikrapp)',
      am: 'የZIKRን የፌስቡክ ገጽ ይከተሉ (thezikrapp)',
    },
    accentColor: '#1877f2',
    glowColor: 'rgba(24, 119, 242, 0.22)',
    hoverBorder: 'hover:border-blue-500/40',
  },
  {
    id: 'instagram',
    platform: 'instagram',
    label: {
      ar: 'إنستغرام',
      en: 'Instagram',
      am: 'ኢንስታግራም',
    },
    handle: '@thezikr.app',
    url: 'https://instagram.com/thezikr.app',
    description: {
      ar: 'تصميمات وبطاقات قرآنية وأذكار منتقاة بعناية فائقة',
      en: 'Curated visual Quranic cards and daily Dhikr reflections',
      am: 'ውብ የቁርኣን ምስላዊ ካርዶችና የተመረጡ አዝካሮች',
    },
    ariaLabel: {
      ar: 'تابع زِكْر على إنستغرام (@thezikr.app)',
      en: 'Follow ZIKR on Instagram (@thezikr.app)',
      am: 'ZIKRን በኢንስታግራም ይከተሉ (@thezikr.app)',
    },
    accentColor: '#e1306c',
    glowColor: 'rgba(225, 48, 108, 0.22)',
    hoverBorder: 'hover:border-pink-500/40',
  },
  {
    id: 'x',
    platform: 'x',
    label: {
      ar: 'منصة X',
      en: 'X',
      am: 'ኤክስ',
    },
    handle: '@thezikrapp',
    url: 'https://x.com/thezikrapp',
    description: {
      ar: 'متابعة الأخبار والتحديثات والإعلانات الرسمية للتطبيق',
      en: 'Official news, release announcements, and updates',
      am: 'ይፋዊ መግለጫዎችንና የመተግበሪያውን ዝመናዎች ለመከታተል',
    },
    ariaLabel: {
      ar: 'تابع زِكْر على منصة X (@thezikrapp)',
      en: 'Follow ZIKR on X (@thezikrapp)',
      am: 'ZIKRን በኤክስ (ትዊተር) ይከተሉ (@thezikrapp)',
    },
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.22)',
    hoverBorder: 'hover:border-emerald-500/40',
  },
];
