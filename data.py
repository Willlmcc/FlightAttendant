import pandas as pd

data=pd.read_csv("LabelledEmailsCapstone.csv")
data['Mail']=data['Mail'].astype(str)
data['Review'] = data['Review'].replace(False, 'no meeting required for the following mail :')
data['Review'] = data['Review'].replace(True, 'meeting required for the following mail :')


data['Mail'] = data.apply(lambda row: f"{row['Review']} {row['Mail']}", axis=1)
data.drop(['Review'], axis=1, inplace=True)
#print(data.head())

data.to_csv("ModifiedEmails.csv", index=False)

