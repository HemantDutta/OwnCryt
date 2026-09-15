export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...init?.headers,
    },
  });

  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof data === "object" &&
      data &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : "Something went wrong. Please try again.";
    throw new ApiError(message, res.status);
  }
  return data as T;
}

export function submitInterest(payload: {
  productId: string;
  email: string;
  name?: string;
  sizePreference?: string;
  country?: string;
  marketingConsent: boolean;
}) {
  return request<{ ok: true }>(`/api/interests`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function submitNewsletter(payload: {
  email: string;
  firstName?: string;
  marketingConsent: boolean;
}) {
  return request<{ ok: true }>(`/api/newsletter`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function submitCustomDesign(form: FormData) {
  return request<{ ok: true }>(`/api/custom-designs`, {
    method: "POST",
    body: form,
  });
}
