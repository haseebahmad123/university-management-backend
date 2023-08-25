const excel = require('exceljs');

const generateExcel = async (data) => {

  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet('Orders');

  // Add headers to the worksheet
  const headers = Object.keys(data[0]);
  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true }; // Set the font style to bold for the header row

  // Add data rows to the worksheet
  data.forEach(order => {
    const rowData = [];
    headers.forEach(header => {
      if (header === 'order_detail') {
        // Convert nested objects to a JSON string
        rowData.push(JSON.stringify(order[header]));
      } else {
        rowData.push(order[header]);
      }
    });
    worksheet.addRow(rowData);
  });

  // Set column widths
  worksheet.columns.forEach(column => {
    const maxLength = column.values.reduce((acc, value) => {
      return Math.max(acc, value ? value.toString().length : 0);
    }, 0);
    column.width = maxLength < 12 ? 12 : maxLength;
  });

  // Define the output file path
  const filePath = 'orders.xlsx';

  // Save the workbook to the file
  workbook.xlsx.writeFile(filePath);
  return "Excel Generated Successfully";

}

module.exports = {
    generateExcel,
};

