import { CalendarTileProperties } from "react-calendar";
import { Day } from "../interfaces";
import styles from "./Tile.module.scss";

interface TileProps {
  tileProperties: CalendarTileProperties;
  days: Array<Day>;
}

export const Tile: React.FC<TileProps> = ({ tileProperties, days }) => {
  if (tileProperties.view !== "month") {
    return <div className={styles.tile}></div>;
  }
  const time = tileProperties.date.toLocaleDateString();

  const day = days.find((day) => {
    return day.date === time;
  });

  if (!day) {
    return <div className={styles.tile}></div>;
  }

  const isAllDay =
    day?.times.length === 0 ||
    day?.times[0][0] === "" ||
    day?.times[0][1] === "";

  const availability = (day?.availability || "") as string;
  const formatted = availability[0]?.toUpperCase() + availability?.slice(1);

  return (
    <div
      className={`${styles.tile} ${
        day?.availability === "available"
          ? styles.available
          : day?.availability === "unavailable"
          ? styles.unavailable
          : ""
      }`}
    >
      {formatted}
      {isAllDay ? (
        <p>(All Day)</p>
      ) : (
        day?.times.map(([startTime, endTime]) => {
          return (
            <p key={startTime}>
              {startTime} to {endTime}
            </p>
          );
        })
      )}
    </div>
  );

  // if (availableDay) {
  //   return (
  //     <div className={`${styles.tile} ${styles.available}`}>
  //       <p>Available</p>
  //       {isAllDay ? (
  //         <p>(All day)</p>
  //       ) : (
  //         availableDay.times.map(([startTime, endTime]) => {
  //           return (
  //             <div key={startTime}>
  //               {startTime} to {endTime}
  //             </div>
  //           );
  //         })
  //       )}
  //     </div>
  //   );
  // }

  // return (
  //   <div className={styles.tile}>
  //     <p>Unavailable</p>
  //     <p>(All Day)</p>
  //   </div>
  // );
};
