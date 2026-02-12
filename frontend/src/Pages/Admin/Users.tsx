import { useEffect, useState } from "react";
import UserInformationCard from "../../components/AdminComponents/UserInformationCard";
import Loading from "../../components/Loading";

const AdminPageUsers = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconden

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : <UserInformationCard />}
    </div>
  );
};

export default AdminPageUsers;
