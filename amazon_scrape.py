from bs4 import BeautifulSoup
import smtplib
import time
import datetime
import requests
import csv
import pandas as pd

# using datetime
today = datetime.date.today()


# connecting to the website

URL = 'https://www.amazon.com/Ripple-Junction-Shippuden-Ichiraku-T-Shirt/dp/B0B2QQ9TVJ/ref=sr_1_9?crid=3V1L5IXXUSLPW&keywords=naruto%2Btshirt&qid=1697784612&sprefix=naruto%2Btshir%2Caps%2C244&sr=8-9'

# data from https://httpbin.org/get
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
}

page = requests.get(URL, headers=headers)

soup1 = BeautifulSoup(page.content, 'html.parser')

# simple website formatting
soup2 = BeautifulSoup(soup1.prettify(), 'html.parser')

# result:Ripple Junction Naruto Shippuden Ramen Ichiraku T-Shirt(LG, Black)
title = soup2.find(id="productTitle")
if title is not None:
    title = title.get_text().strip()
else:
    title = "Title not found"


price_element = soup2.find(class_="a-price-whole")
if price_element is not None:
    price = price_element.get_text().strip()
else:
    price = "Price not found"

price = 25.99


# hardcoding data in case web scrapping isnt working due to server problems
if price == "Price not found":
    price = 25.99


if title == "Title not found":
    title = 'Ripple Junction Naruto Shippuden Ramen Ichiraku T-Shirt(LG, Black'

print(title, price)

# making a csv
header = ['Title', 'Price', 'Date']
data = [title, price, today]
# populating the csv
# using open + 'w' to create a csv. using newline='' to ensure correct line endings. encoding='UTF-8'  to handle special characters properly.
with open('AmazonWS.csv', 'w', newline='', encoding='UTF8') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    writer.writerow(data)

# reading the file I created
df = pd.read_csv(
    r"C:\Users\USER\Desktop\python DA\Amazon Web Scraping\AmazonWS.csv")

# appending data to the csv
with open('AmazonWS.csv', 'a+', newline='', encoding='UTF8') as f:
    writer = csv.writer(f)
    writer.writerow(data)


def check_price():
    URL = 'https://www.amazon.com/Ripple-Junction-Shippuden-Ichiraku-T-Shirt/dp/B0B2QQ9TVJ/ref=sr_1_9?crid=3V1L5IXXUSLPW&keywords=naruto%2Btshirt&qid=1697784612&sprefix=naruto%2Btshir%2Caps%2C244&sr=8-9'
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"}
    page = requests.get(URL, headers=headers)
    soup1 = BeautifulSoup(page.content, 'html.parser')
    soup2 = BeautifulSoup(soup1.prettify(), 'html.parser')
    title = soup2.find(id="productTitle")
    if title is not None:
        title = title.get_text().strip()
    else:
        title = "Title not found"
    price_element = soup2.find(class_="a-price-whole")
    if price_element is not None:
        price = price_element.get_text().strip()
    else:
        price = "Price not found"
        if price == "Price not found":
            price = 25.99
        if title == "Title not found":
            title = 'Ripple Junction Naruto Shippuden Ramen Ichiraku T-Shirt(LG, Black'
        today = datetime.date.today()
        header = ['Title', 'Price', 'Date']
        data = [title, price, today]
        with open('AmazonWS.csv', 'w', newline='', encoding='UTF8') as f:
            writer = csv.writer(f)
        writer.writerow(header)
        writer.writerow(data)
        with open('AmazonWS.csv', 'a+', newline='', encoding='UTF8') as f:
            writer = csv.writer(f)
            writer.writerow(data)
            while (True):
                check_price(price)
                time.sleep(86400)


def send_mail():
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login('h.murawski9@gmail.com', 'xxxxxxxxx')
    subject = 'The shirt you want is below 15$! Get it now!'
    body = 'Hubert, this is the moment you have been waiting for! Pick up the shirt of your dreams!'
    msg = f"Subject: {subject}\n\n{body}"
    server.sendmail(
        'h.murawski9@gmail.com',
        msg
    )


if (price < 15):
    send_mail()