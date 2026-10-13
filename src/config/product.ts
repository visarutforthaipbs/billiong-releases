export const product = {
  name: "บิลง่าย (BillNgai)",
  versionLabel: "BillNgai 2.1.0 บน App Store — iPhone, iPad และ Mac",
  lineUrl: "https://lin.ee/pSl8nEH",
  appStore: {
    url: "https://apps.apple.com/app/id6789503350",
    badgePath: "/assets/brand/app-store-badge.svg",
    requirements: "ต้องการ iOS 16 / iPadOS 16 / macOS 12 ขึ้นไป",
  },
  prices: {
    local: {
      price: "0",
      label: "ฟรี",
    },
    pro: {
      price: "599.00",
      label: "฿599",
      note: "ซื้อในแอปครั้งเดียว ไม่มีรายเดือน",
    },
  },
} as const;
