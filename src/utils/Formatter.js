export const formatLuxonDate =
    (datetime) =>
        `${datetime.c.year}/${datetime.c.month}/${datetime.c.day} ${datetime.c.hour}:${datetime.c.minute >= 10 ? "" : 0}${datetime.c.minute}`