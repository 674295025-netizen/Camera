export const DEFAULT_GEARS = [
  {
    id: 'g1',
    brand: 'Sony',
    name: 'Sony A7 IV',
    category: 'Camera',
    mount: 'E-Mount',
    serial: 'SN-SONY-88902',
    dailyRate: 1000,
    deposit: 5000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    status: 'AVAILABLE',
    rentalCount: 28,
    specs: '33MP Full-Frame Exmor R CMOS Sensor, 4K 60p, 10-Bit 4:2:2'
  },
  {
    id: 'g2',
    brand: 'Canon',
    name: 'Canon EOS R5',
    category: 'Camera',
    mount: 'RF-Mount',
    serial: 'SN-CANON-10492',
    dailyRate: 1500,
    deposit: 8000,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80',
    status: 'AVAILABLE',
    rentalCount: 22,
    specs: '45MP Full-Frame Sensor, 8K 30p Raw & 4K 120p, Dual Pixel CMOS AF II'
  },
  {
    id: 'g3',
    brand: 'Sony',
    name: 'Sony FE 24-70mm f/2.8 GM II',
    category: 'Lens',
    mount: 'E-Mount',
    serial: 'SN-LENS-99120',
    dailyRate: 800,
    deposit: 3000,
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=600&q=80',
    status: 'AVAILABLE',
    rentalCount: 35,
    specs: 'G Master Zoom, Fast f/2.8 Aperture, Four XD Linear AF Motors'
  },
  {
    id: 'g4',
    brand: 'Fujifilm',
    name: 'Fujifilm X-T5',
    category: 'Camera',
    mount: 'X-Mount',
    serial: 'SN-FUJI-33211',
    dailyRate: 900,
    deposit: 4000,
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80',
    status: 'RENTED',
    rentalCount: 19,
    specs: '40.2MP X-Trans CMOS 5 HR Sensor, 6.2K 30p, Film Simulation Modes'
  },
  {
    id: 'g5',
    brand: 'Sony',
    name: 'Sony FX3 Cinema Line',
    category: 'Camera',
    mount: 'E-Mount',
    serial: 'SN-SONY-77319',
    dailyRate: 1800,
    deposit: 9000,
    image: 'https://images.unsplash.com/photo-1589872510927-9759d57b2935?auto=format&fit=crop&w=600&q=80',
    status: 'AVAILABLE',
    rentalCount: 31,
    specs: '12.1MP Full-Frame Sensor, UHD 4K 120p, S-Cinetone, Active Cooling'
  },
  {
    id: 'g6',
    brand: 'DJI',
    name: 'DJI RS3 Pro Gimbal',
    category: 'Accessory',
    mount: 'Universal',
    serial: 'SN-DJI-55102',
    dailyRate: 600,
    deposit: 2500,
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
    status: 'MAINTENANCE',
    rentalCount: 14,
    specs: 'Carbon Fiber Gimbal, 4.5kg Payload, Automated Axis Locks'
  }
];

export const DEFAULT_BOOKINGS = [
  {
    id: 'LF-9021',
    customerName: 'สมชาย สายถ่ายภาพ',
    gearId: 'g4',
    gearName: 'Fujifilm X-T5',
    days: 2,
    totalFee: 5800,
    rentFee: 1800,
    deposit: 4000,
    status: 'RENTED',
    bookingDate: '2026-10-05',
    returnDate: '2026-10-07'
  },
  {
    id: 'LF-9022',
    customerName: 'วิภาดา โปรดักชั่น',
    gearId: 'g5',
    gearName: 'Sony FX3 Cinema Line',
    days: 3,
    totalFee: 14400,
    rentFee: 5400,
    deposit: 9000,
    status: 'PENDING',
    bookingDate: '2026-10-06',
    returnDate: '2026-10-09'
  },
  {
    id: 'LF-9018',
    customerName: 'ธนกร ช่างภาพอิสระ',
    gearId: 'g1',
    gearName: 'Sony A7 IV',
    days: 1,
    totalFee: 6000,
    rentFee: 1000,
    deposit: 5000,
    status: 'COMPLETED',
    bookingDate: '2026-10-02',
    returnDate: '2026-10-03'
  }
];

export const DEFAULT_ACTIVITIES = [
  { text: 'วิภาดา โปรดักชั่น จองกล้อง Sony FX3 (รอการอนุมัติส่งมอบ)', time: '10 นาทีที่แล้ว', type: 'booking' },
  { text: 'ส่งมอบ Fujifilm X-T5 ให้แก่ สมชาย สายถ่ายภาพ สำเร็จ', time: '1 ชั่วโมงที่แล้ว', type: 'handover' },
  { text: 'ตรวจรับคืน Sony A7 IV คืนเงินมัดจำ 5,000 บาท ครบถ้วน', time: '2 วันที่แล้ว', type: 'return' }
];
