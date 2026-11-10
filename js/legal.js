/* ApnaMohalla — bilingual legal pages (rendered by ?page=...) */
(function () {
  'use strict';

  const CONTENT = {
    en: {
      privacy: {
        title: 'Privacy Policy',
        updated: 'Last updated: 2026',
        body: [
          { h: 'What we collect', p: 'We store the information you provide: your name, email, phone number, city, blood group, bio, and any custom sections you add to your profile.' },
          { h: 'How we use it', p: 'We use this data only to run the service — to match blood donors, display your profile, and let neighbours contact you.' },
          { h: 'Storage & sharing', p: 'Your data is stored in a local database on this server. We do not sell your data or share it with third parties.' },
          { h: 'Your rights', p: 'You can update your information anytime from your profile, or contact us to have your account and data removed.' },
          { h: 'Contact', p: 'For privacy questions, email hello@apnamohalla.in.' },
        ],
      },
      terms: {
        title: 'Terms of Service',
        updated: 'Last updated: 2026',
        body: [
          { h: 'Acceptance', p: 'By using ApnaMohalla you agree to these terms. If you do not agree, please do not use the service.' },
          { h: 'Use of the service', p: 'You agree to provide accurate information and not to post anything harmful, illegal, or misleading.' },
          { h: 'Blood donor information', p: 'Donor listings are user-submitted. We do not guarantee donor availability, accuracy, or medical suitability — always verify independently.' },
          { h: 'Liability', p: 'The service is provided "as is" without warranties of any kind. We are not liable for any loss or harm arising from its use.' },
          { h: 'Changes', p: 'We may update these terms from time to time. Continued use means you accept the updated terms.' },
        ],
      },
      cookies: {
        title: 'Cookie Policy',
        updated: 'Last updated: 2026',
        body: [
          { h: 'What are cookies', p: 'Cookies (and similar storage like localStorage) are small pieces of data stored in your browser.' },
          { h: 'How we use them', p: 'We use browser storage to remember your language preference and keep you logged in during your session.' },
          { h: 'Managing them', p: 'You can clear your browser storage at any time from your browser settings. This will log you out.' },
        ],
      },
      disclaimer: {
        title: 'Disclaimer',
        updated: 'Last updated: 2026',
        body: [
          { h: 'No medical advice', p: 'ApnaMohalla is not a medical service and is not a substitute for professional medical help.' },
          { h: 'No guarantee', p: 'All listings are user-submitted. We do not verify or guarantee the accuracy of any donor or service information.' },
          { h: 'In an emergency', p: 'Always call official helplines first — 108 (ambulance) or 112 (national emergency).' },
        ],
      },
      refund: {
        title: 'Refund Policy',
        updated: 'Last updated: 2026',
        body: [
          { h: 'Free service', p: 'ApnaMohalla is currently a free service, so no payments or refunds apply.' },
          { h: 'Future paid services', p: 'If we introduce paid features in the future, a separate refund policy will be published here.' },
        ],
      },
      about: {
        title: 'About Us',
        updated: 'Made in India 🇮🇳',
        body: [
          { h: 'Our mission', p: 'ApnaMohalla makes help hyperlocal in India — connecting neighbours who can help with neighbours who need it.' },
          { h: 'What we do', p: 'We help you find blood donors, reunite lost items, discover trusted local services, and reach emergency help — all in one place.' },
          { h: 'Why "mohalla"', p: 'Because real help has always started with the people next door. We just make it easier to reach them.' },
        ],
      },
    },

    hi: {
      privacy: {
        title: 'गोपनीयता नीति',
        updated: 'अंतिम अपडेट: 2026',
        body: [
          { h: 'हम क्या एकत्र करते हैं', p: 'हम आपकी दी गई जानकारी संग्रहीत करते हैं: आपका नाम, ईमेल, फ़ोन नंबर, शहर, रक्त समूह, बायो और आपके द्वारा जोड़े गए अनुभाग।' },
          { h: 'हम इसका उपयोग कैसे करते हैं', p: 'हम इस डेटा का उपयोग केवल सेवा चलाने के लिए करते हैं — रक्तदाता मिलाने, आपकी प्रोफ़ाइल दिखाने और पड़ोसियों को आपसे संपर्क करने देने के लिए।' },
          { h: 'भंडारण और साझाकरण', p: 'आपका डेटा इस सर्वर के स्थानीय डेटाबेस में संग्रहीत है। हम आपका डेटा नहीं बेचते या तीसरे पक्षों से साझा नहीं करते।' },
          { h: 'आपके अधिकार', p: 'आप कभी भी अपनी प्रोफ़ाइल से जानकारी अपडेट कर सकते हैं, या खाता और डेटा हटाने के लिए हमसे संपर्क कर सकते हैं।' },
          { h: 'संपर्क', p: 'गोपनीयता प्रश्नों के लिए hello@apnamohalla.in पर ईमेल करें।' },
        ],
      },
      terms: {
        title: 'सेवा की शर्तें',
        updated: 'अंतिम अपडेट: 2026',
        body: [
          { h: 'स्वीकृति', p: 'ApnaMohalla का उपयोग करके आप इन शर्तों से सहमत होते हैं। यदि सहमत नहीं हैं, तो कृपया सेवा का उपयोग न करें।' },
          { h: 'सेवा का उपयोग', p: 'आप सही जानकारी देने और कोई हानिकारक, अवैध या भ्रामक सामग्री पोस्ट न करने के लिए सहमत हैं।' },
          { h: 'रक्तदाता जानकारी', p: 'रक्तदाता सूचियाँ उपयोगकर्ताओं द्वारा दी जाती हैं। हम उपलब्धता, सटीकता या चिकित्सा उपयुक्तता की गारंटी नहीं देते — कृपया स्वयं सत्यापित करें।' },
          { h: 'दायित्व', p: 'सेवा "जैसी है" आधार पर दी गई है। इसके उपयोग से होने वाले किसी नुकसान के लिए हम उत्तरदायी नहीं हैं।' },
          { h: 'परिवर्तन', p: 'हम समय-समय पर इन शर्तों को अपडेट कर सकते हैं। निरंतर उपयोग का अर्थ है अद्यतन शर्तों की स्वीकृति।' },
        ],
      },
      cookies: {
        title: 'कुकी नीति',
        updated: 'अंतिम अपडेट: 2026',
        body: [
          { h: 'कुकी क्या हैं', p: 'कुकी (और localStorage जैसा भंडारण) आपके ब्राउज़र में संग्रहीत छोटे डेटा होते हैं।' },
          { h: 'हम उनका उपयोग कैसे करते हैं', p: 'हम आपकी भाषा प्राथमिकता याद रखने और सत्र के दौरान आपको लॉग इन रखने के लिए ब्राउज़र स्टोरेज का उपयोग करते हैं।' },
          { h: 'उन्हें प्रबंधित करना', p: 'आप कभी भी ब्राउज़र सेटिंग्स से ब्राउज़र स्टोरेज साफ़ कर सकते हैं। इससे आप लॉग आउट हो जाएँगे।' },
        ],
      },
      disclaimer: {
        title: 'अस्वीकरण',
        updated: 'अंतिम अपडेट: 2026',
        body: [
          { h: 'कोई चिकित्सा सलाह नहीं', p: 'ApnaMohalla चिकित्सा सेवा नहीं है और पेशेवर चिकित्सा सहायता का विकल्प नहीं है।' },
          { h: 'कोई गारंटी नहीं', p: 'सभी सूचियाँ उपयोगकर्ताओं द्वारा दी जाती हैं। हम किसी रक्तदाता या सेवा जानकारी की सटीकता की पुष्टि या गारंटी नहीं करते।' },
          { h: 'आपातकाल में', p: 'हमेशा पहले आधिकारिक हेल्पलाइन कॉल करें — 108 (एम्बुलेंस) या 112 (राष्ट्रीय आपातकाल)।' },
        ],
      },
      refund: {
        title: 'धनवापसी नीति',
        updated: 'अंतिम अपडेट: 2026',
        body: [
          { h: 'मुफ्त सेवा', p: 'ApnaMohalla वर्तमान में मुफ्त सेवा है, इसलिए कोई भुगतान या धनवापसी लागू नहीं होती।' },
          { h: 'भविष्य की सशुल्क सेवाएँ', p: 'यदि भविष्य में सशुल्क सुविधाएँ जोड़ी जाती हैं, तो अलग धनवापसी नीति यहाँ प्रकाशित की जाएगी।' },
        ],
      },
      about: {
        title: 'हमारे बारे में',
        updated: 'भारत में निर्मित 🇮🇳',
        body: [
          { h: 'हमारा मिशन', p: 'ApnaMohalla भारत में मदद को हाइपरलोकल बनाता है — मदद कर सकने वाले पड़ोसियों को ज़रूरतमंद पड़ोसियों से जोड़ता है।' },
          { h: 'हम क्या करते हैं', p: 'हम रक्तदाता खोजने, खोया सामान पाने, भरोसेमंद स्थानीय सेवाएँ और आपातकालीन सहायता — सब एक जगह पाने में मदद करते हैं।' },
          { h: '"मोहल्ला" क्यों', p: 'क्योंकि असली मदद हमेशा बगल वाले लोगों से शुरू हुई है। हम बस उन तक पहुँचना आसान बनाते हैं।' },
        ],
      },
    },
  };

  function render() {
    const params = new URLSearchParams(window.location.search);
    let page = params.get('page') || 'privacy';
    const lang = window.i18n.getLang();
    const doc = (CONTENT[lang] && CONTENT[lang][page]) || CONTENT.en[page] || CONTENT.en.privacy;

    document.getElementById('legalTitle').textContent = doc.title;
    document.getElementById('legalUpdated').textContent = doc.updated;

    const body = document.getElementById('legalBody');
    body.innerHTML = '';
    doc.body.forEach((s) => {
      if (s.h) {
        const h = document.createElement('h2');
        h.textContent = s.h;
        body.appendChild(h);
      }
      if (s.p) {
        const p = document.createElement('p');
        p.textContent = s.p;
        body.appendChild(p);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    render();
    document.addEventListener('langchange', render);
  });
})();
