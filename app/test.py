from selenium import webdriver
#import time

#browser = webdriver.Firefox()
driver = webdriver.Chrome()
driver1 = webdriver.Chrome()
driver2 = webdriver.Chrome()


driver.get('localhost:4200')
driver1.get('http://localhost:4200/')
driver2.get('localhost:4200')


inputElement = driver.find_element_by_id("playerName")
inputElement.send_keys("player")
inputElement.submit()

inputElement1 = driver1.find_element_by_id("playerName")
inputElement1.send_keys("player1")
inputElement1.submit()

inputElement2 = driver2.find_element_by_id("playerName")
inputElement2.send_keys("player2")
inputElement2.submit()

mytext = driver.find_elements_by_xpath("(//*[contains(text(), 'player1')] | //*[@value='player'])")
mytext[0].click()
# time.sleep(5)


driver1.switch_to.alert.accept()
