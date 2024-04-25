import requests

from newspaper import Article

from app import sumbasic

NEWSAPI_BASE_URL = 'https://newsapi.org/v2/'

def get_news_urls(query):
    headers = {
        'X-API-Key': '417ff57724934af9b1dcbf1cb5f86caa'
    }
    payload = {
        'q': query,
        'pageSize': '5',
        'language': 'en',
    }
    result = requests.get(NEWSAPI_BASE_URL + 'everything', headers=headers, params=payload).json()
    return [article['url'] for article in result['articles']]

def get_article_text(url):
    try:
        article = Article(url)
        article.download()
        article.parse()
        text = article.text
    except:
        print('Failed to fetch article from', url)
        text = ''
    return text

def get_summary(query):
    urls = get_news_urls(query)
    lines = [get_article_text(url) for url in urls]
    print('Summarizing..')
    summary = sumbasic.orig(lines, 300)
    print('Summarization Complete')
    return summary, urls
