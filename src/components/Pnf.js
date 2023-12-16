import React from "react";
import "./Pnf.css"

const PageNotFound = () => {
  return (
    <>
      <div id="main">
        <div class="fof">
          <h1>Error 404</h1><br/>
           <a href="/">
           <button className="go-back" >Go back to homepage</button>
           </a>
        </div>
      </div>
    </>
  )
};

export default PageNotFound;
