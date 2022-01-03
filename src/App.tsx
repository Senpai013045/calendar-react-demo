import { useState } from "react";
import { DateSelector } from "./DateSelector";
import FullCalendar from "./FullCalendar/Calendar";
import { Day } from "./interfaces";

function App() {
  const [availableDays, setAvailableDays] = useState<Array<Day>>([]);

  const onSubmit = (dates: Day[]) => {
    const oldAvailableDays = [...availableDays];
    //if dates match override times else just add new day
    oldAvailableDays.forEach((oldDay) => {
      const newDay = dates.find((day) => day.date === oldDay.date);
      if (newDay) {
        oldDay.times = newDay.times;
        oldDay.availability = newDay.availability;
      }
    });
    //add new days
    dates.forEach((day) => {
      if (!oldAvailableDays.find((oldDay) => oldDay.date === day.date)) {
        oldAvailableDays.push(day);
      }
    });
    setAvailableDays(oldAvailableDays);
  };

  return (
    <div>
      <DateSelector onSubmit={onSubmit} />
      <hr />
      <FullCalendar days={availableDays} />
    </div>
  );
}
export default App;
