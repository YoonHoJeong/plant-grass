import React from "react";

const Timelog = (props) => {
  return (
    <div>
      <form action="">
        <section>
          <label htmlFor="timelog-stime">start time</label>
          <input id="timelog-stime" />
        </section>
        <section>
          <label htmlFor="timelog-etime">end time</label>
          <input id="timelog-etime" />
        </section>
        <section>
          <label htmlFor="timelog-title">timelog title</label>
          <input id="timelog-title" />
        </section>
        <button>submit</button>
      </form>
    </div>
  );
};

export default Timelog;
