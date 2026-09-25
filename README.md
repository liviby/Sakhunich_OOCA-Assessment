# README

โปรเจกต์ Vite + React แยกแต่ละหน้าจอเป็น component โดยรักษา SVG/HTML ต้นฉบับและ CSS เดิมไว้แยกเป็นไฟล์สแตติก เพื่อลดการแก้ markup และเลี่ยงการเปลี่ยนดีไซน์ ส่วน flow นับถอยหลัง หายใจ ขยับร่างกาย และหน้าปิดท้ายยังใช้ลำดับเวลาและ interaction เดิม

## เริ่มใช้งาน

```sh
npm install
npm run dev
```

## โครงสร้างหลัก
- `src/App.jsx` — 
- `src/screens/` — React component แยกตาม 7 หน้าจอ
- `src/components/` — component
- `public/screens/` — SVG/HTML ของแต่ละหน้าจอ
- `src/styles.css`  
- `src/flow.js`  
