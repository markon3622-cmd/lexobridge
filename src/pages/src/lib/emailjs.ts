export const EJS_CONFIG = {
  serviceId:  'service_6og7ils',
  templateId: 'template_azj6qb8',
  publicKey:  'JqPlmV6seOPEzRdeu',
} as const;

export function validateEgyptianPhone(raw: string): boolean {
  const digits = raw.replace(/[^0-9]/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export interface SendParams {
  name:     string;
  email:    string;
  phone:    string;
  address?: string;
  service?: string;
  message?: string;
}

declare global {
  interface Window {
    emailjs: {
      init: (opts: { publicKey: string }) => void;
      send: (
        serviceId: string,
        templateId: string,
        params: Record<string, string>,
        opts: { publicKey: string }
      ) => Promise<{ status: number; text: string }>;
    };
  }
}

export async function sendEmail(params: SendParams): Promise<void> {
  const ejs = window.emailjs;
  if (!ejs) throw new Error('EmailJS not loaded');

  // كل المتغيرات بتتبعت للـ template
  // في EmailJS template استخدم: {{from_name}} {{from_email}} {{phone}} {{address}} {{service_type}} {{message}}
  await ejs.send(
    EJS_CONFIG.serviceId,
    EJS_CONFIG.templateId,
    {
      from_name:    params.name.trim(),
      from_email:   params.email.trim(),
      phone:        params.phone.trim(),
      address:      params.address?.trim() || 'غير محدد',
      service_type: params.service?.trim() || 'غير محدد',
      message:      params.message?.trim() || 'لا توجد تفاصيل إضافية',
    },
    { publicKey: EJS_CONFIG.publicKey }
  );
}
