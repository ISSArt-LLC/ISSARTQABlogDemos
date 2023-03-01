import io.qameta.allure.*;
import org.junit.jupiter.api.*;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.PageFactory;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Owner("Alex Lobov, ISS Art QA")
@DisplayName("Google test positive")
public class GoogleSearchPomTest {

    WebDriver driver;
    final String testedUrl = "http://www.google.com";
    final String searchedText = "Batman";

    @BeforeEach
    @Description("Opening browser")
    public void setUp(){
        driver = new ChromeDriver();
    }

    @AfterEach
    @Description("Closing browser")
    public void tearDown(){
        driver.quit();
    }

    @Test
    @DisplayName("Find Batman (POM)")
    @Description("App goes to google.com, types 'Batman' into the search field, presses search button" +
            "and asserts that searched text is present on the results page")
    @Severity(SeverityLevel.BLOCKER)
    @Link(name = "Link to Google", url = "http://www.google.com")
    public void findBatmanPomTest() throws InterruptedException {
        try {
            driver.get(testedUrl);
            GooglePage googlePage = new GooglePage();
            PageFactory.initElements(driver, googlePage);
            googlePage.typeIntoSearchField(searchedText);
            googlePage.waitForButtonToBeClickable();
            googlePage.pressSearch();
            boolean actual = googlePage.isSearchedTextInHeader(searchedText);
            assertTrue(actual);
        } catch (Exception e){
            byte[] screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
            Allure.getLifecycle().addAttachment("Screenshot", "image/png", "png", screenshot );
            throw e;
        }
    }
}
