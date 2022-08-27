import { useEffect, useState } from "react";

export default function useIpData() {
  const [userData, setUserData] = useState(null);
  const [ipToTrack, setIpToTrack] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_API_KEY}&ipAddress=${ipToTrack}`);
      setUserData(await response.json());
    }
    fetchUserData();
  }, [ipToTrack]);

  return {
    userData,
    setIpToTrack
  };
}
