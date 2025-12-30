// lib/rules.ts
export function matchFAQ(message: string, faqs: any[]) {
    const msg = message.toLowerCase();

    for (const faq of faqs) {
        const keys = faq.keywords.split(",");
        if (keys.some((k: string) => msg.includes(k.trim()))) {
            return faq.answer;
        }
    }
    return null;
}
