const express = require("express");
const { generateExcelReport } = require("../services/reportService");

// Controller for generating the excel file
const getHistoryCircuit = async (req, res) => {
    try {
      const data = await generateExcelReport(req, res);
       res.status(200).json(data);
    } catch (error) {
      console.error('Detailed Error:', error); 
    }
    
  }

module.exports = {
    getHistoryCircuit
}