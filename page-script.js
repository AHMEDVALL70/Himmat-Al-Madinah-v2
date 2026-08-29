
        // ========== البيانات ==========
        const districtsData = {
            riyadh: {'العليا':1.5,'السليمانية':1.3,'الملز':1.1,'الورود':1.4,'الرحمانية':1.2,'المحمدية':1.5,'الرائد':1.3,'النخيل':1.4,'أم الحمام':1.2,'المعذر':1.3,'الهدا':1.1,'الشفا':0.9,'بدر':0.8,'المروة':1.0,'ديراب':0.7,'نمار':0.9,'العريجاء':0.8,'البديعة':0.9,'السويدي':0.8,'الديرة':0.9,'الشميسي':0.8,'العود':0.9,'المرقب':0.9,'الربوة':1.1,'الريان':1.2,'الروابي':1.0,'النسيم':1.0,'المنار':1.1,'النهضة':1.0,'الخليج':1.2,'غرناطة':1.3,'قرطبة':1.4,'اليرموك':1.2,'الرمال':1.3,'القادسية':1.2,'الملقا':1.5,'حطين':1.4,'العقيق':1.4,'الصحافة':1.3,'الياسمين':1.5,'النرجس':1.6,'العارض':1.3,'القيروان':1.4,'الربيع':1.3,'الغدير':1.3,'النفل':1.4,'الوادي':1.2,'التعاون':1.3,'الازدهار':1.2,'المرسلات':1.3,'الفلاح':1.1,'الواحة':1.1,'الملك فهد':1.3,'الملك عبدالله':1.3,'الجزيرة':1.0,'الفيحاء':1.1,'المنصورة':0.9,'العزيزية':1.0,'الدار البيضاء':1.1},
            jeddah: {'الروضة':1.5,'الزهراء':1.4,'السلامة':1.3,'النهضة':1.1,'الشاطئ':1.6,'المحمدية':1.5,'الخالدية':1.3,'النعيم':1.0,'النزهة':1.2,'البوادي':1.1,'الربوة':1.1,'الصفا':1.2,'الفيصلية':1.3,'الرحاب':1.0,'مشرفة':1.1,'العزيزية':1.0,'الورود':1.3,'بني مالك':1.2,'النسيم':1.0,'الواحة':1.1,'السامر':1.2,'المنار':1.1,'الريان':1.2,'الجامعة':1.1,'الفيحاء':1.2,'السليمانية':1.0,'البلد':0.9,'الهدى':1.0,'الفلاح':1.1,'طيبة':1.0},
            makkah: {'العوالي':1.2,'الشوقية':1.1,'الشرائع':0.9,'النسيم':1.0,'الزاهر':1.2,'العتيبية':1.0,'العمرة':0.9,'التنعيم':1.0,'الراشدية':1.2,'الكعكية':1.2,'ولي العهد':1.3,'الزهراء':1.1,'النزهة':1.1,'المسفلة':0.9,'جرهم':1.0,'الروابي':1.0,'الخالدية':1.1,'المنصور':0.9,'الشامية':1.0,'المعابدة':1.0},
            madinah: {'العزيزية':1.3,'العاقول':0.9,'العريض':1.0,'الخالدية':1.2,'الزهرة':1.1,'الملك فهد':1.2,'الروابي':1.1,'قباء':1.3,'القصواء':1.2,'العوالي':1.1,'الهجرة':1.0,'العصبة':0.9,'الجامعة':1.1,'الجرف':1.0,'السلام':1.1,'الدفاع':1.0,'أحد':1.1,'النصر':1.0,'المناخة':0.9,'طيبة':1.1}
        };
        
        // ========== ترجمة الأحياء (Transliteration) ==========
        const districtTranslations = {
            'العليا': 'Al Olaya', 'السليمانية': 'Al Sulaymaniyah', 'الملز': 'Al Malaz', 'الورود': 'Al Woroud',
            'الرحمانية': 'Al Rahmaniyah', 'المحمدية': 'Al Muhammadiyah', 'الرائد': 'Al Raed', 'النخيل': 'Al Nakheel',
            'أم الحمام': 'Um Al Hamam', 'المعذر': 'Al Mathar', 'الهدا': 'Al Hada', 'الشفا': 'Al Shifa',
            'بدر': 'Badr', 'المروة': 'Al Marwah', 'ديراب': 'Dirab', 'نمار': 'Namar',
            'العريجاء': 'Al Uraija', 'البديعة': 'Al Badeea', 'السويدي': 'Al Suwaidi', 'الديرة': 'Al Deerah',
            'الشميسي': 'Al Shumaysi', 'العود': 'Al Oud', 'المرقب': 'Al Marqab', 'الربوة': 'Al Rabwah',
            'الريان': 'Al Rayyan', 'الروابي': 'Al Rawabi', 'النسيم': 'Al Naseem', 'المنار': 'Al Manar',
            'النهضة': 'Al Nahdah', 'الخليج': 'Al Khaleej', 'غرناطة': 'Granada', 'قرطبة': 'Cordoba',
            'اليرموك': 'Al Yarmouk', 'الرمال': 'Al Rimal', 'القادسية': 'Al Qadisiyah', 'الملقا': 'Al Malqa',
            'حطين': 'Hittin', 'العقيق': 'Al Aqeeq', 'الصحافة': 'Al Sahafah', 'الياسمين': 'Al Yasmin',
            'النرجس': 'Al Narjis', 'العارض': 'Al Arid', 'القيروان': 'Al Qairawan', 'الربيع': 'Al Rabee',
            'الغدير': 'Al Ghadeer', 'النفل': 'Al Nafal', 'الوادي': 'Al Wadi', 'التعاون': 'Al Taawun',
            'الازدهار': 'Al Izdihar', 'المرسلات': 'Al Mursalat', 'الفلاح': 'Al Falah', 'الواحة': 'Al Wahah',
            'الملك فهد': 'King Fahd', 'الملك عبدالله': 'King Abdullah', 'الجزيرة': 'Al Jazeerah', 'الفيحاء': 'Al Fayha',
            'المنصورة': 'Al Mansourah', 'العزيزية': 'Al Aziziyah', 'الدار البيضاء': 'Al Dar Al Baida',
            'الروضة': 'Al Rawdah', 'الزهراء': 'Al Zahra', 'السلامة': 'Al Salamah', 'الشاطئ': 'Al Shati',
            'الخالدية': 'Al Khalidiyah', 'النعيم': 'Al Naeem', 'النزهة': 'Al Nuzhah', 'البوادي': 'Al Bawadi',
            'الصفا': 'Al Safa', 'الفيصلية': 'Al Faisaliyah', 'الرحاب': 'Al Rehab', 'مشرفة': 'Mishrifah',
            'بني مالك': 'Bani Malik', 'السامر': 'Al Samer', 'الجامعة': 'Al Jameah', 'السليمانية': 'Al Sulaymaniyah',
            'البلد': 'Al Balad', 'الهدى': 'Al Huda', 'طيبة': 'Taybah', 'العوالي': 'Al Awali',
            'الشوقية': 'Al Shawqiyah', 'الشرائع': 'Al Sharai', 'الزاهر': 'Al Zaher', 'العتيبية': 'Al Utaibiyah',
            'العمرة': 'Al Umrah', 'التنعيم': 'Al Tanim', 'الراشدية': 'Al Rashidiyah', 'الكعكية': 'Al Kakiyah',
            'ولي العهد': 'Wali Al Ahd', 'المسفلة': 'Al Misfalah', 'جرهم': 'Jurhum', 'المنصور': 'Al Mansour',
            'الشامية': 'Al Shamiyah', 'المعابدة': 'Al Maabdah', 'العاقول': 'Al Aqool', 'العريض': 'Al Areed',
            'الزهرة': 'Al Zahrah', 'قباء': 'Quba', 'القصواء': 'Al Qaswa', 'الهجرة': 'Al Hijrah',
            'العصبة': 'Al Usbah', 'الجرف': 'Al Jurf', 'السلام': 'Al Salam', 'الدفاع': 'Al Difa',
            'أحد': 'Uhud', 'النصر': 'Al Nasr', 'المناخة': 'Al Manakhah'
        };

        const cityPricePerMeter = { riyadh: 4000, jeddah: 3500, makkah: 3000, madinah: 2500 };
        const typeFactors = {'فيلا':1.2,'قصر':1.6,'دبلكس':1.1,'شقة في برج':1.15,'شقة في عمارة':0.95,'أرض':0.7,'مزرعة':0.5,'استراحة':0.75,'مكتب':1.0,'معرض':1.1,'عمارة':1.3,'مخزن':0.55,'منتجع':1.25,'محطة':0.9,'دور':0.85};
        const directionFactors = {'شمالية':1.05,'جنوبية':0.95,'شرقية':1.0,'غربية':0.98};

        // ========== الترجمات ==========
        const translations = {
            ar: {
                'brand_ar': 'همة', 'brand_en': 'المدينة',
                'nav_home': 'الرئيسية', 'nav_valuation': 'التقييم', 'nav_offers': 'العروض',
                'nav_contracts': 'العقود', 'nav_add': 'إضافة', 'nav_services': 'الخدمات',
                'nav_faq': 'الأسئلة', 'nav_about': 'عن المكتب', 'nav_contact': 'تواصل',
                'hero_badge': '✦ وكالة عقارية معتمدة', 'hero_title_1': 'همة', 'hero_title_2': 'المدينة',
                'hero_subtitle': 'لتقدير القيم السوقية', 'hero_desc': 'منصتك الذكية لتقييم العقارات في السعودية بدقة واحترافية.',
                'btn_start': '🚀 ابدأ التقييم', 'btn_about': '🏢 تعرف علينا',
                'stat_cities': 'مدن', 'stat_districts': 'حي', 'stat_rating': 'تقييمات', 'stat_types': 'نوع عقار',
                'valuation_title': 'التقييم العقاري الذكي', 'valuation_subtitle': 'أدخل بيانات العقار لتقدير القيمة السوقية',
                'city': 'المدينة', 'district': 'الحي', 'property_type': 'نوع العقار', 'area': 'المساحة (م²)',
                'rooms': 'عدد الغرف', 'age': 'العمر', 'direction': 'الواجهة', 'street_width': 'عرض الشارع (م)',
                'district_class': 'تصنيف الحي', 'residential_ratio': 'نسبة سكنية',
                'add_city': '➕ إضافة مدينة', 'reset': '🔄 إعادة', 'back': '← رجوع',
                'elevator': 'مصعد', 'pool': 'مسبح', 'maid_room': 'غرفة خادمة', 'driver_room': 'غرفة سائق',
                'furnished': 'مفروش', 'central_ac': 'تكييف', 'garage': 'موقف', 'security': 'أمن',
                'result_title': 'نتيجة التقييم', 'price_range': 'النطاق السعري', 'avg_price': 'المتوسط',
                'investment_index': 'مؤشر الاستثمار', 'roi': 'عائد الاستثمار', 'rental_value': 'الإيجار المتوقع',
                'confidence': 'نسبة الثقة', 'share': 'مشاركة', 'details': 'تفاصيل', 'download_pdf': 'تقرير PDF',
                'add_property_title': 'إضافة عقار جديد', 'add_property_subtitle': 'أدخل بيانات العقار كاملة',
                'excel_drop': 'اسحب Excel هنا أو اضغط', 'price': 'السعر (ر.س)', 'photos': 'صور العقار',
                'description': 'وصف العقار', 'add_btn': 'إدراج وتقييم',
                'offers_title': 'عروض وخصومات', 'offers_subtitle': 'فرص لا تفوّت',
                'services_title': 'خدماتنا', 'services_subtitle': 'اضغط على الخدمة للانتقال',
                'faq_title': 'الأسئلة الشائعة', 'about_title': 'عن المكتب', 'contact_title': 'تواصل معنا',
                'contact_info': 'معلومات التواصل', 'contact_form': 'أرسل لنا رسالة',
                'full_name': 'الاسم الكامل', 'phone': 'رقم الجوال', 'message': 'نص الرسالة...', 'send': 'إرسال الرسالة',
                'contracts_title': 'العقود', 'contracts_subtitle': 'عقود كاملة بجميع البنود',
                'residential_contract': 'عقد سكني', 'commercial_contract': 'عقد تجاري',
                'footer_desc': 'مكتب عقاري سعودي معتمد يقدم خدمات تصفح العقارات، والتقييم، وصياغة العقود بمساعدة الذكاء الاصطناعي.',
                'footer_rights': '© 2026 مكتب همة المدينة العقارية. جميع الحقوق محفوظة. • رقم الترخيص: 1200030428',
                'chat_title': 'المساعد الذكي', 'chat_status': 'متصل', 'chat_welcome': 'مرحباً! كيف أساعدك؟ 🏠',
                'chat_placeholder': 'اكتب هنا...', 'whatsapp': 'واتساب', 'tiktok': 'تيك توك',
                'instagram': 'إنستغرام', 'snapchat': 'سناب شات', 'location': 'المدينة المنورة، السعودية',
                'phone_number': '+966 53 050 0906', 'email': 'ffaaddhheell2323@gmail.com',
                'about_office': 'مكتب همة المدينة العقارية',
                'about_desc': 'شريكك العقاري الموثوق بالمدينة المنورة. نقدم حلولاً متكاملة في التقييم العقاري الذكي، إدارة الأملاك، والتسويق العقاري وفق أعلى معايير الجودة والحوكمة.',
                'vision': 'رؤيتنا', 'mission': 'رسالتنا',
                'vision_text': 'أن نكون المرجع العقاري الرقمي الموثوق في المدينة المنورة، ونقدم أدوات ذكية تساعد الأفراد والمستثمرين على اتخاذ قرارات واضحة مبنية على البيانات.',
                'mission_text': 'تقديم خدمات عقارية احترافية تجمع بين الخبرة المحلية والشفافية والتقنية، من التقييم والتسويق إلى إدارة الأملاك وصياغة العقود.',
                'lessor': 'المؤجر', 'lessor_id': 'هوية المؤجر', 'tenant': 'المستأجر', 'tenant_id': 'هوية المستأجر',
                'district_name': 'الحي', 'unit_type': 'نوع الوحدة', 'annual_rent': 'الإيجار السنوي',
                'duration': 'المدة (شهر)', 'start_date': 'تاريخ البداية', 'deposit': 'الضمان',
                'lessor_cr': 'سجل المؤجر', 'tenant_cr': 'سجل المستأجر', 'activity': 'النشاط',
                'generate_contract': 'توليد العقد الكامل',
                'buy_sell': 'بيع وشراء العقارات', 'smart_valuation': 'التقييم الذكي', 'contract_drafting': 'صياغة العقود',
                'property_management': 'إدارة الأملاك', 'real_estate_consulting': 'استشارات عقارية', 'real_estate_marketing': 'تسويق عقاري',
                'browse_offers': 'تصفح العروض', 'evaluate_property': 'قيّم عقارك', 'create_contract': 'أنشئ عقدك',
                'contact_us': 'تواصل معنا', 'get_consultation': 'احصل على استشارة', 'market_property': 'سوّق عقارك',

                                    'select_city': '-- اختر المدينة --', 'select_district': '-- اختر الحي --', 'search_city': 'ابحث عن المدينة...', 'search_district': 'ابحث عن الحي...', 'city_riyadh': 'الرياض', 'city_jeddah': 'جدة', 'city_makkah': 'مكة المكرمة', 'city_madinah': 'المدينة المنورة', 'optional': '(اختياري)', 'area_example': 'مثال: 250', 'age_example': 'مثال: 5', 'street_example': 'مثال: 15', 'north': 'شمالية', 'south': 'جنوبية', 'east': 'شرقية', 'west': 'غربية', 'class_luxury': 'راقي', 'class_average': 'متوسط', 'class_popular': 'شعبي', 'class_new': 'جديد', 'type_apartment_full': 'شقة في عمارة', 'type_tower_apartment': 'شقة في برج', 'type_duplex': 'دبلكس', 'type_palace': 'قصر', 'type_office': 'مكتب', 'wizard_kicker': '✦ تقييم مبدئي سريع', 'wizard_headline': 'اعرف القيمة التقديرية لعقارك', 'wizard_headline_accent': 'خلال دقائق', 'wizard_desc': 'أجب عن أسئلة بسيطة، وسنحسب لك نطاقاً تقديرياً يساعدك على اتخاذ قرار عقاري أوضح.', 'trust_steps': 'خطوات سهلة', 'trust_cities': 'مدن مغطاة', 'trust_confidence': 'مؤشر الثقة', 'privacy_title': 'بياناتك تحت سيطرتك', 'privacy_desc': 'لا تحتاج إلى إنشاء حساب. يمكنك الرجوع بين الخطوات وتعديل إجاباتك قبل إصدار النتيجة.', 'purpose_question': 'لماذا تريد تقييم العقار؟', 'purpose_hint': 'يساعدنا ذلك على عرض المعلومات المناسبة لك.', 'purpose_sell': 'أريد البيع', 'purpose_sell_hint': 'أعرف السعر المناسب', 'purpose_buy': 'أريد الشراء', 'purpose_buy_hint': 'أتحقق من السعر', 'purpose_invest': 'أريد الاستثمار', 'purpose_invest_hint': 'أحسب العائد', 'purpose_know': 'للمعرفة', 'purpose_know_hint': 'أستكشف القيمة', 'location_question': 'أين يقع العقار؟', 'location_hint': 'اختر المدينة ثم الحي للحصول على تقدير أقرب للسوق.', 'type_question': 'ما نوع العقار؟', 'type_hint': 'اختر النوع الأقرب، وستتغير الأسئلة التالية حسب اختيارك.', 'type_villa': 'فيلا', 'type_villa_hint': 'منزل مستقل', 'type_apartment': 'شقة', 'type_apartment_hint': 'في عمارة', 'type_land': 'أرض', 'type_land_hint': 'سكنية أو تجارية', 'type_building': 'عمارة', 'type_building_hint': 'عدة وحدات', 'details_question': 'ما مواصفات العقار الأساسية؟', 'details_hint': 'كلما زادت البيانات، أصبح التقدير أكثر فائدة. الحقول الأساسية مطلوبة.', 'extras_question': 'هل توجد مزايا إضافية؟', 'extras_hint': 'هذه الاختيارات اختيارية، وقد تساعد في تحسين التقدير.', 'review_question': 'راجع بياناتك قبل الحساب', 'review_hint': 'تأكد من البيانات، ثم اضغط على زر الحساب لإظهار القيمة التقديرية.', 'review_city': 'المدينة', 'review_district': 'الحي', 'review_type': 'نوع العقار', 'review_area': 'المساحة', 'review_rooms_age': 'الغرف والعمر', 'review_extras': 'المزايا', 'result_caption': 'القيمة السوقية التقديرية', 'expected_range': 'النطاق المتوقع:', 'result_notice_title': 'تنبيه مهم:', 'result_notice': 'هذه نتيجة تقديرية مبنية على البيانات المدخلة، وليست تقرير تقييم رسمي. للحصول على رأي متخصص أو تقرير معتمد، تواصل مع فريق همة المدينة.', 'talk_to_expert': 'تحدث مع خبير عبر واتساب', 'valuation_disclaimer': 'النتيجة للاسترشاد العام ولا تغني عن التقييم العقاري الرسمي.',
                'about_subtitle': 'شريكك العقاري الموثوق في المدينة المنورة', 'license_label': 'رخصة فال العقارية: 1200030428',
                'faq_subtitle': 'إجابات سريعة عن خدماتنا وأدواتنا', 'faq_q1': 'كيف أضيف عقاري؟', 'faq_a1': 'من صفحة «إضافة عقار» يدوياً أو برفع ملف Excel.',
                'faq_q2': 'هل التقييم معتمد رسمياً؟', 'faq_a2': 'التقييم المعروض تقديري للاسترشاد، ولا يغني عن تقرير التقييم الرسمي من مختص مرخص.',
                'faq_q3': 'هل يمكنني توقيع العقد مباشرة؟', 'faq_a3': 'العقد الذي يتم توليده مسودة، ويجب استكمال التوقيع عبر القنوات والمنصات الرسمية.',
                'faq_q4': 'هل تغطون مدناً أخرى؟', 'faq_a4': 'نغطي حالياً أربع مدن رئيسية، ونعمل على توسيع التغطية تدريجياً.',
                'faq_q5': 'هل الأدوات مجانية؟', 'faq_a5': 'الأدوات المتاحة في الموقع مجانية للاستخدام التجريبي، ويمكنك التواصل معنا لمعرفة الخدمات الاحترافية.',
                'offer_details': 'عرض التفاصيل', 'discount_8': 'خصم 8%', 'discount_12': 'خصم 12%', 'discount_10': 'خصم 10%',
                'offer_1_title': 'فيلا · النرجس', 'offer_1_location': 'الرياض، النرجس', 'offer_1_meta': '410 م² · 6 غرف', 'offer_1_old': 'السعر السابق: 3,850,000 ريال', 'offer_1_price': '3,542,000 ريال',
                'offer_2_title': 'شقة · الشاطئ', 'offer_2_location': 'جدة، الشاطئ', 'offer_2_meta': '165 م² · 3 غرف', 'offer_2_old': 'السعر السابق: 980,000 ريال', 'offer_2_price': '862,400 ريال',
                'offer_3_title': 'شقة · العزيزية', 'offer_3_location': 'مكة المكرمة، العزيزية', 'offer_3_meta': '140 م² · 3 غرف', 'offer_3_old': 'السعر السابق: 750,000 ريال', 'offer_3_price': '675,000 ريال',
                'lessor_name_placeholder': 'اسم المؤجر', 'id_placeholder': 'رقم الهوية', 'tenant_name_placeholder': 'اسم المستأجر', 'district_placeholder': 'الحي', 'area_placeholder': '200', 'rent_placeholder': '50000',
                'cr_placeholder': 'رقم السجل', 'activity_placeholder': 'مطعم، متجر...', 'commercial_area_placeholder': '150', 'commercial_rent_placeholder': '80000', 'property_description_placeholder': 'وصف مختصر...',
            },
            en: {
                'brand_ar': 'Himmat', 'brand_en': 'Al Madinah',
                'nav_home': 'Home', 'nav_valuation': 'Valuation', 'nav_offers': 'Offers',
                'nav_contracts': 'Contracts', 'nav_add': 'Add', 'nav_services': 'Services',
                'nav_faq': 'FAQ', 'nav_about': 'About', 'nav_contact': 'Contact',
                'hero_badge': '✦ Licensed Real Estate', 'hero_title_1': 'Himmat', 'hero_title_2': 'Al Madinah',
                'hero_subtitle': 'For Market Value', 'hero_desc': 'Your smart platform for real estate valuation in KSA.',
                'btn_start': '🚀 Start Valuation', 'btn_about': '🏢 About Us',
                'stat_cities': 'Cities', 'stat_districts': 'Districts', 'stat_rating': 'Reviews', 'stat_types': 'Property Types',
                'valuation_title': 'Smart Valuation', 'valuation_subtitle': 'Enter property data for valuation',
                'city': 'City', 'district': 'District', 'property_type': 'Property Type', 'area': 'Area (m²)',
                'rooms': 'Rooms', 'age': 'Age', 'direction': 'Direction', 'street_width': 'Street Width (m)',
                'district_class': 'District Class', 'residential_ratio': 'Residential Ratio',
                'add_city': '➕ Add City', 'reset': '🔄 Reset', 'back': '← Back',
                'elevator': 'Elevator', 'pool': 'Pool', 'maid_room': 'Maid Room', 'driver_room': 'Driver Room',
                'furnished': 'Furnished', 'central_ac': 'Central AC', 'garage': 'Parking', 'security': 'Security',
                'result_title': 'Valuation Result', 'price_range': 'Price Range', 'avg_price': 'Average',
                'investment_index': 'Investment Index', 'roi': 'ROI', 'rental_value': 'Expected Rent',
                'confidence': 'Confidence', 'share': 'Share', 'details': 'Details', 'download_pdf': 'PDF Report',
                'add_property_title': 'Add Property', 'add_property_subtitle': 'Enter full property data',
                'excel_drop': 'Drop Excel here or click', 'price': 'Price (SAR)', 'photos': 'Property Photos',
                'description': 'Property Description', 'add_btn': 'Add & Evaluate',
                'offers_title': 'Offers & Discounts', 'offers_subtitle': "Don't miss out",
                'services_title': 'Our Services', 'services_subtitle': 'Click to navigate',
                'faq_title': 'Frequently Asked Questions', 'about_title': 'About Us', 'contact_title': 'Contact Us',
                'contact_info': 'Contact Information', 'contact_form': 'Send us a message',
                'full_name': 'Full Name', 'phone': 'Phone Number', 'message': 'Your message...', 'send': 'Send Message',
                'contracts_title': 'Contracts', 'contracts_subtitle': 'Complete contracts with all clauses',
                'residential_contract': 'Residential', 'commercial_contract': 'Commercial',
                'footer_desc': 'Licensed Saudi real estate office providing property browsing, valuation, and AI-assisted contract drafting services.',
                'footer_rights': '© 2026 Himmat Al Madinah Real Estate. All rights reserved. • License: 1200030428',
                'chat_title': 'Smart Assistant', 'chat_status': 'Online', 'chat_welcome': 'Hello! How can I help? 🏠',
                'chat_placeholder': 'Type here...', 'whatsapp': 'WhatsApp', 'tiktok': 'TikTok',
                'instagram': 'Instagram', 'snapchat': 'Snapchat', 'location': 'Madinah, Saudi Arabia',
                'phone_number': '+966 53 050 0906', 'email': 'ffaaddhheell2323@gmail.com',
                'about_office': 'Himmat Al Madinah Real Estate Office',
                'about_desc': 'Your trusted real estate partner in Madinah. We provide integrated solutions in smart valuation, property management, and marketing.',
                'vision': 'Our Vision', 'mission': 'Our Mission',
                'vision_text': 'To become Madinah’s trusted digital real estate reference, providing intelligent tools that help individuals and investors make clear, data-informed decisions.',
                'mission_text': 'To deliver professional real estate services that combine local expertise, transparency, and technology—from valuation and marketing to property management and contract drafting.',
                'lessor': 'Lessor', 'lessor_id': 'Lessor ID', 'tenant': 'Tenant', 'tenant_id': 'Tenant ID',
                'district_name': 'District', 'unit_type': 'Unit Type', 'annual_rent': 'Annual Rent',
                'duration': 'Duration (months)', 'start_date': 'Start Date', 'deposit': 'Deposit',
                'lessor_cr': 'Lessor CR', 'tenant_cr': 'Tenant CR', 'activity': 'Activity',
                'generate_contract': 'Generate Full Contract',
                'buy_sell': 'Buy & Sell Properties', 'smart_valuation': 'Smart Valuation', 'contract_drafting': 'Contract Drafting',
                'property_management': 'Property Management', 'real_estate_consulting': 'Real Estate Consulting', 'real_estate_marketing': 'Real Estate Marketing',
                'browse_offers': 'Browse Offers', 'evaluate_property': 'Evaluate Property', 'create_contract': 'Create Contract',
                'contact_us': 'Contact Us', 'get_consultation': 'Get Consultation', 'market_property': 'Market Property',

                                    'select_city': '-- Choose city --', 'select_district': '-- Choose district --', 'search_city': 'Search for a city...', 'search_district': 'Search for a district...', 'city_riyadh': 'Riyadh', 'city_jeddah': 'Jeddah', 'city_makkah': 'Makkah', 'city_madinah': 'Madinah', 'optional': '(optional)', 'area_example': 'Example: 250', 'age_example': 'Example: 5', 'street_example': 'Example: 15', 'north': 'North', 'south': 'South', 'east': 'East', 'west': 'West', 'class_luxury': 'Luxury', 'class_average': 'Average', 'class_popular': 'Popular', 'class_new': 'New', 'type_apartment_full': 'Apartment in a building', 'type_tower_apartment': 'Tower apartment', 'type_duplex': 'Duplex', 'type_palace': 'Palace', 'type_office': 'Office', 'wizard_kicker': '✦ Quick preliminary estimate', 'wizard_headline': 'Get your property value', 'wizard_headline_accent': 'in minutes', 'wizard_desc': 'Answer a few simple questions and we will calculate an estimated range to support your next real estate decision.', 'trust_steps': 'Easy steps', 'trust_cities': 'Covered cities', 'trust_confidence': 'Confidence index', 'privacy_title': 'Your data stays in your control', 'privacy_desc': 'No account is required. You can go back and edit your answers before receiving the result.', 'purpose_question': 'Why are you valuing the property?', 'purpose_hint': 'This helps us show the information most relevant to your goal.', 'purpose_sell': 'I want to sell', 'purpose_sell_hint': 'Find the right price', 'purpose_buy': 'I want to buy', 'purpose_buy_hint': 'Check the price', 'purpose_invest': 'I want to invest', 'purpose_invest_hint': 'Estimate the return', 'purpose_know': 'Just exploring', 'purpose_know_hint': 'Discover the value', 'location_question': 'Where is the property?', 'location_hint': 'Choose the city and district for a closer market estimate.', 'type_question': 'What type of property is it?', 'type_hint': 'Choose the closest type; the following questions will adapt to it.', 'type_villa': 'Villa', 'type_villa_hint': 'Standalone home', 'type_apartment': 'Apartment', 'type_apartment_hint': 'In a building', 'type_land': 'Land', 'type_land_hint': 'Residential or commercial', 'type_building': 'Building', 'type_building_hint': 'Multiple units', 'details_question': 'What are the basic property details?', 'details_hint': 'More details improve the estimate. Required fields are marked.', 'extras_question': 'Does it have any extra features?', 'extras_hint': 'These choices are optional and may improve the estimate.', 'review_question': 'Review your details', 'review_hint': 'Confirm the information, then calculate the estimated value.', 'review_city': 'City', 'review_district': 'District', 'review_type': 'Property type', 'review_area': 'Area', 'review_rooms_age': 'Rooms and age', 'review_extras': 'Features', 'result_caption': 'Estimated market value', 'expected_range': 'Expected range:', 'result_notice_title': 'Important note:', 'result_notice': 'This is an estimate based on the information entered and is not an official valuation report. Contact Himmat Al Madinah for expert guidance.', 'talk_to_expert': 'Talk to an expert on WhatsApp', 'valuation_disclaimer': 'For general guidance only; it does not replace an official real estate valuation.',
                'about_subtitle': 'Your trusted real estate partner in Madinah', 'license_label': 'FAL License: 1200030428',
                'faq_subtitle': 'Quick answers about our services and tools', 'faq_q1': 'How do I add my property?', 'faq_a1': 'Use the Add Property page manually or upload an Excel file.',
                'faq_q2': 'Is the valuation officially certified?', 'faq_a2': 'The displayed estimate is for guidance and does not replace an official report by a licensed specialist.',
                'faq_q3': 'Can I sign the contract directly?', 'faq_a3': 'The generated contract is a draft; signing must be completed through official channels and platforms.',
                'faq_q4': 'Do you cover other cities?', 'faq_a4': 'We currently cover four major cities and are gradually expanding our coverage.',
                'faq_q5': 'Are the tools free?', 'faq_a5': 'The available tools are free for trial use. Contact us to learn about professional services.',
                'offer_details': 'View details', 'discount_8': '8% off', 'discount_12': '12% off', 'discount_10': '10% off',
                'offer_1_title': 'Villa · Al Narjis', 'offer_1_location': 'Riyadh, Al Narjis', 'offer_1_meta': '410 m² · 6 rooms', 'offer_1_old': 'Previous price: SAR 3,850,000', 'offer_1_price': 'SAR 3,542,000',
                'offer_2_title': 'Apartment · Al Shati', 'offer_2_location': 'Jeddah, Al Shati', 'offer_2_meta': '165 m² · 3 rooms', 'offer_2_old': 'Previous price: SAR 980,000', 'offer_2_price': 'SAR 862,400',
                'offer_3_title': 'Apartment · Al Aziziyah', 'offer_3_location': 'Makkah, Al Aziziyah', 'offer_3_meta': '140 m² · 3 rooms', 'offer_3_old': 'Previous price: SAR 750,000', 'offer_3_price': 'SAR 675,000',
                'lessor_name_placeholder': 'Lessor name', 'id_placeholder': 'ID number', 'tenant_name_placeholder': 'Tenant name', 'district_placeholder': 'District', 'area_placeholder': '200', 'rent_placeholder': '50000',
                'cr_placeholder': 'CR number', 'activity_placeholder': 'Restaurant, store...', 'commercial_area_placeholder': '150', 'commercial_rent_placeholder': '80000', 'property_description_placeholder': 'Short property description...',
            }
        };

        function translateText(text, lang) {
            if (lang === 'ar') return text;
            if (districtTranslations[text]) return districtTranslations[text];
            const textMap = {
                'الرياض': 'Riyadh', 'جدة': 'Jeddah', 'مكة المكرمة': 'Makkah', 'المدينة المنورة': 'Madinah',
                'فيلا': 'Villa', 'شقة في عمارة': 'Apartment', 'شقة في برج': 'Tower Apartment',
                'أرض': 'Land', 'دبلكس': 'Duplex', 'قصر': 'Palace', 'مكتب': 'Office',
                'عمارة': 'Building', 'دور': 'Floor', 'شقة': 'Apartment',
                'شمالية': 'North', 'جنوبية': 'South', 'شرقية': 'East', 'غربية': 'West',
                'راقي': 'Luxury', 'متوسط': 'Average', 'شعبي': 'Popular', 'جديد': 'New',
                'المؤجر': 'Lessor', 'هوية المؤجر': 'Lessor ID', 'المستأجر': 'Tenant',
                'هوية المستأجر': 'Tenant ID', 'نوع الوحدة': 'Unit Type',
                'الإيجار السنوي': 'Annual Rent', 'المدة (شهر)': 'Duration (months)',
                'تاريخ البداية': 'Start Date', 'الضمان': 'Deposit', 'سجل المؤجر': 'Lessor CR',
                'سجل المستأجر': 'Tenant CR', 'النشاط': 'Activity', 'اسم المؤجر': 'Lessor Name',
                'اسم المستأجر': 'Tenant Name', 'رقم الهوية': 'ID Number', 'رقم السجل': 'CR Number',
                'مطعم، متجر...': 'Restaurant, Shop...', 'وصف مختصر...': 'Brief description...',
                'توليد العقد الكامل': 'Generate Full Contract', 'بيع وشراء العقارات': 'Buy & Sell Properties',
                'التقييم الذكي': 'Smart Valuation', 'صياغة العقود': 'Contract Drafting',
                'إدارة الأملاك': 'Property Management', 'استشارات عقارية': 'Real Estate Consulting',
                'تسويق عقاري': 'Real Estate Marketing', 'تصفح العروض': 'Browse Offers',
                'قيّم عقارك': 'Evaluate Property', 'أنشئ عقدك': 'Create Contract',
                'احصل على استشارة': 'Get Consultation', 'سوّق عقارك': 'Market Property',
                'كيف أضيف عقاري؟': 'How to add my property?',
                'من صفحة «إضافة عقار» يدوياً أو رفع Excel.': 'From "Add Property" page manually or upload Excel.',
                'هل التقييم معتمد رسمياً؟': 'Is valuation official?',
                'نعم، يعتمد على معايير الهيئة العامة للعقار.': 'Yes, based on Real Estate Authority standards.',
                'هل يمكنني توقيع العقد مباشرة؟': 'Can I sign contract directly?',
                'العقد مسودة والتوقيع عبر منصة إيجار.': 'Draft contract, signing via Ejar platform.',
                'هل تغطون مدناً أخرى؟': 'Do you cover other cities?',
                'نعم، 4 مدن رئيسية مع خطة توسع.': 'Yes, 4 main cities with expansion plan.',
                'هل الأدوات مجانية؟': 'Are tools free?',
                'نعم، مجانية لجميع عملاء المكتب.': 'Yes, free for all clients.',
                'مكتب همة المدينة العقارية': 'Himmat Al Madinah Real Estate',
                'رخصة فال العقارية: 1200030428 ✓': 'Fal Real Estate License: 1200030428 ✓',
                'رؤيتنا': 'Our Vision', 'رسالتنا': 'Our Mission',
                'معلومات التواصل': 'Contact Information', 'أرسل لنا رسالة': 'Send us a message',
                'الاسم الكامل': 'Full Name', 'رقم الجوال': 'Phone Number', 'نص الرسالة...': 'Your message...',
                'إرسال الرسالة': 'Send Message', 'عقد سكني': 'Residential', 'عقد تجاري': 'Commercial',
                'همة المدينة': 'Himmat Al Madinah', 'المساعد الذكي': 'Smart Assistant',
                'متصل': 'Online', 'مرحباً! كيف أساعدك؟ 🏠': 'Hello! How can I help? 🏠',
                'اكتب هنا...': 'Type here...', 'واتساب': 'WhatsApp', 'تيك توك': 'TikTok',
                'إنستغرام': 'Instagram', 'سناب شات': 'Snapchat',
                'المدينة المنورة، السعودية': 'Madinah, Saudi Arabia', 'الإيجار': 'Rent', 'المدة': 'Duration',
                'شهر': 'months', 'ريال': 'SAR', 'المكان': 'Location', 'رقم': 'No',
                'بيانات العقد': 'Contract Data', 'المالية': 'Financial', 'العقار': 'Property',
                'طباعة': 'Print', 'إغلاق': 'Close', 'التفاصيل': 'Details',
                'الحي': 'District', 'المدينة': 'City', 'المساحة (م²)': 'Area (m²)'
            };
            return textMap[text] || text;
        }

        const pages = {
            home: document.getElementById('page-home'),
            valuation: document.getElementById('page-valuation'),
            offers: document.getElementById('page-offers'),
            contracts: document.getElementById('page-contracts'),
            'add-property': document.getElementById('page-add-property'),
            services: document.getElementById('page-services'),
            faq: document.getElementById('page-faq'),
            about: document.getElementById('page-about'),
            contact: document.getElementById('page-contact')
        };

        function navigateTo(name) {
            Object.keys(pages).forEach(k => { if(pages[k]) { pages[k].style.display='none'; pages[k].classList.remove('active'); } });
            if(pages[name]) { pages[name].style.display='block'; pages[name].classList.add('active'); }
            document.querySelectorAll('.nav-links-modern a').forEach(a => a.classList.toggle('active', a.dataset.page===name));
            document.getElementById('chatWindow').classList.remove('active');
            window.scrollTo({top:0, behavior:'smooth'});
        }

        let currentLang = 'ar';

        function applyTranslation(lang) {
            const t = translations[lang] || translations.ar;
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if(t[key]) el.textContent = t[key];
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if(t[key]) el.placeholder = t[key];
            });
            document.querySelectorAll('select').forEach(select => {
                Array.from(select.options).forEach(option => {
                    const text = option.textContent.trim();
                    if(text && text !== '--' && text !== '') {
                        const translatedText = translateText(text, lang);
                        if (translatedText) option.textContent = translatedText;
                    }
                });
            });
            document.querySelectorAll('label, h4, h3, h2, h1, p, span, button, div').forEach(el => {
                if (el.children.length === 0 && el.textContent.trim()) {
                    const originalText = el.textContent.trim();
                    const translatedText = translateText(originalText, lang);
                    if (translatedText && translatedText !== originalText) {
                        el.textContent = translatedText;
                    }
                }
            });
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            localStorage.setItem('lang', lang);
        }

        function switchLanguage(lang) {
            currentLang = lang;
            document.querySelectorAll('.lang-btn-modern').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === lang);
            });
            applyTranslation(lang);
            if(document.getElementById('valArea')?.value) {
                calculateValuation();
            }
            updateDistricts();
            updateAddDistricts();
            if (typeof wizardStep !== 'undefined') showWizardStep(wizardStep);
            syncLocationSearchInputs();
            renderLocationOptions('city', false);
            renderLocationOptions('district', false);
        }

        function toggleTheme() {
            const body = document.body;
            const isDark = body.classList.contains('dark-theme');
            if(isDark) { body.classList.remove('dark-theme'); body.classList.add('light-theme'); localStorage.setItem('theme', 'light'); }
            else { body.classList.remove('light-theme'); body.classList.add('dark-theme'); localStorage.setItem('theme', 'dark'); }
            const toggle = document.getElementById('themeToggle');
            if(toggle) toggle.textContent = isDark ? '☀️' : '🌙';
        }

        function animateCounters() {
            document.querySelectorAll('.stat-number').forEach(c => {
                const t = parseInt(c.dataset.count); let cur = 0; const inc = t/40;
                const iv = setInterval(() => { cur += inc; if(cur>=t){cur=t;clearInterval(iv);} c.textContent = Math.round(cur); }, 25);
            });
        }


        // ========== Valuation wizard ==========
        let wizardStep = 1;
        let wizardSubmitted = false;
        const wizardMeta = {
            1: { title: 'هدف التقييم', subtitle: 'اختر الغرض الأقرب لاستخدامك' },
            2: { title: 'موقع العقار', subtitle: 'اختر المدينة والحي' },
            3: { title: 'نوع العقار', subtitle: 'اختر النوع الأقرب لعقارك' },
            4: { title: 'المواصفات الأساسية', subtitle: 'أدخل البيانات التي تعرفها' },
            5: { title: 'المزايا الإضافية', subtitle: 'اختيارات اختيارية لتحسين التقدير' },
            6: { title: 'مراجعة البيانات', subtitle: 'تأكد من البيانات قبل الحساب' }
        };

        function setPropertyType(value) {
            const type = document.getElementById('valPropertyType');
            if (type) type.value = value;
            calculateValuation();
            updateReviewSummary();
        }

        function getSelectedText(id) {
            const el = document.getElementById(id);
            return el?.selectedOptions?.[0]?.textContent?.trim() || '--';
        }

        function localizedPropertyType(value) {
            if (currentLang !== 'en') return value;
            const map = { 'فيلا':'Villa', 'شقة في عمارة':'Apartment in a building', 'شقة في برج':'Tower apartment', 'أرض':'Land', 'دبلكس':'Duplex', 'قصر':'Palace', 'مكتب':'Office', 'عمارة':'Building' };
            return map[value] || value || '--';
        }

        function updateReviewSummary() {
            const extraNames = [
                ['valElevator','مصعد','Elevator'], ['valPool','مسبح','Pool'], ['valMaidRoom','غرفة خادمة','Maid room'], ['valDriverRoom','غرفة سائق','Driver room'],
                ['valFurnished','مفروش','Furnished'], ['valCentralAC','تكييف مركزي','Central AC'], ['valGarage','موقف','Parking'], ['valSecurity','أمن','Security']
            ];
            const extras = extraNames.filter(([id]) => document.getElementById(id)?.checked).map(([,ar,en]) => currentLang === 'en' ? en : ar);
            const city = getSelectedText('valCity');
            const district = getSelectedText('valDistrict');
            const type = localizedPropertyType(document.getElementById('valPropertyType')?.value || '--');
            const area = document.getElementById('valArea')?.value || '--';
            const rooms = document.getElementById('valRooms')?.value || '--';
            const age = document.getElementById('valAge')?.value || '--';
            const values = {
                reviewCity: city, reviewDistrict: district, reviewType: type,
                reviewArea: area === '--' ? '--' : area + ' m²',
                reviewRoomsAge: currentLang === 'en' ? rooms + ' rooms / ' + age + ' years' : rooms + ' غرف / ' + age + ' سنوات',
                reviewExtras: extras.length ? extras.join(currentLang === 'en' ? ', ' : '، ') : (currentLang === 'en' ? 'No extra features' : 'بدون مزايا إضافية')
            };
            Object.entries(values).forEach(([id, value]) => { const el = document.getElementById(id); if (el) el.textContent = value; });
            const link = document.getElementById('valuationWhatsapp');
            const avg = document.getElementById('avgPrice')?.textContent || '--';
            if (link) {
                const message = currentLang === 'en' ? 'Hello, I would like to speak with an expert about a property valuation. Type: ' + type + ', City: ' + city + ', District: ' + district + ', Estimated average: ' + avg : 'مرحباً، أحتاج التحدث مع خبير بخصوص تقييم عقاري. النوع: ' + type + '، المدينة: ' + city + '، الحي: ' + district + '، المتوسط التقديري: ' + avg;
                link.href = 'https://wa.me/966530500906?text=' + encodeURIComponent(message);
            }
        }

        function showWizardStep(step) {
            wizardStep = Math.min(6, Math.max(1, step));
            document.querySelectorAll('.wizard-step').forEach(el => el.classList.toggle('active', Number(el.dataset.step) === wizardStep));
            const meta = wizardMeta[wizardStep];
            const title = document.getElementById('wizardStepTitle');
            const subtitle = document.getElementById('wizardStepSubtitle');
            const counter = document.getElementById('wizardStepCounter');
            const progress = document.getElementById('wizardProgressFill');
            const back = document.getElementById('wizardBackBtn');
            const next = document.getElementById('wizardNextBtn');
            if (title) title.textContent = currentLang === 'en' ? ['','Valuation purpose','Property location','Property type','Basic details','Extra features','Review details'][wizardStep] : meta.title;
            if (subtitle) subtitle.textContent = currentLang === 'en' ? ['','Choose the reason closest to your goal','Choose the city and district','Choose the closest property type','Enter the details you know','Optional features to improve the estimate','Confirm your details before calculating'][wizardStep] : meta.subtitle;
            if (counter) counter.textContent = currentLang === 'en' ? 'Step ' + wizardStep + ' of 6' : 'الخطوة ' + wizardStep + ' من 6';
            if (progress) progress.style.width = (wizardStep / 6 * 100) + '%';
            if (back) back.style.display = wizardStep > 1 ? 'inline-flex' : 'none';
            if (next) next.textContent = wizardStep === 6 ? (currentLang === 'en' ? 'Calculate value' : 'احسب القيمة') : (currentLang === 'en' ? 'Next →' : 'التالي ←');
            updateReviewSummary();
            if (wizardStep === 2 && !document.getElementById('valCity')?.value) {
                const notice = document.getElementById('locationNotice');
                if (notice) notice.textContent = currentLang === 'en' ? 'Select a city to continue.' : 'اختر المدينة للمتابعة.';
            }
        }

        function wizardNext() {
            const notice = document.getElementById('wizardNotice');
            if (notice) notice.textContent = '';
            if (wizardStep === 2 && !document.getElementById('valCity')?.value) {
                const locationNotice = document.getElementById('locationNotice');
                if (locationNotice) locationNotice.textContent = currentLang === 'en' ? 'Select a city to continue.' : 'اختر المدينة للمتابعة.';
                return;
            }
            if (wizardStep === 4 && (parseFloat(document.getElementById('valArea')?.value) || 0) < 10) {
                if (notice) notice.textContent = currentLang === 'en' ? 'Enter an area of at least 10 m².' : 'أدخل مساحة لا تقل عن 10 م².';
                return;
            }
            if (wizardStep < 6) {
                showWizardStep(wizardStep + 1);
                return;
            }
            wizardSubmitted = true;
            calculateValuation();
            updateReviewSummary();
            const result = document.getElementById('valuationResult');
            if (result) result.scrollIntoView({ behavior:'smooth', block:'start' });
        }

        function wizardBack() {
            if (wizardStep > 1) showWizardStep(wizardStep - 1);
        }

        function wizardReset() {
            wizardStep = 1;
            wizardSubmitted = false;
            const result = document.getElementById('valuationResult');
            if (result) result.style.display = 'none';
            const locationNotice = document.getElementById('locationNotice');
            if (locationNotice) locationNotice.textContent = '';
            const notice = document.getElementById('wizardNotice');
            if (notice) notice.textContent = '';
            showWizardStep(1);
        }

        const cityLocationOptions = {
            riyadh: { ar: 'الرياض', en: 'Riyadh' },
            jeddah: { ar: 'جدة', en: 'Jeddah' },
            makkah: { ar: 'مكة المكرمة', en: 'Makkah' },
            madinah: { ar: 'المدينة المنورة', en: 'Madinah' }
        };

        function locationLabel(kind, value) {
            if (!value) return '';
            if (kind === 'city') return cityLocationOptions[value]?.[currentLang] || value;
            return currentLang === 'en' ? (districtTranslations[value] || value) : value;
        }

        function locationInput(kind) {
            return document.getElementById(kind === 'city' ? 'valCitySearch' : 'valDistrictSearch');
        }

        function locationNativeSelect(kind) {
            return document.getElementById(kind === 'city' ? 'valCity' : 'valDistrict');
        }

        function locationResults(kind) {
            return document.getElementById(kind === 'city' ? 'cityResults' : 'districtResults');
        }

        function getLocationItems(kind) {
            const select = locationNativeSelect(kind);
            if (!select) return [];
            return Array.from(select.options).filter(option => option.value).map(option => ({
                value: option.value,
                label: locationLabel(kind, option.value)
            }));
        }

        function closeLocationOptions(kind) {
            const input = locationInput(kind);
            const results = locationResults(kind);
            if (results) results.classList.remove('open');
            if (input) input.setAttribute('aria-expanded', 'false');
        }

        function renderLocationOptions(kind, showAll = false) {
            const input = locationInput(kind);
            const results = locationResults(kind);
            const select = locationNativeSelect(kind);
            if (!input || !results || !select) return;
            const query = showAll ? '' : input.value.trim().toLocaleLowerCase();
            const selected = select.value;
            const items = getLocationItems(kind).filter(item => !query || item.label.toLocaleLowerCase().includes(query));
            results.innerHTML = '';
            if (!items.length) {
                const empty = document.createElement('div');
                empty.className = 'location-option-empty';
                empty.textContent = currentLang === 'en' ? 'No matching results' : 'لا توجد نتائج مطابقة';
                results.appendChild(empty);
            } else {
                items.forEach(item => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'location-option' + (item.value === selected ? ' selected' : '');
                    button.setAttribute('role', 'option');
                    button.setAttribute('aria-selected', String(item.value === selected));
                    button.textContent = item.label;
                    button.addEventListener('click', () => chooseLocation(kind, item.value));
                    results.appendChild(button);
                });
            }
            results.classList.add('open');
            input.setAttribute('aria-expanded', 'true');
        }

        function openLocationOptions(kind) {
            renderLocationOptions(kind, true);
        }

        function filterLocationOptions(kind) {
            const select = locationNativeSelect(kind);
            const input = locationInput(kind);
            if (select && input && input.value !== locationLabel(kind, select.value)) {
                if (kind === 'city' && select.value) {
                    select.value = '';
                    const district = locationNativeSelect('district');
                    if (district) district.innerHTML = '<option value="" data-i18n="select_district">-- اختر الحي --</option>';
                    const districtInput = locationInput('district');
                    if (districtInput) districtInput.value = '';
                }
            }
            renderLocationOptions(kind, false);
        }

        function chooseLocation(kind, value) {
            const select = locationNativeSelect(kind);
            if (!select) return;
            select.value = value;
            const input = locationInput(kind);
            if (input) input.value = locationLabel(kind, value);
            closeLocationOptions(kind);
            if (kind === 'city') {
                updateDistricts();
                const district = locationNativeSelect('district');
                if (district?.value) {
                    const districtInput = locationInput('district');
                    if (districtInput) districtInput.value = locationLabel('district', district.value);
                }
            } else {
                calculateValuation();
                updateReviewSummary();
            }
        }

        function handleLocationKey(event, kind) {
            const results = locationResults(kind);
            if (event.key === 'Escape') {
                closeLocationOptions(kind);
                return;
            }
            if (event.key === 'ArrowDown') {
                const first = results?.querySelector('.location-option');
                if (first) { event.preventDefault(); first.focus(); }
                return;
            }
            if (event.key === 'Enter') {
                const first = results?.querySelector('.location-option');
                if (first) { event.preventDefault(); first.click(); }
            }
        }

        function syncLocationSearchInputs() {
            ['city', 'district'].forEach(kind => {
                const select = locationNativeSelect(kind);
                const input = locationInput(kind);
                if (select && input) input.value = locationLabel(kind, select.value);
            });
        }

        function initializeLocationSearch() {
            syncLocationSearchInputs();
            document.addEventListener('click', event => {
                if (!event.target.closest('.location-search-field')) {
                    closeLocationOptions('city');
                    closeLocationOptions('district');
                }
            });
        }

        function updateDistricts() {
            const city = document.getElementById('valCity')?.value;
            const select = document.getElementById('valDistrict');
            if(!select) return;
            select.innerHTML = '<option value="">--</option>';
            if(city && districtsData[city]) {
                Object.keys(districtsData[city]).forEach(d => {
                    const o = document.createElement('option');
                    o.value = d;
                    o.textContent = currentLang === 'en' ? (districtTranslations[d] || d) : d;
                    select.appendChild(o);
                });
                select.value = Object.keys(districtsData[city])[0];
            }
            syncLocationSearchInputs();
            renderLocationOptions('district', false);
            calculateValuation();
        }

        function toggleChip(checkbox) {
            const label = checkbox.closest('label');
            if(label) { if(checkbox.checked) label.classList.add('active'); else label.classList.remove('active'); }
        }

        function calculateValuation() {
            const cityEl = document.getElementById('valCity');
            const districtEl = document.getElementById('valDistrict');
            const typeEl = document.getElementById('valPropertyType');
            const areaEl = document.getElementById('valArea');
            if(!cityEl || !districtEl || !typeEl || !areaEl) return;
            const city = cityEl.value;
            const district = districtEl.value;
            const propertyType = typeEl.value;
            const area = parseFloat(areaEl.value) || 0;
            const rooms = parseFloat(document.getElementById('valRooms')?.value) || 4;
            const age = parseFloat(document.getElementById('valAge')?.value) || 0;
            const districtClass = document.getElementById('valDistrictClass')?.value || 'متوسط';
            const direction = document.getElementById('valDirection')?.value || 'جنوبية';
            const streetWidth = parseFloat(document.getElementById('valStreetWidth')?.value) || 0;
            const residentialRatio = parseFloat(document.getElementById('valResidentialRatio')?.value) || 50;
            if(area < 10 || !propertyType || !city) return;

            let base = cityPricePerMeter[city] || 3000;
            const districtFactor = (district && districtsData[city] && districtsData[city][district]) ? districtsData[city][district] : 1;
            base *= districtFactor;
            const classF = {'راقي':1.2,'متوسط':1.0,'شعبي':0.85,'جديد':1.05};
            base *= (classF[districtClass] || 1);
            base *= (typeFactors[propertyType] || 1);
            base *= (directionFactors[direction] || 1);
            const ageF = Math.max(0.5, 1 - age*0.012);
            const roomsF = 1 + (rooms-2)*0.025;
            const streetF = 1 + Math.min(streetWidth,30)*0.005;
            const ratioF = 0.85 + (residentialRatio/100)*0.15;
            let extraF = 1;
            if(document.getElementById('valElevator')?.checked) extraF += 0.04;
            if(document.getElementById('valPool')?.checked) extraF += 0.06;
            if(document.getElementById('valFurnished')?.checked) extraF += 0.05;
            if(document.getElementById('valCentralAC')?.checked) extraF += 0.04;
            if(document.getElementById('valMaidRoom')?.checked) extraF += 0.03;
            if(document.getElementById('valDriverRoom')?.checked) extraF += 0.03;
            if(document.getElementById('valGarage')?.checked) extraF += 0.03;
            if(document.getElementById('valSecurity')?.checked) extraF += 0.02;

            const final = area * base * ageF * roomsF * streetF * ratioF * extraF;
            const low = Math.round(final*0.9);
            const high = Math.round(final*1.1);
            const avg = Math.round(final);
            
            const roi = Math.round((8.5 - age * 0.15 + (districtFactor - 1) * 3 + (extraF - 1) * 5) * 100) / 100;
            const roiDisplay = roi.toFixed(1) + '%';
            const annualRent = Math.round(avg * roi / 100);
            const confidence = Math.min(95, Math.max(60, Math.round(75 + (districtFactor-1)*15 + (extraF-1)*20 - age*0.5)));
            
            const unit = currentLang==='ar' ? 'ر.س' : 'SAR';
            const prEl = document.getElementById('priceRange');
            const apEl = document.getElementById('avgPrice');
            const roiEl = document.getElementById('roiValue');
            const rentEl = document.getElementById('rentalValue');
            const confEl = document.getElementById('confidenceValue');
            const confFill = document.getElementById('confidenceFill');
            
            if(prEl) prEl.textContent = low.toLocaleString() + ' - ' + high.toLocaleString();
            if(apEl) apEl.textContent = avg.toLocaleString() + ' ' + unit;
            if(roiEl) roiEl.textContent = roiDisplay;
            if(rentEl) rentEl.textContent = annualRent.toLocaleString() + ' ' + unit;
            if(confEl) confEl.textContent = confidence + '%';
            if(confFill) confFill.style.width = confidence + '%';

            let score = 60 + (districtFactor-1)*50 + ((classF[districtClass]||1)-1)*50 + (roomsF-1)*100 + (extraF-1)*100 - age*1.5 + Math.min(streetWidth,30)*0.5;
            score = Math.min(100, Math.max(0, Math.round(score)));
            const idx = document.getElementById('investmentIndex');
            if(idx) {
                if(score>=75){idx.textContent='✅ '+(currentLang==='ar'?'ممتاز':'Excellent')+' ('+score+'%)'; idx.style.color='var(--accent-gold)';}
                else if(score>=55){idx.textContent='👍 '+(currentLang==='ar'?'جيد':'Good')+' ('+score+'%)'; idx.style.color='var(--accent-gold-bright)';}
                else if(score>=35){idx.textContent='⚠️ '+(currentLang==='ar'?'متوسط':'Average')+' ('+score+'%)'; idx.style.color='var(--accent-gold-dark)';}
                else {idx.textContent='👎 '+(currentLang==='ar'?'ضعيف':'Poor')+' ('+score+'%)'; idx.style.color='var(--text-muted)';}
            }
            const result = document.getElementById('valuationResult');
            if(result) result.style.display = wizardSubmitted ? 'block' : 'none';
        }

        function resetValuation() {
            const area = document.getElementById('valArea'); if(area) area.value = 250;
            const rooms = document.getElementById('valRooms'); if(rooms) rooms.value = 4;
            const age = document.getElementById('valAge'); if(age) age.value = 5;
            const street = document.getElementById('valStreetWidth'); if(street) street.value = 15;
            const ratio = document.getElementById('valResidentialRatio'); if(ratio) ratio.value = 50;
            const city = document.getElementById('valCity'); if(city) city.value = 'riyadh';
            const cls = document.getElementById('valDistrictClass'); if(cls) cls.value = 'متوسط';
            const dir = document.getElementById('valDirection'); if(dir) dir.value = 'جنوبية';
            const type = document.getElementById('valPropertyType'); if(type) type.value = 'فيلا';
            document.querySelectorAll('input[name="propertyTypeChoice"]').forEach(el => { el.checked = el.value === 'فيلا'; });
            ['valElevator','valMaidRoom','valCentralAC'].forEach(id => { const el = document.getElementById(id); if(el){el.checked=true; el.closest('label')?.classList.add('active');} });
            ['valPool','valDriverRoom','valFurnished','valGarage','valSecurity'].forEach(id => { const el = document.getElementById(id); if(el){el.checked=false; el.closest('label')?.classList.remove('active');} });
            updateDistricts();
            wizardReset();
        }

        function addNewCity() {
            const name = prompt(currentLang==='ar'?'🏙️ اسم المدينة:':'🏙️ City name:');
            if(name && name.trim()) {
                const key = name.trim().toLowerCase().replace(/\s+/g,'-');
                const sel = document.getElementById('valCity');
                const o = document.createElement('option');
                o.value=key; o.textContent=name.trim();
                sel.appendChild(o); sel.value=key;
                cityPricePerMeter[key] = parseFloat(prompt(currentLang==='ar'?'💰 سعر المتر:':'💰 Price per meter:', '3000')) || 3000;
                districtsData[key] = {};
                const dists = prompt(currentLang==='ar'?'📍 الأحياء (بفاصلة):':'📍 Districts (comma separated):', '');
                if(dists) dists.split(',').forEach(d => districtsData[key][d.trim()]=1);
                updateDistricts();
            }
        }

        function showValuationDetails() {
            const city = document.getElementById('valCity')?.selectedOptions[0]?.textContent || '--';
            const district = document.getElementById('valDistrict')?.value || '--';
            const type = localizedPropertyType(document.getElementById('valPropertyType')?.value || '--');
            const area = document.getElementById('valArea')?.value || '--';
            const avg = document.getElementById('avgPrice')?.textContent || '--';
            const roi = document.getElementById('roiValue')?.textContent || '--';
            const rent = document.getElementById('rentalValue')?.textContent || '--';
            const conf = document.getElementById('confidenceValue')?.textContent || '--';
            alert('📋 '+(currentLang==='ar'?'تفاصيل التقييم':'Valuation Details')+'\n\n'+
                  '🏙️ '+(currentLang==='ar'?'المدينة':'City')+': '+city+'\n'+
                  '📍 '+(currentLang==='ar'?'الحي':'District')+': '+district+'\n'+
                  '🏠 '+(currentLang==='ar'?'النوع':'Type')+': '+type+'\n'+
                  '📐 '+(currentLang==='ar'?'المساحة':'Area')+': '+area+' m²\n'+
                  '💰 '+(currentLang==='ar'?'المتوسط':'Average')+': '+avg+'\n'+
                  '📈 ROI: '+roi+'\n'+
                  '🏠 '+(currentLang==='ar'?'الإيجار':'Rent')+': '+rent+'\n'+
                  '🎯 '+(currentLang==='ar'?'الثقة':'Confidence')+': '+conf);
        }
        
        function shareValuation() {
            const text = '🏠 '+(currentLang==='ar'?'تقييم عقاري':'Property Valuation')+'\n💰 '+(document.getElementById('avgPrice')?.textContent || '')+'\n📈 ROI: '+(document.getElementById('roiValue')?.textContent || '');
            if(navigator.share){navigator.share({title:'همة المدينة',text:text}).catch(()=>{});}
            else{navigator.clipboard.writeText(text).then(()=>alert('✅ '+(currentLang==='ar'?'تم النسخ':'Copied'))).catch(()=>alert(text));}
        }
        
        function downloadPDFReport() {
            const city = document.getElementById('valCity')?.selectedOptions[0]?.textContent || '--';
            const district = document.getElementById('valDistrict')?.value || '--';
            const avg = document.getElementById('avgPrice')?.textContent || '--';
            const roi = document.getElementById('roiValue')?.textContent || '--';
            const conf = document.getElementById('confidenceValue')?.textContent || '--';
            const content = (currentLang==='ar'?'تقرير تقييم عقاري':'Property Valuation Report')+'\n\n'+
                           (currentLang==='ar'?'المدينة':'City')+': '+city+'\n'+
                           (currentLang==='ar'?'الحي':'District')+': '+district+'\n'+
                           (currentLang==='ar'?'السعر المتوقع':'Estimated Price')+': '+avg+'\n'+
                           'ROI: '+roi+'\n'+
                           (currentLang==='ar'?'نسبة الثقة':'Confidence')+': '+conf+'\n\n'+
                           'Himmat Al Madinah Real Estate\n'+
                           'Fal License: 1200030428';
            const blob = new Blob([content], {type:'text/plain;charset=utf-8'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'valuation_report.txt';
            a.click();
            URL.revokeObjectURL(url);
        }

        function updateAddDistricts() {
            const city = document.getElementById('addCity')?.value;
            const sel = document.getElementById('addDistrict');
            if(!sel) return;
            sel.innerHTML = '<option value="">--</option>';
            const map = {'الرياض':'riyadh','جدة':'jeddah','مكة المكرمة':'makkah','المدينة المنورة':'madinah'};
            const key = map[city];
            if(key && districtsData[key]) Object.keys(districtsData[key]).forEach(d => {
                const o=document.createElement('option');
                o.value=d;
                o.textContent = currentLang === 'en' ? (districtTranslations[d] || d) : d;
                sel.appendChild(o);
            });
        }
        
        function handleExcelFile(e) {
            if(e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                alert('📂 '+file.name+' - '+(currentLang==='ar'?'جاري المعالجة':'Processing'));
                const preview = document.getElementById('excelPreview');
                if(preview) {
                    preview.style.display = 'block';
                    preview.innerHTML = '<p style="font-size:13px;color:var(--accent-gold);font-weight:700;">✅ '+(currentLang==='ar'?'تم تحميل الملف بنجاح':'File uploaded successfully')+'</p>';
                }
            }
        }
        
        function addPropertyManually() {
            if(!document.getElementById('addDistrict')?.value || !document.getElementById('addPrice')?.value || !document.getElementById('addArea')?.value) { alert(currentLang==='ar'?'عبئ الحقول الأساسية':'Fill required fields'); return; }
            alert(currentLang==='ar'?'✅ تم الإدراج والتقييم':'✅ Added successfully');
            ['addDistrict','addPrice','addArea','addDescription'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
        }

        function toggleFAQ(el) {
            const ans = el.querySelector('.faq-answer');
            const tog = el.querySelector('.faq-toggle');
            if(ans.style.display === 'none' || !ans.style.display) { ans.style.display='block'; tog.textContent='➖'; }
            else { ans.style.display='none'; tog.textContent='➕'; }
        }

        function showContract(type) {
            const res = document.getElementById('residentialContract');
            const com = document.getElementById('commercialContract');
            if(res) res.style.display = type==='residential' ? 'block' : 'none';
            if(com) com.style.display = type==='commercial' ? 'block' : 'none';
        }
        function gv(id) { const el = document.getElementById(id); return el ? (el.value || '________') : '________'; }

        function generateFullResidentialContract() {
            const isAr = currentLang === 'ar';
            const html = `
            <div style="text-align:center;margin-bottom:10px;"><h3 style="color:var(--text-main);font-size:16px;font-weight:900;">${isAr?'عقد إيجار سكني':'Residential Lease Contract'}</h3></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'١. بيانات العقد':'1. Contract Data'}</h4><p style="color:var(--text-muted);font-size:11px;">${isAr?'رقم':'No'}: 1-0/${Date.now().toString().slice(-10)} | ${isAr?'المكان':'Location'}: ${gv('resCity')}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٢. المؤجر':'2. Lessor'}</h4><p style="color:var(--text-muted);font-size:11px;">${gv('resLessorName')} - ${gv('resLessorID')}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٣. المستأجر':'3. Tenant'}</h4><p style="color:var(--text-muted);font-size:11px;">${gv('resTenantName')} - ${gv('resTenantID')}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٤. العقار':'4. Property'}</h4><p style="color:var(--text-muted);font-size:11px;">${gv('resCity')} - ${gv('resDistrict')} - ${gv('resUnitType')} - ${gv('resArea')} ${isAr?'م²':'m²'}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٥. المالية':'5. Financial'}</h4><p style="color:var(--text-muted);font-size:11px;">${isAr?'الإيجار':'Rent'}: ${Number(gv('resAnnualRent')).toLocaleString()} ${isAr?'ريال':'SAR'} | ${isAr?'المدة':'Duration'}: ${gv('resDuration')} ${isAr?'شهر':'months'}</p></div>
            <div style="text-align:center;margin-top:10px;display:flex;gap:8px;justify-content:center;"><button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ ${isAr?'طباعة':'Print'}</button><button class="btn btn-outline btn-sm" onclick="closePrintWindow()">${isAr?'إغلاق':'Close'}</button></div>`;
            openPrintWindow(html);
        }

        function generateFullCommercialContract() {
            const isAr = currentLang === 'ar';
            const html = `
            <div style="text-align:center;margin-bottom:10px;"><h3 style="color:var(--text-main);font-size:16px;font-weight:900;">${isAr?'عقد إيجار تجاري موحد':'Commercial Lease Contract'}</h3></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'١. بيانات العقد':'1. Contract Data'}</h4><p style="color:var(--text-muted);font-size:11px;">${isAr?'رقم':'No'}: 1-0/${Date.now().toString().slice(-10)} | ${isAr?'المكان':'Location'}: ${gv('comCity')}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٢. المؤجر':'2. Lessor'}</h4><p style="color:var(--text-muted);font-size:11px;">${gv('comLessorName')} - ${isAr?'سجل':'CR'}: ${gv('comLessorCR')}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٣. المستأجر':'3. Tenant'}</h4><p style="color:var(--text-muted);font-size:11px;">${gv('comTenantName')} - ${isAr?'سجل':'CR'}: ${gv('comTenantCR')}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٤. النشاط':'4. Activity'}</h4><p style="color:var(--text-muted);font-size:11px;">${gv('comActivity')}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٥. العقار':'5. Property'}</h4><p style="color:var(--text-muted);font-size:11px;">${gv('comCity')} - ${gv('comDistrict')} - ${gv('comArea')} ${isAr?'م²':'m²'}</p></div>
            <div class="contract-section"><h4 style="color:var(--accent-gold);font-size:12px;">${isAr?'٦. المالية':'6. Financial'}</h4><p style="color:var(--text-muted);font-size:11px;">${isAr?'الإيجار':'Rent'}: ${Number(gv('comAnnualRent')).toLocaleString()} ${isAr?'ريال':'SAR'} | ${isAr?'المدة':'Duration'}: ${gv('comDuration')} ${isAr?'شهر':'months'}</p></div>
            <div style="text-align:center;margin-top:10px;display:flex;gap:8px;justify-content:center;"><button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ ${isAr?'طباعة':'Print'}</button><button class="btn btn-outline btn-sm" onclick="closePrintWindow()">${isAr?'إغلاق':'Close'}</button></div>`;
            openPrintWindow(html);
        }

        function openPrintWindow(html) {
            document.getElementById('contractPrintContent').innerHTML = html;
            document.getElementById('contractPrintWindow').classList.add('active');
        }
        function closePrintWindow() { document.getElementById('contractPrintWindow').classList.remove('active'); }

        function toggleChat() { document.getElementById('chatWindow').classList.toggle('active'); }
        
        function sendChat() {
            const input = document.getElementById('chatInput');
            const msg = input.value.trim();
            if(!msg) return;
            const container = document.getElementById('chatMessages');
            const userDiv = document.createElement('div');
            userDiv.style.cssText = 'background:var(--accent-gold);color:var(--text-on-gold);padding:10px 14px;border-radius:10px;margin-bottom:8px;max-width:85%;margin-right:auto;font-size:13px;font-weight:700;';
            userDiv.textContent = msg;
            container.appendChild(userDiv);
            input.value = '';
            container.scrollTop = container.scrollHeight;
            setTimeout(() => {
                const botDiv = document.createElement('div');
                botDiv.style.cssText = 'background:var(--bg-input);padding:10px 14px;border-radius:10px;margin-bottom:8px;max-width:85%;font-size:13px;color:var(--text-main);border:1px solid var(--border-color);';
                const lower = msg.toLowerCase();
                if(lower.includes('تقييم')||lower.includes('سعر')||lower.includes('valuation')||lower.includes('price')) botDiv.textContent = currentLang==='ar'?'استخدم أداة التقييم 📊':'Use valuation tool 📊';
                else if(lower.includes('عقد')||lower.includes('contract')) botDiv.textContent = currentLang==='ar'?'تفضل صفحة العقود 📄':'Check contracts page 📄';
                else if(lower.includes('فيلا')||lower.includes('شقة')||lower.includes('villa')||lower.includes('apartment')) botDiv.textContent = currentLang==='ar'?'تفضل صفحة العروض 💰':'Check offers page 💰';
                else botDiv.textContent = currentLang==='ar'?'شكراً! راسلنا واتساب 📞':'Thanks! Contact us on WhatsApp 📞';
                container.appendChild(botDiv);
                container.scrollTop = container.scrollHeight;
            }, 500);
        }

        function showOfferDetails(t) { alert('📋 '+t); }
        
        function verifyLicense() {
            alert(currentLang==='ar'?'✓ رخصة فال العقارية: 1200030428\n\nهذه الرخصة صادرة عن الهيئة العامة للعقار\nللتحقق: https://fal.sa':'✓ Fal Real Estate License: 1200030428\n\nIssued by Real Estate General Authority\nVerify: https://fal.sa');
        }

        document.addEventListener('DOMContentLoaded', () => {
            initializeLocationSearch();
            const savedLang = localStorage.getItem('lang') || 'ar';
            switchLanguage(savedLang);
            
            const savedTheme = localStorage.getItem('theme') || 'dark';
            if(savedTheme === 'light') {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                const toggle = document.getElementById('themeToggle');
                if(toggle) toggle.textContent = '☀️';
            }
            animateCounters();
            navigateTo('home');
            updateAddDistricts();
            
            setTimeout(() => {
                const cityEl = document.getElementById('valCity');
                if(cityEl) {
                    cityEl.value = 'riyadh';
                    updateDistricts();
                    const typeEl = document.getElementById('valPropertyType');
                    if(typeEl) typeEl.value = 'شقة في عمارة';
                    const defaultTypeChoice = document.querySelector('input[name="propertyTypeChoice"][value="شقة في عمارة"]');
                    if(defaultTypeChoice) defaultTypeChoice.checked = true;
                    calculateValuation();
                    wizardReset();
                }
            }, 200);
            const cpw = document.getElementById('contractPrintWindow');
            if(cpw) cpw.addEventListener('click', function(e) { if(e.target === this) closePrintWindow(); });
        });
    