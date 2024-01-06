import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [keyword, setkeyword] = useState("");
  const [keywordlist, setkeywordlist] = useState([]);
  const focusRef = useRef();
  const [update, setupdate] = useState();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    focusRef.current.focus();
    axios
      .get(`https://sellerkin-keywordvolume.vercel.app/api/getkeyword`)
      .then((res) => {
        setkeywordlist(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [update]);
  axios.defaults.withCredentials = true;
  const Submit = async (e) => {
    e.preventDefault();
    if (keyword !== "") {
      await axios
        .post("https://sellerkin-keywordvolume.vercel.app/api/setkeyword", {
          keyword,
        })
        .then((res) => {
          console.log(res.data.msg);
          setupdate(!update);
          setkeyword("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="">
      <div className="mx-auto  mt-40">
        <p className="text-center font-bold uppercase tracking-wider text-xl font-serif">
          Keyword Finder
        </p>
        <div>
          <form
            className="flex justify-center flex-col items-center   gap-y-16 "
            onSubmit={(e) => Submit(e)}
          >
            <div>
              <input
                type="text"
                ref={focusRef}
                value={keyword}
                placeholder="Search any keyword"
                className="w-96   mt-20  font-serif text-lg border-2 border-red-500 p-3 focus:outline-none rounded-lg focus:shadow-xl focus:shadow-red-400"
                onChange={(e) => setkeyword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-500 p-3 rounded-lg uppercase tracking-wider text-white hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 ">
        {keywordlist.length > 0 ? (
          <div>
            <table className="table-fixed w-[80%] text-center ml-40">
              <tr className="bg-slate-300 ">
                <th>Keyword</th>
                <th>Count</th>
                <th>Month & Year</th>
              </tr>

              {keywordlist.length > 0
                ? keywordlist.map((val, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:text-white"
                    >
                      <td>{val.keyword}</td>
                      <td>{val.count}</td>
                      <td className="">
                        {months[val.month[0]]}
                        {"   "}
                        {val.month[1]}
                      </td>
                    </tr>
                  ))
                : ""}
            </table>
          </div>
        ) : (
          "fetching..."
        )}
      </div>
    </div>
  );
}
export default App;
