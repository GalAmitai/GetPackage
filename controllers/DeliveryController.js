const DeliveryService = require("../services/DeliveryService");

class DeliveryController {

    static async addDelivery(req) {
        try {
            const packSize = req.body.packSize;
            const cost = req.body.cost;
            const description = req.body.description;
            const date = new Date(req.body.date);
            const sender = req.headers['user'].id;
            const Delivery = await DeliveryService.addDelivery(packSize,cost,description,date,sender);
            
            return {
                status: Delivery.status,
                data: Delivery.data
            }
        } catch (err) {
            throw err;
        }
    }


    static async getDeliveries(req) {
        const date = new Date(req.body.date);
        const userType = req.headers['user'].type;
        const user_id = req.headers['user'].id;

        const deliveries = await DeliveryService.getDeliveries(date, userType, user_id);
        return {
            status: deliveries.status,
            data: deliveries.data
        }
    }

    static async assignDelivery(req) {
        const deliveryId = req.body.deliveryId;
        const courierId = req.body.courierId;
        const assign = await DeliveryService.assignDelivery(deliveryId,courierId);
        return {
            status: assign.status,
            data: assign.data
        }
    }

    static async courierRevenue(req) {
        const dateFrom = req.body.dateFrom;
        const dateTo = req.body.dateTo;
        const courierId = req.headers.user.id;
        const revenue = await DeliveryService.courierRevenue(dateFrom,dateTo,courierId);
        return {
            status: revenue.status,
            data: revenue.data
        }
    }
}

module.exports = DeliveryController;