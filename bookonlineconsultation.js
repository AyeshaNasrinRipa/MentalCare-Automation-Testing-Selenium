const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function bookOnlineConsultation() {
  
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
    
        await driver.manage().window().maximize();

        
        await driver.get("http://localhost:5173/");

        
        await driver.findElement(By.xpath("//a[@class='nav-link dropdown-toggle fs-5']")).click();
        await driver.findElement(By.xpath("//a[@href='/login']")).click();

      
        await driver.findElement(By.xpath("//input[@placeholder='Enter Email' and @class='form-control']"))
            .sendKeys("psychologist@gmail.com", Key.ENTER);

        
        await driver.findElement(By.xpath("//input[@placeholder='Enter Password' and @class='form-control']"))
            .sendKeys("1234");

        
        await driver.findElement(By.xpath("//button[@class='btn btn-primary']")).click();
        await driver.sleep(5000); 

        await driver.findElement(By.xpath('//input[@class="form-control" and @placeholder="Search by name or location"]'))
            .sendKeys("Noakhali", Key.ENTER);
        await driver.sleep(5000); 
        await driver.sleep(5000);
        await driver.findElement(By.xpath("//a[contains(@class,'btn btn-primary w-100') and contains(text(),'Online Consultation')]")).sendKeys(Key.ENTER);

        await driver.sleep(5000);
        await driver.findElement(By.xpath("//button[contains(@class,'_bookNowButton_mqjcs_45') and contains(text(),'Book Now')]")).sendKeys(Key.ENTER);
        
        await driver.sleep(5000);
        await driver.findElement(By.xpath("//button[contains(@class,'swal2-confirm swal2-styled swal2-default-outline') and contains(text(),'Yes, Pay!')]")).sendKeys(Key.ENTER);
        await driver.sleep(5000);

    } catch (error) {
        console.error("An error occurred during the online consultation booking process: ", error);
    } finally {
        await driver.quit();
    }
}
bookOnlineConsultation();
