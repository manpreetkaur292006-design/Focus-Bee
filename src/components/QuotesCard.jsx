import React from "react";
import { useState,useEffect } from "react";

const QuotesCard = () => {

    const [quote,setQuote] = useState("");
    const [author,setAuthor] = useState("");

  // fetching the motivational quotes

  const fetchQuote = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");

      const data = await res.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // API calling

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="main-quotes-div">
      <h2 className="quote-h2">Motivation 💬</h2>

      <p className="quote-p1">"{quote || "Loading..."}"</p>
      <p className="quote-p2">- {author || "..."}</p>

      <button onClick={fetchQuote} className="new-quote-btn">New Quote</button>
    </div>
  );
};

export default QuotesCard;
