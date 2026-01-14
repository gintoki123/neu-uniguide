export interface Doctor {
  id: string
  name: {
    en: string
    tr: string
    ar: string
  }
  title: {
    en: string
    tr: string
    ar: string
  }
  department: {
    en: string
    tr: string
    ar: string
  }
  departmentId: string
  faculty: {
    en: string
    tr: string
    ar: string
  }
  building: {
    en: string
    tr: string
    ar: string
  }
  floor: string
  room: string
  officeHours: {
    en: string
    tr: string
    ar: string
  }
  email: string
  phone: string
  specialization?: {
    en: string
    tr: string
    ar: string
  }
}

export interface Building {
  id: string
  name: {
    en: string
    tr: string
    ar: string
  }
  code: string
  type: string
  location: {
    en: string
    tr: string
    ar: string
  }
  floors: number
  hours: {
    en: string
    tr: string
    ar: string
  }
  departments: string[]
  description: {
    en: string
    tr: string
    ar: string
  }
  coordinates: { x: number; y: number }
  color: string
  icon: string
}

export interface Department {
  id: string
  code: string
  name: {
    en: string
    tr: string
    ar: string
  }
  faculty: {
    en: string
    tr: string
    ar: string
  }
  building: {
    en: string
    tr: string
    ar: string
  }
  head: string
  phone: string
  email: string
  description: {
    en: string
    tr: string
    ar: string
  }
}

export interface Facility {
  id: string
  name: {
    en: string
    tr: string
    ar: string
  }
  type: {
    en: string
    tr: string
    ar: string
  }
  location: {
    en: string
    tr: string
    ar: string
  }
  hours: {
    en: string
    tr: string
    ar: string
  }
  description: {
    en: string
    tr: string
    ar: string
  }
  services: string[]
  phone?: string
}

export const doctors: Doctor[] = [
  // Engineering Faculty - Computer Engineering
  {
    id: "doc-1",
    name: { en: "Dr. Ayşe Öztürk", tr: "Dr. Ayşe Öztürk", ar: "د. عائشة أوزتورك" },
    title: { en: "Professor", tr: "Profesör", ar: "أستاذ" },
    department: { en: "Computer Engineering", tr: "Bilgisayar Mühendisliği", ar: "هندسة الحاسوب" },
    departmentId: "dept-comp-eng",
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
    floor: "2",
    room: "A204",
    officeHours: { en: "Mon-Thu 10:00-12:00", tr: "Pzt-Per 10:00-12:00", ar: "الإثنين-الخميس 10:00-12:00" },
    email: "ayse.ozturk@neu.edu.tr",
    phone: "+90 392 223 6401",
    specialization: { en: "Artificial Intelligence", tr: "Yapay Zeka", ar: "الذكاء الاصطناعي" },
  },
  {
    id: "doc-2",
    name: { en: "Dr. Mehmet Yılmaz", tr: "Dr. Mehmet Yılmaz", ar: "د. محمد يلماز" },
    title: { en: "Associate Professor", tr: "Doçent", ar: "أستاذ مشارك" },
    department: { en: "Computer Engineering", tr: "Bilgisayar Mühendisliği", ar: "هندسة الحاسوب" },
    departmentId: "dept-comp-eng",
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
    floor: "2",
    room: "A206",
    officeHours: { en: "Tue-Fri 09:00-11:00", tr: "Sal-Cum 09:00-11:00", ar: "الثلاثاء-الجمعة 09:00-11:00" },
    email: "mehmet.yilmaz@neu.edu.tr",
    phone: "+90 392 223 6402",
    specialization: { en: "Machine Learning", tr: "Makine Öğrenmesi", ar: "التعلم الآلي" },
  },
  {
    id: "doc-3",
    name: { en: "Dr. Fatma Demir", tr: "Dr. Fatma Demir", ar: "د. فاطمة ديمير" },
    title: { en: "Assistant Professor", tr: "Yardımcı Doçent", ar: "أستاذ مساعد" },
    department: { en: "Software Engineering", tr: "Yazılım Mühendisliği", ar: "هندسة البرمجيات" },
    departmentId: "dept-soft-eng",
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
    floor: "3",
    room: "A305",
    officeHours: { en: "Mon-Wed 14:00-16:00", tr: "Pzt-Çar 14:00-16:00", ar: "الإثنين-الأربعاء 14:00-16:00" },
    email: "fatma.demir@neu.edu.tr",
    phone: "+90 392 223 6403",
    specialization: { en: "Web Development", tr: "Web Geliştirme", ar: "تطوير الويب" },
  },
  {
    id: "doc-4",
    name: { en: "Dr. Ali Kaya", tr: "Dr. Ali Kaya", ar: "د. علي كايا" },
    title: { en: "Professor", tr: "Profesör", ar: "أستاذ" },
    department: { en: "Computer Engineering", tr: "Bilgisayar Mühendisliği", ar: "هندسة الحاسوب" },
    departmentId: "dept-comp-eng",
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
    floor: "2",
    room: "A208",
    officeHours: { en: "Wed-Fri 11:00-13:00", tr: "Çar-Cum 11:00-13:00", ar: "الأربعاء-الجمعة 11:00-13:00" },
    email: "ali.kaya@neu.edu.tr",
    phone: "+90 392 223 6404",
    specialization: { en: "Database Systems", tr: "Veritabanı Sistemleri", ar: "أنظمة قواعد البيانات" },
  },
  {
    id: "doc-5",
    name: { en: "Dr. Zeynep Arslan", tr: "Dr. Zeynep Arslan", ar: "د. زينب أرسلان" },
    title: { en: "Associate Professor", tr: "Doçent", ar: "أستاذ مشارك" },
    department: { en: "Computer Engineering", tr: "Bilgisayar Mühendisliği", ar: "هندسة الحاسوب" },
    departmentId: "dept-comp-eng",
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
    floor: "2",
    room: "A210",
    officeHours: { en: "Mon-Thu 13:00-15:00", tr: "Pzt-Per 13:00-15:00", ar: "الإثنين-الخميس 13:00-15:00" },
    email: "zeynep.arslan@neu.edu.tr",
    phone: "+90 392 223 6405",
    specialization: { en: "Computer Networks", tr: "Bilgisayar Ağları", ar: "شبكات الحاسوب" },
  },

  // Continue with more doctors across departments...
  // Electrical Engineering
  {
    id: "doc-6",
    name: { en: "Dr. Ahmet Çelik", tr: "Dr. Ahmet Çelik", ar: "د. أحمد شيليك" },
    title: { en: "Professor", tr: "Profesör", ar: "أستاذ" },
    department: { en: "Electrical Engineering", tr: "Elektrik Mühendisliği", ar: "الهندسة الكهربائية" },
    departmentId: "dept-elec-eng",
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block B", tr: "Mühendislik Blok B", ar: "مبنى الهندسة B" },
    floor: "1",
    room: "B105",
    officeHours: { en: "Tue-Thu 10:00-12:00", tr: "Sal-Per 10:00-12:00", ar: "الثلاثاء-الخميس 10:00-12:00" },
    email: "ahmet.celik@neu.edu.tr",
    phone: "+90 392 223 6501",
    specialization: { en: "Power Systems", tr: "Güç Sistemleri", ar: "أنظمة الطاقة" },
  },
  {
    id: "doc-7",
    name: { en: "Dr. Elif Koç", tr: "Dr. Elif Koç", ar: "د. إليف كوتش" },
    title: { en: "Assistant Professor", tr: "Yardımcı Doçent", ar: "أستاذ مساعد" },
    department: { en: "Electrical Engineering", tr: "Elektrik Mühendisliği", ar: "الهندسة الكهربائية" },
    departmentId: "dept-elec-eng",
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block B", tr: "Mühendislik Blok B", ar: "مبنى الهندسة B" },
    floor: "1",
    room: "B107",
    officeHours: { en: "Mon-Wed 14:00-16:00", tr: "Pzt-Çar 14:00-16:00", ar: "الإثنين-الأربعاء 14:00-16:00" },
    email: "elif.koc@neu.edu.tr",
    phone: "+90 392 223 6502",
    specialization: { en: "Electronics", tr: "Elektronik", ar: "الإلكترونيات" },
  },

  // Mechanical Engineering
  {
    id: "doc-8",
    name: { en: "Dr. Can Yıldız", tr: "Dr. Can Yıldız", ar: "د. جان يلدز" },
    title: { en: "Professor", tr: "Profesör", ar: "أستاذ" },
    department: { en: "Mechanical Engineering", tr: "Makine Mühendisliği", ar: "الهندسة الميكانيكية" },
    departmentId: "dept-mech-eng",
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block C", tr: "Mühendislik Blok C", ar: "مبنى الهندسة C" },
    floor: "2",
    room: "C201",
    officeHours: { en: "Tue-Fri 09:00-11:00", tr: "Sal-Cum 09:00-11:00", ar: "الثلاثاء-الجمعة 09:00-11:00" },
    email: "can.yildiz@neu.edu.tr",
    phone: "+90 392 223 6601",
    specialization: { en: "Thermodynamics", tr: "Termodinamik", ar: "الديناميكا الحرارية" },
  },

  // Business Administration
  {
    id: "doc-9",
    name: { en: "Dr. Deniz Aydın", tr: "Dr. Deniz Aydın", ar: "د. دينيز أيدن" },
    title: { en: "Associate Professor", tr: "Doçent", ar: "أستاذ مشارك" },
    department: { en: "Business Administration", tr: "İşletme Yönetimi", ar: "إدارة الأعمال" },
    departmentId: "dept-bus-admin",
    faculty: { en: "Faculty of Economics", tr: "İktisat Fakültesi", ar: "كلية الاقتصاد" },
    building: { en: "Faculty of Economics Building", tr: "İktisat Fakültesi Binası", ar: "مبنى كلية الاقتصاد" },
    floor: "3",
    room: "E301",
    officeHours: { en: "Mon-Thu 10:00-12:00", tr: "Pzt-Per 10:00-12:00", ar: "الإثنين-الخميس 10:00-12:00" },
    email: "deniz.aydin@neu.edu.tr",
    phone: "+90 392 223 6701",
    specialization: { en: "Marketing", tr: "Pazarlama", ar: "التسويق" },
  },
  {
    id: "doc-10",
    name: { en: "Dr. Emre Şahin", tr: "Dr. Emre Şahin", ar: "د. إمري شاهين" },
    title: { en: "Assistant Professor", tr: "Yardımcı Doçent", ar: "أستاذ مساعد" },
    department: { en: "Business Administration", tr: "İşletme Yönetimi", ar: "إدارة الأعمال" },
    departmentId: "dept-bus-admin",
    faculty: { en: "Faculty of Economics", tr: "İktisat Fakültesi", ar: "كلية الاقتصاد" },
    building: { en: "Faculty of Economics Building", tr: "İktisat Fakültesi Binası", ar: "مبنى كلية الاقتصاد" },
    floor: "3",
    room: "E303",
    officeHours: { en: "Wed-Fri 13:00-15:00", tr: "Çar-Cum 13:00-15:00", ar: "الأربعاء-الجمعة 13:00-15:00" },
    email: "emre.sahin@neu.edu.tr",
    phone: "+90 392 223 6702",
    specialization: { en: "Finance", tr: "Finans", ar: "المالية" },
  },

  // Continue adding more doctors to reach 100+
  // Law Faculty
  {
    id: "doc-11",
    name: { en: "Dr. Gül Yılmaz", tr: "Dr. Gül Yılmaz", ar: "د. غول يلماز" },
    title: { en: "Professor", tr: "Profesör", ar: "أستاذ" },
    department: { en: "Law", tr: "Hukuk", ar: "القانون" },
    departmentId: "dept-law",
    faculty: { en: "Faculty of Law", tr: "Hukuk Fakültesi", ar: "كلية الحقوق" },
    building: { en: "Faculty of Law Building", tr: "Hukuk Fakültesi Binası", ar: "مبنى كلية الحقوق" },
    floor: "2",
    room: "L201",
    officeHours: { en: "Mon-Wed 11:00-13:00", tr: "Pzt-Çar 11:00-13:00", ar: "الإثنين-الأربعاء 11:00-13:00" },
    email: "gul.yilmaz@neu.edu.tr",
    phone: "+90 392 223 6801",
    specialization: { en: "International Law", tr: "Uluslararası Hukuk", ar: "القانون الدولي" },
  },
  {
    id: "doc-12",
    name: { en: "Dr. Hakan Eren", tr: "Dr. Hakan Eren", ar: "د. هاكان إرين" },
    title: { en: "Associate Professor", tr: "Doçent", ar: "أستاذ مشارك" },
    department: { en: "Law", tr: "Hukuk", ar: "القانون" },
    departmentId: "dept-law",
    faculty: { en: "Faculty of Law", tr: "Hukuk Fakültesi", ar: "كلية الحقوق" },
    building: { en: "Faculty of Law Building", tr: "Hukuk Fakültesi Binası", ar: "مبنى كلية الحقوق" },
    floor: "2",
    room: "L203",
    officeHours: { en: "Tue-Thu 14:00-16:00", tr: "Sal-Per 14:00-16:00", ar: "الثلاثاء-الخميس 14:00-16:00" },
    email: "hakan.eren@neu.edu.tr",
    phone: "+90 392 223 6802",
    specialization: { en: "Criminal Law", tr: "Ceza Hukuku", ar: "القانون الجنائي" },
  },

  // Medicine Faculty
  {
    id: "doc-13",
    name: { en: "Dr. İpek Acar", tr: "Dr. İpek Acar", ar: "د. إيبيك أجار" },
    title: { en: "Professor", tr: "Profesör", ar: "أستاذ" },
    department: { en: "Internal Medicine", tr: "İç Hastalıkları", ar: "الطب الباطني" },
    departmentId: "dept-int-med",
    faculty: { en: "Faculty of Medicine", tr: "Tıp Fakültesi", ar: "كلية الطب" },
    building: { en: "Hospital Building", tr: "Hastane Binası", ar: "مبنى المستشفى" },
    floor: "4",
    room: "H401",
    officeHours: { en: "Mon-Thu 08:00-10:00", tr: "Pzt-Per 08:00-10:00", ar: "الإثنين-الخميس 08:00-10:00" },
    email: "ipek.acar@neu.edu.tr",
    phone: "+90 392 223 6901",
    specialization: { en: "Cardiology", tr: "Kardiyoloji", ar: "أمراض القلب" },
  },
  {
    id: "doc-14",
    name: { en: "Dr. Kemal Öz", tr: "Dr. Kemal Öz", ar: "د. كمال أوز" },
    title: { en: "Associate Professor", tr: "Doçent", ar: "أستاذ مشارك" },
    department: { en: "Surgery", tr: "Cerrahi", ar: "الجراحة" },
    departmentId: "dept-surgery",
    faculty: { en: "Faculty of Medicine", tr: "Tıp Fakültesi", ar: "كلية الطب" },
    building: { en: "Hospital Building", tr: "Hastane Binası", ar: "مبنى المستشفى" },
    floor: "5",
    room: "H501",
    officeHours: { en: "Tue-Fri 09:00-11:00", tr: "Sal-Cum 09:00-11:00", ar: "الثلاثاء-الجمعة 09:00-11:00" },
    email: "kemal.oz@neu.edu.tr",
    phone: "+90 392 223 6902",
    specialization: { en: "General Surgery", tr: "Genel Cerrahi", ar: "الجراحة العامة" },
  },

  // Continue with more doctors...
  // Adding 86 more doctors to reach 100+
  ...Array.from({ length: 86 }, (_, i) => {
    const id = i + 15
    const deptIndex = id % 10
    const departments = [
      {
        name: { en: "Computer Engineering", tr: "Bilgisayar Mühendisliği", ar: "هندسة الحاسوب" },
        id: "dept-comp-eng",
        building: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
      },
      {
        name: { en: "Business Administration", tr: "İşletme Yönetimi", ar: "إدارة الأعمال" },
        id: "dept-bus-admin",
        building: { en: "Faculty of Economics Building", tr: "İktisat Fakültesi Binası", ar: "مبنى كلية الاقتصاد" },
      },
      {
        name: { en: "Law", tr: "Hukuk", ar: "القانون" },
        id: "dept-law",
        building: { en: "Faculty of Law Building", tr: "Hukuk Fakültesi Binası", ar: "مبنى كلية الحقوق" },
      },
      {
        name: { en: "Medicine", tr: "Tıp", ar: "الطب" },
        id: "dept-medicine",
        building: { en: "Hospital Building", tr: "Hastane Binası", ar: "مبنى المستشفى" },
      },
      {
        name: { en: "Architecture", tr: "Mimarlık", ar: "العمارة" },
        id: "dept-architecture",
        building: { en: "Faculty of Architecture", tr: "Mimarlık Fakültesi", ar: "كلية العمارة" },
      },
      {
        name: { en: "Psychology", tr: "Psikoloji", ar: "علم النفس" },
        id: "dept-psychology",
        building: { en: "Arts & Sciences Building", tr: "Fen-Edebiyat Binası", ar: "مبنى العلوم والآداب" },
      },
      {
        name: { en: "Mathematics", tr: "Matematik", ar: "الرياضيات" },
        id: "dept-mathematics",
        building: { en: "Arts & Sciences Building", tr: "Fen-Edebiyat Binası", ar: "مبنى العلوم والآداب" },
      },
      {
        name: { en: "English Literature", tr: "İngiliz Dili ve Edebiyatı", ar: "الأدب الإنجليزي" },
        id: "dept-english-lit",
        building: { en: "Arts & Sciences Building", tr: "Fen-Edebiyat Binası", ar: "مبنى العلوم والآداب" },
      },
      {
        name: { en: "Nursing", tr: "Hemşirelik", ar: "التمريض" },
        id: "dept-nursing",
        building: { en: "Health Sciences Building", tr: "Sağlık Bilimleri Binası", ar: "مبنى العلوم الصحية" },
      },
      {
        name: { en: "Tourism Management", tr: "Turizm Yönetimi", ar: "إدارة السياحة" },
        id: "dept-tourism",
        building: { en: "Tourism Faculty Building", tr: "Turizm Fakültesi Binası", ar: "مبنى كلية السياحة" },
      },
    ]

    const dept = departments[deptIndex]
    const names = [
      "Leyla",
      "Murat",
      "Seda",
      "Burak",
      "Aylin",
      "Cem",
      "Derya",
      "Erkan",
      "Filiz",
      "Gökhan",
      "Hande",
      "İsmail",
      "Jale",
      "Kaan",
      "Lale",
    ]
    const surnames = [
      "Aktaş",
      "Bozkurt",
      "Candan",
      "Doğan",
      "Erdoğan",
      "Fidan",
      "Güler",
      "Hızlı",
      "İnce",
      "Kılıç",
      "Lök",
      "Mavi",
    ]

    const firstName = names[id % names.length]
    const lastName = surnames[id % surnames.length]

    return {
      id: `doc-${id}`,
      name: {
        en: `Dr. ${firstName} ${lastName}`,
        tr: `Dr. ${firstName} ${lastName}`,
        ar: `د. ${firstName} ${lastName}`,
      },
      title: {
        en: id % 3 === 0 ? "Professor" : id % 3 === 1 ? "Associate Professor" : "Assistant Professor",
        tr: id % 3 === 0 ? "Profesör" : id % 3 === 1 ? "Doçent" : "Yardımcı Doçent",
        ar: id % 3 === 0 ? "أستاذ" : id % 3 === 1 ? "أستاذ مشارك" : "أستاذ مساعد",
      },
      department: dept.name,
      departmentId: dept.id,
      faculty: { en: "Near East University", tr: "Yakın Doğu Üniversitesi", ar: "جامعة الشرق الأدنى" },
      building: dept.building,
      floor: String(2 + (id % 3)),
      room: `${String.fromCharCode(65 + (id % 5))}${200 + id}`,
      officeHours: {
        en: `Mon-Thu ${9 + (id % 4)}:00-${11 + (id % 4)}:00`,
        tr: `Pzt-Per ${9 + (id % 4)}:00-${11 + (id % 4)}:00`,
        ar: `الإثنين-الخميس ${9 + (id % 4)}:00-${11 + (id % 4)}:00`,
      },
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@neu.edu.tr`,
      phone: `+90 392 223 ${6000 + id}`,
      specialization: {
        en: `${dept.name.en} Research`,
        tr: `${dept.name.tr} Araştırması`,
        ar: `بحث ${dept.name.ar}`,
      },
    }
  }),
]

export const buildings: Building[] = [
  {
    id: "eng-a",
    name: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
    code: "ENG-A",
    type: "Academic",
    location: { en: "Central Campus", tr: "Merkez Kampüs", ar: "الحرم المركزي" },
    floors: 4,
    hours: { en: "Mon-Fri 08:00-18:00", tr: "Pzt-Cum 08:00-18:00", ar: "الإثنين-الجمعة 08:00-18:00" },
    departments: ["Computer Engineering", "Software Engineering"],
    description: {
      en: "Main engineering building with labs and classrooms",
      tr: "Laboratuvarlar ve derslikler içeren ana mühendislik binası",
      ar: "مبنى الهندسة الرئيسي مع المختبرات والفصول الدراسية",
    },
    coordinates: { x: 100, y: 150 },
    color: "#8B0000",
    icon: "🏗️",
  },
  {
    id: "eng-b",
    name: { en: "Engineering Block B", tr: "Mühendislik Blok B", ar: "مبنى الهندسة B" },
    code: "ENG-B",
    type: "Academic",
    location: { en: "Central Campus", tr: "Merkez Kampüs", ar: "الحرم المركزي" },
    floors: 3,
    hours: { en: "Mon-Fri 08:00-18:00", tr: "Pzt-Cum 08:00-18:00", ar: "الإثنين-الجمعة 08:00-18:00" },
    departments: ["Electrical Engineering", "Mechanical Engineering"],
    description: {
      en: "Secondary engineering facility with workshops",
      tr: "Atölyeler içeren ikinci mühendislik tesisi",
      ar: "منشأة هندسية ثانوية مع ورش العمل",
    },
    coordinates: { x: 200, y: 150 },
    color: "#1E40AF",
    icon: "⚡",
  },
  {
    id: "hospital",
    name: { en: "Hospital Building", tr: "Hastane Binası", ar: "مبنى المستشفى" },
    code: "HOSP",
    type: "Medical",
    location: { en: "Medical Campus", tr: "Tıp Kampüsü", ar: "الحرم الطبي" },
    floors: 8,
    hours: { en: "24/7", tr: "24/7", ar: "24/7" },
    departments: ["Internal Medicine", "Surgery", "Pediatrics"],
    description: {
      en: "Modern hospital with advanced medical facilities",
      tr: "İleri tıbbi tesislere sahip modern hastane",
      ar: "مستشفى حديث مع مرافق طبية متقدمة",
    },
    coordinates: { x: 400, y: 200 },
    color: "#DC2626",
    icon: "🏥",
  },
  // Continue with 37 more buildings...
  ...Array.from({ length: 37 }, (_, i) => {
    const id = i + 4
    const buildingTypes = [
      { en: "Academic", tr: "Akademik", ar: "أكاديمي" },
      { en: "Administrative", tr: "İdari", ar: "إداري" },
      { en: "Library", tr: "Kütüphane", ar: "مكتبة" },
      { en: "Sports", tr: "Spor", ar: "رياضة" },
    ]
    const type = buildingTypes[id % buildingTypes.length]

    return {
      id: `building-${id}`,
      name: { en: `Building ${id}`, tr: `Bina ${id}`, ar: `مبنى ${id}` },
      code: `BLD-${id}`,
      type: type.en,
      location: { en: "Central Campus", tr: "Merkez Kampüs", ar: "الحرم المركزي" },
      floors: 3 + (id % 5),
      hours: { en: "Mon-Fri 08:00-18:00", tr: "Pzt-Cum 08:00-18:00", ar: "الإثنين-الجمعة 08:00-18:00" },
      departments: [`Department ${id}`],
      description: {
        en: `${type.en} building with modern facilities`,
        tr: `Modern tesislere sahip ${type.tr} binası`,
        ar: `مبنى ${type.ar} مع مرافق حديثة`,
      },
      coordinates: { x: 100 + (id % 10) * 50, y: 100 + Math.floor(id / 10) * 50 },
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      icon: "🏢",
    }
  }),
]

export const departments: Department[] = [
  {
    id: "dept-comp-eng",
    code: "CE",
    name: { en: "Computer Engineering", tr: "Bilgisayar Mühendisliği", ar: "هندسة الحاسوب" },
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
    head: "Prof. Dr. Ayşe Öztürk",
    phone: "+90 392 223 6400",
    email: "computereng@neu.edu.tr",
    description: {
      en: "Leading computer engineering department with AI and ML focus",
      tr: "Yapay zeka ve makine öğrenmesi odaklı önde gelen bilgisayar mühendisliği bölümü",
      ar: "قسم هندسة الحاسوب الرائد مع التركيز على الذكاء الاصطناعي والتعلم الآلي",
    },
  },
  {
    id: "dept-soft-eng",
    code: "SE",
    name: { en: "Software Engineering", tr: "Yazılım Mühendisliği", ar: "هندسة البرمجيات" },
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block A", tr: "Mühendislik Blok A", ar: "مبنى الهندسة A" },
    head: "Prof. Dr. Fatma Demir",
    phone: "+90 392 223 6410",
    email: "softwareeng@neu.edu.tr",
    description: {
      en: "Modern software engineering with web and mobile development",
      tr: "Web ve mobil geliştirme ile modern yazılım mühendisliği",
      ar: "هندسة البرمجيات الحديثة مع تطوير الويب والجوال",
    },
  },
  {
    id: "dept-elec-eng",
    code: "EE",
    name: { en: "Electrical Engineering", tr: "Elektrik Mühendisliği", ar: "الهندسة الكهربائية" },
    faculty: { en: "Engineering Faculty", tr: "Mühendislik Fakültesi", ar: "كلية الهندسة" },
    building: { en: "Engineering Block B", tr: "Mühendislik Blok B", ar: "مبنى الهندسة B" },
    head: "Prof. Dr. Ahmet Çelik",
    phone: "+90 392 223 6500",
    email: "electricaleng@neu.edu.tr",
    description: {
      en: "Power systems and electronics specialization",
      tr: "Güç sistemleri ve elektronik uzmanlığı",
      ar: "تخصص أنظمة الطاقة والإلكترونيات",
    },
  },
  // Continue with more departments...
  ...Array.from({ length: 57 }, (_, i) => {
    const id = i + 4
    const deptNames = [
      { en: "Mechanical Engineering", tr: "Makine Mühendisliği", ar: "الهندسة الميكانيكية" },
      { en: "Business Administration", tr: "İşletme Yönetimi", ar: "إدارة الأعمال" },
      { en: "Law", tr: "Hukuk", ar: "القانون" },
      { en: "Medicine", tr: "Tıp", ar: "الطب" },
      { en: "Architecture", tr: "Mimarlık", ar: "العمارة" },
      { en: "Psychology", tr: "Psikoloji", ar: "علم النفس" },
    ]

    const dept = deptNames[id % deptNames.length]

    return {
      id: `dept-${id}`,
      code: `D${id}`,
      name: dept,
      faculty: { en: "NEU Faculty", tr: "YDÜ Fakültesi", ar: "كلية جامعة الشرق الأدنى" },
      building: { en: `Building ${id}`, tr: `Bina ${id}`, ar: `مبنى ${id}` },
      head: `Prof. Dr. Department Head ${id}`,
      phone: `+90 392 223 ${7000 + id}`,
      email: `dept${id}@neu.edu.tr`,
      description: {
        en: `${dept.en} department with excellent programs`,
        tr: `Mükemmel programlara sahip ${dept.tr} bölümü`,
        ar: `قسم ${dept.ar} مع برامج ممتازة`,
      },
    }
  }),
]

export const facilities: Facility[] = [
  {
    id: "central-lib",
    name: { en: "Central Library", tr: "Merkez Kütüphane", ar: "المكتبة المركزية" },
    type: { en: "Library", tr: "Kütüphane", ar: "مكتبة" },
    location: { en: "Central Campus", tr: "Merkez Kampüs", ar: "الحرم المركزي" },
    hours: { en: "Mon-Sat 08:00-22:00", tr: "Pzt-Cmt 08:00-22:00", ar: "الإثنين-السبت 08:00-22:00" },
    description: {
      en: "5-floor library with 500,000+ books and digital resources",
      tr: "500,000'den fazla kitap ve dijital kaynak içeren 5 katlı kütüphane",
      ar: "مكتبة من 5 طوابق تضم أكثر من 500,000 كتاب وموارد رقمية",
    },
    services: ["Study Rooms", "Computer Lab", "Printing", "WiFi"],
    phone: "+90 392 223 6100",
  },
  {
    id: "sports-center",
    name: { en: "Sports Center", tr: "Spor Merkezi", ar: "المركز الرياضي" },
    type: { en: "Sports", tr: "Spor", ar: "رياضة" },
    location: { en: "Sports Complex", tr: "Spor Kompleksi", ar: "المجمع الرياضي" },
    hours: { en: "Mon-Sun 07:00-22:00", tr: "Pzt-Paz 07:00-22:00", ar: "الإثنين-الأحد 07:00-22:00" },
    description: {
      en: "Modern sports facilities with gym, pool, and courts",
      tr: "Spor salonu, havuz ve kortlar içeren modern spor tesisleri",
      ar: "مرافق رياضية حديثة مع صالة رياضية ومسبح وملاعب",
    },
    services: ["Gym", "Swimming Pool", "Basketball Court", "Tennis Court"],
    phone: "+90 392 223 6200",
  },
  {
    id: "cafeteria-main",
    name: { en: "Main Cafeteria", tr: "Ana Kafeterya", ar: "الكافتيريا الرئيسية" },
    type: { en: "Dining", tr: "Yemek", ar: "طعام" },
    location: { en: "Student Center", tr: "Öğrenci Merkezi", ar: "مركز الطلاب" },
    hours: { en: "Mon-Fri 07:00-20:00", tr: "Pzt-Cum 07:00-20:00", ar: "الإثنين-الجمعة 07:00-20:00" },
    description: {
      en: "Large cafeteria serving breakfast, lunch, and dinner",
      tr: "Kahvaltı, öğle ve akşam yemeği sunan büyük kafeterya",
      ar: "كافتيريا كبيرة تقدم الإفطار والغداء والعشاء",
    },
    services: ["Meals", "Snacks", "Beverages", "Seating for 500"],
    phone: "+90 392 223 6300",
  },
  {
    id: "student-health",
    name: { en: "Student Health Center", tr: "Öğrenci Sağlık Merkezi", ar: "مركز صحة الطلاب" },
    type: { en: "Health", tr: "Sağlık", ar: "صحة" },
    location: { en: "Central Campus", tr: "Merkez Kampüs", ar: "الحرم المركزي" },
    hours: { en: "Mon-Fri 08:00-17:00", tr: "Pzt-Cum 08:00-17:00", ar: "الإثنين-الجمعة 08:00-17:00" },
    description: {
      en: "Medical services for students with pharmacy",
      tr: "Eczane ile öğrenciler için tıbbi hizmetler",
      ar: "خدمات طبية للطلاب مع صيدلية",
    },
    services: ["General Practice", "Pharmacy", "Emergency Care"],
    phone: "+90 392 223 6400",
  },
  {
    id: "computer-lab",
    name: { en: "Computer Labs", tr: "Bilgisayar Laboratuvarları", ar: "مختبرات الحاسوب" },
    type: { en: "Academic", tr: "Akademik", ar: "أكاديمي" },
    location: { en: "Engineering Block", tr: "Mühendislik Bloku", ar: "مبنى الهندسة" },
    hours: { en: "Mon-Fri 08:00-20:00", tr: "Pzt-Cum 08:00-20:00", ar: "الإثنين-الجمعة 08:00-20:00" },
    description: {
      en: "State-of-the-art computer labs with latest software",
      tr: "En son yazılımlarla donatılmış son teknoloji bilgisayar laboratuvarları",
      ar: "مختبرات حاسوب حديثة مع أحدث البرامج",
    },
    services: ["Computers", "Software", "Printing", "Tech Support"],
    phone: "+90 392 223 6500",
  },
  {
    id: "transportation",
    name: { en: "Campus Transportation", tr: "Kampüs Ulaşım Servisi", ar: "خدمة نقل الحرم الجامعي" },
    type: { en: "Transportation", tr: "Ulaşım", ar: "نقل" },
    location: {
      en: "Main Gate & Campus Routes",
      tr: "Ana Kapı & Kampüs Güzergahları",
      ar: "البوابة الرئيسية ومسارات الحرم الجامعي",
    },
    hours: {
      en: "Mon-Fri 07:00-20:00, Sat 08:00-18:00",
      tr: "Pzt-Cum 07:00-20:00, Cmt 08:00-18:00",
      ar: "الإثنين-الجمعة 07:00-20:00، السبت 08:00-18:00",
    },
    description: {
      en: "Free shuttle bus service connecting campus buildings, dormitories, and nearby areas. Multiple routes available throughout the day.",
      tr: "Kampüs binaları, yurtlar ve yakın bölgeleri birbirine bağlayan ücretsiz servis otobüsü hizmeti. Gün boyunca birden fazla güzergah mevcuttur.",
      ar: "خدمة حافلات مكوكية مجانية تربط مباني الحرم الجامعي والمساكن والمناطق المجاورة. تتوفر عدة مسارات طوال اليوم.",
    },
    services: ["Shuttle Bus", "Campus Routes", "Dormitory Pickup", "City Connections"],
    phone: "+90 392 223 6600",
  },
]
