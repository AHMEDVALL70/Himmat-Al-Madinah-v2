
## Invalid submission browser test
An intentionally invalid email (`invalid-email`) was entered at step 5 and submitted. The UI remained on the contact step and displayed the structured validation summary: `راجع البيانات التالية: البريد الإلكتروني: Invalid email`. This confirms the tRPC formatter and client field-error summary are connected end to end.

## Image upload update

أضيفت منطقة رفع صور مخصصة في خطوة المواصفات داخل Home.tsx، مع دعم السحب والإفلات، اختيار PNG/JPG/WebP، حد أقصى 5 صور، معاينات، وحذف الصور. اختبار DOM عبر رابط المعاينة العام واجه طبقة مشاركة تمنع التفاعل المباشر، لذلك يعتمد التحقق النهائي على فحص البناء والمعاينة المحلية.

## Image uploader browser verification

على الخادم المحلي تم الوصول إلى الخطوة الرابعة ثم إرسال ملف `bad.txt`، وظهرت رسالة المستخدم العربية `نوع الملف غير مدعوم`.

تم اختبار دفعة تحتوي على صورة PNG سليمة وملف JPG بمحتوى غير صالح؛ بقيت معاينة الصورة السليمة (`validPreviewCount: 1`) ولم تسقط الدفعة كلها. كما تم اختبار ملفين متطابقين داخل الدفعة نفسها، وظهرت رسالة `الصورة مضافة مسبقاً أو مكررة`.

تم اختبار إضافة صورة ثانية ثم تحريكها للأعلى؛ تغير ترتيب المعاينات كما هو متوقع. كما تم إرسال ست صور دفعة واحدة، وظهرت رسالة `يمكن إضافة 5 صور كحد أقصى`.

تم اختبار ملف `large.jpg` بحجم أكبر من 8MB في الخطوة الرابعة، وظهر تنبيه الحجم للمستخدم (`errorShown: true`) دون كسر تدفق التقييم.
