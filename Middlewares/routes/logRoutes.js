const express= require('express');
const router= express.Router();
const { normalOrRangeUserLogs }= require('../../Controllers/manageLogs')

router.get('/users/:id/logs', normalOrRangeUserLogs)
//router.get('/users/:id/logs', viewAlluserLogsPerDateRange)

module.exports= router;