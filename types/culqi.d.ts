declare class CulqiCheckout {
  constructor(publicKey: string, config: any);

  open(): void;
}

interface Window {
  CulqiCheckout: typeof CulqiCheckout;
}
