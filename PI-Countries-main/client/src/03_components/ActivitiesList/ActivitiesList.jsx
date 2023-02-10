import React from "react";
import { useSelector } from "react-redux"; //El hook useSelector() el cual permite extraer datos de una store de Redux.
import Activity from "../Activity/Activity";
import NavBar from "../NavBar/NavBar";
import "./ActivityList.css";

export default function ActivitiesList() {
  const activities = useSelector((state) => state.activities);
  console.log(activities)
  return (
    <div className="activityListContainer">

      <div>
        <NavBar />
      </div>

      <div className="activityCardListContainer">{
      activities?.map((acc) => {
          return (
            <div className="activityCardList">
              <Activity
                name={acc.name}
                duration={acc.duration}
                rating={acc.rating}
                season={acc.season}
                difficulty={acc.difficulty}
                countryId={acc.id_name}
              />
            </div> 
          )
        })}
      </div>
      
    </div>
  );
}
