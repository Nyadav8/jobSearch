import { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { updateFlters } from "./redux/filters";
import Card from "./component/card";
import FilterNav from "./component/filter";

function App() {
  const myDivRef = useRef(null);

  let [allcontent, setallcontent] = useState({
    jdList: [],
    totalCount: 0,
  });
  let [allcontentfilter, setallcontentfilter] = useState([]);
  let [body, setbody] = useState({
    limit: 20,
    offset: 0,
  });
  let [fetching, setfetching] = useState(false);

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
      <FilterNav />
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
