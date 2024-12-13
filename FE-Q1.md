# FE-Q1

useCallback ใช้ทําอะไร

useCallback() เป็น react hook function ที่ใช้เก็บผลลัพท์ที่ได้จาก function โดยถ้าตัวแปรใน dependency array ไม่มีการเปลี่ยนแปลงค่า จะไม่ re-render component ใหม่ และยังเก็บ (cache) การทำงานของ function ที่ใส่เข้ามา โดยที่ไม่มีการเปลี่ยนแปลงการทำงาน

ตัวอย่างการใช้งาน

- ใช้กับ function ที่ต้องการเก็บการทำงานไว้ตาม dependency array โดยถ้าไม่มีการเปลี่ยนข้อมูลใน dependency array แล้วจะ cache function callback นี้ไว้ และจะไม่มีการ re render component ใหม่
- เหมาะกับ callback function ที่มีการคำนวนซับซ้อน โดยสามารถลดการสร้าง component และ re render function ที่ซ้ำซ้อนไปได้