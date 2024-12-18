
<div id="animated-title"></div>
<link rel="stylesheet" href="assets/styles.css">

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
 - **RES.CUSTOMERS**: Annual number of customers served in the residential electricity sector of the U.S. state
 - **POPPCT_URBAN**: Percentage of the total population of the U.S. state represented by the urban population.
 - **POPDEN_URBAN**: Population density of the urban areas.
 - **POPULATION**: Population of the U.S. state in a year
 - **TOTAL.CUSTOMERS**: Annual number of total customers served in the U.S. state

## Data Cleaning and Exploratory Data Analysis
### Data Cleaning

Here are the steps we took to clean the data for analysis:
1. We manually exported the data from a .xlsx to a .csv file and loaded it into python.
1. We changed all of the column names to lower case and replaced periods with underscores. For instance, 'OUTAGE.DURATION' became 'outage_duration'. This made it more convenient to access the columns in the future.
1. We combined `OUTAGE.START.DATE` and `OUTAGE.START.TIME` into one pd.Timestamp column called `OUTAGE.START`. We did the same for `OUTAGE.RESTORATION.DATE` and `OUTAGE.RESTORATION.TIME`.
1. We dropped all of the columns not listed above, and set the index of the DataFrame to the `OBS` column.
1. We replaced values of 0 in the `CUSTOMERS.AFFECTED`, `OUTAGE.DURATION`, and `DEMAND.LOSS.MW` columns with NA. This is because we thought values of 0 in those columns indicated a missing value, as it does not make much sense for 0 customers to be affected by a major outage, the duration of an outage to be 0 minutes, or the total loss of demand to be 0 mega watts.

This is a snapshot of what our DataFrame looked like after these cleaning steps. For the sake of appearance, the `RES.PRICE`, `RES.SALES`, `RES.PERCENT`, `RES.CUST.PERCENT`, `RES.CUSTOMERS`, `POPPCT_URBAN`, `POPDEN_URBAN`, `POPULATION`, and `TOTAL.CUSTOMERS` columns are not included in the table below.

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

This table shows the state and year with the 10 highest average power outage durations. It is a good sanity check of the data, as we can try to match up the results of this aggregation with real life events. For example, Hurricane Katrina would have impacted millions of Floridians in 2005, while the Northeast blackout of 2003 likely caused the large outage duration in New York state in 2003.

<iframe
  src="assets/climate-heatmap.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

This heatmap, which is an interactive version of a pivot table, shows the number of customers affected by major power outages per climate region and year. As expected, areas of the United States prone to severe weather events (Southeast, Northeast, West) tend to have a larger amount of customers affected. We can also match up current events to this plot, such as Hurricane Sandy impacting the Northeast in 2012.

## Assessment of Missingness

### NMAR Analysis

One column in the dataset that we believe could be Not Missing at Random (NMAR) is `OUTAGE.DURATION`, meaning the missingness of the column depends on the values themselves. Energy provider companies might avoid reporting the duration of extremely long power outages because they are concerned about backlash and criticism from the public. This would mean that higher values of `OUTAGE.DURATION` are more likely to be missing than lower ones, making the column not missing at random.

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

We shuffled `CLIMATE.CATEGORY` 1,000 times to generate a distribution of TVDs under the null hypothesis, and compared that to the observed TVD. The resulting p-value was 0.508, meaning we fail to reject the null hypothesis that the the distribution of the `CLIMATE.CATEGORY` column when `DEMAND.LOSS.MW` is missing is the same as the distribution of the column when `DEMAND.LOSS.MW` is not missing.

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

Our prediction problem will be to try and predict the number of customers impacted by a power outage. Our response variable is the `CUSTOMERS.AFFECTED` column, and because it is continuous, we will use regression as opposed to classification. We chose this column as our target variable because it provided a meaningful and easily understandable impact of a power outage. Companies and people alike will be able to learn how many customers are expected to be affected by an incoming power outage, and make the necessary accomodations. 

One important thing to consider is we only want to use information available *before* the outage in our analysis. While a feature like total demand lost would no doubt be indicative of the number of impacted customers, we would only know the actual data after the outage has occurred, making the model effectively useless. The information we would know at the time of prediction would include things like regional characteristics (climate, population density), general customer energy usage (electricity spending, electricity consumption), and the month/day/time of the prediction. 

In order to evaluate our model, we will use Mean Absolute Error (MAE). MAE helps us understand how off the model was on average, and has an easily interpretable unit, which in this case is number of customers. We chose MAE over metrics like Root Mean Squared Error (RMSE) or the correlation coefficient between the predicted and observed values because we liked how MAE preserved the original units while also not disproportionately weighting larger errors.

## Baseline Model

Our baseline model was a multiple linear regression model with two features. Here is a breakdown of each feature:
 - `POPPCT.URBAN`: The state's urban population percentage. This was originally a quantiative variable. For simplicity, we made this an ordinal feature by binarizing the column so it would have values of 1 if the urban population percentage was greater than 70%, 0 otherwise.
 - `CLIMATE.REGION`: The region of the state in the US. This was originally a nominal variable, and we used one hot encoding to turn it into a quantiative feature.

Here is a look at what our initial design matrix looked like (a few of the columns were dropped for the sake of appearance):

|   poppct_urban_binarized |   climate_region_Central |   climate_region_East North Central |   climate_region_Northeast |   climate_region_Northwest |   climate_region_South |
|-------------------------:|-------------------------:|------------------------------------:|---------------------------:|---------------------------:|-----------------------:|
|                        1 |                        1 |                                   0 |                          0 |                          0 |                      0 |
|                        1 |                        0 |                                   0 |                          0 |                          0 |                      1 |
|                        1 |                        0 |                                   0 |                          0 |                          0 |                      0 |
|                        0 |                        1 |                                   0 |                          0 |                          0 |                      0 |
|                        1 |                        0 |                                   0 |                          0 |                          0 |                      0 |

We used a 75/25 train/test split on the data, and got promising but far from perfect results. Our mean absolute error (MAE) between the predicted and actual values was 148896, which means the model was on average able to predict the number of customers impacted by a power outage within around 150,000. We think that this is a solid baseline, considering the values in the original `CUSTOMERS.AFFECTED` column ranged from 30,000 to 3,000,000. However, we believe that we can sharpen the model by experimenting with more potential features and using tools like cross-validation to avoid over/under fitting and make better use of the training and testing data.

## Final Model

For our final model, we added three features to the baseline. They are as follows:
 - `CAUSE.CATEGORY`: We chose to include the cause category of the power outage because we thought it would help the model determine severity of outages. However, we had to be careful, as several of the causes would not be valid because we would only know about them after the outage occurred (for example, an intentional attack). So, we used a FunctionTransformer to effectively binarize the column so it had a value of 1 if the cause category was 'severe weather', as we would likely know about an incoming storm beforehand. The remaining values were 0.
 - `MONTH`: We wanted to include month as a feature because our hypothesis test showed that there is evidence to suggest that month had an impact on customers affected. Specifically, we noticed that the spring months (April, May, June) had by far the lowest amount of customers affected. So, we again used a FunctionTransformer to binarize the `MONTH` column, such that fall, winter, and summer months had a value of 1 while spring months had a value of 0.
 - `POPULATION`: We thought populate would be effective as a feature because it gave a better sense of the total number of customers in the area of the outage. We did not perform any feature engineering on this column as it was already quantitative. States with higher populations likely have a greater chance of having more customers affected since there are more total customers in general, making this feature valuable.

We chose to use a Random Forest Regressor for the final model as opposed to a Linear Regression. We thought that the Random Forest model would be better because it is better at handling nonlinear relationships between the features and target variable. Additionally, the Random Forest would be more robust towards outliers, which certainly exist within our data considering the wide range of the target column. The Random Forest Regressor would also be better at avoiding overfitting to the training data, and handles potential multicollinerarity between features.

Now that we are using a Random Forest model, we could configure some hyperparameters to even better optimize the predictions and reduce overfitting. We chose the following two hyperparameters:
 - `n_estimators`: The number of decision trees that contribute to the forest's prediction. We used five potential estimators: [250, 300, 350, 400, 450]
 - `max_depth`: The maximum depth of each decision tree. We used the following seven values: [1, 2, 3, 4, 5, 8, 10]. We did not want the trees to be too deep so as to avoid overfitting to the training set.

We used 5-fold cross-validation to determine the optimal hyperparameters using the GridSearchCV() method in sklearn. The best hyperparameters were 300 estimators and a max tree depth of 5.

Our final model improved over the baseline model, with a new mean absolute error of 138113. This means the new model was better at predicting customers affected by over 10,000 customers. Here is a histogram that plots the actual customers affected and the predicted values.

<iframe
  src="assets/model-plot.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

As we can see, the model is fairly accurate at predicting customers affected between 0 and 500,000, but loses accuracy as the number of affected customers gets higher. In fact, if we had filtered the data so that it dropped the 19 rows where the observed customers affected was greater than 1,000,000, the MAE improves to 97,061. Overall, we think that the final model performs well for the majority of outages and provides valuable insights, although further work can definitely be done to handle extreme cases more effectively.

## Fairness Analysis

We wanted to assess if our model's predictions were "fair" across different groups. That is, for two groups of the data, would the model's predictions have a similar amount of error? 

The two groups we tested were the following:
 - **Group 1**: outages that were caused by severe weather.
 - **Group 2**: outages that were not caused by severe weather.

We used the following set of hypotheses for the permutation test:
- **Null Hypothesis**: The distribution of the model's prediction errors is the same for outages caused by severe weather and outages not caused by severe weather. 
- **Alternative Hypothesis**: The distribution of the model's prediction errors differs between outages caused by severe weather and outages not caused by severe weather.

Our test statistic will be the absolute difference of root mean squared errors between each group. Larger values of this test statistic indicate that the model is unfair, as the predictions would be quite different for each group. We use absolute difference because the test is two sided.

We shuffled the `is_weather` column 1,000 times to generate a distribution of differences under the null hypothesis, and compared that to the observed absolute difference of RMSEs. 

<iframe
  src="assets/fairness-plot.html"
  width="1000"
  height="600"
  frameborder="0"
></iframe>

Our p-value was 0.6. As shown in the plot, this means that there is a 60.0% chance of seeing an absolute difference of RMSE as extreme or more extreme than our observed value. So, we fail to reject the null hypothesis at a 1% significance level, meaning there is no evidence of unfairness in the model's prediction error between the two groups.

<script src="assets/typing-effect.js"></script>
