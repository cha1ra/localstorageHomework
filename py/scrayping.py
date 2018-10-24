# -*- coding: utf-8 -*- 

import urllib.request
from urllib.parse import parse_qsl
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from requests import get as GET

import sys
 
# 引数を取得
args = sys.argv
 
argument0 = args[0]
argument1 = args[1]
argument2 = args[2]


if argument2 == 'search':
    # 検索結果をスクレイピング
    html = GET("https://www.google.co.jp/search?q=" + argument1).text
    bs = BeautifulSoup(html, 'lxml')

    for el in bs.select("h3.r a"):
        title = el.get_text()
        url = dict(parse_qsl(urlparse(el.get("href")).query))["q"]
        print('<p><a href="' + url + '">' + title + '</a></p>')
elif argument2 == 'content':
    # 内容を表示
    url = argument1
    data = urllib.request.urlopen(url).read()
    html = data.decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    body = soup.html.body
    print(body)





# PHP to Python
# https://qiita.com/minamoto_user/items/f90ceb2f88994639ca95
# 文字コードの指定
# https://teratail.com/questions/108167
# Google 検索結果
# https://teratail.com/questions/122535