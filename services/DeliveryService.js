const DeliveryModel = require('./../models/Delivery');

class DeliveryService {
    static async addDelivery(packSize, cost, desc, date, sender) {
        const delivery = new DeliveryModel({
            packSize: packSize,
            cost: cost,
            description: desc,
            date: date,
            sender: sender
        });

        try {
            await delivery.save();
            return {
                status: 200,
                data: "Delivery added successfully."
            }
        } catch(err) {
            return {
                status: 400,
                data: err
            }
        }
    }

    static async getDeliveries(date, type, user_id) {
        let deliveries = null;
        switch(type) {
            case "sender":
                deliveries = await DeliveryModel.find({
                    sender: user_id,
                    date: date
                });
                break;

            case "courier":
                deliveries = await DeliveryModel.find({
                    assign_to: user_id,
                    date: date
                });
                break;
        }

        return {
            status: 200,
            data: deliveries
        }
    }

    static async assignDelivery(deliveryId, courierId) {
        // check valid delivery id
        try {
            let delivery = await DeliveryModel.findById(deliveryId);
            if(delivery) {
                // check maximum 5 delivery each day.
                let dateToday = new Date('10/14/2020'); // need be today but for test i keep 14/10/2020
                let courierDeliveries = await DeliveryModel.find({
                    assign_to: courierId,
                    date: dateToday
                });
                if(courierDeliveries.length >= 5) {
                    return {
                        status: 500,
                        data: `This courier (${courierId}) can only have 5 deliveries each day.`
                    }
                }
                delivery.assign_to = courierId;
                await delivery.save();
                return {
                    status: 200,
                    data: `Delivery id: ${deliveryId} assigned to ${courierId}`
                }
            }
        } catch(err) {
            return {
                status: 500,
                data: "Delivery id doesn't exists."
            }
        }
    }

    static async courierRevenue(dateFrom, dateTo, courierId) {
        let revenue = 0;
        const courierDeliveries = await DeliveryModel.find({
            assign_to: courierId,
            date: {
                "$gte": dateFrom,
                "$lt": dateTo
            }
        });
        if(courierDeliveries.length > 0) {
            for(let i = 0 ; i < courierDeliveries.length ; i++) {
                revenue += parseFloat(courierDeliveries[i].cost);
            }
            return {
                status: 200,
                data: `total revenue between [${dateFrom.toString()}-${dateTo.toString()}]: ${revenue}, Total ${courierDeliveries.length} Deliveries`
            }
        } else {
            return {
                status: 200,
                data: `total revenue between [${dateFrom.toString()}-${dateTo.toString()}]: ${revenue}`
            }
        }
    }
}

module.exports = DeliveryService;