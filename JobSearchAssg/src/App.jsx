import { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { updateFlters } from "./redux/filters";
import Card from "./component/card";
import FilterNav from "./component/filter";

function App() {
  // this the referenece on the last div which will be used in infinite scroll
  const myDivRef = useRef(null);
  // to get values from redux or use default values
  let filter = useSelector((state) => state.filterset.filterState) || {
    filtername: "",
    filterexp: "",
    filterloc: "",
    filtersal: "",
    filterrole: "",
    filteremp: "",
  };

  // to store all the values present in the API
  let [allcontent, setallcontent] = useState({
    jdList: [],
    totalCount: 0,
  });
  // will be used to store desired results
  let [allcontentfilter, setallcontentfilter] = useState([]);
  // bdy to set the limit and offset for the API
  let [body, setbody] = useState({
    limit: 20,
    offset: 0,
  });
  // used to whether call he api or not
  let [fetching, setfetching] = useState(true);

  // on change of filter, render will start, first will takes all values
  // available after that will check for each case upon checking will
  // keep of applying .filter to res list and get the deired results
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

  // fetch api call and logic to show only not null values
  useEffect(() => {
    if (fetching) {
      console.log("reached");

      try {
        postApi()
          .then((response) => {
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
              // filter case is similar as explained above
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
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }, [fetching]);

  // this will work whenver the div is initialised and is scroll is reached to it for infinite scroll
  useEffect(() => {
    const divElement = myDivRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Visible");
          setfetching(true);
          window.scrollTo({
            top: window.scrollY - 100,
          });
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
        {allcontentfilter.length > 0 ? (
          allcontentfilter.map((data, index) => {
            // card component which will show job card
            return <Card key={index} data={data} />;
          })
        ) : (
          <div className="container2">
            <div className="textNoData">
              <span className="title">Sorry! No jobs found</span>
              <span className="subtitle">
                Please change the filter to look for jobs
              </span>
            </div>
          </div>
        )}
      </div>
      <div ref={myDivRef}></div>
      {/* this below div is to to suppport the infinite scroll, because of its visibilitythe api is called */}
    </>
  );
}

export default App;
