import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from impyute import imputation
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split

TIME_STEPS = 1440 
TOTAL_MINUTES = 1051200

print('Loading data...')
data = pd.read_csv('bitstamp.csv')
price_history = data['Open'][-TOTAL_MINUTES:].values

print('Imputing data...')
imputed_price_history = imputation.ts.locf(price_history.reshape(1, -1))

print('Scaling data...')
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(imputed_price_history.reshape(-1, 1)) 

print('Creating feature set and labels...')
features_set = []
labels = []
for i in range(TIME_STEPS, len(scaled_data)):
    features_set.append(scaled_data[i-TIME_STEPS:i, 0])
    labels.append(scaled_data[i, 0])
features_set, labels = np.array(features_set), np.array(labels) 
features_set = features_set[:,:,np.newaxis]

print('Splitting feature set and labels...')
X_train, X_test, y_train, y_test = train_test_split(features_set, labels, test_size=.2)

print('Building model...')
regressor = Sequential()
regressor.add(LSTM(units=200, return_sequences=True, input_shape=(X_train.shape[1], 1)))
regressor.add(Dropout(0.2))
regressor.add(LSTM(units=200, return_sequences=True))
regressor.add(Dropout(0.2))
regressor.add(LSTM(units=200, return_sequences=True))
regressor.add(Dropout(0.2))
regressor.add(LSTM(units=200))
regressor.add(Dropout(0.2))
regressor.add(Dense(units=1))
regressor.compile(optimizer='adam', loss='mean_squared_error')

print('Training...')
history = regressor.fit(X_train, y_train, epochs = 100, validation_split=.2, batch_size = 32)

print('Plotting history...')
loss = history.history['loss']
val_loss = history.history['val_loss']
epochs = range(1, len(loss) + 1)
plt.plot(epochs, loss, 'bo', label='Training loss')
plt.plot(epochs, val_loss, 'b-', label='Validation loss')
plt.title('Training History')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.savefig('history.png')

print('Making and plotting predictions')
predictions = model.predict(X_test) 
predictions = scaler.inverse_transform(predictions) 
plt.figure(figsize=(10,6))
plt.plot(y_test, color='blue', label='Actual Bitcoin Price')
plt.plot(predictions, color='red', label='Predicted Bitcoin Price')
plt.title('Bitcoin Price Prediction')
plt.xlabel('Date')
plt.ylabel('Bitcoin Price')
plt.legend()
plt.savefig('Predictions')


