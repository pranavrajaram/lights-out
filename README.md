# Lights Out: An Analysis of Power Outages
### Pranav Rajaram, Abhinav Chinnam

This is our final project for the DSC 80 course at UC San Diego. 

## Introduction
The dataset we analyzed in this project consists of information related to major power outages in the United States from 2000 to 2016. We thought this dataset would be valuable to look into because, according to census.gov, 33.9 million households are impacted by power outages in the US every year. So, being able to predict and better understand power outages would no doubt have a positive real world impact. With this in mind, the question we used as the framework for our analysis was **What are the causes and effects of major power outages in the United States?**

The data we used was from the Purdue Engineering Research Data site, and a data dictionary from the article "A Multi-Hazard Approach to Assess Severe Weather-Induced Major Power Outage Risks in the U.S" was also provided. The data qualifies a "major" power outage as one that impacted at least 50,000 customers or had an unplanned firm load loss of at least 300 MW. The data incldues not only data points related to the power outage (duration, customers affected, etc.), but also details about regional electricity consumption patterns, economic characteristics, and climate information about the impacted areas.

ADDED POPULATION!!!!!

KEPT CUSTOMER COLUMNS.

The original dataset had 1534 rows. Here are the columns we thought to be relevant to our analysis:
 - **OBS**: Lists the observation entry number in the dataframe.
 - **Year**: Indicates the year when the outage event occurred.
 - **Month**: Indicates the month when the outage event occurred.
 - **U.S._STATE**: Indicates the state where the outage event occurred.
 - **CLIMATE.REGION**: Indicates the climate region where the outage event occurred, as specified by National Centers for Environmental Information.
 - **CLIMATE.CATEGORY**: "Warm", "Cold", or "Normal", represents the climate episodes corresponding to the year.
 - **CAUSE.CATEGORY**: The events that caused the major power outage.
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
 - **POPULATION**: Population of the U.S. state in a year

## Data Cleaning and Exploratory Data Analysis
### Data Cleaning

Here are the steps we took to clean the data for analysis:
1. We manually exported the data from a .xlsx to a .csv file and loaded it into python.
1. We changed all of the column names to lower case and replaced periods with underscores. For instance 'OUTAGE.DURATION' became 'outage_duration'. This made it more convenient to access the columns in the future.
1. We combined `OUTAGE.START.DATE` and `OUTAGE.START.TIME` into one pd.Timestamp column called `OUTAGE.START`. We did the same for `OUTAGE.RESTORATION.DATE` and `OUTAGE.RESTORATION.TIME`.
1. We dropped all of the columns not listed above, and set the index of the DataFrame to the `OBS` column.
1. We replaced values of 0 in the `CUSTOMERS.AFFECTED`, `OUTAGE.DURATION`, and `DEMAND.LOSS.MW` columns with NA. This is because we thought values of 0 in those columns indicated a missing value, as it does not make much sense for 0 customers to be affected by a major outage, the duration of an outage to be 0 minutes, or the total loss of demand to be 0 mega watts.

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

This heatmap, which is an interactive version of a pivot table, shows the number of customers affected by major power outages per climate region and year. As expected, areas of the United States prone to severe weather events (Southeast, Northeast, West) tend to have a larger amount of customers affected. We can also match up current events to this plot, such as Hurricane Sandy impacting the Northeast in 2012.

## Assessment of Missingness

### NMAR Analysis

One column in the dataset that we believe could be Not Missing at Random (NMAR) is `OUTAGE.DURATION`, meaning the missingness of the column depends on the values themselves. For instance, energy provider companies might avoid reporting the duration of extremely long power outages because they are concerned about backlash and criticism from the public. This would mean that higher values of `OUTAGE.DURATION` are more likely to be missing than lower ones, making the column not missing at random.

An additional piece of data that would help explain the missingness is the main energy provider for each power outage. If we had that information, we could try to find patterns between the missing values and energy providers, such as if one particular company consistently had missing duration values for major outages.

### Missingness Dependency

In this section, we found a column that the `DEMAND.LOSS.MW` column was Missing At Random (MAR) on, and a column where it was not. This was done with the larger goal of finding ways to address missingness in the `DEMAND.LOSS.MW` column, like probabilistic imputation. `DEMAND.LOSS.MW` is the column with the highest number of missing values — 901/1534 entries are NA.

We found that `DEMAND.LOSS.MW` ***IS*** missing on the `POPPCT.URBAN` column. In order to determine this, we conducted a permutation test with difference of group means as the test statistic. The "groups" in question are False for if the data is not missing, and True for if it is. We used the following pair of hypotheses for the test:

- **Null Hypothesis**: The distribution of the `POPPCT.URBAN` column when `DEMAND.LOSS.MW` is missing is the same as the distribution of the column when `DEMAND.LOSS.MW` is not missing.
- **Alternative Hypothesis**: The distribution of the `POPPCT.URBAN` column when `DEMAND.LOSS.MW` is missing is different than as the distribution of the column when `DEMAND.LOSS.MW` is not missing.

 We shuffled the `POPPCT.URBAN` column 1,000 times to generate a distribution of differences under the null hypothesis, and compared that to the observed difference of means.

<iframe
  src="assets/mar-test-dist.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

This plot shows that distribution. We can see that almost all of the observed difference was greater than the simulated differences, and the p-value was 0.001. Therefore, at a 1% significance level, we reject the null hypothesis that the distribution of the `POPPCT.URBAN` column when `DEMAND.LOSS.MW` is missing is the same as the distribution of the column when `DEMAND.LOSS.MW` is not missing. We conclude that the demand loss of a power outage is MAR, conditional on the urban population percentage of the state where the outage occurred.

We also found that `DEMAND.LOSS.MW` ***IS NOT*** missing on the `CLIMATE.CATEGORY` column. In order to determine this, we conducted a permutation test with total variance difference (TVD) as the test statistic, since `CLIMATE.CATEGORY` is categorical. We used the following pair of hypotheses for the test:

- **Null Hypothesis**: The distribution of the `CLIMATE.CATEGORY` column when `DEMAND.LOSS.MW` is missing is the same as the distribution of the column when `DEMAND.LOSS.MW` is not missing.
- **Alternative Hypothesis**: The distribution of the `CLIMATE.CATEGORY` column when `DEMAND.LOSS.MW` is missing is different than as the distribution of the column when `DEMAND.LOSS.MW` is not missing.

We shuffled `CLIMATE.CATEGORY` 1,000 times to generate a distribution of TVDs under the null hypothesis, and compared that to the observed TVD. The resulting p-value was 0.512, meaning we fail to reject the null hypothesis that the the distribution of the `CLIMATE.CATEGORY` column when `DEMAND.LOSS.MW` is missing is the same as the distribution of the column when `DEMAND.LOSS.MW` is not missing.

## Hypothesis Testing

In one of the graphs from the 2nd section, we saw that the number of customers impacted by power outages seemed to be different for each month. We wanted to explore this idea a little more, because being able to determine if month has an effect on power outages would be quite valuable in the real world. It would also help answer one of the main causes of major power outages in the US, as posed by our original analysis question. So, we conducted a hypothesis test with the following set of hypotheses:

- **Null Hypothesis**: Power outages are equally likely to occur across all months of the year.
- **Alternative Hypothesis**: Power outages are more likely to occur in certain months of the year than others.

We will use TVD as the test statistic here as well, since month is a categorical column. Our significance level is 1%.

We first calculated the observed proportion of customers affected by power outages per month. That distribution is visualized below, as well as the 'Null Proportion'. In this case, the null proportion is 1/12 for every month, as there are 12 months in the year and the null hypothesis states that power outages are equally likely to occur in all of them.

<iframe
  src="assets/hyp-test-dist.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

We calculated the observed TVD of these 12 groups, which was about 0.15. Then, we simulated 1,000 draws from the null distribution, calculating the TVD for each one. The resulting distribution and the observed TVD is shown below.

<iframe
  src="assets/hyp-test-dist-2.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

As we can see, none of the simulated TVDs under the null are as large as the observed one, meaning the p-value is 0.0. So, we reject the null hypothesis at a significance level of 1%, indicating that there is statistically significant evidence to suggest that differences in affected customer distributions between months of the year cannot be solely attributed to sampling variation.

## Framing a Prediction Problem

Our prediction problem will be to try and predict the number of customers impacted by a power outage. Our response variable is the `CUSTOMERS.AFFECTED` column, and because it is continuous, we will use regression as opposed to classification. We chose this column as our target variable because it provided a meaningful and easily understandable impact of a power outage. Companies and people alike will be able to learn how many customers are expected to be affected by an incoming power outages, and make the necessary accomodations. 

One important thing to consider is we only want to use information available *before* the outage in our analysis. While a feature like total demand lost would no doubt be indicative of the number of impacted customers, we would only know the actual data after the outage has occurred, making the model effectively useless. The information we would know at the time of prediction would include things like regional characteristics (climate, population density), general customer energy usage (electricity spending, electricity consumption), the expected cause of the outage (incoming storm or not), and the month/day/time of the prediction. 

In order to evaluate our model, we will use Root Mean Squared Error (RMSE). RMSE helps us understand how off the model was on average, and has an easily interpretable unit, which in this case is number of customers. We chose RMSE over metrics like Mean Absolute Error or the correlation coefficient between the predicted and observed values because we liked how RMSE made larger errors more impactful and also preserved the units of the original column.

## Baseline Model

Our baseline model was a multiple linear regression model with five features. Here is a breakdown of each of the features:
 - `POPULATION`: The population of the state of the outage, no transformations done.
 - `POPPCT.URBAN`: We binarized this column so it would have values of 1 if the urban population percentage was greater than 70%, 0 otherwise.
 - `CLIMATE.REGION`: The region of the country in the US, we used one hot encoding to make this a numerical feature (did not drop first).
 - `is_not_spring`: A binary column with value 1 if the month of the outage is not March, April, or May, 0 otherwise. We did this because spring had by far the least number of power outages among the seasons, so we thought it was an effective way to include the month of the outage as a feature.
 - `is_weather`: A binary column with value 1 if the cause of the outage was severe weather, 0 otherwise. We did this because severe weather was the only cause of an outage that we could expect beforehand, making it relevant for the model. Other cause categories like intentional attacks or system malfunctions would not be information we had at the time of prediction.

We used a 75/25 train/test split, and got promising but far from perfect results. Our mean absolute error (MAE) between the predicted and actual values was 139305, which means the model was on average able to predict the number of customers impacted by a power outage within around 140,000. We think that this is a solid baseline, considering the values in the original `CUSTOMERS.AFFECTED` column ranged from 30,000 to 3,000,000. However, we believe that we can sharpen the model by experimenting with more potential features and using tools like cross-validation to widen the scope of the training and testing data.

## Final Model

## Fairness Analysis
