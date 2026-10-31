/**
 * Single source of truth for the AI course (10 sessions).
 * TODO(review translation): every `en` string here is a draft translation — review before relying on it.
 * Only sessions with status "published" get a lesson page, sitemap entry, or prev/next link.
 */

export type Localized = { fa: string; en: string };

export type CourseSession = {
  slug: string;
  order: number;
  status: 'published' | 'coming-soon';
  publishedAt?: string;
  title: Localized;
  summary: Localized;
  level: Localized;
  duration: Localized;
  learningOutcomes: Localized[];
  takeaways?: Localized[];
  exercise?: Localized;
  /** Draft written notes (markdown). TODO(review): owner must approve before publishing. */
  notes?: Localized;
  /** Slide images live under /public/courses/<slug>/slides/<locale>/ (slide-01.webp …). */
  slides?: { count: number };
  pdf?: Localized; // urls under /public
  videoUrl?: string;
};

export const courseOverview: Localized = {
  fa: 'دوره‌ی «ورود به دنیای هوش مصنوعی» ۱۰ جلسه‌ی تعاملی است؛ هر جلسه حدود ۶۰ دقیقه، بدون نیاز به برنامه‌نویسی و با تمرین عملی. مناسب برای کسانی که می‌خواهند هوش مصنوعی را واقعاً در کار و زندگی‌شان به کار بگیرند.',
  en: '“Entering the World of Artificial Intelligence” is a 10-session interactive course: about 60 minutes each, no coding required, hands-on. For anyone who wants to actually use AI in their work and life.',
};

export const courseFormat: { label: Localized; value: Localized; todo: boolean }[] = [
  {
    label: { fa: 'شیوه‌ی برگزاری', en: 'Delivery format' },
    value: { fa: '[TODO: حضوری / آنلاین / ضبط‌شده را مشخص کن]', en: '[TODO: set live / online / recorded]' },
    todo: true,
  },
  {
    label: { fa: 'زمان دوره‌ی بعد', en: 'Next cohort' },
    value: { fa: '[TODO: تاریخ دوره‌ی بعد را وارد کن]', en: '[TODO: add the next cohort date]' },
    todo: true,
  },
  {
    label: { fa: 'گواهی شرکت', en: 'Certificate' },
    value: {
      fa: 'در پایان جلسه‌ی ۱۰ گواهی شرکت در دوره اعطا می‌شود.',
      en: 'A certificate of attendance is issued at the end of session 10.',
    },
    todo: false,
  },
];

export const courseSessions: CourseSession[] = [
  {
    slug: 'ai-session-1',
    order: 1,
    status: 'published',
    publishedAt: '2026-10-22',
    title: {
      fa: 'هوش مصنوعی از کجا آمد و به کجا می‌رود؟',
      en: 'Where Did AI Come From and Where Is It Going?',
    },
    summary: {
      fa: 'سفری کوتاه از رؤیای آلن تورینگ تا عامل‌های هوشمند ۲۰۲۶: تعریف ساده‌ی هوش مصنوعی، تفاوت یادگیری ماشین و یادگیری عمیق، و مسیر پیشرفت از ۱۹۵۰ تا امروز.',
      en: 'A quick journey from Alan Turing’s dream to intelligent agents in 2026: a plain definition of AI, the difference between machine learning and deep learning, and the path of progress from 1950 to today.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      {
        fa: 'تعریف ساده‌ی هوش مصنوعی، بدون پیچیدگی فنی',
        en: 'A plain definition of AI, without technical complexity',
      },
      {
        fa: 'مرز بین یادگیری ماشین و یادگیری عمیق',
        en: 'The boundary between machine learning and deep learning',
      },
      {
        fa: 'مسیر تاریخی از ۱۹۵۰ تا ۲۰۲۶',
        en: 'The historical path from 1950 to 2026',
      },
      {
        fa: 'درک آینده و فرصت‌های شغلی تازه',
        en: 'Understanding the future and new career opportunities',
      },
    ],
    takeaways: [
      {
        fa: 'هوش مصنوعی یعنی یادگیری از تجربه به‌جای کد ثابت؛ مثل آشپزی که با چشیدن غذا دستورش را بهتر می‌کند.',
        en: 'AI means learning from experience instead of fixed code — like a chef who improves the recipe by tasting the dish.',
      },
      {
        fa: 'هوش مصنوعی چتر بزرگ است، یادگیری ماشین زیرمجموعه‌ی آن، و یادگیری عمیق با شبکه‌های عصبی زیرمجموعه‌ی یادگیری ماشین.',
        en: 'AI is the umbrella, machine learning is under it, and deep learning (neural networks) is under machine learning.',
      },
      {
        fa: 'چرا حالا؟ داده‌ی انبوه، سخت‌افزار GPU، الگوریتم‌های نو (مثل Transformer) و سرمایه‌گذاری سنگین.',
        en: 'Why now: massive data, GPU hardware, new algorithms (like Transformer) and heavy investment.',
      },
      {
        fa: 'هوش مصنوعی فعلی همه «هوش مصنوعی محدود» است؛ هوش عمومی (AGI) هنوز هدف پژوهشی است.',
        en: 'Today’s AI is all “narrow AI”; general intelligence (AGI) is still a research goal.',
      },
      {
        fa: 'شایعه‌ها واقعیت نیستند: ابزارها شعور ندارند، همه‌ی شغل‌ها حذف نمی‌شوند و جواب ماشین همیشه ۱۰۰٪ درست نیست.',
        en: 'Myths are not reality: tools have no consciousness, not all jobs disappear, and machine answers are not 100% right.',
      },
      {
        fa: 'جمع‌بندی جلسه: هوش مصنوعی جای انسان را نمی‌گیرد؛ انسان‌هایی که با هوش مصنوعی کار می‌کنند جای کسانی را می‌گیرند که نمی‌کنند.',
        en: 'Session takeaway: AI won’t replace humans — humans using AI will replace those who don’t.',
      },
    ],
    exercise: {
      fa: 'به ChatGPT یا Gemini بگویید یک موضوع پیچیده را طوری توضیح دهد که یک بچه‌ی ۱۰ ساله بفهمد؛ اسکرین‌شات جواب را برای جلسه‌ی بعد نگه دارید.',
      en: 'Ask ChatGPT or Gemini to explain a complex topic so a 10-year-old would understand it; keep a screenshot of the answer for the next session.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## هوش مصنوعی یعنی چه؟

به‌جای یک تعریف فنی، ساده‌اش این است: ماشینی که به‌جای اجرای دستورهای ثابت، از تجربه یاد می‌گیرد. برنامه‌نویسی سنتی مثل یک دستور غذای ثابت است؛ هوش مصنوعی مثل آشپزی است که با چشیدن غذا، دستورش را بهتر می‌کند. دو کار کلیدی‌اش هم همین است: تشخیص چهره و اشیا با دیدن هزاران نمونه، و کشف قواعد پنهانِ داخل داده‌ها بدون این‌که خط‌به‌خط کد بنویسیم.

همین الان هم همه‌جا هست: مسیریابی با پیش‌بینی ترافیک، پیشنهاد کالا در فروشگاه‌های آنلاین، پیشنهاد فیلم در نتفلیکس، فیلترهای چهره‌ی اینستاگرام.

## مرز سه مفهوم: AI، ML، DL

هوش مصنوعی چتر بزرگ است. یادگیری ماشین (ML) زیرمجموعه‌ی آن است: سیستمی که از داده الگو درمی‌آورد. یادگیری عمیق (DL) هم زیرمجموعه‌ی ML است: یادگیری با شبکه‌های عصبیِ چندلایه که وقتی داده و سخت‌افزار کافی باشد، واقعاً می‌درخشد.

## یک تاریخ کوتاه

از سؤال تورینگ در ۱۹۵۰ («آیا ماشین‌ها می‌توانند فکر کنند؟») و تست تورینگ شروع شد؛ در ۱۹۵۶ نام «هوش مصنوعی» در کنفرانس دارتموث رسماً ثبت شد؛ دهه‌های ۷۰ و ۸۰ «زمستان هوش مصنوعی» آمد و بودجه‌ها قطع شد. از ۱۹۹۷ به بعد قطار دوباره راه افتاد: پیروزی Deep Blue در شطرنج، جهش یادگیری عمیق در ۲۰۱۲، معماری Transformer در ۲۰۱۷، انفجار ChatGPT در ۲۰۲۲ و حالا در ۲۰۲۶ عامل‌های هوشمند که خودشان پروژه را جلو می‌برند.

## چرا حالا دوران طلایی است؟

داده‌ی وب انفجاری رشد کرده، GPUها هزاران برابر سریع‌تر شده‌اند، الگوریتم‌های نسل جدید (مثل Transformer) متن و تصویر و صدا را عمیق می‌فهمند، و سرمایه‌گذاری جهانی سنگینی پشت این ماجراست.

## هوش محدود و هوش عمومی

هر ابزاری که امروز می‌بینید «هوش مصنوعی محدود» (ANI) است: در یک کار مشخص عالی است. «هوش عمومی» (AGI) که در همه‌ی حوزه‌ها هم‌تراز انسان باشد، هنوز هدف پژوهشی است. مثال ماندگار این بخش، AlphaGo است: برد ۴–۱ مقابل قهرمان جهان، با حرکت شماره ۳۷‌ای که هیچ انسانی پیش‌بینی‌اش نکرده بود.

## افسانه و واقعیت

ربات‌ها به‌زودی دنیا را نمی‌گیرند — ابزارها شعور و نیت ندارند. همه‌ی شغل‌ها هم حذف نمی‌شوند؛ شغل‌ها تغییر می‌کنند و مهارت‌های تازه می‌آید. استفاده از هوش مصنوعی هم مخصوص برنامه‌نویس‌ها نیست؛ با زبان ساده در دسترس همه است. و مهم‌تر از همه: جواب ماشین همیشه درست نیست، گاهی خطای آماری یا توهم (hallucination) دارد.

## به کجا می‌رویم؟

سه مسیر روشن: عامل‌های خودمختار که کار را از اول تا آخر می‌برند، هوش مصنوعی چندوجهی (متن و صدا و تصویر و ویدیو با هم)، و دستیارهای شخصی برای سلامت و آموزش. فرصت‌ها بزرگ‌اند — اتوماسیون کارهای تکراری، تشخیص زودهنگام بیماری، دسترسی برابر به دانش — و چالش‌ها هم جدی: حریم خصوصی، دیپ‌فیک، و یادگیری مهارت‌های تازه.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## What is AI, simply?

Skip the technical definition: a machine that learns from experience instead of running fixed instructions. Traditional programming is a fixed recipe; AI is a chef who improves the dish by tasting it. Two key abilities: recognizing faces and objects from thousands of samples, and discovering hidden rules in data without writing code line by line.

It is already around us: traffic-aware navigation, online-store product suggestions, Netflix recommendations, Instagram face filters.

## The boundary: AI, ML, DL

AI is the umbrella. Machine learning (ML) is under it: a system that finds patterns in data. Deep learning (DL) is under ML: multi-layer neural networks that really shine when data and hardware are abundant.

## A short history

It starts with Turing’s 1950 question (“Can machines think?”) and the Turing Test; “Artificial Intelligence” was named at the 1956 Dartmouth conference; the 1970s–80s brought “AI winters” and funding cuts. From 1997 the train moved again: Deep Blue’s chess win, the 2012 deep-learning breakthrough, the 2017 Transformer architecture, the 2022 ChatGPT explosion, and by 2026, agents that carry projects forward on their own.

## Why is now the golden age?

Web data has exploded, GPUs are thousands of times faster, new-generation algorithms (like Transformer) understand text, images and audio deeply, and massive global investment backs it all.

## Narrow vs general AI

Every tool you see today is “narrow AI” (ANI): excellent at one task. “General intelligence” (AGI), equal to humans across all domains, is still a research goal. The memorable example here is AlphaGo: a 4–1 win over the world champion, including move 37 that no human master anticipated.

## Myths and reality

Robots are not taking over the world soon — tools have no consciousness or intent. Not all jobs disappear; jobs evolve and new skills appear. AI is not only for programmers; it is accessible through plain language. And most important: machine answers are not always right — statistical errors and hallucinations happen.

## Where is it heading?

Three clear paths: autonomous agents that plan and execute end to end, multimodal AI (text, voice, image, video together), and personal health and education assistants. The opportunities are big — automating repetitive tasks, early disease detection, equal access to knowledge — and so are the challenges: privacy, deepfakes, and learning new skills.`,
    },
    slides: { count: 16 },
    pdf: {
      fa: '/courses/ai-session-1-fa.pdf',
      en: '/courses/ai-session-1-en.pdf',
    },
  },
  {
    slug: 'ai-session-2',
    order: 2,
    status: 'published',
    publishedAt: '2026-10-25',
    title: {
      fa: 'ماشین‌ها چطور یاد می‌گیرند؟',
      en: 'How Do Machines Learn?',
    },
    summary: {
      fa: 'منطق یادگیری ماشین به زبان ساده: تفاوت برنامه‌نویسی سنتی و یادگیری از داده، سه ستون اصلی (داده، مدل، پیش‌بینی)، سه نوع یادگیری (با نظارت، بدون نظارت، تقویتی) و کارگاه عملی ساخت مدل بدون کدنویسی.',
      en: 'Machine learning in plain language: learning from data vs traditional programming, the three pillars (data, model, prediction), the three learning types (supervised, unsupervised, reinforcement), and a no-code hands-on workshop.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      {
        fa: 'تفاوت برنامه‌نویسی سنتی و یادگیری از داده',
        en: 'The difference between traditional programming and learning from data',
      },
      {
        fa: 'سه ستون یادگیری ماشین: داده، مدل و پیش‌بینی',
        en: 'The three pillars of machine learning: data, model and prediction',
      },
      {
        fa: 'سه نوع یادگیری با مثال‌های واقعی',
        en: 'The three learning types with real examples',
      },
      {
        fa: 'ساخت یک مدل ساده بدون کدنویسی',
        en: 'Building a simple model with no coding',
      },
    ],
    takeaways: [
      {
        fa: 'ماشین مثل بچه‌ای که دوچرخه‌سواری یاد می‌گیرد: دیدن نمونه‌ها، آزمون‌وخطا، بهتر شدن قدم‌به‌قدم.',
        en: 'A machine learns like a child on a bike: seeing examples, trial and error, gradual improvement.',
      },
      {
        fa: 'سه ستون جدانشدنی: داده (مواد خام)، مدل (مغز متفکر) و پیش‌بینی (تصمیم برای آینده).',
        en: 'Three inseparable pillars: data (raw material), model (the thinking brain) and prediction (the decision about the future).',
      },
      {
        fa: 'یادگیری با نظارت = فلش‌کارت با جواب درست؛ بدون نظارت = دسته‌بندی بدون اسم‌ها؛ تقویتی = جایزه و جریمه.',
        en: 'Supervised = flashcards with correct answers; unsupervised = sorting without names; reinforcement = rewards and penalties.',
      },
      {
        fa: 'داده‌ی بد یعنی یادگیری بد: کمیت کافی، کیفیت تمیز و تنوع واقعی لازم است.',
        en: 'Bad data means bad learning: enough quantity, clean quality and real diversity are needed.',
      },
      {
        fa: 'مدل با چرخه‌ی «حدس → خطا → اصلاح» یاد می‌گیرد، درست مثل تشخیص اسپم در ایمیل.',
        en: 'A model learns through “guess → error → adjust”, exactly like email spam detection.',
      },
      {
        fa: 'سه دام رایج: حفظ کردن به‌جای یادگیری (overfitting)، داده‌ی کم (underfitting) و داده‌ی یک‌طرفه (bias).',
        en: 'Three common traps: memorizing instead of learning (overfitting), too little data (underfitting) and one-sided data (bias).',
      },
    ],
    exercise: {
      fa: 'یک مدل ساده در Teachable Machine بسازید که دو شیء روی میزتان را از هم تشخیص دهد؛ بعد یک مشکل واقعی از کار یا زندگی‌تان را بنویسید که با یادگیری ماشین حل‌شدنی است.',
      en: 'Build a simple model on Teachable Machine that tells two objects on your desk apart; then write down one real problem from your work or life that machine learning could solve.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## ماشین‌ها چطور یاد می‌گیرند؟

دقیقاً مثل بچه‌ای که دوچرخه‌سواری یاد می‌گیرد: صدها نمونه‌ی واقعی می‌بیند، اول حدس می‌زند و از اشتباهش یاد می‌گیرد، و با هر تلاش دقیق‌تر می‌شود. تفاوت اصلی با برنامه‌نویسی سنتی همین است: آنجا قاعده را ما می‌نویسیم، اینجا ماشین از داده قاعده درمی‌آورد.

## سه ستون اصلی

داده مواد خام و تجربه‌ی گذشته است؛ مدل مغز متفکری که الگو کشف می‌کند؛ و پیش‌بینی، تصمیم هوشمندانه برای آینده. بدون هر کدام از این سه، یادگیری شکل نمی‌گیرد.

## سه نوع یادگیری

**یادگیری با نظارت (Supervised):** مثل فلش‌کارت با جواب درست. هزاران تصویر با اسم حیوان به ماشین نشان می‌دهیم، قیمت خانه را از روی آگهی‌های واقعی پیش‌بینی می‌کند، و پیامک‌های مزاحم را از پیام بانکی جدا می‌کند.

**یادگیری بدون نظارت (Unsupervised):** مثل دسته‌بندی سبد میوه بدون این‌که اسم‌ها را بداند — فقط بر اساس رنگ و شکل. مشتری‌های فروشگاه را بر اساس عادت خرید دسته می‌کند و تراکنش‌های مشکوک بانکی را در لحظه پیدا می‌کند.

**یادگیری تقویتی (Reinforcement):** جایزه و جریمه. حرکت درست +۱۰ امتیاز، برخورد به مانع −۱۰ امتیاز؛ همین منطق پشت خودروهای خودران و برنامه‌های شطرنج است.

جمع‌بندی: با نظارت دقت بالا می‌دهد، بدون نظارت نیازی به برچسب ندارد، و تقویتی مسائل پویا را حل می‌کند.

## داده، سوخت واقعی

«زباله وارد کنی، زباله تحویل می‌گیری.» داده باید کافی باشد (هزاران نمونه)، تمیز باشد (تصاویر واضح و اطلاعات بدون خطا) و متنوع باشد (همه‌ی شرایط واقعی را پوشش دهد).

## مدل چطور یاد می‌گیرد؟

مثل آشپزی که با چشیدن، دستور غذا را کشف می‌کند: داده وارد می‌شود، اولین حدس زده می‌شود، خطا با واقعیت مقایسه می‌شود، و مدل برای تکرار بعدی خودش را اصلاح می‌کند. مثال کاملش تشخیص اسپم است: هزاران ایمیل برچسب‌دار (Ham/Spam)، استخراج کلیدواژه‌هایی مثل «You Won»، و بعد فیلتر خودکار ایمیل‌های مشکوک.

## کارگاه: Teachable Machine

در کلاس با ابزار آنلاین گوگل، بدون حتی یک خط کد، یک مدل ساختیم: عکس گرفتن از دو دسته با وب‌کم، زدن دکمه‌ی آموزش، و دیدن پیش‌بینی زنده.

## سه دام آموزشی

**Overfitting:** ماشین به‌جای فهمیدن، حفظ می‌کند — مثل دانش‌آموزی که سؤال‌ها را حفظ کرده. **Underfitting:** داده آن‌قدر کم است که نتیجه‌گیری ممکن نیست. **Bias:** داده یک‌طرفه، قضاوت ناعادلانه می‌سازد.

## پرسش‌های پرتکرار

به ریاضیات پیشرفته نیاز نیست؛ فهمیدن منطق اصلی کافی است. مقدار داده بسته به مسئله، از چندصد نمونه تا میلیون‌ها رکورد است. ماشین همیشه درست نمی‌گوید؛ خروجی‌اش احتمالی است. و رابطه‌ی AI و ML این است: یادگیری ماشین، موتور اصلی هوش مصنوعی است.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## How do machines learn?

Exactly like a child learning to ride a bike: seeing hundreds of real examples, guessing at first and learning from mistakes, getting more accurate with each attempt. That is the key difference from traditional programming: there we write the rules, here the machine extracts rules from data.

## Three core pillars

Data is raw material and past experience; the model is the thinking brain that discovers patterns; prediction is the smart decision about the future. Learning needs all three.

## Three learning types

**Supervised:** like guided flashcards. Thousands of labeled animal images, house-price estimation from real listings, and separating spam SMS from banking alerts.

**Unsupervised:** like sorting a fruit basket by color and shape without knowing the names. Clustering shoppers by buying habits, spotting suspicious bank transactions in real time.

**Reinforcement:** rewards and penalties. A correct move is +10 points, hitting an obstacle is −10; the same logic powers self-driving cars and game-playing AI.

Summary: supervised gives high accuracy, unsupervised needs no labels, reinforcement solves dynamic problems.

## Data is the real fuel

“Garbage in, garbage out.” Data must be sufficient (thousands of examples), clean (clear images, error-free info) and diverse (covering real-world conditions).

## How does a model learn?

Like a chef discovering the recipe by tasting: data in, an initial guess, the error compared against reality, and an adjustment for the next round. Spam detection is the full example: thousands of labeled Ham/Spam emails, frequent keywords like “You Won” extracted, then automatic filtering of new suspicious mail.

## Workshop: Teachable Machine

In class we built a model with Google’s online tool, not a single line of code: webcam photos of two classes, the train button, and live predictions on screen.

## Three training traps

**Overfitting:** the machine memorizes instead of understanding — like a student who memorized the exam questions. **Underfitting:** too little data to conclude anything. **Bias:** one-sided data produces unfair judgments.

## Beginner FAQs

No advanced math needed — understanding the core logic is enough. Data volume depends on the problem, from hundreds of samples to millions of records. The machine is not always right; its output is probabilistic. And AI vs ML: machine learning is the driving engine of artificial intelligence.`,
    },
    slides: { count: 19 },
    pdf: {
      fa: '/courses/ai-session-2-fa.pdf',
      en: '/courses/ai-session-2-en.pdf',
    },
  },
  {
    slug: 'ai-session-3',
    order: 3,
    status: 'coming-soon',
    title: {
      fa: 'مغز مصنوعی: شبکه‌های عصبی به زبان ساده',
      en: 'The Artificial Brain: Neural Networks in Plain Language',
    },
    summary: {
      fa: 'قیاس شبکه‌ی عصبی با مغز انسان؛ لایه‌ها، وزن‌ها و یادگیری به‌صورت بصری؛ چرا یادگیری عمیق قدرتمند است؛ مثال‌های تصویری (تشخیص چهره، ترجمه، تولید تصویر).',
      en: 'The neural-network vs human-brain analogy; layers, weights and learning made visual; why deep learning is powerful; visual examples (face recognition, translation, image generation).',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      { fa: 'شبکه‌ی عصبی به‌زبان ساده و قیاس آن با مغز', en: 'Neural networks in plain language, compared to the brain' },
      { fa: 'لایه‌ها و وزن‌ها: یادگیری به‌صورت بصری', en: 'Layers and weights: learning made visual' },
      { fa: 'چرا یادگیری عمیق قدرتمند است', en: 'Why deep learning is powerful' },
      { fa: 'مثال‌های واقعی: تشخیص چهره، ترجمه، تولید تصویر', en: 'Real examples: face recognition, translation, image generation' },
    ],
    exercise: {
      fa: '[TODO: آیتم فعالیت/دمو جلسه‌ی ۳ را مشخص کن]',
      en: '[TODO: confirm the activity/demo item for session 3]',
    },
  },
  {
    slug: 'ai-session-4',
    order: 4,
    status: 'coming-soon',
    title: {
      fa: 'انقلاب هوش مصنوعی مولد',
      en: 'The Generative AI Revolution',
    },
    summary: {
      fa: 'مدل‌های زبانی بزرگ (LLM) چطور کار می‌کنند؛ تولید متن، تصویر، ویدیو، صدا و کد؛ مقایسه‌ی مدل‌های معروف. دمو: تولید زنده‌ی محتوا و تصویر.',
      en: 'How large language models work (simply); generating text, image, video, audio and code; a comparison of popular models. Demo: live content and image generation.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      { fa: 'مدل‌های زبانی بزرگ چطور کار می‌کنند (ساده)', en: 'How large language models work (simply)' },
      { fa: 'تولید متن، تصویر، ویدیو، صدا و کد', en: 'Generating text, image, video, audio and code' },
      { fa: 'مقایسه‌ی مدل‌های معروف (GPT، Claude، Gemini و...)', en: 'Comparing popular models (GPT, Claude, Gemini and more)' },
    ],
    exercise: {
      fa: 'دموی زنده: تولید محتوا و تصویر با مدل‌های مولد.',
      en: 'Live demo: generating content and images with generative models.',
    },
  },
  {
    slug: 'ai-session-5',
    order: 5,
    status: 'coming-soon',
    title: {
      fa: 'ابزارهای روزمره‌ی هوش مصنوعی',
      en: 'Everyday AI Tools',
    },
    summary: {
      fa: 'پرامپت‌نویسی حرفه‌ای؛ استفاده از ChatGPT و Claude برای کار، درس و خلاقیت؛ ابزارهای تصویر، ویدیو، صدا و اتوماسیون.',
      en: 'Professional prompt writing; using ChatGPT and Claude for work, study and creativity; image, video, audio and automation tools.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      { fa: 'پرامپت‌نویسی حرفه‌ای', en: 'Professional prompt writing' },
      { fa: 'ChatGPT و Claude برای کار، درس و خلاقیت', en: 'ChatGPT and Claude for work, study and creativity' },
      { fa: 'ابزارهای تصویر، ویدیو، صدا و اتوماسیون', en: 'Image, video, audio and automation tools' },
    ],
    exercise: {
      fa: 'هر نفر یک کار واقعی از کار خودش را با هوش مصنوعی انجام دهد.',
      en: 'Each person does one real task of their own with AI.',
    },
  },
  {
    slug: 'ai-session-6',
    order: 6,
    status: 'coming-soon',
    title: {
      fa: 'هوش مصنوعی در کسب‌وکار و زندگی واقعی',
      en: 'AI in Business and Real Life',
    },
    summary: {
      fa: 'بازاریابی، فروش، منابع انسانی، پزشکی، آموزش و محتوا؛ مطالعه‌ی موردی‌های واقعی؛ اتوماسیون فرایند با هوش مصنوعی.',
      en: 'Marketing, sales, HR, medicine, education and content; real case studies; process automation with AI.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      { fa: 'کاربرد هوش مصنوعی در حوزه‌های مختلف کسب‌وکار', en: 'AI applied across business domains' },
      { fa: 'مطالعه‌ی موردی‌های واقعی', en: 'Real case studies' },
      { fa: 'اتوماسیون فرایند با هوش مصنوعی', en: 'Process automation with AI' },
    ],
    exercise: {
      fa: 'گفت‌وگوی گروهی: کسب‌وکار خودتان را چطور با هوش مصنوعی بهتر می‌کنید؟',
      en: 'Group discussion: how would you improve your own business with AI?',
    },
  },
  {
    slug: 'ai-session-7',
    order: 7,
    status: 'coming-soon',
    title: {
      fa: 'داده‌ها، سوخت واقعی هوش مصنوعی',
      en: 'Data: The Real Fuel of AI',
    },
    summary: {
      fa: 'کیفیت داده؛ سوگیری، overfitting و داده‌ی ناکافی؛ حریم خصوصی و جمع‌آوری داده. دمو: تأثیر داده‌ی بد روی خروجی مدل.',
      en: 'Data quality; bias, overfitting and insufficient data; privacy and data collection. Demo: the effect of bad data on model output.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      { fa: 'کیفیت داده و چرا سوخت واقعی هوش مصنوعی است', en: 'Data quality and why it is the real fuel of AI' },
      { fa: 'سوگیری، overfitting و داده‌ی ناکافی', en: 'Bias, overfitting and insufficient data' },
      { fa: 'حریم خصوصی و جمع‌آوری داده', en: 'Privacy and data collection' },
    ],
    exercise: {
      fa: 'دمو: تأثیر داده‌ی بد روی خروجی مدل.',
      en: 'Demo: the effect of bad data on model output.',
    },
  },
  {
    slug: 'ai-session-8',
    order: 8,
    status: 'coming-soon',
    title: {
      fa: 'اخلاق، چالش‌ها و خطرات هوش مصنوعی',
      en: 'AI Ethics, Challenges and Risks',
    },
    summary: {
      fa: 'سوگیری الگوریتمیک؛ دیپ‌فیک، اطلاعات غلط و ریسک‌های امنیتی؛ شغل‌ها و جایگزینی؛ پاسخگویی و قانون‌گذاری.',
      en: 'Algorithmic bias; deepfakes, misinformation and security risks; jobs and replacement; accountability and regulation.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      { fa: 'سوگیری الگوریتمیک و ریشه‌هایش', en: 'Algorithmic bias and its roots' },
      { fa: 'دیپ‌فیک، اطلاعات غلط و ریسک‌های امنیتی', en: 'Deepfakes, misinformation and security risks' },
      { fa: 'تأثیر بر شغل‌ها، پاسخگویی و قانون‌گذاری', en: 'Impact on jobs, accountability and regulation' },
    ],
    exercise: {
      fa: 'گفت‌وگو: سناریوهای واقعی و تصمیم‌های اخلاقی.',
      en: 'Discussion: real scenarios and ethical decisions.',
    },
  },
  {
    slug: 'ai-session-9',
    order: 9,
    status: 'coming-soon',
    title: {
      fa: 'ساخت اولین پروژه‌ی هوش مصنوعی خودتان',
      en: 'Build Your First AI Project',
    },
    summary: {
      fa: 'پروژه‌های بدون کد: چت‌بات ساده، طبقه‌بند تصویر یا تولیدکننده‌ی محتوا؛ ابزارهایی مثل n8n، Make، Google AI Studio و Hugging Face Spaces.',
      en: 'No-code projects: a simple chatbot, image classifier or content generator; tools such as n8n, Make, Google AI Studio and Hugging Face Spaces.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      { fa: 'ساخت پروژه‌ی بدون کد: چت‌بات، طبقه‌بند یا تولید محتوا', en: 'No-code projects: chatbot, classifier or content generation' },
      { fa: 'کار با ابزارهای n8n، Make، Google AI Studio و Hugging Face', en: 'Working with n8n, Make, Google AI Studio and Hugging Face' },
      { fa: 'ارائه‌ی یک پروژه‌ی کوچک', en: 'Presenting a small project' },
    ],
    exercise: {
      fa: 'عملی: هر نفر یا هر گروه یک پروژه‌ی کوچک می‌سازد و ارائه می‌دهد.',
      en: 'Hands-on: each person or group builds and presents a small project.',
    },
  },
  {
    slug: 'ai-session-10',
    order: 10,
    status: 'coming-soon',
    title: {
      fa: 'آینده‌ی هوش مصنوعی و مسیر شغلی شما',
      en: 'The Future of AI and Your Career Path',
    },
    summary: {
      fa: 'روندهای آینده (AGI، عامل‌ها، چندوجهی، هوش مصنوعی شخصی)؛ مهارت‌های پرتقاضا؛ مسیرهای شغلی؛ نقشه‌ی راه یادگیری شخصی؛ جمع‌بندی و اعطای گواهی.',
      en: 'Future trends (AGI, agents, multimodal, personal AI); in-demand skills; career paths; a personal learning roadmap; wrap-up and certificate.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      { fa: 'روندهای آینده: AGI، عامل‌ها، چندوجهی، هوش شخصی', en: 'Future trends: AGI, agents, multimodal, personal AI' },
      { fa: 'مهارت‌ها و مسیرهای شغلی پرتقاضا', en: 'In-demand skills and career paths' },
      { fa: 'نقشه‌ی راه یادگیری شخصی', en: 'A personal learning roadmap' },
    ],
    exercise: {
      fa: 'جمع‌بندی دوره و دریافت گواهی شرکت.',
      en: 'Course wrap-up and certificate of attendance.',
    },
  },
];

export function getPublishedSessions(): CourseSession[] {
  return courseSessions.filter((s) => s.status === 'published');
}

/** A value that must never reach the page in production (empty or a TODO marker). */
export function isSkippable(value: string | undefined): boolean {
  const v = (value ?? '').trim();
  return v === '' || /^(\[)?TODO/i.test(v);
}

/**
 * Placeholder markers are kept in the data for the owner, but only rendered in dev.
 * Returns the notes with any leading blockquote that contains TODO removed in production.
 */
export function notesForRender(md: string | undefined): string {
  if (!md) return '';
  if (process.env.NODE_ENV !== 'production') return md;
  return md
    .split('\n')
    .filter((line) => !(line.trimStart().startsWith('>') && /TODO/i.test(line)))
    .join('\n')
    .trim();
}

export function getPublishedSession(slug: string): CourseSession | undefined {
  return getPublishedSessions().find((s) => s.slug === slug);
}

/** Prev/next among published sessions; the raw neighbours (incl. coming-soon) for text-only labels. */
export function getNeighbours(slug: string) {
  const idx = courseSessions.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? courseSessions[idx - 1] : undefined;
  const next = idx >= 0 && idx < courseSessions.length - 1 ? courseSessions[idx + 1] : undefined;
  return { prev, next };
}
