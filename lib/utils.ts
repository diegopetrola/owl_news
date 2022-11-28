export const formatDate = (date: Date | string) => {
    const milisecsPerMin = 1000 * 60;
    const milisecsPerHour = milisecsPerMin * 60;
    const milisecsPerDay = milisecsPerHour * 24;
    const milisecsPerMonth = milisecsPerDay * 30;
    const milisecsPerYear = milisecsPerMonth * 12;

    const now = new Date();
    const curDate = new Date(date);
    const timeDiff = now.getTime() - curDate.getTime();

    let fac = 1;
    if (timeDiff > milisecsPerYear) {
        fac = Math.round(timeDiff / milisecsPerYear);
        return `${fac} ${fac == 1 ? "year" : "years"} ago`;
    } else if (timeDiff > milisecsPerMonth) {
        fac = Math.round(timeDiff / milisecsPerMonth);
        return `${fac} ${fac == 1 ? "month" : "months"} ago`;
    } else if (timeDiff > milisecsPerDay) {
        fac = Math.round(timeDiff / milisecsPerDay);
        return `${fac} ${fac == 1 ? "day" : "days"} ago`;
    } else if (timeDiff > milisecsPerHour) {
        fac = Math.round(timeDiff / milisecsPerHour);
        return `${fac} ${fac == 1 ? "hour" : "hours"} ago`;
    } else {
        fac = Math.round(timeDiff / milisecsPerMin);
        return `${fac} ${fac == 1 ? "min" : "mins"} ago`;
    }
};

export function formatURL(url: string) {
    const res = url.match(/(?<=https:\/\/)[\w.-]*(?=\/[\w\/-])?/g);
    return res && res.length > 0 ? res[0] : "";
}
