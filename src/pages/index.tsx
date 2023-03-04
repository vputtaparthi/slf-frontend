import {useEffect, useState} from "react";

export default function Home() {

    const [amazonStatus, setAmazonStatus] = useState({url: "", statusCode: null, duration: null, date: null});
    const [googleStatus, setGoogleStatus] = useState({url: "", statusCode: null, duration: null, date: null});


    const getAmazonStatus = async () => {
        return await fetch("http://localhost:8080/v1/amazon-status")
            .then((response) => response.json())
            .then((data) => setAmazonStatus(data));
    }

  const getGoogleStatus = async () => {
      return await fetch("http://localhost:8080/v1/google-status")
          .then((response) => response.json())
          .then((data) => setGoogleStatus(data));
  }

  useEffect(() => {
      const interval = setInterval(() => {
          getAmazonStatus();
          getGoogleStatus();
      }, 5 * 1000)

      return () => clearInterval(interval)
  }, [])

    return (
        <>
            <div>
                <div>{amazonStatus.url}</div>
                <div>{amazonStatus.statusCode}</div>
                <div>{amazonStatus.duration}</div>
                <div>{amazonStatus.date}</div>
            </div>
            <br/>
            <div>
                <div>{googleStatus.url}</div>
                <div>{googleStatus.statusCode}</div>
                <div>{googleStatus.duration}</div>
                <div>{googleStatus.date}</div>
            </div>
        </>
    )
}

