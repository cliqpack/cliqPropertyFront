import { React, useState } from "react";

const Preloader = props => {
  const [state, setState] = useState();
  return (
    <div className="preloader bg-soft flex-column justify-content-center align-items-center">
      <div className="loader-element">
        <img
          src="https://frontend-myday.cliqpack.com/static/media/logo-dark.c7b586a981eaa4d4fb67.png"
          height="40"
          alt="Impact logo"
        />
      </div>
    </div>
  );
};
export default Preloader;
