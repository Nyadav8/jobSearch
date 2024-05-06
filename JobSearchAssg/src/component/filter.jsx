import { useDispatch, useSelector } from "react-redux";
import { updateFlters } from "../redux/filters";
export default function FilterNav() {
  let dispatch = useDispatch();
  let filter = useSelector((state) => state.filterset.filterState) || {
    filtername: "",
    filterexp: "",
    filterloc: "",
    filtersal: "",
    filterrole: "",
    filterpay: "",
  };

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
    <div className="header">
      <div className="content-around">
        <select
          onChange={handleChange("filterrole")}
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
          onChange={handleChange("filterloc")}
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
          style={{ width: "11rem" }}
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
          placeholder="Search by company"
          onChange={handleChange("filtername")}
          name=""
          id=""
          className="selection-box"
        />
      </div>
    </div>
  );
}
