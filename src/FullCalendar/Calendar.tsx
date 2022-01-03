import Calendar from "react-calendar";
import { Day } from "../interfaces";
import styles from "./Calendar.module.scss";
import { Tile } from "./Tile";

interface FullCalendarProps {
  days: Array<Day>;
}

const FullCalendar: React.FC<FullCalendarProps> = ({ days }) => {
  return (
    <div>
      <Calendar
        className={styles.calendar}
        defaultValue={new Date()}
        tileContent={(tileProperties) => (
          <Tile tileProperties={tileProperties} days={days} />
        )}
        tileClassName={(props) => {
          const day = days.find((day) => {
            return day.date === props.date.toLocaleDateString();
          });
          if (day?.availability === "available") {
            return [styles.tile, styles.available];
          }
          if (day?.availability === "unavailable") {
            return [styles.tile, styles.unavailable];
          }
          return styles.tile;
        }}
      />
    </div>
  );
};
export default FullCalendar;
