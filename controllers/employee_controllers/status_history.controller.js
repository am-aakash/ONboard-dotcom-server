const response = require("../../helpers/response.helper");
const db = require("../../models");
const StatusHistory = db.status_history;

exports.addStatusHistory = async (req, res) => {
    const employee_id = req.body.employee_id
    const date = req.body.date
    const status = req.body.status
    const status_subheading = req.body.status_subheading

    if (
        date == "" ||
        date == null ||
        employee_id == null ||
        employee_id === "" ||
        status == "" ||
        status == null
    ) {
        return response.responseHelper(
            res,
            false,
            "All fields are required",
            "Failed to Add Status"
        )
    }

    try {
        let statusHistory = await StatusHistory.create({
            employee_id,
            date,
            status,
            status_subheading
        })
        if (statusHistory) {
            return response.responseHelper(
                res,
                true,
                {
                    statusHistory,
                },
                "Add status successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}

exports.fetchEmployeeHistory = async (req, res) => {
    const employee_id = req.body.employee_id

    if (
        employee_id == null ||
        employee_id === "" 
    ) {
        return response.responseHelper(
            res,
            false,
            "All fields are required",
            "Failed to Get Status History"
        )
    }

    try {
        const statusHistory = await StatusHistory.findAndCountAll({
            where: {
                employee_id: employee_id,
            },
        })
        if (statusHistory) {
            return response.responseHelper(
                res,
                true,
                {
                    count: statusHistory.count,
                    data: statusHistory,
                },
                "Fetch statusHistory successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}

exports.deleteStatusHistory = async (req, res) => {
    const status_history_id = req.body.status_history_id

    try {
        const status_history = await StatusHistory.findOne({
            where: {
                id: status_history_id,
            },
        })
        if (!status_history) {
            return response.responseHelper(res, false, "Error", "This Status History does not exists")
        }
        const temp = await StatusHistory.destroy({
            where: {
                id: status_history_id,
            },
        })
        if (status_history) {
            return response.responseHelper(
                res,
                true,
                status_history,
                "Deleted status_history successful"
            )
        }
    } catch (error) {
        console.log(error)
        return response.responseHelper(res, false, "Error", "Something went wrong")
    }
}