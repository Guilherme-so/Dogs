import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const router = useNavigate();
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft != 0) setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="container mainContainer">
      <h1 className="title">Erro : 404 </h1>
      <p>pagína não encontrada. voce sera redirecionado em {timeLeft}</p>
      {timeLeft === 0 && router("/", { replace: true })}
    </div>
  );
};

export default NotFound;
