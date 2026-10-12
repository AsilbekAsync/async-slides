# async slides

Universitet uchun **HTML taqdimotlar** sayti. Sof statik: HTML + Tailwind CSS (CDN) + ozgina JavaScript. Minimal, yorug' (light) dizayn. Vercel'ga deploy qilinadi.

Sayt: **[slides.async-boy.uz](https://slides.async-boy.uz)**

---

## Tuzilma

```
.
├── index.html                  # Bosh sahifa — taqdimotlar ro'yxati (kartochkalar)
├── presentations.js            # Taqdimotlar manifesti (ro'yxat shu yerda)
├── vercel.json                 # Vercel: cleanUrls, rewrites, headers
├── assets/
│   ├── app.js                  # Bosh sahifa skripti (manifestni render qiladi)
│   ├── slides.css              # Slayd dvigateli uslublari (yakka .html taqdimotlar uchun)
│   └── slides.js               # Slayd dvigateli (navigatsiya, progress, PDF)
└── presentations/
    └── 5-mavzu/                # Taqdimot o'z papkasi bilan
        ├── index.html
        ├── favicon.svg
        └── assets/
            ├── deck.<hash>.css
            ├── deck.<hash>.js
            └── icons.<hash>.svg
```

---

## Ikki xil taqdimot turi

1. **Yakka `.html` taqdimot** — `assets/slides.js` dvigatelidan foydalanadi
   (masalan `presentations/mavzu.html`). Slaydlar `<section class="slide">` ko'rinishida.
2. **O'z build'i bo'lgan papka taqdimot** — masalan `presentations/5-mavzu/`
   (`index.html` + xeshlangan `assets/*`). Mustaqil ishlaydi; o'z CSS/JS'iga ega.

> Muhim: papkali taqdimotlarda aktiv yo'llari **ildizga nisbatan mutlaq**
> (`/presentations/<nom>/assets/...`) bo'lishi kerak — shunda `cleanUrls`,
> trailing-slash va rewrite'lar bilan muammosiz ishlaydi.

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

## Boshqaruv (taqdimot ichida)

| Amal | Tugma |
| --- | --- |
| Keyingi slayd | `→` `↓` `Space` `PageDown` |
| Oldingi slayd | `←` `↑` `PageUp` |
| Boshiga / oxiriga | `Home` / `End` |
| To'liq ekran | `F` |
| Mavzu (5-mavzu) | `T` |
| Mobil | chapga/o'ngga swipe |

---

## 5-Mavzu taqdimoti

`presentations/5-mavzu/` — "Ta'lim metodlari va vositalari" (12 slayd) taqdimotining
**optimallashtirilgan build'i**: minifikatsiya qilingan CSS/JS, xeshlangan fayl nomlari,
SVG sprite ikonkalar. Manba loyihasi `../alaude/site` da.

Qayta build qilish va bu yerga ko'chirish:

```bash
cd ../alaude/site
npm install          # bir marta
npm run build        # → dist/
cd -
cp -r ../alaude/site/dist/. presentations/5-mavzu/
# aktiv yo'llarini ildizga nisbatan mutlaq qilish:
sed -i 's|="assets/|="/presentations/5-mavzu/assets/|g; s|="favicon.svg"|="/presentations/5-mavzu/favicon.svg"|g' presentations/5-mavzu/index.html
```

---

## Lokal ko'rish

Bosh sahifani to'g'ridan-to'g'ri ochish ham mumkin (manifest `presentations.js`,
shuning uchun server shart emas). Ammo **papkali taqdimotlarning aktiv yo'llari
ildizga nisbatan mutlaq**, shu bois ular uchun lokal server ishlatsangiz to'g'ri bo'ladi:

```bash
python3 -m http.server 8000
# yoki
npx serve .
```

---

## Vercel sozlamasi (`vercel.json`)

- **`cleanUrls: true`** — URL'lardan `.html` olib tashlanadi.
- **`trailingSlash: false`** — URL'lar oxirida `/` bo'lmaydi.
- **`rewrites`** — qisqa havola:
  - `/5-mavzu` → `/presentations/5-mavzu/index.html`
- **`headers`**:
  - Xavfsizlik: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
    `Permissions-Policy`, `Cross-Origin-Opener-Policy`.
  - Xeshlangan aktivlar (`/presentations/:dir/assets/:file`) → `immutable`, 1 yil kesh.
  - Boshqa statik fayllar → 1 kun + `stale-while-revalidate`.
  - HTML va `/` → `max-age=0, must-revalidate` (har doim yangilanadi).

## Deploy

1. Repo'ni push qiling:

   ```bash
   git add .
   git commit -m "async slides"
   git push -u origin main
   ```

2. [vercel.com](https://vercel.com) → **New Project** → reponi tanlang.
   Framework: **Other**. Build/Output bo'sh (sof statik sayt) — `vercel.json` qolganini hal qiladi.

3. **Custom domen:** Settings → Domains → `slides.async-boy.uz` qo'shing va DNS'da:

   ```
   Type:  CNAME
   Name:  slides
   Value: cname.vercel-dns.com
   ```

---

## PDF'ga eksport

Taqdimotni ochib `Ctrl` + `P` (yoki `Cmd` + `P`) → **Save as PDF**.
