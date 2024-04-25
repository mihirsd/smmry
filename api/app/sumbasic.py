import os, sys, itertools, nltk

from functools import reduce
from os.path import dirname, join, realpath
from operator import itemgetter

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize, sent_tokenize

nltk.data.path = [join(dirname(dirname(realpath(__file__))), 'nltk_data')]

word_net_lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

nltk.data.path.append('./nltk_data/')

def lemmatize(tokens):
    return [word_net_lemmatizer.lemmatize(t) for t in tokens]

def remove_stopwords(tokens):
    return [t for t in tokens if t.lower() not in stop_words]

def lowercase(tokens):
    return [t.lower() for t in tokens]

def preprocess(tokens):
    return lemmatize(remove_stopwords(lowercase(tokens)))

def flatten(nlist):
    return list(itertools.chain(*nlist))

def to_sents(lines):
    return flatten([sent_tokenize(l) for l in lines])

def to_tokens(sents):
    return flatten([word_tokenize(s) for s in sents])

def handle_unicode(lines):
    return [l.decode("utf-8") for l in lines]

def compact(lines):
    return [x for x in lines if x and not x.isspace()]

def strip(lines):
    return [x.strip() for x in lines]

def leading(lines, word_limit):
    sents = to_sents(lines)
    summary = ""
    while len(word_tokenize(summary)) < word_limit:
        summary += " " + sents.pop(0)

def orig(lines, word_limit):
    return sum_basic(lines, word_limit, True)

def smpl(lines, word_limit):
    return sum_basic(lines, word_limit, False)

def sum_basic(lines, word_limit, update_non_redundancy=True):
    
    def wt(sents, dist):
        def _wt_sent(sent):
            tokens = preprocess(word_tokenize(sent))
            return reduce(lambda x,y: x+y, [dist.get(x) for x in tokens]) / len(tokens)
        return [_wt_sent(s) for s in sents]
    
    def prob_dist(tokens):
        n = len(tokens)
        distinct_words = set(tokens)
        probs = [tokens.count(w)/n for w in distinct_words]
        return dict(list(zip(distinct_words, probs)))

    sents = to_sents(lines)
    tokens = to_tokens(sents)
    tokens = preprocess(tokens)

    pd = prob_dist(tokens)

    summary = ""

    while len(word_tokenize(summary)) < word_limit:
        weights = wt(sents, pd)
        highest_weight_sentence = max(list(zip(sents, weights)), key=itemgetter(1))[0]
        summary += " " + highest_weight_sentence
        if update_non_redundancy:
            for token in preprocess(word_tokenize(highest_weight_sentence)):
                pd[token] = pd[token] * pd[token]
        else:
            sents.remove(highest_weight_sentence)
    
    return summary
