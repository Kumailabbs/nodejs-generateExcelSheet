
const express = require('express');
const prisma = require('../../prisma/client');

const generateExcelReport = async (req, res) => {
  try {

    // Get all data from the curcuit breaker table from database by descending order
      const circuitHistory = await prisma.circuitBreaker.findMany({
          orderBy: {
              id: 'desc'
          }
      });

      // Creating the sheet and setting the sheet name
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Circuit Breaker Data');

      // Define headers with styling
      worksheet.columns = [
          { header: 'ID', key: 'id', width: 10 },
          { header: 'Voltage', key: 'voltage', width: 15 },
          { header: 'Current', key: 'current', width: 15 },
          { header: 'Relay State', key: 'relayState', width: 12 },
          { header: 'Minimum Voltage', key: 'vMin', width: 18 },
          { header: 'Maximum Voltage', key: 'vMax', width: 18 },
          { header: 'Minimum Current', key: 'cMin', width: 18 },
          { header: 'Maximum Current', key: 'cMax', width: 18 },
          { header: 'Created At', key: 'createdAt', width: 20 }
      ];

      // Add data to worksheet
      circuitHistory.forEach(record => {
          worksheet.addRow(record);
      });

      // Apply bold style to headers
      worksheet.getRow(1).font = { bold: true };

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="CircuitBreakerData.xlsx"`);

      await workbook.xlsx.write(res);
      res.end();
  } catch (error) {
      console.error('Failed to generate Excel:', error);
      res.status(500).send('Failed to generate Excel file due to an error.');
  }
}

module.exports = {
    generateExcelReport
  };
