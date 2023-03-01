import io.qameta.allure.Description;
import io.qameta.allure.Owner;
import io.qameta.allure.Step;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static io.qameta.allure.Allure.step;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Owner("Alex ISS Art QA")
@DisplayName("Positive test for google.com")
public class GoogleSearchTest {

    WebDriver driver;
    final String testedUrl = "http://www.google.com";
    final String searchedText = "Batman";

    @BeforeEach
    @Step("Opening browser")
    public void setUp(){
        driver = new ChromeDriver();
    }

    @AfterEach
    @Step("Closing browser")
    public void tearDown(){
        driver.quit();
    }

    @DisplayName("Searched word is in the results")
    @Description("App goes to google.com, types 'Batman' into the search field, " +
            "presses search button and validates if block with text 'Batman' is present")
    @Test
    public void findBatmanTest() throws InterruptedException {
        step("Open google in browser", () -> driver.get(testedUrl));
        step("Type text into search field", () -> driver.findElement(By.name("q")).sendKeys(searchedText));
        step("Wait for button to appear", () -> Thread.sleep(300));
        step("Press search button", () -> driver.findElement(By.name("btnK")).click());
        String actualText = step("Get value of displayed text",
                () -> driver.findElement(By.xpath("//h3[@class='GmE3X']")).getText());
        step("Check if displayed text contains searched text", () -> assertTrue(actualText.contains(searchedText)));
    }
}
