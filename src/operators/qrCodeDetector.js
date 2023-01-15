import { concatMap } from 'rxjs/operators';

let detector = null;

export const loadQrCodeDetector = async () => {
  detector = await installPolyfill();
  return detectQrCode;
};

export const detectQrCode = (dataSource) => {
  return (source) => source.pipe(
    concatMap(async () => detector.detect(dataSource))
  );
};

const installPolyfill = async () => {
  try {
    window['BarcodeDetector'].getSupportedFormats();
  } catch {
    const { barcodeDetectorPolyfill } = await import('@undecaf/barcode-detector-polyfill');
    window['BarcodeDetector'] = barcodeDetectorPolyfill.BarcodeDetectorPolyfill;
  }
  return new window.BarcodeDetector({ formats: [ 'qr_code' ] });
};
