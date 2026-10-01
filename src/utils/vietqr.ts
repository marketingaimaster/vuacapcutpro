export interface BankInfo {
  code: string;
  bin: string;
  shortName: string;
  name: string;
  aliases: string[];
}

export const VIETNAM_BANKS: BankInfo[] = [
  { 
    code: 'MB', 
    bin: '970422', 
    shortName: 'MB Bank', 
    name: 'Ngân hàng Quân Đội (MB Bank)',
    aliases: ['mbbank', 'quan doi', 'quân đội', 'ngan hang quan doi', 'mb']
  },
  { 
    code: 'VCB', 
    bin: '970436', 
    shortName: 'Vietcombank', 
    name: 'Ngoại Thương Việt Nam (Vietcombank)',
    aliases: ['vietcombank', 'vcb', 'ngoai thuong', 'ngoại thương']
  },
  { 
    code: 'TCB', 
    bin: '970407', 
    shortName: 'Techcombank', 
    name: 'Kỹ Thương Việt Nam (Techcombank)',
    aliases: ['techcombank', 'tcb', 'ky thuong', 'kỹ thương']
  },
  { 
    code: 'ICB', 
    bin: '970415', 
    shortName: 'VietinBank', 
    name: 'Công Thương Việt Nam (VietinBank)',
    aliases: ['vietinbank', 'icb', 'ctg', 'cong thuong', 'công thương']
  },
  { 
    code: 'BIDV', 
    bin: '970418', 
    shortName: 'BIDV', 
    name: 'Đầu tư và Phát triển (BIDV)',
    aliases: ['bidv', 'dau tu va phat trien', 'đầu tư và phát triển', 'bid']
  },
  { 
    code: 'VBA', 
    bin: '970405', 
    shortName: 'Agribank', 
    name: 'Nông nghiệp & PTNT (Agribank)',
    aliases: ['agribank', 'vba', 'nong nghiep', 'nông nghiệp']
  },
  { 
    code: 'ACB', 
    bin: '970416', 
    shortName: 'ACB', 
    name: 'Á Châu (ACB)',
    aliases: ['acb', 'a chau', 'á châu']
  },
  { 
    code: 'VPB', 
    bin: '970432', 
    shortName: 'VPBank', 
    name: 'Việt Nam Thịnh Vượng (VPBank)',
    aliases: ['vpbank', 'vpb', 'thinh vuong', 'thịnh vượng']
  },
  { 
    code: 'TPB', 
    bin: '970423', 
    shortName: 'TPBank', 
    name: 'Tiên Phong (TPBank)',
    aliases: ['tpbank', 'tpb', 'tien phong', 'tiên phong']
  },
  { 
    code: 'STB', 
    bin: '970403', 
    shortName: 'Sacombank', 
    name: 'Sài Gòn Thương Tín (Sacombank)',
    aliases: ['sacombank', 'stb', 'sai gon thuong tin', 'sài gòn thương tín']
  },
  { 
    code: 'HDB', 
    bin: '970437', 
    shortName: 'HDBank', 
    name: 'Phát triển TP.HCM (HDBank)',
    aliases: ['hdbank', 'hdb', 'phat trien tphcm', 'phát triển tphcm']
  },
  { 
    code: 'MSB', 
    bin: '970426', 
    shortName: 'MSB', 
    name: 'Hàng Hải (MSB)',
    aliases: ['msb', 'hang hai', 'hàng hải']
  },
  { 
    code: 'VIB', 
    bin: '970441', 
    shortName: 'VIB', 
    name: 'Quốc Tế (VIB)',
    aliases: ['vib', 'quoc te', 'quốc tế']
  },
  { 
    code: 'OCB', 
    bin: '970448', 
    shortName: 'OCB', 
    name: 'Phương Đông (OCB)',
    aliases: ['ocb', 'phuong dong', 'phương đông']
  },
  { 
    code: 'SHB', 
    bin: '970443', 
    shortName: 'SHB', 
    name: 'Sài Gòn - Hà Nội (SHB)',
    aliases: ['shb', 'sai gon ha noi', 'sài gòn hà nội']
  },
  { 
    code: 'LPB', 
    bin: '970449', 
    shortName: 'LPBank', 
    name: 'Lộc Phát Việt Nam (LPBank)',
    aliases: ['lpbank', 'lpb', 'lienvietpostbank', 'loc phat', 'lộc phát']
  },
  { 
    code: 'SEAB', 
    bin: '970440', 
    shortName: 'SeABank', 
    name: 'Đông Nam Á (SeABank)',
    aliases: ['seabank', 'seab', 'dong nam a', 'đông nam á']
  },
  { 
    code: 'TIMO', 
    bin: '963388', 
    shortName: 'Timo', 
    name: 'Timo by BVBank',
    aliases: ['timo', 'bvbank', 'ban viet']
  }
];

export function findBank(bankNameOrCode: string): BankInfo {
  if (!bankNameOrCode) return VIETNAM_BANKS[0];
  const clean = bankNameOrCode.trim();
  const upper = clean.toUpperCase();

  // 1. Direct code or bin match
  const directMatch = VIETNAM_BANKS.find(
    b => b.code.toUpperCase() === upper || b.bin === clean
  );
  if (directMatch) return directMatch;

  // 2. Normalized string and tokenize into words
  const normalized = clean.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]/g, ' ')
    .trim();

  const words = normalized.split(/\s+/).filter(Boolean);

  // 3. Priority check: match bank codes or short names directly in tokenized words
  for (const b of VIETNAM_BANKS) {
    const bCodeNorm = b.code.toLowerCase();
    const bShortNorm = b.shortName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (words.includes(bCodeNorm) || words.includes(b.bin)) {
      return b;
    }
    if (words.includes(bShortNorm)) {
      return b;
    }
  }

  // 4. Exact multi-word or phrase matching in aliases
  for (const b of VIETNAM_BANKS) {
    for (const alias of b.aliases) {
      const normAlias = alias.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
      
      // If alias is a single short token (<= 3 chars), must match exact word
      if (normAlias.length <= 3) {
        if (words.includes(normAlias)) return b;
      } else {
        // Multi-word phrase or long keyword (e.g. 'vietcombank', 'techcombank', 'quan doi')
        if (normalized.includes(normAlias)) return b;
      }
    }
  }

  // 5. Fallback search by bank full name
  for (const b of VIETNAM_BANKS) {
    const normName = b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    if (normalized.includes(normName) || normName.includes(normalized)) {
      return b;
    }
  }

  return VIETNAM_BANKS[0];
}

export function getBankCode(bankNameOrCode: string): string {
  const bank = findBank(bankNameOrCode);
  return bank.bin;
}

/**
 * Generates an official VietQR Napas247 image URL recognized by all VN Banking apps.
 */
export function generateVietQrUrl(
  bankCodeOrName: string, 
  accountNumber: string, 
  amount: number, 
  accountName: string, 
  memo?: string
): string {
  const bank = findBank(bankCodeOrName);
  const cleanAcc = (accountNumber || '').replace(/[^a-zA-Z0-9]/g, '');
  const cleanAmount = Math.max(0, Math.round(amount || 0));
  const addInfo = encodeURIComponent((memo || 'VuaCapcut').slice(0, 50));
  const accName = encodeURIComponent((accountName || '').toUpperCase());

  if (cleanAcc) {
    return `https://img.vietqr.io/image/${bank.bin}-${cleanAcc}-compact2.png?amount=${cleanAmount}&addInfo=${addInfo}&accountName=${accName}`;
  }

  // Fallback demo QR for MB Bank Tuấn Anh if empty
  return `https://img.vietqr.io/image/970422-0363344348-compact2.png?amount=${cleanAmount || 100000}&addInfo=${addInfo}&accountName=NGUYEN%20TUAN%20ANH`;
}

/**
 * Fallback alternative VietQR template if compact2 template encounters any CDN network delay
 */
export function generateVietQrFallbackUrl(
  bankCodeOrName: string,
  accountNumber: string,
  amount: number,
  memo?: string
): string {
  const bank = findBank(bankCodeOrName);
  const cleanAcc = (accountNumber || '').replace(/[^a-zA-Z0-9]/g, '');
  const cleanAmount = Math.max(0, Math.round(amount || 0));
  const addInfo = encodeURIComponent((memo || 'VuaCapcut').slice(0, 50));

  if (cleanAcc) {
    return `https://img.vietqr.io/image/${bank.bin}-${cleanAcc}-qr_only.png?amount=${cleanAmount}&addInfo=${addInfo}`;
  }
  return `https://img.vietqr.io/image/970422-0363344348-qr_only.png?amount=100000&addInfo=VuaCapcut`;
}
