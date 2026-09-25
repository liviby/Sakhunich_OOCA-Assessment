## File Structure

```
mooca/
├── index.html              # โครงหลัก โหลด CSS/JS และ mount จุดสำหรับแต่ละ screen
├── css/
│   └── style.css           # สไตล์ทั้งหมด (layout, animation, curtain background)
├── js/
│   ├── loader.js           # ดึงไฟล์ screens/*.html มาแทรกใน DOM แล้วค่อยโหลด app.js
│   └── app.js               # ตรรกะแอปทั้งหมด: countdown, breathing cycle, move steps, screen transitions
└── screens/                 # แต่ละหน้าจอ (SVG scene + markup) แยกเป็นไฟล์ของตัวเอง
    ├── curtains.html         # ม่านเปิด/ปิดฉาก (ใช้ร่วมกันหลายหน้า)
    ├── start.html             # หน้าเริ่มต้น
    ├── count.html             # หน้านับถอยหลัง
    ├── breathe.html           # หน้าฝึกหายใจ (inhale/hold/exhale)
    ├── move.html              # หน้าขยับร่างกาย
    ├── focus.html             # หน้าโฟกัส
    ├── preend.html            # หน้าก่อนจบ
    └── ending.html            # หน้าจบ
``


