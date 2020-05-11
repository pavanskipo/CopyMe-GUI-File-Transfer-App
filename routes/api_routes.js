const routes = require('express').Router();
const controller = require('../controller/controller');

routes.get('/getdevices', async function(req, res) {
    let list_of_devices = await controller.getListOfDevices();
    res.json(list_of_devices);
});

routes.get('/getdevicedetails', function(req, res) {
    res.json(controller.getdevicedetails());
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

routes.post('/upload',function(req,res){
    controller.uploadFile(req, res);
});


module.exports = routes;