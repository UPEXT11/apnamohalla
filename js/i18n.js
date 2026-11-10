/* ApnaMohalla — lightweight English/Hindi i18n */
(function () {
  'use strict';

  const STORE_KEY = 'apnamohalla.lang';

  const I18N = {
    en: {
      'nav.home': 'Home', 'nav.about': 'About', 'nav.features': 'Features',
      'nav.how': 'How it works', 'nav.contact': 'Contact',
      'nav.blood': 'Blood Donors', 'nav.profile': 'Profile',
      'nav.signin': 'Sign In', 'nav.signup': 'Sign Up', 'nav.logout': 'Logout',
      'nav.getstarted': 'Get Started', 'common.learnmore': 'Learn More',
      'common.back': 'Back to home',

      'fab.legal': 'Legal & Info',
      'fab.privacy': 'Privacy Policy', 'fab.terms': 'Terms of Service',
      'fab.cookies': 'Cookie Policy', 'fab.disclaimer': 'Disclaimer',
      'fab.refund': 'Refund Policy', 'fab.about': 'About Us',

      'dash.pick': 'What can your mohalla help with today?',
      'dash.tools': 'Your tools', 'dash.pickService': 'Pick a service',
      'dash.gateSignin': 'Sign in to unlock everything.',
      'dash.unlocked': 'Everything is unlocked. Choose a tool to get started.',
      'dash.signupFree': 'Sign Up Free', 'dash.login': 'Log In',
      'dash.ctaTitle': 'One step to help your mohalla.',
      'dash.ctaSub': 'Create a free account to access blood donors, lost & found, and more.',
      'dash.blood': 'Blood Donor Finder', 'dash.bloodDesc': 'Find verified donors by blood group and city.',
      'dash.lost': 'Lost & Found', 'dash.lostDesc': 'Post a lost pet or item and let the neighbourhood help.',
      'dash.services': 'Local Services', 'dash.servicesDesc': 'Plumbers, electricians, tutors, house help and more.',
      'dash.sos': 'Emergency SOS', 'dash.sosDesc': 'Every national helpline, one tap away.',
      'dash.open': 'Open', 'dash.signinToAccess': 'Sign in to access',

      'blood.title': 'Blood Donor Finder',
      'blood.sub': 'Search verified donors by blood group and city. One match can save a life.',
      'blood.bloodGroup': 'Blood group', 'blood.city': 'City',
      'blood.search': 'Search Donors',
      'blood.registerTitle': 'Become a donor',
      'blood.registerSub': 'Register yourself so you can help save a life.',
      'blood.name': 'Full name', 'blood.phone': 'WhatsApp number',
      'blood.register': 'Register as Donor',
      'blood.noResults': 'No donors found for this search. Be the first to register!',
      'blood.found': 'donors found', 'blood.contact': 'Contact',
      'blood.registered': 'You are now a registered donor. Thank you!',
      'blood.any': 'Any blood group',

      'lost.title': 'Lost & Found',
      'lost.sub': 'Post a lost pet or item, or help someone find what they lost.',
      'lost.postTitle': 'Post a lost / found item',
      'lost.what': 'What is lost or found?',
      'lost.category': 'Category', 'lost.type': 'Type',
      'lost.lost': 'Lost', 'lost.found': 'Found',
      'lost.city': 'City / area', 'lost.phone': 'WhatsApp number',
      'lost.desc': 'Short description', 'lost.post': 'Post to Mohalla',
      'lost.filter': 'Filter', 'lost.all': 'All',
      'lost.noPosts': 'No posts yet in this filter.',
      'lost.respond': 'Respond', 'lost.posted': 'Posted to your mohalla!',

      'svc.title': 'Local Services',
      'svc.sub': 'Trusted helpers from your mohalla — tap to chat on WhatsApp.',
      'svc.ask': 'Ask on WhatsApp',
      'svc.plumber': 'Plumber', 'svc.plumberDesc': 'Leaks, fittings & repairs',
      'svc.electrician': 'Electrician', 'svc.electricianDesc': 'Wiring, fans & switches',
      'svc.tutor': 'Tutor', 'svc.tutorDesc': 'School & exam coaching',
      'svc.househelp': 'House Help', 'svc.househelpDesc': 'Verified maids & cooks',
      'svc.driver': 'Driver', 'svc.driverDesc': 'Daily & outstation',
      'svc.doctor': 'Doctor', 'svc.doctorDesc': 'Book a home visit',
      'svc.petcare': 'Pet Care', 'svc.petcareDesc': 'Sitting & walking',
      'svc.laundry': 'Laundry', 'svc.laundryDesc': 'Pickup & delivery',

      'sos.title': 'Emergency SOS',
      'sos.sub': 'National helplines that work across India. Save and share with family.',
      'sos.call': 'Call now', 'sos.share': 'Share numbers on WhatsApp',
      'sos.note': 'In any emergency, always call these numbers first.',
      'sos.emergency': 'National Emergency', 'sos.ambulance': 'Ambulance',
      'sos.police': 'Police', 'sos.fire': 'Fire',
      'sos.women': 'Women Helpline', 'sos.child': 'Child Helpline',

      'profile.title': 'Your Profile',
      'profile.sub': 'Update your info and add anything about yourself.',
      'profile.personal': 'Personal details',
      'profile.phone': 'Phone', 'profile.city': 'City',
      'profile.blood': 'Your blood group', 'profile.bio': 'About you (bio)',
      'profile.sectionsTitle': 'Your sections',
      'profile.sectionsSub': 'Add any sections you like — skills, certificates, interests…',
      'profile.addSection': 'Add Section',
      'profile.sectionTitle': 'Section title', 'profile.sectionContent': 'Section content',
      'profile.save': 'Save Profile', 'profile.saved': 'Profile saved!',
      'profile.remove': 'Remove',

      'auth.welcome': 'Welcome back!', 'auth.loginSub': 'Log in to help your mohalla.',
      'auth.createTitle': 'Create your account',
      'auth.createSub': 'Join your mohalla in seconds — it\'s free.',
      'auth.email': 'Email address', 'auth.password': 'Password', 'auth.name': 'Full name',
      'auth.login': 'Log In', 'auth.signup': 'Sign Up Free',
      'auth.noAccount': 'Don\'t have an account?', 'auth.haveAccount': 'Already have an account?',
      'auth.signupLink': 'Sign up free', 'auth.loginLink': 'Log in',

      'hero.title': 'Help starts right in your <em>mohalla</em>.',
      'hero.sub': 'ApnaMohalla is India\'s hyperlocal help platform — find blood donors, reunite lost items, discover trusted local services and reach emergency help.',
      'hero.badge': 'Made for India',
    },

    hi: {
      'nav.home': 'होम', 'nav.about': 'हमारे बारे में', 'nav.features': 'सुविधाएँ',
      'nav.how': 'कैसे काम करता है', 'nav.contact': 'संपर्क',
      'nav.blood': 'रक्तदाता', 'nav.profile': 'प्रोफ़ाइल',
      'nav.signin': 'साइन इन', 'nav.signup': 'साइन अप', 'nav.logout': 'लॉग आउट',
      'nav.getstarted': 'शुरू करें', 'common.learnmore': 'और जानें',
      'common.back': 'होम पर वापस',

      'fab.legal': 'कानूनी और जानकारी',
      'fab.privacy': 'गोपनीयता नीति', 'fab.terms': 'सेवा की शर्तें',
      'fab.cookies': 'कुकी नीति', 'fab.disclaimer': 'अस्वीकरण',
      'fab.refund': 'धनवापसी नीति', 'fab.about': 'हमारे बारे में',

      'dash.pick': 'आज आपका मोहल्ला क्या मदद कर सकता है?',
      'dash.tools': 'आपके उपकरण', 'dash.pickService': 'एक सेवा चुनें',
      'dash.gateSignin': 'सब कुछ अनलॉक करने के लिए साइन इन करें।',
      'dash.unlocked': 'सब कुछ अनलॉक है। शुरू करने के लिए एक उपकरण चुनें।',
      'dash.signupFree': 'मुफ्त साइन अप', 'dash.login': 'लॉग इन',
      'dash.ctaTitle': 'अपने मोहल्ले की मदद के लिए एक कदम।',
      'dash.ctaSub': 'रक्तदाता, खोया-पाया और बहुत कुछ एक्सेस करने के लिए मुफ्त खाता बनाएं।',
      'dash.blood': 'रक्तदाता खोज', 'dash.bloodDesc': 'रक्त समूह और शहर के अनुसार सत्यापित रक्तदाता खोजें।',
      'dash.lost': 'खोया-पाया', 'dash.lostDesc': 'खोया हुआ पालतू या सामान पोस्ट करें और मोहल्ले से मदद लें।',
      'dash.services': 'स्थानीय सेवाएँ', 'dash.servicesDesc': 'प्लंबर, इलेक्ट्रीशियन, ट्यूटर, घरेलू मदद और बहुत कुछ।',
      'dash.sos': 'आपातकालीन एसओएस', 'dash.sosDesc': 'हर राष्ट्रीय हेल्पलाइन, एक टैप दूर।',
      'dash.open': 'खोलें', 'dash.signinToAccess': 'एक्सेस के लिए साइन इन करें',

      'blood.title': 'रक्तदाता खोज',
      'blood.sub': 'रक्त समूह और शहर के अनुसार सत्यापित रक्तदाता खोजें। एक मिलान जीवन बचा सकता है।',
      'blood.bloodGroup': 'रक्त समूह', 'blood.city': 'शहर',
      'blood.search': 'रक्तदाता खोजें',
      'blood.registerTitle': 'रक्तदाता बनें',
      'blood.registerSub': 'खुद को पंजीकृत करें ताकि आप जीवन बचाने में मदद कर सकें।',
      'blood.name': 'पूरा नाम', 'blood.phone': 'व्हाट्सएप नंबर',
      'blood.register': 'रक्तदाता के रूप में पंजीकरण करें',
      'blood.noResults': 'इस खोज के लिए कोई रक्तदाता नहीं मिला। सबसे पहले पंजीकरण करें!',
      'blood.found': 'रक्तदाता मिले', 'blood.contact': 'संपर्क करें',
      'blood.registered': 'आप अब पंजीकृत रक्तदाता हैं। धन्यवाद!',
      'blood.any': 'कोई भी रक्त समूह',

      'lost.title': 'खोया-पाया',
      'lost.sub': 'खोया हुआ पालतू या सामान पोस्ट करें, या किसी को उनका सामान ढूंढने में मदद करें।',
      'lost.postTitle': 'खोया / पाया सामान पोस्ट करें',
      'lost.what': 'क्या खोया या मिला है?',
      'lost.category': 'श्रेणी', 'lost.type': 'प्रकार',
      'lost.lost': 'खोया', 'lost.found': 'पाया',
      'lost.city': 'शहर / क्षेत्र', 'lost.phone': 'व्हाट्सएप नंबर',
      'lost.desc': 'संक्षिप्त विवरण', 'lost.post': 'मोहल्ले में पोस्ट करें',
      'lost.filter': 'फ़िल्टर', 'lost.all': 'सभी',
      'lost.noPosts': 'इस फ़िल्टर में अभी कोई पोस्ट नहीं है।',
      'lost.respond': 'जवाब दें', 'lost.posted': 'आपके मोहल्ले में पोस्ट हो गया!',

      'svc.title': 'स्थानीय सेवाएँ',
      'svc.sub': 'आपके मोहल्ले के भरोसेमंद मददगार — व्हाट्सएप पर चैट करने के लिए टैप करें।',
      'svc.ask': 'व्हाट्सएप पर पूछें',
      'svc.plumber': 'प्लंबर', 'svc.plumberDesc': 'लीक, फिटिंग और मरम्मत',
      'svc.electrician': 'इलेक्ट्रीशियन', 'svc.electricianDesc': 'वायरिंग, पंखे और स्विच',
      'svc.tutor': 'ट्यूटर', 'svc.tutorDesc': 'स्कूल और परीक्षा कोचिंग',
      'svc.househelp': 'घरेलू मदद', 'svc.househelpDesc': 'सत्यापित नौकरानी और रसोइया',
      'svc.driver': 'ड्राइवर', 'svc.driverDesc': 'रोज़ाना और बाहर',
      'svc.doctor': 'डॉक्टर', 'svc.doctorDesc': 'घर पर विज़िट बुक करें',
      'svc.petcare': 'पालतू देखभाल', 'svc.petcareDesc': 'देखभाल और घुमाना',
      'svc.laundry': 'लॉन्ड्री', 'svc.laundryDesc': 'पिकअप और डिलीवरी',

      'sos.title': 'आपातकालीन एसओएस',
      'sos.sub': 'भारत भर में काम करने वाले राष्ट्रीय हेल्पलाइन। सहेजें और परिवार के साथ साझा करें।',
      'sos.call': 'अभी कॉल करें', 'sos.share': 'व्हाट्सएप पर नंबर साझा करें',
      'sos.note': 'किसी भी आपातकाल में, हमेशा पहले इन नंबरों पर कॉल करें।',
      'sos.emergency': 'राष्ट्रीय आपातकाल', 'sos.ambulance': 'एम्बुलेंस',
      'sos.police': 'पुलिस', 'sos.fire': 'आग',
      'sos.women': 'महिला हेल्पलाइन', 'sos.child': 'चाइल्ड हेल्पलाइन',

      'profile.title': 'आपकी प्रोफ़ाइल',
      'profile.sub': 'अपनी जानकारी अपडेट करें और अपने बारे में कुछ भी जोड़ें।',
      'profile.personal': 'व्यक्तिगत जानकारी',
      'profile.phone': 'फ़ोन', 'profile.city': 'शहर',
      'profile.blood': 'आपका रक्त समूह', 'profile.bio': 'आपके बारे में',
      'profile.sectionsTitle': 'आपके अनुभाग',
      'profile.sectionsSub': 'अपने मनचाहे अनुभाग जोड़ें — कौशल, प्रमाणपत्र, रुचियाँ…',
      'profile.addSection': 'अनुभाग जोड़ें',
      'profile.sectionTitle': 'अनुभाग का शीर्षक', 'profile.sectionContent': 'अनुभाग की सामग्री',
      'profile.save': 'प्रोफ़ाइल सहेजें', 'profile.saved': 'प्रोफ़ाइल सहेजी गई!',
      'profile.remove': 'हटाएँ',

      'auth.welcome': 'वापसी पर स्वागत है!', 'auth.loginSub': 'अपने मोहल्ले की मदद के लिए लॉग इन करें।',
      'auth.createTitle': 'अपना खाता बनाएं',
      'auth.createSub': 'कुछ ही सेकंड में अपने मोहल्ले से जुड़ें — यह मुफ्त है।',
      'auth.email': 'ईमेल पता', 'auth.password': 'पासवर्ड', 'auth.name': 'पूरा नाम',
      'auth.login': 'लॉग इन', 'auth.signup': 'मुफ्त साइन अप',
      'auth.noAccount': 'खाता नहीं है?', 'auth.haveAccount': 'पहले से खाता है?',
      'auth.signupLink': 'मुफ्त साइन अप करें', 'auth.loginLink': 'लॉग इन',

      'hero.title': 'मदद अब आपके <em>मोहल्ले</em> से शुरू होती है।',
      'hero.sub': 'ApnaMohalla भारत का हाइपरलोकल मदद मंच है — रक्तदाता खोजें, खोया सामान पाएं, भरोसेमंद स्थानीय सेवाएँ और आपातकालीन सहायता पाएं।',
      'hero.badge': 'भारत के लिए बना',
    },
  };

  function getLang() {
    const saved = localStorage.getItem(STORE_KEY);
    return saved === 'hi' || saved === 'en' ? saved : 'en';
  }

  function t(key) {
    return (I18N[getLang()] && I18N[getLang()][key]) || I18N.en[key] || key;
  }

  function apply() {
    const lang = getLang();
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'hi') return;
    localStorage.setItem(STORE_KEY, lang);
    apply();
  }

  window.i18n = { getLang, setLang, t, apply };

  document.addEventListener('DOMContentLoaded', apply);
})();
