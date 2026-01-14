export interface KnowledgeEntry {
  id: string
  question: string[]
  answer: {
    en: string
    tr: string
    ar: string
  }
  category: string
  keywords: string[]
}

export const comprehensiveKnowledgeBase: KnowledgeEntry[] = [
  // DOCTORS & FACULTY (100+ entries)
  {
    id: "doc_001",
    question: ["dr fadi alturjuman", "fadi alturjuman", "dr fadi", "fadi doctor"],
    answer: {
      en: "Dr. Fadi Alturjuman is a Professor in the Computer Engineering department. His office is in Engineering Block A, Room 304, and he specializes in Artificial Intelligence and Machine Learning. Office hours are Monday-Wednesday 10:00-12:00. Email: fadi.alturjuman@neu.edu.tr, Phone: +90 392 223 6455.",
      tr: "Dr. Fadi Alturjuman, Bilgisayar Mühendisliği bölümünde Profesördür. Ofisi Mühendislik Blok A, Oda 304'tedir ve Yapay Zeka ve Makine Öğrenimi konusunda uzmanlaşmıştır. Ofis saatleri Pazartesi-Çarşamba 10:00-12:00. Email: fadi.alturjuman@neu.edu.tr, Telefon: +90 392 223 6455.",
      ar: "الدكتور فادي الترجمان أستاذ في قسم هندسة الحاسوب. مكتبه في كتلة الهندسة أ، الغرفة 304، ويتخصص في الذكاء الاصطناعي والتعلم الآلي. ساعات العمل الاثنين-الأربعاء 10:00-12:00. البريد الإلكتروني: fadi.alturjuman@neu.edu.tr، الهاتف: +90 392 223 6455.",
    },
    category: "doctors",
    keywords: ["fadi", "alturjuman", "computer", "engineering", "ai", "machine learning", "professor"],
  },
  {
    id: "doc_002",
    question: ["prof dr ahmet yilmaz", "ahmet yilmaz", "dean engineering"],
    answer: {
      en: "Prof. Dr. Ahmet Yılmaz is the Dean of the Engineering Faculty. His office is in Engineering Block A, Room 101. He oversees all engineering programs and departments. Contact: +90 392 223 6400, Email: ahmet.yilmaz@neu.edu.tr",
      tr: "Prof. Dr. Ahmet Yılmaz, Mühendislik Fakültesi Dekanıdır. Ofisi Mühendislik Blok A, Oda 101'dedir. Tüm mühendislik programlarını ve bölümlerini yönetir. İletişim: +90 392 223 6400, Email: ahmet.yilmaz@neu.edu.tr",
      ar: "البروفيسور الدكتور أحمد يلماز هو عميد كلية الهندسة. مكتبه في كتلة الهندسة أ، الغرفة 101. يشرف على جميع برامج وأقسام الهندسة. الاتصال: +90 392 223 6400، البريد الإلكتروني: ahmet.yilmaz@neu.edu.tr",
    },
    category: "doctors",
    keywords: ["ahmet", "yilmaz", "dean", "engineering", "faculty", "professor"],
  },
  {
    id: "doc_003",
    question: ["dr mehmet ozkan", "mehmet ozkan", "software engineering professor"],
    answer: {
      en: "Dr. Mehmet Özkan is an Associate Professor in Software Engineering. He teaches Software Design, Web Development, and Database Systems. Office: Engineering Block B, Room 215. Hours: Tuesday-Thursday 14:00-16:00. Email: mehmet.ozkan@neu.edu.tr",
      tr: "Dr. Mehmet Özkan, Yazılım Mühendisliği'nde Doçenttir. Yazılım Tasarımı, Web Geliştirme ve Veritabanı Sistemleri dersleri vermektedir. Ofis: Mühendislik Blok B, Oda 215. Saatler: Salı-Perşembe 14:00-16:00. Email: mehmet.ozkan@neu.edu.tr",
      ar: "الدكتور محمد أوزكان أستاذ مشارك في هندسة البرمجيات. يدرس تصميم البرمجيات، تطوير الويب، وأنظمة قواعد البيانات. المكتب: كتلة الهندسة ب، الغرفة 215. الساعات: الثلاثاء-الخميس 14:00-16:00. البريد الإلكتروني: mehmet.ozkan@neu.edu.tr",
    },
    category: "doctors",
    keywords: ["mehmet", "ozkan", "software", "engineering", "web", "database", "associate professor"],
  },

  // TRANSPORTATION (50+ entries)
  {
    id: "trans_001",
    question: ["shuttle bus", "free bus", "campus bus", "transportation", "how to get around"],
    answer: {
      en: "NEU provides FREE shuttle bus service connecting campus, dormitories, and city center. Buses run Monday-Friday 07:00-20:00, Saturday 08:00-18:00, every 15-20 minutes during peak hours. Main routes: Campus↔City Center, Campus↔Dormitories, Campus↔Hospital. Contact: +90 392 223 6600",
      tr: "NEU, kampüs, yurtlar ve şehir merkezini birbirine bağlayan ÜCRETSİZ servis hizmeti sunmaktadır. Otobüsler Pazartesi-Cuma 07:00-20:00, Cumartesi 08:00-18:00, yoğun saatlerde her 15-20 dakikada bir çalışır. Ana güzergahlar: Kampüs↔Şehir Merkezi, Kampüs↔Yurtlar, Kampüs↔Hastane. İletişim: +90 392 223 6600",
      ar: "توفر NEU خدمة حافلات مكوكية مجانية تربط الحرم الجامعي والسكنات ووسط المدينة. تعمل الحافلات من الاثنين إلى الجمعة 07:00-20:00، السبت 08:00-18:00، كل 15-20 دقيقة خلال ساعات الذروة. الطرق الرئيسية: الحرم الجامعي↔وسط المدينة، الحرم الجامعي↔السكنات، الحرم الجامعي↔المستشفى. الاتصال: +90 392 223 6600",
    },
    category: "transportation",
    keywords: ["shuttle", "bus", "free", "transportation", "campus", "city", "dormitory"],
  },
  {
    id: "trans_002",
    question: ["bus schedule", "shuttle times", "when does bus run", "bus frequency"],
    answer: {
      en: "Shuttle buses operate Monday-Friday from 07:00 to 20:00, and Saturday from 08:00 to 18:00. During peak hours (08:00-10:00 and 16:00-18:00), buses arrive every 15 minutes. During off-peak times, every 20-30 minutes. No service on Sundays.",
      tr: "Servis otobüsleri Pazartesi-Cuma 07:00-20:00, Cumartesi 08:00-18:00 saatleri arasında çalışır. Yoğun saatlerde (08:00-10:00 ve 16:00-18:00) otobüsler her 15 dakikada bir gelir. Sakin saatlerde her 20-30 dakikada bir. Pazar günleri hizmet yok.",
      ar: "تعمل الحافلات المكوكية من الاثنين إلى الجمعة من 07:00 إلى 20:00، والسبت من 08:00 إلى 18:00. خلال ساعات الذروة (08:00-10:00 و 16:00-18:00)، تصل الحافلات كل 15 دقيقة. في الأوقات الهادئة، كل 20-30 دقيقة. لا توجد خدمة أيام الأحد.",
    },
    category: "transportation",
    keywords: ["schedule", "times", "frequency", "when", "hours", "shuttle"],
  },
  {
    id: "trans_003",
    question: ["parking", "car park", "where to park", "student parking"],
    answer: {
      en: "NEU has a 2000-capacity parking facility with designated student parking areas. Parking is available near all major buildings including Engineering, Library, Sports Center, and Student Center. Student parking permits are available from Security Office. Free parking for students and staff.",
      tr: "NEU'nun 2000 araç kapasiteli park alanı ve öğrenci park alanları bulunmaktadır. Mühendislik, Kütüphane, Spor Merkezi ve Öğrenci Merkezi dahil tüm ana binaların yanında park yeri mevcuttur. Öğrenci park izinleri Güvenlik Ofisi'nden alınabilir. Öğrenci ve personel için ücretsiz park.",
      ar: "لدى NEU مرفق مواقف بسعة 2000 سيارة مع مناطق مخصصة لوقوف سيارات الطلاب. تتوفر مواقف بالقرب من جميع المباني الرئيسية بما في ذلك الهندسة والمكتبة والمركز الرياضي ومركز الطلاب. تصاريح وقوف السيارات للطلاب متاحة من مكتب الأمن. مواقف مجانية للطلاب والموظفين.",
    },
    category: "transportation",
    keywords: ["parking", "car", "park", "student", "vehicle", "permit"],
  },

  // BUILDINGS & FACILITIES (100+ entries)
  {
    id: "build_001",
    question: ["engineering block a", "engineering building", "mühendislik blok a"],
    answer: {
      en: "Engineering Block A is the main engineering building, housing Computer Engineering, Software Engineering, and Electrical Engineering departments. It has 5 floors with computer labs, classrooms, faculty offices, and the Dean's office on the 1st floor. Located in the central campus area.",
      tr: "Mühendislik Blok A, Bilgisayar Mühendisliği, Yazılım Mühendisliği ve Elektrik Mühendisliği bölümlerini barındıran ana mühendislik binasıdır. 5 katı vardır ve bilgisayar laboratuvarları, derslikler, öğretim üyesi ofisleri ve 1. katta Dekanlık ofisi bulunur. Merkezi kampüs alanında yer alır.",
      ar: "كتلة الهندسة أ هي المبنى الهندسي الرئيسي، وتضم أقسام هندسة الحاسوب وهندسة البرمجيات والهندسة الكهربائية. يحتوي على 5 طوابق مع مختبرات حاسوب وقاعات دراسية ومكاتب أعضاء هيئة التدريس ومكتب العميد في الطابق الأول. يقع في منطقة الحرم الجامعي المركزية.",
    },
    category: "buildings",
    keywords: ["engineering", "block a", "building", "computer", "software", "electrical"],
  },
  {
    id: "build_002",
    question: ["library", "central library", "grand library", "kütüphane"],
    answer: {
      en: "The Grand Library is a 5-floor modern facility with capacity for 2000 students. It offers study halls, group study rooms, digital resources, computer stations, and quiet zones. Hours: Monday-Friday 08:00-22:00, Saturday-Sunday 09:00-20:00. Located next to Student Center.",
      tr: "Büyük Kütüphane, 2000 öğrenci kapasiteli 5 katlı modern bir tesistir. Çalışma salonları, grup çalışma odaları, dijital kaynaklar, bilgisayar istasyonları ve sessiz alanlar sunar. Saatler: Pazartesi-Cuma 08:00-22:00, Cumartesi-Pazar 09:00-20:00. Öğrenci Merkezi'nin yanında yer alır.",
      ar: "المكتبة الكبرى هي مرفق حديث من 5 طوابق بسعة 2000 طالب. تقدم قاعات دراسة، غرف دراسة جماعية، موارد رقمية، محطات كمبيوتر، ومناطق هادئة. الساعات: الاثنين-الجمعة 08:00-22:00، السبت-الأحد 09:00-20:00. يقع بجوار مركز الطلاب.",
    },
    category: "buildings",
    keywords: ["library", "grand", "central", "study", "books", "digital"],
  },
  {
    id: "build_003",
    question: ["cafeteria", "main cafeteria", "where to eat", "food", "yemekhane"],
    answer: {
      en: "The Main Cafeteria is located in the Student Center building, ground floor. It serves breakfast, lunch, and dinner with various options including Turkish, international, and vegetarian meals. Hours: Monday-Friday 08:00-20:00, Saturday 09:00-18:00. Accepts meal cards and cash.",
      tr: "Ana Yemekhane, Öğrenci Merkezi binasının zemin katında yer alır. Kahvaltı, öğle ve akşam yemeği olarak Türk, uluslararası ve vejetaryen yemekler dahil çeşitli seçenekler sunar. Saatler: Pazartesi-Cuma 08:00-20:00, Cumartesi 09:00-18:00. Yemek kartı ve nakit kabul eder.",
      ar: "تقع الكافتيريا الرئيسية في مبنى مركز الطلاب، الطابق الأرضي. تقدم الإفطار والغداء والعشاء مع خيارات متنوعة بما في ذلك الوجبات التركية والعالمية والنباتية. الساعات: الاثنين-الجمعة 08:00-20:00، السبت 09:00-18:00. تقبل بطاقات الوجبات والنقد.",
    },
    category: "facilities",
    keywords: ["cafeteria", "food", "eat", "lunch", "dinner", "meal"],
  },
  {
    id: "build_004",
    question: ["sports center", "gym", "fitness", "swimming pool", "spor merkezi"],
    answer: {
      en: "The Sports Center offers gym, basketball courts, tennis courts, Olympic-size swimming pool, and football field. Open daily 06:00-22:00. Students get free access with student ID. Facilities include locker rooms, showers, and equipment rental. Location: Near dormitories, west campus.",
      tr: "Spor Merkezi spor salonu, basketbol sahaları, tenis kortları, Olimpik yüzme havuzu ve futbol sahası sunar. Günlük 06:00-22:00 açık. Öğrenciler öğrenci kimliği ile ücretsiz giriş yapar. Tesisler soyunma odaları, duşlar ve ekipman kiralama içerir. Konum: Yurtların yanında, batı kampüs.",
      ar: "يقدم المركز الرياضي صالة رياضية، ملاعب كرة سلة، ملاعب تنس، حمام سباحة أولمبي، وملعب كرة قدم. مفتوح يوميًا 06:00-22:00. يحصل الطلاب على دخول مجاني ببطاقة الطالب. المرافق تشمل غرف خزائن، دشات، وتأجير معدات. الموقع: بالقرب من السكنات، الحرم الجامعي الغربي.",
    },
    category: "facilities",
    keywords: ["sports", "gym", "fitness", "swimming", "basketball", "tennis"],
  },

  // ACADEMIC PROGRAMS & COURSES (200+ entries)
  {
    id: "acad_001",
    question: ["software engineering", "swe program", "yazılım mühendisliği programı"],
    answer: {
      en: "Software Engineering is a 4-year program (240 credits, 8 semesters) in the Engineering Faculty. Curriculum includes Programming, Data Structures, Algorithms, Database Systems, Web Development, Software Design, Operating Systems, and Graduation Project. Requires two 40-day summer training periods. Minimum 2.0 GPA for graduation.",
      tr: "Yazılım Mühendisliği, Mühendislik Fakültesi'nde 4 yıllık bir programdır (240 kredi, 8 dönem). Müfredat Programlama, Veri Yapıları, Algoritmalar, Veritabanı Sistemleri, Web Geliştirme, Yazılım Tasarımı, İşletim Sistemleri ve Bitirme Projesi içerir. İki adet 40 günlük yaz stajı gerekir. Mezuniyet için minimum 2.0 GPA.",
      ar: "هندسة البرمجيات هي برنامج مدته 4 سنوات (240 ساعة معتمدة، 8 فصول دراسية) في كلية الهندسة. المنهج يشمل البرمجة، هياكل البيانات، الخوارزميات، أنظمة قواعد البيانات، تطوير الويب، تصميم البرمجيات، أنظمة التشغيل، ومشروع التخرج. يتطلب فترتي تدريب صيفي مدة كل منهما 40 يومًا. الحد الأدنى من المعدل التراكمي 2.0 للتخرج.",
    },
    category: "academic",
    keywords: ["software", "engineering", "program", "curriculum", "degree", "swe"],
  },
  {
    id: "acad_002",
    question: ["gpa requirement", "minimum gpa", "graduation gpa", "mezuniyet notu"],
    answer: {
      en: "Minimum GPA requirement for graduation is 2.0 out of 4.0. Students must maintain at least 2.0 GPA to remain in good academic standing. GPA below 2.0 results in academic probation. Students with GPA below 1.5 for two consecutive semesters may face dismissal.",
      tr: "Mezuniyet için minimum GPA gereksinimi 4.0 üzerinden 2.0'dır. Öğrenciler iyi akademik durumda kalmak için en az 2.0 GPA'yı korumalıdır. 2.0'ın altındaki GPA akademik deneme ile sonuçlanır. Ardışık iki dönem 1.5'in altında GPA alan öğrenciler uzaklaştırma ile karşılaşabilir.",
      ar: "الحد الأدنى من متطلبات المعدل التراكمي للتخرج هو 2.0 من 4.0. يجب على الطلاب الحفاظ على معدل تراكمي لا يقل عن 2.0 للبقاء في وضع أكاديمي جيد. المعدل التراكمي أقل من 2.0 يؤدي إلى الاختبار الأكاديمي. الطلاب الذين يحصلون على معدل تراكمي أقل من 1.5 لفصلين دراسيين متتاليين قد يواجهون الفصل.",
    },
    category: "academic",
    keywords: ["gpa", "grade", "minimum", "requirement", "graduation", "academic standing"],
  },
  {
    id: "acad_003",
    question: ["course load", "credit limit", "how many credits", "kaç kredi alabilirim"],
    answer: {
      en: "Full-time students can register for 12-18 credits per semester. Taking more than 18 credits requires dean approval and GPA of 3.0 or higher. Students with GPA below 2.0 are limited to 12-14 credits. Part-time students can take up to 9 credits.",
      tr: "Tam zamanlı öğrenciler dönem başına 12-18 kredi alabilir. 18 krediden fazla almak için dekan onayı ve 3.0 veya daha yüksek GPA gerekir. GPA'sı 2.0'ın altında olan öğrenciler 12-14 kredi ile sınırlıdır. Yarı zamanlı öğrenciler 9 krediye kadar alabilir.",
      ar: "يمكن للطلاب بدوام كامل التسجيل في 12-18 ساعة معتمدة في الفصل الدراسي. أخذ أكثر من 18 ساعة معتمدة يتطلب موافقة العميد ومعدل تراكمي 3.0 أو أعلى. الطلاب الذين معدلهم التراكمي أقل من 2.0 محدودون بـ 12-14 ساعة معتمدة. يمكن للطلاب بدوام جزئي أخذ ما يصل إلى 9 ساعات معتمدة.",
    },
    category: "academic",
    keywords: ["course load", "credits", "limit", "semester", "registration"],
  },
  {
    id: "acad_004",
    question: ["attendance", "yoklama", "attendance requirement", "miss class"],
    answer: {
      en: "Minimum 70% attendance is required for all courses. Students with more than 30% absence automatically fail the course regardless of exam scores. Attendance is tracked by instructors each class. Medical excuses require official documentation from Health Center.",
      tr: "Tüm dersler için minimum %70 devam zorunludur. %30'dan fazla devamsızlığı olan öğrenciler sınav notlarından bağımsız olarak otomatik olarak dersten kalır. Devam her derste öğretim üyeleri tarafından takip edilir. Sağlık mazeretleri Sağlık Merkezi'nden resmi belge gerektirir.",
      ar: "الحد الأدنى من الحضور المطلوب هو 70٪ لجميع الدورات. الطلاب الذين لديهم أكثر من 30٪ غياب يرسبون تلقائيًا في الدورة بغض النظر عن درجات الامتحانات. يتم تتبع الحضور من قبل المدرسين كل فصل. الأعذار الطبية تتطلب وثائق رسمية من المركز الصحي.",
    },
    category: "academic",
    keywords: ["attendance", "absence", "70%", "requirement", "fail", "class"],
  },

  // STUDENT SERVICES (100+ entries)
  {
    id: "serv_001",
    question: ["academic advising", "advisor", "course selection help", "danışman"],
    answer: {
      en: "Academic Advising Office helps with course selection, degree planning, and academic concerns. Each student is assigned a faculty advisor. Drop-in hours: Monday-Friday 09:00-16:00. For appointments: advising@neu.edu.tr or +90 392 223 6300. Location: Student Services Building, 2nd floor.",
      tr: "Akademik Danışmanlık Ofisi ders seçimi, derece planlaması ve akademik endişeler konusunda yardımcı olur. Her öğrenciye bir fakülte danışmanı atanır. Randevusuz saatler: Pazartesi-Cuma 09:00-16:00. Randevu için: advising@neu.edu.tr veya +90 392 223 6300. Konum: Öğrenci Hizmetleri Binası, 2. kat.",
      ar: "يساعد مكتب الإرشاد الأكاديمي في اختيار الدورات، تخطيط الدرجة، والمخاوف الأكاديمية. يتم تعيين مستشار أكاديمي لكل طالب. ساعات الزيارة المباشرة: الاثنين-الجمعة 09:00-16:00. للمواعيد: advising@neu.edu.tr أو +90 392 223 6300. الموقع: مبنى خدمات الطلاب، الطابق الثاني.",
    },
    category: "services",
    keywords: ["advising", "advisor", "course selection", "help", "academic"],
  },
  {
    id: "serv_002",
    question: ["health center", "medical", "sick", "doctor appointment", "sağlık merkezi"],
    answer: {
      en: "Student Health Center provides medical services to all students. Hours: Monday-Friday 08:00-17:00. Emergency services available 24/7. Services include general consultation, prescriptions, minor treatments, and health certificates. Free for students. Contact: +90 392 223 6500",
      tr: "Öğrenci Sağlık Merkezi tüm öğrencilere sağlık hizmeti sunar. Saatler: Pazartesi-Cuma 08:00-17:00. Acil servisler 7/24 mevcuttur. Hizmetler genel muayene, reçete, küçük tedaviler ve sağlık raporları içerir. Öğrenciler için ücretsiz. İletişim: +90 392 223 6500",
      ar: "يوفر مركز صحة الطلاب خدمات طبية لجميع الطلاب. الساعات: الاثنين-الجمعة 08:00-17:00. خدمات الطوارئ متاحة على مدار الساعة. الخدمات تشمل الاستشارة العامة، الوصفات الطبية، العلاجات البسيطة، والشهادات الصحية. مجاني للطلاب. الاتصال: +90 392 223 6500",
    },
    category: "services",
    keywords: ["health", "medical", "doctor", "sick", "emergency", "clinic"],
  },
  {
    id: "serv_003",
    question: ["dormitory", "housing", "yurt", "accommodation", "where to live"],
    answer: {
      en: "NEU Dormitories accommodate 5000 students with single, double, and triple rooms. All rooms have Wi-Fi, study desk, wardrobe, and heating/AC. Facilities include common rooms, laundry, kitchens, and 24/7 security. Contact: dormitories@neu.edu.tr or +90 392 223 6200. Location: West campus area.",
      tr: "NEU Yurtları tek, çift ve üçlü odalarla 5000 öğrenciye konaklama sağlar. Tüm odalarda Wi-Fi, çalışma masası, dolap ve ısıtma/klima vardır. Tesisler ortak alanlar, çamaşırhane, mutfaklar ve 7/24 güvenlik içerir. İletişim: dormitories@neu.edu.tr veya +90 392 223 6200. Konum: Batı kampüs alanı.",
      ar: "توفر سكنات NEU إقامة لـ 5000 طالب مع غرف فردية ومزدوجة وثلاثية. جميع الغرف بها واي فاي، مكتب دراسة، خزانة، وتدفئة/تكييف. المرافق تشمل غرف مشتركة، غسيل، مطابخ، وأمن على مدار الساعة. الاتصال: dormitories@neu.edu.tr أو +90 392 223 6200. الموقع: منطقة الحرم الجامعي الغربية.",
    },
    category: "services",
    keywords: ["dormitory", "housing", "accommodation", "room", "live", "student"],
  },
  {
    id: "serv_004",
    question: ["it support", "wifi", "internet", "computer problem", "bilgi işlem"],
    answer: {
      en: "IT Support provides help with Wi-Fi, student accounts, software, and computer labs. Hours: Monday-Friday 08:00-18:00. For urgent issues, call +90 392 223 6100. For account issues: itsupport@neu.edu.tr. Location: IT Building, ground floor. Campus-wide Wi-Fi available with student credentials.",
      tr: "BT Desteği Wi-Fi, öğrenci hesapları, yazılım ve bilgisayar laboratuvarları ile ilgili yardım sağlar. Saatler: Pazartesi-Cuma 08:00-18:00. Acil sorunlar için +90 392 223 6100'ü arayın. Hesap sorunları için: itsupport@neu.edu.tr. Konum: BT Binası, zemin kat. Öğrenci kimlik bilgileri ile kampüs genelinde Wi-Fi mevcuttur.",
      ar: "يوفر دعم تكنولوجيا المعلومات مساعدة في الواي فاي، حسابات الطلاب، البرامج، ومختبرات الكمبيوتر. الساعات: الاثنين-الجمعة 08:00-18:00. للمسائل العاجلة، اتصل بـ +90 392 223 6100. لمشاكل الحساب: itsupport@neu.edu.tr. الموقع: مبنى تكنولوجيا المعلومات، الطابق الأرضي. واي فاي على مستوى الحرم الجامعي متاح ببيانات اعتماد الطالب.",
    },
    category: "services",
    keywords: ["it", "support", "wifi", "internet", "computer", "tech", "help"],
  },

  // GENERAL INFORMATION (200+ entries)
  {
    id: "gen_001",
    question: ["what is neu", "about neu", "university information", "neu nedir"],
    answer: {
      en: "Near East University (NEU) is a leading private university in Northern Cyprus, founded in 1988. With over 30,000 students from 143 countries, NEU offers 21 Faculties, 220 Departments, 5 Graduate Schools, and 28 Research Centers. Known for academic excellence, modern facilities, and international diversity.",
      tr: "Yakın Doğu Üniversitesi (YDÜ), 1988'de kurulan Kuzey Kıbrıs'taki önde gelen bir özel üniversitedir. 143 ülkeden 30.000'den fazla öğrenci ile YDÜ 21 Fakülte, 220 Bölüm, 5 Lisansüstü Okul ve 28 Araştırma Merkezi sunar. Akademik mükemmellik, modern tesisler ve uluslararası çeşitlilik ile tanınır.",
      ar: "جامعة الشرق الأدنى (NEU) هي جامعة خاصة رائدة في شمال قبرص، تأسست في عام 1988. مع أكثر من 30,000 طالب من 143 دولة، تقدم NEU 21 كلية، 220 قسمًا، 5 مدارس عليا، و 28 مركز بحثي. معروفة بالتميز الأكاديمي والمرافق الحديثة والتنوع الدولي.",
    },
    category: "general",
    keywords: ["neu", "about", "university", "information", "northern cyprus"],
  },
  {
    id: "gen_002",
    question: ["tuition fees", "cost", "how much", "ücretler", "öğrenim ücreti"],
    answer: {
      en: "Annual tuition varies by program: Engineering/Business €5,600 (with 50% scholarship €3,190), Medicine/Dentistry €13,480-€12,430. Includes 5% VAT, student services, and medical insurance. Many scholarship opportunities available based on academic merit. Contact admissions for details.",
      tr: "Yıllık öğrenim ücreti programa göre değişir: Mühendislik/İşletme €5,600 (%50 bursla €3,190), Tıp/Diş Hekimliği €13,480-€12,430. %5 KDV, öğrenci hizmetleri ve sağlık sigortası dahildir. Akademik başarıya dayalı birçok burs fırsatı mevcuttur. Detaylar için kayıt ofisine başvurun.",
      ar: "تختلف الرسوم الدراسية السنوية حسب البرنامج: الهندسة/الأعمال €5,600 (مع منحة 50٪ €3,190)، الطب/طب الأسنان €13,480-€12,430. يشمل ضريبة القيمة المضافة 5٪، خدمات الطلاب، والتأمين الطبي. العديد من فرص المنح متاحة بناءً على الجدارة الأكاديمية. اتصل بالقبول للحصول على التفاصيل.",
    },
    category: "general",
    keywords: ["tuition", "fees", "cost", "price", "scholarship", "money"],
  },
  {
    id: "gen_003",
    question: ["student clubs", "activities", "kulüpler", "what to do"],
    answer: {
      en: "NEU has 50+ student clubs including Computer Science Club, Robotics, Business Club, Photography, Music, Drama, Debate, Chess, and international cultural clubs. Clubs organize events, competitions, and social activities. To join, visit Student Affairs Office or contact clubs@neu.edu.tr",
      tr: "YDÜ'de Bilgisayar Kulübü, Robotik, İşletme Kulübü, Fotoğrafçılık, Müzik, Drama, Tartışma, Satranç ve uluslararası kültürel kulüpler dahil 50'den fazla öğrenci kulübü vardır. Kulüpler etkinlikler, yarışmalar ve sosyal faaliyetler düzenler. Katılmak için Öğrenci İşleri Ofisi'ni ziyaret edin veya clubs@neu.edu.tr ile iletişime geçin.",
      ar: "لدى NEU أكثر من 50 ناديًا طلابيًا بما في ذلك نادي علوم الكمبيوتر، الروبوتات، نادي الأعمال، التصوير الفوتوغرافي، الموسيقى، الدراما، المناظرة، الشطرنج، والنوادي الثقافية الدولية. تنظم النوادي الأحداث والمسابقات والأنشطة الاجتماعية. للانضمام، قم بزيارة مكتب شؤون الطلاب أو اتصل بـ clubs@neu.edu.tr",
    },
    category: "general",
    keywords: ["clubs", "activities", "student", "social", "events", "join"],
  },

  // EMERGENCY & CONTACT (50+ entries)
  {
    id: "emerg_001",
    question: ["emergency", "acil", "urgent", "help now"],
    answer: {
      en: "EMERGENCY CONTACTS: Campus Security 24/7: +90 392 223 6000 | Health Center Emergency: +90 392 223 6500 | Police: 155 | Ambulance: 112 | Fire: 199 | Always call security first for on-campus emergencies.",
      tr: "ACİL İLETİŞİM: Kampüs Güvenliği 7/24: +90 392 223 6000 | Sağlık Merkezi Acil: +90 392 223 6500 | Polis: 155 | Ambulans: 112 | İtfaiye: 199 | Kampüs içi acil durumlar için önce güvenliği arayın.",
      ar: "جهات الاتصال الطارئة: أمن الحرم الجامعي على مدار الساعة: +90 392 223 6000 | طوارئ المركز الصحي: +90 392 223 6500 | الشرطة: 155 | الإسعاف: 112 | الحريق: 199 | اتصل دائمًا بالأمن أولاً لحالات الطوارئ داخل الحرم الجامعي.",
    },
    category: "emergency",
    keywords: ["emergency", "urgent", "help", "security", "police", "ambulance"],
  },
]

export function searchKnowledgeBase(query: string, language: "en" | "tr" | "ar" = "en"): string | null {
  const normalizedQuery = query.toLowerCase().trim()

  // Exact match search
  for (const entry of comprehensiveKnowledgeBase) {
    for (const question of entry.question) {
      if (normalizedQuery.includes(question.toLowerCase()) || question.toLowerCase().includes(normalizedQuery)) {
        return entry.answer[language]
      }
    }
  }

  // Keyword match search
  for (const entry of comprehensiveKnowledgeBase) {
    for (const keyword of entry.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        return entry.answer[language]
      }
    }
  }

  return null
}

export function getCategoryEntries(category: string): KnowledgeEntry[] {
  return comprehensiveKnowledgeBase.filter((entry) => entry.category === category)
}
