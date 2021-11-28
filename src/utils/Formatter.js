export const formatLuxonDate = (datetime) =>
    `${datetime.c.year}/${datetime.c.month}/${datetime.c.day} ${datetime.c.hour}:${datetime.c.minute >= 10 ? "" : 0}${datetime.c.minute}`

export const formatDate = (datetime) => {
    const day = datetime.getDate()
    const month = datetime.getMonth() + 1
    // const year = datetime.getYear() - 100
    const hour = datetime.getHours()
    const minute = datetime.getMinutes()

    // return `${month}/${day}`

    return `${month}/${day} ${hour}:${minute >= 10 ? "" : 0}${minute}`
}