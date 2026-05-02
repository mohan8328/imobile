import type { BankingSnapshot } from '../types/bankingSnapshot';
import { BANKING_JSON_URL } from '../config/urls';
import fallback from '../mock-api/banking.json';

export type BankingLoadResult = {
  data: BankingSnapshot;
  source: 'remote' | 'fallback';
  error?: string;
};

export async function loadBankingSnapshot(): Promise<BankingLoadResult> {
  try {
    const res = await fetch(BANKING_JSON_URL, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = (await res.json()) as BankingSnapshot;
    return { data, source: 'remote' };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Network error';
    return {
      data: fallback as BankingSnapshot,
      source: 'fallback',
      error: message,
    };
  }
}
