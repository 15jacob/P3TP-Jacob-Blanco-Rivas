

async function generatePdf(req, res) {
  try {
    const url = req.params.url;

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(`https://${url}`, { waitUntil: "networkidle2" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        right: "20px",
        left: "20px",
      },
    });

    res.set({
      "Content-Type": "Application/pdf",
      "Content-Disposition": `attachment; filename="${url}.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
  }
}