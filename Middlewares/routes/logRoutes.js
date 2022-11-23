const express= require('express');
const router= express.Router();
const { viewAllLogs,  viewAlluserLogsPerDateRange}= require('../../Controllers/manageLogs')

router.get('/users/:id/logs', viewAllLogs)
router.get('/users/:id/logs/:from/:to/:limit', viewAlluserLogsPerDateRange)

module.exports= router;