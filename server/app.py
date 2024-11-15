import pickle
import nltk
import re
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from nltk.stem.porter import PorterStemmer


with open('./server/final_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('./server/vector.pkl', 'rb') as f:
    vectorizer = pickle.load(f)



nltk.download('stopwords')
stop_words = set(stopwords.words('english'))


def stemming(content):
    try:
        port_stem = PorterStemmer()  # Instantiate inside the function
        stemmed_content = re.sub('[^a-zA-Z]', ' ', content).lower()
        return ' '.join(port_stem.stem(word) for word in stemmed_content.split() if word not in stop_words)
    except Exception as e:
        print(f"Error processing content: {content}. Error: {e}")
        return ""  # Return an empty string on error


def makePrediction (content):
  comment = stemming(content)
  comment = vectorizer.transform([comment])
  pred = model.predict(comment)

  if pred[0] == 0:
    predict = 'Negative'
  else:
    predict = 'Positive'
  return predict
 
makePrediction("Have a good day")