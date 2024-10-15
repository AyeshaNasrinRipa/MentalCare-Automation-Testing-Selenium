const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE_URL = "http://localhost:5173/";
const EMAIL = "psychologist@gmail.com";
const PASSWORD = "1234";

async function psychologistLogin() {
   
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
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
        //await driver.findElement(By.xpath("//button[@class='btn btn-primary']")).click();
        await driver.findElement(By.css("button[class='btn btn-primary']")).click();

        
        await driver.wait(until.urlIs(BASE_URL + "home"), 5000);

       
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, BASE_URL + "home", "Login URL did not match expected URL.");

        
        await driver.sleep(2000); 

    } catch (error) {
        console.error("An error occurred during the login process: ", error);
    } finally {
        await driver.quit();
    }
}

psychologistLogin();
