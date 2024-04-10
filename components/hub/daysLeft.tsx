import React from "react";

type Props = {
  deadline: string;
  renderedIn: string;
};

function DaysLeft({ deadline, renderedIn }: Props) {
  function calculateDaysLeft(deadline: string) {
    // Convert string dates to Date objects
    const deadlineDate = new Date(deadline);
    const currentDateObj = new Date(currentDate);

    // Calculate the difference in milliseconds between the deadline and current date
    const timeDiff = deadlineDate.getTime() - currentDateObj.getTime();

    // Convert milliseconds to days
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  }

  const currentDate = new Date(); // Current date object
  const daysLeft = calculateDaysLeft(deadline);

  return (
    <>
      {deadline == "" ? null : (
        <p
          className={`w-fit rounded-lg   ${renderedIn == "projectCard" ? "bg-3BG px-2 py-1 text-xs font-medium" : renderedIn == "analytics" ? "bg-2BG px-3 py-4 text-2xl font-medium" : null}`}
        >
          {`${daysLeft <= 0 ? "0" : daysLeft} days left`}
        </p>
      )}
    </>
  );
}

export default DaysLeft;
