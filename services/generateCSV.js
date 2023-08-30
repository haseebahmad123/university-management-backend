const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const generateCSV = async (data) => {
  const csvWriter = createCsvWriter({
    path: 'output.csv', // Change the output file name as needed
    header: [
      { id: 'id', title: 'ID' },
      { id: 'firstname', title: 'First Name' },
      { id: 'lastname', title: 'Last Name' },
      { id: 'email', title: 'Email' },
      { id: 'phone_number', title: 'Phone Number' },
      { id: 'address', title: 'Address' },
      { id: 'destination_country', title: 'Destination Country' },
      { id: 'total_amount', title: 'Total Amount' },
      { id: 'order_note', title: 'Order Note' },
      { id: 'order_detail', title: 'Order Detail' },
      { id: 'payment_by_flutterwave', title: 'Payment by Flutterwave' },
      { id: 'payment_status', title: 'Payment Status' },
      { id: 'payment_receipt', title: 'Payment Receipt' },
      { id: 'order_ref', title: 'Order Reference' },
      { id: 'created_at', title: 'Created At' },
      { id: 'updated_at', title: 'Updated At' },
      { id: 'deleted_at', title: 'Deleted At' },
    ]
});

  try {
    await csvWriter.writeRecords(data);
    return 'CSV file created successfully';
  } catch (error) {
    console.error('Error creating CSV file:', error);
    throw new Error('Failed to create CSV file');
  }
}

module.exports = {
  generateCSV,
};