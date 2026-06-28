export interface TranslationSet {
  brandName: string;
  brandSub: string;
  languageLabel: string;
  
  // Header / Navigation
  navHome: string;
  navBrowse: string;
  navFavorites: string;
  navAdmin: string;
  navLogin: string;
  navRegister: string;
  navLogout: string;

  // Hero Section
  heroTitle: string;
  heroSub: string;
  ctaBrowse: string;
  ctaRegister: string;
  ctaLogin: string;

  // Stats Counters
  statsActiveMembers: string;
  statsTotalViews: string;
  statsPremiumVideos: string;

  // About Section
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutFeature1Title: string;
  aboutFeature1Desc: string;
  aboutFeature2Title: string;
  aboutFeature2Desc: string;
  aboutFeature3Title: string;
  aboutFeature3Desc: string;

  // Footer
  footerCopyright: string;
  footerAboutBrand: string;
  footerContactUs: string;

  // Auth Layouts
  authRegisterTitle: string;
  authRegisterSub: string;
  authLoginTitle: string;
  authLoginSub: string;
  authNameLabel: string;
  authPhoneLabel: string;
  authPasswordLabel: string;
  authBtnLogin: string;
  authBtnRegister: string;
  authNoAccount: string;
  authHasAccount: string;

  // Status screens
  statusPendingTitle: string;
  statusPendingDesc: string;
  statusRejectedTitle: string;
  statusRejectedDesc: string;
  statusNoSubscriptionTitle: string;
  statusNoSubscriptionDesc: string;

  // Browse View
  browseHeaderTitle: string;
  browseRemainingDays: string;
  browseRemainingDaysCustom: string;
  browseNoDays: string;
  browseSearchPlaceholder: string;
  browseAllCategories: string;
  browseNoVideosFound: string;
  browseAddedToFavs: string;
  browseRemovedFromFavs: string;
  browseTrainerLabel: string;
  browseDurationLabel: string;

  // Favorites View
  favsTitle: string;
  favsSub: string;
  favsEmpty: string;
}

export const translations: Record<"en" | "ar", TranslationSet> = {
  en: {
    brandName: "PT Fit Video",
    brandSub: "Fit Rep Platform",
    languageLabel: "العربية",

    navHome: "Home",
    navBrowse: "Browse Videos",
    navFavorites: "Favorites",
    navAdmin: "Admin Panel",
    navLogin: "Login",
    navRegister: "Sign Up",
    navLogout: "Logout",

    heroTitle: "Elevate Your Physical Training At Home",
    heroSub: "Fit Rep brings professional, easy-to-follow workouts right to your screen. Select your program, stream premium tutorials, and unlock real physical progress.",
    ctaBrowse: "Go to Video Library",
    ctaRegister: "Join Fit Rep Today",
    ctaLogin: "Access My Account",

    statsActiveMembers: "Active Members",
    statsTotalViews: "Total Video Streams",
    statsPremiumVideos: "Premium Videos",

    aboutTitle: "About PT Fit Video",
    aboutText1: "PT Fit Video (branded as Fit Rep) is a state-of-the-art physical training and coaching video subscription library. Our platform is engineered to give you the exact training programs, form correction pointers, and physical conditioning steps you need.",
    aboutText2: "With direct video feedback, easy category filters, and customized professional coaching templates, we bridge the gap between expensive personal trainers and your home gym setup.",
    aboutFeature1Title: "Professional Instructors",
    aboutFeature1Desc: "Instruction designed by certified elite PT trainers focusing on precise body mechanics, proper form, and injury prevention.",
    aboutFeature2Title: "HD Streaming Engine",
    aboutFeature2Desc: "Instant buffer-free workout videos, supportive of YouTube, Vimeo, and direct MP4 playbacks.",
    aboutFeature3Title: "Tailored Subscription Plans",
    aboutFeature3Desc: "Sign up and let our admins activate your plan (Basic 1 Mo, Premium 3 Mo, Elite 1 Yr, or customized dates) with complete precision.",

    footerCopyright: "All Rights Reserved. PT Fit Video / Fit Rep.",
    footerAboutBrand: "Fit Rep is a premium subscriber-only physical training video platform.",
    footerContactUs: "Contact Support on WhatsApp, Facebook, or Instagram.",

    authRegisterTitle: "Create Your Account",
    authRegisterSub: "Register now and request an active training plan from the administration",
    authLoginTitle: "Welcome Back",
    authLoginSub: "Log in with your phone number and password to access the subscription portal",
    authNameLabel: "Full Name",
    authPhoneLabel: "Phone Number",
    authPasswordLabel: "Password",
    authBtnLogin: "Log In",
    authBtnRegister: "Register Account",
    authNoAccount: "Don't have an account yet? Sign Up",
    authHasAccount: "Already registered? Log In here",

    statusPendingTitle: "Account Under Review",
    statusPendingDesc: "Welcome to PT Fit Video! Your account registration is currently pending. Please contact our administration team or wait for approval to activate your subscription plan.",
    statusRejectedTitle: "Account Denied",
    statusRejectedDesc: "Your account request has been rejected or suspended. Please get in touch with our team for more information or subscription assistance.",
    statusNoSubscriptionTitle: "No Active Subscription Plan",
    statusNoSubscriptionDesc: "Your registration has been approved, but you do not have an active subscription plan right now or your plan has expired. Please contact the administrator to activate a Basic, Premium, Elite, or Custom plan.",

    browseHeaderTitle: "Exclusive Training Library",
    browseRemainingDays: "Remaining subscription: {days} days",
    browseRemainingDaysCustom: "Subscribed until: {date} ({days} days left)",
    browseNoDays: "Subscription Expired",
    browseSearchPlaceholder: "Search workouts, exercises or muscles...",
    browseAllCategories: "All Categories",
    browseNoVideosFound: "No workout videos found matching your criteria.",
    browseAddedToFavs: "Added to your favorites list",
    browseRemovedFromFavs: "Removed from your favorites list",
    browseTrainerLabel: "Coach",
    browseDurationLabel: "mins",

    favsTitle: "Your Favorite Workouts",
    favsSub: "Keep your top-rated coaching videos readily accessible for your next gym session",
    favsEmpty: "No favorite videos saved yet. Click the heart icon on any video in the browser to save it here!"
  },
  ar: {
    brandName: "بي تي فت فيديو",
    brandSub: "منصة فت ريب",
    languageLabel: "English",

    navHome: "الرئيسية",
    navBrowse: "تصفح الفيديوهات",
    navFavorites: "المفضلة",
    navAdmin: "لوحة الإدارة",
    navLogin: "تسجيل الدخول",
    navRegister: "إنشاء حساب",
    navLogout: "تسجيل الخروج",

    heroTitle: "ارتقِ بتدريبك البدني من المنزل",
    heroSub: "منصة فت ريب تقدم لك تمارين احترافية وسهلة المتابعة مباشرة على شاشتك. اختر برنامجك البدني، شاهد الشروحات المتميزة، وحقق تقدماً ملموساً.",
    ctaBrowse: "الذهاب إلى مكتبة الفيديوهات",
    ctaRegister: "انضم إلى فت ريب اليوم",
    ctaLogin: "الدخول إلى حسابي",

    statsActiveMembers: "الأعضاء النشطين",
    statsTotalViews: "إجمالي المشاهدات",
    statsPremiumVideos: "الفيديوهات المميزة",

    aboutTitle: "حول منصة بي تي فت فيديو (فت ريب)",
    aboutText1: "منصة بي تي فت فيديو (المعروفة تجارياً بـ فت ريب) هي مكتبة اشتراك فيديو متطورة للتدريب البدني والتوجيه الرياضي. تم تصميم منصتنا لتوفر لك برامج التدريب الدقيقة، إرشادات تصحيح الأداء، وخطوات التهيئة البدنية المتكاملة.",
    aboutText2: "من خلال الفيديوهات المباشرة، فلاتر التصنيف السهلة، ونماذج التدريب الاحترافية المخصصة، نسد الفجوة بين المدربين الشخصيين المكلفين وبين صالة الألعاب الرياضية المنزلية الخاصة بك.",
    aboutFeature1Title: "مدربون محترفون",
    aboutFeature1Desc: "تم تصميم التمارين من قبل نخبة من المدربين المعتمدين مع التركيز على ميكانيكا الجسم السليمة وتجنب الإصابات.",
    aboutFeature2Title: "محرك بث عالي الدقة",
    aboutFeature2Desc: "بث فوري لتمارينك دون تقطيع، يدعم روابط يوتيوب، فيميو، وروابط MP4 المباشرة.",
    aboutFeature3Title: "باقات اشتراك مخصصة",
    aboutFeature3Desc: "قم بالتسجيل وسيقوم مسؤولو النظام بتفعيل باقتك (أساسية شهر، مميزة ٣ أشهر، النخبة سنة، أو تواريخ مخصصة) بدقة متناهية.",

    footerCopyright: "جميع الحقوق محفوظة. بي تي فت فيديو / فت ريب.",
    footerAboutBrand: "فت ريب هي منصة متميزة لمشاهدة فيديوهات التدريب البدني مخصصة للمشتركين فقط.",
    footerContactUs: "تواصل مع الدعم عبر واتساب، فيسبوك، أو إنستغرام.",

    authRegisterTitle: "إنشاء حساب جديد",
    authRegisterSub: "سجل الآن لطلب تفعيل باقة تدريبية من قبل الإدارة بعد المراجعة",
    authLoginTitle: "مرحباً بعودتك",
    authLoginSub: "سجل الدخول باستخدام رقم هاتفك وكلمة المرور للوصول إلى بوابة المشتركين",
    authNameLabel: "الاسم الكامل",
    authPhoneLabel: "رقم الهاتف",
    authPasswordLabel: "كلمة المرور",
    authBtnLogin: "تسجيل الدخول",
    authBtnRegister: "إنشاء الحساب",
    authNoAccount: "ليس لديك حساب بعد؟ سجل معنا هنا",
    authHasAccount: "لديك حساب بالفعل؟ سجل الدخول هنا",

    statusPendingTitle: "الحساب قيد المراجعة والتدقيق",
    statusPendingDesc: "أهلاً بك في بي تي فت فيديو! طلب تسجيل حسابك قيد المراجعة حالياً من قبل الإدارة. يرجى التواصل مع فريق الإدارة أو الانتظار لتفعيل باقة اشتراكك.",
    statusRejectedTitle: "تم رفض الحساب",
    statusRejectedDesc: "عذراً، تم رفض طلب حسابك أو تعليقه. يرجى التواصل مع فريق الإدارة للحصول على مزيد من التفاصيل والمساعدة البدنية.",
    statusNoSubscriptionTitle: "لا يوجد باقة اشتراك نشطة حالياً",
    statusNoSubscriptionDesc: "تمت الموافقة على حسابك، ولكن ليس لديك باقة اشتراك نشطة في الوقت الحالي أو انتهت صلاحية باقتك. يرجى التواصل مع الإدارة لتفعيل باقة أساسية، مميزة، نخبة، أو اشتراك مخصص.",

    browseHeaderTitle: "مكتبة التدريب الحصرية",
    browseRemainingDays: "الاشتراك المتبقي: {days} يوم",
    browseRemainingDaysCustom: "مشترك حتى تاريخ: {date} (متبقي {days} يوم)",
    browseNoDays: "انتهت صلاحية الاشتراك",
    browseSearchPlaceholder: "البحث عن التمارين، الفيديوهات أو العضلات المستهدفة...",
    browseAllCategories: "كل التصنيفات",
    browseNoVideosFound: "لم يتم العثور على فيديوهات تمارين مطابقة لبحثك.",
    browseAddedToFavs: "تمت الإضافة إلى قائمتك المفضلة",
    browseRemovedFromFavs: "تمت الإزالة من قائمتك المفضلة",
    browseTrainerLabel: "المدرب",
    browseDurationLabel: "دقائق",

    favsTitle: "تمارينك المفضلة",
    favsSub: "احتفظ بفيديوهات التمارين الرياضية المفضلة لديك ليسهل الوصول إليها في تمرينك القادم",
    favsEmpty: "لا توجد فيديوهات مفضلة محفوظة بعد. انقر على أيقونة القلب على أي فيديو في المتصفح لحفظه هنا!"
  }
};
