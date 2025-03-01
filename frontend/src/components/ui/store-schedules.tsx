"use client";

import { useMemo, useState } from "react";
import dayjs from "dayjs";

import { Store } from "@/lib/definitions";
import { ChevronDown, ChevronUp } from "lucide-react";

const frenchDays = {
  monday: "lundi",
  tuesday: "mardi",
  wednesday: "mercredi",
  thursday: "jeudi",
  friday: "vendredi",
  saturday: "samedi",
  sunday: "dimanche",
};

const daysOrder = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function StoreSchedules({ store }: { store: Store }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentOpeningHoursLabel = useMemo(() => {
    const currentDay = dayjs()
      .format("dddd")
      .toLocaleLowerCase() as keyof typeof store.openingHours;
    const currentOpening = store.openingHours[currentDay];
    const currentHour = dayjs().format("HH:mm");
    const isOpen =
      currentOpening &&
      !currentOpening.isClosed &&
      currentHour >= currentOpening.openTime &&
      currentHour <= currentOpening.closeTime;

    if (isOpen) {
      return (
        <>
          <span className="text-green-600 font-medium">Ouvert</span> - Ferme à{" "}
          {currentOpening.closeTime}
        </>
      );
    }

    return (
      <>
        <span className="text-red-600 font-medium">Fermé</span> - Ouvre à{" "}
        {currentOpening.openTime}
      </>
    );
  }, [store]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const openingHours = useMemo(() => {
    const today = dayjs().format("dddd").toLowerCase(); // ex: "thursday"

    const startIndex = daysOrder.indexOf(today);
    const sortedDays = daysOrder
      .slice(startIndex)
      .concat(daysOrder.slice(0, startIndex))
      .map((day) => [day, frenchDays[day as keyof typeof frenchDays]]);

    return (
      <ul className="w-full max-w-sm">
        {sortedDays.map(([day, frenchDay]) => {
          const opening =
            store.openingHours[day as keyof typeof store.openingHours];
          if (!opening || opening.isClosed) {
            return null;
          }
          return (
            <li
              key={day}
              className={`${day === today ? "font-bold" : ""} ml-4 flex items-center gap-2`}
            >
              <span>{frenchDay} :</span>
              <span className="ml-auto">
                {!opening || opening.isClosed ? (
                  <span className="text-red-600 font-medium">Fermé</span>
                ) : (
                  <>
                    {opening.openTime} - {opening.closeTime}
                  </>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }, [store]);

  return (
    <>
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <span className="font-bold">Horaires :</span> {currentOpeningHoursLabel}{" "}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && <div>{openingHours}</div>}
    </>
  );
}

export { StoreSchedules };
