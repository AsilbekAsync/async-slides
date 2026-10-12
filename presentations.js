/*
 * Taqdimotlar ro'yxati (manifest).
 *
 * Yangi taqdimot qo'shish uchun:
 *   1) presentations/ papkasiga yangi <nom>.html fayl yarating
 *      (namuna sifatida presentations/veb-asoslari.html dan nusxa oling).
 *   2) Quyidagi massivga yangi obyekt qo'shing.
 *
 * Maydonlar:
 *   title       — taqdimot sarlavhasi
 *   file        — faylga yo'l (papkaga nisbatan)
 *   description — qisqacha tavsif (ixtiyoriy)
 *   course      — fan / kurs nomi (ixtiyoriy)
 *   author      — muallif (ixtiyoriy)
 *   date        — sana "YYYY-MM-DD" ko'rinishida (ixtiyoriy)
 *   tags        — teglar massivi (ixtiyoriy)
 */
window.PRESENTATIONS = [
  {
    title: "Veb-texnologiyalar asoslari",
    file: "presentations/veb-asoslari.html",
    description: "HTML, CSS va JavaScript — zamonaviy veb-sahifalar qanday quriladi. Namuna taqdimot.",
    course: "Universitet taqdimoti",
    author: "Async Boy",
    date: "2026-10-12",
    tags: ["Web", "HTML", "CSS", "JavaScript"]
  }
];
