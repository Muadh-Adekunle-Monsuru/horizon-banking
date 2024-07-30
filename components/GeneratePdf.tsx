'use client';
import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

const GeneratePDF = () => {
	const data = {
		name: 'John Doe',
		age: 30,
		address: '123 Main St, Anytown, USA',
		email: 'johndoe@example.com',
	};

	const generatePDF = async () => {
		// Create a new PDFDocument
		const pdfDoc = await PDFDocument.create();

		// Add a blank page
		const page = pdfDoc.addPage([600, 400]);

		// Define font size
		const fontSize = 24;

		// Draw text on the page
		page.drawText(`Name: ${data.name}`, {
			x: 50,
			y: 350,
			size: fontSize,
			color: rgb(0, 0, 0),
		});
		page.drawText(`Age: ${data.age}`, {
			x: 50,
			y: 300,
			size: fontSize,
			color: rgb(0, 0, 0),
		});
		page.drawText(`Address: ${data.address}`, {
			x: 50,
			y: 250,
			size: fontSize,
			color: rgb(0, 0, 0),
		});
		page.drawText(`Email: ${data.email}`, {
			x: 50,
			y: 200,
			size: fontSize,
			color: rgb(0, 0, 0),
		});

		// Serialize the PDFDocument to bytes (a Uint8Array)
		const pdfBytes = await pdfDoc.save();

		// Save the PDF
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		saveAs(blob, 'example.pdf');
	};

	return (
		<div>
			<button onClick={generatePDF}>Generate PDF</button>
		</div>
	);
};

export default GeneratePDF;
