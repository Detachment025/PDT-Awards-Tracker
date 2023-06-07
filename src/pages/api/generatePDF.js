import pdf from 'html-pdf';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const html = req.body.html;

  pdf.create(html).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).json({ message: 'Error generating PDF' });
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(buffer);
    }
  });
}