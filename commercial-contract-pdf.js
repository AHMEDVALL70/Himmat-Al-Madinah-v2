/* Commercial contract PDF generator using the original PDF as the visual template. */
(() => {
  const TEMPLATE_URL = 'commercial-contract.pdf';
  const FONT_URL = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf';
  const TEXT = PDFLib.rgb(0.08, 0.12, 0.14);
  const DRAFT = PDFLib.rgb(0.82, 0.18, 0.22);

  // Coordinates are measured from the TOP-LEFT in PDF points. Calibrate values here.
  const commercialFieldMap = {
    contractNo: { page: 0, x: 486, top: 191, width: 78 },
    contractType: { page: 0, x: 280, top: 191, width: 76 },
    startDate: { page: 0, x: 474, top: 219, width: 90 },
    endDate: { page: 0, x: 273, top: 219, width: 90 },
    lessorName: { page: 0, x: 279, top: 265, width: 285 },
    lessorCr: { page: 0, x: 476, top: 293, width: 88 },
    tenantName: { page: 0, x: 279, top: 438, width: 285 },
    tenantCr: { page: 0, x: 476, top: 466, width: 88 },
    propertyAddress: { page: 1, x: 279, top: 116, width: 285 },
    city: { page: 1, x: 476, top: 145, width: 88 },
    district: { page: 1, x: 279, top: 145, width: 180 },
    activity: { page: 1, x: 279, top: 174, width: 285 },
    area: { page: 1, x: 279, top: 203, width: 88 },
    annualRent: { page: 2, x: 476, top: 183, width: 88 },
    paymentCycle: { page: 2, x: 279, top: 212, width: 170 },
    duration: { page: 2, x: 476, top: 241, width: 88 },
    deposit: { page: 2, x: 279, top: 183, width: 88 }
  };

  const value = id => document.getElementById(id)?.value?.trim() || '________________';
  const selectedText = id => document.getElementById(id)?.selectedOptions?.[0]?.textContent?.trim() || '________________';
  const arabic = () => (window.currentLang || document.documentElement.lang || 'ar') === 'ar';
  const t = (ar, en) => arabic() ? ar : en;
  const money = v => Number(v || 0).toLocaleString(arabic() ? 'ar-SA' : 'en-US');

  function collectCommercialData() {
    const duration = Number(value('comDuration')) || 12;
    const start = value('comStartDate');
    let end = '________________';
    if (start) {
      const date = new Date(`${start}T00:00:00`);
      if (!Number.isNaN(date.getTime())) { date.setMonth(date.getMonth() + duration); end = date.toISOString().slice(0, 10); }
    }
    return {
      contractNo: `2-0/${Date.now().toString().slice(-10)}`,
      contractType: t('جديد', 'New'),
      startDate: start,
      endDate: end,
      lessorName: value('comLessorName'),
      lessorCr: value('comLessorCR'),
      tenantName: value('comTenantName'),
      tenantCr: value('comTenantCR'),
      propertyAddress: [selectedText('comCity'), value('comDistrict')].filter(Boolean).join('، '),
      city: selectedText('comCity'),
      district: value('comDistrict'),
      activity: value('comActivity'),
      area: value('comArea'),
      annualRent: money(value('comAnnualRent')),
      paymentCycle: t('سنوي', 'Annual'),
      duration: String(duration),
      deposit: money(value('comDeposit'))
    };
  }

  function validate(data) {
    const missing = [];
    if (data.lessorName.includes('_')) missing.push(t('اسم المؤجر', 'Lessor name'));
    if (data.lessorCr.includes('_')) missing.push(t('سجل المؤجر', 'Lessor CR'));
    if (data.tenantName.includes('_')) missing.push(t('اسم المستأجر', 'Tenant name'));
    if (data.tenantCr.includes('_')) missing.push(t('سجل المستأجر', 'Tenant CR'));
    if (data.startDate.includes('_')) missing.push(t('تاريخ البداية', 'Start date'));
    if (data.annualRent.includes('_') || data.annualRent === '0') missing.push(t('الإيجار السنوي', 'Annual rent'));
    if (missing.length) { alert(t(`يرجى تعبئة: ${missing.join('، ')}`, `Please complete: ${missing.join(', ')}`)); return false; }
    return true;
  }

  const yFromTop = (page, top, height) => page.getHeight() - top - height;
  const fit = (font, text, width) => { let size = 8.2; while (size > 5.2 && font.widthOfTextAtSize(text, size) > width) size -= .3; return size; };

  function draw(page, font, text, spec) {
    if (!text || text === '________________') return;
    const size = fit(font, text, spec.width);
    const width = font.widthOfTextAtSize(text, size);
    page.drawRectangle({ x: spec.x - 2, y: yFromTop(page, spec.top, 16) - 2, width: spec.width + 4, height: 20, color: PDFLib.rgb(1, 1, 1), opacity: .98 });
    page.drawText(text, { x: spec.x + spec.width - width, y: yFromTop(page, spec.top, size), size, font, color: TEXT, maxWidth: spec.width });
  }

  async function embedFont(pdf) {
    try {
      if (window.fontkit) {
        pdf.registerFontkit(window.fontkit);
        const r = await fetch(FONT_URL);
        if (r.ok) return pdf.embedFont(await r.arrayBuffer(), { subset: true });
      }
    } catch (e) { console.warn('Arabic font fallback', e); }
    return pdf.embedFont(PDFLib.StandardFonts.Helvetica);
  }

  async function generateCommercialContractPDF() {
    const data = collectCommercialData();
    if (!validate(data)) return;
    if (!window.PDFLib) { alert(t('مكتبة PDF لم تُحمّل.', 'The PDF library did not load.')); return; }
    try {
      const response = await fetch(TEMPLATE_URL);
      if (!response.ok) throw new Error(`Template request failed: ${response.status}`);
      const pdf = await PDFLib.PDFDocument.load(await response.arrayBuffer());
      const font = await embedFont(pdf);
      Object.entries(data).forEach(([key, text]) => { const spec = commercialFieldMap[key]; const page = spec && pdf.getPages()[spec.page]; if (page && spec) draw(page, font, String(text), spec); });
      pdf.getPages()[0].drawText(t('مسودة مولدة آلياً - للمراجعة قبل الاعتماد', 'AUTO-GENERATED DRAFT - REVIEW BEFORE USE'), { x: 164, y: 35, size: 7, font, color: DRAFT, opacity: .78 });
      const blob = new Blob([await pdf.save()], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = Object.assign(document.createElement('a'), { href: url, download: `commercial-contract-${new Date().toISOString().slice(0, 10)}.pdf` });
      document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (error) {
      console.error('Commercial contract generation failed:', error);
      alert(t('تعذر توليد العقد التجاري. تأكد من وجود commercial-contract.pdf.', 'Could not generate the commercial contract. Make sure commercial-contract.pdf exists.'));
    }
  }

  window.generateCommercialContractPDF = generateCommercialContractPDF;
  window.generateFullCommercialContract = generateCommercialContractPDF;
})();
