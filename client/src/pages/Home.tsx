import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronUp, CircleDollarSign, FileCheck2, Gauge, LockKeyhole, MapPin, RotateCcw, Send, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { trpc } from "@/lib/trpc";

type Lang = "ar" | "en";
type FormState = {
  purpose: "sell" | "buy" | "invest" | "learn";
  city: string;
  district: string;
  propertyType: "apartment" | "villa" | "land" | "office" | "shop" | "building";
  areaSqm: number;
  ageYears: number;
  condition: "new" | "excellent" | "good" | "fair" | "needs_work";
  marketPricePerSqm: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  consent: boolean;
  downPaymentPercent: number;
  annualRatePercent: number;
  termYears: number;
};

const initialForm: FormState = {
  purpose: "sell", city: "المدينة المنورة", district: "العزيزية", propertyType: "villa", areaSqm: 280,
  ageYears: 8, condition: "good", marketPricePerSqm: 4200, customerName: "", customerPhone: "", customerEmail: "",
  consent: false, downPaymentPercent: 20, annualRatePercent: 5.5, termYears: 25,
};

const copy = {
  ar: {
    nav: ["الرئيسية", "التقييم الذكي", "كيف يعمل", "الشفافية"], heroKicker: "منصة همة المدينة العقارية", heroTitle: "اعرف قيمة عقارك بقرار أوضح", heroBody: "تقييم إرشادي خادمي يجمع بيانات العقار، يقارنها بقواعد السوق، ويعرض النطاق والعوامل المؤثرة بشفافية.", start: "ابدأ التقييم", how: "كيف يعمل التقييم؟", live: "نتيجة خادمية حقيقية", liveBody: "لا نعتمد على حساب واجهة فقط؛ تُراجع المدخلات خادمياً وتُحفظ النتيجة بمرجع فريد.", steps: ["الغرض", "الموقع", "العقار", "المواصفات", "التواصل", "النتيجة"], next: "التالي", back: "السابق", reset: "إعادة", submit: "احسب التقييم", working: "جارٍ احتساب النتيجة...", result: "نتيجتك الإرشادية", range: "النطاق التقديري", confidence: "مؤشر الثقة", factors: "العوامل المؤثرة", ref: "مرجع التقييم", use: "استخدم القيمة في حاسبة التمويل", finance: "حاسبة التمويل العقاري", monthly: "القسط الشهري التقديري", financed: "مبلغ التمويل", down: "الدفعة الأولى", rate: "نسبة الربح السنوية", term: "مدة التمويل", price: "قيمة العقار", contact: "بيانات التواصل (اختيارية)", name: "الاسم", phone: "الجوال", email: "البريد الإلكتروني", consent: "أوافق على حفظ بيانات التقييم والتواصل معي بشأن النتيجة.", city: "المدينة", district: "الحي", type: "نوع العقار", area: "المساحة م²", age: "العمر بالسنوات", condition: "الحالة", market: "سعر السوق المدخل للمتر", explain: "نستخدم محرك قواعد ومقارنات أولي. يمكن استبداله لاحقاً بنموذج ML مدرب على صفقات موثقة.", disclaimer: "هذا تقدير إرشادي مبدئي وليس تقييماً معتمداً أو تقرير مثمن مرخص. تحقق من البيانات النهائية مع مثمن مرخص.", required: "أكمل الحقول المطلوبة للمتابعة.", saved: "تم حفظ التقييم خادمياً.", noDb: "تعذر حفظ التقييم حالياً. تحقق من اتصال قاعدة البيانات وحاول مرة أخرى." },
  en: {
    nav: ["Home", "Smart valuation", "How it works", "Transparency"], heroKicker: "Himmat Al-Madinah valuation platform", heroTitle: "Know your property value with clarity", heroBody: "A server-backed indicative valuation that combines property inputs, market rules, and transparent estimate factors.", start: "Start valuation", how: "How it works", live: "Real server-side result", liveBody: "Inputs are validated on the server and saved with a unique valuation reference.", steps: ["Purpose", "Location", "Property", "Details", "Contact", "Result"], next: "Next", back: "Back", reset: "Reset", submit: "Calculate valuation", working: "Calculating server-side result...", result: "Your indicative result", range: "Estimated range", confidence: "Confidence indicator", factors: "Key factors", ref: "Valuation reference", use: "Use value in mortgage calculator", finance: "Mortgage calculator", monthly: "Indicative monthly payment", financed: "Financed amount", down: "Down payment", rate: "Annual profit rate", term: "Term", price: "Property value", contact: "Contact details (optional)", name: "Name", phone: "Mobile", email: "Email", consent: "I agree to save valuation data and be contacted about the result.", city: "City", district: "District", type: "Property type", area: "Area m²", age: "Age in years", condition: "Condition", market: "Entered market price per m²", explain: "We use a transparent rules and comparables engine first; a trained ML model can replace or augment it later.", disclaimer: "This is an indicative estimate, not a licensed appraisal or certified valuation report. Verify final details with a licensed appraiser.", required: "Complete the required fields to continue.", saved: "Valuation saved server-side.", noDb: "The valuation could not be saved. Check database connectivity and try again." },
};

const options = {
  purpose: { sell: ["أريد البيع", "I want to sell"], buy: ["أريد الشراء", "I want to buy"], invest: ["أريد الاستثمار", "I want to invest"], learn: ["للمعرفة", "For knowledge"] },
  propertyType: { apartment: ["شقة", "Apartment"], villa: ["فيلا", "Villa"], land: ["أرض", "Land"], office: ["مكتب", "Office"], shop: ["محل", "Shop"], building: ["عمارة", "Building"] },
  condition: { new: ["جديد", "New"], excellent: ["ممتاز", "Excellent"], good: ["جيد", "Good"], fair: ["متوسط", "Fair"], needs_work: ["يحتاج ترميماً", "Needs work"] },
};

function money(value: number, lang: Lang) { return new Intl.NumberFormat(lang === "ar" ? "ar-SA" : "en-US", { maximumFractionDigits: 0 }).format(value) + (lang === "ar" ? " ر.س" : " SAR"); }
function percent(value: number) { return `${Math.round(value)}%`; }

export default function Home() {
  const [lang, setLang] = useState<Lang>("ar");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<Awaited<ReturnType<typeof trpc.valuation.submit.useMutation>>["data"]>(undefined);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const t = copy[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const valuation = trpc.valuation.submit.useMutation({
    onSuccess: (data) => { setResult(data); setServerErrors({}); setStep(6); toast.success(t.saved); },
    onError: (error) => {
      const fieldErrors = (error as { data?: { zodError?: { fieldErrors?: Record<string, string[]> } } }).data?.zodError?.fieldErrors ?? {};
      setServerErrors(fieldErrors);
      toast.error(Object.values(fieldErrors).flat().join(" ") || error.message || t.noDb);
    },
  });
  const estimatedPrice = result?.pointPrice ?? form.marketPricePerSqm * form.areaSqm;
  const financed = estimatedPrice * (1 - form.downPaymentPercent / 100);
  const monthly = useMemo(() => {
    const r = form.annualRatePercent / 100 / 12;
    const n = form.termYears * 12;
    return r === 0 ? financed / n : financed * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  }, [financed, form.annualRatePercent, form.termYears]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) { setForm((current) => ({ ...current, [key]: value })); }
  function validateCurrent() {
    if (step === 1 && !form.purpose) return false;
    if (step === 2 && (!form.city.trim() || !form.district.trim())) return false;
    if (step === 3 && !form.propertyType) return false;
    if (step === 4 && (!form.areaSqm || !form.marketPricePerSqm)) return false;
    return true;
  }
  function advance() {
    if (!validateCurrent()) { toast.error(t.required); return; }
    setServerErrors({});
    setStep((current) => Math.min(5, current + 1));
  }
  function submit() { if (!validateCurrent()) { toast.error(t.required); return; } valuation.mutate(form); }
  function reset() { setForm(initialForm); setResult(undefined); setStep(1); valuation.reset(); }

  return <div dir={dir} className="min-h-screen bg-[#07111f] text-[#f8f3e7] selection:bg-[#d7b45a] selection:text-[#07111f]">
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center border border-[#d7b45a]/60 text-[#d7b45a]"><Sparkles size={18}/></div><div><div className="text-sm font-semibold tracking-[0.22em] text-[#d7b45a]">HIMMAT</div><div className="text-[10px] tracking-[0.3em] text-white/45">AL MADINAH</div></div></a>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">{t.nav.map((item, index) => <a key={item} href={index === 1 ? "#valuation" : index === 2 ? "#how" : "#top"} className="transition-colors hover:text-[#d7b45a]">{item}</a>)}</nav>
        <div className="flex items-center gap-2"><Button variant="ghost" onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="text-xs text-white/70 hover:bg-white/10 hover:text-white">{lang === "ar" ? "EN" : "عربي"}</Button><Button onClick={() => document.getElementById("valuation")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#d7b45a] text-[#07111f] hover:bg-[#edd078]">{t.start}</Button></div>
      </div>
    </header>

    <main id="top">
      <section className="relative overflow-hidden border-b border-white/10"><div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(215,180,90,.15),transparent_33%),linear-gradient(135deg,#07111f_0%,#0c1c31_48%,#07111f_100%)]"/><div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-28"><div><p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#d7b45a]"><span className="h-px w-10 bg-[#d7b45a]"/>{t.heroKicker}</p><h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">{t.heroTitle}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">{t.heroBody}</p><div className="mt-9 flex flex-wrap gap-3"><Button onClick={() => document.getElementById("valuation")?.scrollIntoView({ behavior: "smooth" })} className="h-12 bg-[#d7b45a] px-6 text-[#07111f] hover:bg-[#edd078]"><CircleDollarSign className="me-2" size={18}/>{t.start}</Button><Button variant="outline" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} className="h-12 border-white/20 bg-transparent px-6 text-white hover:bg-white/10">{t.how}</Button></div></div><div className="relative border border-white/10 bg-white/[.035] p-7 shadow-2xl shadow-black/20"><div className="flex items-start justify-between"><div><p className="text-xs uppercase tracking-[0.22em] text-[#d7b45a]">01 / 06</p><h2 className="mt-3 text-2xl font-semibold">{t.live}</h2></div><ShieldCheck className="text-[#d7b45a]" size={26}/></div><p className="mt-4 leading-7 text-white/55">{t.liveBody}</p><div className="mt-8 grid grid-cols-2 gap-px bg-white/10"><div className="bg-[#0b192b] p-5"><Gauge className="mb-4 text-[#d7b45a]" size={20}/><div className="text-2xl font-semibold">6</div><div className="mt-1 text-xs text-white/45">{lang === "ar" ? "خطوات واضحة" : "clear steps"}</div></div><div className="bg-[#0b192b] p-5"><LockKeyhole className="mb-4 text-[#d7b45a]" size={20}/><div className="text-2xl font-semibold">API</div><div className="mt-1 text-xs text-white/45">{lang === "ar" ? "تحقق خادمي" : "server validation"}</div></div></div></div></div></section>

      <section id="valuation" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 lg:px-8"><div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7b45a]">{lang === "ar" ? "التقييم الذكي" : "Smart valuation"}</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">{step === 6 ? t.result : `${t.steps[step - 1]} · ${lang === "ar" ? `الخطوة ${step} من 6` : `Step ${step} of 6`}`}</h2></div><div className="min-w-[220px] md:w-72"><div className="mb-2 flex justify-between text-xs text-white/45"><span>{Math.round((step / 6) * 100)}%</span><span>{t.steps[step - 1]}</span></div><Progress value={(step / 6) * 100} className="h-1.5 bg-white/10 [&>div]:bg-[#d7b45a]"/></div></div>
        <div className="grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
          <div className="border border-white/10 bg-white/[.035] p-6 md:p-9">
            {step === 1 && <Step title={lang === "ar" ? "ما هدفك من التقييم؟" : "What is your valuation goal?"}><div className="grid gap-3 sm:grid-cols-2">{Object.entries(options.purpose).map(([key, labels]) => <Choice key={key} selected={form.purpose === key} onClick={() => set("purpose", key as FormState["purpose"])}>{labels[lang === "ar" ? 0 : 1]}</Choice>)}</div></Step>}
            {step === 2 && <Step title={lang === "ar" ? "حدد موقع العقار" : "Locate the property"}><div className="grid gap-5 sm:grid-cols-2"><Field label={t.city} icon={<MapPin size={16}/>} value={form.city} onChange={(value) => set("city", value)} placeholder={lang === "ar" ? "مثال: المدينة المنورة" : "e.g. Al Madinah"}/><Field label={t.district} value={form.district} onChange={(value) => set("district", value)} placeholder={lang === "ar" ? "مثال: العزيزية" : "e.g. Al Aziziyah"}/></div></Step>}
            {step === 3 && <Step title={lang === "ar" ? "ما نوع العقار؟" : "What is the property type?"}><div className="grid gap-3 sm:grid-cols-3">{Object.entries(options.propertyType).map(([key, labels]) => <Choice key={key} selected={form.propertyType === key} onClick={() => set("propertyType", key as FormState["propertyType"])}>{labels[lang === "ar" ? 0 : 1]}</Choice>)}</div></Step>}
            {step === 4 && <Step title={lang === "ar" ? "أدخل مواصفات العقار والسوق" : "Add property and market details"}><div className="space-y-7"><RangeField label={t.area} value={form.areaSqm} min={20} max={2000} step={10} suffix="م²" onChange={(value) => set("areaSqm", value)}/><RangeField label={t.age} value={form.ageYears} min={0} max={70} step={1} suffix={lang === "ar" ? "سنة" : "yrs"} onChange={(value) => set("ageYears", value)}/><Field label={t.market} value={String(form.marketPricePerSqm)} onChange={(value) => set("marketPricePerSqm", Number(value) || 0)} type="number"/><div><Label className="mb-3 block text-white/70">{t.condition}</Label><div className="flex flex-wrap gap-2">{Object.entries(options.condition).map(([key, labels]) => <button type="button" key={key} onClick={() => set("condition", key as FormState["condition"])} className={`border px-4 py-2 text-sm ${form.condition === key ? "border-[#d7b45a] bg-[#d7b45a]/15 text-[#efd47d]" : "border-white/10 text-white/55 hover:border-white/25"}`}>{labels[lang === "ar" ? 0 : 1]}</button>)}</div></div></div></Step>}
            {step === 5 && <Step title={t.contact}><div className="grid gap-5 sm:grid-cols-2"><Field label={t.name} value={form.customerName} onChange={(value) => set("customerName", value)}/><Field label={t.phone} value={form.customerPhone} onChange={(value) => set("customerPhone", value)} type="tel"/><Field label={t.email} value={form.customerEmail} onChange={(value) => set("customerEmail", value)} type="email"/></div><label className="mt-6 flex items-start gap-3 text-sm leading-6 text-white/60"><input type="checkbox" checked={form.consent} onChange={(event) => set("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-[#d7b45a]"/><span>{t.consent}</span></label>{Object.keys(serverErrors).length > 0 && <div role="alert" className="mt-6 border border-red-300/25 bg-red-400/10 p-4 text-sm leading-6 text-red-100"><div className="mb-1 font-semibold">{lang === "ar" ? "راجع البيانات التالية:" : "Review these fields:"}</div>{Object.entries(serverErrors).map(([field, messages]) => <p key={field}><strong>{formatFieldName(field, t)}:</strong> {messages.join(" ")}</p>)}</div>}</Step>}
            {step === 6 && (result ? <ResultPanel result={result} t={t} lang={lang} /> : <div className="border border-white/10 bg-white/[.02] p-8 text-center text-white/55">{lang === "ar" ? "لم تصل نتيجة بعد. أعد إرسال بيانات التقييم." : "No result yet. Submit the valuation details again."}</div>)}
            {step < 6 && <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6"><Button variant="ghost" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1} className="text-white/60 hover:bg-white/10 hover:text-white"><ArrowRight className="me-2" size={16}/>{t.back}</Button><div className="flex gap-2"><Button variant="ghost" onClick={reset} className="text-white/45 hover:bg-white/10 hover:text-white"><RotateCcw className="me-2" size={15}/>{t.reset}</Button>{step < 5 ? <Button onClick={advance} className="bg-[#d7b45a] text-[#07111f] hover:bg-[#efd27a]">{t.next}<ArrowLeft className="ms-2" size={16}/></Button> : <Button onClick={submit} disabled={valuation.isPending} className="bg-[#d7b45a] text-[#07111f] hover:bg-[#efd27a]">{valuation.isPending ? t.working : t.submit}<Send className="ms-2" size={16}/></Button>}</div></div>}
            {step === 6 && <div className="mt-8 flex justify-between border-t border-white/10 pt-6"><Button variant="ghost" onClick={reset} className="text-white/55 hover:bg-white/10 hover:text-white"><RotateCcw className="me-2" size={15}/>{t.reset}</Button><span className="flex items-center gap-2 text-xs text-emerald-300"><Check size={15}/>{t.saved}</span></div>}
          </div>
          <MortgageCard t={t} lang={lang} form={form} set={set} estimatedPrice={estimatedPrice} financed={financed} monthly={monthly} hasResult={Boolean(result)} onUseResult={() => result && set("marketPricePerSqm", result.pointPrice / form.areaSqm)} />
        </div>
      </section>

      <section id="how" className="border-y border-white/10 bg-[#0b192b] scroll-mt-24"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.75fr_1.25fr] lg:px-8"><div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d7b45a]">{lang === "ar" ? "الشفافية أولاً" : "Transparency first"}</p><h2 className="mt-4 text-3xl font-semibold">{t.how}</h2><p className="mt-5 leading-8 text-white/55">{t.explain}</p></div><div className="grid gap-px bg-white/10 sm:grid-cols-3"><Info icon={<ShieldCheck/>} title={lang === "ar" ? "تحقق خادمي" : "Server validation"} body={lang === "ar" ? "تنظيف وتحقق قبل الحساب والحفظ." : "Inputs are sanitized before calculation and storage."}/><Info icon={<FileCheck2/>} title={lang === "ar" ? "مرجع فريد" : "Unique reference"} body={lang === "ar" ? "كل نتيجة قابلة للتتبع برقم تقييم." : "Every result is traceable by a valuation reference."}/><Info icon={<Gauge/>} title={lang === "ar" ? "قابل للتطور" : "ML-ready"} body={lang === "ar" ? "محرك القواعد مصمم ليستقبل نموذج ML لاحقاً." : "The rules engine exposes a path for an ML model later."}/></div></div></section>
    </main>
    <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 Himmat Al-Madinah</span><span>{t.disclaimer}</span></footer>
  </div>;
}

function Step({ title, children }: { title: string; children: React.ReactNode }) { return <div><h3 className="mb-7 text-2xl font-semibold text-white">{title}</h3>{children}</div>; }
function Choice({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) { return <button type="button" onClick={onClick} className={`min-h-20 border p-5 text-start transition ${selected ? "border-[#d7b45a] bg-[#d7b45a]/10 text-[#efd47d]" : "border-white/10 bg-white/[.02] text-white/70 hover:border-white/25"}`}><span className="mb-3 block h-2 w-2 rounded-full bg-current"/>{children}</button>; }
function Field({ label, value, onChange, placeholder, type = "text", icon }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; icon?: React.ReactNode }) { return <div><Label className="mb-2 flex items-center gap-2 text-white/65">{icon}{label}</Label><Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} className="border-white/10 bg-[#07111f] text-white placeholder:text-white/25 focus-visible:ring-[#d7b45a]"/></div>; }
function RangeField({ label, value, min, max, step, suffix, onChange }: { label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (value: number) => void }) { return <div><div className="mb-3 flex items-center justify-between"><Label className="text-white/65">{label}</Label><span className="text-sm font-semibold text-[#efd47d]">{value.toLocaleString()} {suffix}</span></div><Slider value={[value]} min={min} max={max} step={step} onValueChange={(values) => onChange(values[0] ?? value)} className="[&_[role=slider]]:border-[#d7b45a] [&_[role=slider]]:bg-[#d7b45a] [&>span:first-child]:bg-white/10 [&>span:first-child>span]:bg-[#d7b45a]"/></div>; }
function MortgageCard({ t, lang, form, set, estimatedPrice, financed, monthly, hasResult, onUseResult }: { t: typeof copy.ar; lang: Lang; form: FormState; set: <K extends keyof FormState>(key: K, value: FormState[K]) => void; estimatedPrice: number; financed: number; monthly: number; hasResult: boolean; onUseResult: () => void }) { return <aside className="border border-[#d7b45a]/25 bg-[#d7b45a]/[.05] p-6 md:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7b45a]">{lang === "ar" ? "تقدير تمويلي" : "Financing estimate"}</p><h3 className="mt-3 text-2xl font-semibold">{t.finance}</h3></div><CircleDollarSign className="text-[#d7b45a]"/></div><div className="mt-8"><Label className="text-white/65">{t.price}</Label><div className="mt-2 text-3xl font-semibold text-[#efd47d]">{money(estimatedPrice, lang)}</div>{hasResult && <Button variant="outline" onClick={onUseResult} className="mt-3 border-[#d7b45a]/40 bg-transparent text-xs text-[#efd47d] hover:bg-[#d7b45a]/10">{t.use}</Button>}</div><div className="mt-8 space-y-6"><RangeField label={t.down} value={form.downPaymentPercent} min={0} max={70} step={5} suffix="%" onChange={(value) => set("downPaymentPercent", value)}/><RangeField label={t.rate} value={form.annualRatePercent} min={0} max={15} step={0.1} suffix="%" onChange={(value) => set("annualRatePercent", value)}/><RangeField label={t.term} value={form.termYears} min={5} max={30} step={1} suffix={lang === "ar" ? "سنة" : "yrs"} onChange={(value) => set("termYears", value)}/></div><div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2"><Metric label={t.monthly} value={money(monthly, lang)}/><Metric label={t.financed} value={money(financed, lang)}/></div><p className="mt-5 text-xs leading-6 text-white/45">{t.disclaimer}</p></aside>; }
function formatFieldName(field: string, t: typeof copy.ar) { const labels: Record<string, string> = { customerName: t.name, customerPhone: t.phone, customerEmail: t.email, city: t.city, district: t.district, propertyType: t.type, areaSqm: t.area, ageYears: t.age, condition: t.condition, marketPricePerSqm: t.market, consent: t.consent }; return labels[field] ?? field; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="bg-[#101f33] p-4"><div className="text-xs text-white/45">{label}</div><div className="mt-2 font-semibold text-white">{value}</div></div>; }
function Info({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) { return <div className="bg-[#0b192b] p-6"><div className="mb-5 text-[#d7b45a]">{icon}</div><h3 className="font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/45">{body}</p></div>; }
function ResultPanel({ result, t, lang }: { result: NonNullable<Awaited<ReturnType<typeof trpc.valuation.submit.useMutation>>["data"]>; t: typeof copy.ar; lang: Lang }) { return <div><div className="grid gap-px bg-white/10 sm:grid-cols-3"><Metric label={t.range} value={`${money(result.lowPrice, lang)} — ${money(result.highPrice, lang)}`}/><Metric label={t.confidence} value={percent(result.confidence)}/><Metric label={t.ref} value={result.valuationRef}/></div><div className="mt-8"><h3 className="mb-4 text-xl font-semibold">{t.factors}</h3><div className="grid gap-3 sm:grid-cols-2">{result.factors.map((factor) => <div key={factor.key} className="border border-white/10 bg-white/[.02] p-4"><div className="flex justify-between gap-3"><span className="text-white/55">{factor.label}</span><span className="text-[#efd47d]">{factor.impact}</span></div><div className="mt-2 text-sm text-white/80">{factor.detail}</div></div>)}</div></div><div className="mt-8 border-t border-white/10 pt-5 text-sm leading-7 text-white/55">{result.disclaimer}</div></div>; }
