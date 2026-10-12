/*
 * Taqdimotlar ro'yxati (manifest).
 *
 * Yangi taqdimot qo'shish uchun:
 *   1) presentations/ papkasiga taqdimotni qo'shing
 *      (yakka .html fayl yoki o'z papkasi bilan — index.html + assets/*).
 *   2) Quyidagi massivga yangi obyekt qo'shing.
 *
 * Maydonlar:
 *   title       — taqdimot sarlavhasi
 *   file        — yo'l: "presentations/foo.html" yoki "presentations/foo/"
 *   description — qisqacha tavsif (ixtiyoriy)
 *   course      — fan / kurs nomi (ixtiyoriy)
 *   author      — muallif (ixtiyoriy)
 *   date        — sana "YYYY-MM-DD" ko'rinishida (ixtiyoriy)
 *   tags        — teglar massivi (ixtiyoriy)
 */
window.PRESENTATIONS = [
  {
    title: "5-Mavzu — Ta'lim metodlari va vositalari",
    file: "presentations/5-mavzu/",
    description:
      "12 slaydli ma'ruza taqdimoti: ta'lim metodlari, vositalari va interfaol yondashuvlar.",
    course: "Pedagogika · Didaktika",
    author: "Async Boy",
    date: "2026-10-12",
    tags: ["Pedagogika", "Didaktika", "Ma'ruza"]
  }
];
