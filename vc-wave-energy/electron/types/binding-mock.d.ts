declare module "@serialport/binding-mock" {
  export const MockBinding: {
    reset(): void;
    createPort(
      path: string,
      options?: {
        vendorId?: string;
        productId?: string;
      },
    ): void;
  };
}
