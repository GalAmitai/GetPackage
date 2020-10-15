class DeliveryMiddleware {
    
    static addDelivery(req, res, next) {
        const packSize = req.body.packSize;
        const cost = req.body.cost;
        const description = req.body.description;
        const date = new Date(req.body.date);
        
        if(req.headers.user.type !== 'sender') {
            res.send({
                status: 400,
                data: "Only senders can add delivery."
            });
            return;
        }
        if(!packSize || !cost || !description || !date) {
            res.send({
                status: 500,
                data: "Missing Information."
            });
            return;
        }
        if (isNaN(date.getTime())) {
            res.send({
                status: 500,
                data: "Date format wrong mm/dd/yyyy."
            });
            return;
        }
        return next();
    }

    static getDeliveries(req, res, next) {
        const date = new Date(req.body.date);
        if (isNaN(date.getTime())) {
            res.send({
                status: 500,
                data: "Date format wrong mm/dd/yyyy."
            });
            return;
        }
        return next();
    }

    static assignDelivery(req, res, next) {
        const deliveryId = req.body.deliveryId;
        const courierId = req.body.courierId;
        
        // Only sender user can assign delivery
        if(req.headers.user.type !== 'sender') {
            res.send({
                status: 500,
                data: "Only sender can assign deliveries."
            });
            return;
        }

        if(!deliveryId || !courierId) {
            res.send({
                status: 500,
                data: "Missing Information."
            });
            return;
        }
        return next();
    }

    static courierRevenue(req, res, next) {
        const dateFrom = new Date(req.body.dateFrom);
        const dateTo = new Date(req.body.dateTo);

        // Only courier user can assign delivery
        if(req.headers.user.type !== 'courier') {
            res.send({
                status: 500,
                data: "Only courier can calculate revenues."
            });
            return;
        }

        if(isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime())) {
            res.send({
                status: 500,
                data: "Missing Information or Date format wrong mm/dd/yyyy.."
            });
            return;
        }
        
        // Only Past Dates
        if(dateFrom > dateTo || dateTo > new Date()) {
            res.send({
                status: 500,
                data: "Dates can be only in past"
            });
            return;
        }

        return next();
    }

}
module.exports = DeliveryMiddleware;