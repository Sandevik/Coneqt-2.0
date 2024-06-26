export default function getDateRangeOfWeek(weekNo: number, y: number){
    const dates: string[] = []
    var d1, numOfdaysPastSinceLastMonday, rangeIsFrom;
    d1 = new Date(''+y+'');
    numOfdaysPastSinceLastMonday = d1.getDay() - 1;
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    d1.setDate(d1.getDate() + (7 * (weekNo - getWeek(d1))));
    rangeIsFrom = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear();
    for (let i = 0; i < 7; i++) {
      const month = ((d1.getDate() + i) > new Date(y, d1.getDate(), 0).getDate() ? ((d1.getMonth() + 2) > 12 ? 1 : (d1.getMonth() + 2)) : (d1.getMonth() + 1));
      const date = ((d1.getDate() + i) > new Date(y, d1.getDate(), 0).getDate() ? 1 : (d1.getDate() + i));
      const year = ((d1.getDate() + i) > new Date(y, d1.getDate(), 0).getDate() && month == 12 ? y + 1 : y)
      dates.push(date + "-" + month + "-" + year)
    }
    return dates;
};

function getWeek(date: Date): number {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }