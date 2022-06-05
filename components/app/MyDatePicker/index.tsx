import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  getDaysInMonth,
  getDay,
} from "date-fns";
import Button from "@components/common/Button";
import { IFaunaSolve } from "@lib/faunadb/types";
import Modal from "@components/common/Modal";
import { dateToPuzzleId } from "@lib/utils/dateHelpers";
import { TODAY, DAY_ZERO, PREMIUM_DAY_ZERO } from "@lib/utils/constants";
import { IFaunaUser } from "@lib/faunadb/types";

type DatepickerType = "date" | "month" | "year";

export interface IMyDatePickerProps {
  faunaUser: IFaunaUser;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  modalState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const MyDatePicker: FC<IMyDatePickerProps> = ({
  faunaUser,
  selectedDate,
  setSelectedDate,
  modalState,
}) => {
  const [modalOpen, setModalOpen] = modalState;

  const yesterday = () => {
    const yes = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() - 1
    );
    setSelectedDate(yes);
    setModalOpen(false);
  };

  const isSelected = (d: number): boolean => {
    return (
      datepickerHeaderDate.getFullYear() === selectedDate.getFullYear() &&
      datepickerHeaderDate.getMonth() === selectedDate.getMonth() &&
      d === selectedDate.getDate()
    );
  };

  const tomorrow = () => {
    const tom = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 1
    );
    setSelectedDate(tom);
    setModalOpen(false);
  };

  const isPastTomorow = (d: number): boolean => {
    return (
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        d
      ) > TODAY
    );
  };

  const isBeforeDayZero = (d: number): boolean => {
    return (
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        d
      ) < DAY_ZERO
    );
  };

  //   const isBeforelastWeek = (d: number): boolean => {
  //     return (
  //       new Date(
  //         datepickerHeaderDate.getFullYear(),
  //         datepickerHeaderDate.getMonth(),
  //         d
  //       ) < PREMIUM_DAY_ZERO
  //     );
  //   };

  const isSolved = (date: number, puzzleLen: number): boolean => {
    if (!faunaUser.solves || faunaUser.solves.data.length === 0) return false;
    const currDate = new Date(
      datepickerHeaderDate.getFullYear(),
      datepickerHeaderDate.getMonth(),
      date
    );
    return (
      faunaUser.solves.data.filter((s: IFaunaSolve) => {
        return (
          s.puzzle.date == dateToPuzzleId(currDate) &&
          s.puzzle.wi.length === puzzleLen
        );
      }).length > 0
    );
  };

  const requiresPremium = (date: number): boolean => {
    return false;
    const currDate = new Date(
      datepickerHeaderDate.getFullYear(),
      datepickerHeaderDate.getMonth(),
      date
    );
    return currDate < PREMIUM_DAY_ZERO && currDate >= DAY_ZERO;
  };

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [datepickerHeaderDate, setDatepickerHeaderDate] =
    useState(selectedDate);
  const [type, setType] = useState<DatepickerType>("date");

  const decrement = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const setDateValue = (date: number) => () => {
    setSelectedDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date
      )
    );
    setModalOpen(false);
  };

  const getDayCount = (date: Date) => {
    let daysInMonth = getDaysInMonth(date);

    // find where to start calendar day of week
    let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate()
      )
    );
    setType("date");
  };

  const toggleDatepicker = () => setModalOpen((prev) => !prev);

  const showMonthPicker = () => setType("month");

  const showYearPicker = () => setType("date");

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  return (
    <div className="flex items-center justify-center">
      <Button type={"secondary"} onClick={() => yesterday()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Button>

      <Button onClick={toggleDatepicker}>
        <div className="flex justify-center">
          <div className="pr-2">{format(selectedDate, "yyyy-MM-dd")}</div>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </Button>

      <Button type={"secondary"} onClick={() => tomorrow()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Button>

      <Modal title={"Calendar"} state={modalState} hideCloseButton={true}>
        <div className="flex justify-between items-center mb-2">
          <button
            type="button"
            className=" transition-all duration-fast inline-flex cursor-pointer hover:bg-gray-700 p-1 rounded-full"
            onClick={decrement}
          >
            <svg
              className="h-6 w-6 inline-flex"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {type === "date" && (
            <div
              onClick={showMonthPicker}
              className="flex-grow p-1 text-lg font-bold cursor-pointer hover:bg-gray-700 rounded-lg  transition-all duration-fast"
            >
              <p className="text-center">
                {format(datepickerHeaderDate, "MMMM")}
              </p>
            </div>
          )}
          <div
            onClick={showYearPicker}
            className="flex-grow p-1 text-lg font-bold cursor-pointer hover:bg-gray-700 rounded-lg  transition-all duration-fast"
          >
            <p className="text-center">
              {format(datepickerHeaderDate, "yyyy")}
            </p>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex cursor-pointer hover:bg-gray-700  transition-all duration-fast p-1 rounded-full"
              onClick={increment}
            >
              <svg
                className="h-6 w-6 inline-flex"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
        {type === "date" && (
          <>
            <div className="flex flex-wrap mb-3 -mx-1">
              {DAYS.map((day, i) => (
                <div key={i} style={{ width: "14.26%" }} className="px-1">
                  <div className="font-medium text-center text-xs ">{day}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap -mx-1">
              {blankDays.map((_, i) => (
                <div
                  key={i}
                  style={{ width: "14.26%" }}
                  className="text-center border p-1 border-transparent text-sm"
                ></div>
              ))}
              {dayCount.map((d, i) => (
                <div key={i} style={{ width: "14.26%" }} className="px-1 mb-1">
                  {!isPastTomorow(d) && !isBeforeDayZero(d) && (
                    <div
                      onClick={setDateValue(d)}
                      className={`cursor-pointer text-center text-sm border rounded-lg leading-loose hover:bg-gray-700 transition-all duration-fast  ${
                        isSelected(d)
                          ? "bg-gray-500"
                          : requiresPremium(d)
                          ? "bg-yellow-500 hover:bg-yellow-300 text-gray-900"
                          : null
                      }`}
                    >
                      <div>{d}</div>
                      {[4, 5, 6].map((n) => (
                        <div
                          className="grid place-content-center grid-cols-2"
                          key={n}
                        >
                          <div className="align-middle">{n}</div>
                          <div>
                            {isSolved(d, n) ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-600 mt-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {type === "month" && (
          <div className="flex flex-wrap -mx-1">
            {Array(12)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  onClick={setMonthValue(i)}
                  style={{ width: "25%" }}
                >
                  <div
                    className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-700   transition-all duration-fast`}
                  >
                    {format(
                      new Date(
                        datepickerHeaderDate.getFullYear(),
                        i,
                        datepickerHeaderDate.getDate()
                      ),
                      "MMM"
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="flex justify-center">
          <Button type={"secondary"} onClick={() => yesterday()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            type={"green"}
            onClick={() => {
              setSelectedDate(TODAY);
              setModalOpen(false);
            }}
          >
            Today
          </Button>
          <Button type={"secondary"} onClick={() => tomorrow()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MyDatePicker;
