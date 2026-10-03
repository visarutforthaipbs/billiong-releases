export const product = {
  name: "บิลง่าย (BillNgai)",
  versionLabel: "BillNgai 2.0.13 · Mac และ Windows Beta",
  lineUrl: "https://lin.ee/pSl8nEH",
  promptPayId: "0627283058",
  prices: {
    local: {
      earlyBird: "0",
      earlyBirdLabel: "ฟรี",
      fullLabel: "ฟรี",
      qrPath: "/assets/brand/promptpay-599.svg",
    },
    pro: {
      salesPaused: false,
      earlyBird: "599.00",
      earlyBirdLabel: "฿599",
      fullLabel: "฿1,900",
      qrPath: "/assets/brand/promptpay-599.svg",
    },
  },
  downloads: {
    mac: {
      version: "2.0.13",
      minimumOS: "macOS 12 Monterey",
      github: "https://github.com/visarutforthaipbs/local-bill-apps/releases/download/v2.0.13/BillNgai-2.0.13-universal.dmg",
      r2: "https://pub-4ed16d146bff4f168839661507e1748a.r2.dev/BillNgai-2.0.13-universal.dmg",
    },
    windows: {
      version: "2.0.13",
      github: "https://github.com/visarutforthaipbs/local-bill-apps/releases/download/v2.0.13-windows/BillNgai-2.0.13-x64-Setup.exe",
      r2: "https://pub-4ed16d146bff4f168839661507e1748a.r2.dev/BillNgai-2.0.13-x64-Setup.exe",
    },
  },
} as const;

export type DownloadSource = "github" | "r2";

export function getDownloadUrls(source: DownloadSource = "r2") {
  return {
    mac: product.downloads.mac[source],
    windows: product.downloads.windows[source],
  };
}
