import { differenceInDays, addDays, format } from "date-fns";

export function splitIntoDays(activities = [], startDate, endDate) {
  console.log("Activities received in splitIntoDays:", activities.length);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = differenceInDays(end, start) + 1;


  const days = [];
  for (let i = 0; i < totalDays; i++) {
    const d = addDays(start, i);
    days.push({
      date: format(d, "yyyy-MM-dd"),
      activities: []
    });
  }

  let dayIndex = 0;
  for (const act of activities) {
    days[dayIndex].activities.push({
          name: act.name,
          city: act.city,
          tags: act.tags,
          duration: act.duration,
          cost: act.cost,
          score: act.score
        });
        dayIndex = (dayIndex + 1) % totalDays;
      }
    

  return days;
}
