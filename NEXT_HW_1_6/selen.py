from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
from datetime import datetime
import csv

chromedriver_path = '/Users/tonyjung01/Desktop/NEXT/HW/NEXT_HW_6/chromedriver'

user_data_dir = '/Users/tonyjung01/Desktop/NEXT/HW/NEXT_HW_6/cash'

chrome_options = Options()
chrome_options.add_argument(f"user-data-dir={user_data_dir}")  
service = Service(executable_path=chromedriver_path)

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://www.melon.com/genre/song_list.htm?gnrCode=GN0100')

chartbtn = driver.find_element(By.XPATH, '//*[@id="conts"]/div[4]/ul/li[2]/a')
chartbtn.click()
time.sleep(3)

today = datetime.now().strftime('%Y%m%d')
file = open(f'{today}_melon_album.csv', mode="w", newline='')
writer = csv.writer(file)
writer.writerow(["index","album", "singer", "date"])

infos = driver.find_elements(By.CSS_SELECTOR, '#frm > div > ul > li')


for i, info in enumerate(infos, start=1):
    index = i
    album = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[5]/form/div/ul/li[{i}]/div[2]/div[1]/a').text
    singer = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[5]/form/div/ul/li[{i}]/div[2]/div[1]/span[2]/a').text
    date = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[5]/form/div/ul/li[{i}]/div[2]/div[2]/span[1]').text
    writer.writerow([index, album, singer, date])

file.close()