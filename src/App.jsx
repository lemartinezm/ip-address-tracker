import Map from './components/Map/Map';
import Spinner from './components/Spinner/Spinner';
import useIpData from './hooks/useIpData';
import iconArrow from './assets/icon-arrow.svg';
import './App.scss'

function App() {
  const { userData, setIpToTrack, setDomainToTrack } = useIpData();
  const domainRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
  const ipRegex = /(^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$)/g;

  function handleSubmit(e) {
    e.preventDefault();
    if (domainRegex.test(e.target.ip.value)) {
      setDomainToTrack(e.target.ip.value);
    } else if (ipRegex.test(e.target.ip.value)) {
      setIpToTrack(e.target.ip.value);
    } else {
      alert('Please provide a valid value!');
    }
  }

  return (
    <>
      <div className='container'>
        <h1>IP Address Tracker</h1>

        <form onSubmit={handleSubmit} className='input-container'>
          <input type='text' id='ip' required pattern='(^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$)|(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]' className='search' placeholder='Search for any IP address or domain' />

          <button type='submit'>
            <img src={iconArrow} alt='icon arrow' />
          </button>
        </form>

        <div className='info-container' style={userData ? { gridTemplateColumns: 'repeat(4, 1fr)' } : null}>
          {
            userData
              ? <>
                <div className='info'>
                  <h2>IP Address</h2>
                  <p>{userData.ip}</p>
                </div>

                <div className='info'>
                  <h2>Location</h2>
                  <p>{userData.location.city}, {userData.location.region}</p>
                </div>

                <div className='info'>
                  <h2>Timezone</h2>
                  <p>UTC{userData.location.timezone}</p>
                </div>

                <div className='info'>
                  <h2>ISP</h2>
                  <p>{userData.isp}</p>
                </div>
              </>
              : <Spinner />
          }
        </div>
      </div>

      {userData ? <Map userData={userData} /> : null}

    </>
  )
}

export default App
