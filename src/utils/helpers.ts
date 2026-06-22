import type { Settings } from "../context/type";

export function getCurrentLangText(
  lang: Settings["ayatTranslation"] | Settings["secondTranslation"],
  type: "verse" | "meaning",
) {
  if (type == "verse") {
    switch (lang) {
      // Ayat Text
      case "ar":
        return "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
      case "bn":
        return "আলহামদু লিল্লাহি রব্বিল আলামীন";
      case "hn":
        return "अल्हम्दु लिल्लाहि रब्बिल आलमीन";
      case "en":
        return "Alhamdu lillahi rabbil 'alamin";
      default:
        return "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
    }
  } else {
    // Transalation Text
    switch (lang) {
      case "bn":
        return "সমস্ত প্রশংসা আল্লাহর জন্য, যিনি সকল জগতের প্রতিপালক।";
      case "hn":
        return "सारी प्रशंसा अल्लाह के लिए है, जो सारे जहानों का पालनहार है।";
      case "en":
        return "All praise is due to Allah, Lord of all the worlds.";
      case "hl":
        return "Allah ke naam se jo Rehman o Raheem hai";
      default:
        return "All praise is due to Allah, Lord of all the worlds.";
    }
  }
}
