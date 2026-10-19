import { LanguageCode } from '../i18n/translations';

const ARABIC_INDIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;

/**
 * Converts Western digits (0-9) into Eastern Arabic-Indic digits (٠-٩)
 * while preserving existing Eastern Arabic-Indic digits.
 */
export function toArabicIndicDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => ARABIC_INDIC_DIGITS[Number(digit)] || digit);
}

/**
 * Normalizes Eastern Arabic-Indic digits (٠-٩) to Western digits (0-9) for range parsing.
 */
function toWesternDigits(value: string): string {
  return value.replace(/[٠-٩]/g, (digit) => String(ARABIC_INDIC_DIGITS.indexOf(digit as (typeof ARABIC_INDIC_DIGITS)[number])));
}

/**
 * Parses an ayahNumber string or number (e.g. "152", "41–42", "36-37")
 * into an ordered list of Eastern Arabic-Indic verse numbers (e.g. ["٤١", "٤٢"]).
 */
export function parseAyahNumbers(ayahNumber?: string | number): string[] {
  if (ayahNumber === undefined || ayahNumber === null) return [];
  const normalized = toWesternDigits(String(ayahNumber)).trim();
  if (!normalized) return [];

  const rangeMatch = normalized.match(/^(\d+)\s*[-–—]\s*(\d+)$/);
  if (rangeMatch) {
    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);
    if (Number.isFinite(start) && Number.isFinite(end) && end >= start && end - start <= 20) {
      const result: string[] = [];
      for (let num = start; num <= end; num += 1) {
        result.push(toArabicIndicDigits(num));
      }
      return result;
    }
  }

  const matches = normalized.match(/\d+/g);
  if (!matches || matches.length === 0) return [];
  return matches.map((num) => toArabicIndicDigits(num));
}

/**
 * Ensures every Quranic ayah marker (۝) in Uthmani Quran text is immediately
 * followed by its verified Eastern Arabic-Indic verse number with no space
 * between them (e.g. ۝١ ۝٢ ۝٣), never leaving ۝ without a number or separated by whitespace.
 */
export function formatQuranAyahMarkers(
  arabicText: string,
  ayahNumber?: string | number
): string {
  if (!arabicText) return arabicText;

  const expectedNumbers = parseAyahNumbers(ayahNumber);

  // 1. Remove any whitespace or invisible separators between ۝ and following digits,
  //    and convert any Western digits attached to ۝ into Eastern Arabic-Indic digits.
  let formatted = arabicText.replace(
    /۝[\s\u00A0\u200B-\u200F\u202F\u2060]*([0-9٠-٩]+)/g,
    (_match, digits: string) => `۝${toArabicIndicDigits(digits)}`
  );

  // 2. Replace any bare ۝ (not followed by an Eastern Arabic-Indic digit) with ۝ + verse number.
  let markerCursor = 0;
  formatted = formatted.replace(/۝(?![٠-٩])/g, () => {
    const fallbackNum =
      expectedNumbers[markerCursor] ??
      expectedNumbers[expectedNumbers.length - 1] ??
      '';
    markerCursor += 1;
    return fallbackNum ? `۝${fallbackNum}` : '۝';
  });

  // 3. Ensure the verse ends with its final ayah marker if ayahNumber is provided
  //    and the final ayah marker is not yet present at the end of the verse.
  if (expectedNumbers.length > 0) {
    const lastExpectedNumber = expectedNumbers[expectedNumbers.length - 1];
    const hasEndingMarker = /۝[٠-٩]+\s*﴾?\s*$/.test(formatted);
    if (!hasEndingMarker && lastExpectedNumber) {
      if (formatted.endsWith('﴾')) {
        formatted = `${formatted.slice(0, -1).trimEnd()} ۝${lastExpectedNumber}﴾`;
      } else {
        formatted = `${formatted.trimEnd()} ۝${lastExpectedNumber}`;
      }
    }
  }

  return formatted;
}

export interface QuranVerseEntry {
  id: string;
  /** Exact, verified Arabic Quranic text (unchanged across all languages) */
  arabicText: string;
  /** Surah name in Arabic, English, and Amharic */
  surahName: Record<LanguageCode, string>;
  /** Surah number (1-114) */
  surahNumber: number;
  /** Ayah number or range (e.g. "152" or "41–42") */
  ayahNumber: string;
  /** Verified translations in English and Amharic */
  translation: {
    en: string;
    am?: string;
  };
  /** Concise explanation grounded in classical Tafsir (Ibn Kathir / Al-Sa'di) */
  explanation?: Record<LanguageCode, string>;
}

export interface VirtueEditorialPillar {
  id: string;
  number: string;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
}

export interface DailyRhythmStage {
  id: 'morning' | 'daytime' | 'night';
  number: string;
  timeLabel: Record<LanguageCode, string>;
  title: Record<LanguageCode, string>;
  description: Record<LanguageCode, string>;
}

export interface AuthenticHadithEntry {
  id: string;
  numberLabel: string;
  /** Thematic title for quick editorial scanning */
  topic: Record<LanguageCode, string>;
  /** Complete, verified Arabic hadith text including narrator */
  arabicText: string;
  /** Accurate source collection and verified hadith number */
  source: Record<LanguageCode, string>;
  /** Verified authenticity grading */
  authenticity: Record<LanguageCode, string>;
  /** Verified translations in English and Amharic */
  translation: {
    en: string;
    am?: string;
  };
  /** Concise explanation of the hadith's meaning */
  explanation: Record<LanguageCode, string>;
}

export interface MinimalZikrPillarItem {
  id: 'quran' | 'azkar' | 'day-night' | 'books';
  number: string;
  title: Record<LanguageCode, string>;
  summary: Record<LanguageCode, string>;
}

export interface ClosingReflectionConfig {
  verse: QuranVerseEntry;
  hadith: AuthenticHadithEntry;
  closingHeading: Record<LanguageCode, string>;
  closingMessage: Record<LanguageCode, string>;
  primaryCtaLabel: Record<LanguageCode, string>;
  secondaryCtaLabel: Record<LanguageCode, string>;
}

/**
 * 1. THE VIRTUE OF DHIKR — Compact Two-Column Editorial Section
 * Anchored by a single foundational Quranic verse (Surah Al-Baqarah 2:152)
 * paired with three structured editorial pillars on the station of remembrance.
 */
export const VIRTUE_FOUNDATION_VERSE: QuranVerseEntry = {
  id: 'baqarah-152',
  arabicText: '﴿فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ ۝١٥٢﴾',
  surahName: {
    ar: 'سورة البقرة',
    en: 'Surah Al-Baqarah',
    am: 'ሱረቱ አል-በቀራህ',
  },
  surahNumber: 2,
  ayahNumber: '152',
  translation: {
    en: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    am: 'አስታውሱኝም፤ አስታውሳችኋለሁና። አመስግኑኝም፤ አትካዱኝም።',
  },
  explanation: {
    ar: 'أمرٌ إلهي بذكر الله تعالى بالقلب واللسان والجوارح، مقرونٌ بأعظم جزاءٍ يناله العبد: أن يذكره اللهُ سبحانه في الملأ الأعلى بالرحمة والثناء والتوفيق.',
    en: 'A divine command to remember Allah in heart, word, and deed, paired with the greatest honor a believer can attain: that Allah Himself remembers those who remember Him with mercy and guidance.',
    am: 'አላህን በልብ፣ በምላስና በተግባር የማውሳት ትዕዛዝ፤ አላህም የሚያወሱትን በእዝነቱና በድጋፉ እንደሚያስታውሳቸው የተገባ ታላቅ ቃል ኪዳን።',
  },
};

export const VIRTUE_EDITORIAL_PILLARS: readonly VirtueEditorialPillar[] = [
  {
    id: 'divine-remembrance',
    number: '01',
    title: {
      ar: 'شرف الذكر ومعيّة الله تعالى',
      en: 'The Honor of Divine Remembrance',
      am: 'የዚክር ክብርና የአላህ ቅርበት',
    },
    description: {
      ar: 'ذكر الله ليس مجرد كلماتٍ تُردّد، بل هو صلةٌ حيّةٌ بين العبد وربه تثمر القرب والسكينة والهدى.',
      en: 'Remembrance is a living connection between the servant and their Lord, cultivating nearness, guidance, and spiritual clarity.',
      am: 'ዚክር በባሪያውና በጌታው መካከል ያለ ሕያው ትስስር ሲሆን ቅርበትን፣ ምሪትንና መንፈሳዊ ጥራትን ያስገኛል።',
    },
  },
  {
    id: 'heart-serenity',
    number: '02',
    title: {
      ar: 'طمأنينة القلب وجلاء الهموم',
      en: 'Serenity and Renewal of the Heart',
      am: 'የልብ መረጋጋትና መታደስ',
    },
    description: {
      ar: 'بالذكر يزول قلق القلب ووحشته، ويحلّ فيه اليقين والرضا والانشراح بنور الإيمان.',
      en: 'Through regular remembrance, restlessness subsides and the heart finds lasting tranquility, certainty, and inner peace.',
      am: 'በቋሚ ዚክር የልብ መሸበር ይወገዳል፤ በምትኩም ዘላቂ መረጋጋት፣ እርግጠኝነትና የውስጥ ሰላም ይሰፍናል።',
    },
  },
  {
    id: 'lasting-reward',
    number: '03',
    title: {
      ar: 'عملٌ يسير وأجرٌ عظيم مدّخر',
      en: 'Effortless Practice, Immense Reward',
      am: 'ቀላል ተግባር፣ ታላቅ ምንዳ',
    },
    description: {
      ar: 'من رحمة الله بعباده أن جعل الذكر ميسّرًا في كل وقتٍ وحال، ورتّب عليه المغفرة والأجر العظيم.',
      en: 'Out of Allah’s mercy, remembrance requires neither fixed place nor heavy effort, yet carries immense weight in the Hereafter.',
      am: 'ከአላህ እዝነት የተነሳ ዚክር የተወሰነ ቦታ ወይም ከባድ ልፋት ሳይጠይቅ በአኼራ ታላቅ ምንዳ ያስገኛል።',
    },
  },
];

/**
 * 2. CONFIGURABLE FEATURED QURANIC VERSES
 * Curated, non-duplicate Quranic verses that can be switched smoothly or updated
 * from this central array without changing page layout.
 */
export const DEFAULT_FEATURED_VERSE_ID = 'ahzab-41-42';

export const FEATURED_QURAN_VERSES: readonly QuranVerseEntry[] = [
  {
    id: 'ahzab-41-42',
    arabicText:
      '﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا ۝٤١ وَسَبِّحُوهُ بُكْرَةً وَأَصِيلًا ۝٤٢﴾',
    surahName: {
      ar: 'سورة الأحزاب',
      en: 'Surah Al-Ahzab',
      am: 'ሱረቱ አል-አሕዛብ',
    },
    surahNumber: 33,
    ayahNumber: '41–42',
    translation: {
      en: 'O you who have believed, remember Allah with much remembrance, and exalt Him morning and afternoon.',
      am: 'እናንተ ያመናችሁ ሆይ! አላህን ብዙን ማውሳት አውሱት። በጧትና በማታም አጥሩት (አወድሱት)።',
    },
    explanation: {
      ar: 'إرشادٌ للمؤمنين إلى الإكثار من ذكر الله تعالى في سائر الأوقات، وتخصيص البكرة (أول النهار) والأصيل (آخره) بالتسبيح والذكر لشرف هذين الوقتين.',
      en: 'Believers are guided to remember Allah abundantly at all times, with special emphasis on glorifying Him at the beginning and end of each day.',
      am: 'ምዕመናን በሁሉም ጊዜያት አላህን በብዛት እንዲያወሱና በተለይም በቀኑ መጀመሪያ (ጧት) እና መጨረሻ (ማታ) ላይ እንዲያወድሱት የሚያሳስብ መመሪያ።',
    },
  },
  {
    id: 'ahzab-35',
    arabicText:
      '﴿وَٱلذَّٰكِرِينَ ٱللَّهَ كَثِيرًا وَٱلذَّٰكِرَٰتِ أَعَدَّ ٱللَّهُ لَهُم مَّغْفِرَةً وَأَجْرًا عَظِيمًا ۝٣٥﴾',
    surahName: {
      ar: 'سورة الأحزاب',
      en: 'Surah Al-Ahzab',
      am: 'ሱረቱ አል-አሕዛብ',
    },
    surahNumber: 33,
    ayahNumber: '35',
    translation: {
      en: 'And the men who remember Allah often and the women who do so — for them Allah has prepared forgiveness and a great reward.',
      am: 'አላህን በብዛት የሚያወሱ ወንዶችና የሚያወሱ ሴቶችም አላህ ለእነርሱ ምሕረትንና ታላቅ ምንዳን አዘጋጅቶላቸዋል።',
    },
    explanation: {
      ar: 'وعدٌ كريم من الله تعالى للمكثرين من ذكره من المؤمنين والمؤمنات بالمغفرة لذنوبهم والأجر العظيم في الآخرة.',
      en: "Allah's explicit promise of forgiveness and a magnificent reward prepared for believing men and women who remember Him frequently.",
      am: 'አላህን በብዛት ለሚያወሱ ምዕመናን ወንዶችና ሴቶች አላህ ምሕረትንና ታላቅ ምንዳን እንዳዘጋጀላቸው የሚገልጽ የተረጋገጠ ቃል።',
    },
  },
  {
    id: 'araf-205',
    arabicText:
      '﴿وَاذْكُر رَّبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً وَدُونَ الْجَهْرِ مِنَ الْقَوْلِ بِالْغُدُوِّ وَالْآصَالِ وَلَا تَكُن مِّنَ الْغَافِلِينَ ۝٢٠٥﴾',
    surahName: {
      ar: 'سورة الأعراف',
      en: "Surah Al-A'raf",
      am: 'ሱረቱ አል-አዕራፍ',
    },
    surahNumber: 7,
    ayahNumber: '205',
    translation: {
      en: 'And remember your Lord within yourself in humility and in fear without being apparent in speech — in the mornings and the evenings. And do not be among the heedless.',
      am: 'ጌታህንም በነፍስህ ውስጥ በመዋረድና በመፍራት፣ ከቃልም በመጮህ በታች በሆነ ድምፅ በጧትና በማታ አውሳ። ከዘንጊዎቹም አትሁን።',
    },
    explanation: {
      ar: 'بيانٌ لأدب الذكر الجامع بين حضور القلب بالتضرع والخشية، والاعتدال في الصوت، والمواظبة عليه صباحًا ومساءً للبعد عن الغفلة.',
      en: 'Teaches the etiquette of remembrance: combining inner humility and awe with moderate speech and steadfastness every morning and evening.',
      am: 'የዚክርን ሥነ-ምግባር ያስተምራል፤ ይኸውም የልብ መዋረድንና ፍርሃትን ከለሰለሰ ድምፅ ጋር በማቀናጀት በጧትና በማታ በጽናት መቀጠል ነው።',
    },
  },
  {
    id: 'nur-36-37',
    arabicText:
      '﴿فِي بُيُوتٍ أَذِنَ اللَّهُ أَن تُرْفَعَ وَيُذْكَرَ فِيهَا اسْمُهُ يُسَبِّحُ لَهُ فِيهَا بِالْغُدُوِّ وَالْآصَالِ ۝٣٦ رِجَالٌ لَّا تُلْهِيهِمْ تِجَارَةٌ وَلَا بَيْعٌ عَن ذِكْرِ اللَّهِ ۝٣٧﴾',
    surahName: {
      ar: 'سورة النور',
      en: 'Surah An-Nur',
      am: 'ሱረቱ አን-ኑር',
    },
    surahNumber: 24,
    ayahNumber: '36–37',
    translation: {
      en: 'In houses which Allah has ordered to be raised and that His name be mentioned therein; exalting Him within them in the morning and the evenings are men whom neither commerce nor sale distracts from the remembrance of Allah.',
      am: 'አላህ እንዲከበሩና ስሙ በውስጣቸው እንዲወሳ ባዘዘባቸው ቤቶች ውስጥ በጧትና በማታ ለእርሱ የሚያጠሩ (የሚያወድሱ)፤ ንግድም ሆነ ሽያጭ አላህን ከማውሳት የማያዘናጋቸው ሰዎች አሉ።',
    },
    explanation: {
      ar: 'ثناءٌ من الله تعالى على المؤمنين الذين لا تشغلهم شواغل الدنيا وتجارتها عن ذكر ربهم وطاعته في البكور والآصال.',
      en: 'Praise for believers whose worldly occupations and trade never divert their hearts from remembering their Lord morning and evening.',
      am: 'የዓለማዊ ሥራና ንግድ በጧትና በማታ ጌታቸውን ከማውሳት ልባቸውን የማያዘናጋቸው ምዕመናን የተመሰገኑበት አንቀጽ።',
    },
  },
];

/**
 * 3. DAILY RHYTHM OF REMEMBRANCE SECTION
 * Anchored by Surah Ali 'Imran (3:191) and three daily life stages.
 */
export const DAILY_LIFE_QURAN_VERSE: QuranVerseEntry = {
  id: 'ali-imran-191',
  arabicText:
    '﴿الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَىٰ جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ ۝١٩١﴾',
  surahName: {
    ar: 'سورة آل عمران',
    en: "Surah Ali 'Imran",
    am: 'ሱረቱ አሊ-ዒምራን',
  },
  surahNumber: 3,
  ayahNumber: '191',
  translation: {
    en: 'Who remember Allah while standing or sitting or [lying] on their sides and give thought to the creation of the heavens and the earth, [saying], "Our Lord, You did not create this aimlessly; exalted are You [above such a thing]; then protect us from the punishment of the Fire."',
    am: 'እነዚያ ቆመውም፣ ተቀምጠውም፣ በጎኖቻቸውም ተጋድመው አላህን የሚያወሱና በሰማያትና በምድር አፈጣጠር የሚያስተነትኑ፦ «ጌታችን ሆይ! ይህንን በከንቱ አልፈጠርከውም፤ ጥራት ይገባህ፤ ከእሳት ቅጣትም ጠብቀን» የሚሉ ናቸው።',
  },
  explanation: {
    ar: 'تصف الآية الكريمة حال أولي الألباب الذين يجمعون بين دوام ذكر الله في جميع هيئاتهم وبين التفكّر الواعي في آيات الله في الكون.',
    en: 'Describes people of understanding who unite continuous remembrance across every posture of daily life with mindful reflection upon the signs of creation.',
    am: 'በሁሉም የዕለት ተዕለት ሁኔታዎች ውስጥ ቋሚ ዚክርን ከፍጥረተ ዓለሙ ምልክቶች ማስተንተን ጋር ያጣመሩ የባለ አእምሮዎች መገለጫ።',
  },
};

export const DAILY_RHYTHM_STAGES: readonly DailyRhythmStage[] = [
  {
    id: 'morning',
    number: '01',
    timeLabel: {
      ar: 'البكور والصباح',
      en: 'Dawn & Morning',
      am: 'ጎህ ሲቀድና በጧት',
    },
    title: {
      ar: 'افتتاح اليوم بالذكر والتسبيح',
      en: 'Beginning the Day in Mindfulness',
      am: 'ቀኑን በዚክርና በምስጋና መጀመር',
    },
    description: {
      ar: 'استقبال الصباح بأذكار الاستيقاظ وأذكار الصباح وتلاوة القرآن يمنح القلب سكينةً وبصيرةً في مطلع يومه.',
      en: 'Greeting the morning with authentic remembrances and Quranic recitation grounds the heart in clarity and gratitude from the start of the day.',
      am: 'ጧትን በተረጋገጡ የጧት አዝካሮችና በቁርኣን ንባብ መጀመር ልብን ከቀኑ መጀመሪያ አንስቶ በሰላምና በምስጋና ይሞላል።',
    },
  },
  {
    id: 'daytime',
    number: '02',
    timeLabel: {
      ar: 'في سائر الأحوال والسعي',
      en: 'Throughout Daily Pursuits',
      am: 'በቀኑ እንቅስቃሴዎች ውስጥ',
    },
    title: {
      ar: 'حضور القلب في القيام والقعود',
      en: 'Remembrance Amidst Work and Movement',
      am: 'በሥራና በእንቅስቃሴ መካከል አላህን ማውሳት',
    },
    description: {
      ar: 'الذكر المطلق، والأذكار عقب الصلوات المفروضة، والتسبيح في دقائق الانتظار تبقي اللسان رطبًا بذكر الله.',
      en: 'Post-prayer remembrances and brief moments of Tasbih keep the heart anchored to Allah amidst daily responsibilities.',
      am: 'ከሶላት በኋላ የሚባሉ አዝካሮችና በዕለታዊ ሥራዎች መካከል የሚደረጉ ተስቢሖች ልብን ከአላህ ጋር ያቆራኛሉ።',
    },
  },
  {
    id: 'night',
    number: '03',
    timeLabel: {
      ar: 'الأصيل والمساء وعند النوم',
      en: 'Evening & Before Sleep',
      am: 'በማታና ከእንቅልፍ በፊት',
    },
    title: {
      ar: 'ختام اليوم بالسكينة والإنابة',
      en: 'Closing the Day in Tranquility',
      am: 'ቀኑን በመረጋጋትና በምስጋና መደምደም',
    },
    description: {
      ar: 'أذكار المساء وأذكار النوم والآيات المأثورة قبل الرقاد تختم يوم المؤمن بحفظ الله وطمأنينة القلب.',
      en: 'Evening remembrances and authentic bedtime supplications conclude the believer’s day in serenity and divine protection.',
      am: 'የማታና የመኝታ አዝካሮች የምዕመኑን ቀን በአላህ ጥበቃና በልብ መረጋጋት እንዲጠናቀቅ ያደርጋሉ።',
    },
  },
];

/**
 * 4. AUTHENTIC HADITHS ABOUT DHIKR — Scholarly Editorial Ledger
 * Verified narrations exclusively from Sahih al-Bukhari and Sahih Muslim.
 */
export const AUTHENTIC_HADITH_ENTRIES: readonly AuthenticHadithEntry[] = [
  {
    id: 'bukhari-6407',
    numberLabel: '01',
    topic: {
      ar: 'حياة القلب بذكر الله تعالى',
      en: 'Remembrance as the Life of the Heart',
      am: 'ዚክር የልብ ሕይወት ስለመሆኑ',
    },
    arabicText:
      'عَنْ أَبِي مُوسَى رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ النَّبِيُّ ﷺ: «مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لَا يَذْكُرُ رَبَّهُ، مَثَلُ الْحَيِّ وَالْمَيِّتِ».',
    source: {
      ar: 'صحيح البخاري (٦٤٠٧)',
      en: 'Sahih al-Bukhari (6407)',
      am: 'ሶሒሕ አል-ቡኻሪ (6407)',
    },
    authenticity: {
      ar: 'صحيح — رواه البخاري',
      en: 'Sahih (Al-Bukhari)',
      am: 'ሶሒሕ (አል-ቡኻሪ)',
    },
    translation: {
      en: 'Abu Musa (may Allah be pleased with him) reported that the Prophet ﷺ said: "The example of the one who remembers his Lord and the one who does not remember his Lord is like that of the living and the dead."',
      am: 'አቡ ሙሳ (ረ.ዐ) እንደዘገቡት ነቢዩ ﷺ እንዲህ ብለዋል፦ «ጌታውን የሚያወሳና ጌታውን የማያወሳ ሰው ምሳሌ እንደ ሕያውና እንደ ሙት ነው።»',
    },
    explanation: {
      ar: 'تشبيهٌ نبوي بليغ يبيّن أن حياة القلب ونوره ونفعه إنما تكون بذكر الله عز وجل، وأن الغفلة عن الذكر كالموت للقلب.',
      en: 'The Prophet ﷺ likened the one who remembers their Lord and the one who does not to the living and the dead, illustrating that remembrance is the very life of the heart.',
      am: 'ነቢዩ ﷺ ጌታውን የሚያወሳውንና የማያወሳውን ሰው ምሳሌ በሕያውና በሙት መካከል እንዳለ ልዩነት በመግለጽ፣ ዚክር የልብ ሕይወት መሆኑን አስተምረዋል።',
    },
  },
  {
    id: 'bukhari-7405-muslim-2675',
    numberLabel: '02',
    topic: {
      ar: 'معيّة الله وذكره لمن ذكره',
      en: 'Divine Nearness to Those Who Remember Him',
      am: 'ለሚያወሱት ያለው የአላህ ልዩ ቅርበት',
    },
    arabicText:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ النَّبِيُّ ﷺ: «يَقُولُ اللَّهُ تَعَالَى: أَنَا عِنْدَ ظَنِّ عَبْدِي بِي، وَأَنَا مَعَهُ إِذَا ذَكَرَنِي، فَإِنْ ذَكَرَنِي فِي نَفْسِهِ ذَكَرْتُهُ فِي نَفْسِي، وَإِنْ ذَكَرَنِي فِي مَلَإٍ ذَكَرْتُهُ فِي مَلَإٍ خَيْرٍ مِنْهُمْ».',
    source: {
      ar: 'صحيح البخاري (٧٤٠٥) وصحيح مسلم (٢٦٧٥)',
      en: 'Sahih al-Bukhari (7405) & Sahih Muslim (2675)',
      am: 'ሶሒሕ አል-ቡኻሪ (7405) እና ሶሒሕ ሙስሊም (2675)',
    },
    authenticity: {
      ar: 'صحيح — متفق عليه (حديث قدسي)',
      en: 'Sahih (Agreed Upon — Hadith Qudsi)',
      am: 'ሶሒሕ (ቡኻሪና ሙስሊም የተስማሙበት — ሐዲስ ቁድሲ)',
    },
    translation: {
      en: 'Abu Hurayrah (may Allah be pleased with him) reported that the Prophet ﷺ said: "Allah the Exalted says: \'I am as My servant expects Me to be, and I am with him when he remembers Me. If he remembers Me within himself, I remember him within Myself; and if he remembers Me in an assembly, I remember him in an assembly better than theirs.\'"',
      am: 'አቡ ሁረይራ (ረ.ዐ) እንደዘገቡት ነቢዩ ﷺ እንዲህ ብለዋል፦ «አላህ (ሱ.ወ) እንዲህ ይላል፦ "እኔ ባሪያዬ በእኔ ላይ ባለው ጥሩ ግምት ዘንድ ነኝ፤ እርሱ ባወሳኝ ጊዜም ከእርሱ ጋር ነኝ። በነፍሱ ውስጥ ካወሳኝ በነፍሴ አወሳዋለሁ፤ በጉባኤ ውስጥ ካወሳኝ ደግሞ ከእነርሱ በሚበልጥ ጉባኤ ውስጥ አወሳዋለሁ።"»',
    },
    explanation: {
      ar: 'يدلّ هذا الحديث القدسي على شرف الذكر ومنزلة الذاكر عند الله، وأن معيّة الله الخاصة بالتوفيق والحفظ والثناء تكون لأهل ذكره سرًّا وعلانية.',
      en: "Demonstrates the lofty station of those who remember Allah, showing that both private reflection and public remembrance are met with Allah's special nearness and honor.",
      am: 'አላህን በሚስጥርም ሆነ በግልጽ ማውሳት የአላህን ልዩ ቅርበት፣ ጥበቃና በከፍተኛው የመላእክት ጉባኤ ውስጥ መወሳትን እንደሚያስገኝ ያስረዳል።',
    },
  },
  {
    id: 'bukhari-6406-muslim-2694',
    numberLabel: '03',
    topic: {
      ar: 'كلمتان خفيفتان على اللسان ثقيلتان في الميزان',
      en: 'Two Words Light on the Tongue, Heavy in the Balance',
      am: 'በምላስ ላይ ቀላል፣ በሚዛን ላይ ከባድ የሆኑ ሁለት ቃላት',
    },
    arabicText:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ النَّبِيُّ ﷺ: «كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ».',
    source: {
      ar: 'صحيح البخاري (٦٤٠٦) وصحيح مسلم (٢٦٩٤)',
      en: 'Sahih al-Bukhari (6406) & Sahih Muslim (2694)',
      am: 'ሶሒሕ አል-ቡኻሪ (6406) እና ሶሒሕ ሙስሊም (2694)',
    },
    authenticity: {
      ar: 'صحيح — متفق عليه',
      en: 'Sahih (Agreed Upon)',
      am: 'ሶሒሕ (ቡኻሪና ሙስሊም የተስማሙበት)',
    },
    translation: {
      en: 'Abu Hurayrah (may Allah be pleased with him) reported that the Prophet ﷺ said: "Two words are light on the tongue, weigh heavily in the Balance, and are beloved to the Most Merciful: Subhana Allahi wa bihamdihi, Subhana Allahi al-\'Azim (Glory and praise be to Allah; Glory be to Allah, the Supreme)."',
      am: 'አቡ ሁረይራ (ረ.ዐ) እንደዘገቡት ነቢዩ ﷺ እንዲህ ብለዋል፦ «በምላስ ላይ ቀላል የሆኑ፣ በሚዛን ላይ ግን ከባድ የሆኑና በአር-ረሕማን ዘንድ የተወደዱ ሁለት ቃላት አሉ፤ እነርሱም፦ "ሱብሓነല്ലാሂ ወቢሐምዲሂ፣ ሱብሓነല്ലാሂል ዐዚም" (አላህን ከማመስገን ጋር አጠራዋለሁ፤ ታላቁን አላህ አጠራዋለሁ) ናቸው።»',
    },
    explanation: {
      ar: 'يبيّن هذا الحديث تيسير الله لعباده؛ إذ جعل العمل اليسير في النطق عظيمَ الثواب في الميزان يوم القيامة لما يتضمنه من تنزيه الله وحمده وتعظيمه.',
      en: "Highlights Allah's grace in making effortless words carry immense weight on the Day of Judgment because they combine glorification, praise, and magnification of Allah.",
      am: 'አላህን ማጥራትን፣ ማመስገንንና ማላቅን የያዙ ቀላል ቃላት በትንሣኤ ቀን በሚዛን ላይ ታላቅ ክብደት እንዲኖራቸው ማድረጉ የአላህን ችሮታ ያሳያል።',
    },
  },
  {
    id: 'muslim-2137',
    numberLabel: '04',
    topic: {
      ar: 'أحبّ الكلام إلى الله أربع',
      en: 'The Four Most Beloved Phrases to Allah',
      am: 'ወደ አላህ ከንግግሮች ሁሉ ይበልጥ የተወደዱ አራት ቃላት',
    },
    arabicText:
      'عَنْ سَمُرَةَ بْنِ جُنْدَبٍ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: «أَحَبُّ الْكَلَامِ إِلَى اللَّهِ أَرْبَعٌ: سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، لَا يَضُرُّكَ بِأَيِّهِنَّ بَدَأْتَ».',
    source: {
      ar: 'صحيح مسلم (٢١٣٧)',
      en: 'Sahih Muslim (2137)',
      am: 'ሶሒሕ ሙስሊም (2137)',
    },
    authenticity: {
      ar: 'صحيح — رواه مسلم',
      en: 'Sahih (Narrated by Muslim)',
      am: 'ሶሒሕ (ሙስሊም የዘገቡት)',
    },
    translation: {
      en: 'Samurah ibn Jundab (may Allah be pleased with him) reported that the Messenger of Allah ﷺ said: "The most beloved words to Allah are four: Subhana Allah (Glory be to Allah), Al-hamdu lillah (Praise be to Allah), La ilaha illa Allah (There is no deity worthy of worship except Allah), and Allahu Akbar (Allah is the Greatest). It does not matter with which of them you begin."',
      am: 'ሰሙረት ኢብኑ ጁንደብ (ረ.ዐ) እንደዘገቡት የአላህ መልዕክተኛ ﷺ እንዲህ ብለዋል፦ «ወደ አላህ ከንግግሮች ሁሉ ይበልጥ የተወደዱት አራት ናቸው፦ "ሱብሓነല്ലാህ"፣ "አልሐምዱ ሊላህ"፣ "ላ ኢላሀ ኢለല്ലാህ" እና "አላሁ አክበር" ናቸው። በየትኛውም ብትጀምር አይጎዳህም።»',
    },
    explanation: {
      ar: 'تجمع هذه الكلمات الأربع أصول التوحيد والتنزيه والحمد والتعظيم لله تعالى، وهي من الباقيات الصالحات التي يسهل ذكرها في كل وقت.',
      en: 'These four phrases encompass pure monotheism, glorification, gratitude, and reverence for Allah, remaining easy to recite throughout every moment of the day.',
      am: 'እነዚህ አራት ቃላት የአላህን አንድነት (ተውሒድ)፣ ጥራት፣ ምስጋናና ታላቅነት ያካተቱ ሲሆኑ በማንኛውም ሰዓት ለማውሳት የቀለሉ ናቸው።',
    },
  },
  {
    id: 'bukhari-6405-muslim-2691',
    numberLabel: '05',
    topic: {
      ar: 'فضل التسبيح والتحميد مئة مرة في اليوم',
      en: 'Saying Subhana Allahi wa Bihamdihi One Hundred Times Daily',
      am: 'በቀን መቶ ጊዜ «ሱብሓነല്ലാሂ ወቢሐምዲሂ» የማለት ትሩፋት',
    },
    arabicText:
      'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَسُولَ اللَّهِ ﷺ قَالَ: «مَنْ قَالَ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، فِي يَوْمٍ مِائَةَ مَرَّةٍ، حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ».',
    source: {
      ar: 'صحيح البخاري (٦٤٠٥) وصحيح مسلم (٢٦٩١)',
      en: 'Sahih al-Bukhari (6405) & Sahih Muslim (2691)',
      am: 'ሶሒሕ አል-ቡኻሪ (6405) እና ሶሒሕ ሙስሊም (2691)',
    },
    authenticity: {
      ar: 'صحيح — متفق عليه',
      en: 'Sahih (Agreed Upon)',
      am: 'ሶሒሕ (ቡኻሪና ሙስሊም የተስማሙበት)',
    },
    translation: {
      en: 'Abu Hurayrah (may Allah be pleased with him) reported that the Messenger of Allah ﷺ said: "Whoever says \'Subhana Allahi wa bihamdihi\' (Glory and praise be to Allah) one hundred times in a day, his sins will be forgiven even if they were like the foam of the sea."',
      am: 'አቡ ሁረይራ (ረ.ዐ) እንደዘገቡት የአላህ መልዕክተኛ ﷺ እንዲህ ብለዋል፦ «በቀን ውስጥ መቶ ጊዜ "ሱብሓነല്ലാሂ ወቢሐምዲሂ" (አላህን ከማመስገን ጋር አጠራዋለሁ) ያለ ሰው፣ ወንጀሉ እንደ ባሕር አረፋ የበዛ ቢሆንም እንኳ ይታበስለታል።»',
    },
    explanation: {
      ar: 'بيانٌ لسعة رحمة الله وعظيم مغفرته لمن واظب على هذا الذكر اليومي الجامع بين تسبيح الله والثناء عليه بحمده.',
      en: "Illustrates the vastness of Allah's mercy and forgiveness for the one who consistently maintains this daily remembrance combining glorification and praise.",
      am: 'አላህን ማጥራትንና ማመስገንን ያጣመረውን ይህን ዕለታዊ ዚክር አዘውትሮ ለሚል ሰው የአላህ እዝነትና ምሕረት ምን ያህል ሰፊ መሆኑን ያሳያል።',
    },
  },
];

/**
 * 5. MINIMAL ZIKR FEATURE PILLARS
 * Compact 4-card architectural row bridging the sacred texts to ZIKR's core structure.
 */
export const MINIMAL_ZIKR_PILLARS: readonly MinimalZikrPillarItem[] = [
  {
    id: 'quran',
    number: '01',
    title: {
      ar: 'القرآن الكريم',
      en: 'The Holy Quran',
      am: 'ቅዱስ ቁርኣን',
    },
    summary: {
      ar: 'تلاوةٌ واضحة مع سهولة التنقل بين السور والآيات.',
      en: 'Clear Mushaf typography with effortless navigation across Surahs and verses.',
      am: 'ግልጽ የሙስሐፍ ጽሑፍ ከቀላል የሱራና የአንቀጽ መዘዋወሪያ ጋር።',
    },
  },
  {
    id: 'azkar',
    number: '02',
    title: {
      ar: 'أذكار',
      en: 'Reading Modes & Azkar',
      am: 'የንባብ ስልቶችና አዝካሮች',
    },
    summary: {
      ar: 'القراءة الميسّرة والقراءة المستمرة لراحة العين وتسلسل النص.',
      en: 'Easy Reading and Continuous Reading modes tailored for visual comfort.',
      am: 'ለዓይን ምቾትና ለንባብ ቅደም ተከተል የተዘጋጁ ቀላልና ተከታታይ የንባብ ስልቶች።',
    },
  },
  {
    id: 'day-night',
    number: '03',
    title: {
      ar: 'اليوم والليلة',
      en: 'Day & Night Remembrance',
      am: 'የቀንና የሌሊት አዝካሮች',
    },
    summary: {
      ar: 'أذكار الصباح والمساء والنوم وبعد الصلاة في أبواب منظّمة.',
      en: 'Morning, evening, sleep, and post-prayer remembrances arranged with clarity.',
      am: 'የጧት፣ የማታ፣ የእንቅልፍና ከሶላት በኋላ የሚባሉ አዝካሮች በተሟላና ግልጽ አደረጃጀት።',
    },
  },
  {
    id: 'books',
    number: '04',
    title: {
      ar: 'كتب',
      en: 'Islamic Books',
      am: 'ኢስላማዊ መጻሕፍት',
    },
    summary: {
      ar: 'تصفّح كتب العلم المتاحة ضمن تجربة قراءة هادئة وواضحة.',
      en: 'Accessible Islamic books presented in a calm, distraction-free reading layout.',
      am: 'በተረጋጋና ለንባብ ምቹ በሆነ ገጽታ የቀረቡ ኢስላማዊ መጻሕፍት።',
    },
  },
];

/**
 * 6. CONFIGURABLE CLOSING SECTION
 * Built around Surah Al-Baqarah (2:186) and Sahih al-Bukhari (6464) / Sahih Muslim (782).
 */
export const CLOSING_REFLECTION_CONFIG: ClosingReflectionConfig = {
  verse: {
    id: 'baqarah-186',
    arabicText:
      '﴿وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ ۝١٨٦﴾',
    surahName: {
      ar: 'سورة البقرة',
      en: 'Surah Al-Baqarah',
      am: 'ሱረቱ አል-በቀራህ',
    },
    surahNumber: 2,
    ayahNumber: '186',
    translation: {
      en: 'And when My servants ask you concerning Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me and believe in Me that they may be rightly guided.',
      am: 'ባሮቼም ከእኔ በጠየቁህ ጊዜ እኔ ቅርብ ነኝ፤ የለማኙን ጸሎት በለመነኝ ጊዜ እቀበለዋለሁ። ስለዚህ ለእኔ ይታዘዙ፤ በእኔም ይመኑ፤ እነርሱ ሊመሩ ይከጀላልና።',
    },
    explanation: {
      ar: 'آيةٌ تبعث الطمأنينة والرجاء في قلب المؤمن بقرب الله تعالى من عباده الداعين والذاكرين وإجابته لدعائهم.',
      en: 'Instills hope and certainty in the believer’s heart regarding Allah’s nearness to those who call upon Him and remember Him.',
      am: 'አላህ ለሚለምኑትና ለሚያወሱት ባሮቹ ቅርብ መሆኑንና ዱዓቸውን እንደሚቀበል በማብሰር በምዕመናን ልብ ውስጥ ተስፋና መረጋጋትን ያሰፍናል።',
    },
  },
  hadith: {
    id: 'bukhari-6464-muslim-782',
    numberLabel: '06',
    topic: {
      ar: 'فضل المداومة على العمل الصالح وإن قلّ',
      en: 'The Virtue of Consistent Deeds',
      am: 'ትንሽም ቢሆን በበጎ ተግባር የመጽናት ትሩፋት',
    },
    arabicText:
      'عَنْ عَائِشَةَ رَضِيَ اللَّهُ عَنْهَا أَنَّ رَسُولَ اللَّهِ ﷺ قَالَ: «أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ».',
    source: {
      ar: 'صحيح البخاري (٦٤٦٤) وصحيح مسلم (٧٨٢)',
      en: 'Sahih al-Bukhari (6464) & Sahih Muslim (782)',
      am: 'ሶሒሕ አል-ቡኻሪ (6464) እና ሶሒሕ ሙስሊም (782)',
    },
    authenticity: {
      ar: 'صحيح — متفق عليه',
      en: 'Sahih (Agreed Upon)',
      am: 'ሶሒሕ (ቡኻሪና ሙስሊም የተስማሙበት)',
    },
    translation: {
      en: '\'A\'ishah (may Allah be pleased with her) reported that the Messenger of Allah ﷺ said: "The most beloved deeds to Allah are those done consistently, even if they are small."',
      am: 'ዓኢሻ (ረ.ዐ) እንደዘገቡት የአላህ መልዕክተኛ ﷺ እንዲህ ብለዋል፦ «ወደ አላህ ከተግባራት ሁሉ ይበልጥ የተወደደው ትንሽም ቢሆን በጽናት የሚቀጥለው ነው።»',
    },
    explanation: {
      ar: 'أصلٌ عظيم في المواظبة على الورد اليومي من القرآن والأذكار؛ فقليلٌ دائمٌ خيرٌ وأحبُّ إلى الله من كثيرٍ منقطع.',
      en: 'A foundational principle encouraging a steady daily portion of Quran and remembrance: small, consistent devotion is beloved to Allah.',
      am: 'በየዕለቱ ከቁርኣንና ከአዝካር ቋሚ ድርሻ እንዲኖረን የሚያበረታታ መሠረታዊ መርህ፤ ትንሽም ቢሆን ቋሚ የሆነ ተግባር በአላህ ዘንድ የተወደደ ነው።',
    },
  },
  closingHeading: {
    ar: 'رفيقك الهادئ لذكر الله وتلاوة كتابه في كل يوم',
    en: 'A Calm Companion for Daily Remembrance and Quran Recitation',
    am: 'ለዕለታዊ ዚክር እና ለቁርኣን ንባብ የተረጋጋ ጓደኛዎ',
  },
  closingMessage: {
    ar: 'صُمّم ZIKR ليجمع لك القرآن الكريم، وأذكار اليوم والليلة، وكتب العلم في واجهة صافية تعينك على المداومة اليومية بخشوع ووضوح.',
    en: 'ZIKR is crafted to bring together the Holy Quran, daily Azkar, and Islamic books in a serene interface that supports consistent daily devotion with clarity.',
    am: 'ZIKR ቅዱስ ቁርኣንን፣ የቀንና የሌሊት አዝካሮችን እና መጻሕፍትን በተረጋጋና ግልጽ በሆነ ገጽታ በማቅረብ ለዕለታዊ ጽናት እንዲያግዝዎት ተደርጎ የተዘጋጀ ነው።',
  },
  primaryCtaLabel: {
    ar: 'استكشف مميزات ZIKR',
    en: 'Explore ZIKR Features',
    am: 'የZIKR ገጽታዎችን ይመልከቱ',
  },
  secondaryCtaLabel: {
    ar: 'صفحة تحميل التطبيق',
    en: 'Go to Download Page',
    am: 'ወደ ማውረጃ ገጽ ይሂዱ',
  },
};

/**
 * Localized section headings and UI labels for the expanded Home page sections.
 */
export const HOME_SACRED_SECTIONS_COPY: Record<
  LanguageCode,
  {
    virtueSection: {
      index: string;
      heading: string;
      subtitle: string;
      verseBadge: string;
      explanationLabel: string;
      pillarsHeading: string;
    };
    featuredVerseSection: {
      index: string;
      heading: string;
      subtitle: string;
      verseSelectorAria: string;
      surahLabel: string;
      ayahLabel: string;
      translationLabel: string;
      explanationLabel: string;
      prevVerseLabel: string;
      nextVerseLabel: string;
    };
    dailyRhythmSection: {
      index: string;
      heading: string;
      subtitle: string;
      verseContextLabel: string;
    };
    hadithSection: {
      index: string;
      heading: string;
      subtitle: string;
      collectionHeader: string;
      narrationHeader: string;
      sourceLabel: string;
      gradingLabel: string;
      meaningLabel: string;
    };
    minimalPillarsSection: {
      index: string;
      heading: string;
      subtitle: string;
      exploreAllCta: string;
      previewAppCta: string;
    };
    closingSection: {
      index: string;
      quranPillarLabel: string;
      sunnahPillarLabel: string;
    };
  }
> = {
  ar: {
    virtueSection: {
      index: '٠١ · فضل الذكر في القرآن الكريم',
      heading: 'أهمية ذكر الله ومنزلته في حياة المؤمن',
      subtitle:
        'الذكر هو روح الأعمال الصالحة، وسبيل طمأنينة القلوب، وباب القرب من الله جلّ جلاله في كل وقتٍ وحال.',
      verseBadge: 'الأصل القرآني في فضل الذكر',
      explanationLabel: 'دلالة الآية الكريمة',
      pillarsHeading: 'ثلاثة أصول في فقه الذكر',
    },
    featuredVerseSection: {
      index: '٠٢ · آية للتدبر والتأمل',
      heading: 'آياتٌ بيّنات في فضل الذكر والتسبيح',
      subtitle:
        'تأمّل في النص القرآني الكريم، وتنقّل بين الآيات المختارة لتدبّر معانيها وهداياتها.',
      verseSelectorAria: 'اختيار الآية القرآنية للتدبر',
      surahLabel: 'سورة',
      ayahLabel: 'الآية',
      translationLabel: 'الترجمة المعتمَدة للمعاني',
      explanationLabel: 'إضاءة تفسيرية ميسّرة',
      prevVerseLabel: 'الآية السابقة',
      nextVerseLabel: 'الآية التالية',
    },
    dailyRhythmSection: {
      index: '٠٣ · الذكر في اليوم والليلة',
      heading: 'ملازمة ذكر الله في سائر الأوقات والأحوال',
      subtitle:
        'تنتظم حياة المسلم على إيقاع الذكر والتفكّر من مطلع الفجر إلى سكون الليل.',
      verseContextLabel: 'وصف أولي الألباب في القرآن الكريم',
    },
    hadithSection: {
      index: '٠٤ · من السنة النبوية الصحيحة',
      heading: 'أحاديث صحيحة في فضل الذكر وعظيم ثوابه',
      subtitle:
        'رواياتٌ ثابتة من صحيحي البخاري ومسلم تبيّن منزلة الذكر، ويسْره على اللسان، وثقله في الميزان.',
      collectionHeader: 'المصدر ودرجة الصحة',
      narrationHeader: 'النص النبوي الشريف وفقهه',
      sourceLabel: 'التخريج',
      gradingLabel: 'الحكم',
      meaningLabel: 'فقه الحديث ومعناه',
    },
    minimalPillarsSection: {
      index: '٠٥ · منظومة تطبيق ZIKR',
      heading: 'أربعة أركان عملية لخدمة وردك اليومي',
      subtitle:
        'بُني تطبيق ZIKR ليجعل تلاوة القرآن والأذكار والكتب في متناولك بوضوحٍ وسكينة.',
      exploreAllCta: 'استعرض المميزات بالتفصيل',
      previewAppCta: 'معاينة واجهات التطبيق',
    },
    closingSection: {
      index: '٠٦ · دعوة إلى القرب والمداومة',
      quranPillarLabel: 'آية القرب وإجابة الدعاء',
      sunnahPillarLabel: 'هدي النبي ﷺ في المداومة',
    },
  },
  en: {
    virtueSection: {
      index: '01 · The Virtue of Dhikr',
      heading: 'The Importance and Station of Remembering Allah',
      subtitle:
        'Remembrance is the spirit of devotion, the source of inner tranquility, and the constant link between the believer and their Creator.',
      verseBadge: 'Foundational Quranic Verse',
      explanationLabel: 'Meaning & Reflection',
      pillarsHeading: 'Three Foundations of Remembrance',
    },
    featuredVerseSection: {
      index: '02 · Quranic Contemplation',
      heading: 'Reflect Upon Verses of Remembrance',
      subtitle:
        'Read the original Arabic revelation with its verified translation and classical commentary, and switch seamlessly between selected verses.',
      verseSelectorAria: 'Select a Quranic verse for reflection',
      surahLabel: 'Surah',
      ayahLabel: 'Ayah',
      translationLabel: 'Verified Translation',
      explanationLabel: 'Classical Commentary',
      prevVerseLabel: 'Previous Verse',
      nextVerseLabel: 'Next Verse',
    },
    dailyRhythmSection: {
      index: '03 · Remembrance Across Daily Life',
      heading: 'Mindfulness of Allah in Every State and Hour',
      subtitle:
        'From the first light of dawn through daily pursuits to the quiet of night, remembrance anchors every moment.',
      verseContextLabel: 'Quranic Description of People of Understanding',
    },
    hadithSection: {
      index: '04 · Authentic Prophetic Sunnah',
      heading: 'Verified Hadiths on the Excellence of Dhikr',
      subtitle:
        'Authentic narrations from Sahih al-Bukhari and Sahih Muslim presented in a structured scholarly ledger with verified references.',
      collectionHeader: 'Source & Authenticity',
      narrationHeader: 'Prophetic Narration & Meaning',
      sourceLabel: 'Reference',
      gradingLabel: 'Grading',
      meaningLabel: 'Scholarly Explanation',
    },
    minimalPillarsSection: {
      index: '05 · The ZIKR Experience',
      heading: 'Four Essential Pillars for Daily Devotion',
      subtitle:
        'Designed to bring Quran recitation, daily remembrances, and beneficial books together in calm clarity.',
      exploreAllCta: 'Explore All Features',
      previewAppCta: 'Preview App Screens',
    },
    closingSection: {
      index: '06 · Nearness & Steadfastness',
      quranPillarLabel: 'Divine Nearness in the Quran',
      sunnahPillarLabel: 'Prophetic Guidance on Consistency',
    },
  },
  am: {
    virtueSection: {
      index: '01 · የዚክር ትሩፋትና አስፈላጊነት',
      heading: 'አላህን የማውሳት አስፈላጊነትና ታላቅ ደረጃ',
      subtitle:
        'ዚክር የመልካም ተግባራት ሕይወትና መሠረት፣ የልብ መረጋጋት ምንጭ እና በባሪያውና በፈጣሪው መካከል ያለ ቋሚ ትስስር ነው።',
      verseBadge: 'መሠረታዊ የቁርኣን አንቀጽ',
      explanationLabel: 'አጭር ማብራሪያ',
      pillarsHeading: 'ሦስቱ የዚክር መሠረቶች',
    },
    featuredVerseSection: {
      index: '02 · የቁርኣን ነጸብራቅ',
      heading: 'ስለ ዚክርና ምስጋና የወረዱ አንቀጾችን ያስተንትኑ',
      subtitle:
        'ከተመረጡና ከተረጋገጡ የቁርኣን አንቀጾች መካከል በመምረጥ የዓረብኛ ቃሉን፣ የተረጋገጠ ትርጉሙንና ማብራሪያውን ይመልከቱ።',
      verseSelectorAria: 'ለማስተንተን የቁርኣን አንቀጽ ይምረጡ',
      surahLabel: 'ሱራ',
      ayahLabel: 'አንቀጽ',
      translationLabel: 'የተረጋገጠ ትርጉም',
      explanationLabel: 'አጭር ማብራሪያ',
      prevVerseLabel: 'ቀዳሚ አንቀጽ',
      nextVerseLabel: 'ቀጣይ አንቀጽ',
    },
    dailyRhythmSection: {
      index: '03 · በዕለት ተዕለት ሕይወት አላህን ማውሳት',
      heading: 'በሁሉም ሁኔታዎችና ሰዓታት ውስጥ አላህን ማስታወስ',
      subtitle:
        'ከንጋት ብርሃን ጀምሮ በቀኑ እንቅስቃሴዎችና በሌሊት ጸጥታ ውስጥ ዚክር የምዕመኑን ሕይወት ያስውባል።',
      verseContextLabel: 'በቁርኣን ውስጥ የባለ አእምሮዎች መገለጫ',
    },
    hadithSection: {
      index: '04 · ከትክክለኛው ነብያዊ ሱና',
      heading: 'ስለ ዚክር የተዘገቡ ትክክለኛ (ሶሒሕ) ሐዲሶች',
      subtitle:
        'ከሶሒሕ አል-ቡኻሪና ከሶሒሕ ሙስሊም የተወሰዱና ትክክለኛነታቸው የተረጋገጠ ነብያዊ ሐዲሶች።',
      collectionHeader: 'ምንጭና የትክክለኛነት ደረጃ',
      narrationHeader: 'ነብያዊ ሐዲሱና ማብራሪያው',
      sourceLabel: 'ምንጭ',
      gradingLabel: 'ደረጃ',
      meaningLabel: 'አጭር ትርጉምና ማብራሪያ',
    },
    minimalPillarsSection: {
      index: '05 · የZIKR መተግበሪያ መዋቅር',
      heading: 'ለዕለታዊ ንባብና ዚክር የተዘጋጁ አራት ማዕዘናት',
      subtitle:
        'ቅዱስ ቁርኣንን፣ አዝካሮችንና መጻሕፍትን በተረጋጋና ግልጽ በሆነ ገጽታ በአንድ ላይ ያቀርባል።',
      exploreAllCta: 'ሁሉንም ገጽታዎች ይመልከቱ',
      previewAppCta: 'የመተግበሪያውን ገጽታዎች ይመልከቱ',
    },
    closingSection: {
      index: '06 · ወደ አላህ መቃረብና ጽናት',
      quranPillarLabel: 'ከቅዱስ ቁርኣን',
      sunnahPillarLabel: 'ከትክክለኛው ሱና',
    },
  },
};
