const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE_URL = "http://localhost:5173/";
const EMAIL = "psychologist@gmail.com";
const PASSWORD = "1234";

async function viewPsychologistProfile() {
  
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

 
        await driver.manage().window().maximize();
        await driver.get(BASE_URL);
   
        await driver.findElement(By.xpath("//a[@class='nav-link dropdown-toggle fs-5']")).click();
        await driver.findElement(By.xpath("//a[@href='/login']")).click();

    
        const emailInput = await driver.findElement(By.xpath("//input[@placeholder='Enter Email' and @class='form-control']"));
        await emailInput.clear();
        await emailInput.sendKeys(EMAIL, Key.ENTER);

        
        const passwordInput = await driver.findElement(By.xpath("//input[@placeholder='Enter Password' and @class='form-control']"));
        await passwordInput.clear();
        await passwordInput.sendKeys(PASSWORD);
        await driver.findElement(By.xpath("//button[@class='btn btn-primary']")).click();

        
        await driver.wait(until.urlIs(BASE_URL + "home"), 5000);

     
        //const searchInput = await driver.findElement(By.xpath(`//input[@class="form-control" and @placeholder="Search by name or location"]`));
        const searchInput = await driver.findElement(By.css("input[class='form-control']"));
        await searchInput.click();
        await searchInput.sendKeys("Noakhali");
        await searchInput.sendKeys(Key.ENTER);

        
        await driver.findElement(By.xpath('//input[@class="form-control" and @placeholder="Search by name or location"]')).sendKeys(Key.ENTER);

        await driver.sleep(5000);
        await driver.findElement(By.xpath("//a[contains(@class,'text-primary text-decoration-underline') and contains(text(),'View Profile')]")).sendKeys(Key.ENTER);
        await driver.sleep(10000);
        await driver.quit();



}

viewPsychologistProfile();
