const express= require('express');
const router= express.Router();
const { viewUserLogs,  viewAlluserLogsPerDateRange}= require('../../Controllers/manageLogs')

router.get('/users/:id/logs', viewUserLogs)
//router.get('/users/:id/logs', viewAlluserLogsPerDateRange)

module.exports= router;