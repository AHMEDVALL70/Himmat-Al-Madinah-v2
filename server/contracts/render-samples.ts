import { writeFile } from "node:fs/promises";
import { generateContractPdf } from "./generator";

const sample = {
  contractNo: "HM-2026-001",
  contractType: "جديد",
  startDate: "2026-09-01",
  endDate: "2027-09-01",
  lessorName: "شركة همة المدينة",
  lessorId: "7000000000",
  lessorCr: "7000000000",
  tenantName: "عميل تجريبي",
  tenantId: "1000000000",
  tenantCr: "1010000000",
  propertyAddress: "المدينة المنورة، حي العقيق",
  city: "المدينة المنورة",
  district: "العقيق",
  unitType: "سكنية",
  activity: "مكاتب إدارية",
  area: "200.00",
  annualRent: "150000",
  paymentCycle: "سنوي",
  duration: "12",
  deposit: "5000",
};

async function main() {
  for (const kind of ["residential", "commercial"] as const) {
    const bytes = await generateContractPdf(kind, sample);
    await writeFile(`/home/ubuntu/himmat-redesign/contract-calibration/generated-${kind}.pdf`, bytes);
    console.log(`${kind}: ${bytes.length} bytes`);
  }
}

void main();
