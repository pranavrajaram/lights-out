# Lights Out: An Analysis of Power Outages
### Pranav Rajaram, Abhinav Chinnam

This is our final project for the DSC 80 course at UC San Diego. 

## Introduction
The dataset we analyzed in this project consists of information related to major power outages in the United States from 2000 to 2016. We thought this dataset would be valuable to look into because, according to census.gov, 33.9 million households are impacted by power outages in the US every year. So, being able to predict and better understand power outages would no doubt have a positive real world impact. With this in mind, the question we used as the framework for our analysis was **What are the causes and effects of major power outages in the United States?**

The data we used was from the Purdue Engineering Research Data site, and a data dictionary from the article "A Multi-Hazard Approach to Assess Severe Weather-Induced Major Power Outage Risks in the U.S" was also provided. The data qualifies a "major" power outage as one that impacted at least 50,000 customers or had an unplanned firm load loss of at least 300 MW. The data incldues not only data points related to the power outage (duration, customers affected, etc.), but also details about regional electricity consumption patterns, economic characteristics, and climate information about the impacted areas. 

The original dataset had 1534 rows. Here are the columns we thought to be relevant to our analysis:
 - **OBS**: Lists the observation entry number in the dataframe.
 - **Year**: Indicates the year when the outage event occurred.
 - **Month**: Indicates the month when the outage event occurred.
 - **U.S._STATE**: Indicates the state where the outage event occurred.
 - **CLIMATE.REGION**: Indicates the climate region where the outage event occurred, as specified by National Centers for Environmental Information.
 - **CLIMATE.CATEGORY**: "Warm", "Cold", or "Normal", represents the climate episodes corresponding to the year.
 - **CAUSE.CATEGORY**: Tthe events that caused the major power outage.
 - **OUTAGE.START.DATE**: The day of the year when the outage event started.
 - **OUTAGE.START.TIME** The time of the day when the outage event started.
 - **OUTAGE.RESTORATION.DATE**: The day of the year when power was restored to all the customers.
 - **OUTAGE.RESTORATION.TIME** The time of the day when power was restored to all the customers.
 - **OUTAGE.DURATION**: Duration of outage events (in minutes).
 - **DEMAND.LOSS.MW**: Amount of peak demand lost during an outage event in Megawatts.
 - **CUSTOMERS.AFFECTED**: Number of customers affected by the power outage event.
 - **RES.PRICE**: Monthly electricity price in the residential sector (cents/kilowatt-hour).
 - **RES.SALES**: Electricity consumption in the residential sector (megawatt-hour).
 - **RES.PERCEN**: Percentage of residential electricity consumption compared to the total electricity consumption in the state.
 - **RES.CUST.PCT**: Percent of residential customers served in the U.S. state.
 - **POPPCT_URBAN**: Percentage of the total population of the U.S. state represented by the urban population.
 - **POPDEN_URBAN**: Population density of the urban areas.

## Data Cleaning and Exploratory Data Analysis
### Data Cleaning

Here are the steps we took to clean the data for analysis:
1. We manually exported the data from a .xlsx to a .csv file and loaded it into python.
1. We changed all of the column names to lower case and replaced periods with underscores. For instance 'OUTAGE.DURATION' became 'outage_duration'. This made it more convenient to access the columns in the future.
1. We combined `OUTAGE.START.DATE` and `OUTAGE.START.TIME` into one pd.Timestamp column called `OUTAGE.START`. We did the same for `OUTAGE.RESTORATION.DATE` and `OUTAGE.RESTORATION.TIME`.
1. We dropped all of the columns not listed above, and set the index of the DataFrame to the `OBS` column.
1. We replaced values of 0 in the `CUSTOMERS.AFFECTED`, `OUTAGE.DURATION`, and `DEMAND.LOSS.MV` columns with NA. This is because we thought values of 0 in those columns indicated a missing value, as it does not make much sense for 0 customers to be affected by a major outage, the duration of an outage to be 0 minutes, or the total loss of demand to be 0 mega watts.

This is a snapshot of what our DataFrame looked like after these cleaning steps. For the sake of appearance, the `RES.PRICE`, `RES.SALES`, `RES.PERCENT`, `RES.CUST.PERCENT`, `POPPCT_URBAN`, and `POPDEN_URBAN` columns are not included in the table below.

|   year |   month | u_s__state   | climate_region     | climate_category   | cause_category     |   outage_duration |   demand_loss_mw |   customers_affected | outage_start        | outage_restoration   |
|-------:|--------:|:-------------|:-------------------|:-------------------|:-------------------|------------------:|-----------------:|---------------------:|:--------------------|:---------------------|
|   2011 |       7 | Minnesota    | East North Central | normal             | severe weather     |             70000 |              nan |                70000 | 2011-07-01 17:00:00 | 2011-07-03 20:00:00  |
|   2014 |       5 | Minnesota    | East North Central | normal             | intentional attack |               nan |              nan |                  nan | 2014-05-11 18:38:00 | 2014-05-11 18:39:00  |
|   2010 |      10 | Minnesota    | East North Central | cold               | severe weather     |             70000 |              nan |                70000 | 2010-10-26 20:00:00 | 2010-10-28 22:00:00  |
|   2012 |       6 | Minnesota    | East North Central | normal             | severe weather     |             68200 |              nan |                68200 | 2012-06-19 04:30:00 | 2012-06-20 23:00:00  |
|   2015 |       7 | Minnesota    | East North Central | warm               | severe weather     |            250000 |              250 |               250000 | 2015-07-18 02:00:00 | 2015-07-19 07:00:00  |

### Univariate Analysis

<iframe
  src="assets/causes-bar-graph.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

This bar graph shows the different causes of major power outages in the dataset. We can see that severe weather is the most frequent cause, while intentional attacks and system malfunctions were also common culprits. This is helpful to know because we get a better sense of when to be mindful of a potential power outage — it would be much more important for a household to prepare for a power outage if there was a hurricane in the area than islanding.

### Bivariate Analysis

<iframe
  src="assets/outages-by-month.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

This plot shows the number of cuatomers affected by major power outages for each month in the dataset. This information is valuable because it helps us understand when to be most wary of a power outage. Summer and winter months appear to have the highest number of affected customers, which makes sense considering what we learned about severe weather. This graph also sets up our future hypothesis test.

### Interesting Aggregates

| u_s__state   |   year |   outage_duration |
|:-------------|-------:|------------------:|
| Oklahoma     |   2002 |       1.88113e+06 |
| Florida      |   2005 |       1.14378e+06 |
| New York     |   2003 |       1.11188e+06 |
| California   |   2014 |  933475           |
| California   |   2002 |  769750           |
| Texas        |   2008 |  750607           |
| Ohio         |   2003 |  668750           |
| California   |   2005 |  613378           |
| New York     |   2012 |  607272           |
| Virginia     |   2001 |  600000           |

This table shows the state and year with the 10 highest average power outage durations. It is a good sanity check of the data, as we can try to match up the results of this aggregation with real life events. For instance, Hurricane Katrina would have impacted millions of Floridians in 2005, while the Northeast blackout of 2003 likely caused the large outage duration in New York state in 2003.

<iframe
  src="assets/climate-heatmap.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

This heatmap, which is an interactive version of a pivot table, shows the number of customers affected by major power outages per climate region and year. As expected, areas of the United States prone to severe weather events (Southeast, Northeast, West) tend to have a larger amount of customers affected. We can also match up current events to this plot, such as Hurricane Sandy impacted the Northeast in 2012.

## Assessment of Missingness

## Hypothesis Testing

## Framing a Prediction Problem

## Baseline Model

## Final Model

## Fairness Analysis
