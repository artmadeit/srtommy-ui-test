declare class CulqiCheckout {
  constructor(publicKey: string, config: any);

  open(): void;

  close(): void;

  order: any;

  error: any;

  token?: { id: any };

  culqi: () => void;
}

interface Window {
  CulqiCheckout: typeof CulqiCheckout;
}
