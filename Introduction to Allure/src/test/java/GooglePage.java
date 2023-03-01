import io.qameta.allure.Step;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

public class GooglePage {

    @FindBy(how = How.NAME, using = "q")
    private WebElement searchField;

    @FindBy(how = How.NAME, using = "btnK")
    private WebElement searchButton;

    @FindBy(how = How.XPATH, using = "//h3[@class='GmE3X']")
    private WebElement resultHeader;

    @Step("Typing text into search field")
    public void typeIntoSearchField(String searchedText){
        searchField.sendKeys(searchedText);
    }

    @Step("Waiting for search button to be clickable")
    public void waitForButtonToBeClickable() throws InterruptedException {
        Thread.sleep(300);
    }
    @Step("Pressing search button")
    public void pressSearch(){
        searchButton.click();
    }
    @Step("Checking if searched text is in the result header")
    public boolean isSearchedTextInHeader(String searchedText){
        return !resultHeader.getText().contains(searchedText);
    }
}
