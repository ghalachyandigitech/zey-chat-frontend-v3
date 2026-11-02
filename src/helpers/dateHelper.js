export const dateRange = {
    today: function(){
        const dateStart = new Date();
        dateStart.setHours(0,0,0,0);

        return [dateStart, new Date()];
    },

    yesterday: function(){
        const dateStart = new Date();
        const dateEnd = new Date();

        dateStart.setDate(dateStart.getDate() - 1);
        dateStart.setHours(0,0,0,0);

        dateEnd.setDate(dateEnd.getDate() - 1);
        dateEnd.setHours(23,59,59,0);

        return [dateStart, dateEnd];
    },

    ['current-week']: function(){
        const today = new Date();

        const dateStart = new Date(today);
        dateStart.setDate(today.getDate() - today.getDay());

        const dateEnd = new Date(dateStart);
        dateEnd.setDate(dateStart.getDate() + 6);

        dateStart.setHours(0,0,0,0);

        return [dateStart, dateEnd];
    },

    ['current-month']: function(){
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const dateStart = new Date(year, month, 1);
        const dateEnd = new Date(year, month + 1, 0);

        dateEnd.setHours(23,59,59,0);

        return [dateStart, dateEnd];
    },

    ['last-six-months']: function(){
        const dateEnd = new Date();
        const dateStart = new Date(dateEnd);
        dateStart.setMonth(dateStart.getMonth() - 6);

        return [dateStart, dateEnd];
    }
};