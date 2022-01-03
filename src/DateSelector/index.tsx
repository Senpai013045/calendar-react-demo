import React, { useState } from "react";
import { Day } from "../interfaces";
import DayPicker, { DateUtils, DayPickerProps } from "react-day-picker";
import "react-day-picker/lib/style.css";

const convertMilitaryTimeTo12Hour = (time: string) => {
  if (time === "") {
    return "";
  }
  const [hours, minutes] = time.split(":");
  const ampm = Number(hours) >= 12 ? "pm" : "am";
  const newHours = Number(hours) % 12;
  return `${newHours}:${minutes} ${ampm}`;
};

interface DateSelectorProps {
  onSubmit?: (dates: Day[]) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  onSubmit = (dates: Day[]) => {},
}) => {
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);
  const [times, setTimes] = useState<Array<[string, string]>>([["", ""]]);
  const [availability, setAvailability] = useState<"available" | "unavailable">(
    "available"
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDates.length === 0) {
      return;
    }

    const dates = selectedDates.map((date) => date.toLocaleDateString());

    const formattedTimes = times
      .filter((t) => t[0] !== "" || t[1] !== "")
      .map((t) => {
        const f: [string, string] = [
          convertMilitaryTimeTo12Hour(t[0]),
          convertMilitaryTimeTo12Hour(t[1]),
        ];
        return f;
      });

    const dataToSubmit = dates.map((date) => {
      return {
        date,
        times: formattedTimes,
        availability,
      };
    });
    onSubmit(dataToSubmit);
    setSelectedDates([]);
    setTimes([["", ""]]);
    setAvailability("available");
  };

  const handleDayClick: DayPickerProps["onDayClick"] = (day) => {
    const clonedSelectedDays = [...selectedDates];
    const selectedIndex = selectedDates.findIndex((selectedDay) =>
      DateUtils.isSameDay(selectedDay, day)
    );
    if (selectedIndex === -1) {
      clonedSelectedDays.push(day);
    } else {
      clonedSelectedDays.splice(selectedIndex, 1);
    }
    setSelectedDates(clonedSelectedDays);
  };

  const handleStartTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const clonedTimes = [...times];
    clonedTimes[index][0] = e.target.value;
    setTimes(clonedTimes);
  };

  const handleEndTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const clonedTimes = [...times];
    //check if start time is empty
    const startTime = clonedTimes[index][0];
    if (startTime === "") {
      return;
    }
    //check if start time is after endTime
    const endTime = e.target.value;
    if (endTime !== "" && startTime > endTime) {
      return;
    }
    clonedTimes[index][1] = endTime;
    setTimes(clonedTimes);
  };

  const handleAddTime = () => {
    //check if end time is empty
    const endTimes = times[times.length - 1];
    if (endTimes[0] === "" || endTimes[1] === "") {
      return;
    }
    setTimes([...times, ["", ""]]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DayPicker selectedDays={selectedDates} onDayClick={handleDayClick} />
        <br />
        {times.map(([startTime, endTime], index) => {
          return (
            <div key={index}>
              from{" "}
              <input
                type="time"
                onChange={(e) => handleStartTimeChange(e, index)}
                value={startTime}
              />
              to{" "}
              <input
                type="time"
                onChange={(e) => handleEndTimeChange(e, index)}
                value={endTime}
              />
            </div>
          );
        })}
        <br />
        <button type="button" onClick={handleAddTime}>
          Add Time
        </button>
        <br />
        <br />
        <label>
          <input
            type="checkbox"
            checked={availability === "available"}
            onChange={(e) => {
              const { checked } = e.target;
              setAvailability(checked ? "available" : "unavailable");
              if (!checked) {
                setTimes([["", ""]]);
              }
            }}
          />
        </label>
        <br />

        <button type="submit">Add Availability</button>
      </form>
    </div>
  );
};
