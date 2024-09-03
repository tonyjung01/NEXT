import requests
from bs4 import BeautifulSoup
from datetime import datetime
from openpyxl import Workbook

url = "https://news.naver.com/main/ranking/popularDay.naver?mid=etc&sid1=111"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}

response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

target_element = soup.select_one("#wrap > div.rankingnews._popularWelBase._persist > div.rankingnews_box_wrap._popularRanking > div > div:nth-child(5) > ul")

if target_element:
    print(target_element)
    titles = soup.find_all(class_="list_title nclicks('RBP.rnknws')")
    titles=list(map(lambda x: x.text.strip(), titles))
    print(titles)

    times = soup.select('span.list_time')
    times = list(map(lambda x: x.text, times))
    print (times)

    wb = Workbook()
    ws = wb.active

    ws.append(["순위","제목","시간"])

    for i, (title,time) in enumerate(zip(titles, times), start=1):
        ws.append([i, title, time])

    today = datetime.now().strftime("%Y%m%d")

    filename = f'news_ranking_{today}.xlsx'
    wb.save(filename)
    print(f"엑셀 파일 저장 완료: {filename}")
else:
    print("Element not found.")
