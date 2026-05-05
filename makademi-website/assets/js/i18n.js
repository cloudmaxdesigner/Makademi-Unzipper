(function () {
  'use strict';

  var STORAGE_KEY = 'gm_lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'tr'];

  // Translations: key = trimmed English source text, value = Turkish.
  // Only UI chrome / static copy is translated. Dynamic DB-backed course
  // titles & descriptions stay in their authored language.
  var DICT = {
    tr: {
      // --- Nav / header ---
      'Home': 'Ana Sayfa',
      'About': 'Hakkımızda',
      'Programs': 'Programlar',
      'Gallery': 'Galeri',
      'Contact': 'İletişim',
      'Inquire Now': 'Hemen Sorun',
      'Skip to main content': 'Ana içeriğe geç',
      'Toggle menu': 'Menüyü aç/kapat',

      // --- Language switcher (self-labels) ---
      'Language': 'Dil',
      'English': 'English',
      'Türkçe': 'Türkçe',

      // --- Hero (home) ---
      'Premium Industrial Training Partner': 'Birinci Sınıf Endüstriyel Eğitim Ortağı',
      'Training': 'Eğitim',
      '& Consultancy':'ve Danışmanlık',
      'Uniting industry expertise, visionary leadership, and world-class academics on a global stage':
        'Sektör uzmanlığını, vizyoner liderliği ve dünya standartlarındaki akademisyenleri küresel sahnede buluşturuyoruz',
      'Explore Programs': 'Programları Keşfet',
      'Contact Us': 'Bize Ulaşın',

      // --- Trust bar ---
      'Trusted by Industry Leaders': 'Sektör Liderlerinin Tercihi',

      // --- Stats ---
      'Trainees Trained': 'Eğitilen Katılımcı',
      'Professional Trainers': 'Profesyonel Eğitmen',
      'Entities Served': 'Hizmet Verilen Kurum',
      'Countries': 'Ülke',
      'Specialized Programs': 'Uzmanlaşmış Program',
      'Trainees': 'Katılımcı',
      'Trainers': 'Eğitmen',
      'Entities': 'Kurum',

      // --- Mission / Vision ---
      'Our Mission': 'Misyonumuz',
      'Our Vision': 'Vizyonumuz',
      'At Makademi Training & Consultancy Ltd, our mission is to be a beacon of excellence in numerous industries across the Middle East, Africa, and Asia. We are dedicated to delivering innovative and sustainable solutions that meet the energy needs of today while safeguarding the environmental integrity for future generations. Guided by a commitment to safety, integrity, and client satisfaction.':
        'Makademi Training & Consultancy Ltd olarak misyonumuz, Orta Doğu, Afrika ve Asya genelinde pek çok sektörde mükemmelliğin öncüsü olmaktır. Bugünün enerji ihtiyaçlarını karşılarken gelecek nesiller için çevresel bütünlüğü koruyan yenilikçi ve sürdürülebilir çözümler sunmaya kararlıyız. Güvenlik, dürüstlük ve müşteri memnuniyetine olan bağlılığımız bize yön verir.',
      'Our vision is to be a leading force in advancing environmentally responsible practices within the oil and gas industry. Through cutting-edge technologies, unwavering commitment to safety, and a culture of continuous innovation, we aim to be the preferred partner for clients seeking reliable, efficient, and sustainable energy solutions.':
        'Vizyonumuz, petrol ve gaz sektöründe çevreye duyarlı uygulamaların geliştirilmesinde öncü bir güç olmaktır. İleri teknolojiler, güvenlikten ödün vermeyen yaklaşımımız ve sürekli yeniliği esas alan kültürümüzle güvenilir, verimli ve sürdürülebilir enerji çözümleri arayan müşterilerin tercih ettiği iş ortağı olmayı hedefliyoruz.',
      'At Global Makademi, our mission is to be a beacon of excellence in the oil and gas industry within the Mediterranean region. We are dedicated to delivering innovative and sustainable solutions that meet the energy needs of today while safeguarding the environmental integrity for future generations. Guided by a commitment to safety, integrity, and client satisfaction.':
        'Global Makademi olarak misyonumuz, Akdeniz bölgesindeki petrol ve gaz sektöründe mükemmelliğin öncüsü olmaktır. Bugünün enerji ihtiyaçlarını karşılarken gelecek nesiller için çevresel bütünlüğü koruyan yenilikçi ve sürdürülebilir çözümler sunmaya kararlıyız. Güvenlik, dürüstlük ve müşteri memnuniyetine olan bağlılığımız bize yön verir.',

      // --- Services ---
      'What We Do': 'Ne Yapıyoruz',
      'Oil & Gas': 'Petrol ve Gaz',
      'Specialist training and competency development for professionals operating in upstream, midstream, and downstream energy environments.':
        'Yukarı, orta ve aşağı akış enerji ortamlarında çalışan profesyoneller için uzman eğitim ve yetkinlik geliştirme.',
      'AI': 'Yapay Zekâ',
      'Practical, industry-focused programmes that equip teams with the skills to harness artificial intelligence in real-world business operations.':
        'Ekiplere yapay zekâyı gerçek iş süreçlerinde kullanma becerisi kazandıran, sektöre yönelik uygulamalı programlar.',
      'Telecommunications': 'Telekomünikasyon',
      'Technical and operational training designed for the demands of modern telecoms infrastructure, networks, and service delivery.':
        'Modern telekom altyapısı, ağlar ve hizmet sunumunun gereksinimlerine yönelik teknik ve operasyonel eğitim.',
      'Leadership and Management': 'Liderlik ve Yönetim',
      'Structured development programmes that build confident leaders and effective managers across every level of an organisation.':
        'Organizasyonun her seviyesinde güvenli liderler ve etkili yöneticiler yetiştiren yapılandırılmış gelişim programları.',
      'Learn More': 'Daha Fazla',

      // --- Categories ---
      'Our Training Categories': 'Eğitim Kategorilerimiz',
      'The 10 official program families that make up our complete portfolio. Tap any category to view the courses.':
        'Portföyümüzün tamamını oluşturan 10 resmi program ailesi. Kursları görmek için herhangi bir kategoriye dokunun.',
      'Engineering & Technical': 'Mühendislik ve Teknik',
      'Maintenance & Production': 'Bakım ve Üretim',
      'Banking & Finance': 'Bankacılık ve Finans',
      'Telecom & Digital': 'Telekom ve Dijital',
      'Fire Safety & Emergency': 'Yangın Güvenliği ve Acil Durum',
      'Health, Safety & Environment': 'Sağlık, Güvenlik ve Çevre',
      'Corrosion & Integrity': 'Korozyon ve Bütünlük',
      'Management & Leadership': 'Yönetim ve Liderlik',
      'Finance & Accounting': 'Finans ve Muhasebe',
      'High-Value Programs': 'Yüksek Değerli Programlar',

      // --- Gallery section (home + page) ---
      'Our Facilities & Events': 'Tesislerimiz ve Etkinliklerimiz',
      'A glimpse into our world-class training facilities and the events that bring industry professionals together.':
        'Dünya standartlarındaki eğitim tesislerimize ve sektör profesyonellerini bir araya getiren etkinliklerimize bir bakış.',
      'Training Gallery': 'Eğitim Galerisi',
      'A look inside our programs — live-fire drills, classroom sessions, and on-site industrial training around the world.':
        'Programlarımızın içinden bir bakış — canlı yangın tatbikatları, sınıf oturumları ve dünya genelinde sahada endüstriyel eğitim.',
      'Gallery is being updated. Please check back soon.': 'Galeri güncelleniyor. Lütfen kısa süre sonra tekrar kontrol edin.',
      'Want to see one of our programs in person?': 'Programlarımızdan birini yerinde görmek ister misiniz?',
      'We host on-site visits and tailor corporate programs at facilities across Türkiye, Libya, and the wider region.':
        'Türkiye, Libya ve çevre bölgedeki tesislerde saha ziyaretleri düzenliyor ve kurumlara özel programlar hazırlıyoruz.',
      'Get in Touch': 'Bize Ulaşın',

      // --- Featured ---
      'Featured Programs': 'Öne Çıkan Programlar',
      'High-impact professional training courses selected for current industry demands.':
        'Güncel sektör ihtiyaçları için seçilmiş, yüksek etkili profesyonel eğitim kursları.',
      'View All 100+ Programs': 'Tüm 100+ Programı Görüntüle',
      '2 Weeks': '2 Hafta',
      '1 Week': '1 Hafta',
      '10 Days': '10 Gün',
      'View Details': 'Detayları Görüntüle',

      // --- CTA ---
      'Ready to Elevate Your Team?': 'Ekibinizi Bir Üst Seviyeye Taşımaya Hazır mısınız?',
      'Get in touch with our training consultants to develop a customized program for your organization.':
        'Kurumunuza özel bir program geliştirmek için eğitim danışmanlarımızla iletişime geçin.',

      // --- Footer ---
      'Quick Links': 'Hızlı Bağlantılar',
      'Program Categories': 'Program Kategorileri',
      'Partners': 'Ortaklar',
      'Excellence in Industrial Makademi Training & Consultancy Ltd serving the Mediterranean region and beyond.':
        'Akdeniz bölgesi ve ötesinde hizmet veren Endüstriyel Makademi Training & Consultancy Ltd ile mükemmellik.',
      '© 2026 Makademi Training & Consultancy Ltd. All rights reserved.':
        '© 2026 Makademi Training & Consultancy Ltd. Tüm hakları saklıdır.',

      // --- About page ---
      'About Global Makademi': 'Global Makademi Hakkında',
      'Excellence in Industrial Makademi Training & Consultancy Ltd for the modern energy sector.':
        'Modern enerji sektörü için Endüstriyel Makademi Training & Consultancy Ltd ile mükemmellik.',
      'Global Accreditations': 'Küresel Akreditasyonlar',
      'JOIFF Accredited': 'JOIFF Akreditasyonu',
      'Internationally recognized industrial firefighting and emergency response training provider.':
        'Uluslararası alanda tanınan endüstriyel yangın söndürme ve acil müdahale eğitimi sağlayıcısı.',
      'ISO Standard Compliant': 'ISO Standartlarına Uygun',
      'Operating under strict international quality and educational standards.':
        'Sıkı uluslararası kalite ve eğitim standartlarına uygun olarak faaliyet gösteriyoruz.',
      'Ontario Tech × Brilliant Catalyst': 'Ontario Tech × Brilliant Catalyst',
      'Partnered with Ontario Tech University and Brilliant Catalyst to deliver world-class academic programs.':
        'Dünya standartlarında akademik programlar sunmak için Ontario Tech University ve Brilliant Catalyst ile iş birliği.',
      'Our Clients': 'Müşterilerimiz',
      'Global Makademi proudly serves leading national oil companies and energy enterprises across Libya and the wider Mediterranean region.':
        'Global Makademi, Libya ve geniş Akdeniz bölgesindeki önde gelen ulusal petrol şirketleri ile enerji kuruluşlarına gururla hizmet veriyor.',
      'Strategic Partners': 'Stratejik Ortaklar',
      'Academic & Industry Partners': 'Akademik ve Sektörel Ortaklar',
      'Collaborating with world-class universities and accreditation bodies to deliver internationally recognized training.':
        'Uluslararası alanda tanınan eğitim sunmak için dünya çapında üniversiteler ve akreditasyon kuruluşlarıyla iş birliği yapıyoruz.',

      // --- Contact page ---
      'Get in Touch': 'Bize Ulaşın',
      'Contact our training consultants to request a customized program, inquire about schedules, or discuss corporate partnerships.':
        'Kurumunuza özel bir program talep etmek, takvim bilgisi almak veya kurumsal iş birliklerini görüşmek için eğitim danışmanlarımızla iletişime geçin.',
      'Contact Information': 'İletişim Bilgileri',
      'Email': 'E-posta',
      'Headquarters': 'Genel Merkez',
      'Beyoğlu, İstanbul, Türkiye': 'Beyoğlu, İstanbul, Türkiye',
      'Postal Code: 34435': 'Posta Kodu: 34435',
      'Global delivery — on-site available worldwide': 'Küresel hizmet — dünya genelinde sahada eğitim',
      'Phone': 'Telefon',
      'Office (Tel)': 'Ofis (Tel)',
      'Company landline': 'Şirket sabit hattı',
      'Fax': 'Faks',
      'Operating Regions': 'Faaliyet Bölgeleri',
      'Türkiye · Libya · UAE': 'Türkiye · Libya · BAE',
      'Middle East & North Africa': 'Orta Doğu ve Kuzey Afrika',
      'Corporate Training Requests': 'Kurumsal Eğitim Talepleri',
      'Need training delivered at your facility? Our global team deploys worldwide.':
        'Eğitimin tesisinizde verilmesini ister misiniz? Küresel ekibimiz dünyanın her yerine gidiyor.',
      'Request Proposal': 'Teklif İsteyin',
      'Send us a Message': 'Bize Mesaj Gönderin',
      'Full Name *': 'Ad Soyad *',
      'Company / Organization *': 'Şirket / Kurum *',
      'Business Email *': 'Kurumsal E-posta *',
      'Phone Number': 'Telefon Numarası',
      'Industry': 'Sektör',
      'Energy': 'Enerji',
      'Automotive': 'Otomotiv',
      'HSE / Safety': 'İSG / Güvenlik',
      'Government': 'Kamu',
      'Other': 'Diğer',
      'Subject': 'Konu',
      'Message *': 'Mesaj *',
      'Please provide details about your training requirements...': 'Lütfen eğitim ihtiyaçlarınızla ilgili detayları paylaşın...',
      'Submit Inquiry': 'Talebi Gönder',
      'Sending...': 'Gönderiliyor...',
      'Inquiry Sent Successfully': 'Talebiniz Başarıyla Gönderildi',
      'Thank you for contacting Global Makademi. One of our training consultants will respond within 24 hours.':
        'Global Makademi ile iletişime geçtiğiniz için teşekkür ederiz. Eğitim danışmanlarımızdan biri 24 saat içinde size dönüş yapacaktır.',
      'Send Another Message': 'Yeni Bir Mesaj Gönder',
      'Something went wrong. Please try again or email us directly at info@globalmakademi.com':
        'Bir hata oluştu. Lütfen tekrar deneyin ya da info@globalmakademi.com adresine doğrudan e-posta gönderin.',
      'Network error. Please try again or email us directly at info@globalmakademi.com':
        'Ağ hatası. Lütfen tekrar deneyin ya da info@globalmakademi.com adresine doğrudan e-posta gönderin.',

      // --- Programs (courses.php) ---
      'Training Programs': 'Eğitim Programları',
      'Categories': 'Kategoriler',
      'All': 'Tümü',
      'No programs found': 'Program bulunamadı',
      'Try adjusting your search terms or selecting a different category.':
        'Arama terimlerinizi değiştirmeyi veya farklı bir kategori seçmeyi deneyin.',
      'Clear Filters': 'Filtreleri Temizle',
      'Search programs by title or keyword...': 'Programları başlık ya da anahtar kelimeye göre arayın...',

      // Page header dynamic prefixes (handled by string-template logic below):
      // "Showing X of Y programs", "Explore our comprehensive catalog of N+ ..."
    }
  };

  // Attribute keys we translate when matched.
  var ATTR_KEYS = ['placeholder', 'title', 'aria-label', 'alt'];

  function getLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;
    applyTranslations(lang);
    updateSwitcherUI(lang);
  }

  // Translate the textContent of a single text node.
  function translateTextNode(node, dict) {
    var orig = node.nodeValue;
    if (!orig) return;
    var trimmed = orig.replace(/\s+/g, ' ').trim();
    if (!trimmed) return;

    // Cache the original English exactly once so we can restore on switch back.
    if (!node.__gmOrig) node.__gmOrig = orig;

    if (dict[trimmed]) {
      // Preserve leading/trailing whitespace so layout doesn't shift.
      var leading = orig.match(/^\s*/)[0];
      var trailing = orig.match(/\s*$/)[0];
      node.nodeValue = leading + dict[trimmed] + trailing;
      return;
    }

    // Dynamic phrase: "Showing X of Y programs"
    var m = trimmed.match(/^Showing\s+(\d+)\s+of\s+(\d+)\s+programs$/);
    if (m) {
      node.nodeValue = orig.replace(trimmed,
        m[1] + ' / ' + m[2] + ' program gösteriliyor');
      return;
    }

    // "Explore our comprehensive catalog of N+ specialized industrial training courses designed for professionals."
    m = trimmed.match(/^Explore our comprehensive catalog of (\d+)\+ specialized industrial training courses designed for professionals\.?$/);
    if (m) {
      node.nodeValue = orig.replace(trimmed,
        'Profesyoneller için tasarlanmış ' + m[1] + '+ uzman endüstriyel eğitim kursundan oluşan kapsamlı kataloğumuzu keşfedin.');
      return;
    }
  }

  function restoreTextNode(node) {
    if (node.__gmOrig != null && node.nodeValue !== node.__gmOrig) {
      node.nodeValue = node.__gmOrig;
    }
  }

  function walkText(root, fn) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('[data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) fn(n);
  }

  function translateAttributes(dict) {
    ATTR_KEYS.forEach(function (attr) {
      var els = document.querySelectorAll('[' + attr + ']');
      els.forEach(function (el) {
        if (el.closest && el.closest('[data-i18n-skip]')) return;
        var origMap = el.__gmAttrOrig || (el.__gmAttrOrig = {});
        if (origMap[attr] == null) origMap[attr] = el.getAttribute(attr);
        var src = origMap[attr];
        if (src && dict[src.trim()]) {
          el.setAttribute(attr, dict[src.trim()]);
        } else if (src != null) {
          el.setAttribute(attr, src);
        }
      });
    });

    // <option> values + <input value> for visible buttons
    document.querySelectorAll('option').forEach(function (opt) {
      if (opt.__gmOrigText == null) opt.__gmOrigText = opt.textContent;
      var t = opt.__gmOrigText.trim();
      opt.textContent = dict[t] || opt.__gmOrigText;
    });
  }

  function applyTranslations(lang) {
    var dict = DICT[lang] || {};
    if (lang === DEFAULT_LANG || !DICT[lang]) {
      // Restore originals
      walkText(document.body, restoreTextNode);
      // Restore attributes
      ATTR_KEYS.forEach(function (attr) {
        document.querySelectorAll('[' + attr + ']').forEach(function (el) {
          if (el.__gmAttrOrig && el.__gmAttrOrig[attr] != null) {
            el.setAttribute(attr, el.__gmAttrOrig[attr]);
          }
        });
      });
      document.querySelectorAll('option').forEach(function (opt) {
        if (opt.__gmOrigText != null) opt.textContent = opt.__gmOrigText;
      });
      return;
    }
    walkText(document.body, function (n) { translateTextNode(n, dict); });
    translateAttributes(dict);
  }

  // ---- Language switcher UI ----

  function makeSwitcher() {
    var wrap = document.createElement('div');
    wrap.className = 'lang-switcher';
    wrap.setAttribute('data-i18n-skip', '');
    wrap.innerHTML =
      '<button type="button" class="lang-btn" data-lang="en" aria-label="English">EN</button>' +
      '<span class="lang-sep" aria-hidden="true">/</span>' +
      '<button type="button" class="lang-btn" data-lang="tr" aria-label="Türkçe">TR</button>';
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang-btn');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang');
      if (SUPPORTED.indexOf(lang) === -1) return;
      setLang(lang);
    });
    return wrap;
  }

  function updateSwitcherUI(lang) {
    document.querySelectorAll('.lang-switcher .lang-btn').forEach(function (b) {
      if (b.getAttribute('data-lang') === lang) b.classList.add('active');
      else b.classList.remove('active');
    });
  }

  function injectStyles() {
    if (document.getElementById('gm-i18n-styles')) return;
    var s = document.createElement('style');
    s.id = 'gm-i18n-styles';
    s.textContent = [
      '.lang-switcher{display:inline-flex;align-items:center;gap:0.25rem;margin-right:0.75rem;font-size:0.8125rem;font-weight:600;color:var(--slate-600,#475569);}',
      '.lang-switcher .lang-btn{background:transparent;border:0;padding:0.25rem 0.4rem;cursor:pointer;color:inherit;font:inherit;letter-spacing:0.04em;border-radius:0.25rem;transition:color .15s,background .15s;}',
      '.lang-switcher .lang-btn:hover{color:var(--navy,#0f172a);}',
      '.lang-switcher .lang-btn.active{color:var(--navy,#0f172a);background:var(--gold,#d4af37);}',
      '.lang-switcher .lang-sep{color:var(--slate-400,#94a3b8);}',
      '.mobile-nav .lang-switcher{margin:0.75rem 1rem;justify-content:center;font-size:1rem;}',
      '@media (max-width: 900px){.desktop-nav .lang-switcher{display:none;}}'
    ].join('');
    document.head.appendChild(s);
  }

  function injectSwitcher() {
    // Desktop: prepend before "Inquire Now" button in .desktop-nav
    var desktop = document.querySelector('.desktop-nav');
    if (desktop && !desktop.querySelector('.lang-switcher')) {
      var sw = makeSwitcher();
      var inquire = desktop.querySelector('.btn');
      if (inquire) desktop.insertBefore(sw, inquire);
      else desktop.appendChild(sw);
    }
    // Mobile: append before mobile-cta
    var mobile = document.getElementById('mobile-nav');
    if (mobile && !mobile.querySelector('.lang-switcher')) {
      var sw2 = makeSwitcher();
      var cta = mobile.querySelector('.mobile-cta');
      if (cta) mobile.insertBefore(sw2, cta);
      else mobile.appendChild(sw2);
    }
  }

  function init() {
    injectStyles();
    injectSwitcher();
    var lang = getLang();
    document.documentElement.lang = lang;
    applyTranslations(lang);
    updateSwitcherUI(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
