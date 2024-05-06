import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateFlters } from "../redux/filters";
export default function FilterNav() {
  // to dispatch reducer to do desired changes
  let dispatch = useDispatch();
  //all the filter store required will be asigned to variable filter if the value is there in
  //   the redux store it will fill the value otherwise default values it will take
  let filter = useSelector((state) => state.filterset.filterState) || {
    filtername: "",
    filterexp: "",
    filterloc: "",
    filtersal: "",
    filterrole: "",
    filteremp: "",
  };

  var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  let [showfilter, setshowfilter] = useState(false);

  //   this function is used to set values in the filter according to filter type

  let handleChange = (name) => (event) => {
    console.log(name, event);
    // setfilter({
    //   ...filter,
    //   [name]: event.target.value,
    // });
    dispatch(
      updateFlters({
        ...filter,
        [name]: event.target.value,
      })
    );
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="header">
        {(showfilter || width > 500) && (
          <div className="content-around">
            <select
              onChange={handleChange("filterrole")}
              defaultValue={filter.filterrole}
              name=""
              id=""
              className="selection-box"
            >
              <option value="">Roles</option>
              <option value="frontend">frontend</option>
              <option value="backend">backend</option>
              <option value="ios">ios</option>
              <option value="android">android</option>
              <option value="tech leads">tech lead</option>
            </select>

            <select
              onChange={handleChange("filterexp")}
              defaultValue={filter.filterexp}
              name=""
              id=""
              style={{ width: "12rem" }}
              className="selection-box"
            >
              <option value="">No of Employees </option>
            </select>

            <select
              onChange={handleChange("filterloc")}
              defaultValue={filter.filterloc}
              name=""
              id=""
              className="selection-box"
            >
              <option value="">Work Type</option>
              <option value="Remote">Remote</option>
              <option value="delhi">delhi ncr</option>
              <option value="chennai">chennai</option>
              <option value="mumbai">mumbai</option>
              <option value="bangalore">bangalore</option>
            </select>

            <select
              onChange={handleChange("filterexp")}
              defaultValue={filter.filterexp}
              name=""
              id=""
              style={{ width: "11rem" }}
              className="selection-box"
            >
              <option value="">Experience (Yr)</option>
              <option value="<= 2">{"<= 2"}</option>
              <option value="<= 5">{"<= 5"}</option>
              <option value="<= 10">{"<= 10"}</option>
              <option value=">10">{">10"}</option>
            </select>
            <select
              onChange={handleChange("filtersal")}
              defaultValue={filter.filtersal}
              style={{ width: "12rem" }}
              name=""
              id=""
              className="selection-box"
            >
              <option value="">Minimum Base Pay Salary</option>
              <option value="<=10">{"<=10"}</option>
              <option value="<=20">{"<=20"}</option>
              <option value=">20">{">20"}</option>
            </select>
            <input
              type="text"
              style={{ width: "12rem" }}
              placeholder="Search by company"
              onChange={handleChange("filtername")}
              name=""
              defaultValue={filter.filtername}
              id=""
              className="selection-box"
            />
          </div>
        )}
        {width < 500 && (
          <div
            onClick={() => {
              setshowfilter((prev) => !prev);
            }}
            className="header2"
          >
            <span style={{ fontSize: "1.4rem" }}>🔎</span>
          </div>
        )}
      </div>
    </>
  );
}
