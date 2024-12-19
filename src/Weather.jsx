import React, { useState } from 'react'
import useFetch from './weatherData'
import { Divider, Stack, Tooltip } from '@mui/material'
import geography from './assets/geography.gif'
import sun from './assets/sun.png'
import clouds from './assets/clouds-gif.gif'
import visibility from './assets/visibility.png'
import wind from './assets/wind.png'
import humid from './assets/humidity.png'
import pressure from './assets/pressure.png'


const Weather = () => {

    const [fetchUrl, setFetchUrl] = useState("")


    // weatherDeatils is an array as data obtained from useState is an array
    const weatherDetails = useFetch(fetchUrl)
    console.log(weatherDetails);


    const [noInput, setNoInput] = useState(false)

    const [city, setCity] = useState("")
    console.log(city);



    const handleClick = () => {

        if (city) {
            setNoInput(false)
            setFetchUrl(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`)

        } else {
            setNoInput(true)
        }


    }

    //conversion of timestamps to time conversion ,muitipiled by 1000 to convert to milliseconds
    const sunrise = weatherDetails[0]?.sys? new Date(weatherDetails[0].sys.sunrise*1000).toLocaleTimeString() : ''
    const sunset = weatherDetails[0]?.sys? new Date(weatherDetails[0].sys.sunset*1000).toLocaleTimeString() : ''


    

    return (
        <div className='container p-2'>
            <div className='d-flex justify-content-center container'>
                <div className='p-2 container'>
                    <input name='city' value={city} onChange={e => setCity(e.target.value)} type="text" placeholder='Enter the City name' className='form-control rounded-4' />
                    {/* if no city entered */}
                    {
                        noInput && <div className='fw-bold text-danger fs-5 p-1'>Please enter a city !!!</div>
                    }
                    {/* if city not found*/}
                    {
                       !noInput && weatherDetails[1] && <div className='fw-bold text-danger text-center fs-5 p-3'>City not found !!!</div>
                    } 
                    
                </div>
                <div className='p-2'>
                    <button onClick={handleClick} className='btn btn-primary rounded-circle'><i className="fa-solid fa-magnifying-glass text-white"></i></button>
                </div>
            </div>
            {
                weatherDetails[0] && !weatherDetails[1] && <div className='p-1 text-center'>
                    <h3 className='text-white fs-1 fw-bold'>{weatherDetails[0].name}</h3>
                    <div><img className='img-fluid' src={`https://openweathermap.org/img/wn/${weatherDetails[0].weather[0].icon}@2x.png`} alt="weather-image" /></div>
                    <h5 className='text-white fs-3 fw-semibold'>{weatherDetails[0].main.temp}°C</h5>
                </div>
            }
            {
                weatherDetails[0] && !weatherDetails[1] &&
                <div className='p-1'>
                    <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: 'white' }} />}
                        spacing={2}
                        className='text-white p-1 mt-4'
                        justifyContent="center"
                        flexWrap="wrap"
                    >
                        <p className='p-1' style={{ fontSize: "12px" }}><span className='fw-bold'>Humidity :</span> {weatherDetails[0].main.humidity}% <Tooltip title="Humidity is the amount of water vapor in the air." placement="bottom-end">
                            <i className="fa-solid fa-circle-exclamation text-white ms-1"></i>
                        </Tooltip></p>
                        <p className='p-1' style={{ fontSize: "12px" }}><span className='fw-bold'>Visibility :</span> {weatherDetails[0].visibility}m <Tooltip title="Visibility is how far you can see in the air." placement="bottom-end">
                            <i className="fa-solid fa-circle-exclamation text-white ms-1"></i>
                        </Tooltip></p>
                        <p className='p-1' style={{ fontSize: "12px" }}><span className='fw-bold'>Wind :</span> {weatherDetails[0].wind.speed}m/s <Tooltip title="Wind indicates the movement of air, which affects temperature, humidity, and weather patterns." placement="bottom-end">
                            <i className="fa-solid fa-circle-exclamation text-white ms-1"></i>
                        </Tooltip></p>
                        <p className='p-1' style={{ fontSize: "12px" }}><span className='fw-bold'>Weather :</span> {weatherDetails[0].weather[0].main} <Tooltip title="Main weather" placement="bottom-end">
                            <i className="fa-solid fa-circle-exclamation text-white ms-1"></i>
                        </Tooltip></p>
                        <p className='p-1' style={{ fontSize: "12px" }}><span className='fw-bold'>Pressure :</span> {weatherDetails[0].main.pressure}hpa <Tooltip title="Atmospheric pressure is the force exerted by the weight of the air above us in the atmosphere." placement="bottom-end">
                            <i className="fa-solid fa-circle-exclamation text-white ms-1"></i>
                        </Tooltip></p>
                        <p className='p-1' style={{ fontSize: "12px" }}><span className='fw-bold'>Feels Like :</span> {weatherDetails[0].main.feels_like}°C <Tooltip title="'Feels like' temperature shows how the weather actually feels to our bodies, considering factors like wind and humidity." placement="bottom-end">
                            <i className="fa-solid fa-circle-exclamation text-white ms-1"></i>
                        </Tooltip></p>

                    </Stack>
                </div>
            }
            {
                weatherDetails[0] && !weatherDetails[1] &&  <div className='p-1 mt-4 d-flex justify-content-center align-items-center gap-3 flex-wrap'>
                    <div style={{ width: "14rem", height: "14rem", backgroundColor: "#100c08", borderRadius: "20px", opacity: "0.6" }} className='p-3 mt-3'>
                        <p className='text-white'>Geography</p>
                        <div className='mx-auto' style={{ width: "80px" }}>
                            <img className='img-fluid' src={geography} alt="geography" />
                        </div>
                        <p className='text-white p-1 mt-4' style={{ fontSize: "12px" }}>Longitude : {(weatherDetails[0].coord.lon).toFixed(2)}° and Lattitude : {(weatherDetails[0].coord.lat).toFixed(2)}°</p>
                    </div>
                    {/* sun */}
                    <div style={{ width: "14rem", height: "14rem", backgroundColor: "#100c08", borderRadius: "20px", opacity: "0.6" }} className='p-3 mt-3'>
                        <p className='text-white'>Sun</p>
                        <div className='mx-auto' style={{ width: "90px" }}>
                            <img className='img-fluid' src={sun} alt="geography" />
                        </div>
                        <p className='text-white p-1 mt-2' style={{ fontSize: "12px" }}>Sunrise is at {sunrise}, and Sunset is at {sunset}.</p>
                    </div>
                    {/* clouds */}
                    <div style={{ width: "14rem", height: "14rem", backgroundColor: "#100c08", borderRadius: "20px", opacity: "0.6" }} className='p-3 mt-3'>
                        <p className='text-white'>Clouds</p>
                        <div className='mx-auto' style={{ width: "100px" }}>
                            <img className='img-fluid' src={clouds} alt="geography" />
                        </div>
                        <p className='text-white p-1 mt-2' style={{ fontSize: "12px" }}>Cloudiness is {weatherDetails[0].clouds.all}%.</p>
                    </div>
                    {/* visibiltiy */}
                    <div style={{ width: "14rem", height: "14rem", backgroundColor: "#100c08", borderRadius: "20px", opacity: "0.6" }} className='p-3 mt-3'>
                        <p className='text-white'>Visibility</p>
                        <div className='mx-auto' style={{ width: "100px" }}>
                            <img className='img-fluid' src={visibility} alt="geography" />
                        </div>
                        <p className='text-white p-1 mt-2' style={{ fontSize: "12px" }}>The visibility in the area is {weatherDetails[0].visibility} meters.</p>
                    </div>
                    {/* Wind */}
                    <div style={{ width: "14rem", height: "14rem", backgroundColor: "#100c08", borderRadius: "20px", opacity: "0.6" }} className='p-3 mt-3'>
                        <p className='text-white'>Wind</p>
                        <div className='mx-auto' style={{ width: "100px" }}>
                            <img className='img-fluid' src={wind} alt="geography" />
                        </div>
                        <p className='text-white p-1 mt-2' style={{ fontSize: "12px" }}>The wind speed is {weatherDetails[0].wind.speed} m/s from  {weatherDetails[0].wind.deg} degrees, with gusts of {weatherDetails[0].wind.gust}m/s.</p>
                    </div>
                    <div style={{ width: "14rem", height: "14rem", backgroundColor: "#100c08", borderRadius: "20px", opacity: "0.6" }} className='p-3 mt-3'>
                        <p className='text-white'>Humidity</p>
                        <div className='mx-auto' style={{ width: "100px" }}>
                            <img className='img-fluid' src={humid} alt="geography" />
                        </div>
                        <p className='text-white p-1 mt-2' style={{ fontSize: "12px" }}>The humidity level is {weatherDetails[0].main.humidity}%.</p>
                    </div>
                    <div style={{ width: "14rem", height: "14rem", backgroundColor: "#100c08", borderRadius: "20px", opacity: "0.6" }} className='p-3 mt-3'>
                        <p className='text-white'>Pressure</p>
                        <div className='mx-auto' style={{ width: "100px" }}>
                            <img className='img-fluid' src={pressure} alt="geography" />
                        </div>
                        <p className='text-white p-1 mt-2' style={{ fontSize: "12px" }}>The atmospheric pressure is {weatherDetails[0].main.pressure} hPa (hectopascals).</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Weather