const response = require("../../helpers/response.helper")
const db = require("../../models")
const Devices = db.devices;

exports.addDevice = async (req, res) => {
    const employee_id = req.body.employee_id
    const name = req.body.name
    const photo = req.body.photo
    const recieved = req.body.recieved
    const cancelled = req.body.cancelled

    if (
        name == "" ||
        name == null ||
        employee_id == null ||
        employee_id === "" ||
        photo == "" ||
        photo == null
    ) {
        return response.responseHelper(
            res,
            false,
            "All fields are required",
            "Failed to Add Device"
        )
    }

    try {
        let device = await Devices.create({
            employee_id,
            name,
            photo,
            recieved,
            cancelled
        })
        if (device) {
            return response.responseHelper(
                res,
                true,
                {
                    device,
                },
                "Add device successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}

exports.fetchEmployeeDevices = async (req, res) => {
    const employee_id = req.body.employee_id

    if (
        employee_id == null ||
        employee_id === "" 
    ) {
        return response.responseHelper(
            res,
            false,
            "All fields are required",
            "Failed to Get Devices"
        )
    }

    try {
        const devices = await Devices.findAndCountAll({
            where: {
                employee_id: employee_id,
            },
        })
        if (devices) {
            return response.responseHelper(
                res,
                true,
                {
                    count: devices.count,
                    data: devices,
                },
                "Fetch devices successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}

exports.deleteDevice = async (req, res) => {
    const device_id = req.body.device_id

    try {
        const device = await Devices.findOne({
            where: {
                id: device_id,
            },
        })
        if (!device) {
            return response.responseHelper(res, false, "Error", "This Device does not exists")
        }
        const temp = await Devices.destroy({
            where: {
                id: device_id,
            },
        })
        if (device) {
            return response.responseHelper(
                res,
                true,
                device,
                "Deleted device successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}

exports.updateDeviceStatus = async (req, res) => {
    const device_id = req.body.device_id
    const recieved = req.body.recieved
    const cancelled = req.body.cancelled

    try {
        const device = await Devices.findOne({
            where: {
                id: device_id,
            },
        })
        if (!device) {
            return response.responseHelper(res, false, "Error", "This Device does not exists")
        }
        // Update here
        // const temp = await Devices.destroy({
        //     where: {
        //         id: device_id,
        //     },
        // })
        if (device) {
            return response.responseHelper(
                res,
                true,
                device,
                "Deleted device successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}