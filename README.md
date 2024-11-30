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
1. We changed all of the column names to lower case and replaced periods with underscores. For instance 'OUTAGE.DURATION' became `outage_duration`. This made it more convenient to access the columns in the future.
1. We combined `OUTAGE.START.DATE` and `OUTAGE.START.TIME` into one pd.Timestamp column called `OUTAGE.START`. We did the same for `OUTAGE.RESTORATION.DATE` and `OUTAGE.RESTORATION.TIME`.
1. We dropped all of the columns not listed above, and set the index of the DataFrame to the 'OBS' column.
1. We replaced values of 0 in the `CUSTOMERS.AFFECTED`, `OUTAGE.DURATION`, and `DEMAND.LOSS.MV` columns with NA. This is because we thought values of 0 in those columns indicated a missing value, as it does not make much sense for 0 customers to be affected by a major outage, or for the duration to be 0 minutes.

This is a snapshot of what our DataFrame looked like after these cleaning steps:
|   year |   month | u_s__state   | climate_region     | climate_category   | cause_category     |   outage_duration |   demand_loss_mw |   customers_affected |   res_price |   res_sales |   res_percen |   res_cust_pct |   poppct_urban |   popden_urban | outage_start        | outage_restoration   |
|-------:|--------:|:-------------|:-------------------|:-------------------|:-------------------|------------------:|-----------------:|---------------------:|------------:|------------:|-------------:|---------------:|---------------:|---------------:|:--------------------|:---------------------|
|   2011 |       7 | Minnesota    | East North Central | normal             | severe weather     |             70000 |              nan |                70000 |       11.6  | 2.33292e+06 |      35.5491 |        88.9448 |          73.27 |           2279 | 2011-07-01 17:00:00 | 2011-07-03 20:00:00  |
|   2014 |       5 | Minnesota    | East North Central | normal             | intentional attack |               nan |              nan |                  nan |       12.12 | 1.58699e+06 |      30.0325 |        88.8335 |          73.27 |           2279 | 2014-05-11 18:38:00 | 2014-05-11 18:39:00  |
|   2010 |      10 | Minnesota    | East North Central | cold               | severe weather     |             70000 |              nan |                70000 |       10.87 | 1.46729e+06 |      28.0977 |        88.9206 |          73.27 |           2279 | 2010-10-26 20:00:00 | 2010-10-28 22:00:00  |
|   2012 |       6 | Minnesota    | East North Central | normal             | severe weather     |             68200 |              nan |                68200 |       11.79 | 1.85152e+06 |      31.9941 |        88.8954 |          73.27 |           2279 | 2012-06-19 04:30:00 | 2012-06-20 23:00:00  |
|   2015 |       7 | Minnesota    | East North Central | warm               | severe weather     |            250000 |              250 |               250000 |       13.07 | 2.02888e+06 |      33.9826 |        88.8216 |          73.27 |           2279 | 2015-07-18 02:00:00 | 2015-07-19 07:00:00  |

## Assessment of Missingness

## Hypothesis Testing

## Framing a Prediction Problem

## Baseline Model

## Final Model

## Fairness Analysis
