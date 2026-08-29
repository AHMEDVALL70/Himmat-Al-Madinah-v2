/*
 * Residential contract PDF generator
 * Uses the original residential-contract.pdf as a background template.
 * The coordinate map is intentionally isolated so it can be calibrated without
 * changing the form or the PDF generation flow.
 */
(() => {
  const TEMPLATE_URL = 'residential-contract.pdf';
  const ARABIC_FONT_URL = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf';
  const FONT_SIZE = 8.2;
  const COLORS = { text: PDFLib.rgb(0.08, 0.12, 0.14), draft: PDFLib.rgb(0.82, 0.18, 0.22) };

  // Coordinates use PDF points from the TOP-LEFT of each page.
  // They are isolated here for pixel/point calibration against the supplied PDF.
  const residentialFieldMap = {
    contractNo: { page: 0, x: 486, top: 191, width: 78, align: 'right' },
    contractType: { page: 0, x: 280, top: 191, width: 76, align: 'right' },
    startDate: { page: 0, x: 474, top: 219, width: 90, align: 'right' },
    endDate: { page: 0, x: 273, top: 219, width: 90, align: 'right' },
    lessorName: { page: 0, x: 279, top: 265, width: 285, align: 'right' },
    lessorId: { page: 0, x: 476, top: 293, width: 88, align: 'right' },
    tenantName: { page: 0, x: 279, top: 438, width: 285, align: 'right' },
    tenantId: { page: 0, x: 476, top: 466, width: 88, align: 'right' },
    propertyAddress: { page: 1, x: 279, top: 116, width: 285, align: 'right' },
    city: { page: 1, x: 476, top: 145, width: 88, align: 'right' },
    district: { page: 1, x: 279, top: 145, width: 180, align: 'right' },
    unitType: { page: 1, x: 476, top: 174, width: 88, align: 'right' },
    area: { page: 1, x: 279, top: 203, width: 88, align: 'right' },
    annualRent: { page: 2, x: 476, top: 183, width: 88, align: 'right' },
    paymentCycle: { page: 2, x: 279, top: 212, width: 170, align: 'right' },
    duration: { page: 2, x: 476, top: 241, width: 88, align: 'right' },
    deposit: { page: 2, x: 279, top: 183, width: 88, align: 'right' }
  };

  const value = id => document.getElementById(id)?.value?.trim() || '________________';
  const selectedText = id => document.getElementById(id)?.selectedOptions?.[0]?.textContent?.trim() || '________________';
  const isArabic = () => (window.currentLang || document.documentElement.lang || 'ar') === 'ar';
  const money = v => Number(v || 0).toLocaleString(isArabic() ? 'ar-SA' : 'en-US');
  const dateValue = v => v || '________________';
  const t = (ar, en) => isArabic() ? ar : en;

  function collectResidentialData() {
    const duration = Number(value('resDuration')) || 12;
    const start = value('resStartDate');
    let end = '________________';
    if (start) {
      const d = new Date(`${start}T00:00:00`);
      if (!Number.isNaN(d.getTime())) {
        d.setMonth(d.getMonth() + duration);
        end = d.toISOString().slice(0, 10);
      }
    }
    return {
      contractNo: `1-0/${Date.now().toString().slice(-10)}`,
      contractType: t('جديد', 'New'),
      startDate: dateValue(start),
      endDate: end,
      lessorName: value('resLessorName'),
      lessorId: value('resLessorID'),
      tenantName: value('resTenantName'),
      tenantId: value('resTenantID'),
      propertyAddress: [selectedText('resCity'), value('resDistrict')].filter(Boolean).join('، '),
      city: selectedText('resCity'),
      district: value('resDistrict'),
      unitType: selectedText('resUnitType'),
      area: value('resArea'),
      annualRent: money(value('resAnnualRent')),
      paymentCycle: t('سنوي', 'Annual'),
      duration: duration.toString(),
      deposit: money(value('resDeposit'))
    };
  }

  function ensureRequired(data) {
    const missing = [];
    if (data.lessorName.includes('_')) missing.push(t('اسم المؤجر', 'Lessor name'));
    if (data.tenantName.includes('_')) missing.push(t('اسم المستأجر', 'Tenant name'));
    if (data.startDate.includes('_')) missing.push(t('تاريخ البداية', 'Start date'));
    if (data.annualRent.includes('_') || data.annualRent === '0') missing.push(t('الإيجار السنوي', 'Annual rent'));
    if (missing.length) {
      alert(t(`يرجى تعبئة الحقول التالية: ${missing.join('، ')}`, `Please complete: ${missing.join(', ')}`));
      return false;
    }
    return true;
  }

  function topToBottomY(page, top, size) {
    return page.getHeight() - top - size;
  }

  function fitSize(font, text, maxWidth, preferred = FONT_SIZE) {
    let size = preferred;
    while (size > 5.2 && font.widthOfTextAtSize(text, size) > maxWidth) size -= 0.3;
    return size;
  }

  function drawMappedText(page, font, text, spec) {
    if (!text || text === '________________') return;
    const size = fitSize(font, text, spec.width, FONT_SIZE);
    const textWidth = font.widthOfTextAtSize(text, size);
    if (spec.whiteout !== false) {
      page.drawRectangle({
        x: spec.x - 2,
        y: topToBottomY(page, spec.top, spec.height || 14) - 2,
        width: spec.width + 4,
        height: (spec.height || 14) + 4,
        color: PDFLib.rgb(1, 1, 1),
        opacity: 0.98
      });
    }
    const x = spec.align === 'left' ? spec.x : spec.x + spec.width - textWidth;
    page.drawText(text, { x, y: topToBottomY(page, spec.top, size), size, font, color: COLORS.text, maxWidth: spec.width });
  }

  async function loadFont(pdfDoc) {
    try {
      if (window.fontkit) {
        pdfDoc.registerFontkit(window.fontkit);
        const response = await fetch(ARABIC_FONT_URL);
        if (response.ok) return pdfDoc.embedFont(await response.arrayBuffer(), { subset: true });
      }
    } catch (error) {
      console.warn('Arabic font could not be embedded; falling back to Helvetica.', error);
    }
    return pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  }

  async function generateResidentialContractPDF() {
    if (!ensureRequired(collectResidentialData())) return;
    if (!window.PDFLib) {
      alert(t('مكتبة PDF لم تُحمّل. تحقق من اتصال الإنترنت ثم أعد المحاولة.', 'The PDF library did not load. Check your internet connection and try again.'));
      return;
    }
    try {
      const data = collectResidentialData();
      const response = await fetch(TEMPLATE_URL);
      if (!response.ok) throw new Error(`Template request failed: ${response.status}`);
      const pdfDoc = await PDFLib.PDFDocument.load(await response.arrayBuffer());
      const font = await loadFont(pdfDoc);
      Object.entries(data).forEach(([key, text]) => {
        const spec = residentialFieldMap[key];
        const page = spec && pdfDoc.getPages()[spec.page];
        if (page && spec) drawMappedText(page, font, String(text), spec);
      });

      // Keep the original template's visual watermark and add a subtle generated marker.
      const firstPage = pdfDoc.getPages()[0];
      firstPage.drawText(t('مسودة مولدة آلياً - للمراجعة قبل الاعتماد', 'AUTO-GENERATED DRAFT - REVIEW BEFORE USE'), {
        x: 164, y: 35, size: 7, font, color: COLORS.draft, opacity: 0.78
      });

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `residential-contract-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (error) {
      console.error('Residential contract generation failed:', error);
      alert(t('تعذر توليد العقد. تأكد من وجود ملف residential-contract.pdf في نفس مجلد الموقع.', 'Could not generate the contract. Make sure residential-contract.pdf is in the same site folder.'));
    }
  }

  window.generateResidentialContractPDF = generateResidentialContractPDF;
  // Keep the existing button working without changing its current HTML onclick.
  window.generateFullResidentialContract = generateResidentialContractPDF;
})();
