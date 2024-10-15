const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE_URL = "http://localhost:5173/";
const EMAIL = "psychologist@gmail.com";
const PASSWORD = "1234";
const BLOG_TITLE = "MENTAL HEALTH IS THE KEY OF EVERYTHING";
const BLOG_DESCRIPTION = "Mental and physical health are equally important components of overall health. Mental illness, especially depression, increases the risk for many types of physical health problems, particularly long-lasting conditions like stroke, type 2 diabetes, and heart disease. Similarly, the presence of chronic conditions can increase the risk factors and exacerbate the symptoms of mental illnesses like Depression or Bipolar Disorder.";

async function deleteBlog() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.manage().window().maximize();
    await driver.get(BASE_URL);

   
    await driver.findElement(By.xpath("//a[@class='nav-link dropdown-toggle fs-5']")).click();
    await driver.findElement(By.xpath("//a[@href='/login']")).click();
    
    
    await driver.findElement(By.xpath("//input[@placeholder='Enter Email' and @class='form-control']")).clear();
    await driver.findElement(By.xpath("//input[@placeholder='Enter Email' and @class='form-control']")).sendKeys(EMAIL, Key.ENTER);

    
    await driver.findElement(By.xpath("//input[@placeholder='Enter Password' and @class='form-control']")).clear();
    await driver.findElement(By.xpath("//input[@placeholder='Enter Password' and @class='form-control']")).sendKeys(PASSWORD);
    await driver.findElement(By.xpath("//button[@class='btn btn-primary']")).click();

    await driver.sleep(5000); 
    await driver.get(BASE_URL + "myblogs");

    await driver.findElement(By.xpath("//input[@placeholder='Type your title here...']")).clear();
    await driver.findElement(By.xpath("//input[@placeholder='Type your title here...']")).sendKeys(BLOG_TITLE);
    
    await driver.findElement(By.xpath("//textarea[@placeholder='Provide description here...']")).clear();
    await driver.findElement(By.xpath("//textarea[@placeholder='Provide description here...']")).sendKeys(BLOG_DESCRIPTION);
    
    await driver.sleep(5000); 
    await driver.findElement(By.xpath("//button[contains(@class,'btn btn-primary') and contains(text(),'Post')]")).click();
    
    await driver.sleep(5000);
    await driver.findElement(By.xpath("//button[contains(@class,'btn btn-danger') and contains(text(),'Delete')]")).click();
    await driver.findElement(By.xpath("//button[contains(@class,'swal2-confirm swal2-styled swal2-default-outline') and contains(text(),'Yes, delete it!')]")).click();
    
    await driver.sleep(5000); 

  } catch (error) {
    console.error("An error occurred during the test run: ", error);
  } finally {
    await driver.quit();
  }
}

deleteBlog();
