const fs = require('fs');
const PDFDocument = require('pdfkit');

// const data = [
//   // Your data array here
// ];

const generatePDF = async (data) => {
    // console.log('pdf generator', data);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream('output.pdf'));

  data.forEach(order => {
    doc.text(`Order ID: ${order.id}`);
    doc.text(`Name: ${order.firstname} ${order.lastname}`);
    doc.text(`Email: ${order.email}`);
    doc.text(`Phone: ${order.phone_number}`);
    doc.text(`Address: ${order.address}`);
    doc.text(`Destination Country: ${order.destination_country}`);
    doc.text(`Total Amount: ${order.total_amount}`);
    doc.text(`Order Note: ${order.order_note}`);
    doc.text(`Order Details:`);

    order.order_detail.forEach(detail => {
      doc.text(`  - Bundle: ${detail.bundle_name}`);
      doc.text(`    Quantity: ${detail.quantity}`);
      doc.text(`    Amount: ${detail.amount}`);
    });

    doc.text(`Payment By Flutterwave: ${order.payment_by_flutterwave}`);
    doc.text(`Payment status: ${order.payment_status}`);
    doc.text(`Payment Receipt: ${order.payment_receipt}`);
    doc.text(`Order Ref: ${order.order_ref}`);
    doc.text(`Created At: ${order.created_at}`);
    doc.text(`Updated At: ${order.updated_at}`);
    doc.text(`Deleted At: ${order.deleted_at}`);

    doc.moveDown();
  });

  doc.end();

  return "PDF generated Successfully";
};

module.exports = {
    generatePDF,
};
