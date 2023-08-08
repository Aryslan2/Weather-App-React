import '/public/reset.css'
import React, {useEffect, useState} from 'react'
import styles from './Home.module.css'

const Home = () => {

	const [weather, setWeather] = useState({});
	const [search, setSearch] = useState('Almaty');


		const handleSubmit = e => {
			e.preventDefault();
			
			fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=d4f7ce194d4c7c79117c4a563614adcf`)
				.then(res => res.json())
				.then(result => {
					setWeather(result);
					setSearch('');
					console.log(result);
				})
		}

	const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

	return (
		<div className={styles.wrapper}>
			<div className={styles.Home}>
				<div className={styles.container}>
					<div className={styles.inner_Home}>
						<form className={styles.Weather}>
							<h1 className={styles.title}>Weather App</h1>
							<input type="text" className={styles.Weather_write} 
							placeholder='Write Here...' 
							onChange={e => setSearch(e.target.value)}
            	value={search}
							autoComplete="off"
							/>
							<button className={styles.submit} onClick={handleSubmit}>Submit</button>
							<div className={styles.weather_information}>
								<div className={styles.weather_det}>
									<h3 className={styles.city_name}>{weather?.name}</h3>
									<div className="date">{dateBuilder(new Date())}</div>
									<div className={styles.temp_weather}>
										<div className={styles.data_weather}>
											<p>Temperature:</p>
											<p>{Math.round(weather?.main?.temp)}°C</p>
										</div>
										<div className={styles.line}></div>
										<div className={styles.data_weather}>
											<p>Humidity:</p>
											<p>{weather?.main?.humidity}%</p>
										</div>
										<div className={styles.line}></div>
										<div className={styles.data_weather}>
											<p>Wind speed:</p>
											<p>{weather?.wind?.speed}km/h</p>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home