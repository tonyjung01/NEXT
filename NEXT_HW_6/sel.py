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

driver.get('https://www.instagram.com/tonyjung01/followers/')

time.sleep(5)

# before_height = -1
# now_height = -2

# while before_height != now_height:
#         before_height = now_height
#         now_height = driver.execute_script("return document.querySelector('._aano').scrollTop;")

#         driver.execute_script("document.querySelector('._aano').scrollTo(0, document.querySelector('._aano').scrollHeight)")
#         time.sleep(3)

# for i in range(1, 500):
#     insta_id = driver.find_element(By.XPATH, f'/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3]/div[1]/div/div[{i}]/div/div/div/div[2]/div/div/div/div/div/a/div/div/span').text
#     print(f"{i} : {insta_id}")

today = datetime.now().strftime('%Y%m%d')
file = open(f'{today}_instafollowers.csv', mode="w", newline='')
writer = csv.writer(file)
writer.writerow(["index", "insta_id"])


infos = driver.find_elements(By.XPATH, '/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3]/div[1]')
print(infos)
for i, info in enumerate(infos, start=1):
    index = i
    insta_id = info.find_element(By.XPATH, f'/html/body/div[6]/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3]/div[1]/div/div[{i}]/div/div/div/div[2]/div/div/div/div/div/a/div/div/span').text
    writer.writerow([index, insta_id])

file.close()