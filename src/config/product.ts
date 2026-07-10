export const product = {
  name: "บิลง่าย (BillNgai)",
  versionLabel: "BillNgai 2.0.1",
  lineUrl: "https://lin.ee/pSl8nEH",
  promptPayId: "0627283058",
  prices: {
    local: {
      earlyBird: "290.00",
      earlyBirdLabel: "฿290",
      fullLabel: "฿299",
      qrPath: "/assets/brand/promptpay-290.svg",
    },
    pro: {
      earlyBird: "590.00",
      earlyBirdLabel: "฿590",
      fullLabel: "฿1,990",
      qrPath: "/assets/brand/promptpay-590.svg",
    },
  },
  downloads: {
    mac: {
      github: "https://github.com/visarutforthaipbs/local-bill-apps/releases/download/v2.0.1/BillNgai-2.0.1-universal.dmg",
      r2: "https://pub-4ed16d146bff4f168839661507e1748a.r2.dev/BillNgai-2.0.1-universal.dmg",
    },
    windows: {
      github: "https://github.com/visarutforthaipbs/local-bill-apps/releases/download/v2.0.1/BillNgai%20Setup%202.0.1.exe",
      r2: "https://pub-4ed16d146bff4f168839661507e1748a.r2.dev/BillNgai%20Setup%202.0.1.exe",
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
