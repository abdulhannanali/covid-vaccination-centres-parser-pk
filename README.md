# Covid Vaccination Centres Pakistan

Covid Vaccination Centres Pakistan is responsible for parsing the raw data source
and convert them into organized list of vaccination centres. Moreover it fetches for Google Places
data which at times might not be accurate for remote areas most of the times does the job.

This is companion project of https://github.com/abdulhannanali/mehfooz-raho/


### What's the original data source?

The original data source for this application is a [PDF](https://ncoc.gov.pk/facilities/MVCs_CVCs.pdf) that is parsed converted through an online converter to an HTML and afterwards parsed using the scraper. This original data source  hasn't been updated once uploaded by the government but that's the best we can do.

Crowdsourced opinion is one other option that I am considering apart from these centres to get to know more about other pop-up centres being established by the government.


### The Process 

The raw data located in [trackedRawDataHistory](./trackedRawDataHistory) is first processed by 
the parser located in [src/generator](src/generator), extended with data from Google Places API and 
stored in [store/](./store)

The latest version number in the store directory reflects the data being used by [mehfooz.xyz](https://mehfooz.xyz)

### Backlog

Check [issues](https://github.com/abdulhannanali/vaccination-centres-parser/issues) for backlog

### Current Parsed File

[1.0.9.json](./store/1.0.9.json)