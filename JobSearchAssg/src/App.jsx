import { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { updateFlters } from "./redux/filters";
import Card from "./component/card";

function App() {
  const myDivRef = useRef(null);
  let dispatch = useDispatch();
  let filter = useSelector((state) => state.filterset.filterState) || {
    filtername: "",
    filterexp: "",
    filterloc: "",
    filtersal: "",
    filterrole: "",
    filterpay: "",
  };

  let [showbtn, setshowbtn] = useState(true);
  let [allcontent, setallcontent] = useState({
    jdList: [],
    totalCount: 0,
  });
  let [allcontentfilter, setallcontentfilter] = useState([]);
  let [prevScroll, setprevScroll] = useState(0);
  let [body, setbody] = useState({
    limit: 20,
    offset: 0,
  });
  let [fetching, setfetching] = useState(false);

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

  useEffect(() => {
    let res = [];
    res = allcontent.jdList.filter((data) => {
      if (data != null) {
        return data;
      }
    });
    console.log(allcontent, res);
    if (filter.filterexp !== "") {
      switch (filter.filterexp) {
        case "<= 2": {
          res = res.filter((data) => {
            if (data.minExp <= 2) {
              return data;
            }
          });
          console.log(res);
          break;
        }
        case "<= 5": {
          res = res.filter((data) => {
            if (data.minExp != null && data.minExp <= 5) {
              return data;
            }
          });
          console.log(res);
          break;
        }
        case "<= 10": {
          res = res.filter((data) => {
            if (data.minExp <= 10) {
              return data;
            }
          });
          console.log(res);
          break;
        }
        case ">10": {
          res = res.filter((data) => {
            if (data.minExp > 10) {
              return data;
            }
          });
          console.log(res);
          break;
        }
      }
    }
    if (filter.filtername !== "") {
      res = res.filter((data) => {
        if (
          data.companyName
            .toLowerCase()
            .includes(filter.filtername.toLowerCase())
        )
          return data;
      });
    }
    if (filter.filterloc !== "") {
      res = res.filter((data) => {
        if (data.location.includes(filter.filterloc)) {
          return data;
        }
      });
    }
    if (filter.filtersal !== "") {
      console.log("reached");
      switch (filter.filtersal) {
        case "<=10": {
          res = res.filter((data) => {
            if (data.minJdSalary <= 10) {
              return data;
            }
          });
          console.log(res);
          break;
        }
        case "<=20": {
          res = res.filter((data) => {
            if (data.minJdSalary <= 20) {
              return data;
            }
          });
          break;
        }
        case ">20": {
          res = res.filter((data) => {
            if (data.minJdSalary > 20) {
              return data;
            }
          });
          break;
        }
      }
    }
    if (filter.filterrole !== "") {
      res = res.filter((data) => {
        if (data.jobRole.includes(filter.filterrole)) {
          return data;
        }
      });
    }
    setallcontentfilter(res);
  }, [filter]);

  let postApi = async () => {
    return await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      console.log(response);
      return response.json();
    });
  };

  useEffect(() => {
    if (fetching) {
      console.log("reached");

      postApi().then((response) => {
        console.log(response);
        if (response.jdList) {
          setallcontent({
            jdList: [...allcontent.jdList, ...response.jdList],
            totalCount: response.totalCount,
          });
          setbody({
            limit: 20,
            offset: ++body.offset,
          });

          console.log(allcontentfilter);
          let res = [
            ...allcontentfilter,
            ...response.jdList.filter((d) => {
              if (d != null) {
                return d;
              }
            }),
          ];
          console.log(filter);
          if (filter.filterexp !== "") {
            switch (filter.filterexp) {
              case "<= 2": {
                res = res.filter((data) => {
                  if (data.minExp <= 2) {
                    return data;
                  }
                });
                console.log(res);
                break;
              }
              case "<= 5": {
                res = res.filter((data) => {
                  if (data.minExp != null && data.minExp <= 5) {
                    return data;
                  }
                });
                console.log(res);
                break;
              }
              case "<= 10": {
                res = res.filter((data) => {
                  if (data.minExp <= 10) {
                    return data;
                  }
                });
                console.log(res);
                break;
              }
              case ">10": {
                res = res.filter((data) => {
                  if (data.minExp > 10) {
                    return data;
                  }
                });
                console.log(res);
                break;
              }
            }
          }
          if (filter.filtername !== "") {
            res = res.filter((data) => {
              if (
                data.companyName
                  .toLowerCase()
                  .includes(filter.filtername.toLowerCase())
              )
                return data;
            });
          }
          if (filter.filterloc !== "") {
            res = res.filter((data) => {
              if (data.location.includes(filter.filterloc)) {
                return data;
              }
            });
          }
          if (filter.filtersal !== "") {
            console.log("reached");
            switch (filter.filtersal) {
              case "<=10": {
                res = res.filter((data) => {
                  if (data.minJdSalary <= 10) {
                    return data;
                  }
                });
                console.log(res);
                break;
              }
              case "<=20": {
                res = res.filter((data) => {
                  if (data.minJdSalary <= 20) {
                    return data;
                  }
                });
                break;
              }
              case ">20": {
                res = res.filter((data) => {
                  if (data.minJdSalary > 20) {
                    return data;
                  }
                });
                break;
              }
            }
          }
          if (filter.filterrole !== "") {
            res = res.filter((data) => {
              if (data.jobRole.includes(filter.filterrole)) {
                return data;
              }
            });
          }
          setallcontentfilter(res);
        }
        setfetching((prev) => !prev);
      });
    }
  }, [fetching]);

  useEffect(() => {
    const divElement = myDivRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("The div is currently visible.");
          setfetching(true);
        }
      },
      { threshold: 0.5 }
    );

    if (divElement) {
      observer.observe(divElement);
    }

    return () => {
      if (divElement) {
        observer.unobserve(divElement);
      }
    };
  }, [myDivRef, myDivRef.current]);

  return (
    <>
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
      <div className="container">
        {allcontentfilter.map((data, index) => {
          return <Card key={index} data={data} />;
        })}
      </div>
      <div ref={myDivRef}></div>
    </>
  );
}

export default App;
