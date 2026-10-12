# async slides

Universitet uchun **HTML taqdimotlar** sayti. Sof statik: HTML + **Tailwind CSS (npm)** + ozgina JavaScript. Minimal, yorug' (light) dizayn. Vercel'ga deploy qilinadi.

Sayt: **[slides.async-boy.uz](https://slides.async-boy.uz)**

---

## Tuzilma

```
.
├── index.html                  # Bosh sahifa (kartochkalar, intro animatsiya)
├── presentations.js            # Taqdimotlar manifesti
├── vercel.json                 # Vercel: cleanUrls, rewrites, headers
├── package.json                # Tailwind build (npm)
├── src/
│   └── input.css               # Tailwind kirish + custom CSS (manba)
├── assets/
│   ├── app.css                 # ⚙️ BUILD NATIJASI (git'ga commit qilinadi)
│   ├── app.js                  # Bosh sahifa skripti (manifestni render)
│   ├── slides.css              # Yakka .html taqdimotlar uchun uslub
│   └── slides.js               # Slayd dvigateli
└── presentations/
    └── 5-mavzu/                # O'z build'i bo'lgan taqdimot (index.html + assets)
```

---

## Tailwind (npm)

Ilgari CDN (`cdn.tailwindcss.com`) ishlatilgan edi — endi **npm orqali** build qilinadi (`tailwindcss` v4 + `@tailwindcss/cli`).

```bash
npm install          # bir marta
npm run build        # src/input.css  ->  assets/app.css (minify)
npm run dev          # watch rejimi (o'zgartirishni kuzatadi)
```

- Manba: **`src/input.css`** (`@import "tailwindcss"` + `@source` + `@theme` + custom CSS).
- Chiqish: **`assets/app.css`** — bu **build artefakti**; git'ga commit qilinadi, shuning uchun Vercel'ga build qadami shart emas.
- `index.html` faqat `<link rel="stylesheet" href="assets/app.css" />` ni chaqiradi (CDN va inline `<style>` yo'q).
- `@source` bilan skanerlash faqat `index.html` va `assets/app.js` bilan cheklangan.

> ⚠️ **Uslub o'zgartirsangiz** (HTML klasslari yoki `src/input.css`), `npm run build` ni ishga tushirib, `assets/app.css` ni ham commit qiling. Aks holda saytda o'zgarish ko'rinmaydi.

---

## Ikki xil taqdimot turi

1. **Yakka `.html` taqdimot** — `assets/slides.js` dvigatelidan foydalanadi.
2. **O'z build'i bo'lgan papka taqdimot** — masalan `presentations/5-mavzu/`
   (`index.html` + xeshlangan `assets/*`). Mustaqil; o'z CSS/JS'iga ega.
   Bu papkalardagi aktiv yo'llari **ildizga nisbatan mutlaq** bo'lishi kerak.

---

## Yangi taqdimot qo'shish

1. Taqdimotni `presentations/` ichiga qo'ying (yakka fayl yoki papka).
2. `presentations.js` massiviga yozuv qo'shing:

   ```js
   {
     title: "Mening mavzum",
     file: "presentations/mening-mavzum/",   // yoki "presentations/mening-mavzum.html"
     description: "Qisqacha tavsif.",
     course: "Fan nomi",
     author: "Ism Familiya",
     date: "2026-10-12",
     tags: ["Teg1", "Teg2"]
   }
   ```

Tayyor — bosh sahifada kartochka avtomatik paydo bo'ladi.

---

## Intro animatsiya (bosh sahifa)

1. Markazda katta `asyncslides` matni paydo bo'ladi.
2. ~5 soniya kutadi; ekran etagida **progress** chizig'i to'ladi.
3. Harflar alohida-alohida **navbarga uchadi**.
4. Kontent (sarlavha, kartochkalar) **birma-bir animate-up** bo'ladi.

Sozlash: `index.html` dagi `WAIT` (kutish, ms) va `STAGGER` (harf orasi, ms) — progress davomiyligi CSS'da (`src/input.css` `progress-fill 5000ms`) `WAIT` bilan mos bo'lishi kerak.

---

## Lokal ko'rish

```bash
python3 -m http.server 8000
# yoki
npx serve .
```

---

## Vercel sozlamasi (`vercel.json`)

- `cleanUrls: true`, `trailingSlash: false`
- **rewrites:** `/5-mavzu` → `/presentations/5-mavzu/index.html`
- **headers:** xavfsizlik sarlavhalari; xeshlangan aktivlar `immutable`; HTML `must-revalidate`.

Deploy: reponi push qilib, vercel.com'da **New Project** → repo (Framework: Other, build/output bo'sh). Custom domen: `slides.async-boy.uz`.

---

## PDF'ga eksport

Taqdimotni ochib `Ctrl` + `P` (yoki `Cmd` + `P`) → **Save as PDF**.
