#!/usr/bin/python
from selenium import webdriver
#import time

driver = webdriver.Chrome()
driver1 = webdriver.Chrome()

driver.get('localhost:4200')
driver1.get('http://localhost:4200/')


inputElement = driver.find_element_by_id("playerName")
inputElement.send_keys("player")
inputElement.submit()

inputElement1 = driver1.find_element_by_id("playerName")
inputElement1.send_keys("player1")
inputElement1.submit()

driver2 = webdriver.Chrome()
driver2.get('localhost:4200')
inputElement2 = driver2.find_element_by_id("playerName")
inputElement2.send_keys("player2")
inputElement2.submit()

driver3 = webdriver.Chrome()
driver3.get('localhost:4200')
inputElement3 = driver3.find_element_by_id("playerName")
inputElement3.send_keys("player3")
inputElement3.submit()

driver4 = webdriver.Chrome()
driver4.get('localhost:4200')
inputElement4 = driver4.find_element_by_id("playerName")
inputElement4.send_keys("player4")
inputElement4.submit()

mytext = driver.find_elements_by_xpath("(//*[contains(text(), 'player1')] | //*[@value='player'])")
mytext[0].click()
# time.sleep(5)


driver1.switch_to.alert.accept()
