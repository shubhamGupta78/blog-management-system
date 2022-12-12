country-state-city-slim
==============================
Basic library for Country and State

Data Source:<br>
https://github.com/dr5hn/countries-states-cities-database<br>
For any data related issue, you can raise a Issue [here](https://github.com/dr5hn/countries-states-cities-database/issues/new).

The original package:<br>
https://www.npmjs.com/package/country-state-city

# Install
`npm i country-state-city-slim`
# Docs

`import { Country, State }  from 'country-state-city-slim';`

getCountryByCode(code)
---------------

It accepts a valid `CountryCode` eg: `'IL'` and   returns *Country Details*

type: **json | ICountry**

```js
{
	"isoCode": "IL",
	"name": "Israel",
	"phonecode": "972",
	"flag": "🇮🇱",
	"currency": "ILS",
	"latitude": "31.50000000",
	"longitude": "34.75000000",
	"region": "Asia",
	"internationalOrganization": ""
}
```
Note: the internationalOrganization can be either "EU" for the European Union, Or An empty string for other countries

getStatesOfCountry(countryCode)
---------------

It accepts a valid `CountryCode` (which must be either `'US'` or `'CA'`) and returns *all States* as Array of JSON

type: **array of json | IState**

```js
[
	{
		"name": "New York",
        "isoCode": "NY",
        "countryCode": "US",
        "latitude": "40.71277530",
        "longitude": "-74.00597280"
	}
]

```

getAllCountries()
---------------
It returns **all Countries**

type: **array of json | ICountry**

```js
[
	{
		"isoCode": "IL",
        "name": "Israel",
        "phonecode": "972",
        "flag": "🇮🇱",
        "currency": "ILS",
        "latitude": "31.50000000",
        "longitude": "34.75000000",
		"region": "Asia",
		"internationalOrganization": ""
	}
]
```

getAllStates()
---------------
It returns all States **For Canada and United States only**

type: **array of json | IState**

```js
[
	{
		"name": "New York",
        "isoCode": "NY",
        "countryCode": "US",
        "latitude": "40.71277530",
        "longitude": "-74.00597280"

	}
]
```
isEuropeanUnion(countryCode)
---------------
It returns true if the country is part of the European Union

type: **boolean**

```js
true
```

# Note
This is a slim version of country-state-city
forked from [here](https://github.com/harpreetkhalsagtbit/country-state-city)<br>
I removed the timezones and the cities and all states besides states of USA and Canada
in order to decrease the size of my project.<br>
I also added a 'Region' field to each country.<br>
if you want, you can use [the original npm package](https://www.npmjs.com/package/country-state-city)
