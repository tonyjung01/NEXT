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

driver.get('https://finance.naver.com/marketindex/')

# chartbtn = driver.find_element(By.XPATH, '//*[@id="menu"]/ul/li[4]/a')
# chartbtn.click()

time.sleep(3)

today = datetime.now().strftime('%Y%m%d')
file = open(f'{today}_exchange.csv', mode="w", newline='')
writer = csv.writer(file)
writer.writerow(["화폐", "매매기준율", "미화환산율"])

infos = driver.find_elements(By.XPATH, '/html/body')
print(infos)
for i, info in enumerate(infos, start=1):
    
    money = info.find_element(By.XPATH, f"/html/body/div/table/tbody/tr[{i}]/td[1]/a").text
    traderate = info.find_element(By.XPATH, f"/html/body/div/table/tbody/tr[{i}]/td[2]").text
    usdrate = info.find_element(By.XPATH, f"/html/body/div/table/tbody/tr[{i}]/td[7]").text

    writer.writerow([ money, traderate, usdrate])

file.close()

# for i, info in range(1,30):
    # money = info.find_element(By.XPATH, f'/html/body/div/table/tbody/tr[{i}]/td[1]/a').text
    # traderate = info.find_element(By.XPATH, f'/html/body/div/table/tbody/tr[{i}]/td[2]').text
    # usdrate = info.find_element(By.XPATH, f'/html/body/div/table/tbody/tr[{i}]/td[7]').text

#     print([money, traderate, usdrate])
