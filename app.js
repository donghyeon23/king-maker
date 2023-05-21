const schedule = require('node-schedule');
const { Sailor, KingMaker } = require('./modules/index');

const king = new Sailor();
const kingMaker = new KingMaker(king);

if (king.inputStatus) {
    schedule.scheduleJob('30 59 4 * * *', () => {
        kingMaker.checkIn();
    });
    schedule.scheduleJob('0 0 5 * * *', () => {
        kingMaker.checkOut();
    });
}
