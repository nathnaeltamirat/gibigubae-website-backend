import { MultiFormatReader, BarcodeFormat, DecodeHintType, RGBLuminanceSource, BinaryBitmap, HybridBinarizer, } from '@zxing/library';
import sharp from 'sharp';
export const scanBarcode = async (file) => {
    try {
        if (!file || !file.buffer)
            throw new Error('No file buffer provided');
        // Convert input to raw grayscale pixels using sharp
        const sharpImg = sharp(file.buffer)
            .ensureAlpha()
            .greyscale()
            .resize({ width: 800, withoutEnlargement: true }) // Resize if too large
            .normalize();
        const { data, info } = await sharpImg.raw().toBuffer({ resolveWithObject: true });
        const { width, height } = info;
        console.log(`Processed image: ${width}x${height}, channels=${info.channels}`);
        // Convert raw buffer to luminance array
        const luminances = new Uint8ClampedArray(width * height);
        for (let i = 0; i < width * height; i++) {
            const value = data[i];
            luminances[i] = typeof value === "number" ? value : 0;
        }
        // Prepare ZXing input
        const source = new RGBLuminanceSource(luminances, width, height);
        const bitmap = new BinaryBitmap(new HybridBinarizer(source));
        // Configure ZXing reader
        const reader = new MultiFormatReader();
        const hints = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [
            BarcodeFormat.CODE_128,
            BarcodeFormat.CODE_39,
            BarcodeFormat.EAN_13,
            BarcodeFormat.UPC_A,
            BarcodeFormat.QR_CODE,
            BarcodeFormat.PDF_417,
            BarcodeFormat.DATA_MATRIX,
            BarcodeFormat.AZTEC,
        ]);
        hints.set(DecodeHintType.TRY_HARDER, true);
        reader.setHints(hints);
        // Decode barcode
        const result = reader.decode(bitmap);
        console.log(`✅ Barcode format: ${result.getBarcodeFormat()}`);
        return result.getText();
    }
    catch (err) {
        console.error('❌ Barcode scanning failed:', err instanceof Error ? err.message : err);
        return null;
    }
};
//# sourceMappingURL=barcodeScanner.js.map