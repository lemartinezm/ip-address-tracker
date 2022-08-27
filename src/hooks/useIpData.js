import { useEffect, useState } from "react";

export default function useIpData() {
  const [userData, setUserData] = useState(null);
  const [ipToTrack, setIpToTrack] = useState('');
  const [domainToTrack, setDomainToTrack] = useState('')

  useEffect(() => {
    async function fetchUserData() {
      await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_API_KEY}&ipAddress=${ipToTrack}&domain=${domainToTrack}`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Something went wrong!');
          return await res.json()
        })
        .then(setUserData)
        .catch(err => alert('Something went wrong!'));
    }
    fetchUserData();
  }, [ipToTrack, domainToTrack]);

  return {
    userData,
    setIpToTrack,
    setDomainToTrack
  };
}
