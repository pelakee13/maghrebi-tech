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
        fa: 'سه دام رایج: حفظ کردن به‌جای یادگیری (overfitting)، مدل ساده‌تر از حد برای الگو (underfitting) و داده‌ی یک‌طرفه (bias).',
        en: 'Three common traps: memorizing instead of learning (overfitting), a model too simple for the pattern (underfitting) and one-sided data (bias).',
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

**Overfitting:** ماشین به‌جای فهمیدن، حفظ می‌کند — مثل دانش‌آموزی که سؤال‌ها را حفظ کرده. **Underfitting:** مدل آن‌قدر ساده است که اصلاً الگو را نمی‌گیرد. **Bias:** داده یک‌طرفه، قضاوت ناعادلانه می‌سازد. (داده‌ی کم هم مشکل جداگانه‌ای است و نباید با underfitting یکی گرفته شود.)

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

**Overfitting:** the machine memorizes instead of understanding — like a student who memorized the exam questions. **Underfitting:** the model is too simple to capture the pattern at all. **Bias:** one-sided data produces unfair judgments. (Too little data is a separate problem and should not be confused with underfitting.)

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
    status: 'published',
    publishedAt: '2026-11-07',
    title: {
      fa: 'مغز مصنوعی: شبکه‌های عصبی به زبان ساده',
      en: 'Artificial Brain: Neural Networks Explained Simply',
    },
    summary: {
      fa: 'قیاس شبکه‌ی عصبی با مغز انسان؛ لایه‌ها، وزن‌ها و یادگیری به‌صورت بصری؛ چرا یادگیری عمیق قدرتمند است؛ مثال‌های تصویری (تشخیص چهره، ترجمه، تولید تصویر).',
      en: 'The neural-network vs human-brain analogy; layers, weights and learning made visual; why deep learning is powerful; visual examples (face recognition, translation, image generation).',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      {
        fa: 'الهام از طبیعت: عملکرد نورون‌های مغز انسان',
        en: 'Nature-inspired: understanding how human brain neurons work',
      },
      {
        fa: 'ساختار شبکه: لایه‌ها و وزن‌های تصمیم‌گیری',
        en: 'Network architecture: layers and decision weights',
      },
      {
        fa: 'یادگیری عمیق: راز قدرت شبکه‌های چندلایه',
        en: 'Deep learning: the power behind multi-layer networks',
      },
      {
        fa: 'کاربردهای روزمره: تشخیص چهره، ترجمه و تولید',
        en: 'Everyday applications: face recognition, translation and generation',
      },
    ],
    takeaways: [
      {
        fa: 'شبکه‌های عصبی با الهام از نورون‌های مغز انسان طراحی شده‌اند.',
        en: 'Neural networks are designed after human brain neurons.',
      },
      {
        fa: 'هر شبکه سه بخش دارد: لایه‌ی ورودی، لایه‌های پنهان و لایه‌ی خروجی.',
        en: 'Every network has three parts: input layer, hidden layers and output layer.',
      },
      {
        fa: 'یادگیری یعنی اصلاح تدریجی وزن‌ها برای کم‌کردن خطای پیش‌بینی.',
        en: 'Learning means gradually adjusting weights to reduce prediction error.',
      },
      {
        fa: 'قدرت یادگیری عمیق از افزایش لایه‌های پنهان می‌آید: درک الگوهای پیچیده.',
        en: 'Deep learning gains its power from more hidden layers: understanding complex patterns.',
      },
      {
        fa: 'تشخیص چهره، ترجمه‌ی هوشمند و تولید تصویر محصول همین فناوری‌اند.',
        en: 'Face recognition, smart translation and image generation are products of this technology.',
      },
    ],
    exercise: {
      fa: '«شکارچی شبکه‌ی عصبی!» در طول هفته دو ابزار هوشمند را آزمایش کنید: یک ضرب‌المثل فارسی را در مترجم گوگل امتحان کنید، در گالری گوشی «غروب» یا «ماشین» را جستجو کنید، و یک مورد دقت بالا و یک مورد خطای هوش مصنوعی را یادداشت کنید.',
      en: '“Neural Network Hunter!” Test two smart tools this week: try a Persian proverb in Google Translate or a chatbot, search “sunset” or “car” in your phone gallery, and note one case of high accuracy and one AI error.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## مغز انسان چطور کار می‌کند؟

مغز انسان حدود ۸۶ میلیارد نورون فعال دارد. هر نورون سیگنال را از حواس پنج‌گانه می‌گیرد، پیام الکتریکی را با سرعت بین نورون‌ها جابه‌جا می‌کند، و با تکرار و تمرین ارتباط‌ها قوی‌تر می‌شوند. همین سه قدم — دریافت، پردازش گروهی و تقویت مسیر — الگویی است که شبکه‌ی عصبی مصنوعی از آن کپی کرده است.

## شبکه‌ی عصبی مصنوعی چیست؟

مقایسه‌ی مستقیم: در مغز طبیعی واحد سازنده سلول زنده‌ی عصبی، پل ارتباطی سیناپس‌های زیستی و روش یادگیری تجربه‌ی روزمره و تکرار است. در شبکه‌ی مصنوعی واحد سازنده گره‌های محاسباتی نرم‌افزاری، پل ارتباطی وزن‌های عددی قابل‌تنظیم و روش یادگیری دیدن هزاران نمونه‌ی داده است.

## نورون مصنوعی به‌سادگی

فرض کنید ورودی‌ها «هوا آفتابی»، «وقت آزاد» و «دوستان هستند» باشند. هر ورودی یک وزن اهمیت می‌گیرد (ضرب در وزن)، مجموع گرفته می‌شود، و نورون مرکزی تصمیم می‌گیرد: «به پارک می‌رویم!» ساختار هر نورون همین است: ورودی‌ها، وزن‌ها، خروجی.

## معماری شبکه

سه لایه: **ورودی** تصویر، متن یا صدا را می‌گیرد؛ **لایه‌های پنهان** الگوها و ویژگی‌های پنهان را استخراج می‌کنند؛ **خروجی** نتیجه‌ی نهایی را تحویل می‌دهد.

## وزن‌ها و یادگیری

دقیقاً مثل تنظیم دمای دوش آب با چرخاندن تدریجی شیر: اول با وزن‌های کاملاً تصادفی حدس می‌زنیم، خطا را با جواب درست مقایسه می‌کنیم، وزن‌ها را برای کم‌کردن خطا تنظیم می‌کنیم، و بعد از هزاران تکرار به دقت بالا می‌رسیم.

## یادگیری عمیق چیست؟

ده‌ها لایه‌ی پنهان متوالی در کنار هم: لایه‌های ابتدایی نقطه‌ها، لبه‌ها و خطوط ساده را تشخیص می‌دهند، لایه‌های میانی خطوط را برای شناخت شکل‌ها ترکیب می‌کنند، و لایه‌های عمیق نهایی درک کاملی از کل تصویر یا متن پیدا می‌کنند. قدرتش هم سه دلیل دارد: کشف خودکار ویژگی‌ها بدون برنامه‌نویسی دستی قواعد، رشد با کلان‌داده‌ها، و پردازش موازی GPU.

## سه کاربرد واقعی

**بینایی ماشین:** تشخیص چهره در گوشی — لایه اول خطوط و مرزهای روشنایی، لایه دوم چشم و ابرو و بینی، لایه سوم تطبیق ساختار کامل چهره. حتی با عینک یا تغییر نور هم کار می‌کند.

**پردازش زبان طبیعی:** ترجمه‌ی هوشمند — عبور از ترجمه‌ی کلمه‌به‌کلمه، درک معنای کلی جمله، تشخیص اصطلاحات و کنایه‌ها («It is raining cats and dogs» یعنی باران شدید).

**هوش مصنوعی مولد:** تولید تصویر از متن — ترکیب مفاهیم آموخته‌شده از میلیون‌ها تصویر هنری و ساخت تصویرهایی که هرگز وجود نداشته‌اند.

## قبل و بعد

ترجمه‌ی ماشینی از «خشک و کلمه‌به‌کلمه» شد «روان و مفهومی»؛ تشخیص چهره از «خطا با عینک» شد «تشخیص فوری در هر نور»؛ تولید تصویر از «غیرممکن بدون طراح انسانی» شد «اثر هنری در چند ثانیه».

## محدودیت‌ها

تشتت به داده: برای یادگیری به هزاران نمونه نیاز است. معمای جعبه‌ی سیاه: توضیح دقیق منطق تصمیم دشوار است. مصرف انرژی و هزینه: به سرورها و سخت‌افزار گران‌قیمت نیاز دارد. و البته شبکه‌ی عصبی مصنوعی احساس ندارد — صرفاً یک سامانه‌ی ریاضی برای کشف الگوهای آماری است.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## How does the human brain work?

The human brain has about 86 billion active neurons. Each neuron receives signals from the five senses, passes electrical messages between neurons at high speed, and connections strengthen through repetition and practice. Those three steps — input, group processing, pathway strengthening — are the pattern the artificial neural network copies.

## What is an artificial neural network?

Direct comparison: in the natural brain the building block is the living nerve cell, the connecting bridge is biological synapses, and learning comes from daily experience and repetition. In the artificial network the building block is software computational nodes, the bridge is adjustable numerical weights, and learning comes from observing thousands of data samples.

## The artificial neuron, simply

Say the inputs are “sunny weather”, “free time” and “friends joining”. Each input gets an importance weight (multiply by the weight), the sum goes to the central neuron, and the final output is: “Going to the park!” That is the whole anatomy: inputs, weights, output.

## Network architecture

Three layers: **input** takes the image, text or audio; **hidden layers** extract patterns and hidden features; **output** delivers the final result.

## Weights and learning

Just like adjusting shower water temperature by gradually turning the faucet: start with completely random weights, measure the error against the correct answer, adjust weights to reduce the error, and after thousands of iterations reach high accuracy.

## What is deep learning?

Dozens of sequential hidden layers: early layers detect dots, edges and simple lines; middle layers combine lines into shapes; deep final layers build full understanding of the whole image or text. Three reasons for its power: automatic feature extraction (no manual rule programming), scaling with big data, and GPU parallel processing.

## Three real applications

**Computer vision:** face recognition on phones — layer one detects light boundaries, layer two identifies eyes, eyebrows, nose and lips, layer three matches the full facial structure. It still works with glasses or changed lighting.

**Natural language processing:** smart translation — going beyond word-for-word translation to full sentence meaning, catching idioms and tone (“It is raining cats and dogs” means heavy rain).

**Generative AI:** text-to-image — combining concepts learned from millions of artwork images to create pictures that never existed.

## Before and after

Machine translation went from rigid and word-for-word to fluent and conceptual; face recognition went from failing with glasses to instant recognition in any lighting; image generation went from impossible without a human designer to artwork in seconds.

## Limitations

High data demand: thousands of samples to learn. The black-box dilemma: hard to explain the exact decision logic. Energy and cost: expensive servers and hardware. And no, the artificial neural network has no feelings — it is simply a mathematical system for discovering statistical patterns.`,
    },
    slides: { count: 20 },
    pdf: {
      fa: '/courses/ai-session-3-fa.pdf',
      en: '/courses/ai-session-3-en.pdf',
    },
  },
  {
    slug: 'ai-session-4',
    order: 4,
    status: 'published',
    publishedAt: '2026-11-08',
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
      {
        fa: 'تفاوت هوش مصنوعی توصیفی (تشخیص) و مولد (خلق)',
        en: 'The difference between discriminative (classifying) and generative (creating) AI',
      },
      {
        fa: 'رمز مدل‌های زبانی بزرگ: پیش‌بینی کلمه‌ی بعدی',
        en: 'The core secret of LLMs: predicting the next word',
      },
      {
        fa: 'تولید متن، تصویر، ویدیو، صدا و کد',
        en: 'Generating text, image, video, audio and code',
      },
      {
        fa: 'مقایسه‌ی مدل‌های معروف و انتخاب ابزار مناسب هر کار',
        en: 'Comparing popular models and choosing the best tool per task',
      },
    ],
    takeaways: [
      {
        fa: 'هوش مصنوعی مولد به‌جای تشخیص داده‌های موجود، محتوای تازه می‌سازد.',
        en: 'Generative AI creates new content instead of classifying existing data.',
      },
      {
        fa: 'چت‌بات‌ها با پیش‌بینی هوشمندانه‌ی کلمه‌ی بعدی جمله‌های منسجم می‌سازند.',
        en: 'Chatbots build coherent sentences by intelligently predicting the next word.',
      },
      {
        fa: 'فرمول طلایی پرامپت تصویر: موضوع + محیط + سبک هنری + نورپردازی.',
        en: 'The golden formula for image prompts: subject + environment + art style + lighting.',
      },
      {
        fa: 'سه قانون طلایی: پرامپت دقیق، راستی‌آزمایی خروجی، و بازبینی با پیام‌های تکمیلی.',
        en: 'Three golden rules: precise prompting, fact-checking outputs, and iterating with follow-ups.',
      },
      {
        fa: 'هوش مصنوعی جای کسی را نمی‌گیرد؛ کسانی که با آن کار می‌کنند جای کسانی را می‌گیرند که نمی‌کنند.',
        en: 'AI will not replace people; people who master AI will replace those who do not use it.',
      },
    ],
    exercise: {
      fa: '«اولین پروژه‌ی خلاقانه‌ی شما!» با یکی از ابزارهای معرفی‌شده کار عملی کنید: یک پرامپت متنی (مثلاً برنامه‌ی یک صفحه‌ی اینستاگرام) و یک تصویر تولیدشده از روی توصیف بنویسید و به اشتراک بگذارید.',
      en: '“Your First Creative Project!” Do hands-on work with one of the featured tools: write a text prompt (e.g. an Instagram launch plan) and generate an image from a description, then share both.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## هوش مصنوعی مولد چیست؟

هوش مصنوعی سنتی (توصیفی) کارش دسته‌بندی و تشخیص داده‌های موجود است — مثلاً تشخیص این‌که هوا بارانی است یا نه. هوش مصنوعی مولد برعکس، چیز تازه می‌سازد: متن، تصویر، صدا، ویدیو و کد.

## موتور چت‌بات‌ها چطور کار می‌کند؟

مدل‌های زبانی بزرگ (LLM) روی میلیاردها صفحه از کتاب‌ها، مقاله‌ها و وب‌سایت‌ها آموزش دیده‌اند و ساختار معنایی زبان را یاد گرفته‌اند. رمز کلی‌شان خیلی ساده است: **پیش‌بینی کلمه‌ی بعدی.** همین کار ساده، وقتی میلیاردها بار تکرار شود، جمله‌های منسجم و پاسخ‌های هوشمند می‌سازد.

## چه چیزهایی می‌سازد؟

**متن:** نوشتن ایمیل کاری، مقاله، پست شبکه‌های اجتماعی، خلاصه‌سازی و ترجمه‌ی گزارش‌های طولانی. **تصویر:** از یک جمله تا عکس و نقاشی — مثلاً «قلعه‌ی کریستالی درخشان میان ابرها در نور غروب». **ویدیو، صدا و کد:** کلیپ سینمایی از متن، صداگذاری طبیعی، آهنگ‌سازی و تولید کد نرم‌افزاری.

## مقایسه‌ی مدل‌ها

ChatGPT (OpenAI) همه‌فن‌حریف گفت‌وگو و ایده‌پردازی است؛ Gemini (Google) در درک چندوجهی و اتصال به ابزارهای گوگل قوی است؛ Claude در نوشتن فارسی و کدنویسی لبه دارد؛ جست‌وجوی زنده و فایل‌های بزرگ با Gemini سریع‌تر است. نکته‌ی عملی: ابزار را بر اساس کار انتخاب کنید، نه بر اساس تبلیغات.

## دو کارگاه عملی

**کارگاه ۱ — تولید متن:** پرامپت آماده‌ی کلاس: «تو یک مشاور کسب‌وکاری. برنامه‌ی ۳ روزه‌ی افتتاح صفحه‌ی اینستاگرام یک کافه‌کتاب محلی را با لحن گرم و صمیمی بنویس.»

**کارگاه ۲ — تصویر از متن:** فرمول طلایی: موضوع + محیط و پس‌زمینه + سبک هنری + نورپردازی.

## سه قانون طلایی

۱. **پرامپت دقیق:** نقش، هدف، مخاطب و فرمت خروجی را مشخص کنید. ۲. **راستی‌آزمایی:** آمار، ارقام و داده‌های فنی را حتماً با منبع انسانی چک کنید. ۳. **بازبینی:** از جواب اول راضی نشوید؛ با پیام‌های تکمیلی آن را بهتر کنید.

## پرسش‌های پرتکرار

آیا هوش مصنوعی جای ما را می‌گیرد؟ نه — کسانی که هوش مصنوعی را یاد بگیرند جای کسانی را می‌گیرند که استفاده نمی‌کنند. آیا محتوای تولیدشده کپی از اینترنت است؟ نه — کلمه‌ها و پیکسل‌ها از نو ساخته می‌شوند، نه کپی.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## What is generative AI?

Traditional (discriminative) AI classifies and detects existing data — say, whether it is raining. Generative AI creates something new: text, images, audio, video and code.

## How do chatbots actually work?

Large language models are trained on billions of pages of books, papers and websites, learning the semantic structure of language. The core secret is simple: **predicting the next word.** That one repeated move builds coherent sentences and smart answers.

## What does it produce?

**Text:** business emails, articles, social posts, summarizing and translating long reports. **Images:** from one sentence to photos and paintings — e.g. “a glowing crystal castle floating on clouds in sunset light”. **Video, audio and code:** cinematic clips from text, natural voiceovers, custom music and working software code.

## Comparing models

ChatGPT (OpenAI) is the all-rounder for conversation and ideation; Gemini (Google) shines at multimodal understanding and Workspace integration; Claude has a clear edge in Persian writing and coding; live search and large files are fastest with Gemini. Practical rule: choose the tool by the job, not by the hype.

## Two hands-on workshops

**Workshop 1 — text generation:** classroom prompt: “You are a business consultant. Write a 3-day launch plan for a local book cafe’s Instagram page in a warm, friendly tone.”

**Workshop 2 — image from text:** the golden formula: subject + environment & background + art style + lighting.

## Three golden rules

1. **Precise prompting:** define role, goal, audience and output format. 2. **Fact-checking:** always verify statistics, figures and technical data with a human source. 3. **Iterate:** do not settle for the first response — refine with follow-ups.

## FAQ

Will AI replace our jobs? People who master AI will replace those who do not use it. Is generated content copied from the internet? No — words and pixels are generated anew, not copied.`,
    },
    slides: { count: 19 },
    pdf: {
      fa: '/courses/ai-session-4-fa.pdf',
      en: '/courses/ai-session-4-en.pdf',
    },
  },
  {
    slug: 'ai-session-5',
    order: 5,
    status: 'published',
    publishedAt: '2026-11-08',
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
      {
        fa: 'چارچوب ۴ بخشی پرامپت‌نویسی: نقش، زمینه، کار، فرمت',
        en: 'The 4-part prompt framework: role, context, task, format',
      },
      {
        fa: 'کاربرد عملی ChatGPT و Claude در کار، درس و خلاقیت',
        en: 'Practical ChatGPT and Claude use in work, study and creativity',
      },
      {
        fa: 'ابزارهای تصویر، ویدیو، صدا و اتوماسیون',
        en: 'Image, video, voice and automation tools',
      },
      {
        fa: 'ترکیب ابزارها برای نتیجه‌ی چندبرابری',
        en: 'Orchestrating tools together for multiplied results',
      },
    ],
    takeaways: [
      {
        fa: 'کیفیت خروجی هوش مصنوعی بازتاب شفافیت پرامپت شماست.',
        en: 'AI output quality is a direct reflection of prompt clarity and precision.',
      },
      {
        fa: 'چارچوب ۴ بخشی (نقش، زمینه، کار، فرمت) پاسخ‌های خوب و مستمر می‌دهد.',
        en: 'The 4-part framework (role, context, task, format) unlocks consistently strong responses.',
      },
      {
        fa: 'از جواب اول راضی نشوید: با پیام‌های تکمیلی آن را بهتر کنید.',
        en: 'Never settle for the first response: refine with follow-up prompts.',
      },
      {
        fa: 'هالوسینیشن (توهم) واقعی است؛ آمار و ارقام را حتماً راستی‌آزمایی کنید.',
        en: 'Hallucination is real; always fact-check statistics and claims.',
      },
      {
        fa: 'پرامپت فارسی خوب کار می‌کند؛ ولی ابزارهای تصویر هنوز در انگلیسی جزئیات بهتری می‌دهند.',
        en: 'Persian prompts work well, though image tools still give sharper details in English.',
      },
    ],
    exercise: {
      fa: '«پرامپت‌نویسی در عمل!» یک کار واقعی وقت‌گیر از کار یا درس‌تان را به هوش مصنوعی بسپارید و با چارچوب ۴ بخشی پرامپت را ارتقا دهید.',
      en: '“Prompt Engineering in Action!” Delegate one time-consuming task to AI this week and elevate the prompt using the 4-part framework.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## چرا ابزارهای روزمره مهم‌اند؟

ساعت‌ها نوشتن، ترجمه و خلاصه‌سازی در چند دقیقه تمام می‌شود؛ و دیگر لازم نیست جلوی صفحه‌ی خالی بمانید و بپرسید «از کجا شروع کنم؟»

## پرامپت‌نویسی چیست؟

پرامپت هر متن، سؤال یا دستوری است که به مدل هوش مصنوعی می‌دهید تا خروجی دلخواه بسازد. قانون طلایی: ورودی دقیق و شفاف یعنی خروجی دقیق و شفاف.

## چارچوب ۴ بخشی

۱. **نقش:** شخصیت یا تخصص را مشخص کنید (مثلاً «مثل یک معلم فیزیک باتجربه رفتار کن»). ۲. **زمینه:** پس‌زمینه و مخاطب هدف را توضیح دهید. ۳. **کار:** دقیقاً چه می‌خواهید. ۴. **فرمت:** خروجی چه شکلی باشد.

مثال ضعیف: «درباره‌ی ورزش مقاله بنویس» — نتیجه: مقاله‌ای کلی و تکراری. مثال قوی: همان درخواست با نقش، زمینه و فرمت مشخص — نتیجه: محتوای عملی و مفید.

## ChatGPT و Claude در عمل

**ChatGPT:** معلم خصوصی، حل تمرین، نوشتن ایمیل و رزومه، جست‌وجوی زنده و گفت‌وگوی صوتی. **Claude:** نوشتن روان و ادبی، تحلیل عمیق اسناد طولانی، بازنویسی و ویرایش. جدول انتخاب ابزار: جست‌وجوی وب و مکالمه → ChatGPT؛ نوشتن طولانی و ویرایش → Claude.

## ابزارهای تصویر، ویدیو و صدا

**تصویر:** Midjourney و Google ImageFX برای تصاویر فوتورئالیستی و کانسپت‌آرت؛ Canva AI برای حذف پس‌زمینه و طراحی سریع. **ویدیو و صدا:** ElevenLabs برای صداهای طبیعی و دوبله‌ی چندزبانه؛ Runway و Kling برای ویدیو از متن.

## اتوماسیون و ترکیب ابزارها

خلاصه‌سازی خودکار جلسات (ضبط + استخراج اقدامات)، اتصال ابزارها با Make و Zapier. و نکته‌ی قدرتمند: **ترکیب ابزارها** — مثلاً ایده‌پردازی و نوشتن فیلم‌نامه با Claude، طراحی کانسپت با Midjourney، و ویرایش نهایی با ابزار ویدیو.

## اشتباهات رایج

از جواب اول راضی نشوید؛ واقعیت آمار را کورکورانه باور نکنید (هالوسینیشن)؛ و پرامپت را با چارچوب ۴ بخشی بازنویسی کنید.

## پرسش‌های پرتکرار

بهتر است فارسی پرامپت بزنم یا انگلیسی؟ مدل‌های مدرن فارسی را خیلی خوب می‌فهمند، ولی ابزارهای تصویر هنوز در انگلیسی جزئیات بهتری می‌دهند.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## Why everyday AI tools matter

Hours of drafting, translation and summarization in minutes — and no more staring at a blank page asking “where do I begin?”

## What is prompt engineering?

A prompt is any text, question or instruction given to an AI model to produce a desired output. Golden rule: precise, clear input gives precise, clear output.

## The 4-part framework

1. **Role:** specify the persona or expertise (e.g. “act as an experienced physics teacher”). 2. **Context:** describe background and target audience. 3. **Task:** exactly what you want. 4. **Format:** what the output should look like.

Weak prompt: “Write an article about exercising” — generic, repetitive result. Strong prompt: the same request with role, context and format defined — actionable, useful content.

## ChatGPT and Claude in practice

**ChatGPT:** personal tutor, practice quizzes, business writing, resumes, live search and voice mode. **Claude:** highly fluent writing, deep long-document analysis, rewriting and editing. Tool picker: web search & voice → ChatGPT; long-form writing & editing → Claude.

## Image, video and voice tools

**Images:** Midjourney and Google ImageFX for photorealistic imagery and concept art; Canva AI for one-click background removal. **Video & voice:** ElevenLabs for lifelike text-to-speech and multilingual dubbing; Runway and Kling for text-to-video.

## Automation and tool orchestration

Automated meeting summarization (transcribe + extract action items), app integrations with Make and Zapier. And the power move: **combine tools** — e.g. ideation and scriptwriting with Claude, concept art with Midjourney, final editing with a video tool.

## Common mistakes

Never settle for the very first response; blindly trusting facts and stats (hallucination) is dangerous; rewrite weak prompts using the 4-part framework.

## FAQ

Is it better to prompt in English or Persian? Modern LLMs handle Persian exceptionally well; image generators still yield sharper details in English.`,
    },
    slides: { count: 20 },
    pdf: {
      fa: '/courses/ai-session-5-fa.pdf',
      en: '/courses/ai-session-5-en.pdf',
    },
  },
  {
    slug: 'ai-session-6',
    order: 6,
    status: 'published',
    publishedAt: '2026-11-08',
    title: {
      fa: 'هوش مصنوعی در کسب‌وکار و زندگی واقعی',
      en: 'Artificial Intelligence in Business & Everyday Life',
    },
    summary: {
      fa: 'بازاریابی، فروش، منابع انسانی، پزشکی، آموزش و محتوا؛ مطالعه‌ی موردی‌های واقعی؛ اتوماسیون فرایند با هوش مصنوعی.',
      en: 'Practical applications and case studies across marketing, sales, HR, medicine, education and content; intelligent process automation.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      {
        fa: 'کاربرد هوش مصنوعی در بازاریابی، فروش، منابع انسانی و سایر حوزه‌ها',
        en: 'AI applications in marketing, sales, HR and other business domains',
      },
      {
        fa: 'مطالعه‌ی موردی‌های واقعی (مثل تحول پشتیبانی مشتری در Klarna)',
        en: 'Real case studies (e.g. Klarna customer-support transformation)',
      },
      {
        fa: 'اتوماسیون فرایند: از رویداد ماشه تا اقدام خودکار',
        en: 'Process automation: from trigger event to automated action',
      },
      {
        fa: 'سناریوهای عملی اتوماسیون برای کسب‌وکار خودتان',
        en: 'Practical automation scenarios for your own business',
      },
    ],
    takeaways: [
      {
        fa: 'هوش مصنوعی از وعده‌ی نظری به موتور رشد درآمد و کاهش هزینه رسیده است.',
        en: 'AI has moved from theoretical promise to an engine for revenue growth and cost efficiency.',
      },
      {
        fa: 'نمونه‌ی واقعی: دستیار هوشمند Klarna میلیون‌ها تیکت پشتیبانی را در زمان کمتری حل کرد.',
        en: 'Real case: Klarna’s AI assistant resolved millions of support tickets faster.',
      },
      {
        fa: 'سه سناریوی عملی: دسته‌بندی پیام مشتری، تولید گزارش خودکار، و پیگیری خودکار سرنخ‌های فروش.',
        en: 'Three practical scenarios: customer-message triage, automated reporting, automated sales-lead follow-up.',
      },
      {
        fa: 'فرصت: مقیاس‌پذیری سریع. چالش: کیفیت داده، حریم خصوصی و آمادگی تیم.',
        en: 'Opportunity: rapid scaling. Challenges: data quality, privacy and team readiness.',
      },
      {
        fa: 'آیا فقط شرکت‌های بزرگ؟ نه — ابزارهای SaaS و no-code برای کسب‌وکارهای کوچک هم در دسترس‌اند.',
        en: 'Only for big enterprises? No — SaaS and no-code tools make it accessible to small businesses too.',
      },
    ],
    exercise: {
      fa: '«اولین گردش‌کار هوشمند خود را طراحی کنید!» یک کار تکراری در کار، درس یا زندگی‌تان را پیدا کنید و مراحل خودکارکردنش را بنویسید.',
      en: '“Design Your First Intelligent Workflow!” Find one repetitive task in your work or life and map out how to automate it.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## چرا هوش مصنوعی در کسب‌وکار حیاتی شده؟

کاهش چشمگیر هزینه و سرعت اجرا: کارهای اداری، پشتیبانی و تولید محتوا در کسری از زمان انجام می‌شود. این یعنی مزیت رقابتی تازه‌ای که قبلاً در دسترس نبود.

## کاربردها به ترتیب حوزه

**بازاریابی:** پیشنهاد شخصی‌سازی‌شده‌ی محصول (مثل موتور پیشنهاد آمازون) و تبلیغات هدفمند. **فروش:** امتیازدهی هوشمند سرنخ‌ها تا نمایندگان فروش روی خریداران آماده تمرکز کنند. **منابع انسانی:** غربالگری هوشمند رزومه‌ها در چند ثانیه. **پزشکی:** تشخیص زودهنگام بیماری در تصاویر پزشکی (رادیولوژی، MRI، CT). **آموزش:** معلم خصوصی هوشمند که سرعت و سختی یادگیری را با دانش‌آموز تنظیم می‌کند. **محتوا:** تبدیل یک ویدیوی طولانی به کلیپ کوتاه، پست بلاگ و محتوای شبکه‌های اجتماعی.

## دو مطالعه‌ی موردی

**Klarna (پشتیبانی مشتری):** دستیار هوشمند سازمانی میلیون‌ها درخواست پشتیبانی را با کیفیت بالا حل کرد. **خرده‌فروشی و لجستیک:** پیش‌بینی تقاضا و انبار هوشمند — تحلیل روندهای فصلی، آب‌وهوا و سابقه‌ی خرید برای پیش‌موجودی‌کردن کالا قبل از سفارش.

## اتوماسیون هوشمند فرایند

سه قدم: ۱. **رویداد ماشه** — مثلاً رسیدن ایمیل جدید یا پیام مشتری. ۲. **پردازش هوشمند** — تشخیص محتوا، اولویت و اقدام لازم. ۳. **اقدام خودکار** — ثبت در صفحه‌گسترده، هشدار به تیم، یا ارسال پاسخ.

## سه سناریوی عملی

۱. **دسته‌بندی پیام مشتری:** تشخیص احساسات (فوری/عادی)، ثبت در Google Sheets و هشدار به تیم. ۲. **گزارش خودکار.** ۳. **پیگیری خودکار سرنخ فروش.**

## فرصت‌ها و چالش‌ها

فرصت: مقیاس‌پذیری سریع و چابک. چالش: کیفیت داده، حریم خصوصی، و آمادگی تیم.

## پرسش‌های پرتکرار

آیا فقط برای شرکت‌های بزرگ است؟ نه — ابزارهای SaaS و بدون کدنویسی برای کسب‌وکارهای کوچک و محلی هم در دسترس است.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## Why AI has become vital in business

Significant cost reduction and faster execution: admin tasks, support operations and content creation happen in a fraction of the time. That is a new competitive edge.

## Applications by domain

**Marketing:** hyper-personalized product recommendations (like Amazon’s engine) and precision advertising. **Sales:** intelligent lead scoring so reps focus on buyers ready to close. **HR:** screening hundreds of resumes in seconds. **Medicine:** early disease detection in medical imaging (X-rays, MRI, CT). **Education:** a personalized tutor that adapts pace and difficulty per student. **Content:** turning one long video into clips, a blog post and social media.

## Two case studies

**Klarna (customer support):** an enterprise AI assistant resolved millions of support tickets at quality. **Retail & logistics:** predictive demand and smart warehousing — analyzing seasonal trends, weather and buying history to pre-stock before orders.

## Intelligent process automation

Three steps: 1. **Trigger event** — a new email or customer message. 2. **Intelligent processing** — reading content, priority and required action. 3. **Automated action** — logging to a spreadsheet, alerting the team or sending a reply.

## Three practical scenarios

1. **Customer-message triage:** detect sentiment (urgent vs standard), log to Google Sheets, alert the team. 2. **Automated reporting.** 3. **Automated sales-lead follow-up.**

## Opportunities & considerations

Opportunity: rapid scalability for agile teams. Challenges: data quality, privacy and team readiness.

## FAQ

Is AI adoption reserved for large enterprises? No — accessible SaaS and no-code platforms let small businesses and local shops start too.`,
    },
    slides: { count: 20 },
    pdf: {
      fa: '/courses/ai-session-6-fa.pdf',
      en: '/courses/ai-session-6-en.pdf',
    },
  },
  {
    slug: 'ai-session-7',
    order: 7,
    status: 'published',
    publishedAt: '2026-11-09',
    title: {
      fa: 'داده‌ها، سوخت واقعی هوش مصنوعی',
      en: 'Data: The Real Fuel of Artificial Intelligence',
    },
    summary: {
      fa: 'کیفیت داده؛ سوگیری، overfitting و داده‌ی ناکافی؛ حریم خصوصی و جمع‌آوری داده. دمو: تأثیر داده‌ی بد روی خروجی مدل.',
      en: 'Data quality; bias, overfitting and insufficient data; privacy and data collection. Demo: the effect of bad data on model output.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      {
        fa: 'چرا داده‌ی باکیفیت مهم‌تر از داده‌ی زیاد است',
        en: 'Why data quality matters far more than quantity',
      },
      {
        fa: 'سه مشکل رایج: سوگیری، overfitting (حفظ‌کردن) و داده‌ی ناکافی',
        en: 'Three common pitfalls: data bias, overfitting and insufficient data',
      },
      {
        fa: 'حریم خصوصی: چه اطلاعاتی نباید به هوش مصنوعی داد',
        en: 'Privacy: what information must never be submitted to AI tools',
      },
      {
        fa: 'آماده‌سازی داده‌ی باکیفیت برای مدل‌های هوش مصنوعی',
        en: 'How to prepare better data for AI models',
      },
    ],
    takeaways: [
      {
        fa: 'داده‌ی بد یعنی یادگیری بد؛ حتی بهترین مدل‌ها بدون داده‌ی خوب شکست می‌خورند.',
        en: 'Garbage in, garbage out: even state-of-the-art models fail without quality data.',
      },
      {
        fa: 'مثال واقعی: ابزار استخدام آمازون به‌دلیل داده‌ی تاریخی یک‌طرفه شکست خورد.',
        en: 'Real case: Amazon’s AI recruiting tool failed due to one-sided historical data.',
      },
      {
        fa: 'هالوسینیشن چت‌بات‌ها واقعی است؛ آمار و ادعاهای علمی را راستی‌آزمایی کنید.',
        en: 'Chatbot hallucination is real; fact-check statistics and scientific claims.',
      },
      {
        fa: 'قبل از آپلود فایل به ابزارهای هوش مصنوعی، نام و شماره و شناسه‌ها را حذف کنید.',
        en: 'Before uploading to AI tools, remove names, phone numbers and personal identifiers.',
      },
      {
        fa: 'سوگیری را به صفر مطلق نمی‌توان رساند، ولی با تنوع داده و بازبینی مستمر می‌توان کاهشش داد.',
        en: 'Bias cannot be reduced to absolute zero, but data diversity and continuous auditing minimize it.',
      },
    ],
    exercise: {
      fa: '«کارآگاه کیفیت داده!» یک جدول یا متن شلوغ و ناقص را در دو مرحله به هوش مصنوعی بدهید و خروجی‌ها را مقایسه کنید؛ تفاوت‌ها را یادداشت کنید.',
      en: '“Data Quality Detective!” Submit a messy, incomplete table or text to AI in two stages and compare the responses — note the differences.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## چرا داده سوخت واقعی هوش مصنوعی است؟

الگوریتم مثل موتور مسابقه‌ای است؛ حتی پیشرفته‌ترین موتور بدون سوخت باکیفیت یک قدم هم حرکت نمی‌کند. هوش مصنوعی قواعد پنهان را از تصاویر، متن‌ها و تجربه‌های ثبت‌شده استخراج می‌کند — بدون داده، چیزی برای استخراج نیست.

## کیفیت مهم‌تر از کمیت

داده‌ی زیاد با کیفیت پایین مثل خواندن هزار کتاب پر از غلط املایی و اطلاعات نادرست است — دانش‌آموز را گیج‌تر می‌کند. داده‌ی باکیفیت سه ویژگی دارد: **دقت** (بدون خطا و برچسب اشتباه)، **تنوع** (پوشش همه‌ی سناریوها و محیط‌ها) و **تازگی** (به‌روز بودن).

## سه مشکل رایج

**سوگیری داده:** وقتی داده‌ی آموزشی یک‌طرفه باشد، هوش مصنوعی نگاه کج و ناعادلانه پیدا می‌کند — مثلاً مدل تشخیص صدا که فقط با لهجه‌ی استاندارد آموزش دیده باشد. **Overfitting (حفظ‌کردن):** مثل دانش‌آموزی که سؤال‌های امتحان قبلی را حفظ کرده و با تغییر یک عدد نمره‌ی صفر می‌گیرد. **داده‌ی ناکافی:** قضاوت عجولانه — مثل قضاوت درباره‌ی آب‌هوای یک شهر بر اساس یک بعدازظهر بارانی.

## درس تاریخی: شکست ابزار استخدام آمازون

آمازون سیستمی برای غربالگری رزومه ساخت که روی ۱۰ سال داده‌ی تاریخی متقاضیان آموزش دیده بود. مشکل: اکثر رزومه‌های فنی متعلق به مردان بود و مدل یاد گرفت زنان را کنار بگذارد. نتیجه: ابزار کنار گذاشته شد — داده‌ی گذشته همیشه منصفانه نیست.

## حریم خصوصی و امنیت

چت‌بات‌های عمومی به‌طور پیش‌فرض ممکن است پرامپت‌ها و فایل‌های شما را برای آموزش مدل‌های بعدی استفاده کنند. هرگز شماره ملی، اطلاعات بانکی و اسناد محرمانه را ارسال نکنید. قوانین امنیتی: **ناشناس‌سازی داده** قبل از آپلود، **غیرفعال‌کردن آموزش** در تنظیمات، و احتیاط در اشتراک‌گذاری.

## آماده‌سازی داده‌ی باکیفیت

قدم اول **پاک‌سازی:** حذف ردیف‌های تکراری، اصلاح غلط‌های املایی، رفع سلول‌های خالی. قدم دوم **استانداردسازی:** یکدست‌کردن قالب تاریخ، واحد پول و اندازه‌گیری‌ها.

## پرسش‌های پرتکرار

آیا سوگیری را می‌توان به صفر رساند؟ تقریباً غیرممکن است، ولی تنوع داده و بازبینی مستمر آن را به‌شدت کاهش می‌دهد. چقدر داده لازم است؟ بسته به مسئله، از چندصد نمونه تا میلیون‌ها رکورد.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## Why data is the real fuel of AI

The algorithm is like a race-car engine: even the most advanced engine won’t move an inch without high-quality fuel. AI extracts underlying rules from images, texts and recorded experiences — without data, there is nothing to extract from.

## Quality beats quantity

Massive low-quality data is like reading a thousand books full of typos and false information — it only confuses a student further. High-quality data has three traits: **accuracy** (no errors or wrong labels), **diversity** (covering all scenarios and environments) and **freshness** (up to date).

## Three common pitfalls

**Data bias:** one-sided training data makes AI skewed and unfair — e.g. a voice model trained only on a standard accent. **Overfitting (memorization):** like a student who memorized past exam questions word-for-word and scores zero when one number changes. **Insufficient data:** hasty conclusions — like judging a city’s year-round climate from one rainy afternoon.

## Historical case: Amazon’s AI recruiting tool

Amazon built an AI to screen resumes, trained on 10 years of historical applicant data. The flaw: most technical resumes came from men, and the model learned to penalize women. The tool was scrapped — past data is not always fair.

## Privacy & security

Public chatbots may use the prompts and files you submit to train future model versions. Never submit national IDs, bank details or confidential documents. Golden rules: **anonymize data** before uploading, **opt out of training** in settings, and share carefully.

## Preparing better data

Step 1 **cleaning:** remove duplicate rows, fix spelling errors, resolve blank cells. Step 2 **standardization:** unify date formats, currency units and measurements.

## FAQ

Can data bias be reduced to absolute zero? Nearly impossible, but diversifying data and continuous auditing minimize it substantially. How much data is needed? Depending on the problem, anywhere from hundreds of samples to millions of records.`,
    },
    slides: { count: 19 },
    pdf: {
      fa: '/courses/ai-session-7-fa.pdf',
      en: '/courses/ai-session-7-en.pdf',
    },
  },
  {
    slug: 'ai-session-8',
    order: 8,
    status: 'published',
    publishedAt: '2026-11-09',
    title: {
      fa: 'اخلاق، چالش‌ها و خطرات هوش مصنوعی',
      en: 'Ethics, Challenges and Risks of Artificial Intelligence',
    },
    summary: {
      fa: 'سوگیری الگوریتمیک؛ دیپ‌فیک، اطلاعات غلط و ریسک‌های امنیتی؛ شغل‌ها و جایگزینی؛ پاسخگویی و قانون‌گذاری.',
      en: 'Algorithmic bias; deepfakes, misinformation and security risks; jobs and replacement; accountability and regulation.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      {
        fa: 'سوگیری الگوریتمیک و سه ریشه‌ی اصلی آن',
        en: 'Algorithmic bias and its three main roots',
      },
      {
        fa: 'دیپ‌فیک، اطلاعات غلط و ریسک‌های امنیتی',
        en: 'Deepfakes, misinformation and security risks',
      },
      {
        fa: 'تأثیر هوش مصنوعی بر شغل‌ها و مسئولیت‌پذیری',
        en: 'Impact on jobs and accountability',
      },
      {
        fa: 'قانون‌گذاری جهانی (مثل EU AI Act) و اصول استفاده‌ی مسئولانه',
        en: 'Global regulation (e.g. EU AI Act) and responsible-use principles',
      },
    ],
    takeaways: [
      {
        fa: 'هوش مصنوعی بی‌طرف نیست؛ سوگیری می‌تواند در تصمیم‌های حیاتی مثل وام و استخدام اثر بگذارد.',
        en: 'AI is not neutral; bias can affect critical decisions like loans and hiring.',
      },
      {
        fa: 'دیپ‌فیک و اطلاعات جعلی تهدیدهای واقعی‌اند؛ منبع اطلاعات را همیشه بررسی کنید.',
        en: 'Deepfakes and fake content are real threats; always verify the source.',
      },
      {
        fa: 'هوش مصنوعی جای انسان را نمی‌گیرد؛ ولی مهارت‌های جدید و تغییر شغل‌ها اجتناب‌ناپذیر است.',
        en: 'AI won’t replace humans, but new skills and job transformations are inevitable.',
      },
      {
        fa: 'پاسخگویی: اگر هوش مصنوعی اشتباه کند، تقصیر کیست؟ برنامه‌نویس، سازنده، تأمین‌کننده‌ی داده؟',
        en: 'Accountability: when AI errs, is the fault the programmer, manufacturer or data provider?',
      },
      {
        fa: 'آگاهی بهتر از ترس است؛ درک چالش‌ها ما را کاربران هوشمند و مقاوم می‌کند.',
        en: 'Awareness beats fear; understanding challenges makes us resilient, intelligent users.',
      },
    ],
    exercise: {
      fa: '«ممیز اخلاق هوش مصنوعی شوید!» یکی از دو آزمایش را انجام دهید: تشخیص سوگیری در خروجی یک مدل، یا راستی‌آزمایی ادعاهای آن. یافته‌هایتان را در چند خط بنویسید.',
      en: '“Become an AI Ethics Auditor!” Do one of two experiments: spot bias in a model’s output, or fact-check its claims. Document your findings in a few concise lines.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## چرا اخلاق در هوش مصنوعی مهم است؟

هوش مصنوعی در تصمیم‌های حیاتی وارد شده: تأیید وام، استخدام، تشخیص پزشکی و حتی احکام قضایی. خطا در این سطح، با سرعت و مقیاس زیاد، زندگی انسان‌ها را مستقیم تحت تأثیر قرار می‌دهد.

## سوگیری الگوریتمیک چیست؟

تمایل سیستماتیک و تکرارشونده‌ی یک سیستم هوش مصنوعی به تولید نتایج ناعادلانه. افسانه‌ی بی‌طرفی ماشین: برخلاف تصور رایج، ماشین‌ها بی‌طرف نیستند — چون داده‌هایی که از آن‌ها یاد گرفته‌اند، خودشان ممکن است یک‌طرفه باشند.

سه ریشه‌ی اصلی: **داده‌ی نامتعادل** (گروه‌های جمعیتی یا زبانی کمتر نمایش داده شده‌اند)، **طراحی مدل و وزن‌دهی** (الگوریتم‌ساز ممکن است ناخواسته سوگیری وارد کند)، و **بازخورد معیوب** (خروجی نادرست که به چرخه‌ی آموزش برمی‌گردد).

مثال واقعی: سیستم تشخیص چهره با دقت بالای ۹۹٪ برای پوست‌های روشن ولی خطای بیش از ۳۰٪ برای پوست‌های تیره — به‌دلیل عکس‌های آموزشی ناقص.

## دیپ‌فیک و اطلاعات جعلی

دیپ‌فیک یعنی ساخت چهره، حرکت لب و صدا با یادگیری عمیق — خطرات مالی و اعتباری جدی. و در کنارش، پدیده‌ی هالوسینیشن: چت‌بات‌ها با اعتمادبه‌نفس کامل آمار، رویدادهای تاریخی و ارجاعات علمی جعلی می‌سازند.

## امنیت سایبری

فیشینگ هوشمند: ایمیل‌های شخصی‌سازی‌شده‌ی بی‌نقص برای سرقت اطلاعات. و نشت داده‌های محرمانه‌ی شرکت‌ها: ریسک افشای کد منبع و اسرار تجاری.

## تأثیر بر بازار کار

خودکارسازی کارهای تکراری (نه حذف شغل‌ها): ورود اطلاعات ساده، ترجمه‌ی پایه و خلاصه‌سازی به ماشین‌ها سپرده می‌شود. شغل‌ها تغییر شکل می‌دهند و مهارت‌های تازه می‌آید.

## پاسخگویی و قانون‌گذاری

مثال چالش‌برانگیز: تصادف خودروی خودران یا خطای پزشکی — تقصیر برنامه‌نویس است، سازنده، تأمین‌کننده‌ی داده، یا مسافر؟ قانون‌گذاری جهانی مثل **EU AI Act** سیستم‌ها را بر اساس ریسک دسته‌بندی می‌کند.

چالش‌های اخلاقی دیگر: **کپی‌رایت** (آموزش مدل روی آثار هنرمندان بدون اجازه)، **شفافیت** (جعبه‌ی سیاه تصمیم‌ها).

## اقدامات عملی برای هر گروه

**کاربران عادی:** آمار و ادعاهای علمی را راستی‌آزمایی کنید؛ هوش مصنوعی را به‌عنوان دستیار یادگیری استفاده کنید، نه برای تقلب. **تولیدکنندگان محتوا:** شفاف با مخاطب باشید درباره‌ی استفاده از هوش مصنوعی.

## یک سناریوی بحث‌برانگیز

بیمارستانی سیستم هوش مصنوعی خریده که با دقت ۹۵٪ بیماری تشخیص می‌دهد، ولی در ۵٪ موارد اشتباه می‌کند و هیچ‌کس دلیلش را نمی‌فهمد. آیا باید از آن استفاده کرد؟ این سؤال اخلاقی را در کلاس بحث می‌کنیم.

## پرسش‌های پرتکرار

آیا هوش مصنوعی مثل فیلم‌های علمی‌تخیلی علیه بشریت شورش می‌کند؟ نه. مدل‌های فعلی خودآگاهی، اراده و احساس ندارند؛ خطر واقعی سوءاستفاده‌ی انسانی، بی‌احتیاطی و اعتماد بیش از حد است.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## Why ethics in AI matters

AI is now integrated into critical decisions: loan approvals, hiring, medical diagnosis and even judicial sentencing. Errors at this scale and speed directly affect human lives.

## What is algorithmic bias?

The systematic, repeatable tendency of an AI system to produce unfair outcomes. The myth of machine neutrality: machines are not neutral — the data they learn from can itself be one-sided.

Three main roots: **imbalanced training data** (underrepresented demographic, linguistic or cultural groups), **model design and weighting** (unintentional bias from algorithm designers), and **flawed feedback loops** (wrong outputs feeding back into training).

Real example: facial recognition systems with over 99% accuracy for lighter skin tones versus over 30% error rates for darker skin — because of flawed training photos.

## Deepfakes and fake content

Deepfakes are hyper-realistic synthesis of faces, lip movements and voices using deep learning — with serious financial and reputational risks. And the hallucination phenomenon: chatbots fabricating statistics, historical events or scientific citations with supreme confidence.

## Cybersecurity

Smart phishing: highly personalized, flawless emails to steal credentials. Corporate data leakage: risks of exposing source code and trade secrets.

## Impact on jobs

Automation of repetitive tasks (not job elimination): routine data entry, basic translation and summarization are delegated to machines. Jobs evolve and new skills emerge.

## Accountability and regulation

A challenging example: autonomous vehicle crash or medical error — is the fault the programmer, manufacturer, data provider or passenger? Global regulation like the **EU AI Act** categorizes systems by risk level.

Additional ethical dimensions: **copyright** (training on artists’ works without consent), **transparency** (the black-box problem).

## Practical actions

**Everyday users:** fact-check critical statistics and scientific claims; use AI as a learning assistant, not for plagiarism. **Content creators:** maintain transparency with your audience about AI usage.

## A thought challenge

A hospital buys an AI system that diagnoses diseases with 95% accuracy but makes errors in 5% of cases and no one knows why. Should it be used? We discuss this ethical scenario in class.

## FAQ

Will AI rebel against humanity like in sci-fi movies? No. Current models lack self-awareness, volition and emotion; the real danger is human misuse, negligence or over-reliance.`,
    },
    slides: { count: 20 },
    pdf: {
      fa: '/courses/ai-session-8-fa.pdf',
      en: '/courses/ai-session-8-en.pdf',
    },
  },
  {
    slug: 'ai-session-9',
    order: 9,
    status: 'published',
    publishedAt: '2026-11-09',
    title: {
      fa: 'ساخت اولین پروژه‌ی هوش مصنوعی خودتان',
      en: 'Build Your Very First Artificial Intelligence Project',
    },
    summary: {
      fa: 'پروژه‌های بدون کد: چت‌بات ساده، طبقه‌بند تصویر یا تولیدکننده‌ی محتوا؛ ابزارهایی مثل n8n، Make، Google AI Studio و Hugging Face Spaces.',
      en: 'A practical guide to building intelligent tools without coding: chatbot, image classifier or content generator; Google AI Studio, Teachable Machine, Make, n8n and Hugging Face Spaces.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      {
        fa: 'چرا بدون کدنویسی هم می‌توان پروژه‌ی هوش مصنوعی ساخت',
        en: 'Why anyone can build AI projects without coding',
      },
      {
        fa: 'سه ایده‌ی ساده برای اولین پروژه: چت‌بات، طبقه‌بند تصویر، کارخانه‌ی محتوا',
        en: 'Three simple project ideas: chatbot, image classifier, content factory',
      },
      {
        fa: 'کار با Google AI Studio، Teachable Machine، Make و n8n',
        en: 'Working with Google AI Studio, Teachable Machine, Make and n8n',
      },
      {
        fa: 'چهار قدم طلایی: مسئله‌ی مشخص، داده‌ی تمیز، ساخت، ارائه',
        en: 'Four golden steps: concrete problem, clean data, build, present',
      },
    ],
    takeaways: [
      {
        fa: 'مثل ساختن با لگو: مدل‌های آماده را مثل قطعات به هم وصل می‌کنید.',
        en: 'Like assembling Lego bricks: connect pre-built models into solutions.',
      },
      {
        fa: 'مسئله‌ی کوچک و مشخص بهتر از «خودکارسازی کل شرکت» است — از «خلاصه‌سازی نظرات مشتری» شروع کنید.',
        en: 'A small, focused problem beats “automate the entire company” — start with “summarize customer reviews”.',
      },
      {
        fa: 'پروژه‌ی ساده‌ای که یک نیاز واقعی را حل کند، هزار برابر ارزشمندتر از مفهوم پیچیده‌ی روی کاغذ است.',
        en: 'A simple working project solving one real need is a thousand times more valuable than a complex concept on paper.',
      },
      {
        fa: 'برای چت‌بات‌ها حصار امنیتی مشخص بگذارید: چه بگوید، چه نگوید.',
        en: 'Set clear guardrails for chatbots: what to say and what not to say.',
      },
      {
        fa: 'فرمول ارائه‌ی حرفه‌ای: مشکل → راه‌حل → نتیجه (زمان یا هزینه‌ی صرفه‌جویی‌شده).',
        en: 'The storytelling formula: problem → solution → impact (time or cost saved).',
      },
    ],
    exercise: {
      fa: '«اولین مینی‌پروژه‌ی خود را بسازید و ارائه دهید!» یکی از سه ایده‌ی جلسه را انتخاب کنید (چت‌بات دانش‌محور، طبقه‌بند تصویر، یا کارخانه‌ی محتوا) و با ابزارهای معرفی‌شده بسازید.',
      en: '“Build & Present Your First Mini-Project!” Pick one of today’s three project ideas (knowledge chatbot, image classifier or content factory) and build it with the tools introduced today.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## انقلاب بدون کدنویسی

دو دلیل: ۱. مدل‌های پیشرفته توسط شرکت‌های بزرگ آماده شده‌اند — ما فقط مثل لگو به هم وصل‌شان می‌کنیم. ۲. زبان طبیعی زبان جدید برنامه‌نویسی است: با جمله‌ی ساده می‌توانید به هوش مصنوعی دستور بدهید.

## سه ایده‌ی ساده برای اولین پروژه

**چت‌بات تخصصی:** دستیاری که بر اساس اسناد مرجع شما به سؤالات مشتریان یا دانش‌جویان پاسخ دهد. **طبقه‌بند هوشمند تصویر یا صدا:** مثلاً تشخیص «محصول سالم/معیوب» یا «برگ سالم/بیمار». **کارخانه‌ی تولید محتوا:** فقط موضوع را وارد کنید، بقیه ستون‌ها خودکار تولید شوند.

## پلتفرم‌ها

**Google AI Studio:** بهترین نقطه‌ی شروع — دستورات سیستمی بنویسید، فایل مرجع آپلود کنید، و چت‌بات چندوجهی بسازید. **Teachable Machine:** آموزش مدل تشخیص تصویر و صدا در مرورگر، بدون نصب. **Hugging Face Spaces:** هزاران پروژه‌ی آماده از حذف پس‌زمینه تا سنتز صدا. **Make و n8n:** اتصال هوش مصنوعی به ابزارهای روزمره مثل تلگرام و Gmail با طراحی بصری drag-and-drop.

## سه پروژه‌ی نمونه

**پروژه ۱:** چت‌بات پشتیبانی یا آموزشی با Google AI Studio — دستور سیستمی: «مشاور پذیرش دانشگاه هستی؛ مودبانه و صرفاً بر اساس سند پیوست‌شده پاسخ بده.»

**پروژه ۲:** مدل تشخیص تصویر در ۱۰ دقیقه با Teachable Machine — دو کلاس تعریف کنید، عکس بگیرید، آموزش دهید.

**پروژه ۳:** کارخانه‌ی تولید محتوا با Google Sheets + Make + API مدل زبانی — موضوع در یک ردیف، بقیه ستون‌ها خودکار.

## چهار قدم طلایی

۱. مسئله‌ی مشخص و متمرکز تعریف کنید. ۲. داده‌ی تمیز آماده کنید. ۳. بسازید. ۴. ارائه دهید — با فرمول «مشکل → راه‌حل → نتیجه».

## نکات سازنده

ساده نگه دارید و کوچک شروع کنید؛ برای چت‌بات‌ها حصار مشخص بگذارید؛ و همیشه یک دموی زنده همراه ارائه داشته باشید.

## پرسش‌های پرتکرار

آیا Google AI Studio و Teachable Machine رایگان‌اند؟ بله، هر دو رایگان. آیا پروژه‌های بدون کدنویسی حرفه‌ای هستند؟ بله — بسیاری از راه‌حل‌های واقعی کسب‌وکارها با همین ابزارها ساخته شده‌اند.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## The no-code revolution

Two reasons: 1. Sophisticated models are pre-trained by tech giants — we just connect them like Lego pieces. 2. Natural language is the new universal programming interface.

## Three simple project ideas

**Specialized chatbot:** an assistant that answers customer or student questions based on your reference documents. **Smart image/audio classifier:** e.g. “healthy vs defective products” or “healthy vs diseased plant leaves”. **Automated content factory:** enter a topic and all remaining columns generate automatically.

## Platforms

**Google AI Studio:** best starting point — define system instructions, upload reference files, build multimodal assistants. **Teachable Machine:** train image and audio recognition models in the browser. **Hugging Face Spaces:** thousands of free ready-to-use ML apps. **Make and n8n:** connect AI to Telegram, Gmail and more with visual drag-and-drop workflows.

## Three sample projects

**Project 1:** support/educational chatbot with Google AI Studio — system instructions: “You are an academic admissions advisor; answer politely and strictly based on the attached reference document.”

**Project 2:** image recognition model in 10 minutes with Teachable Machine — define two classes, capture images, train.

**Project 3:** automated content factory with Google Sheets + Make + LLM API — enter a topic in a row, generate everything else.

## Four golden steps

1. Define a concrete, focused problem. 2. Curate clean data. 3. Build it. 4. Present it — using the “problem → solution → impact” formula.

## Creator’s secrets

Keep it simple and start small; set clear guardrails for chatbots; always include a live demo with your presentation.

## FAQ

Are Google AI Studio and Teachable Machine free? Yes, both free. Do no-code projects hold professional value? Yes — many real business solutions are built with exactly these tools.`,
    },
    slides: { count: 20 },
    pdf: {
      fa: '/courses/ai-session-9-fa.pdf',
      en: '/courses/ai-session-9-en.pdf',
    },
  },
  {
    slug: 'ai-session-10',
    order: 10,
    status: 'published',
    publishedAt: '2026-11-09',
    title: {
      fa: 'آینده‌ی هوش مصنوعی و مسیر شغلی شما',
      en: 'The Future of AI and Your Career Path',
    },
    summary: {
      fa: 'روندهای آینده (AGI، عامل‌ها، چندوجهی، هوش مصنوعی شخصی)؛ مهارت‌های پرتقاضا؛ مسیرهای شغلی؛ نقشه‌ی راه یادگیری شخصی؛ جمع‌بندی و اعطای گواهی.',
      en: 'Future trends (AGI, agents, multimodal, personal AI); in-demand skills; career paths; a personal learning roadmap; course wrap-up and certificate.',
    },
    level: { fa: 'مقدماتی', en: 'Beginner' },
    duration: { fa: '۶۰ دقیقه', en: '60 minutes' },
    learningOutcomes: [
      {
        fa: 'روندهای آینده: AGI، عامل‌های خودمختار، هوش چندوجهی و دستیار شخصی',
        en: 'Future trends: AGI, autonomous agents, multimodal and personal AI',
      },
      {
        fa: 'مهارت‌های پرتقاضای عصر هوش مصنوعی',
        en: 'High-demand skills in the age of AI',
      },
      {
        fa: 'مسیرهای شغلی تازه برای برنامه‌نویسان و غیربرنامه‌نویسان',
        en: 'Emerging career paths for programmers and non-programmers',
      },
      {
        fa: 'نقشه‌ی راه یادگیری شخصی برای ماه‌های آینده',
        en: 'A personal learning roadmap for the months ahead',
      },
    ],
    takeaways: [
      {
        fa: 'هوش مصنوعی از ابزار منفعل به شریک فعال و خودمختار می‌رسد.',
        en: 'AI is moving from reactive tools to active, autonomous partners.',
      },
      {
        fa: 'AGI یعنی هوش مصنوعی هم‌تراز انسان در همه‌ی حوزه‌ها — هنوز محقق نشده ولی مسیر روشن است.',
        en: 'AGI means human-level intelligence across all domains — not achieved yet, but the path is clear.',
      },
      {
        fa: 'مهارت‌های کلیدی: تفکر انتقادی، پرامپت‌نویسی ساختاریافته و ترکیب ابزارها.',
        en: 'Key skills: critical thinking, structured prompting and tool orchestration.',
      },
      {
        fa: 'برای غیربرنامه‌نویسان: تخصص خودتان را با هوش مصنوعی تقویت کنید و نمونه‌کار قابل‌تأیید بسازید.',
        en: 'For non-programmers: supercharge your existing domain with AI and build a verifiable portfolio.',
      },
      {
        fa: '«هوش مصنوعی جای شما را نمی‌گیرد؛ ولی کسی که با هوش مصنوعی کار می‌کند، جای کسی را می‌گیرد که نمی‌کند.»',
        en: '“AI will not replace you; but a person using AI will replace someone who does not.”',
      },
    ],
    exercise: {
      fa: 'نقشه‌ی راه یادگیری خودتان را بنویسید: ماه اول تسلط بر دو ابزار اصلی (ChatGPT و Claude)، ماه دوم ساخت یک گردش‌کار اتوماسیون، و ماه سوم ساخت و ارائه‌ی یک پروژه‌ی کوچک.',
      en: 'Write your personal learning roadmap: month 1 — master ChatGPT and Claude; month 2 — build an end-to-end automation workflow; month 3 — build and present a small project.',
    },
    notes: {
      fa: `> **TODO (بررسی متن):** این یادداشت‌ها از روی اسلایدهای جلسه نوشته شده و برای انتشار نهایی به تأیید شما نیاز دارد.

## هوش مصنوعی به کجا می‌رود؟

از ابزار منفعل به شریک فعال: دیگر فقط پاسخ نمی‌دهد؛ خودش پروژه‌های پیچیده را برنامه‌ریزی، مدیریت و اجرا می‌کند. و ادغام بی‌درنگ در زندگی روزمره و دستگاه‌های محیطی.

## AGI چیست؟

هوش مصنوعی عمومی: نسلی از هوش مصنوعی که بتواند در هر حوزه‌ی فکری، علمی یا خلاقانه هم‌تراز یا فراتر از تخصص انسان عمل کند. تفاوت با مدل‌های فعلی: AGI هنوز محقق نشده، ولی مسیر روشن است.

## عامل‌های هوش مصنوعی

سیستمی که به‌جای تک‌پرامپت، یک هدف نهایی می‌گیرد و خودش برنامه‌ریزی، تکرار و اجرا می‌کند — مثلاً برنامه‌ریزی سفر یا خرید.

## هوش چندوجهی

مدل‌های مدرن هم‌زمان متن، تصویر، صدا، ویدیو و کد را درک و تحلیل می‌کنند. تعامل با کامپیوتر مثل حرف زدن با انسان.

## دستیار شخصی

دستیاری که سبک نوشتن، اهداف شغلی و تاریخچه‌ی پروژه‌هایتان را می‌شناسد — مربی سلامت و مشاور یادگیری اختصاصی.

## مهارت‌های پرتقاضا

**تفکر انتقادی:** ارزیابی خروجی مدل‌ها، تشخیص هالوسینیشن و هدایت بازبینی. **پرامپت‌نویسی ساختاریافته:** تسلط بر سؤال‌گذاری مؤثر. **ترکیب ابزارها:** اتصال هوش مصنوعی به گردش‌کارهای واقعی.

## مسیرهای شغلی تازه

**متخصص اتوماسیون گردش‌کار:** با ابزارهای بدون کد مثل Make و n8n. **تولیدکننده‌ی محتوای هوش مصنوعی.** و برای غیربرنامه‌نویسان: تخصص موجود خودتان (حسابداری، مدیریت، طراحی، آموزش) را با هوش مصنوعی تقویت کنید — بهتر از شروع برنامه‌نویسی از صفر.

## نقشه‌ی راه شخصی

ماه ۱: تسلط بر ChatGPT و Claude با تمرین روزانه‌ی پرامپت. ماه ۲: ساخت یک گردش‌کار اتوماسیون کامل. ماه ۳: ساخت و ارائه‌ی یک پروژه‌ی کوچک.

## منابع پیشنهادی

خبرنامه‌ها و نشریات: The Batch، TL;DR AI و بلاگ‌های رسمی OpenAI، Google DeepMind و Anthropic. و پلتفرم‌های تخصصی بدون کد.

## جمع‌بندی ۱۰ جلسه

از مغز مصنوعی و شبکه‌های عصبی تا هوش مولد، ابزارهای روزمره، کاربرد کسب‌وکار، داده، اخلاق، ساخت پروژه — و حالا مسیر شغلی شما.

## یادداشت مدرس

«هوش مصنوعی جای شما را نمی‌گیرد؛ ولی کسی که با هوش مصنوعی کار می‌کند، جای کسی را می‌گیرد که نمی‌کند.» امروز اولین گام بزرگ را برداشتید؛ سفر واقعی همین حالا شروع می‌شود!

## گواهی شرکت

با تکمیل ۱۰ جلسه و ارائه‌ی تمرین‌ها، گواهی رسمی «ورود به دنیای هوش مصنوعی» دریافت می‌کنید.

## پرسش‌های پرتکرار

آیا باید پایتون یاد بگیرم؟ نه — پلتفرم‌های بدون کد و پرامپت‌نویسی ساختاریافته بیش از ۹۰٪ کاربردهای عملی را باز می‌کنند.`,
      en: `> **TODO (review):** These notes were written from the session slides and need your approval before publishing.

## Where is AI heading?

From reactive tools to active, autonomous partners: AI no longer just answers questions — it independently plans, manages and executes complex projects. And seamless integration into daily life and ambient devices.

## What is AGI?

Artificial General Intelligence: a generation of AI that can match or exceed human expertise across any intellectual, scientific or creative domain. Difference from today’s models: AGI is not achieved yet, but the path is clear.

## AI Agents

A software system that accepts an end objective and autonomously plans, iterates and executes — e.g. planning a trip or shopping.

## Multimodal AI

Modern models simultaneously perceive, synthesize and analyze text, images, audio, video and code. Interacting with computers as effortlessly as speaking to a person.

## Personal AI assistants

An assistant that knows your writing style, career goals and project history — a dedicated health coach and learning advisor.

## High-demand skills

**Critical thinking:** evaluating model outputs, detecting hallucinations and guiding refinements. **Structured prompting:** mastering effective inquiry. **Tool orchestration:** connecting AI into real workflows.

## Emerging career paths

**Workflow automation specialist:** leveraging no-code platforms like Make and n8n. **AI content creator.** For non-programmers: supercharge your existing domain (accounting, management, design, education) with AI — better than learning coding from scratch.

## Personal learning roadmap

Month 1: master ChatGPT and Claude with daily prompting practice. Month 2: build an end-to-end automation workflow. Month 3: build and present a small project.

## Recommended resources

Newsletters & research: The Batch, TL;DR AI and official blogs from OpenAI, Google DeepMind and Anthropic. Plus specialized no-code platforms.

## Takeaways across 10 sessions

From the artificial brain and neural networks to generative AI, everyday tools, business applications, data, ethics, building projects — and now your career path.

## Instructor’s note

“AI will not replace you; but a person using AI will replace someone who does not.” Today you took the first major leap; the real journey begins right now!

## Certificate

Upon completing these 10 sessions and submitting your exercises, you receive the official Certificate of Completion for “Introduction to the World of AI”.

## FAQ

Do I need to learn Python? No — modern no-code platforms and structured prompting unlock over 90% of practical applications.`,
    },
    slides: { count: 18 },
    pdf: {
      fa: '/courses/ai-session-10-fa.pdf',
      en: '/courses/ai-session-10-en.pdf',
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
