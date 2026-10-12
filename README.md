# async slides

Universitet uchun **HTML taqdimotlar** sayti. Toza HTML + [Tailwind CSS](https://tailwindcss.com) (CDN) + ozgina JavaScript. Minimal, yorug' (light) dizayn.

Sayt: **[slides.async-boy.uz](https://slides.async-boy.uz)**

---

## Tuzilma

```
.
├── index.html                      # Bosh sahifa — taqdimotlar ro'yxati
├── presentations.js                # Taqdimotlar manifesti (ro'yxat shu yerda)
├── vercel.json                     # Vercel sozlamasi
├── assets/
│   ├── app.js                      # Bosh sahifa skripti
│   ├── slides.css                  # Slayd uslublari
│   └── slides.js                   # Slayd dvigateli (navigatsiya, progress)
└── presentations/
    └── veb-asoslari.html           # Namuna taqdimot
```

---

## Yangi taqdimot qo'shish

1. **Fayl yarating.** `presentations/veb-asoslari.html` dan nusxa olib, `presentations/mening-mavzum.html` nomi bilan saqlang va slaydlarni tahrirlang.

   Har bir slayd — bu `<section class="slide">...</section>`:

   ```html
   <section class="slide items-center justify-center px-6 py-24 sm:px-10">
     <div class="w-full max-w-5xl">
       <p class="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">03 — Bo'lim</p>
       <h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Slayd sarlavhasi</h2>
       <p class="mt-4 text-slate-500">Matn shu yerga.</p>
     </div>
   </section>
   ```

2. **Manifestga qo'shing.** `presentations.js` faylidagi massivga yangi obyekt kiriting:

   ```js
   {
     title: "Mening mavzum",
     file: "presentations/mening-mavzum.html",
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
| Mobil | chapga/o'ngga swipe |

Har bir slayd manzili `#3` kabi hash bilan havola qilinadi — to'g'ridan-to'g'ri kerakli slaydga link yuborish mumkin.

---

## Lokal ko'rish

Fayl to'g'ridan-to'g'ri ochilsa ham ishlaydi (`index.html` ni brauzerda oching) — manifest JSON emas, `presentations.js` bo'lgani uchun server shart emas.

Xohlasangiz lokal serverda ham ko'rishingiz mumkin:

```bash
npx serve .
# yoki
python3 -m http.server 8000
```

---

## Vercel'ga deploy qilish

1. Loyihani Git repozitoriyga qo'ying:

   ```bash
   git init
   git add .
   git commit -m "async slides"
   git branch -M main
   git remote add origin <repo-url>
   git push -u origin main
   ```

2. [vercel.com](https://vercel.com) da **New Project** → reponi tanlang. Framework: **Other**. Build va Output sozlamalari bo'sh qoladi (sof statik sayt).

3. **Custom domen:** loyiha → **Settings → Domains** → `slides.async-boy.uz` qo'shing. Vercel ko'rsatgan `CNAME` yozuvini `async-boy.uz` DNS paneliga qo'shing:

   ```
   Type:  CNAME
   Name:  slides
   Value: cname.vercel-dns.com
   ```

   DNS tarqalgach domen avtomatik ishlaydi (HTTPS ham avtomatik).

---

## PDF'ga eksport

Taqdimotni ochib `Ctrl` + `P` (yoki `Cmd` + `P`) bosing → **Save as PDF**. Har bir slayd alohida sahifada chiqadi (chop etish uslublari `assets/slides.css` da sozlangan).
