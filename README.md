# Lights Out: An Analysis of Power Outages
### Pranav Rajaram, Abhinav Chinnam

This is our final project for the DSC 80 course at UC San Diego. 

## Introduction
The dataset we analyzed in this project consists of information related to major power outages in the United States from 2000 to 2016. We thought this dataset would be valuable to look into because, according to census.gov, 33.9 million households are impacted by power outages in the US every year. So, being able to predict and better understand power outages would no doubt have a positive real world impact. With this in mind, the question we used as the framework for our analysis was **What are the causes and effects of major power outages in the United States?**

The data we used was from the Purdue Engineering Research Data site, and a data dictionary from the article "A Multi-Hazard Approach to Assess Severe Weather-Induced Major Power Outage Risks in the U.S" was also provided. The data qualifies a "major" power outage as one that impacted at least 50,000 customers or had an unplanned firm load loss of at least 300 MW. The data incldues not only data points related to the power outage (duration, customers affected, etc.), but also details about regional electricity consumption patterns, economic characteristics, and climate information about the impacted areas. 

The original dataset had 1534 rows. Here are the columns we thought to be relevant to our analysis:
 - **Year**: Indicates the year when the outage event occurred.
 - **Month**: Indicates the month when the outage event occurred.
 - **U.S._STATE**: Indicates the state where the outage event occurred.
 - **CLIMATE.REGION**: Indicates the climate region where the outage event occurred, as specified by National Centers for Environmental Information.
 - **CLIMATE.CATEGORY**: "Warm", "Cold", or "Normal", represents the climate episodes corresponding to the year.
 -**OUTAGE.START.DATE**: The day of the year when the outage event started.
 -**OUTAGE.START.TIME** The time of the day when the outage event started.
 -**OUTAGE.RESTORATION.DATE**: The day of the year when power was restored to all the customers.
 -**OUTAGE.RESTORATION.TIME** The time of the day when power was restored to all the customers.
 -**OUTAGE.DURATION**: Duration of outage events (in minutes).
 -**DEMAND.LOSS.MW**: Amount of peak demand lost during an outage event in Megawatts.
 -**CUSTOMERS.AFFECTED**: Number of customers affected by the power outage event.
 -**RES.PRICE**: Monthly electricity price in the residential sector (cents/kilowatt-hour).
 -**RES.SALES**: Electricity consumption in the residential sector (megawatt-hour).
 -**RES.PERCEN**: Percentage of residential electricity consumption compared to the total electricity consumption in the state.
 -**RES.CUST.PCT**: Percent of residential customers served in the U.S. state.
 -**POPPCT_URBAN**: Percentage of the total population of the U.S. state represented by the urban population.
 -**POPDEN_URBAN**: Population density of the urban areas.

## Data Cleaning and Exploratory Data Analysis

## Assessment of Missingness

## Hypothesis Testing

## Framing a Prediction Problem

## Baseline Model

## Final Model

## Fairness Analysis
