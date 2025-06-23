import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import logger from '../services/loggerService.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateReservationPdf = (reservation, studentName, slotCode, monthName, year) => {
    return new Promise((resolve, reject) => {
        const downloadDir = './downloads';

        // Check if folder exists, if not create it
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir);
        }

        const filePath = path.join(downloadDir, `parking-contract-${reservation.id}.pdf`);
        const doc = new PDFDocument({ margin: 40, size: 'A4' });
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Colors
        const darkBlue = '#07141f';
        const lightBlue = '#3b82f6';
        const white = '#ffffff';
        const lightGray = '#f8fafc';
        const borderGray = '#e5e7eb';

        const pageWidth = doc.page.width - 80;
        const leftMargin = 40;

        try {
            // Header with logo and title
            doc.rect(0, 0, doc.page.width, 100)
                .fill(darkBlue);

            try {
                // Draw header background
                doc.rect(0, 0, doc.page.width, 100).fill(darkBlue);

                // Load logo
                const logoPath = path.resolve(__dirname, '../uploads/logo.png');
                if (fs.existsSync(logoPath)) {
                    doc.image(logoPath, 20, 35, { width: 100 });
                } else {
                    console.error('Logo not found at:', logoPath);
                }
            } catch (logoError) {
                console.error('Error loading logo:', logoError);
                logger.error('Error loading logo:', logoError);
            }

            // Header text
            doc.fill(white)
                .fontSize(18)
                .font('Helvetica-Bold')
                .text('Parking Agreement', leftMargin + 90, 43);

            // Main content starts here
            let currentY = 120;

            // Contract Title Section
            doc.fill(darkBlue)
                .fontSize(16)
                .font('Helvetica-Bold')
                .text('PARKING SPACE RESERVATION AGREEMENT', leftMargin, currentY);

            currentY += 30;

            // Contract introduction
            doc.fill('#1f2937')
                .fontSize(11)
                .font('Helvetica')
                .text('This agreement confirms the reservation of a parking space under the following terms and conditions:',
                    leftMargin, currentY, { width: pageWidth, align: 'justify' });

            currentY += 40;

            // Student and Reservation Details Box
            doc.rect(leftMargin, currentY, pageWidth, 120)
                .fill(lightGray)
                .stroke(borderGray)
                .lineWidth(1);

            // Details header
            doc.rect(leftMargin, currentY, pageWidth, 25)
                .fill(darkBlue);

            doc.fill(white)
                .fontSize(12)
                .font('Helvetica-Bold')
                .text('RESERVATION DETAILS', leftMargin + 15, currentY + 8);

            currentY += 35;

            // Two-column layout for details
            const leftCol = leftMargin + 20;
            const rightCol = leftMargin + 280;

            doc.fill('#1f2937')
                .fontSize(11)
                .font('Helvetica-Bold');

            // Left column
            doc.text('Student Name:', leftCol, currentY);
            doc.text('Parking Slot:', leftCol, currentY + 20);
            doc.text('Contract Period:', leftCol, currentY + 40);
            doc.text('Reservation Status:', leftCol, currentY + 60);

            // Right column values
            doc.font('Helvetica')
                .text(studentName, leftCol + 100, currentY)
                .text(slotCode, leftCol + 100, currentY + 20)
                .text(`${monthName} ${year}`, leftCol + 100, currentY + 40)
                .text(reservation.status.toUpperCase(), leftCol + 100, currentY + 60);

            currentY += 140;

            // Terms and Conditions Section
            doc.fill(darkBlue)
                .fontSize(14)
                .font('Helvetica-Bold')
                .text('TERMS AND CONDITIONS', leftMargin, currentY);

            currentY += 25;

            const terms = [
                '1. PAYMENT: Complete confirmation at Student Affairs Office within 7 days.',
                '2. SLOT USAGE: Exclusively reserved for registered student during contract period.',
                '3. VEHICLE: Only registered vehicle permitted in assigned space.',
                '4. HOURS: Valid during campus operating hours per university policy.',
                '5. COMPLIANCE: Must follow all campus parking regulations.',
                '6. LIABILITY: University not responsible for damage, theft, or loss.',
                '7. VIOLATIONS: May result in fines or contract termination.',
                '8. NON-TRANSFERABLE: Contract cannot be shared or transferred.'
            ];

            doc.fill('#1f2937')
                .fontSize(10)
                .font('Helvetica');

            terms.forEach(term => {
                doc.text(term, leftMargin, currentY, {
                    width: pageWidth,
                    align: 'justify',
                    lineGap: 2
                });
                currentY = doc.y + 8;
            });

            // Footer/Signature Section
            currentY += 15;

            // Student acknowledgment
            doc.fill('#1f2937')
                .fontSize(10)
                .font('Helvetica')
                .text('By accepting this contract, the student acknowledges understanding and agreement to all terms stated above.',
                    leftMargin, currentY, { width: pageWidth, align: 'justify' });

            currentY += 25;

            // Signature lines
            doc.moveTo(leftMargin, currentY+20)
                .lineTo(leftMargin + 180, currentY+ 20)
                .stroke(borderGray);

            doc.moveTo(doc.page.width - 220, currentY+20)
                .lineTo(doc.page.width - 40, currentY+20)
                .stroke(borderGray);

            doc.fontSize(8)
                .text('Student Signature', leftMargin, currentY + 35)
                .text('Date: ___________', leftMargin + 100, currentY + 35)
                .text('Student Affairs Office', doc.page.width - 220, currentY + 35)
                .text('Official Stamp', doc.page.width - 100, currentY + 35);

            // Simple footer line instead of blue background
            currentY += 60;
            doc.moveTo(leftMargin, currentY)
                .lineTo(doc.page.width - leftMargin, currentY)
                .stroke(borderGray);

            doc.fill('#6b7280')
                .fontSize(8)
                .font('Helvetica')
                .text('This is an official document. Keep this contract for your records.', leftMargin, currentY + 10)
                .text(`Generated: ${new Date().toLocaleString()}`, leftMargin, currentY + 22)
                .text(`Contract No: ${reservation.id}`, leftMargin, currentY + 34)
                .text('For inquiries, contact Student Affairs Office', doc.page.width - 250, currentY + 10);

            doc.end();

        } catch (error) {
            reject(error);
        }

        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};