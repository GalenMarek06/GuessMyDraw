from selenium import webdriver
import time

#browser = webdriver.Firefox()
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

mytext = driver.find_elements_by_xpath("(//*[contains(text(), 'player1')] | //*[@value='player'])")
mytext[0].click()
#time.sleep()


driver1.switch_to.alert.accept()
